const fs = require('fs/promises');
const os = require('os');
const path = require('path');
const { spawn, spawnSync } = require('child_process');

const isWindows = process.platform === 'win32';
const executable = name => path.join(name.workDir, isWindows ? 'program.exe' : 'program');
const DEFAULT_TOOLCHAINS = {
  'C++ (g++)': {
    commands: ['g++'],
    file: 'main.cpp',
    compile: job => ({ command: 'g++', args: ['-O2', '-std=c++17', '-pipe', job.sourcePath, '-o', executable(job)] }),
    run: job => ({ command: executable(job), args: [] })
  },
  'C++ (clang++)': {
    commands: ['clang++'],
    file: 'main.cpp',
    compile: job => ({ command: 'clang++', args: ['-O2', '-std=c++17', '-pipe', job.sourcePath, '-o', executable(job)] }),
    run: job => ({ command: executable(job), args: [] })
  },
  'C (gcc)': {
    commands: ['gcc'],
    file: 'main.c',
    compile: job => ({ command: 'gcc', args: ['-O2', '-std=c11', '-pipe', job.sourcePath, '-lm', '-o', executable(job)] }),
    run: job => ({ command: executable(job), args: [] })
  },
  'C (clang)': {
    commands: ['clang'],
    file: 'main.c',
    compile: job => ({ command: 'clang', args: ['-O2', '-std=c11', '-pipe', job.sourcePath, '-lm', '-o', executable(job)] }),
    run: job => ({ command: executable(job), args: [] })
  },
  Java: {
    commands: ['javac', 'java'],
    file: 'Main.java',
    compile: job => ({ command: 'javac', args: ['-J-Xms16m', '-J-Xmx256m', '-J-XX:MaxMetaspaceSize=128m', '-encoding', 'UTF-8', job.sourcePath], skipAddressLimit: true }),
    run: job => ({ command: 'java', args: ['-Xms16m', '-Xss16m', '-Xmx192m', '-XX:MaxMetaspaceSize=96m', '-cp', job.workDir, 'Main'], skipAddressLimit: true })
  },
  'Python 3': {
    commands: [process.platform === 'win32' ? 'python' : 'python3'],
    file: 'main.py',
    run: job => ({ command: process.platform === 'win32' ? 'python' : 'python3', args: ['-I', job.sourcePath] })
  }
};

const LANGUAGE_ALIASES = {
  cpp: 'C++ (g++)', 'c++': 'C++ (g++)', gpp: 'C++ (g++)',
  clangpp: 'C++ (clang++)', c: 'C (gcc)', gcc: 'C (gcc)', clang: 'C (clang)',
  java: 'Java', python: 'Python 3', python3: 'Python 3', py: 'Python 3'
};

const clamp = (value, fallback, minimum, maximum) => {
  const number = Number(value);
  return Number.isFinite(number) ? Math.min(maximum, Math.max(minimum, Math.round(number))) : fallback;
};
const normalized = text => String(text || '').replace(/\r\n/g, '\n').replace(/[ \t]+(?=\n)/g, '').trimEnd();
const clipped = (value, limit = 120000) => String(value || '').slice(0, limit);
const commandAvailable = command => {
  if (!command) return false;
  const probe = spawnSync(command, ['--version'], { windowsHide: true, stdio: 'ignore', timeout: 1500 });
  return !probe.error && probe.status === 0;
};
const resolveCommand = command => {
  if (!command || path.isAbsolute(command)) return command;
  const probe = spawnSync(isWindows ? 'where.exe' : 'which', [command], { windowsHide: true, encoding: 'utf8', timeout: 1500 });
  const located = !probe.error && probe.status === 0 ? String(probe.stdout || '').split(/\r?\n/).find(Boolean) : '';
  return located || command;
};

function killProcessTree(child) {
  if (!child || !child.pid) return;
  if (isWindows) {
    try { child.kill('SIGKILL'); } catch {}
    const killer = spawn('taskkill', ['/pid', String(child.pid), '/t', '/f'], { windowsHide: true, stdio: 'ignore' });
    killer.unref();
    return;
  }
  try { process.kill(-child.pid, 'SIGKILL'); } catch { try { child.kill('SIGKILL'); } catch {} }
}

