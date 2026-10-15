'use strict';

// Run with: node --test auth.test.js
// Synthetic accounts only; never print passwords, sessions or student identifiers.
const test = require('node:test');
const assert = require('node:assert/strict');
const http = require('node:http');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const crypto = require('node:crypto');
const { spawn } = require('node:child_process');
const { createAuth } = require('./src/server/auth/auth');

async function fixture(t, options = {}) {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'oms-auth-test-'));
  const auth = createAuth({ dataDir: directory, production: false, ...options });
  const server = http.createServer(async (req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);
    if (await auth.handle(req, res, url)) return;
    if (url.pathname === '/api/judge') {
      const current = auth.authorize(req, res); if (!current) return;
      res.end(JSON.stringify({ username: current.user.username })); return;
    }
    res.writeHead(404); res.end();
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const origin = `http://127.0.0.1:${server.address().port}`;
  t.after(async () => {
    await new Promise(resolve => { server.close(resolve); server.closeAllConnections(); });
    // Exactly the newly created OS temp directory, never the workspace or user data.
    assert.ok(path.basename(directory).startsWith('oms-auth-test-'));
    fs.rmSync(directory, { recursive: true, force: true });
  });
  async function request(endpoint, body, session = {}, overrides = {}) {
    const headers = { ...(body !== undefined ? { 'Content-Type': 'application/json', Origin: origin, 'X-OMS-Request': '1', 'X-OMS-CSRF': session.csrf || '' } : {}), ...(session.cookie ? { Cookie: session.cookie } : {}), ...overrides };
    const response = await fetch(origin + endpoint, { method: body === undefined ? 'GET' : 'POST', headers, ...(body === undefined ? {} : { body: JSON.stringify(body) }) });
    const data = await response.json();
    return { status: response.status, data, cookie: response.headers.get('set-cookie')?.split(';')[0] || '', cookieHeader: response.headers.get('set-cookie') || '', csrf: data.csrfToken || '' };
  }
  const password = `test-only-${crypto.randomBytes(16).toString('hex')}`;
  const account = { account: 'test_learner', nickname: 'Test learner', password, passwordConfirm: password };
  return { auth, request, account, directory, origin };
}

test('guest cannot call protected APIs; client demo flags and forged cookies confer no identity', async t => {
  const { request } = await fixture(t);
  const guest = await request('/api/auth/session');
  assert.equal(guest.data.authenticated, false);
  assert.equal(guest.data.available, true);
  assert.equal((await request('/api/judge', {}, { cookie: 'oms_local_session=1' })).status, 401);
  assert.equal((await request('/api/judge', {}, { cookie: `oms_local_session=${'a'.repeat(64)}` })).status, 401);
});

test('registration validates fields, normalizes account name, and returns only a public profile', async t => {
  const { request, account } = await fixture(t);
  assert.equal((await request('/api/auth/register', { ...account, password: 'short', passwordConfirm: 'short' })).status, 400);
  assert.equal((await request('/api/auth/register', { ...account, passwordConfirm: 'different-password' })).status, 400);
  assert.equal((await request('/api/auth/register', { ...account, account: 'bad account' })).status, 400);
  const registered = await request('/api/auth/register', { ...account, account: 'Test_Learner', schoolVerified: true, role: 'admin' });
  assert.equal(registered.status, 201);
  assert.equal(registered.data.user.username, account.account);
  assert.equal(registered.data.user.schoolVerified, false);
  assert.equal(registered.data.user.passwordHash, undefined);
  assert.equal(registered.data.user.passwordSalt, undefined);
  assert.equal(registered.data.user.role, undefined);
  assert.match(registered.cookieHeader, /HttpOnly/);
  assert.match(registered.cookieHeader, /SameSite=Strict/);
  assert.equal((await request('/api/auth/session', undefined, registered)).data.authenticated, true);
  assert.equal((await request('/api/judge', {}, registered)).status, 200);
});

test('wrong / unknown credentials fail identically and successful login rotates the session', async t => {
  const { request, account } = await fixture(t);
  assert.equal((await request('/api/auth/login', { account: account.account, password: 'short' })).status, 401);
  const old = await request('/api/auth/register', account);
  const wrong = await request('/api/auth/login', { account: account.account, password: 'wrong-password' });
  const unknown = await request('/api/auth/login', { account: 'unknown_user', password: 'wrong-password' });
  assert.equal(wrong.status, 401); assert.equal(unknown.status, 401);
  assert.equal(wrong.data.message, unknown.data.message);
  const login = await request('/api/auth/login', account, old);
  assert.equal(login.status, 200); assert.notEqual(login.cookie, old.cookie);
  assert.equal((await request('/api/auth/session', undefined, old)).data.authenticated, false);
});

