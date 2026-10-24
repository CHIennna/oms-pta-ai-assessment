'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const source = fs.readFileSync('./server.js', 'utf8');
const extract = (start, end) => source.slice(source.indexOf(start), source.indexOf(end, source.indexOf(start)));

function boundary() {
  const cases = [{ input: '1\n', expected: '2\n', score: 100 }];
  const context = { assertExamOpen() {}, testAliases: new Map([['exam:old', 'q']]),
    testBankByExam: new Map([['exam:q', cases]]), testBank: new Map(),
    questionBankByExam: new Map([['exam:q', { sampleInput: '1\n', sampleOutput: '2\n' }]]), resolveTestCases: value => value };
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

test('storage failure preserves the real verdict and returns unsaved status instead of ReferenceError', async () => {
  const context = { progressStoreAvailable: true, calculateScore: () => ({ score: 100, maxScore: 100, status: 'accepted' }),
    crypto: { randomUUID: () => 'synthetic-submission' }, queueUserProgress: async (_, action) => action(),
    loadUserProgress: async () => ({ exams: {} }), saveUserProgress: async () => { throw Error('test storage unavailable'); } };
  vm.createContext(context); vm.runInContext(extract('async function recordSubmission(', 'const progressReady'), context);
  const result = await context.recordSubmission({ user: { id: 'test' } }, { examVersion: 'exam', problemId: 'q' }, { verdict: 'Accepted' }, {});
  assert.equal(result.progressSaved, false); assert.equal(result.submission.verdict, 'Accepted'); assert.equal(result.scoring.score, 100);
});
