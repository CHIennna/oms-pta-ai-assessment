'use strict';

// Local: accounts live outside the source tree in ../fzupta-runtime/auth-data.
// Production registration stays disabled until an operator attaches persistent storage and sets:
// OMS_AUTH_DATA_DIR=/var/data/oms-auth
// OMS_AUTH_PERSISTENT_STORAGE=1
// OMS_PUBLIC_ORIGIN=https://<your-domain>
// A small deployment can instead provide OMS_FIXED_USERS_JSON as a secret env var.
// This file store supports ONE Node process only. Back up users.json securely.
// Sessions deliberately expire on server restart; registered accounts do not.
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const { promisify } = require('node:util');
const scrypt = promisify(crypto.scrypt);
const HASH_OPTIONS = { N: 16384, r: 8, p: 5, maxmem: 32 * 1024 * 1024 };
const SESSION_MS = 8 * 60 * 60 * 1000;
const IDLE_MS = 30 * 60 * 1000;
const error = (status, message) => Object.assign(new Error(message), { status });
const digest = value => crypto.createHash('sha256').update(value).digest('hex');
const passwordValid = value => typeof value === 'string' && value.length >= 10 && value.length <= 128;
const usernameValid = value => typeof value === 'string' && /^[a-zA-Z0-9_-]{3,32}$/.test(value);
const localHost = value => ['localhost', '127.0.0.1', '[::1]'].includes(value);