test('duplicates including concurrent registration cannot create duplicate identities', async t => {
  const { request, account, directory } = await fixture(t);
  const [a, b] = await Promise.all([request('/api/auth/register', account), request('/api/auth/register', account)]);
  assert.deepEqual([a.status, b.status].sort(), [201, 409]);
  const record = JSON.parse(fs.readFileSync(path.join(directory, 'users.json'), 'utf8'));
  assert.equal(record.users.length, 1);
  assert.equal(JSON.stringify(record).includes(account.password), false);
});

test('cross-origin, missing Origin / request header, wrong CSRF and form posts are rejected', async t => {
  const { request, account } = await fixture(t);
  assert.equal((await request('/api/auth/register', account, {}, { Origin: 'https://evil.example' })).status, 403);
  assert.equal((await request('/api/auth/register', account, {}, { Origin: '' })).status, 403);
  assert.equal((await request('/api/auth/register', account, {}, { 'X-OMS-Request': '' })).status, 403);
  assert.equal((await request('/api/auth/register', account, {}, { 'Content-Type': 'text/plain' })).status, 415);
  const session = await request('/api/auth/register', account);
  assert.equal((await request('/api/auth/logout', {}, { ...session, csrf: 'b'.repeat(64) })).status, 403);
  assert.equal((await request('/api/judge', {}, session, { Origin: 'https://evil.example' })).status, 403);
  assert.equal((await request('/api/auth/session', undefined, session)).data.authenticated, true);
});

test('logout invalidates the server session, not only the browser cookie', async t => {
  const { request, account } = await fixture(t);
  const session = await request('/api/auth/register', account);
  const logout = await request('/api/auth/logout', {}, session);
  assert.equal(logout.status, 200); assert.match(logout.cookieHeader, /Max-Age=0/);
  assert.equal((await request('/api/auth/session', undefined, session)).data.authenticated, false);
  assert.equal((await request('/api/judge', {}, session)).status, 401);
});

test('profile is server-backed, immutable identity cannot be replaced, and users stay isolated', async t => {
  const { request, account } = await fixture(t);
  const first = await request('/api/auth/register', account);
  const second = await request('/api/auth/register', { ...account, account: 'other_learner', nickname: 'Other learner' });
  const saved = await request('/api/auth/profile', { nickname: 'Updated learner', username: 'other_learner', userId: second.data.user.id, schoolVerified: true }, first);
  assert.equal(saved.status, 200);
  assert.equal(saved.data.user.id, first.data.user.id);
  assert.equal(saved.data.user.username, account.account);
  assert.equal(saved.data.user.schoolVerified, false);
  assert.equal((await request('/api/auth/session', undefined, second)).data.user.nickname, 'Other learner');
  assert.equal((await request('/api/auth/profile', { nickname: 'Updated', avatar: 'data:image/svg+xml;base64,ZXZpbA==' }, first)).status, 400);
});

test('password change requires current password, revokes other sessions, and old password stops working', async t => {
  const { request, account } = await fixture(t);
  const first = await request('/api/auth/register', account);
  const other = await request('/api/auth/login', account);
  const password = `changed-${crypto.randomBytes(16).toString('hex')}`;
  const update = { nickname: account.nickname, password, passwordConfirm: password, currentPassword: 'incorrect-password' };
  assert.equal((await request('/api/auth/profile', update, first)).status, 400);
  const changed = await request('/api/auth/profile', { ...update, currentPassword: account.password }, first);
  assert.equal(changed.status, 200); assert.notEqual(changed.cookie, first.cookie);
  assert.equal((await request('/api/auth/session', undefined, first)).data.authenticated, false);
  assert.equal((await request('/api/auth/session', undefined, other)).data.authenticated, false);
  assert.equal((await request('/api/auth/session', undefined, changed)).data.authenticated, true);
  assert.equal((await request('/api/auth/login', account)).status, 401);
  assert.equal((await request('/api/auth/login', { account: account.account, password })).status, 200);
});

