const http = require('http');
const fsSync = require('fs');
const path = require('path');

const root = __dirname;
const port = Number(process.env.PORT || process.env.OMS_PTA_PORT || 4173);
const oneCompilerEndpoint = process.env.ONECOMPILER_ENDPOINT || 'https://api.onecompiler.org/v1/run';
const oneCompilerApiKey = process.env.ONECOMPILER_API_KEY || '';
const publicFiles = new Map([
  ['/', 'index.html'], ['/index.html', 'index.html'], ['/pta-clone.css', 'pta-clone.css'], ['/pta-clone-fix.css', 'pta-clone-fix.css'], ['/pta-clone-interactions.css', 'pta-clone-interactions.css'], ['/codemirror.css', 'codemirror.css'], ['/pta-icons.css', 'pta-icons.css'], ['/pta-theme.css', 'pta-theme.css'], ['/judge-machine.css', 'judge-machine.css'], ['/pta-geometry.css', 'pta-geometry.css'], ['/pta-clone.js', 'pta-clone.js'], ['/pta-clone-interactions.js', 'pta-clone-interactions.js'], ['/codemirror-editor.js', 'codemirror-editor.js'], ['/judge-machine.js', 'judge-machine.js'], ['/pta-geometry.js', 'pta-geometry.js']
]);
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8' };
const oneCompilerLanguages = {
  'C++ (g++)': { language: 'cpp', file: 'main.cpp' },
  'C (gcc)': { language: 'c', file: 'main.c' },
  'Python 3': { language: 'python', file: 'main.py' },
  'Java 17': { language: 'java', file: 'Main.java' }
};
const rateBuckets = new Map();

function reply(res, status, body, type = 'application/json; charset=utf-8') {
  res.writeHead(status, { 'Content-Type': type, 'Cache-Control': 'no-store', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'content-type', 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS' });
  res.end(Buffer.isBuffer(body) ? body : typeof body === 'string' ? body : JSON.stringify(body));
}
function collect(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => { body += chunk; if (body.length > 256 * 1024) req.destroy(new Error('请求过大')); });
    req.on('end', () => { try { resolve(JSON.parse(body || '{}')); } catch { reject(new Error('请求格式无效')); } });
    req.on('error', reject);
  });
}
function normalized(text) { return String(text || '').replace(/\r\n/g, '\n').replace(/[ \t]+(?=\n)/g, '').trimEnd(); }
function suppliedTests(value) {
  if (!Array.isArray(value) || !value.length || value.length > 20) return null;
  const tests = value.map(test => ({ input: String(test && test.input || ''), expected: String(test && test.expected || '') }));
  return tests.some(test => test.input.length > 32768 || test.expected.length > 32768) ? null : tests;
}
function permitsRequest(req) {
  const ip = req.socket.remoteAddress || 'unknown'; const now = Date.now(); const bucket = (rateBuckets.get(ip) || []).filter(time => now - time < 60000);
  if (bucket.length >= 20) return false;
  bucket.push(now); rateBuckets.set(ip, bucket); return true;
}
async function oneCompilerRun(language, source, input) {
  if (!oneCompilerApiKey) throw Error('尚未配置 ONECOMPILER_API_KEY。');
  const controller = new AbortController(); const timeout = setTimeout(() => controller.abort(), 12000);
  try {
    const response = await fetch(oneCompilerEndpoint, { method: 'POST', signal: controller.signal, headers: { 'Content-Type': 'application/json', 'X-API-Key': oneCompilerApiKey }, body: JSON.stringify({ language: language.language, files: [{ name: language.file, content: source }], stdin: input }) });
    if (!response.ok) throw Error(`OneCompiler 服务响应异常（${response.status}）。`);
    const result = await response.json();
    if (result.status !== 'success') throw Error(result.error || 'OneCompiler 未能执行本次请求。');
    return result;
  } catch (error) {
    if (error.name === 'AbortError') throw Error('云端评测服务响应超时。');
    throw error;
  } finally { clearTimeout(timeout); }
}
function describeFailure(result, index, passed, total) {
  const detail = result.stderr || result.exception || '';
  if (result.exception) return { verdict: 'RuntimeError', message: `测试点 ${index + 1} 发生运行时错误。`, compilerOutput: detail, passedTests: passed, totalTests: total };
  if (result.stderr) return { verdict: 'CompilationError', message: '编译失败，请查看编译器输出。', compilerOutput: detail, passedTests: passed, totalTests: total };
  return null;
}
async function judge(payload) {
  const language = oneCompilerLanguages[payload.language]; const source = String(payload.code || ''); const tests = suppliedTests(payload.tests);
  if (!language) return { verdict: 'UnsupportedLanguage', message: '该语言暂未接入云端评测。', compilerOutput: '' };
  if (!source.trim()) return { verdict: 'CompilationError', message: '请先编写代码。', compilerOutput: '' };
  if (source.length > 65536) return { verdict: 'CompilationError', message: '代码长度超过 64 KB 限制。', compilerOutput: '' };
  if (!tests) return { verdict: 'NotConfigured', message: '该题尚未配置测试点。', compilerOutput: '' };
  let passed = 0;
  for (let index = 0; index < tests.length; index++) {
    const test = tests[index]; const result = await oneCompilerRun(language, source, test.input);
    const failure = describeFailure(result, index, passed, tests.length); if (failure) return failure;
    const output = result.stdout || '';
    if (normalized(output) !== normalized(test.expected)) return { verdict: 'WrongAnswer', message: `测试点 ${index + 1} 输出与预期不一致。`, compilerOutput: `你的输出：\n${output || '(空)'}\n\n预期输出：\n${test.expected}`, passedTests: passed, totalTests: tests.length };
    passed++;
  }
  return { verdict: 'Accepted', message: payload.mode === 'sample' ? '样例输出与预期输出一致。' : '所有测试点均已通过。', compilerOutput: `云端评测完成\n通过测试点：${passed}/${tests.length}`, passedTests: passed, totalTests: tests.length };
}
const server = http.createServer(async (req, res) => {
  if (req.method === 'OPTIONS') return reply(res, 204, '');
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  if (req.method === 'GET' && url.pathname === '/api/health') return reply(res, 200, { ok: true, runner: 'onecompiler', configured: Boolean(oneCompilerApiKey) });
  if (req.method === 'POST' && url.pathname === '/api/judge') {
    if (!permitsRequest(req)) return reply(res, 429, { verdict: 'RateLimited', message: '请求过于频繁，请稍后重试。', compilerOutput: '' });
    try { return reply(res, 200, await judge(await collect(req))); } catch (error) { return reply(res, 502, { verdict: 'ServerError', message: '云端评测服务暂不可用，请稍后重试。', compilerOutput: error.message }); }
  }
  if (req.method === 'GET' && publicFiles.has(url.pathname)) { const file = publicFiles.get(url.pathname); return reply(res, 200, fsSync.readFileSync(path.join(root, file)), types[path.extname(file)] || 'text/plain'); }
  reply(res, 404, 'Not found', 'text/plain; charset=utf-8');
});
server.listen(port, '0.0.0.0', () => console.log(`OMS PTA cloud judge: http://0.0.0.0:${port}`));
