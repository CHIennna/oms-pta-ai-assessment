(() => {
  const exam = {
    examVersion: '2026-transfer-major-sophomore-exam',
    title: '2026 计算机转专业机试（大二）',
    category: 'past',
    rule: 'IOI',
    type: 'IOI',
    contestType: 'IOI',
    date: '2026-11-30',
    startAt: '2026-11-30T18:30:00+08:00',
    endAt: '2026-11-30T20:30:00+08:00',
    duration: 120,
    scheduleVersion: '20261127-transfer-major-2026',
    participants: 41,
    ownerLabel: '福州大学',
    registered: 41,
    totalScore: 0,
    author: '本站集备组',
    introduction: '[ 福州大学计算机与大数据学院（软件学院）、人工智能学院 ] 我院定于2026年11月30日（周一）18:30-20:30在旗山校区计算机学院3号楼-301进行2025级转专业机试。请报名的同学们携带身份证原件、学生证原件、转专业申请审批表提前15分钟到场。审批表、校内教务处打印的成绩单和相关证书复印件等材料机试时先不交，如有进入面试再带来上交。面试安排另行通知，请密切关注计算机学院官网。考试开始30分钟后不得进入考场，当即做缺考（放弃）处理。\n\n参加面试的名单将在机试后公布在计算机与大数据学院/软件学院网站，请同学们2026年12月2日（周三）16点后务必登入我院网站，查看计算机学院公示-教务公示版块相关内容。定于2026年12月3日（周四）14：00进行转专业面试，具体面试要求和安排将同面试名单一起网站公布，参加面试的同学务必按通知要求，按时到场参加面试，否则做放弃面试处理。\n\n祝考试顺利！',
    questions: Array.from({ length: 8 }, (_, index) => ({
      id: String(66 + index),
      letter: `P${index + 1}`,
      name: '暂无数据',
      title: '暂无数据',
      statement: '暂无数据',
      score: 0,
      tests: 0,
      missingData: true,
      judgeable: false,
      unjudgeableReason: '暂无数据，题目补充后开放评测。'
    }))
  };
  const archive = window.OMS_EXAM_ARCHIVE || (window.OMS_EXAM_ARCHIVE = []);
  const index = archive.findIndex(item => item.examVersion === exam.examVersion);
  const registry = [window.OMS_EXAM_DATA, ...archive].filter(Boolean);
  const numbered = window.OMS_NUMBER_EXAM ? window.OMS_NUMBER_EXAM(exam, registry) : exam;
  if (index >= 0) archive[index] = numbered;
  else archive.push(numbered);
})();