test('sessions expire on idle timeout and absolute timeout even when active', async t => {
  let time = Date.now();
  const { request, account } = await fixture(t, { now: () => time });
  const session = await request('/api/auth/register', account);
  time += 31 * 60 * 1000;
  assert.equal((await request('/api/auth/session', undefined, session)).data.authenticated, false);
  const active = await request('/api/auth/login', account);
  for (let step = 0; step < 24; step++) { time += 20 * 60 * 1000; await request('/api/auth/session', undefined, active); }
  assert.equal((await request('/api/auth/session', undefined, active)).data.authenticated, false);
});

test('accounts survive a new server instance, sessions do not; damaged storage is never silently reset', async t => {
  const { request, account, directory } = await fixture(t);
  await request('/api/auth/register', account);
  const restarted = await fixture(t, { dataDir: directory });
  assert.equal((await restarted.request('/api/auth/login', account)).status, 200);
  const storageFile = path.join(directory, 'users.json');
  const prior = fs.readFileSync(storageFile, 'utf8');
  fs.writeFileSync(storageFile, '{invalid');
  const broken = createAuth({ dataDir: directory, production: false });
  assert.equal(broken.available, false);
  assert.equal(fs.readFileSync(storageFile, 'utf8'), '{invalid');
  fs.writeFileSync(storageFile, prior);
});

test('production fails closed without durable storage and issues Secure cookies when explicitly configured', async t => {
  const disabled = await fixture(t, { production: true, persistent: false, publicOrigin: 'https://school-app.example' });
  assert.equal(disabled.auth.available, false);
  assert.equal((await disabled.request('/api/auth/register', disabled.account)).status, 503);
  const enabled = await fixture(t, { production: true, persistent: true, publicOrigin: 'https://school-app.example' });
  const registered = await enabled.request('/api/auth/register', enabled.account, {}, { Origin: 'https://school-app.example' });
  assert.equal(registered.status, 201);
  assert.match(registered.cookieHeader, /__Host-oms_session=/);
  assert.match(registered.cookieHeader, /; Secure/);
  assert.equal(registered.data.user.schoolVerified, false);
});

test('fixed account mode needs no disk, disables registration, and accepts only configured credentials', async t => {
  const password = crypto.randomBytes(3).toString('hex');
  const fixed = await fixture(t, {
    production: true,
    persistent: false,
    publicOrigin: 'https://school-app.example',
    fixedUsers: [{ account: 'fixed_one', nickname: 'Fixed learner', password }]
  });
  const origin = { Origin: 'https://school-app.example' };
  const guest = await fixed.request('/api/auth/session');
  assert.equal(guest.data.available, true);
  assert.equal(guest.data.registrationEnabled, false);
  assert.equal((await fixed.request('/api/auth/register', fixed.account, {}, origin)).status, 403);
  assert.equal((await fixed.request('/api/auth/login', { account: 'fixed_one', password: 'wrong' }, {}, origin)).status, 401);
  const loggedIn = await fixed.request('/api/auth/login', { account: 'fixed_one', password }, {}, origin);
  assert.equal(loggedIn.status, 200);
  assert.match(loggedIn.cookieHeader, /__Host-oms_session=/);
  assert.match(loggedIn.cookieHeader, /; Secure/);
  assert.equal((await fixed.request('/api/auth/profile', { nickname: 'Changed' }, loggedIn, origin)).status, 403);
  assert.equal(fs.existsSync(path.join(fixed.directory, 'users.json')), false);
});

test('fixed account mode derives its HTTPS origin from Render hostname', async t => {
  const priorOrigin = process.env.OMS_PUBLIC_ORIGIN;
  const priorHostname = process.env.RENDER_EXTERNAL_HOSTNAME;
  delete process.env.OMS_PUBLIC_ORIGIN;
  process.env.RENDER_EXTERNAL_HOSTNAME = 'school-app.example';
  t.after(() => {
    if (priorOrigin === undefined) delete process.env.OMS_PUBLIC_ORIGIN;
    else process.env.OMS_PUBLIC_ORIGIN = priorOrigin;
    if (priorHostname === undefined) delete process.env.RENDER_EXTERNAL_HOSTNAME;
    else process.env.RENDER_EXTERNAL_HOSTNAME = priorHostname;
  });
  const fixed = await fixture(t, {
    production: true,
    persistent: false,
    fixedUsers: [{ account: 'fixed_two', nickname: 'Fixed learner', password: crypto.randomBytes(4).toString('hex') }]
  });
  const guest = await fixed.request('/api/auth/session');
  assert.equal(guest.data.available, true);
  assert.equal(guest.data.registrationEnabled, false);
});

