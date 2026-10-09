const fs = require('fs');
const path = require('path');
const vm = require('vm');

const LEGACY_UNJUDGEABLE = new Set([
  '2024-transfer-major-exam:20',
  '2023-transfer-major-exam:10',
  '2022-transfer-major-exam:8',
  // These imported problems require an interactor or a checker that the local
  // judge cannot reproduce safely. Keep the exception list explicit so a new
  // incomplete problem still fails validation by default.
  '2026-xiamen-shenzhuo-cup-may-monthly:1036',
  '2026-xiamen-shenzhuo-cup-may-monthly:1038',
  '2026-xiamen-shenzhuo-cup-guiding-final-exam:1046'
]);

function loadAndValidateExamData(filePath = path.join(__dirname, 'exam-data.js'), supplementalPaths = []) {
  const context = { window: {} };
  vm.createContext(context);
  for (const sourcePath of [filePath, ...supplementalPaths]) {
    const source = fs.readFileSync(sourcePath, 'utf8');
    vm.runInContext(source, context, { filename: path.basename(sourcePath), timeout: 2000 });
  }

  const current = context.window.OMS_EXAM_DATA;
  const archives = context.window.OMS_EXAM_ARCHIVE || context.window.OMS_EXAM_ARCHIVES || [];
  if (!current || !Array.isArray(archives)) {
    throw new Error('题库格式无效：必须包含 OMS_EXAM_DATA，且 OMS_EXAM_ARCHIVE 必须是数组。');
  }

  const exams = [current, ...archives];
  const errors = [];
  const warnings = [];
  const examVersions = new Set();
  const globalIds = new Set();
  const pastExams = exams.filter(exam => exam.category === 'past')
    .sort((a, b) => Number(a.date) - Number(b.date));
  const pastStarts = new Map();
  let nextPastId = 1;
  for (const exam of pastExams) {
    pastStarts.set(exam.examVersion, nextPastId);
    nextPastId += Array.isArray(exam.questions) ? exam.questions.length : 0;
  }
  let judgeableProblems = 0;
  let unjudgeableProblems = 0;
  let testCases = 0;

  for (const [examIndex, exam] of exams.entries()) {
    const examLabel = String(exam.title || `试卷 ${examIndex + 1}`);
    const examVersion = String(exam.examVersion || '').trim();
    if (!examVersion) errors.push(`${examLabel} 缺少 examVersion`);
    else if (examVersions.has(examVersion)) errors.push(`${examLabel} 的 examVersion 重复：${examVersion}`);
    else examVersions.add(examVersion);

    if (!Array.isArray(exam.questions) || !exam.questions.length) {
      errors.push(`${examLabel} 没有题目`);
      continue;
    }

    const questionIds = new Set();
    for (const [questionIndex, question] of exam.questions.entries()) {
      const questionLabel = `${examLabel} / 第 ${questionIndex + 1} 题`;
      const id = String(question.id || '').trim();
      if (!id) errors.push(`${questionLabel} 缺少 id`);
      else if (questionIds.has(id)) errors.push(`${questionLabel} 的 id 重复：${id}`);
      else questionIds.add(id);
      if (globalIds.has(id)) errors.push(`${questionLabel} 的全局题号重复：${id}`);
      else globalIds.add(id);
      if (!/^\d+$/.test(id) || !Number.isSafeInteger(Number(id))) errors.push(`${questionLabel} 的题号必须是整数`);
      if (exam.category === 'past') {
        if (Number(id) !== pastStarts.get(examVersion) + questionIndex || Number(id) >= 1001) {
          errors.push(`${questionLabel} 的真题题号不符合按年份连续编号规则`);
        }
      } else if (Number(id) < 1001 || (questionIndex > 0 && Number(id) !== Number(exam.questions[questionIndex - 1].id) + 1)) {
        errors.push(`${questionLabel} 的模拟题题号必须从 1001 起连续编号`);
      }
      if (!String(question.name || '').trim()) errors.push(`${questionLabel} 缺少标题`);

      if (question.judgeable === false) {
        const legacyKey = `${examVersion}:${id}`;
        if (!LEGACY_UNJUDGEABLE.has(legacyKey)) {
          errors.push(`${questionLabel} 不允许新增为不可评测题，必须补齐正式测试点`);
          continue;
        }
        unjudgeableProblems += 1;
        warnings.push(`${questionLabel} 是保留的历史资料缺失题`);
        continue;
      }

      if (!Array.isArray(question.testCases) || !question.testCases.length) {
        errors.push(`${questionLabel} 没有正式测试点`);
        continue;
      }

      judgeableProblems += 1;
      let testScore = 0;
      for (const [testIndex, test] of question.testCases.entries()) {
        const testLabel = `${questionLabel} / 测试点 ${testIndex + 1}`;
        if (!test || typeof test !== 'object') {
          errors.push(`${testLabel} 格式无效`);
          continue;
        }
        if (typeof test.input !== 'string') errors.push(`${testLabel} 缺少标准输入`);
        if (typeof test.expected !== 'string') errors.push(`${testLabel} 缺少预期输出`);
        const score = Number(test.score);
        // A zero-point case is valid inside a bundled IOI subtask: it still
        // has to pass, while the bundle's points live on its leading case.
        if (!Number.isFinite(score) || score < 0) errors.push(`${testLabel} 分值不能为负数`);
        else testScore += score;
        testCases += 1;
      }
      if (Number.isFinite(Number(question.score)) && testScore !== Number(question.score)) {
        errors.push(`${questionLabel} 测试点总分 ${testScore} 与题目分值 ${question.score} 不一致`);
      }
    }
  }

  const report = { exams: exams.length, judgeableProblems, unjudgeableProblems, testCases, warnings };
  if (errors.length) {
    const error = new Error(`题库正式评测校验失败：\n- ${errors.join('\n- ')}`);
    error.report = report;
    throw error;
  }
  return { exams, report, numberExam: context.window.OMS_NUMBER_EXAM };
}

if (require.main === module) {
  try {
    const primaryPath = process.argv[2] ? path.resolve(process.argv[2]) : path.join(__dirname, 'exam-data.js');
    const supplementalPaths = process.argv.length > 3
      ? process.argv.slice(3).map(value => path.resolve(value))
      : (process.argv[2] ? [] : [path.join(__dirname, 'zixun-contest-data.js')].filter(fs.existsSync));
    const { report } = loadAndValidateExamData(primaryPath, supplementalPaths);
    console.log(`题库校验通过：${report.exams} 套试卷，${report.judgeableProblems} 道可评测题，${report.testCases} 个正式测试点。`);
    for (const warning of report.warnings) console.warn(`提醒：${warning}`);
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}

module.exports = { loadAndValidateExamData };