function limitedCommand(spec, limits, usePrlimit) {
  if (process.platform !== 'linux' || !usePrlimit) return spec;
  const args = [];
  if (limits.cpuSeconds) args.push(`--cpu=${limits.cpuSeconds}`);
  if (limits.addressBytes && !spec.skipAddressLimit) args.push(`--as=${limits.addressBytes}`);
  if (limits.fileBytes) args.push(`--fsize=${limits.fileBytes}`);
  args.push(`--nproc=${limits.processes || 32}`, `--nofile=${limits.openFiles || 64}`, '--', spec.command, ...(spec.args || []));
  return { command: 'prlimit', args };
}

function runProcess(spec, options) {
  return new Promise(resolve => {
    const started = Date.now();
    const command = limitedCommand(spec, options.limits || {}, options.usePrlimit);
    let stdout = '', stderr = '', settled = false, timedOut = false, outputExceeded = false;
    const child = spawn(command.command, command.args || [], {
      cwd: options.cwd,
      windowsHide: true,
      detached: !isWindows,
      stdio: ['pipe', 'pipe', 'pipe'],
      env: {
        PATH: process.env.PATH || '',
        LANG: 'C.UTF-8', LC_ALL: 'C.UTF-8',
        HOME: options.cwd, TMPDIR: options.cwd, TEMP: options.cwd, TMP: options.cwd
      }
    });
    const finish = result => {
      if (settled) return;
      settled = true; clearTimeout(timer);
      resolve({ stdout, stderr, durationMs: Date.now() - started, timedOut, outputExceeded, ...result });
    };
    const append = (target, chunk) => {
      const next = target + chunk.toString('utf8');
      if (Buffer.byteLength(next, 'utf8') > options.outputLimitBytes) {
        outputExceeded = true; killProcessTree(child);
        return next.slice(0, options.outputLimitBytes);
      }
      return next;
    };
    child.stdout.on('data', chunk => { stdout = append(stdout, chunk); });
    child.stderr.on('data', chunk => { stderr = append(stderr, chunk); });
    child.on('error', error => finish({ error }));
    child.on('close', (code, signal) => finish({ code, signal }));
    child.stdin.on('error', () => {});
    child.stdin.end(options.input || '');
    const timer = setTimeout(() => { timedOut = true; killProcessTree(child); }, options.timeoutMs);
  });
}

function unavailableResult(message, tests, limits) {
  return {
    verdict: 'JudgeUnavailable', message, compilerOutput: message,
    testCases: [], passedTests: 0, totalTests: tests.length,
    timeLimitMs: limits.runTimeoutMs, memoryLimitKb: limits.memoryLimitKb,
    runner: 'local'
  };
}

class LocalJudge {
  constructor(options = {}) {
    this.toolchains = options.toolchains || DEFAULT_TOOLCHAINS;
    this.usePrlimit = options.usePrlimit ?? process.env.JUDGE_USE_PRLIMIT !== '0';
    this.maxConcurrency = clamp(options.maxConcurrency ?? process.env.JUDGE_MAX_CONCURRENCY, 2, 1, 8);
    this.maxQueue = clamp(options.maxQueue ?? process.env.JUDGE_MAX_QUEUE, 20, 1, 100);
    this.limits = {
      compileTimeoutMs: clamp(options.compileTimeoutMs ?? process.env.JUDGE_COMPILE_TIMEOUT_MS, 15000, 1000, 60000),
      runTimeoutMs: clamp(options.runTimeoutMs ?? process.env.JUDGE_RUN_TIMEOUT_MS, 2000, 100, 10000),
      memoryLimitKb: clamp(options.memoryLimitKb ?? process.env.JUDGE_MEMORY_LIMIT_KB, 262144, 65536, 1048576),
      outputLimitBytes: clamp(options.outputLimitBytes ?? process.env.JUDGE_OUTPUT_LIMIT_BYTES, 65536, 4096, 1048576)
    };
    this.availableLanguages = Object.entries(this.toolchains)
      .filter(([, toolchain]) => !Array.isArray(toolchain.commands) || toolchain.commands.every(commandAvailable))
      .map(([language]) => language);
    this.active = 0;
    this.queue = [];
  }