test('fixed account mode accepts a Render-style quoted environment assignment', async t => {
  const password = crypto.randomBytes(4).toString('hex');
  const records = JSON.stringify([{ account: 'fixed_three', nickname: 'Fixed learner', password }]);
  const fixed = await fixture(t, {
    production: true,
    publicOrigin: 'https://school-app.example',
    fixedUsers: `OMS_FIXED_USERS_JSON='${records}'`
  });
  const guest = await fixed.request('/api/auth/session');
  assert.equal(guest.data.available, true);
  assert.equal(guest.data.registrationEnabled, false);
});

test('fixed account mode accepts an account map and reports safe configuration errors', async t => {
  const fixed = await fixture(t, {
    production: true,
    publicOrigin: 'https://school-app.example',
    fixedUsers: JSON.stringify({ fixed_four: 123456 })
  });
  assert.equal((await fixed.request('/api/auth/session')).data.available, true);

  const invalid = await fixture(t, {
    production: true,
    publicOrigin: 'https://school-app.example',
    fixedUsers: '[invalid]'
  });
  const guest = await invalid.request('/api/auth/session');
  assert.equal(guest.data.available, false);
  assert.equal(guest.data.message, '固定账号配置的 JSON 语法无效。');
  assert.equal(guest.data.message.includes('fixed_four'), false);

  const invalidAccount = await fixture(t, {
    production: true,
    publicOrigin: 'https://school-app.example',
    fixedUsers: JSON.stringify({ 'invalid account': 123456 })
  });
  const accountGuest = await invalidAccount.request('/api/auth/session');
  assert.equal(accountGuest.data.available, false);
  assert.match(accountGuest.data.message, /账号格式无效/);
  assert.equal(accountGuest.data.message.includes('invalid account'), false);
});

test('repeated credential attempts are limited', async t => {
  const { request, account } = await fixture(t);
  for (let attempt = 0; attempt < 15; attempt++) assert.equal((await request('/api/auth/login', account)).status, 401);
  assert.equal((await request('/api/auth/login', account)).status, 429);
});

