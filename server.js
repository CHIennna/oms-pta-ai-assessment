const http = require('http');
const fsSync = require('fs');
const os = require('os');
const path = require('path');
const zlib = require('zlib');
const { LocalJudge } = require('./local-judge');
const { loadAndValidateExamData } = require('./validate-exam-data');
const { createAuth } = require('./auth');

const root = __dirname;
const port = Number(process.env.PORT || process.env.OMS_PTA_PORT || 4173);
const portableRuntime = configurePortableRuntime();
const localJudge = new LocalJudge();
const { exams, report: examValidation } = loadAndValidateExamData(
  path.join(root, 'exam-data.js'),
  [path.join(root, 'zixun-contest-data.js'), path.join(root, 'weekly-practice-2.js')]
);
const { testBank, testBankByExam, testAliases } = loadTestBank(exams);
const publicFiles = new Map([
  ['/fzu-brand-lockup-red.jpg', 'fzu-brand-lockup-red.jpg'],
  ['/', 'index.html'], ['/index.html', 'index.html'], ['/fzu-logo.png', 'fzu-logo.png'], ['/fzu-wordmark-official.jpg', 'fzu-wordmark-official.jpg'], ['/pta-clone.css', 'pta-clone.css'], ['/pta-clone-fix.css', 'pta-clone-fix.css'], ['/pta-clone-interactions.css', 'pta-clone-interactions.css'], ['/codemirror.css', 'codemirror.css'], ['/pta-icons.css', 'pta-icons.css'], ['/pta-theme.css', 'pta-theme.css'], ['/judge-machine.css', 'judge-machine.css'], ['/pta-geometry.css', 'pta-geometry.css'], ['/exam-data.js', 'exam-data.js'], ['/zixun-contest-data.js', 'zixun-contest-data.js'], ['/weekly-practice-2.js', 'weekly-practice-2.js'], ['/pta-clone.js', 'pta-clone.js'], ['/pta-clone-interactions.js', 'pta-clone-interactions.js'], ['/codemirror-editor.js', 'codemirror-editor.js'], ['/judge-score.js', 'judge-score.js'], ['/judge-machine.js', 'judge-machine.js'], ['/pta-geometry.js', 'pta-geometry.js']
]);
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.png': 'image/png', '.jpg': 'image/jpeg' };
const rateBuckets = new Map();
const auth = createAuth();
const zipArchives = new Map();
const archivedTestCases = new Map();

function openZipArchive(fileName) {
  const resolved = path.resolve(root, fileName);
  const allowedRoot = `${path.resolve(root)}${path.sep}`;
  if (!resolved.startsWith(allowedRoot)) throw new Error('测试库路径无效。');
  if (zipArchives.has(resolved)) return zipArchives.get(resolved);
  const buffer = fsSync.readFileSync(resolved);
  let endOffset = -1;
  for (let offset = buffer.length - 22; offset >= Math.max(0, buffer.length - 65557); offset -= 1) {
    if (buffer.readUInt32LE(offset) === 0x06054b50) { endOffset = offset; break; }
  }
  if (endOffset < 0) throw new Error('测试库 ZIP 目录无效。');
  const entryCount = buffer.readUInt16LE(endOffset + 10);
  let offset = buffer.readUInt32LE(endOffset + 16);
  const entries = new Map();
  for (let index = 0; index < entryCount; index += 1) {
    if (buffer.readUInt32LE(offset) !== 0x02014b50) throw new Error('测试库 ZIP 条目无效。');
    const method = buffer.readUInt16LE(offset + 10);
    const compressedSize = buffer.readUInt32LE(offset + 20);
    const uncompressedSize = buffer.readUInt32LE(offset + 24);
    const nameLength = buffer.readUInt16LE(offset + 28);
    const extraLength = buffer.readUInt16LE(offset + 30);
    const commentLength = buffer.readUInt16LE(offset + 32);
    const localOffset = buffer.readUInt32LE(offset + 42);
    const name = buffer.subarray(offset + 46, offset + 46 + nameLength).toString('utf8');
    entries.set(name, { method, compressedSize, uncompressedSize, localOffset });
    offset += 46 + nameLength + extraLength + commentLength;
  }
  const archive = { buffer, entries };
  zipArchives.set(resolved, archive);
  return archive;
}

