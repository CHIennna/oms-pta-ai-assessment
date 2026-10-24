'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');
const { LocalJudge, DEFAULT_TOOLCHAINS } = require('./src/server/judge/local-judge');

const nodeJudge = () => new LocalJudge({ usePrlimit: false, toolchains: { NodeFixture: {
  file: 'main.js', run: job => ({ command: process.execPath, args: [job.sourcePath] })
} } });

test('custom input returns actual stdout and stderr without falsely comparing against a sample', async () => {
  const result = await nodeJudge().judge({ language: 'NodeFixture', mode: 'sample',
    code: 'process.stdout.write("actual"); process.stderr.write("diagnostic");',
    tests: [{ input: 'custom', expected: 'stale', compared: false }] });
  assert.equal(result.verdict, 'Accepted'); assert.equal(result.compared, false);
  assert.equal(result.testCases[0].actualOutput, 'actual'); assert.equal(result.testCases[0].stderr, 'diagnostic');
  assert.equal(result.testCases[0].expectedOutput, undefined); assert.doesNotMatch(result.message, /一致/);
});

test('UTF-8 output split across process chunks is not corrupted', async () => {
  const result = await nodeJudge().judge({ language: 'NodeFixture', mode: 'sample',
    code: 'const b=Buffer.from("中文"); process.stdout.write(b.subarray(0,1)); setTimeout(()=>process.stdout.write(b.subarray(1)),30);',
    tests: [{ input: '', expected: '中文', compared: true }] });
  assert.equal(result.verdict, 'Accepted'); assert.equal(result.testCases[0].actualOutput, '中文');
});

test('submission cannot opt out of comparison and source limit is measured in bytes', async () => {
  const judge = nodeJudge();
  const result = await judge.judge({ language: 'NodeFixture', mode: 'submit', code: 'console.log("wrong")',
    tests: [{ input: '', expected: 'correct', compared: false }] });
  assert.equal(result.verdict, 'WrongAnswer');
  const oversized = await judge.judge({ language: 'NodeFixture', mode: 'sample', code: '//'+ '字'.repeat(22000), tests: [{ input: '', expected: '' }] });
  assert.equal(oversized.verdict, 'CompilationError'); assert.match(oversized.message, /超过/);
});

test('native C and C++ compilers avoid pipe mode to reduce peak memory', () => {
  const workDir = path.resolve('temporary-judge-test');
  const sourcePath = path.join(workDir, 'main.cpp');
  const job = { workDir, sourcePath };

  for (const language of ['C++ (g++)', 'C++ (clang++)', 'C (gcc)', 'C (clang)']) {
    assert.equal(DEFAULT_TOOLCHAINS[language].compile(job).args.includes('-pipe'), false);
  }
});

test('Render uses a single worker and a sixty second compile budget', t => {
  const previousRender = process.env.RENDER;
  const previousConcurrency = process.env.JUDGE_MAX_CONCURRENCY;
  const previousCompileTimeout = process.env.JUDGE_COMPILE_TIMEOUT_MS;

  process.env.RENDER = 'true';
  process.env.JUDGE_MAX_CONCURRENCY = '8';
  process.env.JUDGE_COMPILE_TIMEOUT_MS = '15000';

  t.after(() => {
    if (previousRender === undefined) delete process.env.RENDER;
    else process.env.RENDER = previousRender;
    if (previousConcurrency === undefined) delete process.env.JUDGE_MAX_CONCURRENCY;
    else process.env.JUDGE_MAX_CONCURRENCY = previousConcurrency;
    if (previousCompileTimeout === undefined) delete process.env.JUDGE_COMPILE_TIMEOUT_MS;
    else process.env.JUDGE_COMPILE_TIMEOUT_MS = previousCompileTimeout;
  });

  const judge = new LocalJudge({ toolchains: {} });
  assert.equal(judge.maxConcurrency, 1);
  assert.equal(judge.limits.compileTimeoutMs, 60000);
});