test('real portal UI: register, resume intended page, edit profile, reject wrong password, restore session and logout', { timeout: 60000 }, async t => {
  const browserPath = [
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'
  ].find(candidate => fs.existsSync(candidate));
  if (!browserPath || typeof WebSocket === 'undefined') { t.skip('Headless browser not installed'); return; }
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'oms-auth-ui-test-'));
  const priorDirectory = process.env.OMS_AUTH_DATA_DIR;
  process.env.OMS_AUTH_DATA_DIR = path.join(directory, 'accounts');
  const { server } = require('./server');
  if (priorDirectory === undefined) delete process.env.OMS_AUTH_DATA_DIR;
  else process.env.OMS_AUTH_DATA_DIR = priorDirectory;
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const origin = `http://127.0.0.1:${server.address().port}`;
  const browser = spawn(browserPath, ['--headless=new', '--no-first-run', '--no-default-browser-check', '--remote-debugging-port=0', `--user-data-dir=${path.join(directory, 'browser')}`, 'about:blank'], { windowsHide: true, stdio: ['ignore', 'ignore', 'pipe'] });
  let socket;
  t.after(async () => {
    socket?.close(); browser.kill();
    await new Promise(resolve => { server.close(resolve); server.closeAllConnections(); });
    assert.ok(path.basename(directory).startsWith('oms-auth-ui-test-'));
    // Chromium may briefly hold profile files; only clean this owned temporary directory.
    await new Promise(resolve => setTimeout(resolve, 500));
    fs.rmSync(directory, { recursive: true, force: true, maxRetries: 5, retryDelay: 300 });
  });
  const debuggerUrl = await new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(Error('Headless browser did not start')), 15000);
    browser.once('error', reject); browser.once('exit', () => reject(Error('Headless browser exited')));
    let output = '';
    browser.stderr.on('data', chunk => {
      output += chunk.toString();
      const match = output.match(/DevTools listening on (ws:\/\/[^\s]+)/);
      if (match) { clearTimeout(timer); resolve(match[1]); }
    });
  });
  socket = new WebSocket(debuggerUrl);
  await new Promise((resolve, reject) => { socket.addEventListener('open', resolve, { once: true }); socket.addEventListener('error', reject, { once: true }); });
  let sequence = 0, phase = 'load guest homepage';
  const browserErrors = [];
  const pending = new Map();
  socket.addEventListener('message', event => {
    const message = JSON.parse(event.data);
    if (message.method === 'Runtime.exceptionThrown') browserErrors.push(message.params.exceptionDetails.text);
    if (!message.id || !pending.has(message.id)) return;
    const { resolve, reject, timer } = pending.get(message.id); pending.delete(message.id); clearTimeout(timer);
    if (message.error) reject(Error(message.error.message)); else resolve(message.result);
  });
  function command(method, params = {}, sessionId) {
    return new Promise((resolve, reject) => {
      const id = ++sequence, timer = setTimeout(() => { pending.delete(id); reject(Error(`Browser command timed out: ${method}; phase: ${phase}; errors: ${browserErrors.join(', ')}`)); }, 10000);
      pending.set(id, { resolve, reject, timer });
      socket.send(JSON.stringify({ id, method, params, ...(sessionId ? { sessionId } : {}) }));
    });
  }
  const { targetId } = await command('Target.createTarget', { url: 'about:blank' });
  const { sessionId } = await command('Target.attachToTarget', { targetId, flatten: true });
  await command('Runtime.enable', {}, sessionId);
  const evaluate = async expression => {
    const result = await command('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true }, sessionId);
    if (result.exceptionDetails) throw Error(result.exceptionDetails.text || 'Browser script failed');
    return result.result.value;
  };
  const until = async expression => {
    const deadline = Date.now() + 12000;
    while (Date.now() < deadline) {
      if (await evaluate(expression)) return;
      await new Promise(resolve => setTimeout(resolve, 80));
    }
    throw Error(`UI condition timed out: ${expression}`);
  };
  await command('Page.navigate', { url: origin }, sessionId);
  await until('Boolean(window.omsAuth && document.querySelector("[data-portal-route=problemset]"))');
  phase = 'open login';
  await evaluate('document.querySelector("[data-portal-route=problemset]").click()');
  await until('!document.querySelector("#login-screen").hidden');
  assert.equal(await evaluate('Boolean(document.querySelector("[data-demo-login]"))'), false);
  await evaluate('document.querySelector("[data-auth-mode]").click()');
  phase = 'register account and resume problem directory';
  const credentials = { account: 'ui_test_learner', nickname: 'UI Test Learner', password: `ui-only-${crypto.randomBytes(16).toString('hex')}` };
  await evaluate(`(() => { const data=${JSON.stringify(credentials)}, form=document.querySelector('#portal-login-form'); for(const key of ['account','nickname','password'])form.elements[key].value=data[key]; form.elements.passwordConfirm.value=data.password; form.requestSubmit(); })()`);
  await until('Boolean(window.omsAuth.user && document.querySelector("#login-screen").hidden && document.querySelector(".problem-directory"))');
  assert.equal(await evaluate('window.omsAuth.user.schoolVerified'), false);
  phase = 'edit profile';
  await evaluate('loadCode("first-account-private-draft"); persistActiveDraft(); document.querySelector("[data-profile-open]").click()');
  await until('document.querySelector("#profile-dialog").open');
  assert.equal(await evaluate('document.querySelector("#profile-form").elements.username.readOnly'), true);
  await evaluate('document.querySelector("#profile-form").elements.nickname.value="Updated UI Learner"; document.querySelector("#profile-form").requestSubmit()');
  await until('window.omsAuth.user.nickname === "Updated UI Learner" && !document.querySelector("#profile-dialog").open');
  phase = 'persist a submission';
  const persisted = await evaluate(`(async () => {
    const exam=window.OMS_EXAM_ARCHIVE.find(item => item.category === 'past' && item.questions.some(question => question.judgeable !== false));
    const question=exam.questions.find(item => item.judgeable !== false);
    const response=await fetch('/api/judge',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({code:'',language:'C++ (g++)',problemId:question.id,examVersion:exam.examVersion,mode:'submit'})});
    const result=await response.json();
    const progress=await (await fetch('/api/progress')).json();
    return {saved:result.progressSaved,count:progress.exams[exam.examVersion]?.submissions?.length||0};
  })()`);
  assert.deepEqual(persisted, { saved: true, count: 1 });
  phase = 'logout';
  await evaluate('document.querySelector("[data-profile-open]").click()');
  await until('document.querySelector("#profile-dialog").open');
  await evaluate('document.querySelector("#profile-logout").click()');
  await until('!window.omsAuth.user && !document.querySelector("#profile-dialog").open');
  assert.equal(await evaluate('DRAFT_CODE_STORAGE.includes("-guest-")'), true);
  assert.notEqual(await evaluate('codeForQuestion(activeQuestionId)'), 'first-account-private-draft');
  await evaluate('document.querySelector("[data-profile-open]").click()');
  await until('!document.querySelector("#login-screen").hidden');
  phase = 'reject incorrect password';
  await evaluate(`(() => { const form=document.querySelector('#portal-login-form'); form.elements.account.value=${JSON.stringify(credentials.account)};form.elements.password.value='incorrect-password';form.requestSubmit(); })()`);
  await until('document.querySelector("#portal-login-note").textContent.includes("账号或密码错误")');
  assert.equal(await evaluate('Boolean(window.omsAuth.user)'), false);
  phase = 'login and resume personal center';
  await evaluate(`(() => { const form=document.querySelector('#portal-login-form'); form.elements.password.value=${JSON.stringify(credentials.password)};form.requestSubmit(); })()`);
  await until('Boolean(window.omsAuth.user && document.querySelector("#profile-dialog").open)');
  await evaluate('document.querySelector("#profile-dialog").close()');
  assert.equal(await evaluate('codeForQuestion(activeQuestionId)'), 'first-account-private-draft');
  phase = 'restore session on refresh';
  await command('Page.reload', {}, sessionId);
  await until('Boolean(window.omsAuth && window.omsAuth.user && [...progressByExam.values()].some(progress => progress.submissions?.length === 1))');
  assert.equal(await evaluate('window.omsAuth.user.nickname'), 'Updated UI Learner');
  await evaluate('document.querySelector("[data-profile-open]").click()');
  await until('document.querySelector("#profile-dialog").open');
  await evaluate('document.querySelector("#profile-logout").click()');
  await until('!window.omsAuth.user && !document.querySelector("#profile-dialog").open');
});

