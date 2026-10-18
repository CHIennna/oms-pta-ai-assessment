const http = require('http');
const fsSync = require('fs');
const crypto = require('crypto');
const os = require('os');
const path = require('path');
const zlib = require('zlib');
const { LocalJudge } = require('./src/server/judge/local-judge');
const { loadAndValidateExamData } = require('./validate-exam-data');
const { createAuth } = require('./src/server/auth/auth');
const { calculate: calculateScore } = require('./src/client/judge/judge-score');

const root = __dirname;
const examDataRoot = path.join(root, 'src', 'data', 'exams');
const port = Number(process.env.PORT || process.env.OMS_PTA_PORT || 4173);
const portableRuntime = configurePortableRuntime();
const localJudge = new LocalJudge();
const { exams, practiceExams, report: examValidation } = loadAndValidateExamData(
  path.join(examDataRoot, 'exam-data.js'),
  [path.join(examDataRoot, 'zixun-contest-data.js'), path.join(examDataRoot, 'weekly-practice-2.js'), path.join(examDataRoot, 'fuzhou-quality-check-20261018.js'), path.join(examDataRoot, 'fuzhou-quality-check-b-20261018.js'), path.join(examDataRoot, 'shenzhuo-round3-20260920.js'), path.join(examDataRoot, 'gplt-homework-2024-2026.js'), path.join(examDataRoot, 'fzu-practice-homework.js')]
);
const judgeExams = [...exams, ...practiceExams];
const { testBank, testBankByExam, testAliases, questionBankByExam } = loadTestBank(judgeExams);
const examsByVersion = new Map(judgeExams.map(exam => [String(exam.examVersion), exam]));
const publicFiles = new Map([
  ['/src/data/exams/gplt-homework-2024-2026.js', 'src/data/exams/gplt-homework-2024-2026.js'],
  ['/src/data/exams/shenzhuo-round3-20260920.js', 'src/data/exams/shenzhuo-round3-20260920.js'],
  ['/src/data/exams/fzu-practice-homework.js', 'src/data/exams/fzu-practice-homework.js'],
  ['/src/data/exams/fuzhou-quality-check-20261018.js', 'src/data/exams/fuzhou-quality-check-20261018.js'],
  ['/src/data/exams/fuzhou-quality-check-b-20261018.js', 'src/data/exams/fuzhou-quality-check-b-20261018.js'],
  ['/fzu-brand-lockup-red.jpg', 'fzu-brand-lockup-red.jpg'],
  ['/', 'index.html'], ['/index.html', 'index.html'], ['/fzu-logo.png', 'fzu-logo.png'], ['/fzu-wordmark-official.jpg', 'fzu-wordmark-official.jpg'],
  ['/src/client/assets/fzu-triangle-lattice.svg', 'src/client/assets/fzu-triangle-lattice.svg'],
  ['/src/client/styles/pta-clone.css', 'src/client/styles/pta-clone.css'], ['/src/client/styles/pta-clone-fix.css', 'src/client/styles/pta-clone-fix.css'], ['/src/client/styles/pta-clone-interactions.css', 'src/client/styles/pta-clone-interactions.css'],
  ['/src/client/editor/codemirror.css', 'src/client/editor/codemirror.css'], ['/src/client/styles/pta-icons.css', 'src/client/styles/pta-icons.css'], ['/src/client/styles/pta-theme.css', 'src/client/styles/pta-theme.css'], ['/src/client/judge/judge-machine.css', 'src/client/judge/judge-machine.css'], ['/src/client/styles/pta-geometry.css', 'src/client/styles/pta-geometry.css'],
  ['/src/data/exams/exam-data.js', 'src/data/exams/exam-data.js'], ['/src/data/exams/zixun-contest-data.js', 'src/data/exams/zixun-contest-data.js'], ['/src/data/exams/weekly-practice-2.js', 'src/data/exams/weekly-practice-2.js'],
  ['/src/client/core/pta-clone.js', 'src/client/core/pta-clone.js'], ['/src/client/core/pta-clone-interactions.js', 'src/client/core/pta-clone-interactions.js'], ['/src/client/editor/codemirror-editor.js', 'src/client/editor/codemirror-editor.js'], ['/src/client/judge/judge-score.js', 'src/client/judge/judge-score.js'], ['/src/client/judge/judge-machine.js', 'src/client/judge/judge-machine.js'], ['/src/client/core/pta-geometry.js', 'src/client/core/pta-geometry.js']
]);
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.svg': 'image/svg+xml; charset=utf-8', '.png': 'image/png', '.jpg': 'image/jpeg' };
const rateBuckets = new Map();
const auth = createAuth();
const progressFile = path.join(auth.dataDir, 'progress.json');
let progressStore = { version: 1, users: {} };
let progressStoreAvailable = false;
const zipArchives = new Map();
const archivedTestCases = new Map();

