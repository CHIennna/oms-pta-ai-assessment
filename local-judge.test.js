'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');
const { LocalJudge, DEFAULT_TOOLCHAINS, checkFloatOutput } = require('./src/server/judge/local-judge');

const nodeJudge = () => new LocalJudge({ usePrlimit: false, toolchains: { NodeFixture: {
  file: 'main.js', run: job => ({ command: process.execPath, args: [job.sourcePath] })
} } });

// Extend an Euler trail while retaining the preceding de Bruijn word as a prefix.
// This construction is independent of the suffix-automaton checker.
function maximalTernaryWord(n) {
  let digits = [0, 1, 2];
  for (let k = 2; digits.length < n; k++) {
    const vertices = 3 ** (k - 1), edges = vertices * 3;
    const used = new Uint8Array(vertices);
    let vertex = 0;
    for (let i = 0; i < k - 1; i++) vertex = vertex * 3 + digits[i];
    for (let i = k - 1; i < digits.length; i++) {
      used[vertex] |= 1 << digits[i]; vertex = (vertex * 3 + digits[i]) % vertices;
    }
    const stack = [vertex], incoming = [-1], reverse = [];
    while (stack.length) {
      const v = stack.at(-1);
      let c = 0; while (c < 3 && (used[v] & (1 << c))) c++;
      if (c === 3) { stack.pop(); const letter = incoming.pop(); if (letter >= 0) reverse.push(letter); }
      else { used[v] |= 1 << c; stack.push((v * 3 + c) % vertices); incoming.push(c); }
    }
    for (let i = reverse.length - 1; i >= 0; i--) digits.push(reverse[i]);
    if (digits.length !== edges + k - 1) throw new Error('Incomplete Euler trail');
  }
  return digits.slice(0, n).map(d => 'FZU'[d]).join('');
}

test('peak interactor answers inversions and enforces cost, bounds, answers and completion', () => {
  const { parseGroups, peakMachine } = require('./src/server/judge/protocol-judge');
  const groups = parseGroups('2\n4\n1 3 2 4\n2\n2 1', 'peak').groups;
  const judge = peakMachine(groups);
  assert.equal(judge.start(), '2\n4\n');
  assert.equal(judge.line('? 1 3'), '1\n');
  assert.equal(judge.line('? 3 4'), '0\n');
  assert.equal(judge.line('! 4'), '2\n');
  assert.equal(judge.line('? 1 2'), '1\n');
  assert.equal(judge.line('! 1'), null); judge.finish();
  assert.throws(() => judge.line('! 1'), /多余/);
  for (const invalid of ['? 0 2', '? 2 2', '? 1 5', '! 0', '! 2', '? 1 2 extra', '! 4.0']) {
    assert.throws(() => peakMachine(groups).line(invalid));
  }
  const expensive = peakMachine(groups);
  for (let i = 0; i < 8; i++) expensive.line('? 1 4');
  assert.throws(() => expensive.line('? 1 4'), /代价/);
  assert.throws(() => peakMachine(groups).finish(), /未完成/);
  assert.throws(() => parseGroups('1\n3\n1 1 2', 'peak'), /排列/);
  assert.throws(() => parseGroups('1\n3\n1 2 2 3 3 3', 'xyz'), /端点/);
});

test('communication interactor restarts, shuffles and feeds only one match before each decision', async () => {
  const { runProtocol } = require('./src/server/judge/protocol-judge');
  const triangle = '1\n3\n1 2\n2 3\n3 1';
  const seen = [];
  const result = await runProtocol('fzu-xyz-communication', triangle, async (machine, phase) => {
    seen.push(phase);
    let input = machine.start();
    if (phase === 1) { assert.match(input, /^1\n/); machine.line('xyz'); }
    else {
      assert.match(input, /^2\n1\n3\nxyz\n\d \d\n$/);
      for (let i = 0; i < 3; i++) {
        const [u, v] = input.trim().split('\n').at(-1).split(' ').map(Number);
        const choice = v === u % 3 + 1 ? '0' : '1';
        input = machine.line(choice);
        if (i < 2) assert.match(input, /^\d \d\n$/);
      }
      assert.equal(input, null);
    }
    machine.finish(); return { code: 0, protocolPassed: true, durationMs: 1 };
  });
  assert.deepEqual(seen, [1, 2]); assert.equal(result.protocolPassed, true);
});

