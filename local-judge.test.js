'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');
const { LocalJudge, DEFAULT_TOOLCHAINS } = require('./local-judge');

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