  info() {
    return {
      runner: 'local', configured: this.availableLanguages.length > 0,
      languages: this.availableLanguages,
      unavailableLanguages: Object.keys(this.toolchains).filter(language => !this.availableLanguages.includes(language)),
      isolation: process.platform === 'linux' && this.usePrlimit ? 'non-root + prlimit' : 'process limits',
      queue: { active: this.active, waiting: this.queue.length, concurrency: this.maxConcurrency }
    };
  }

  judge(payload) {
    if (this.queue.length >= this.maxQueue) {
      const tests = Array.isArray(payload.tests) ? payload.tests : [];
      return Promise.resolve(unavailableResult('评测队列已满，请稍后重试。', tests, this.limits));
    }
    return new Promise((resolve, reject) => {
      this.queue.push({ payload, resolve, reject });
      this.drain();
    });
  }

  drain() {
    while (this.active < this.maxConcurrency && this.queue.length) {
      const job = this.queue.shift(); this.active++;
      this.execute(job.payload).then(job.resolve, job.reject).finally(() => { this.active--; this.drain(); });
    }
  }

  async execute(payload) {
    const requestedLanguage = String(payload.language || '').trim();
    const language = LANGUAGE_ALIASES[requestedLanguage.toLowerCase()] || requestedLanguage;
    const toolchain = this.toolchains[language];
    const source = String(payload.code || '');
    const tests = Array.isArray(payload.tests) ? payload.tests.map(test => ({
      input: String(test && test.input || ''), expected: String(test && (test.expected ?? test.expectedOutput) || ''),
      score: Number.isFinite(Number(test && test.score)) ? Number(test.score) : 0
    })) : [];
    if (!toolchain) return unavailableResult(`自建评测机暂不支持 ${language || '该语言'}。`, tests, this.limits);
    if (!source.trim()) return { ...unavailableResult('请先编写代码。', tests, this.limits), verdict: 'CompilationError' };
    if (!tests.length || tests.length > 20) return { ...unavailableResult('该题尚未配置有效测试点。', tests, this.limits), verdict: 'NotConfigured' };
    if (source.length > 65536 || tests.some(test => test.input.length > 32768 || test.expected.length > 32768)) {
      return { ...unavailableResult('代码或测试点超过评测机限制。', tests, this.limits), verdict: 'CompilationError' };
    }

    const prefix = path.join(os.tmpdir(), 'fzupta-judge-');
    const workDir = await fs.mkdtemp(prefix);
    const sourcePath = path.join(workDir, toolchain.file);
    const job = { workDir, sourcePath };
    try {
      await fs.chmod(workDir, 0o700).catch(() => {});
      await fs.writeFile(sourcePath, source, { encoding: 'utf8', mode: 0o600 });
      if (toolchain.compile) {
        const compileSpec = toolchain.compile(job);
        compileSpec.command = resolveCommand(compileSpec.command);
        const compilation = await runProcess(compileSpec, {
          cwd: workDir, input: '', timeoutMs: this.limits.compileTimeoutMs,
          outputLimitBytes: this.limits.outputLimitBytes * 2, usePrlimit: this.usePrlimit,
          limits: { cpuSeconds: Math.ceil(this.limits.compileTimeoutMs / 1000) + 1, addressBytes: 1024 * 1024 * 1024, fileBytes: 20 * 1024 * 1024, processes: 64, openFiles: 128 }
        });
        if (compilation.error || (compilation.code === 127 && /not found|failed to execute|no such file/i.test(compilation.stderr))) {
          return unavailableResult(`评测环境缺少 ${compileSpec.command} 编译器。`, tests, this.limits);
        }
        if (compilation.timedOut) return this.compileFailure('编译超时。', compilation, tests);
        if (compilation.outputExceeded) return this.compileFailure('编译器输出超过限制。', compilation, tests);
        if (compilation.code !== 0) return this.compileFailure('编译失败，请查看编译器输出。', compilation, tests);
      }

      const testCases = [];
      for (let index = 0; index < tests.length; index++) {
        const test = tests[index];
        const runSpec = toolchain.run(job);
        runSpec.command = resolveCommand(runSpec.command);
        const execution = await runProcess(runSpec, {
          cwd: workDir, input: test.input, timeoutMs: this.limits.runTimeoutMs,
          outputLimitBytes: this.limits.outputLimitBytes, usePrlimit: this.usePrlimit,
          limits: { cpuSeconds: Math.ceil(this.limits.runTimeoutMs / 1000) + 1, addressBytes: this.limits.memoryLimitKb * 1024, fileBytes: 1024 * 1024, processes: 32, openFiles: 64 }
        });
        let verdict = 'Accepted', hint = '无提示', detail = '';
        if (execution.error || (execution.code === 127 && /not found|failed to execute|no such file/i.test(execution.stderr))) {
          return unavailableResult(`评测环境无法启动 ${runSpec.command}。`, tests, this.limits);
        } else if (execution.timedOut) {
          verdict = 'TimeLimitExceeded'; hint = '运行时间超过限制。'; detail = clipped(execution.stderr);
        } else if (execution.outputExceeded) {
          verdict = 'RuntimeError'; hint = '程序输出超过限制。'; detail = clipped(execution.stdout + execution.stderr);
        } else if (execution.code !== 0) {
          verdict = 'RuntimeError'; hint = `程序异常退出${execution.signal ? `（${execution.signal}）` : `（退出码 ${execution.code}）`}。`; detail = clipped(execution.stderr);
        } else if (normalized(execution.stdout) !== normalized(test.expected)) {
          verdict = 'WrongAnswer'; hint = '输出与预期不一致'; detail = `你的输出：\n${execution.stdout || '(空)'}\n\n预期输出：\n${test.expected}`;
        }
        testCases.push({ index, verdict, hint, score: test.score, memoryKb: null, timeMs: execution.durationMs, detail });
      }
      return this.result(testCases, tests, payload.mode);
    } finally {
      const resolved = path.resolve(workDir);
      const allowedPrefix = `${path.resolve(os.tmpdir())}${path.sep}fzupta-judge-`;
      if (resolved.startsWith(allowedPrefix)) await fs.rm(resolved, { recursive: true, force: true, maxRetries: 2 }).catch(() => {});
    }
  }