test('communication rejects malformed encodings, repeated winners, trailing output and missing decisions', () => {
  const { parseGroups, encodingMachine, decodingMachine } = require('./src/server/judge/protocol-judge');
  const groups = parseGroups('1\n3\n1 2\n2 3\n3 1', 'xyz').groups;
  for (const word of ['xx', 'xyq', 'xyz extra', '']) {
    assert.throws(() => encodingMachine(groups, []).line(word));
  }
  const decoder = decodingMachine(groups, ['xyz'], 19);
  let input = decoder.start();
  for (let i = 0; i < 3; i++) {
    const [u, v] = input.trim().split('\n').at(-1).split(' ').map(Number);
    input = decoder.line(v === u % 3 + 1 ? '0' : '1');
  }
  decoder.finish(); assert.throws(() => decoder.line('0'));
  assert.throws(() => decodingMachine(groups, ['xyz'], 19).line('0 1'));
  assert.throws(() => decodingMachine(groups, ['xyz'], 19).line('2'));
  assert.throws(() => decodingMachine(groups, ['xyz'], 19).finish(), /未完成/);
});

test('live protocol handles fragmented output and rejects early exit, invalid queries and deadlock', async () => {
  const judge = new LocalJudge({ usePrlimit: false, toolchains: { NodeFixture: {
    file: 'main.js', run: job => ({ command: process.execPath, args: [job.sourcePath] })
  } } });
  const tests = [{ input: '1\n2\n2 1', expected: '', score: 100, checker: 'fzu-peak-interactive' }];
  const valid = `let count=0;require('readline').createInterface({input:process.stdin}).on('line',line=>{if(++count===2){process.stdout.write('? 1 ');setTimeout(()=>console.log('2'),10);}if(count===3)console.log('! '+(line==='1'?'1':'2'));});`;
  assert.equal((await judge.judge({ language:'NodeFixture', mode:'submit', code:valid, tests })).verdict, 'Accepted');
  for (const code of ['process.exit(0)', 'console.log("? 1 3")', 'console.log("! 2")', 'console.log("! 1\\nextra")']) {
    assert.equal((await judge.judge({ language:'NodeFixture', mode:'submit', code, tests })).verdict, 'WrongAnswer');
  }
  const stalled = await judge.judge({ language:'NodeFixture', mode:'submit', code:'setInterval(()=>{},1000)', tests });
  assert.equal(stalled.verdict, 'TimeLimitExceeded');
});

test('communication phases cannot reuse working-directory files', async () => {
  const judge = new LocalJudge({ usePrlimit:false, toolchains:{NodeFixture:{file:'main.js',run:job=>({command:process.execPath,args:[job.sourcePath]})}} });
  const code = `const fs=require('fs');let s='';process.stdin.on('data',c=>{s+=c;if(s.startsWith('1\\n')){fs.writeFileSync('saved','secret');console.log('xy');process.exit(0);}else if(s.startsWith('2\\n')){console.log(fs.existsSync('saved')?'bad':'0');process.exit(0);}});`;
  const result = await judge.judge({language:'NodeFixture',mode:'submit',code,tests:[{input:'1\n2\n1 2\n2 1',expected:'',score:100,checker:'fzu-xyz-communication'}]});
  assert.equal(result.verdict,'WrongAnswer');
  assert.doesNotMatch(result.compilerOutput,/必须立即输出/); // phase two saw no saved file; it exited before completing matches
  assert.match(result.compilerOutput,/未完成/);
});

test('maximal-substring checker agrees with exhaustive ternary strings through length 8', () => {
  const { checkSpecialOutput } = require('./src/server/judge/local-judge');
  for (let n = 1; n <= 8; n++) {
    const candidates = [];
    for (let code = 0; code < 3 ** n; code++) {
      let value = code, word = '';
      for (let i = 0; i < n; i++, value = Math.floor(value / 3)) word += 'FZU'[value % 3];
      const substrings = new Set();
      for (let i = 0; i < n; i++) for (let j = i + 1; j <= n; j++) substrings.add(word.slice(i, j));
      candidates.push([word, substrings.size]);
    }
    const best = Math.max(...candidates.map(item => item[1]));
    for (const [word, count] of candidates) assert.equal(checkSpecialOutput('fzu-max-substrings', String(n), word, ''), count === best);
  }
  for (const output of ['', 'FF', 'F Z U', 'FZU extra', 'FZА']) {
    assert.equal(checkSpecialOutput('fzu-max-substrings', '3', output, ''), false);
  }
});