// These regressions execute production functions against synthetic exams and delayed
// responses. No real accounts, test archives, compiler processes or persistent data.
const vm = require('node:vm');
function sourceBetween(file, start, end) {
  const source = fs.readFileSync(path.join(__dirname, file), 'utf8');
  const from = source.indexOf(start), to = source.indexOf(end, from);
  assert.ok(from >= 0 && to > from, `Missing source boundary in ${file}`);
  return source.slice(from, to);
}

test('regression: server enforces campus schedule at API boundary and permits archived practice', async () => {
  let time = Date.parse('2030-01-01T10:00:00+08:00'), judgeCalls = 0;
  const exam = { examVersion:'live', startAt:'2030-01-01T10:00', endAt:'2030-01-01T11:00', questions:[{id:'q1',score:100,testCases:[{input:'1',expected:'1'}]}] };
  const context = { __dirname, module:{exports:{}}, process:{env:{},platform:process.platform}, Buffer, URL,
    Date:class extends Date { static now(){return time;} },
    require(name) {
      if(name==='http')return {createServer:handler=>({handler})};
      if(name==='fs')return {existsSync:()=>false};
      if(name==='./src/server/judge/local-judge')return {LocalJudge:class {async judge(){judgeCalls++;return {verdict:'Accepted'};}}};
      if(name==='./validate-exam-data')return {loadAndValidateExamData:()=>({exams:[exam,{...exam,examVersion:'archive',category:'past'},{...exam,examVersion:'broken',endAt:'invalid'}],practiceExams:[],report:{}})};
      if(name==='./src/server/auth/auth')return {createAuth:()=>({available:false,dataDir:os.tmpdir(),handle:async()=>false,authorize:()=>({user:{id:'synthetic'}})})};
      if(name==='./src/client/judge/judge-score')return {calculate:()=>({score:100})};
      assert.ok(['crypto','os','path','zlib'].includes(name));return require(name);
    }
  };
  vm.createContext(context);vm.runInContext(fs.readFileSync(path.join(__dirname,'server.js'),'utf8'),context);
  async function submit(examVersion='live',mode='submit') {
    const body=JSON.stringify({examVersion,problemId:'q1',mode,category:'past'});
    const req={method:'POST',url:'/api/judge',headers:{host:'localhost'},socket:{remoteAddress:'synthetic'},on(event,fn){if(event==='data')fn(body);if(event==='end')fn();}};
    const res={writeHead(status){this.status=status;},end(body){this.body=JSON.parse(body);}};
    await context.module.exports.server.handler(req,res);return res;
  }
  time--;assert.equal((await submit()).body.verdict,'ExamNotStarted');
  assert.equal((await submit('live','sample')).status,403);assert.equal(judgeCalls,0);
  time++;assert.equal((await submit()).status,200);assert.equal(judgeCalls,1);
  time+=60*60*1000;assert.equal((await submit()).body.verdict,'ExamEnded');assert.equal(judgeCalls,1);
  assert.equal((await submit('')).status,400);assert.equal((await submit('unknown')).status,400);
  assert.equal((await submit('broken')).body.verdict,'InvalidSchedule');
  assert.equal((await submit('archive')).status,200);assert.equal(judgeCalls,2);
});

