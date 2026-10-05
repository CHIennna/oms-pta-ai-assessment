const http = require('http');
const fsSync = require('fs');
const os = require('os');
const path = require('path');
const { LocalJudge } = require('./local-judge');
const { loadAndValidateExamData } = require('./validate-exam-data');

const root = __dirname;
const port = Number(process.env.PORT || process.env.OMS_PTA_PORT || 4173);
const portableRuntime = configurePortableRuntime();
const localJudge = new LocalJudge();
const { exams, report: examValidation } = loadAndValidateExamData(path.join(root, 'exam-data.js'));
const { testBank, testBankByExam, testAliases, testTitles } = loadTestBank(exams);
const publicFiles = new Map([
  ['/', 'index.html'], ['/index.html', 'index.html'], ['/pta-clone.css', 'pta-clone.css'], ['/pta-clone-fix.css', 'pta-clone-fix.css'], ['/pta-clone-interactions.css', 'pta-clone-interactions.css'], ['/codemirror.css', 'codemirror.css'], ['/pta-icons.css', 'pta-icons.css'], ['/pta-theme.css', 'pta-theme.css'], ['/judge-machine.css', 'judge-machine.css'], ['/pta-geometry.css', 'pta-geometry.css'], ['/exam-data.js', 'exam-data.js'], ['/pta-clone.js', 'pta-clone.js'], ['/pta-clone-interactions.js', 'pta-clone-interactions.js'], ['/codemirror-editor.js', 'codemirror-editor.js'], ['/judge-machine.js', 'judge-machine.js'], ['/pta-geometry.js', 'pta-geometry.js']
]);
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8' };
const rateBuckets = new Map();

function configurePortableRuntime() {
  const runtimeCandidates = [
    process.env.FZUPTA_RUNTIME_ROOT,
    path.join(os.homedir(), 'fzupta-runtime'),
    path.resolve(root, '..', 'fzupta-runtime')
  ].filter(Boolean);
  const runtimeRoot = runtimeCandidates.find(candidate => fsSync.existsSync(candidate)) || runtimeCandidates[0];
  const bins = [];
  const ucrtBin = path.join(runtimeRoot, 'msys64', 'ucrt64', 'bin');
  if (fsSync.existsSync(ucrtBin)) bins.push(ucrtBin);
  const javaRoot = path.join(runtimeRoot, 'java');
  if (fsSync.existsSync(javaRoot)) {
    for (const entry of fsSync.readdirSync(javaRoot, { withFileTypes: true })) {
      const bin = path.join(javaRoot, entry.name, 'bin');
      if (entry.isDirectory() && fsSync.existsSync(path.join(bin, process.platform === 'win32' ? 'javac.exe' : 'javac'))) bins.push(bin);
    }
  }
  if (bins.length) process.env.PATH = `${bins.join(path.delimiter)}${path.delimiter}${process.env.PATH || ''}`;
  return { detected: bins.length > 0, bins };
}

function loadTestBank(exams) {
  const bank = new Map();
  const byExam = new Map();
  const aliases = new Map();
  const titles = new Map();
  for (const [examIndex, exam] of exams.entries()) {
    const examVersion = String(exam.examVersion || exam.title || examIndex);
    for (const [questionIndex, question] of (exam.questions || []).entries()) {
      if (question.judgeable === false) continue;
      const id = String(question.id || '');
      if (!id) continue;
      if (!bank.has(id)) bank.set(id, question.testCases);
      byExam.set(`${examVersion}:${id}`, question.testCases);
      if (question.name && !titles.has(String(question.name).trim())) titles.set(String(question.name).trim(), question.testCases);
      if (examIndex === 0) {
        aliases.set(String(questionIndex + 1), id);
      }
    }
  }
  return { testBank: bank, testBankByExam: byExam, testAliases: aliases, testTitles: titles };
}

function trustedPayload(payload) {
  if (!payload || payload.mode !== 'submit') return payload;
  const requestedId = String(payload.problemId || '');
  const examVersion = String(payload.examVersion || '');
  const title = String(payload.problem && payload.problem.title || '').trim();
  const aliasId = testAliases.get(requestedId);
  const tests = testBankByExam.get(`${examVersion}:${requestedId}`)
    || testTitles.get(title)
    || testBank.get(requestedId)
    || testBank.get(aliasId)
    || [];
  return { ...payload, tests };
}

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
function permitsRequest(req) {
  const ip = req.socket.remoteAddress || 'unknown'; const now = Date.now(); const bucket = (rateBuckets.get(ip) || []).filter(time => now - time < 60000);
  if (bucket.length >= 20) return false;
  bucket.push(now); rateBuckets.set(ip, bucket); return true;
}
const server = http.createServer(async (req, res) => {
  if (req.method === 'OPTIONS') return reply(res, 204, '');
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  if (req.method === 'GET' && url.pathname === '/api/health') return reply(res, 200, { ok: true, ...localJudge.info(), authoritativeProblems: testBankByExam.size, authoritativeTests: examValidation.testCases, unjudgeableProblems: examValidation.unjudgeableProblems, examDataValidated: true, portableRuntime: portableRuntime.detected });
  if (req.method === 'POST' && url.pathname === '/api/judge') {
    if (!permitsRequest(req)) return reply(res, 429, { verdict: 'RateLimited', message: '请求过于频繁，请稍后重试。', compilerOutput: '' });
    try { return reply(res, 200, await localJudge.judge(trustedPayload(await collect(req)))); } catch (error) { return reply(res, 500, { verdict: 'JudgeUnavailable', message: '自建评测机暂不可用，请稍后重试。', compilerOutput: error.message }); }
  }
  if (req.method === 'GET' && publicFiles.has(url.pathname)) { const file = publicFiles.get(url.pathname); return reply(res, 200, fsSync.readFileSync(path.join(root, file)), types[path.extname(file)] || 'text/plain'); }
  reply(res, 404, 'Not found', 'text/plain; charset=utf-8');
});
if (require.main === module) {
  server.listen(port, '0.0.0.0', () => console.log(`FZUPTA local judge: http://0.0.0.0:${port}`));
}

module.exports = { server, localJudge, testBank, testBankByExam };