test('maximal-substring checker accepts independent large optimal constructions and renamed alphabets', () => {
  const { checkSpecialOutput } = require('./src/server/judge/local-judge');
  for (const n of [5, 10, 11, 29, 100, 1000, 12345, 200000]) {
    const word = maximalTernaryWord(n);
    assert.equal(checkSpecialOutput('fzu-max-substrings', String(n), word, ''), true, `n=${n}`);
    assert.equal(checkSpecialOutput('fzu-max-substrings', String(n), word.replace(/[FZU]/g, c => ({F:'Z', Z:'U', U:'F'})[c]), ''), true);
    assert.equal(checkSpecialOutput('fzu-max-substrings', String(n), 'F'.repeat(n), ''), false);
  }
});

test('terrain checker accepts alternative optima and enforces visibility, boundaries, optimality and numeric format', () => {
  const { checkSpecialOutput } = require('./src/server/judge/local-judge');
  const check = (input, output, expected) => checkSpecialOutput('fzu-terrain-visibility', input, output, expected);
  const plateau = '1\n3\n0 7\n5 7\n10 7';
  assert.equal(check(plateau, '9 7', '0 7'), true);
  assert.equal(check(plateau, '9 7.00006', '0 7'), true);
  for (const output of ['-1 7', '11 7', '5 6.999999', '5 8', 'NaN 7', '0x5 7', '5 Infinity', '5 7 extra', '']) {
    assert.equal(check(plateau, output, '0 7'), false, output);
  }
  const peak = '1\n3\n0 0\n5 10\n10 0';
  assert.equal(check(peak, '5 10', '5 10'), true);
  assert.equal(check(peak, '0 10', '5 10'), false); // right face blocks the view
  const valley = '1\n3\n0 10\n5 0\n10 10';
  assert.equal(check(valley, '5 0', '5 0'), true);
  assert.equal(check(valley, '5 0.000009', '5 0'), true);
  assert.equal(check(valley, '5 0.000011', '5 0'), false);
  assert.equal(check(plateau + '\nunused', '5 7', '0 7'), false);
});

test('large construction output is allowed under a small deployment cap without changing other jobs', async () => {
  const judge = new LocalJudge({ usePrlimit: false, outputLimitBytes: 4096, runTimeoutMs: 10000,
    toolchains: { NodeFixture: { file: 'main.js', run: job => ({ command: process.execPath, args: [job.sourcePath] }) } } });
  const result = await judge.judge({ language: 'NodeFixture', mode: 'submit',
    code: maximalTernaryWord.toString() + '\nconsole.log(maximalTernaryWord(200000));',
    tests: [{ input: '200000', expected: '', score: 100, checker: 'fzu-max-substrings' }] });
  assert.equal(result.verdict, 'Accepted');
  assert.equal(judge.limitsFor('NodeFixture').outputLimitBytes, 4096);
  const ordinary = await judge.judge({ language: 'NodeFixture', mode: 'submit',
    code: 'console.log("F".repeat(200000))', tests: [{ input: '', expected: '' }] });
  assert.equal(ordinary.verdict, 'RuntimeError');
  assert.match(ordinary.compilerOutput, /输出/);
});

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
  assert.match(oversized.message, /代码长度.*字节/); assert.doesNotMatch(oversized.message, /测试点/);
});

