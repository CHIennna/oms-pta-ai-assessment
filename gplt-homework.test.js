const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { loadAndValidateExamData } = require('./validate-exam-data');

const supplemental = [
  'zixun-contest-data.js', 'weekly-practice-2.js', 'fuzhou-quality-check-20261018.js',
  'shenzhuo-round3-20260920.js', 'gplt-homework-2024-2026.js', 'fzu-practice-homework.js'
].map(file => path.join(__dirname, file));
const loaded = loadAndValidateExamData(path.join(__dirname, 'exam-data.js'), supplemental);
const gplt = loaded.exams.filter(exam => exam.homeworkGroup === 'gplt');

function serverFixture() {
  const context = {
    __dirname, process, Buffer, console, module: { exports: {} },
    require(name) {
      if (name === './auth') return { createAuth: () => ({ available: false, dataDir: __dirname }) };
      if (name === './local-judge') return { LocalJudge: class {} };
      return require(name);
    }
  };
  vm.createContext(context);
  vm.runInContext(fs.readFileSync(path.join(__dirname, 'server.js'), 'utf8'), context);
  return context.module.exports;
}

test('three independent years preserve L1/L2 numbers, 200 points and existing homework', () => {
  assert.deepEqual(gplt.map(exam => exam.practiceYear), [2024, 2025, 2026]);
  const ids = new Set();
  for (const exam of gplt) {
    assert.equal(exam.category, 'practice');
    assert.equal(exam.duration, 0);
    assert.equal(exam.questions.length, 12);
    assert.equal(exam.questions.filter(q => q.originalId.startsWith('L1-')).length, 8);
    assert.equal(exam.questions.filter(q => q.originalId.startsWith('L2-')).length, 4);
    assert.equal(exam.questions.reduce((sum, q) => sum + q.score, 0), 200);
    for (const q of exam.questions) {
      assert.equal(q.originalId, q.letter);
      assert.ok(!ids.has(q.id)); ids.add(q.id);
      assert.match(q.id, /^\d+$/);
      assert.ok(['入门', '普及-', '普及', '普及+/提高-'].includes(q.difficulty));
      assert.equal(q.testArchive.count, 5);
      assert.equal(q.testArchive.count * q.testArchive.score, q.score);
    }
  }
  assert.equal(loaded.practiceExams.length, 5);
  assert.equal(loaded.practiceExams.flatMap(exam => exam.questions).length, 25);
  assert.equal(loaded.practiceExams.flatMap(exam => exam.questions).filter(q => q.externalOnly).length, 0);
  assert.equal(loaded.report.testCases, 1298);
});

test('all 180 archive pairs load through the real submission guard and preserve original scores', () => {
  const fixture = serverFixture();
  let count = 0;
  for (const exam of gplt) {
    for (const q of exam.questions) {
      const payload = fixture.trustedPayload({ mode: 'submit', examVersion: exam.examVersion, problemId: q.id });
      assert.equal(payload.tests.length, 5);
      assert.equal(payload.tests.reduce((sum, item) => sum + item.score, 0), q.score);
      for (const item of payload.tests) {
        assert.equal(typeof item.input, 'string');
        assert.equal(typeof item.expected, 'string');
      }
      // The archive's first case is the provided sample, including genuinely empty input.
      const normalize = text => text.replace(/\r\n/g, '\n').trimEnd();
      assert.equal(normalize(payload.tests[0].input), normalize(q.sampleInput));
      assert.equal(normalize(payload.tests[0].expected), normalize(q.sampleOutput));
      count += payload.tests.length;
    }
  }
  assert.equal(count, 180);
  assert.throws(() => fixture.trustedPayload({ mode: 'submit', examVersion: gplt[0].examVersion, problemId: gplt[1].questions[0].id }), /题号与试卷不匹配/);
});

test('practice page separates GPLT from mock papers and retains all 36 clickable questions', () => {
  const ui = fs.readFileSync(path.join(__dirname, 'pta-clone.js'), 'utf8');
  const functions = ['formatDuration', 'examDate', 'renderExamCards', 'renderHomeworkCards', 'renderExamCenter'];
  const definitions = functions.map(name => {
    const start = ui.indexOf('function ' + name + '(');
    assert.ok(start >= 0);
    const end = ui.indexOf('\n}', start);
    if (ui.slice(start, ui.indexOf('\n', start)).endsWith('}')) return ui.slice(start, ui.indexOf('\n', start));
    return ui.slice(start, end + 2);
  }).join('\n');
  const context = {
    window: { OMS_EXAM_ARCHIVE: loaded.exams.slice(1), OMS_PRACTICE_EXAMS: loaded.practiceExams },
    config: gplt[1], primaryConfig: loaded.exams[0], primaryExamVersion: loaded.exams[0].examVersion,
    progressByExam: new Map(), escape: value => String(value ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;')
  };
  vm.createContext(context);
  vm.runInContext(definitions, context);
  const html = vm.runInContext('renderExamCenter()', context);
  assert.ok(html.includes('历年真题作业 · 天梯赛 L1/L2'));
  assert.ok(html.includes('FZU 竞赛精选 · 五次专项作业'));
  assert.match(html, /class="exam-center-panel active" data-exam-center-panel="gplt"/);
  assert.match(html, /data-exam-center-panel="homework" hidden/);
  const gpltSection = html.split('data-exam-center-panel="gplt"')[1].split('</section>')[0];
  assert.equal((gpltSection.match(/data-question-open=/g) || []).length, 36);
  for (const exam of gplt) {
    assert.ok(gpltSection.includes(exam.title));
    for (const q of exam.questions) assert.ok(gpltSection.includes(q.originalId));
  }
  const mockSection = html.split('data-exam-center-panel="mock"')[1].split('</section>')[0];
  assert.ok(!mockSection.includes('gplt-2024'));
  assert.ok(gpltSection.includes('200 分'));
  assert.ok(html.includes('不是官方隐藏测试'));
});