  compileFailure(message, compilation, tests) {
    const detail = clipped(compilation.stderr || compilation.stdout || message);
    return {
      verdict: 'CompilationError', message, compilerOutput: detail,
      testCases: tests.map((test, index) => ({ index, verdict: 'CompilationError', hint: message, score: test.score, memoryKb: null, timeMs: compilation.durationMs })),
      passedTests: 0, totalTests: tests.length,
      timeLimitMs: this.limits.runTimeoutMs, memoryLimitKb: this.limits.memoryLimitKb,
      runner: 'local'
    };
  }

  result(testCases, tests, mode) {
    const priority = ['RuntimeError', 'TimeLimitExceeded', 'WrongAnswer'];
    const verdict = priority.find(value => testCases.some(test => test.verdict === value)) || 'Accepted';
    const passedTests = testCases.filter(test => test.verdict === 'Accepted').length;
    const firstFailure = testCases.find(test => test.verdict === verdict);
    const message = verdict === 'Accepted' ? (mode === 'sample' ? '样例输出与预期输出一致。' : '所有测试点均已通过。') : firstFailure.hint;
    const compilerOutput = verdict === 'Accepted'
      ? `自建评测机运行完成\n通过测试点：${passedTests}/${tests.length}`
      : `测试点 ${firstFailure.index + 1}：${firstFailure.hint}${firstFailure.detail ? `\n\n${firstFailure.detail}` : ''}`;
    return {
      verdict, message, compilerOutput,
      testCases: testCases.map(({ detail, ...test }) => test), passedTests, totalTests: tests.length,
      timeLimitMs: this.limits.runTimeoutMs, memoryLimitKb: this.limits.memoryLimitKb,
      runner: 'local'
    };
  }
}

module.exports = { LocalJudge, DEFAULT_TOOLCHAINS };