function readZipText(fileName, entryName) {
  const archive = openZipArchive(fileName);
  const entry = archive.entries.get(entryName);
  if (!entry) throw new Error(`测试库缺少文件：${entryName}`);
  const { buffer } = archive;
  if (buffer.readUInt32LE(entry.localOffset) !== 0x04034b50) throw new Error(`测试库条目损坏：${entryName}`);
  const nameLength = buffer.readUInt16LE(entry.localOffset + 26);
  const extraLength = buffer.readUInt16LE(entry.localOffset + 28);
  const dataOffset = entry.localOffset + 30 + nameLength + extraLength;
  const compressed = buffer.subarray(dataOffset, dataOffset + entry.compressedSize);
  const output = entry.method === 0 ? compressed : entry.method === 8 ? zlib.inflateRawSync(compressed) : null;
  if (!output || output.length !== entry.uncompressedSize) throw new Error(`测试库压缩格式不受支持：${entryName}`);
  return output.toString('utf8');
}

function resolveTestCases(source) {
  if (Array.isArray(source)) return source;
  const key = `${source.file}:${source.prefix}`;
  if (archivedTestCases.has(key)) return archivedTestCases.get(key);
  const tests = Array.from({ length: source.count }, (_, index) => {
    const stem = `${source.prefix}/${String(index + 1).padStart(2, '0')}`;
    return { input: readZipText(source.file, `${stem}.in`), expected: readZipText(source.file, `${stem}.out`), score: source.score };
  });
  archivedTestCases.set(key, tests);
  return tests;
}

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
  for (const [examIndex, exam] of exams.entries()) {
    const examVersion = String(exam.examVersion || exam.title || examIndex);
    for (const question of (exam.questions || [])) {
      if (question.judgeable === false) continue;
      const id = String(question.id || '');
      if (!id) continue;
      const source = Array.isArray(question.testCases) && question.testCases.length ? question.testCases : question.testArchive;
      if (!bank.has(id)) bank.set(id, source);
      byExam.set(`${examVersion}:${id}`, source);
      for (const alias of question.legacyIds || []) aliases.set(`${examVersion}:${alias}`, id);
    }
  }
  return { testBank: bank, testBankByExam: byExam, testAliases: aliases };
}

function trustedPayload(payload) {
  if (!payload || payload.mode !== 'submit') return payload;
  const requestedId = String(payload.problemId || '');
  const examVersion = String(payload.examVersion || '');
  const aliasId = examVersion && testAliases.get(`${examVersion}:${requestedId}`);
  const canonicalId = examVersion && testBankByExam.has(`${examVersion}:${requestedId}`) ? requestedId : aliasId || requestedId;
  const source = examVersion ? testBankByExam.get(`${examVersion}:${canonicalId}`) : testBank.get(canonicalId);
  if (!source) {
    const error = new Error('题号与试卷不匹配，或该题暂不可评测。请刷新题库后重试。');
    error.statusCode = 400;
    throw error;
  }
  return { ...payload, problemId: canonicalId, tests: resolveTestCases(source) };
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
  if (await auth.handle(req, res, url)) return;
  if (req.method === 'GET' && url.pathname === '/api/health') return reply(res, 200, { ok: true, ...localJudge.info(), authoritativeProblems: testBankByExam.size, authoritativeTests: examValidation.testCases, unjudgeableProblems: examValidation.unjudgeableProblems, examDataValidated: true, portableRuntime: portableRuntime.detected });
  if (req.method === 'POST' && url.pathname === '/api/judge') {
    if (!auth.authorize(req, res)) return;
    if (!permitsRequest(req)) return reply(res, 429, { verdict: 'RateLimited', message: '请求过于频繁，请稍后重试。', compilerOutput: '' });
    try { return reply(res, 200, await localJudge.judge(trustedPayload(await collect(req)))); } catch (error) { return reply(res, error.statusCode || 500, { verdict: error.statusCode === 400 ? 'InvalidProblem' : 'JudgeUnavailable', message: error.statusCode === 400 ? error.message : '自建评测机暂不可用，请稍后重试。', compilerOutput: error.message }); }
  }
  if (req.method === 'GET' && publicFiles.has(url.pathname)) { const file = publicFiles.get(url.pathname); return reply(res, 200, fsSync.readFileSync(path.join(root, file)), types[path.extname(file)] || 'text/plain'); }
  reply(res, 404, 'Not found', 'text/plain; charset=utf-8');
});
if (require.main === module) {
  server.listen(port, '0.0.0.0', () => console.log(`FZUPTA local judge: http://0.0.0.0:${port}`));
}

module.exports = { server, localJudge, testBank, testBankByExam, trustedPayload };