function loadProgressStore() {
  if (!auth.available) return;
  try {
    fsSync.mkdirSync(auth.dataDir, { recursive: true, mode: 0o700 });
    if (fsSync.existsSync(progressFile)) {
      if (fsSync.statSync(progressFile).size > 50 * 1024 * 1024) throw new Error('Progress store too large');
      const parsed = JSON.parse(fsSync.readFileSync(progressFile, 'utf8'));
      if (parsed?.version !== 1 || !parsed.users || Array.isArray(parsed.users) || typeof parsed.users !== 'object') throw new Error('Invalid progress store');
      progressStore = parsed;
    }
    progressStoreAvailable = true;
  } catch {
    progressStoreAvailable = false;
  }
}

function saveProgressStore(next) {
  if (!progressStoreAvailable) throw new Error('Progress store unavailable');
  const temporary = `${progressFile}.${crypto.randomBytes(8).toString('hex')}.tmp`;
  let descriptor;
  try {
    descriptor = fsSync.openSync(temporary, 'wx', 0o600);
    fsSync.writeFileSync(descriptor, JSON.stringify(next), 'utf8');
    fsSync.fsyncSync(descriptor);
    fsSync.closeSync(descriptor); descriptor = undefined;
    fsSync.renameSync(temporary, progressFile);
    progressStore = next;
    if (process.platform !== 'win32') {
      let directory;
      try { directory = fsSync.openSync(auth.dataDir, 'r'); fsSync.fsyncSync(directory); }
      finally { if (directory !== undefined) fsSync.closeSync(directory); }
    }
  } finally {
    if (descriptor !== undefined) fsSync.closeSync(descriptor);
    if (fsSync.existsSync(temporary)) fsSync.unlinkSync(temporary);
  }
}

function progressFor(userId) {
  const exams = progressStore.users[userId]?.exams;
  return { available: progressStoreAvailable, exams: exams && typeof exams === 'object' ? exams : {} };
}

function recordSubmission(current, payload, result, question) {
  if (!progressStoreAvailable || !question) return { progressSaved: false };
  const scoring = calculateScore(result, question);
  const userId = current.user.id;
  const examVersion = String(payload.examVersion);
  const problemId = String(payload.problemId);
  const previousUser = progressStore.users[userId] || { exams: {} };
  const previousExam = previousUser.exams?.[examVersion] || { scores: {}, statuses: {}, submissions: [] };
  const previousScore = Math.max(0, Number(previousExam.scores?.[problemId]) || 0);
  const bestScore = Math.max(previousScore, scoring.score);
  const bestStatus = scoring.maxScore > 0 && bestScore >= scoring.maxScore ? 'accepted' : bestScore > 0 ? 'partial' : 'wrong';
  const submission = {
    id: crypto.randomUUID(), examVersion, problemId,
    language: String(payload.language || '').slice(0, 40), verdict: String(result.verdict || ''),
    status: scoring.status, score: scoring.score, maxScore: scoring.maxScore,
    passedTests: Number(result.passedTests) || 0, totalTests: Number(result.totalTests) || 0,
    createdAt: new Date().toISOString()
  };
  const examProgress = {
    scores: { ...(previousExam.scores || {}), [problemId]: bestScore },
    statuses: { ...(previousExam.statuses || {}), [problemId]: bestStatus },
    submissions: [submission, ...(Array.isArray(previousExam.submissions) ? previousExam.submissions : [])].slice(0, 500),
    updatedAt: submission.createdAt
  };
  const next = {
    version: 1,
    users: {
      ...progressStore.users,
      [userId]: { exams: { ...(previousUser.exams || {}), [examVersion]: examProgress } }
    }
  };
  try {
    saveProgressStore(next);
    return { progressSaved: true, scoring, submission, progress: examProgress };
  } catch {
    progressStoreAvailable = false;
    return { progressSaved: false, scoring, submission };
  }
}

