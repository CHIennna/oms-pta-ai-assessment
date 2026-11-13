'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');
const { LocalJudge, DEFAULT_TOOLCHAINS, checkFloatOutput } = require('./src/server/judge/local-judge');

const nodeJudge = () => new LocalJudge({ usePrlimit: false, toolchains: { NodeFixture: {
  file: 'main.js', run: job => ({ command: process.execPath, args: [job.sourcePath] })
} } });

test('float checker accepts values within 5e-6 and rejects invalid or extra output', () => {
  assert.equal(checkFloatOutput('3.000004', '3.000000'), true);
  assert.equal(checkFloatOutput('-2 -0.999996 1 2', '-2 -1 1 2'), true);
  assert.equal(checkFloatOutput('3.000006', '3.000000'), false);
  assert.equal(checkFloatOutput('3.000000 extra', '3.000000'), false);
  assert.equal(checkFloatOutput('NaN', '3.000000'), false);
});

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

test('judge reports and applies the configured per-language resource limits', () => {
  const judge = new LocalJudge({ usePrlimit: false, toolchains: {} });
  const limits = judge.info().limits;

  assert.equal(limits.codeLimitBytes, 16 * 1024);
  assert.equal(limits.stackLimitKb, 8192);
  assert.deepEqual(limits.languageLimits.java, { label: 'Java (javac)', timeLimitMs: 1500, memoryLimitKb: 128 * 1024 });
  assert.deepEqual(limits.languageLimits.python3, { label: 'Python (python3)', timeLimitMs: 1500, memoryLimitKb: 64 * 1024 });
  assert.deepEqual(limits.languageLimits.other, { label: '其他编译器', timeLimitMs: 500, memoryLimitKb: 64 * 1024 });
  assert.equal(judge.limitsFor('java').runTimeoutMs, 1500);
  assert.equal(judge.limitsFor('python3').memoryLimitKb, 64 * 1024);
  assert.equal(judge.limitsFor('PyPy').runTimeoutMs, 500);
});

test('native C and C++ compilers avoid pipe mode to reduce peak memory', () => {
  const workDir = path.resolve('temporary-judge-test');
  const sourcePath = path.join(workDir, 'main.cpp');
  const job = { workDir, sourcePath };

  for (const language of ['C++ (g++)', 'C++ (clang++)', 'C (gcc)', 'C (clang)']) {
    assert.equal(DEFAULT_TOOLCHAINS[language].compile(job).args.includes('-pipe'), false);
  }
});

test('Python 2 and PyPy toolchains are registered with version-checked runtime candidates', () => {
  for (const language of ['Python 2', 'PyPy']) {
    const toolchain = DEFAULT_TOOLCHAINS[language];
    assert.ok(toolchain);
    assert.ok(Array.isArray(toolchain.commandCandidates));
    assert.ok(toolchain.commandCandidates.length > 0);
    assert.ok(toolchain.commandCandidates.every(candidate => candidate.versionPattern instanceof RegExp));
  }
});

test('a version-matched dynamic interpreter is detected and used', async () => {
  const judge = new LocalJudge({ usePrlimit: false, toolchains: { DynamicRuntime: {
    commandCandidates: [{ command: process.execPath, versionPattern: /^v?\d+/m }],
    file: 'main.js',
    run: (job, runtime) => ({ command: runtime.command, args: [...runtime.prefixArgs, job.sourcePath] })
  } } });
  assert.deepEqual(judge.info().languages, ['DynamicRuntime']);
  const result = await judge.judge({ language: 'DynamicRuntime', mode: 'sample',
    code: 'process.stdout.write("dynamic-ok")', tests: [{ input: '', expected: 'dynamic-ok', compared: true }] });
  assert.equal(result.verdict, 'Accepted');
  assert.equal(result.testCases[0].actualOutput, 'dynamic-ok');
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
