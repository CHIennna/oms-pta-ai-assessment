(() => {
  // 洛谷新版难度体系；按本站 2025 大一转专业机试实际题面评级。
  const ratings = [
    ['再进去几个人', '入门'],
    ['前一天的日期', '普及-'],
    ['分糖果', '入门'],
    ['试验田', '普及-'],
    ['骑士与恶龙', '普及-'],
    ['贪吃蛇吃苹果', '普及-'],
    ['一元一次方程', '普及'],
    ['缺失的硬币之和', '普及-']
  ];
  const archive = window.OMS_EXAM_ARCHIVE;
  const exam = Array.isArray(archive)
    ? archive.find(item => item.examVersion === '2025-transfer-major-freshman-exam')
    : null;
  if (!exam || !Array.isArray(exam.questions) || exam.questions.length !== ratings.length) {
    throw new Error('2025 大一机试难度表与题目列表不一致');
  }
  exam.questions.forEach((question, index) => {
    const [name, difficulty] = ratings[index];
    if ((question.name || question.title) !== name) {
      throw new Error('2025 大一机试难度表题目顺序不一致：' + name);
    }
    question.difficulty = difficulty;
  });
})();
