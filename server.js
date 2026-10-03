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
    if (result.status !== 'success') return { ...result, stderr: result.stderr || result.error || result.message || '' };
    return result;
  } catch (error) {
    if (error.name === 'AbortError') throw Error('云端评测服务响应超时。');
    throw error;
  } finally { clearTimeout(timeout); }
}
function aiReviewResult(value) {
  const raw = value && typeof value === 'object' ? value : {};
  const verdicts = new Set(['Accepted', 'WrongAnswer', 'CompilationError', 'RuntimeError', 'TimeLimitExceeded', 'NeedsReview']);
  const text = value => String(value || '').trim().slice(0, 4000);
  const testCases = Array.isArray(raw.testCases) ? raw.testCases.slice(0, 5).map(test => ({
    input: text(test && test.input), expected: text(test && test.expected), reason: text(test && test.reason)
  })) : [];
  return {
    verdict: verdicts.has(raw.verdict) ? raw.verdict : 'NeedsReview',
    confidence: text(raw.confidence) || '低',
    summary: text(raw.summary) || 'AI 未能给出完整结论，请结合测试点人工核验。',
    testCases,
    findings: Array.isArray(raw.findings) ? raw.findings.slice(0, 6).map(text).filter(Boolean) : [],
    suggestions: Array.isArray(raw.suggestions) ? raw.suggestions.slice(0, 6).map(text).filter(Boolean) : []
  };
}
async function assessWithDeepSeek(payload) {
  if (!deepSeekApiKey) throw Error('尚未配置 DEEPSEEK_API_KEY。');
  const code = String(payload.code || '');
  const language = String(payload.language || '');
  const problem = payload.problem && typeof payload.problem === 'object' ? payload.problem : {};
  const title = String(problem.title || '').slice(0, 500);
  const statement = String(problem.statement || '').slice(0, 16000);
  if (!code.trim()) return { verdict: 'CompilationError', confidence: '高', summary: '请先编写代码，再进行 AI 辅助评测。', testCases: [], findings: [], suggestions: [] };
  if (!title || !statement) throw Error('题目信息不完整，暂不能进行 AI 辅助评测。');
  if (code.length > 65536) throw Error('代码长度超过 64 KB 限制。');
  const system = '你是程序设计考试的 AI 辅助评测员。不能声称自己实际执行过代码；所有结论都是基于题目与代码的静态推理。生成覆盖边界情况的测试点并判断最可能的 PTA 式评测状态。只返回 JSON 对象，不要 Markdown。JSON 格式：{"verdict":"Accepted|WrongAnswer|CompilationError|RuntimeError|TimeLimitExceeded|NeedsReview","confidence":"高|中|低","summary":"简洁结论，明确说明这是静态推理","testCases":[{"input":"","expected":"","reason":""}],"findings":[""],"suggestions":[""]}。Accepted 仅用于逻辑和边界均未发现问题时；WrongAnswer 用于可推导的输出错误；CompilationError 用于明显语法或语言错误；RuntimeError 仅用于明显异常访问、空指针或越界等运行时崩溃风险；TimeLimitExceeded 仅用于复杂度明显超过题目限制；其余一律 NeedsReview。预期输出必须来自你可解释的推导；无法可靠推导时，测试点 expected 写空并在 reason 说明。';
  const user = `题目：${title}\n\n题目描述：\n${statement}\n\n语言：${language}\n\n考生代码：\n${code}`;
  const controller = new AbortController(); const timeout = setTimeout(() => controller.abort(), 25000);
  try {
    const response = await fetch(deepSeekEndpoint, {
      method: 'POST', signal: controller.signal,
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${deepSeekApiKey}` },
      body: JSON.stringify({ model: deepSeekModel, temperature: 0.2, max_tokens: 1800, response_format: { type: 'json_object' }, messages: [{ role: 'system', content: system }, { role: 'user', content: user }] })
    });
    if (!response.ok) throw Error(`DeepSeek 服务响应异常（${response.status}）。`);
    const data = await response.json(); const content = data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content;
    if (!content) throw Error('DeepSeek 未返回评测内容。');
    try { return aiReviewResult(JSON.parse(content)); } catch { throw Error('DeepSeek 返回格式异常，请稍后重试。'); }
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
  const language = oneCompilerLanguages[payload.language]; const source = String(payload.code || '');
  if (!language) return { verdict: 'NeedsReview', message: '该语言暂未接入云端评测。', testCases: [] };
  if (!source.trim()) return { verdict: 'CompilationError', message: '请先编写代码。', testCases: [] };
  if (source.length > 65536) return { verdict: 'CompilationError', message: '代码长度超过 64 KB 限制。', testCases: [] };
  const review = await assessWithDeepSeek(payload);
  const generated = review.testCases.filter(test => test && String(test.expected || '').trim()).slice(0, 3);
  if (!generated.length) return { ...review, verdict: 'NeedsReview', message: 'DeepSeek 未能可靠生成带预期输出的测试点，本次提交未执行。', testCases: review.testCases.map(test => ({ ...test, verdict: 'NeedsReview', actual: '', metric: '--' })), passedTests: 0, totalTests: 0 };
  const testCases = []; let passed = 0; let terminal = '';
  for (let index = 0; index < generated.length; index++) {
    const test = generated[index];
    try {
      const result = await oneCompilerRun(language, source, test.input);
      const failure = describeFailure(result, index, passed, generated.length);
      if (failure) {
        testCases.push({ ...test, actual: result.stdout || '', verdict: failure.verdict, metric: runMetric(result), detail: failure.compilerOutput || '' });
        terminal = failure.verdict; break;
      }
      const actual = result.stdout || ''; const correct = normalized(actual) === normalized(test.expected);
      if (correct) passed++;
      testCases.push({ ...test, actual, verdict: correct ? 'Accepted' : 'WrongAnswer', metric: runMetric(result) });
    } catch (error) {
      testCases.push({ ...test, actual: '', verdict: 'NeedsReview', metric: '--', detail: error.message });
      terminal = 'NeedsReview'; break;
    }
  }
  const verdict = terminal || (testCases.some(test => test.verdict === 'WrongAnswer') ? 'WrongAnswer' : 'Accepted');
  const compilerOutput = testCases.map((test, index) => `测试点 ${index + 1}：${test.verdict}\n实际输出：\n${test.actual || '(空)'}${test.detail ? `\n\n详情：\n${test.detail}` : ''}`).join('\n\n');
  return { ...review, verdict, message: verdict === 'Accepted' ? `云端实际执行通过 ${passed}/${generated.length} 个 AI 测试点。` : `云端实际执行通过 ${passed}/${generated.length} 个 AI 测试点。`, testCases, passedTests: passed, totalTests: generated.length, compilerOutput };
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
