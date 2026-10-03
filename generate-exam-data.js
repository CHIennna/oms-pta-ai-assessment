const fs = require('fs');

const sourcePath = process.argv[2];
const targetPath = process.argv[3];
const examVersion = process.argv[4] || '2026-10-04-first-weekly-practice-800';
const outputMode = process.argv[5] || 'current';
const source = fs.readFileSync(sourcePath, 'utf8').replace(/\r\n?/g, '\n');
const readMeta = (label, fallback = '') => (source.match(new RegExp(`\\*\\*${label}[：:]\\s*([^*]+)\\*\\*`)) || [])[1]?.trim() || fallback;
const scoreLine = /^\s*\*{0,2}\s*分数\s*[：:]?\s*(\d+)\s*分?\s*\*{0,2}\s*$/m;
const fencedAfter = (block, label) => {
  const pattern = '(?:^|\\n)\\s*' + label + '[：:]?\\s*\\n\\s*```[^\\n]*\\n([\\s\\S]*?)\\n\\s*```';
  const match = new RegExp(pattern, 'm').exec(block);
  return match ? match[1].trimEnd() : '';
};
const topLevelHeadings = [...source.matchAll(/^#\s+(.+?)\s*$/gm)];
const headings = topLevelHeadings.slice(1).map(heading => {
  const parsed = heading[1].match(/^(\d+)(?:[.、．]\s*|\s+)(.+)$/);
  return parsed ? { index: heading.index, text: heading[0], id: parsed[1], name: parsed[2].trim() } : null;
}).filter(Boolean);
const totalScore = Number((source.match(/满分\s*(\d+)\s*分/) || [])[1]) || Number(readMeta('总分', '100').match(/\d+/)?.[0]) || 100;
const declaredQuestionCount = Number(readMeta('原题数量').match(/\d+/)?.[0]) || headings.length;
const defaultQuestionScore = declaredQuestionCount ? totalScore / declaredQuestionCount : 0;
const parsedQuestions = headings.map((heading, index) => {
  const body = source.slice(heading.index + heading.text.length, headings[index + 1]?.index ?? source.length).trim();
  const score = Number((body.match(scoreLine) || [])[1]) || defaultQuestionScore;
  const testHeading = /^###\s+测试点\s+(\d+)\s*(?:（(\d+)\s*分）|\((\d+)\s*分\))?\s*$/gm;
  const markers = [...body.matchAll(testHeading)];
  const declaredTestCases = markers.map((marker, testIndex) => {
    const block = body.slice(marker.index + marker[0].length, markers[testIndex + 1]?.index ?? body.length);
    return {
      input: fencedAfter(block, '标准输入'),
      expected: fencedAfter(block, '预期输出'),
      score: Number(marker[2] || marker[3]) || 0
    };
  }).filter(test => test.input || test.expected);
  const publicStatement = body.split(/^##\s+测试点\s*$/m)[0].replace(scoreLine, '').trim();
  const sampleInput = fencedAfter(publicStatement, '## (?:样例输入|输入样例)');
  const sampleOutput = fencedAfter(publicStatement, '## (?:样例输出|输出样例)');
  const testCases = declaredTestCases.length ? declaredTestCases : sampleInput || sampleOutput ? [{ input: sampleInput, expected: sampleOutput, score }] : [];
  return {
    id: outputMode === 'archive' ? `${String(examVersion).match(/^\d{4}/)?.[0] || examVersion}-${heading.id}` : heading.id,
    name: heading.name,
    score,
    tests: testCases.length,
    sampleInput: sampleInput || testCases[0]?.input || '',
    sampleOutput: sampleOutput || testCases[0]?.expected || '',
    statement: publicStatement,
    testCases,
    judgeable: testCases.length > 0
  };
});
const archiveIdPrefix = String(examVersion).match(/^\d{4}/)?.[0] || examVersion;
const questions = outputMode === 'archive' && declaredQuestionCount > parsedQuestions.length
  ? Array.from({ length: declaredQuestionCount }, (_, index) => parsedQuestions.find(question => question.id === `${archiveIdPrefix}-${index + 1}`) || {
      id: `${archiveIdPrefix}-${index + 1}`,
      name: `第 ${index + 1} 题（资料缺失）`,
      score: defaultQuestionScore,
      tests: 0,
      sampleInput: '',
      sampleOutput: '',
      statement: '## 资料说明\n\n原始资料未保留本题题面，暂不支持评测。',
      testCases: [],
      judgeable: false
    })
  : parsedQuestions;
const fallbackTitle = (topLevelHeadings[0]?.[1]?.trim() || '程序设计考试')
  .replace(/题目(?:[（(]题解校正版[）)]|\s*[｜|]\s*正式优化版)$/, '')
  .trim();
const exam = {
  examVersion,
  title: readMeta('考试名称', fallbackTitle),
  duration: Number(readMeta('考试时长', outputMode === 'archive' ? '0' : '120').match(/\d+/)?.[0]) || 0,
  totalScore,
  questions
};
if (outputMode === 'archive') Object.assign(exam, { category: 'past', date: String(exam.title).match(/\d{4}/)?.[0] || '', status: '历年卷' });
const output = outputMode === 'archive'
  ? `window.OMS_EXAM_ARCHIVE = window.OMS_EXAM_ARCHIVE || [];\nwindow.OMS_EXAM_ARCHIVE.push(${JSON.stringify(exam, null, 2)});\n`
  : `window.OMS_EXAM_DATA = ${JSON.stringify(exam, null, 2)};\n`;
if (targetPath === '-') process.stdout.write(output);
else {
  fs.writeFileSync(targetPath, output, 'utf8');
  console.log(`generated ${questions.length} questions, ${questions.reduce((sum, question) => sum + question.testCases.length, 0)} tests, ${questions.reduce((sum, question) => sum + question.score, 0)} points`);
}
