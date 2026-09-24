const http = require('http');
const fs = require('fs/promises');
const fsSync = require('fs');
const os = require('os');
const path = require('path');
const { spawn } = require('child_process');
const crypto = require('crypto');

const root = __dirname;
const port = Number(process.env.OMS_PTA_PORT || 4173);
const compilerCandidates = [
  process.env.DEVCXX_GPP_PATH,
  'E:\\新建文件夹\\Dev-Cpp\\MinGW64\\bin\\g++.exe',
  'C:\\Program Files (x86)\\Dev-Cpp\\MinGW64\\bin\\g++.exe',
  'C:\\Program Files\\Dev-Cpp\\MinGW64\\bin\\g++.exe'
].filter(Boolean);
const compilerPath = compilerCandidates.find(candidate => fsSync.existsSync(candidate));
const publicFiles = new Map([
  ['/', 'index.html'], ['/index.html', 'index.html'], ['/pta-clone.css', 'pta-clone.css'], ['/pta-clone-fix.css', 'pta-clone-fix.css'], ['/pta-clone-interactions.css', 'pta-clone-interactions.css'], ['/code-highlight.css', 'code-highlight.css'], ['/judge-machine.css', 'judge-machine.css'], ['/pta-geometry.css', 'pta-geometry.css'], ['/pta-clone.js', 'pta-clone.js'], ['/pta-clone-interactions.js', 'pta-clone-interactions.js'], ['/code-highlight.js', 'code-highlight.js'], ['/judge-machine.js', 'judge-machine.js'], ['/pta-geometry.js', 'pta-geometry.js']
]);
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8' };

