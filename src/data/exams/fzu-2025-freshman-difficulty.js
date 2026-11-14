(() => {
  // 转专业历年真题统一难度表；题目顺序和名称同时作为数据完整性校验。
  const ratingGroups = [
    ['2022-transfer-major-exam', [
      ['螺旋矩阵', '普及-'],
      ['化学分子质量计算', '普及'],
      ['购票插队', '普及+/提高-'],
      ['1-N 全排列', '普及-'],
      ['区间最小数乘区间和最大值', '普及+/提高-'],
      ['讨厌的数', '普及-'],
      ['质因数分解', '普及-'],
      ['解方程', '普及-']
    ]],
    ['2023-transfer-major-exam', [
      ['敲笨钟', '普及-'],
      ['求解四次方程组', '普及-'],
      ['求化学式分子量', '普及'],
      ['Prince and Princess', '普及+/提高-'],
      ['小明打字', '普及'],
      ['月饼', '普及-'],
      ['质因数分解', '普及-'],
      ['幸运 ID', '普及-']
    ]],
    ['2024-transfer-major-exam', [
      ['A 的 B 次方的后四位', '普及-'],
      ['最大子列和', '普及-'],
      ['重排链表', '普及'],
      ['兔子试毒', '普及'],
      ['淹没岛屿', '普及'],
      ['引水入城', '提高'],
      ['无聊的游戏', '入门'],
      ['字母串处理', '入门'],
      ['鱼与熊掌', '普及-'],
      ['绝对值比大小', '普及-']
    ]],
    ['2025-transfer-major-exam', [
      ['判断素数', '普及-'],
      ['加油站', '普及-'],
      ['开关灯', '普及-'],
      ['艾莲的化学实验', '普及'],
      ['迷宫', '普及'],
      ['兄弟数', '普及'],
      ['最长子序列', '普及'],
      ['染色', '普及+/提高-']
    ]],
    ['2025-transfer-major-freshman-exam', [
      ['再进去几个人', '入门'],
      ['前一天的日期', '普及-'],
      ['分糖果', '入门'],
      ['试验田', '普及-'],
      ['骑士与恶龙', '普及-'],
      ['贪吃蛇吃苹果', '普及-'],
      ['一元一次方程', '普及'],
      ['缺失的硬币之和', '普及-']
    ]]
  ];
  const archive = window.OMS_EXAM_ARCHIVE;
  if (!Array.isArray(archive)) throw new Error('转专业机试难度表加载前题库尚未初始化');
  ratingGroups.forEach(([examVersion, ratings]) => {
    const exam = archive.find(item => item.examVersion === examVersion);
    if (!exam || !Array.isArray(exam.questions) || exam.questions.length !== ratings.length) {
      throw new Error('转专业机试难度表与题目列表不一致：' + examVersion);
    }
    exam.questions.forEach((question, index) => {
      const [name, difficulty] = ratings[index];
      if ((question.name || question.title) !== name) {
        throw new Error('转专业机试难度表题目顺序不一致：' + examVersion + ' / ' + name);
      }
      question.difficulty = difficulty;
    });
  });
})();