loadProgressStore();

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
  const questions = new Map();
  for (const [examIndex, exam] of exams.entries()) {
    const examVersion = String(exam.examVersion || exam.title || examIndex);
    for (const question of (exam.questions || [])) {
      if (question.judgeable === false) continue;
      const id = String(question.id || '');
      if (!id) continue;
      const source = Array.isArray(question.testCases) && question.testCases.length ? question.testCases : question.testArchive;
      if (!bank.has(id)) bank.set(id, source);
      byExam.set(`${examVersion}:${id}`, source);
      questions.set(`${examVersion}:${id}`, question);
      for (const alias of question.legacyIds || []) aliases.set(`${examVersion}:${alias}`, id);
    }
  }
  return { testBank: bank, testBankByExam: byExam, testAliases: aliases, questionBankByExam: questions };
}

function examTimestamp(value) {
  // Imported schedules without an offset are campus time, not the host's timezone.
  const text = String(value || '').trim().replace(' ', 'T');
  return Date.parse(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(?::\d{2}(?:\.\d+)?)?$/.test(text) ? `${text}+08:00` : text);
}

function assertExamOpen(examVersion, now = Date.now()) {
  const exam = examsByVersion.get(String(examVersion || ''));
  const reject = (statusCode, verdict, message) => { throw Object.assign(new Error(message), { statusCode, verdict }); };
  if (!exam) reject(400, 'InvalidProblem', '请选择有效的考试后再运行或提交。');
  if (exam.category === 'past' || exam.category === 'practice') return;
  const start = examTimestamp(exam.startAt), end = examTimestamp(exam.endAt);
  if (!Number.isFinite(start) || !Number.isFinite(end) || end <= start) reject(503, 'InvalidSchedule', '考试时间配置无效，请联系管理员。');
  if (now < start) reject(403, 'ExamNotStarted', '考试尚未开始，暂不能运行或提交。');
}