function submissionFixture() {
  const elements=new Map(),storage=new Map();let release,reject;
  const context={current:0,activeRoute:'exam',submissionPending:false,portalUser:{id:'user-a'},portalAuthenticated:true,portalIdentityRevision:1,
    config:{examVersion:'exam-a',questions:[{id:'q1',score:100,testCases:[]}]},scores:{},results:{},submissions:[],progressByExam:new Map(),submittedCodes:{},activeQuestionId:'q1',loadedCode:'',
    $:selector=>{if(!elements.has(selector))elements.set(selector,{value:'cpp',textContent:'',classList:{toggle(){}}});return elements.get(selector);},
    document:{querySelector:()=>null},editorCode:()=>'submitted snapshot',updateCountdown(){},render(){},formatExamTime:value=>value,
    localStorage:{setItem:(key,value)=>storage.set(key,value)},readCodeMap:key=>JSON.parse(storage.get(key)||'{}'),
    fetch:()=>new Promise((resolve,fail)=>{release=resolve;reject=fail;}),
    calculateScore:result=>({score:result.verdict==='Accepted'?100:0,status:result.verdict==='Accepted'?'accepted':'wrong'}),formatJudgeOutput:()=>'',
    aiVerdict:verdict=>({label:verdict}),showSubmissionResult(){context.modalShown=true;}
  };
  vm.createContext(context);
  vm.runInContext(sourceBetween('src/client/core/pta-clone.js','function storedVerdictLabel(', 'async function refreshPersistedProgress('),context);
  vm.runInContext(sourceBetween('src/client/judge/judge-machine.js','  async function aiJudgeSubmit()',"  document.querySelector('#copy-submission-code')"),context);
  return {context,storage,elements,finish:result=>release({ok:true,json:async()=>result}),fail:()=>reject(Error('synthetic network failure'))};
}

test('regression: delayed result cannot update a different account or a renewed login', async () => {
  for(const changedUser of [true,false]) {
    const f=submissionFixture(),pending=f.context.aiJudgeSubmit();
    if(changedUser)f.context.portalUser={id:'user-b'};
    f.context.portalIdentityRevision++;
    f.finish({verdict:'Accepted'});await pending;
    assert.equal(f.context.progressByExam.size,0);assert.equal(f.storage.size,0);
    assert.equal(Object.keys(f.context.results).length,0);assert.equal(f.context.modalShown,undefined);
    assert.equal(f.context.submissionPending,false);
  }
});

test('regression: infrastructure failures never become wrong answers or submission records', async () => {
  for(const verdict of ['JudgeUnavailable','NotConfigured','RateLimited','NeedsReview','Unknown']) {
    const f=submissionFixture(),pending=f.context.aiJudgeSubmit();
    f.finish({verdict});await pending;
    assert.equal(f.context.progressByExam.size,0);assert.equal(f.context.submissions.length,0);
    assert.equal(Object.keys(f.context.results).length,0);assert.equal(f.storage.size,0);
    assert.match(f.elements.get('#run-state').textContent,/本次不计成绩/);
  }
});

