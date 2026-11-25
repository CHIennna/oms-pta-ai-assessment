'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const source = fs.readFileSync('./server.js', 'utf8');
const clientJudgeSource = fs.readFileSync('./src/client/judge/judge-machine.js', 'utf8');
const extract = (start, end) => source.slice(source.indexOf(start), source.indexOf(end, source.indexOf(start)));

function boundary(sampleChecker = '') {
  const cases = [{ input: '1\n', expected: '2\n', score: 100 }];
  const context = { assertExamOpen() {}, testAliases: new Map([['exam:old', 'q']]),
    testBankByExam: new Map([['exam:q', cases]]), testBank: new Map(),
    questionBankByExam: new Map([['exam:q', { sampleInput: '1\n', sampleOutput: '2\n', sampleChecker }]]), resolveTestCases: value => value };
  vm.createContext(context); vm.runInContext(extract('function trustedPayload(', 'function reply('), context);
  return context.trustedPayload;
}

test('sample requests validate mode and problem just like submissions', () => {
  const trusted = boundary();
  assert.throws(() => trusted({ mode: 'other', examVersion: 'exam' }), /模式/);
  assert.throws(() => trusted({ mode: 'sample', examVersion: 'exam', problemId: 'invalid' }), /题号/);
});

test('server owns public-sample comparison; client cannot inject answers or checkers', () => {
  const trusted = boundary();
  const sample = trusted({ mode: 'sample', examVersion: 'exam', problemId: 'old', input: '1\r\n', tests: [{ expected: 'forged', checker: 'fake' }] });
  assert.equal(sample.problemId, 'q'); assert.equal(sample.tests[0].expected, '2\n'); assert.equal(sample.tests[0].checker, '');
  assert.equal(sample.tests[0].compared, true);
  const custom = trusted({ mode: 'sample', examVersion: 'exam', problemId: 'q', input: 'different', tests: [{ expected: 'forged' }] });
  assert.equal(custom.tests[0].compared, false); assert.equal(custom.tests[0].expected, '');
  const submit = trusted({ mode: 'submit', examVersion: 'exam', problemId: 'q', tests: [] });
  assert.equal(submit.tests[0].expected, '2\n'); assert.equal(submit.tests[0].compared, true);
});

test('formal submit payload excludes browser test data and problem statements', () => {
  const start = clientJudgeSource.indexOf('function submitRequestPayload(');
  const end = clientJudgeSource.indexOf('let submissionSource', start);
  const context = {};
  vm.createContext(context); vm.runInContext(clientJudgeSource.slice(start, end), context);
  const question = { id: '37', statement: 'x'.repeat(300000), testCases: [{ input: 'y'.repeat(300000), expected: 'z' }] };
  const payload = context.submitRequestPayload('int main(){}', 'C++ (g++)', question, 'exam');

  assert.deepEqual(Object.keys(payload), ['code', 'language', 'problemId', 'examVersion', 'mode']);
  assert.equal(payload.problemId, '37');
  assert.equal(payload.mode, 'submit');
  assert.ok(JSON.stringify(payload).length < 1024);
});

test('problem resource profiles are server-owned and survive custom-input runs', () => {
  const payload = { mode: 'sample', examVersion: 'exam', problemId: 'q', input: '200000', judgeProfile: 'fzu-max-substrings' };
  assert.equal(boundary()(payload).judgeProfile, '');
  const custom = boundary('fzu-max-substrings')({ ...payload, judgeProfile: 'forged' });
  assert.equal(custom.judgeProfile, 'fzu-max-substrings');
  assert.equal(custom.tests[0].checker, '');
  assert.equal(custom.tests[0].compared, false);
});

test('interactive samples keep the server protocol and reject forged test fixtures', () => {
  const trusted = boundary('fzu-peak-interactive');
  const result = trusted({ mode: 'sample', examVersion: 'exam', problemId: 'q', input: '1\n2\n2 1', tests: [{ checker: 'fake', expected: 'forged' }] });
  assert.equal(result.judgeProfile, 'fzu-peak-interactive');
  assert.equal(result.tests[0].checker, 'fzu-peak-interactive');
  assert.equal(result.tests[0].expected, '');
  assert.equal(result.tests[0].compared, true);
  assert.equal(boundary()({ mode: 'submit', examVersion: 'exam', problemId: 'q', judgeProfile: 'fzu-xyz-communication' }).judgeProfile, '');
});

test('storage failure preserves the real verdict and returns unsaved status instead of ReferenceError', async () => {
  const context = { progressStoreAvailable: true, calculateScore: () => ({ score: 100, maxScore: 100, status: 'accepted' }),
    crypto: { randomUUID: () => 'synthetic-submission' }, queueUserProgress: async (_, action) => action(),
    loadUserProgress: async () => ({ exams: {} }), saveUserProgress: async () => { throw Error('test storage unavailable'); } };
  vm.createContext(context); vm.runInContext(extract('async function recordSubmission(', 'const progressReady'), context);
  const result = await context.recordSubmission({ user: { id: 'test' } }, { examVersion: 'exam', problemId: 'q' }, { verdict: 'Accepted' }, {});
  assert.equal(result.progressSaved, false); assert.equal(result.submission.verdict, 'Accepted'); assert.equal(result.scoring.score, 100);
});

test('client judge reports interrupted or invalid responses without leaking JSON parser errors', async () => {
  const start = clientJudgeSource.indexOf('async function readJudgeResponse(');
  const end = clientJudgeSource.indexOf('function formatJudgeOutput(', start);
  const context = {};
  vm.createContext(context); vm.runInContext(clientJudgeSource.slice(start, end), context);
  await assert.rejects(context.readJudgeResponse({ ok: true, status: 200, text: async () => '' }), /未返回运行结果/);
  await assert.rejects(context.readJudgeResponse({ ok: false, status: 502, text: async () => '<html>Bad gateway</html>' }), /正在启动或暂时不可用/);
  await assert.rejects(context.readJudgeResponse({ ok: true, status: 200, text: async () => '{' }), /无法识别/);
  assert.equal((await context.readJudgeResponse({ ok: true, status: 200, text: async () => '{"verdict":"Accepted"}' })).verdict, 'Accepted');
});

test('client judge translates browser network failures into an actionable message', () => {
  const start = clientJudgeSource.indexOf('function judgeFailureMessage(');
  const end = clientJudgeSource.indexOf('function formatJudgeOutput(', start);
  const context = {};
  vm.createContext(context); vm.runInContext(clientJudgeSource.slice(start, end), context);
  assert.match(context.judgeFailureMessage(new Error('Failed to fetch')), /无法连接评测服务/);
  assert.doesNotMatch(context.judgeFailureMessage(new Error('Failed to fetch')), /Failed to fetch/i);
});
