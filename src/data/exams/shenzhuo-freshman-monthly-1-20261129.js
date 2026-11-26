(() => {
  const data = {
    examVersion: '2026-shenzhuo-freshman-monthly-1',
    title: '2026 年“厦门神桌杯”福州大学算法设计新生有奖月赛 1',
    category: 'contest',
    type: 'ACM/ICPC',
    rule: 'ACM/ICPC',
    contestType: 'ACM/ICPC',
    date: '2026-11-29',
    startAt: '2026-11-29T18:00:00+08:00',
    endAt: '2026-11-29T22:00:00+08:00',
    duration: 240,
    scheduleVersion: '20261126-freshman-monthly-1',
    participants: 5,
    registered: 5,
    setter: { label: '102501419' },
    introduction: '各位需要在FZUOJ考试客户端中答题，否则将被判定为违规并取消成绩。',
    pendingQuestions: true,
    totalScore: 0,
    questions: []
  };
  const archive = window.OMS_EXAM_ARCHIVE || (window.OMS_EXAM_ARCHIVE = []);
  const index = archive.findIndex(exam => exam.examVersion === data.examVersion);
  if (index >= 0) archive[index] = data;
  else archive.unshift(data);
})();
