const fs = require('fs');
const path = require('path');
const vm = require('vm');

const projectRoot = __dirname;
const outputRoot = path.join(projectRoot, 'exports', '2022-2025计算机转专业机试真题题面');
const sourceFiles = [
  path.join(projectRoot, 'src', 'data', 'exams', 'exam-data.js'),
  path.join(projectRoot, 'src', 'data', 'exams', 'fzu-2025-freshman-cs.js'),
];
const examOrder = [
  '2022-transfer-major-exam',
  '2023-transfer-major-exam',
  '2024-transfer-major-exam',
  '2025-transfer-major-exam',
  '2025-transfer-major-freshman-exam',
];

function safeName(value) {
  return String(value).replace(/[<>:"/\\|?*]/g, '_').trim();
}

function writeText(filePath, content) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${content.trimEnd()}\n`, 'utf8');
}

function questionDocument(exam, question, position) {
  const difficulty = question.difficulty || question.difficultyEstimate || '待定';
  const tags = Array.isArray(question.tags) && question.tags.length
    ? question.tags.join('、')
    : '—';
  return [
    `# P${position} ${question.name}`,
    '',
    `- 试卷：${exam.title}`,
    `- 平台题号：${question.id}`,
    `- 分值：${question.score ?? 100}`,
    `- 难度：${difficulty}`,
    `- 主要考点：${tags}`,
    '',
    '---',
    '',
    question.statement || '题面暂缺。',
  ].join('\n');
}

if (fs.existsSync(outputRoot)) {
  throw new Error(`输出目录已存在，请先确认后再处理：${outputRoot}`);
}

const context = { window: {} };
vm.createContext(context);
for (const filePath of sourceFiles) {
  vm.runInContext(fs.readFileSync(filePath, 'utf8'), context, { filename: filePath });
}

const archive = context.window.OMS_EXAM_ARCHIVE || [];
const exams = examOrder.map((version) => {
  const exam = archive.find((item) => item.examVersion === version);
  if (!exam) throw new Error(`未找到试卷：${version}`);
  return exam;
});

const readme = [
  '# 2022—2025 计算机转专业机试真题题面',
  '',
  `共 ${exams.length} 套试卷，${exams.reduce((sum, exam) => sum + exam.questions.length, 0)} 道题。`,
  '',
  '本资料包仅包含题面、难度和主要考点，不包含测试点、答案、题解或提交记录。',
  '',
  '## 目录',
  '',
];

for (const [examIndex, exam] of exams.entries()) {
  const folderName = `${String(examIndex + 1).padStart(2, '0')}_${safeName(exam.title)}`;
  const examLines = [
    `# ${exam.title}`,
    '',
    `- 日期：${exam.date || String(exam.startAt || '').slice(0, 10) || '—'}`,
    `- 时长：${exam.duration || '—'}`,
    `- 题数：${exam.questions.length}`,
    `- 总分：${exam.totalScore || exam.questions.reduce((sum, question) => sum + (question.score || 0), 0)}`,
    '',
    '## 题目目录',
    '',
  ];

  readme.push(`- ${exam.title}（${exam.questions.length} 题）`);
  exam.questions.forEach((question, index) => {
    const position = index + 1;
    const fileName = `P${position}_${safeName(question.name)}.md`;
    examLines.push(`- [P${position} ${question.name}](./${encodeURI(fileName)})`);
    writeText(
      path.join(outputRoot, folderName, fileName),
      questionDocument(exam, question, position),
    );
  });
  writeText(path.join(outputRoot, folderName, '试卷目录.md'), examLines.join('\n'));
}

writeText(path.join(outputRoot, 'README.md'), readme.join('\n'));
console.log(`已导出 ${exams.length} 套试卷，共 ${exams.reduce((sum, exam) => sum + exam.questions.length, 0)} 道题：${outputRoot}`);