function trustedPayload(payload) {
  assertExamOpen(payload?.examVersion);
  if (payload.mode !== 'submit') return payload;
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
// Public lessons only: never forward credentials or proxy arbitrary hosts.
const carlPages = new Map();
let carlRequests = 0;
const patBasicProblemSetId = '994805260223102976';
let patBasicCache = null;
const patBasicProblemCache = new Map();
function carlPageUrl(value) {
  const url = new URL(value, 'https://programmercarl.com');
  if (url.origin !== 'https://programmercarl.com' || url.username || url.password ||
      url.search || !(/\/$|\.html$/.test(url.pathname))) {
    throw Object.assign(new Error('只支持代码随想录的公开讲解页面。'), { statusCode: 400 });
  }
  url.hash = '';
  return url;
}
async function fetchCarlPage(value) {
  let url = carlPageUrl(value);
  const key = url.href;
  const cached = carlPages.get(key);
  if (cached && Date.now() - cached.time < 300000) return cached.page;
  if (carlRequests >= 4) throw Object.assign(new Error('讲解加载繁忙，请稍后重试。'), { statusCode: 429 });
  carlRequests++;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);
  try {
    for (let redirects = 0; redirects <= 3; redirects++) {
      const response = await fetch(url, { redirect: 'manual', signal: controller.signal, headers: { Accept: 'text/html' } });
      if ([301, 302, 303, 307, 308].includes(response.status)) {
        await response.body?.cancel();
        const location = response.headers.get('location');
        if (!location) throw new Error('Missing redirect');
        url = carlPageUrl(new URL(location, url).href);
        continue;
      }
      if (!response.ok || !response.headers.get('content-type')?.includes('text/html')) {
        await response.body?.cancel();
        throw new Error('Lesson unavailable');
      }
      const chunks = [];
      let size = 0;
      for await (const chunk of response.body) {
        size += chunk.length;
        if (size > 4 * 1024 * 1024) { controller.abort(); throw new Error('Lesson too large'); }
        chunks.push(chunk);
      }
      const page = { url: url.href, html: Buffer.concat(chunks).toString('utf8') };
      carlPages.delete(key);
      if (carlPages.size >= 8) carlPages.delete(carlPages.keys().next().value);
      carlPages.set(key, { time: Date.now(), page });
      return page;
    }
    throw new Error('Too many redirects');
  } finally { clearTimeout(timeout); carlRequests--; }
}
async function fetchPatBasicProblems() {
  if (patBasicCache && Date.now() - patBasicCache.time < 300000) return patBasicCache.data;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);
  try {
    const pages = await Promise.all([0, 1].map(async page => {
      const url = `https://pintia.cn/api/problem-sets/${patBasicProblemSetId}/exam-problem-list?problem_type=PROGRAMMING&page=${page}&limit=100`;
      const response = await fetch(url, { signal: controller.signal, headers: { Accept: 'application/json' } });
      if (!response.ok || !response.headers.get('content-type')?.includes('application/json')) throw new Error('PAT list unavailable');
      return response.json();
    }));
    const problems = pages.flatMap(page => Array.isArray(page.problemSetProblems) ? page.problemSetProblems : []).map(problem => ({
      id: String(problem.id || ''), label: String(problem.label || ''), title: String(problem.title || '').slice(0, 200),
      score: Number(problem.score) || 0, acceptCount: Number(problem.acceptCount) || 0, submitCount: Number(problem.submitCount) || 0
    })).filter(problem => /^\d+$/.test(problem.id) && /^\d+$/.test(problem.label) && problem.title).sort((a, b) => Number(a.label) - Number(b.label));
    if (!problems.length || problems.length !== Number(pages[0]?.total)) throw new Error('Incomplete PAT list');
    const data = { problemSetId: patBasicProblemSetId, total: problems.length, problems };
    patBasicCache = { time: Date.now(), data };
    return data;
  } finally { clearTimeout(timeout); }
}
async function fetchPatBasicProblem(problemSetProblemId) {
  const id = String(problemSetProblemId || '');
  if (!/^\d+$/.test(id)) throw Object.assign(new Error('PAT 题号无效。'), { statusCode: 400 });
  const cached = patBasicProblemCache.get(id);
  if (cached && Date.now() - cached.time < 300000) return cached.data;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);
  try {
    const url = `https://pintia.cn/api/problem-sets/${patBasicProblemSetId}/exam-problems/${id}`;
    const response = await fetch(url, { signal: controller.signal, headers: { Accept: 'application/json' } });
    if (!response.ok || !response.headers.get('content-type')?.includes('application/json')) throw new Error('PAT problem unavailable');
    const payload = await response.json();
    const problem = payload?.problemSetProblem;
    if (String(problem?.id || '') !== id || String(problem?.problemSetId || '') !== patBasicProblemSetId) {
      throw Object.assign(new Error('该题目不属于 PAT 乙级题库。'), { statusCode: 404 });
    }
    const limits = problem.problemConfig?.programmingProblemConfig || {};
    const data = {
      id,
      label: String(payload.examLabel || problem.label || ''),
      title: String(problem.title || '').slice(0, 200),
      score: Number(problem.score) || 0,
      author: String(problem.author || '').slice(0, 200),
      organization: String(payload.organization?.name || '').slice(0, 200),
      content: String(problem.content || problem.description || '').slice(0, 1024 * 1024),
      limits: {
        time: Number(limits.timeLimit) || 0,
        memory: Number(limits.memoryLimit) || 0,
        code: Number(limits.codeSizeLimit) || 0,
        stack: Number(limits.stackSizeLimit) || 0
      }
    };
    if (!data.label || !data.title || !data.content) throw new Error('Incomplete PAT problem');
    if (patBasicProblemCache.size >= 50) patBasicProblemCache.delete(patBasicProblemCache.keys().next().value);
    patBasicProblemCache.set(id, { time: Date.now(), data });
    return data;
  } finally { clearTimeout(timeout); }
}
const server = http.createServer(async (req, res) => {
  if (req.method === 'OPTIONS') return reply(res, 204, '');
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  if (await auth.handle(req, res, url)) return;
  if (req.method === 'GET' && url.pathname === '/api/learning/carl') {
    try { return reply(res, 200, await fetchCarlPage(url.searchParams.get('url') || '/algo/')); }
    catch (error) { return reply(res, error.statusCode || 502, { message: error.statusCode ? error.message : '讲解暂时加载失败，请重试或打开原文。' }); }
  }
  if (req.method === 'GET' && url.pathname === '/api/learning/pat-basic') {
    try { return reply(res, 200, await fetchPatBasicProblems()); }
    catch { return reply(res, 502, { message: 'PAT 乙级题单暂时加载失败，请稍后重试或打开官方题库。' }); }
  }
  const patBasicProblemMatch = url.pathname.match(/^\/api\/learning\/pat-basic\/(\d+)$/);
  if (req.method === 'GET' && patBasicProblemMatch) {
    try { return reply(res, 200, await fetchPatBasicProblem(patBasicProblemMatch[1])); }
    catch (error) { return reply(res, error.statusCode || 502, { message: error.statusCode ? error.message : 'PAT 乙级题面暂时加载失败，请稍后重试。' }); }
  }
  if (req.method === 'GET' && url.pathname === '/api/progress') {
    const current = auth.authorize(req, res);
    if (!current) return;
    return reply(res, 200, progressFor(current.user.id));
  }
  if (req.method === 'GET' && url.pathname === '/api/health') return reply(res, 200, { ok: true, ...localJudge.info(), authoritativeProblems: testBankByExam.size, authoritativeTests: examValidation.testCases, unjudgeableProblems: examValidation.unjudgeableProblems, examDataValidated: true, progressPersistence: progressStoreAvailable, portableRuntime: portableRuntime.detected });
  if (req.method === 'POST' && url.pathname === '/api/judge') {
    const current = auth.authorize(req, res);
    if (!current) return;
    if (!permitsRequest(req)) return reply(res, 429, { verdict: 'RateLimited', message: '请求过于频繁，请稍后重试。', compilerOutput: '' });
    try {
      const payload = trustedPayload(await collect(req));
      const result = await localJudge.judge(payload);
      const recordable = payload.mode === 'submit' && ['Accepted', 'WrongAnswer', 'CompilationError', 'RuntimeError', 'TimeLimitExceeded'].includes(result.verdict);
      const question = questionBankByExam.get(`${payload.examVersion}:${payload.problemId}`);
      const persisted = recordable ? recordSubmission(current, payload, result, question) : {};
      return reply(res, 200, { ...result, ...persisted });
    } catch (error) { return reply(res, error.statusCode || 500, { verdict: error.verdict || (error.statusCode === 400 ? 'InvalidProblem' : 'JudgeUnavailable'), message: error.verdict || error.statusCode === 400 ? error.message : '自建评测机暂不可用，请稍后重试。', compilerOutput: error.message }); }
  }
  if (req.method === 'GET' && publicFiles.has(url.pathname)) { const file = publicFiles.get(url.pathname); return reply(res, 200, fsSync.readFileSync(path.join(root, file)), types[path.extname(file)] || 'text/plain'); }
  reply(res, 404, 'Not found', 'text/plain; charset=utf-8');
});
if (require.main === module) {
  server.listen(port, '0.0.0.0', () => console.log(`FZUPTA local judge: http://0.0.0.0:${port}`));
}

module.exports = { server, localJudge, testBank, testBankByExam, trustedPayload };
