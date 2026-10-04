const http = require('http');
const fsSync = require('fs');
const path = require('path');

const root = __dirname;
const port = Number(process.env.PORT || process.env.OMS_PTA_PORT || 4173);
const oneCompilerEndpoint = process.env.ONECOMPILER_ENDPOINT || 'https://api.onecompiler.org/v1/run';
const oneCompilerApiKey = process.env.ONECOMPILER_API_KEY || '';
const deepSeekEndpoint = process.env.DEEPSEEK_ENDPOINT || 'https://api.deepseek.com/chat/completions';
const deepSeekApiKey = process.env.DEEPSEEK_API_KEY || '';
const deepSeekModel = process.env.DEEPSEEK_MODEL || 'deepseek-chat';
const publicFiles = new Map([
  ['/', 'index.html'], ['/index.html', 'index.html'], ['/pta-clone.css', 'pta-clone.css'], ['/pta-clone-fix.css', 'pta-clone-fix.css'], ['/pta-clone-interactions.css', 'pta-clone-interactions.css'], ['/codemirror.css', 'codemirror.css'], ['/pta-icons.css', 'pta-icons.css'], ['/pta-theme.css', 'pta-theme.css'], ['/judge-machine.css', 'judge-machine.css'], ['/pta-geometry.css', 'pta-geometry.css'], ['/exam-data.js', 'exam-data.js'], ['/pta-clone.js', 'pta-clone.js'], ['/pta-clone-interactions.js', 'pta-clone-interactions.js'], ['/codemirror-editor.js', 'codemirror-editor.js'], ['/judge-machine.js', 'judge-machine.js'], ['/pta-geometry.js', 'pta-geometry.js']
]);
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8' };
const oneCompilerLanguages = {
  'C++ (g++)': { language: 'cpp', file: 'main.cpp' },
  'C++ (clang++)': { language: 'cpp', file: 'main.cpp' },
  'C (gcc)': { language: 'c', file: 'main.c' },
  'C (clang)': { language: 'c', file: 'main.c' },
  'Java': { language: 'java', file: 'Main.java' },
  'Python 3': { language: 'python', file: 'main.py' },
  'Python 2': { language: 'python2', file: 'main.py' },
  'PyPy': { language: 'python', file: 'main.py' }
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
  const tests = value.map(test => ({
    input: String(test && test.input || ''),
    expected: String(test && test.expected || ''),
    score: Number.isFinite(Number(test && test.score)) && Number(test.score) > 0 ? Number(test.score) : 0
  }));
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
    if (Array.isArray(result) || Array.isArray(result && result.results)) return result;
    if (result.status !== 'success') return { ...result, stderr: result.stderr || result.error || result.message || '' };
    return result;
  } catch (error) {
    if (error.name === 'AbortError') throw Error('云端评测服务响应超时。');
    throw error;
  } finally { clearTimeout(timeout); }
}
const aiVerdicts = new Set(['Accepted', 'WrongAnswer', 'CompilationError', 'RuntimeError', 'TimeLimitExceeded', 'NeedsReview']);
function fixedJudgeResult(value, tests) {
  const raw = value && typeof value === 'object' ? value : {};
  const text = value => String(value || '').trim().slice(0, 1000);
  const rows = Array.isArray(raw.testCases) ? raw.testCases.slice(0, tests.length) : [];
  const testCases = tests.map((test, index) => {
    const row = rows.find(item => Number(item && item.index) === index) || rows[index] || {};
    const verdict = aiVerdicts.has(row.verdict) ? row.verdict : 'NeedsReview';
    return {
      index,
      verdict,
      hint: verdict === 'Accepted' ? '无提示' : (text(row.hint || row.reason) || '需要人工核验'),
      score: test.score,
      memoryKb: null,
      timeMs: null
    };
  });
  const has = verdict => testCases.some(test => test.verdict === verdict);
  const verdict = testCases.every(test => test.verdict === 'Accepted') ? 'Accepted'
    : has('CompilationError') ? 'CompilationError'
      : has('RuntimeError') ? 'RuntimeError'
        : has('TimeLimitExceeded') ? 'TimeLimitExceeded'
          : has('WrongAnswer') ? 'WrongAnswer' : 'NeedsReview';
  const passedTests = testCases.filter(test => test.verdict === 'Accepted').length;
  return {
    verdict,
    confidence: text(raw.confidence) || '中',
    summary: text(raw.summary) || 'DeepSeek 已按题库固定测试点逐点判定。',
    testCases,
    passedTests,
    totalTests: tests.length,
    message: `DeepSeek 已完成 ${tests.length} 个固定测试点的逐点判定，通过 ${passedTests}/${tests.length}。`,
    compilerOutput: testCases.map(test => `测试点 ${test.index}：${test.verdict}${test.hint && test.hint !== '无提示' ? `（${test.hint}）` : ''}`).join('\n')
  };
}
async function assessWithDeepSeek(payload) {
  if (!deepSeekApiKey) throw Error('尚未配置 DEEPSEEK_API_KEY。');
  const code = String(payload.code || '');
  const language = String(payload.language || '');
  const tests = suppliedTests(payload.tests);
  const problem = payload.problem && typeof payload.problem === 'object' ? payload.problem : {};
  const title = String(problem.title || '').slice(0, 500);
  const statement = String(problem.statement || '').slice(0, 16000);
  if (!oneCompilerLanguages[language]) throw Error('该语言暂不支持评测。');
  if (!code.trim()) return { verdict: 'CompilationError', confidence: '高', summary: '请先编写代码。', testCases: [], passedTests: 0, totalTests: tests ? tests.length : 0 };
  if (!title || !statement) throw Error('题目信息不完整，暂不能进行 AI 辅助评测。');
  if (!tests) throw Error('该题尚未配置固定测试点。');
  if (code.length > 65536) throw Error('代码长度超过 64 KB 限制。');
  const system = '你是程序设计考试判题员。测试点已经由出题方固定提供，严禁生成、替换、删减或修改测试点。请静态推演考生代码在每个固定输入上的行为，并逐点与给定预期输出比较。不能声称实际运行过代码，不能编造内存或时间。只返回 JSON 对象，不要 Markdown。格式：{"confidence":"高|中|低","summary":"简洁总评","testCases":[{"index":0,"verdict":"Accepted|WrongAnswer|CompilationError|RuntimeError|TimeLimitExceeded|NeedsReview","hint":"无提示或简短错误原因"}]}。必须为每一个输入测试点返回且只返回一条结果，index 使用给定的 0 基编号。Accepted 表示该点输出应与预期完全一致；WrongAnswer 表示输出不一致；CompilationError 表示代码无法编译或解释；RuntimeError 表示该点会崩溃或异常终止；TimeLimitExceeded 表示该点明确会超时；无法可靠判断时使用 NeedsReview。';
  const fixedTests = tests.map((test, index) => ({ index, input: test.input, expected: test.expected }));
  const user = `题目：${title}\n\n题目描述：\n${statement}\n\n语言：${language}\n\n考生代码：\n${code}\n\n出题方固定测试点（不得改动）：\n${JSON.stringify(fixedTests)}`;
  const controller = new AbortController(); const timeout = setTimeout(() => controller.abort(), 45000);
  try {
    const response = await fetch(deepSeekEndpoint, {
      method: 'POST', signal: controller.signal,
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${deepSeekApiKey}` },
      body: JSON.stringify({ model: deepSeekModel, temperature: 0, max_tokens: 3200, response_format: { type: 'json_object' }, messages: [{ role: 'system', content: system }, { role: 'user', content: user }] })
    });
    if (!response.ok) throw Error(`DeepSeek 服务响应异常（${response.status}）。`);
    const data = await response.json(); const content = data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content;
    if (!content) throw Error('DeepSeek 未返回评测内容。');
    try { return fixedJudgeResult(JSON.parse(content), tests); } catch { throw Error('DeepSeek 返回格式异常，请稍后重试。'); }
  } catch (error) {
    if (error.name === 'AbortError') throw Error('DeepSeek 分析响应超时，请稍后重试。');
    throw error;
  } finally { clearTimeout(timeout); }
}
function describeFailure(result, index, passed, total) {
  const detail = result.stderr || result.exception || result.error || result.message || '';
  if (/time limit|timed out|timeout/i.test(detail)) return { verdict: 'TimeLimitExceeded', message: `测试点 ${index + 1} 运行超时。`, compilerOutput: detail, passedTests: passed, totalTests: total };
  if (result.exception) return { verdict: 'RuntimeError', message: `测试点 ${index + 1} 发生运行时错误。`, compilerOutput: detail, passedTests: passed, totalTests: total };
  if (/segmentation|runtime error|signal|out of bounds|null pointer/i.test(detail)) return { verdict: 'RuntimeError', message: `测试点 ${index + 1} 发生运行时错误。`, compilerOutput: detail, passedTests: passed, totalTests: total };
  if (result.stderr || result.error || result.status === 'error') return { verdict: 'CompilationError', message: '编译失败，请查看编译器输出。', compilerOutput: detail, passedTests: passed, totalTests: total };
  return null;
}
function runMetric(result) {
  const value = result && (result.executionTime ?? result.cpuTime ?? result.elapsedTime ?? result.time);
  return Number.isFinite(Number(value)) ? `${value} ms` : '--';
}
async function aiJudge(payload) {
  const language = oneCompilerLanguages[payload.language]; const source = String(payload.code || ''); const tests = suppliedTests(payload.tests);
  if (!language) return { verdict: 'NeedsReview', message: '该语言暂不支持评测。', testCases: [] };
  if (!source.trim()) return { verdict: 'CompilationError', message: '请先编写代码。', testCases: [] };
  if (source.length > 65536) return { verdict: 'CompilationError', message: '代码长度超过 64 KB 限制。', testCases: [] };
  if (!tests) return { verdict: 'NotConfigured', message: '该题尚未配置固定测试点。', testCases: [], passedTests: 0, totalTests: 0 };
  return assessWithDeepSeek({ ...payload, tests });
}
async function judge(payload) {
  const language = oneCompilerLanguages[payload.language]; const source = String(payload.code || ''); const tests = suppliedTests(payload.tests);
  if (!language) return { verdict: 'UnsupportedLanguage', message: '该语言暂未接入云端评测。', compilerOutput: '' };
  if (!source.trim()) return { verdict: 'CompilationError', message: '请先编写代码。', compilerOutput: '' };
  if (source.length > 65536) return { verdict: 'CompilationError', message: '代码长度超过 64 KB 限制。', compilerOutput: '' };
  if (!tests) return { verdict: 'NotConfigured', message: '该题尚未配置测试点。', compilerOutput: '' };
  const batch = await oneCompilerRun(language, source, tests.length === 1 ? tests[0].input : tests.map(test => test.input));
  let runs = Array.isArray(batch) ? batch : Array.isArray(batch && batch.results) ? batch.results : [batch];
  if (runs.length === 1 && tests.length > 1 && runs[0] && runs[0].status !== 'success') runs = tests.map(() => runs[0]);
  if (runs.length !== tests.length) throw Error('云端评测返回的测试点数量不完整。');
  const testCases = tests.map((test, index) => {
    const result = runs[index] || {};
    const failure = describeFailure(result, index, 0, tests.length);
    const memory = Number(result.memoryUsed ?? result.memory);
    const time = Number(result.executionTime ?? result.cpuTime ?? result.elapsedTime ?? result.time);
    if (failure) return { index, verdict: failure.verdict, hint: failure.message, score: test.score, memoryKb: Number.isFinite(memory) ? memory : null, timeMs: Number.isFinite(time) ? time : null, detail: failure.compilerOutput || '' };
    const output = result.stdout || '';
    const accepted = normalized(output) === normalized(test.expected);
    return { index, verdict: accepted ? 'Accepted' : 'WrongAnswer', hint: accepted ? '无提示' : '输出与预期不一致', score: test.score, memoryKb: Number.isFinite(memory) ? memory : null, timeMs: Number.isFinite(time) ? time : null, detail: accepted ? '' : `你的输出：\n${output || '(空)'}\n\n预期输出：\n${test.expected}` };
  });
  const priority = ['CompilationError', 'RuntimeError', 'TimeLimitExceeded', 'WrongAnswer'];
  const verdict = priority.find(value => testCases.some(test => test.verdict === value)) || 'Accepted';
  const passedTests = testCases.filter(test => test.verdict === 'Accepted').length;
  const firstFailure = testCases.find(test => test.verdict === verdict);
  const message = verdict === 'Accepted' ? (payload.mode === 'sample' ? '样例输出与预期输出一致。' : '所有测试点均已通过。') : firstFailure.hint;
  const compilerOutput = verdict === 'Accepted'
    ? `云端批量评测完成\n通过测试点：${passedTests}/${tests.length}`
    : `测试点 ${firstFailure.index + 1}：${firstFailure.hint}${firstFailure.detail ? `\n\n${firstFailure.detail}` : ''}`;
  return { verdict, message, compilerOutput, testCases: testCases.map(({ detail, ...test }) => test), passedTests, totalTests: tests.length };
}
const server = http.createServer(async (req, res) => {
  if (req.method === 'OPTIONS') return reply(res, 204, '');
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  if (req.method === 'GET' && url.pathname === '/api/health') return reply(res, 200, { ok: true, runner: 'onecompiler', configured: Boolean(oneCompilerApiKey), aiReviewer: 'deepseek', aiConfigured: Boolean(deepSeekApiKey) });
  if (req.method === 'POST' && url.pathname === '/api/judge') {
    if (!permitsRequest(req)) return reply(res, 429, { verdict: 'RateLimited', message: '请求过于频繁，请稍后重试。', compilerOutput: '' });
    try { return reply(res, 200, await judge(await collect(req))); } catch (error) { return reply(res, 502, { verdict: 'ServerError', message: '云端评测服务暂不可用，请稍后重试。', compilerOutput: error.message }); }
  }
  if (req.method === 'POST' && url.pathname === '/api/ai-assess') {
    if (!permitsRequest(req)) return reply(res, 429, { message: '请求过于频繁，请稍后重试。' });
    try { return reply(res, 200, await assessWithDeepSeek(await collect(req))); } catch (error) { return reply(res, 502, { message: 'AI 辅助评测暂不可用，请稍后重试。', detail: error.message }); }
  }
  if (req.method === 'POST' && url.pathname === '/api/ai-judge') {
    if (!permitsRequest(req)) return reply(res, 429, { message: '请求过于频繁，请稍后重试。' });
    try { return reply(res, 200, await aiJudge(await collect(req))); } catch (error) { return reply(res, 502, { message: 'AI 云端评测暂不可用，请稍后重试。', detail: error.message }); }
  }
  if (req.method === 'GET' && publicFiles.has(url.pathname)) { const file = publicFiles.get(url.pathname); return reply(res, 200, fsSync.readFileSync(path.join(root, file)), types[path.extname(file)] || 'text/plain'); }
  reply(res, 404, 'Not found', 'text/plain; charset=utf-8');
});
server.listen(port, '0.0.0.0', () => console.log(`OMS PTA cloud judge: http://0.0.0.0:${port}`));