function reply(res, status, body, type = 'application/json; charset=utf-8') {
  res.writeHead(status, { 'Content-Type': type, 'Cache-Control': 'no-store', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'content-type', 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS' });
  res.end(Buffer.isBuffer(body) ? body : typeof body === 'string' ? body : JSON.stringify(body));
}
function collect(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => { body += chunk; if (body.length > 1024 * 1024) reject(new Error('请求过大')); });
    req.on('end', () => { try { resolve(JSON.parse(body || '{}')); } catch { reject(new Error('请求格式无效')); } });
    req.on('error', reject);
  });
}
function execute(command, args, options = {}) {
  const { cwd, input = '', timeoutMs = 3000 } = options;
  return new Promise(resolve => {
    let stdout = '', stderr = '', timedOut = false, settled = false;
    const child = spawn(command, args, { cwd, shell: false, windowsHide: true, env: { ...process.env, PATH: `${path.dirname(compilerPath || command)};${process.env.PATH || ''}` } });
    const finish = result => { if (!settled) { settled = true; clearTimeout(timer); resolve(result); } };
    const append = (name, chunk) => { if (name === 'stdout') stdout += chunk; else stderr += chunk; if (stdout.length + stderr.length > 65536) child.kill(); };
    child.stdout.on('data', chunk => append('stdout', chunk.toString()));
    child.stderr.on('data', chunk => append('stderr', chunk.toString()));
    child.on('error', error => finish({ code: -1, error: error.message, stdout, stderr, timedOut }));
    child.on('close', code => finish({ code, stdout, stderr, timedOut }));
    const timer = setTimeout(() => { timedOut = true; child.kill(); }, timeoutMs);
    child.stdin.end(input);
  });
}
function normalized(text) { return text.replace(/\r\n/g, '\n').replace(/[ \t]+(?=\n)/g, '').trimEnd(); }
function digitStats(input) {
  const value = input.trim();
  if (!/^\d+$/.test(value)) return null;
  const count = Array(10).fill(0); for (const char of value) count[Number(char)]++;
  return count.map((n, digit) => n ? `${digit}:${n}` : '').filter(Boolean).join('\n');
}
function suppliedTests(value) {
  if (!Array.isArray(value) || !value.length || value.length > 50) return null;
  const tests = value.map(test => ({ input: String(test && test.input || ''), expected: String(test && test.expected || '') }));
  if (tests.some(test => test.input.length > 65536 || test.expected.length > 65536)) return null;
  return tests;
}
function getTests(payload) {
  const configured = suppliedTests(payload.tests);
  if (configured) return configured;
  if (payload.problemId !== '1003') return null;
  if (payload.mode === 'sample') { const expected = digitStats(payload.input || ''); return expected === null ? [] : [{ input: payload.input || '', expected }]; }
  return ['100311', '909090', '1234567890'].map(value => ({ input: value, expected: digitStats(value) }));
}
async function judge(payload) {
  if (!compilerPath) return { verdict: 'ServerError', message: '没有找到 Dev-C++ 的 g++.exe。请设置 DEVCXX_GPP_PATH 后重启服务。', compilerOutput: '' };
  if (payload.language !== 'C++ (g++)') return { verdict: 'UnsupportedLanguage', message: '本机评测当前只配置了 Dev-C++ 的 C++ 编译器。', compilerOutput: '' };
  const tests = getTests(payload);
  if (tests === null) return { verdict: 'NotConfigured', message: '该题尚未配置测试数据，无法给出真实判题结论。', compilerOutput: '' };
  if (!tests.length) return { verdict: 'WrongAnswer', message: '标准输入应为仅包含数字的正整数。', compilerOutput: '' };
  const runsRoot = path.join(os.tmpdir(), 'oms-pta-judge'); await fs.mkdir(runsRoot, { recursive: true });
  const job = path.join(runsRoot, `job-${crypto.randomUUID()}`); await fs.mkdir(job);
  const source = path.join(job, 'main.cpp'), executable = path.join(job, 'main.exe');
  const startedAt = Date.now();
  try {
    await fs.writeFile(source, String(payload.code || ''), 'utf8');
    const compiled = await execute(compilerPath, ['-std=gnu++11', '-O2', '-pipe', source, '-o', executable], { cwd: job, timeoutMs: 15000 });
    if (compiled.timedOut) return { verdict: 'CompilationError', message: '编译超时。', compilerOutput: compiled.stderr || compiled.stdout, passedTests: 0, totalTests: tests.length, timeMs: Date.now() - startedAt };
    if (compiled.code !== 0) return { verdict: 'CompilationError', message: '编译失败，请查看编译器输出。', compilerOutput: compiled.stderr || compiled.stdout, passedTests: 0, totalTests: tests.length, timeMs: Date.now() - startedAt };
    let passed = 0;
    for (let index = 0; index < tests.length; index++) {
      const test = tests[index]; const executed = await execute(executable, [], { cwd: job, input: `${test.input}\n`, timeoutMs: 2500 });
      if (executed.timedOut) return { verdict: 'TimeLimitExceeded', message: `测试点 ${index + 1} 运行超过 2.5 秒。`, compilerOutput: executed.stderr || '运行超时。', passedTests: passed, totalTests: tests.length, timeMs: Date.now() - startedAt };
      if (executed.code !== 0) return { verdict: 'RuntimeError', message: `测试点 ${index + 1} 发生运行时错误。`, compilerOutput: executed.stderr || `进程退出代码：${executed.code}`, passedTests: passed, totalTests: tests.length, timeMs: Date.now() - startedAt };
      if (normalized(executed.stdout) !== normalized(test.expected)) return { verdict: 'WrongAnswer', message: `测试点 ${index + 1} 输出与预期不一致。`, compilerOutput: `编译成功\n\n你的输出：\n${executed.stdout || '(空)'}\n\n预期输出：\n${test.expected}`, passedTests: passed, totalTests: tests.length, timeMs: Date.now() - startedAt };
      passed++;
    }
    return { verdict: 'Accepted', message: payload.mode === 'sample' ? '样例输出与预期输出一致。' : '所有测试点均已通过。', compilerOutput: `编译成功\n运行完成，退出代码：0\n通过测试点：${passed}/${tests.length}`, passedTests: passed, totalTests: tests.length, timeMs: Date.now() - startedAt, memory: '—' };
  } finally { await fs.rm(job, { recursive: true, force: true }); }
}
const server = http.createServer(async (req, res) => {
  if (req.method === 'OPTIONS') return reply(res, 204, '');
  const url = new URL(req.url, `http://${req.headers.host || '127.0.0.1'}`);
  if (req.method === 'POST' && url.pathname === '/api/judge') { try { return reply(res, 200, await judge(await collect(req))); } catch (error) { return reply(res, 500, { verdict: 'ServerError', message: error.message, compilerOutput: error.stack || '' }); } }
  if (req.method === 'GET' && publicFiles.has(url.pathname)) { const file = publicFiles.get(url.pathname); return reply(res, 200, fsSync.readFileSync(path.join(root, file)), types[path.extname(file)] || 'text/plain'); }
  reply(res, 404, 'Not found', 'text/plain; charset=utf-8');
});
server.listen(port, '127.0.0.1', () => console.log(`OMS PTA local judge: http://127.0.0.1:${port}`));
