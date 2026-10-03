const fs = require('fs');

const sourcePath = process.argv[2];
const targetPath = process.argv[3];
const source = fs.readFileSync(sourcePath, 'utf8').replace(/\r\n?/g, '\n');
const readMeta = (label, fallback = '') => (source.match(new RegExp(`\\*\\*${label}[：:]\\s*([^*]+)\\*\\*`)) || [])[1]?.trim() || fallback;
const fencedAfter = (block, label) => {
  const pattern = '(?:^|\\n)\\s*' + label + '[：:]\\s*\\n\\s*```[^\\n]*\\n([\\s\\S]*?)\\n\\s*```';
  const match = new RegExp(pattern, 'm').exec(block);
  return match ? match[1].trimEnd() : '';
};
const headings = [...source.matchAll(/^#\s+(\d+)\s+(.+?)\s*$/gm)];
const questions = headings.map((heading, index) => {
  const body = source.slice(heading.index + heading[0].length, headings[index + 1]?.index ?? source.length).trim();
  const score = Number((body.match(/^分数\s+(\d+)\s*$/m) || [])[1]) || 0;
  const testHeading = /^###\s+测试点\s+(\d+)\s*(?:（(\d+)\s*分）|\((\d+)\s*分\))?\s*$/gm;
  const markers = [...body.matchAll(testHeading)];
  const testCases = markers.map((marker, testIndex) => {
    const block = body.slice(marker.index + marker[0].length, markers[testIndex + 1]?.index ?? body.length);
    return {
      input: fencedAfter(block, '标准输入'),
      expected: fencedAfter(block, '预期输出'),
      score: Number(marker[2] || marker[3]) || 0
    };
  }).filter(test => test.input || test.expected);
  const publicStatement = body.split(/^##\s+测试点\s*$/m)[0].replace(/^分数\s+\d+\s*$/m, '').trim();
  return {
    id: heading[1],
    name: heading[2].trim(),
    score,
    tests: testCases.length,
    sampleInput: fencedAfter(publicStatement, '## 样例输入') || testCases[0]?.input || '',
    sampleOutput: fencedAfter(publicStatement, '## 样例输出') || testCases[0]?.expected || '',
    statement: publicStatement,
    testCases
  };
});
const exam = {
  examVersion: '2026-10-04-first-weekly-practice',
  title: readMeta('考试名称', '2026-10-04 转专业第一次周练'),
  duration: Number(readMeta('考试时长', '120').match(/\d+/)?.[0]) || 120,
  totalScore: Number(readMeta('总分', '100').match(/\d+/)?.[0]) || 100,
  questions
};
const output = `window.OMS_EXAM_DATA = ${JSON.stringify(exam, null, 2)};\n`;
if (targetPath === '-') process.stdout.write(output);
else {
  fs.writeFileSync(targetPath, output, 'utf8');
  console.log(`generated ${questions.length} questions, ${questions.reduce((sum, question) => sum + question.testCases.length, 0)} tests, ${questions.reduce((sum, question) => sum + question.score, 0)} points`);
}