test('regression: all final verdicts remain recordable and newer drafts are not overwritten', async () => {
  for(const verdict of ['Accepted','WrongAnswer','CompilationError','RuntimeError','TimeLimitExceeded']) {
    const f=submissionFixture(),pending=f.context.aiJudgeSubmit();
    f.context.editorCode=()=>'newer draft';f.finish({verdict,progressSaved:false});await pending;
    assert.equal(f.context.submissions.length,1);assert.equal(f.context.modalShown,true);
    assert.equal(f.context.editorCode(),'newer draft');assert.equal(f.context.submittedCodes.q1,'submitted snapshot');
    assert.match(f.elements.get('#submit-state').textContent,/未保存/);
  }
});

test('regression: switching exams preserves original result and code without painting the new exam', async () => {
  const f=submissionFixture(),original=f.context.config,pending=f.context.aiJudgeSubmit();
  f.context.config={examVersion:'exam-b',questions:[{id:'q2',score:100}]};
  f.context.activeQuestionId='q2';
  const progress={scores:{q1:100},statuses:{q1:'accepted'},submissions:[{problemId:'q1',verdict:'Accepted'}]};
  f.finish({verdict:'Accepted',progress});await pending;
  assert.equal(f.context.progressByExam.get('exam-a'),progress);assert.equal(f.context.submissions.length,0);
  assert.equal(f.context.modalShown,undefined);assert.equal(f.context.submittedCodes.q1,undefined);
  assert.equal(JSON.parse(f.storage.get('oms-pta-submitted-code-user-a-exam-a')).q1,'submitted snapshot');
  f.context.config=original;f.context.applyPersistedProgress('exam-a');
  assert.equal(f.context.scores[0],100);assert.equal(f.context.results[0],'accepted');assert.equal(f.context.submissions.length,1);
});

test('regression: late errors do not paint a newly selected exam or account', async () => {
  const f=submissionFixture(),pending=f.context.aiJudgeSubmit();
  f.context.config={examVersion:'exam-b',questions:[{id:'q2',score:100}]};f.fail();await pending;
  assert.equal(f.elements.has('#compiler-output'),false);
});

test('regression: countdown disables early/closed submissions but not archived practice', () => {
  const f=submissionFixture(),ctx=f.context;
  const now=Date.parse('2030-01-01T10:00:00+08:00');
  ctx.Date=class extends Date {static now(){return now;}};
  vm.runInContext(sourceBetween('src/client/core/pta-clone.js','function updateCountdown()', 'function editorCode()'),ctx);
  Object.assign(ctx.config,{startAt:'2030-01-01T10:01',endAt:'2030-01-01T11:00'});
  ctx.updateCountdown();assert.equal(ctx.$('#submit').disabled,true);assert.equal(ctx.$('#run-test').disabled,true);
  ctx.config.startAt='2030-01-01T10:00';ctx.updateCountdown();assert.equal(ctx.$('#submit').disabled,false);
  ctx.config.endAt='2030-01-01T10:00';ctx.updateCountdown();assert.equal(ctx.$('#submit').disabled,true);
  ctx.config.category='past';ctx.updateCountdown();assert.equal(ctx.$('#submit').disabled,false);
});

test('regression: judge fetch keeps explicit exam identity and ignores stale unauthorized responses', async () => {
  let release;const calls=[];
  const context={URL,Request,Headers,location:{href:'http://localhost/',origin:'http://localhost'},portalUser:{id:'user-a'},portalIdentityRevision:1,portalCsrf:'synthetic',
    config:{examVersion:'visible-exam',questions:[{id:'visible-question'}]},current:0,
    requirePortalSession:async()=>true,setPortalSession(){throw Error('stale response cleared session');},openLogin(){throw Error('stale response opened login');},
    window:{fetch:(input,options)=>{calls.push(JSON.parse(options.body));return new Promise(resolve=>release=resolve);}}
  };
  vm.createContext(context);vm.runInContext(sourceBetween('src/client/core/pta-clone.js','const portalNativeFetch=', 'let fullscreenHintTimer='),context);
  const pending=context.window.fetch('/api/judge',{body:JSON.stringify({examVersion:'submitted-exam',problemId:'submitted-question'})});
  await new Promise(setImmediate);assert.equal(calls[0].examVersion,'submitted-exam');assert.equal(calls[0].problemId,'submitted-question');
  context.portalUser={id:'user-b'};context.portalIdentityRevision++;
  release({status:401});await pending;
  context.requirePortalSession=async()=>{context.portalIdentityRevision++;return true;};
  await assert.rejects(context.window.fetch('/api/judge',{body:'{}'}),/登录状态已变化/);assert.equal(calls.length,1);
});