test('formal input accepts QC8-sized data and the exact 32 MiB boundary', async () => {
  const judge = new LocalJudge({ usePrlimit: false, runTimeoutMs: 10000, toolchains: { NodeFixture: {
    file: 'main.js', run: job => ({ command: process.execPath, args: [job.sourcePath] })
  } } });
  const limit = judge.info().limits.testDataLimitBytes;
  assert.equal(limit, 32 * 1024 * 1024);
  for (const bytes of [11500013, limit]) {
    const result = await judge.judge({ language: 'NodeFixture', mode: 'submit',
      code: 'let size=0;process.stdin.on("data",c=>size+=c.length).on("end",()=>console.log(size));',
      tests: [{ input: '1'.repeat(bytes), expected: String(bytes), score: 100 }] });
    assert.equal(result.verdict, 'Accepted', result.compilerOutput);
  }
});

test('oversized UTF-8 test data identifies the point and field without blaming source code', async () => {
  const judge = nodeJudge(), limit = judge.info().limits.testDataLimitBytes;
  for (const [field, value, label] of [['input', '字'.repeat(Math.floor(limit / 3) + 1), '输入'], ['expected', 'x'.repeat(limit + 1), '标准答案']]) {
    const result = await judge.judge({ language: 'NodeFixture', mode: 'submit', code: 'console.log(0)',
      tests: [{ input: '', expected: '0', score: 50 }, { input: '', expected: '', score: 50, [field]: value }] });
    assert.equal(result.verdict, 'NotConfigured');
    assert.match(result.message, new RegExp(`第 2 个测试点的${label}`));
    assert.ok(result.message.includes(String(Buffer.byteLength(value, 'utf8'))));
    assert.doesNotMatch(result.message, /代码长度/);
  }
});

test('formal tests use bounded concurrency and keep their original result order', async () => {
  const judge = new LocalJudge({
    usePrlimit: false,
    testConcurrency: 2,
    toolchains: { NodeFixture: {
      file: 'main.js', run: job => ({ command: process.execPath, args: [job.sourcePath] })
    } }
  });
  const tests = [1, 2, 3, 4].map(value => ({ input: String(value), expected: String(value), score: 25 }));
  const startedAt = Date.now();
  const result = await judge.judge({
    language: 'NodeFixture', mode: 'submit',
    code: 'let s=""; process.stdin.on("data",c=>s+=c).on("end",()=>setTimeout(()=>process.stdout.write(s),200));',
    tests
  });
  const elapsedMs = Date.now() - startedAt;

  assert.equal(result.verdict, 'Accepted');
  assert.deepEqual(result.testCases.map(item => item.index), [0, 1, 2, 3]);
  assert.ok(elapsedMs < 750, `expected two workers to finish in under 750 ms, got ${elapsedMs} ms`);
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

test('hosted native compilation uses the fastest low-memory optimization pass', t => {
  const previousRender = process.env.RENDER;
  t.after(() => {
    if (previousRender === undefined) delete process.env.RENDER;
    else process.env.RENDER = previousRender;
  });

  const job = { workDir: path.resolve('temporary-judge-test'), sourcePath: path.resolve('temporary-judge-test', 'main.cpp') };
  delete process.env.RENDER;
  assert.equal(DEFAULT_TOOLCHAINS['C++ (g++)'].compile(job).args[0], '-O2');
  process.env.RENDER = 'true';
  assert.equal(DEFAULT_TOOLCHAINS['C++ (g++)'].compile(job).args[0], '-O0');
});

test('hosted compilation finishes before the upstream request timeout', t => {
  const previousRender = process.env.RENDER;
  const previousTimeout = process.env.JUDGE_COMPILE_TIMEOUT_MS;
  t.after(() => {
    if (previousRender === undefined) delete process.env.RENDER;
    else process.env.RENDER = previousRender;
    if (previousTimeout === undefined) delete process.env.JUDGE_COMPILE_TIMEOUT_MS;
    else process.env.JUDGE_COMPILE_TIMEOUT_MS = previousTimeout;
  });

  process.env.RENDER = 'true';
  process.env.JUDGE_COMPILE_TIMEOUT_MS = '60000';
  const judge = new LocalJudge({ usePrlimit: false, toolchains: {} });
  assert.equal(judge.limits.compileTimeoutMs, 25000);
  assert.equal(judge.compileMemoryLimitBytes, 256 * 1024 * 1024);
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

test('Render uses a single worker and honors a safe compile budget', t => {
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
  assert.equal(judge.testConcurrency, 2);
  assert.equal(judge.limits.compileTimeoutMs, 15000);
});