function createAuth(options = {}) {
  const production = options.production ?? (process.env.NODE_ENV === 'production' || Boolean(process.env.RENDER));
  const dataDir = options.dataDir || process.env.OMS_AUTH_DATA_DIR || path.resolve(__dirname, '..', 'fzupta-runtime', 'auth-data');
  const originSetting = options.publicOrigin !== undefined
    ? options.publicOrigin
    : process.env.OMS_PUBLIC_ORIGIN || (process.env.RENDER_EXTERNAL_HOSTNAME ? `https://${process.env.RENDER_EXTERNAL_HOSTNAME}` : undefined);
  const persistent = options.persistent ?? (process.env.OMS_AUTH_PERSISTENT_STORAGE === '1');
  const fixedUsersSetting = options.fixedUsers ?? process.env.OMS_FIXED_USERS_JSON;
  const fixedMode = options.fixedUsers !== undefined || typeof fixedUsersSetting === 'string' && fixedUsersSetting.trim() !== '';
  const now = options.now || Date.now;
  const cookieName = production ? '__Host-oms_session' : 'oms_local_session';
  const sessions = new Map(), buckets = new Map();
  let users = [], origin = '', available = false, hashJobs = 0;
  let unavailableMessage = '账号服务暂不可用，请联系管理员。';
  const file = path.join(dataDir, 'users.json');

  function fixedConfigError(message) {
    return Object.assign(new Error('Invalid fixed users'), { safeMessage: message });
  }

  function fixedUserRecords(setting) {
    let records = setting;
    if (typeof records === 'string') {
      let source = records.trim().replace(/^OMS_FIXED_USERS_JSON\s*=\s*/, '');
      if (source.startsWith("'") && source.endsWith("'")) source = source.slice(1, -1).trim();
      try {
        records = JSON.parse(source);
        if (typeof records === 'string') records = JSON.parse(records);
      } catch {
        throw fixedConfigError('固定账号配置的 JSON 语法无效。');
      }
    }
    if (!Array.isArray(records) && Array.isArray(records?.users)) records = records.users;
    else if (!Array.isArray(records) && records && typeof records === 'object') {
      records = Object.entries(records).map(([account, password]) => ({ account, password }));
    }
    if (!Array.isArray(records) || !records.length || records.length > 50) throw fixedConfigError('固定账号配置必须包含 1 至 50 个账号。');
    const names = new Set();
    return records.map(record => {
      if (Array.isArray(record) && record.length === 2) record = { account: record[0], password: record[1] };
      const username = typeof (record?.account ?? record?.username) === 'string' ? String(record.account ?? record.username).trim().toLowerCase() : '';
      const passwordValue = record?.password;
      const password = typeof passwordValue === 'string' ? passwordValue : Number.isSafeInteger(passwordValue) && passwordValue >= 0 ? String(passwordValue) : undefined;
      const nickname = typeof record?.nickname === 'string' && record.nickname.trim() ? record.nickname.trim() : username;
      if (!usernameValid(username) || names.has(username) || typeof password !== 'string' || password.length < 1 || password.length > 128 || nickname.length > 32) throw fixedConfigError('固定账号配置中的账号、密码或昵称字段无效。');
      names.add(username);
      const passwordSalt = crypto.randomBytes(16).toString('hex');
      const passwordHash = crypto.scryptSync(password, Buffer.from(passwordSalt, 'hex'), 32, HASH_OPTIONS).toString('hex');
      return { id: `fixed-${digest(username).slice(0, 32)}`, username, nickname, email: '', phone: '', avatar: '', passwordSalt, passwordHash, authVersion: 1, fixed: true };
    });
  }

  function save(next) {
    const temporary = `${file}.${crypto.randomBytes(8).toString('hex')}.tmp`;
    let descriptor;
    try {
      descriptor = fs.openSync(temporary, 'wx', 0o600);
      fs.writeFileSync(descriptor, JSON.stringify({ version: 1, users: next }), 'utf8');
      fs.fsyncSync(descriptor);
      fs.closeSync(descriptor); descriptor = undefined;
      fs.renameSync(temporary, file);
      users = next;
      // fsync the directory entry on platforms which support it.
      if (process.platform !== 'win32') {
        let directory;
        try { directory = fs.openSync(dataDir, 'r'); fs.fsyncSync(directory); }
        finally { if (directory !== undefined) fs.closeSync(directory); }
      }
    } finally {
      if (descriptor !== undefined) fs.closeSync(descriptor);
      if (fs.existsSync(temporary)) fs.unlinkSync(temporary);
    }
  }

  try {
    if (originSetting) {
      const parsed = new URL(originSetting);
      if (parsed.username || parsed.password || parsed.pathname !== '/' || parsed.search || parsed.hash) throw Error('Invalid origin');
      if (parsed.protocol !== 'https:' && !(parsed.protocol === 'http:' && !production && localHost(parsed.hostname))) throw Error('HTTPS required');
      origin = parsed.origin;
    }
    if (fixedMode && (!production || origin)) {
      users = fixedUserRecords(fixedUsersSetting);
      available = true;
    } else if (fixedMode) {
      unavailableMessage = '固定账号登录需要配置本站 HTTPS 地址。';
    } else if (production && (!process.env.OMS_AUTH_DATA_DIR && !options.dataDir || !persistent || !origin)) {
      unavailableMessage = '线上账号暂未开放：管理员需先配置持久存储和本站 HTTPS 地址。';
    } else {
      fs.mkdirSync(dataDir, { recursive: true, mode: 0o700 });
      const realDir = fs.realpathSync(dataDir), sourceRoot = fs.realpathSync(__dirname);
      const relative = path.relative(sourceRoot, realDir);
      if (!relative || (!relative.startsWith(`..${path.sep}`) && relative !== '..' && !path.isAbsolute(relative))) throw Error('Store must be outside source tree');
      if (fs.existsSync(file)) {
        const record = JSON.parse(fs.readFileSync(file, 'utf8'));
        if (record.version !== 1 || !Array.isArray(record.users) || record.users.length > 5000) throw Error('Invalid account store');
        const names = new Set(), ids = new Set();
        for (const user of record.users) {
          if (!usernameValid(user.username) || !/^[a-f0-9]{64}$/.test(user.passwordHash) || !/^[a-f0-9]{32}$/.test(user.passwordSalt) || typeof user.id !== 'string' || !Number.isSafeInteger(user.authVersion) || names.has(user.username) || ids.has(user.id)) throw Error('Invalid account record');
          names.add(user.username); ids.add(user.id);
        }
        users = record.users;
      } else save([]);
      available = true;
    }
  } catch (cause) {
    // Never recreate a damaged store or expose account data / filesystem errors.
    available = false;
    if (fixedMode) unavailableMessage = cause?.safeMessage || '固定账号配置或本站 HTTPS 地址无效。';
  }

  function response(res, status, body) {
    res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' });
    res.end(JSON.stringify(body));
  }
  function tokenFrom(req) {
    const matches = String(req.headers.cookie || '').split(';').map(item => item.trim()).filter(item => item.startsWith(`${cookieName}=`));
    if (matches.length !== 1) return '';
    const token = matches[0].slice(cookieName.length + 1);
    return /^[a-f0-9]{64}$/.test(token) ? token : '';
  }
  function cookie(res, value, age = SESSION_MS / 1000) {
    res.setHeader('Set-Cookie', `${cookieName}=${value}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${age}${production ? '; Secure' : ''}`);
  }
  function prune() {
    const time = now();
    for (const [key, session] of sessions) if (session.expires <= time || session.lastSeen + IDLE_MS <= time) sessions.delete(key);
    for (const [key, bucket] of buckets) if (bucket.until <= time) buckets.delete(key);
  }
  function sessionFor(req) {
    prune();
    const token = tokenFrom(req), session = token && sessions.get(digest(token));
    if (!session) return null;
    const user = users.find(item => item.id === session.userId && item.authVersion === session.authVersion);
    if (!user) { sessions.delete(digest(token)); return null; }
    session.lastSeen = now();
    return { session, user };
  }
  function publicUser(user) {
    return { id: user.id, userId: user.id, username: user.username, nickname: user.nickname, email: user.email || '', phone: user.phone || '', avatar: user.avatar || '', provider: 'local', schoolVerified: false };
  }
  function revoke(userId) {
    for (const [key, session] of sessions) if (session.userId === userId) sessions.delete(key);
  }
  function issue(req, res, user) {
    prune();
    const old = tokenFrom(req); if (old) sessions.delete(digest(old));
    const existing = [...sessions.entries()].filter(([, session]) => session.userId === user.id);
    while (existing.length >= 5) sessions.delete(existing.shift()[0]);
    if (sessions.size >= 5000) throw error(503, '登录人数较多，请稍后重试。');
    const token = crypto.randomBytes(32).toString('hex');
    const session = { userId: user.id, authVersion: user.authVersion, csrf: crypto.randomBytes(32).toString('hex'), lastSeen: now(), expires: now() + SESSION_MS };
    sessions.set(digest(token), session); cookie(res, token);
    return { user: publicUser(user), csrfToken: session.csrf, authenticated: true, available: true, registrationEnabled: !fixedMode };
  }
  function assertSameOrigin(req) {
    let expected = origin;
    if (!expected) {
      const parsed = new URL(`http://${req.headers.host || ''}`);
      if (!localHost(parsed.hostname)) throw error(403, '本地账号服务只允许 localhost；部署请配置 HTTPS 地址。');
      expected = parsed.origin;
    }
    if (req.headers.origin !== expected || req.headers['x-oms-request'] !== '1') throw error(403, '请求来源无效，请从本站页面操作。');
    if (req.headers['sec-fetch-site'] === 'cross-site') throw error(403, '不允许跨站请求。');
  }
  function authorize(req, res) {
    if (!available) { response(res, 503, { message: unavailableMessage }); return null; }
    const current = sessionFor(req);
    if (!current) { cookie(res, '', 0); response(res, 401, { message: '请先登录，或重新登录已过期的会话。' }); return null; }
    if (!['GET', 'HEAD'].includes(req.method)) {
      try {
        assertSameOrigin(req);
        const csrf = req.headers['x-oms-csrf'];
        if (typeof csrf !== 'string' || !/^[a-f0-9]{64}$/.test(csrf) || !crypto.timingSafeEqual(Buffer.from(csrf), Buffer.from(current.session.csrf))) throw error(403, '安全校验失败，请刷新页面重试。');
      } catch (failure) { response(res, failure.status || 403, { message: failure.message }); return null; }
    }
    return current;
  }
  function rate(req, key, maximum, windowMs) {
    prune();
    const bucketKey = `${req.socket.remoteAddress || 'unknown'}:${key}`;
    const bucket = buckets.get(bucketKey) || { count: 0, until: now() + windowMs };
    if (bucket.count >= maximum || buckets.size > 10000) throw error(429, '尝试过于频繁，请稍后再试。');
    bucket.count++; buckets.set(bucketKey, bucket);
  }
  async function hash(password, salt) {
    if (hashJobs >= 2) throw error(503, '登录服务繁忙，请稍后重试。');
    hashJobs++;
    try { return (await scrypt(password, Buffer.from(salt, 'hex'), 32, HASH_OPTIONS)).toString('hex'); }
    finally { hashJobs--; }
  }
  async function verify(password, user) {
    // Unknown accounts run the same expensive KDF and return the same error.
    const candidate = await hash(password, user?.passwordSalt || '0'.repeat(32));
    return Boolean(user) && crypto.timingSafeEqual(Buffer.from(candidate, 'hex'), Buffer.from(user.passwordHash, 'hex'));
  }
  async function body(req) {
    if (String(req.headers['content-type'] || '').split(';')[0].trim() !== 'application/json') throw error(415, '请求必须使用 JSON 格式。');
    req.setTimeout(15000, () => req.destroy());
    const chunks = []; let size = 0;
    for await (const chunk of req) {
      size += chunk.length;
      if (size > 2 * 1024 * 1024) throw error(413, '请求内容过大。');
      chunks.push(chunk);
    }
    let result;
    try { result = JSON.parse(Buffer.concat(chunks).toString('utf8')); } catch { throw error(400, '请求格式无效。'); }
    if (!result || Array.isArray(result) || typeof result !== 'object') throw error(400, '请求格式无效。');
    return result;
  }
  function profileValues(data) {
    const nickname = typeof data.nickname === 'string' ? data.nickname.trim() : '';
    const email = typeof data.email === 'string' ? data.email.trim() : '';
    const phone = typeof data.phone === 'string' ? data.phone.trim() : '';
    const avatar = typeof data.avatar === 'string' ? data.avatar : '';
    if (!nickname || nickname.length > 32) throw error(400, '昵称须为 1–32 个字符。');
    if (email.length > 120 || email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw error(400, '邮箱格式无效。');
    if (phone.length > 24 || phone && !/^[+\d()\s-]+$/.test(phone)) throw error(400, '手机号格式无效。');
    if (avatar.length > 1400000 || avatar && !/^data:image\/(?:png|jpeg|webp|gif);base64,[a-zA-Z0-9+/]+={0,2}$/.test(avatar)) throw error(400, '头像格式无效或超过 1 MB。');
    return { nickname, email, phone, avatar };
  }
  async function handle(req, res, url) {
    if (!url.pathname.startsWith('/api/auth/')) return false;
    try {
      if (req.method === 'GET' && url.pathname === '/api/auth/session') {
        const current = available ? sessionFor(req) : null;
        if (!current) cookie(res, '', 0);
        response(res, 200, { available, authenticated: Boolean(current), user: current ? publicUser(current.user) : null, csrfToken: current?.session.csrf || '', registrationEnabled: !fixedMode, message: available ? '' : unavailableMessage });
        return true;
      }
      if (!available) throw error(503, unavailableMessage);
      if (req.method !== 'POST') throw error(405, '不支持此请求方式。');
      assertSameOrigin(req);
      if (url.pathname === '/api/auth/register' || url.pathname === '/api/auth/login') {
        if (fixedMode && url.pathname.endsWith('/register')) throw error(403, '本站账号由管理员统一配置，不开放自行注册。');
        const data = await body(req);
        const username = typeof data.account === 'string' ? data.account.trim().toLowerCase() : '';
        if (!usernameValid(username)) throw error(400, '账号须为 3–32 位字母、数字、下划线或连字符。');
        if (typeof data.password !== 'string' || data.password.length < (fixedMode ? 1 : 10) || data.password.length > 128) throw error(400, fixedMode ? '密码格式无效。' : '本站密码须为 10–128 个字符。');
        // A classroom may share one public IP. The per-account limit remains strict.
        rate(req, 'credentials', 300, 10 * 60 * 1000);
        rate(req, `account:${username}`, 15, 10 * 60 * 1000);
        if (url.pathname.endsWith('/register')) {
          rate(req, 'register', 100, 60 * 60 * 1000);
          if (data.password !== data.passwordConfirm) throw error(400, '两次输入的密码不一致。');
          const values = profileValues({ nickname: data.nickname || username });
          const passwordSalt = crypto.randomBytes(16).toString('hex');
          const passwordHash = await hash(data.password, passwordSalt);
          if (users.some(user => user.username === username)) throw error(409, '该账号已注册，请登录或更换账号。');
          if (users.length >= 5000) throw error(503, '注册名额已满，请联系管理员。');
          const user = { id: crypto.randomUUID(), username, ...values, passwordSalt, passwordHash, authVersion: 1 };
          save([...users, user]);
          response(res, 201, issue(req, res, user));
        } else {
          const user = users.find(item => item.username === username);
          if (!await verify(data.password, user)) throw error(401, '账号或密码错误。');
          // A simultaneous password change must not revive the old credential.
          if (!users.includes(user)) throw error(401, '账号信息已更新，请重新登录。');
          response(res, 200, issue(req, res, user));
        }
        return true;
      }
      const current = authorize(req, res);
      if (!current) return true;
      if (url.pathname === '/api/auth/logout') {
        sessions.delete(digest(tokenFrom(req))); cookie(res, '', 0);
        response(res, 200, { ok: true }); return true;
      }
      if (url.pathname === '/api/auth/profile') {
        if (fixedMode) throw error(403, '固定账号不支持修改资料或密码。');
        rate(req, 'profile', 30, 60 * 1000);
        const data = await body(req), values = profileValues(data);
        let updated = { ...current.user, ...values };
        if (data.password) {
          rate(req, 'password', 10, 10 * 60 * 1000);
          if (!passwordValid(data.password) || data.password !== data.passwordConfirm) throw error(400, '新密码须为 10–128 个字符，且两次输入一致。');
          if (!passwordValid(data.currentPassword) || !await verify(data.currentPassword, current.user)) throw error(400, '当前密码不正确。');
          const passwordSalt = crypto.randomBytes(16).toString('hex');
          updated = { ...updated, passwordSalt, passwordHash: await hash(data.password, passwordSalt), authVersion: current.user.authVersion + 1 };
        }
        if (!users.includes(current.user) || !sessions.has(digest(tokenFrom(req)))) throw error(401, '账号或会话已更新，请重新登录。');
        save(users.map(user => user.id === updated.id ? updated : user));
        if (data.password) { revoke(updated.id); response(res, 200, issue(req, res, updated)); }
        else response(res, 200, { user: publicUser(updated), csrfToken: current.session.csrf, authenticated: true, available: true });
        return true;
      }
      throw error(404, '接口不存在。');
    } catch (failure) {
      response(res, failure.status || 503, { message: failure.status ? failure.message : '账号服务保存或读取失败，请稍后重试。' });
      return true;
    }
  }
  return { handle, authorize, get available() { return available; } };
}

module.exports = { createAuth };
