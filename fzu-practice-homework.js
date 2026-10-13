(() => {
  const collections = [
    { examVersion: "fzu-transfer-homework-1", title: "第 1 次作业｜模拟、字符串和实现细节", questions: [
      {"name":"三人井字棋","sourceUrl":"https://oj.fzu.edu.cn/p/195?tid=6a0da6e85cf97a27276f7710","sourceLabel":"紫讯杯 · A","difficulty":"入门","training":"棋盘模拟","requirement":"枚举三行、三列、两条对角线；注意多组输入","optional":false},
      {"name":"对齐颗粒度","sourceUrl":"https://oj.fzu.edu.cn/p/202?tid=6a0da6e85cf97a27276f7710","sourceLabel":"紫讯杯 · B","difficulty":"普及-","training":"字符串/按列贪心","requirement":"逐列统计 0、1 的数量，处理并列时优先 0","optional":false},
      {"name":"幻灵战队","sourceUrl":"https://oj.fzu.edu.cn/p/187?tid=69fc1bf6410994eeb055ec64","sourceLabel":"2026·5 月 · K","difficulty":"入门","training":"连续状态模拟","requirement":"维护连续失败次数和累计收益","optional":false},
      {"name":"FZUFZU Again","sourceUrl":"https://oj.fzu.edu.cn/p/505?tid=6aae8b3ae943a1ff033c9de5","sourceLabel":"2026·9 月 · G","difficulty":"普及","training":"动态字符串维护","requirement":"单点修改后，只重算受影响的固定长度子串","optional":false},
      {"name":"形式化题面太多了！","sourceUrl":"https://oj.fzu.edu.cn/p/211?tid=6a16f24c13b8d0efd7ed9dfd","sourceLabel":"2026·5 月结课 · H","difficulty":"普及","training":"字符串/操作构造","requirement":"构造相邻交换序列，控制总输出量","optional":true}
    ] },
    { examVersion: "fzu-transfer-homework-2", title: "第 2 次作业｜前缀和、排序与二分", questions: [
      {"name":"遗物校验","sourceUrl":"https://oj.fzu.edu.cn/p/241?tid=6a65ee2b41d2a66ef33ee511","sourceLabel":"集训 Day 2 · C","difficulty":"普及-","training":"高精度取模","requirement":"把超长整数作为字符串，逐位更新余数","optional":false},
      {"name":"被淹没的竹子","sourceUrl":"https://oj.fzu.edu.cn/p/196?tid=6a0da6e85cf97a27276f7710","sourceLabel":"紫讯杯 · C","difficulty":"普及","training":"排序/前缀和/二分","requirement":"对每个水位求 min(a[i],h) 的总和","optional":false},
      {"name":"最小距离","sourceUrl":"https://oj.fzu.edu.cn/p/201?tid=6a0da6e85cf97a27276f7710","sourceLabel":"紫讯杯 · H","difficulty":"普及","training":"字符串/贪心","requirement":"恰好修改 k 位，区分已相同和不相同的位置","optional":false},
      {"name":"旗山的皮卡丘","sourceUrl":"https://oj.fzu.edu.cn/p/146?tid=694fe89396f9881b418daffb","sourceLabel":"2025·12 月 · B","difficulty":"普及","training":"周期模拟/数学","requirement":"处理宿舍灯周期、时间下界和无法同时点亮的情况","optional":false},
      {"name":"冲浪之旅","sourceUrl":"https://oj.fzu.edu.cn/p/511?tid=6aae8b3ae943a1ff033c9de5","sourceLabel":"2026·9 月 · B","difficulty":"普及+/提高-","training":"排序/贪心/堆","requirement":"跨障碍选择强化道具，练习优先队列","optional":true}
    ] },
    { examVersion: "fzu-transfer-homework-3", title: "第 3 次作业｜窗口、哈希、单调结构", questions: [
      {"name":"按位与","sourceUrl":"https://oj.fzu.edu.cn/p/197?tid=6a0da6e85cf97a27276f7710","sourceLabel":"紫讯杯 · G","difficulty":"普及","training":"位运算","requirement":"从二进制每一位的变化思考最小/最大 XOR","optional":false},
      {"name":"颜色","sourceUrl":"https://oj.fzu.edu.cn/p/198?tid=6a0da6e85cf97a27276f7710","sourceLabel":"紫讯杯 · F","difficulty":"普及+/提高-","training":"滑动窗口/频次","requirement":"判断连续子段是否与指定频次数组完全一致","optional":false},
      {"name":"层彩显差","sourceUrl":"https://oj.fzu.edu.cn/p/224?tid=6a65ee2b41d2a66ef33ee511","sourceLabel":"集训 Day 2 · B","difficulty":"普及+/提高-","training":"双单调队列/双指针","requirement":"统计 max−min 达到阈值的连续子数组数量","optional":false},
      {"name":"廊灯叠影","sourceUrl":"https://oj.fzu.edu.cn/p/234?tid=6a65ee2b41d2a66ef33ee511","sourceLabel":"集训 Day 2 · H","difficulty":"普及+/提高-","training":"差分/前缀和","requirement":"将每盏灯贡献拆成分段线性函数并批量累加","optional":false},
      {"name":"厕坪鸡","sourceUrl":"https://oj.fzu.edu.cn/p/165?tid=69e47daff2a43d75b79fc331","sourceLabel":"2026·4 月校赛 · D","difficulty":"提高","training":"长模拟/优先队列","requirement":"调度测评机；专练事前设计结构体和事件，不建议限时","optional":true}
    ] },
    { examVersion: "fzu-transfer-homework-4", title: "第 4 次作业｜DP、贪心、状态设计", questions: [
      {"name":"爱莉希雅的礼物","sourceUrl":"https://oj.fzu.edu.cn/p/204?tid=6a16f24c13b8d0efd7ed9dfd","sourceLabel":"2026·5 月结课 · A","difficulty":"普及","training":"子序列计数 DP","requirement":"统计 Elysia 子序列出现次数，处理模数","optional":false},
      {"name":"很酷，不是倍数","sourceUrl":"https://oj.fzu.edu.cn/p/185?tid=69fc1bf6410994eeb055ec64","sourceLabel":"2026·5 月 · I","difficulty":"普及","training":"数学/构造","requirement":"找最多互不整除的数，说明最优性","optional":false},
      {"name":"左脚踩右脚","sourceUrl":"https://oj.fzu.edu.cn/p/163?tid=69e47daff2a43d75b79fc331","sourceLabel":"2026·4 月校赛 · B","difficulty":"普及","training":"逆向构造/大整数","requirement":"倒推变换操作，再反转输出操作序列","optional":false},
      {"name":"色阶避让","sourceUrl":"https://oj.fzu.edu.cn/p/227?tid=6a65ee2b41d2a66ef33ee511","sourceLabel":"集训 Day 2 · K","difficulty":"普及+/提高-","training":"值域计数/线性 DP","requirement":"相差 D 的值不能同时保留；注意 D=0","optional":false},
      {"name":"合成大 fzu","sourceUrl":"https://oj.fzu.edu.cn/p/167?tid=69e47daff2a43d75b79fc331","sourceLabel":"2026·4 月校赛 · F","difficulty":"普及+/提高-","training":"计数/构造","requirement":"构造恰好 n 个 fzu 子序列的短字符串","optional":true}
    ] },
    { examVersion: "fzu-transfer-homework-5", title: "第 5 次作业｜综合迁移题", questions: [
      {"name":"键盘杀手","sourceUrl":"https://oj.fzu.edu.cn/p/164?tid=69e47daff2a43d75b79fc331","sourceLabel":"2026·4 月校赛 · C","difficulty":"普及+/提高-","training":"贪心/序列","requirement":"寻找清零操作的最低总代价，需要论证操作顺序","optional":false},
      {"name":"异或划分","sourceUrl":"https://oj.fzu.edu.cn/p/181?tid=69fc1bf6410994eeb055ec64","sourceLabel":"2026·5 月 · E","difficulty":"普及+/提高-","training":"前缀异或/构造","requirement":"将序列分成至少两段，段的 XOR 两两不同","optional":false},
      {"name":"质数拼接计数（Easy Version）","sourceUrl":"https://oj.fzu.edu.cn/p/517?tid=6aae8b3ae943a1ff033c9de5","sourceLabel":"2026·9 月 · J","difficulty":"普及+/提高-","training":"质数筛/枚举/去重","requirement":"两个质数十进制拼接；同一结果不能重复计数","optional":false},
      {"name":"已取餐","sourceUrl":"https://oj.fzu.edu.cn/p/152?tid=694fe89396f9881b418daffb","sourceLabel":"2025·12 月 · I","difficulty":"普及+/提高-","training":"排序/贪心/调度","requirement":"处理订单就绪时刻、往返时间和最后一次单程","optional":false},
      {"name":"Teamfight Tactics","sourceUrl":"https://oj.fzu.edu.cn/p/144?tid=694fe89396f9881b418daffb","sourceLabel":"2025·12 月 · D","difficulty":"普及+/提高-或以上","training":"长模拟/多规则","requirement":"八人对战全流程模拟；可拆成多个实现子任务","optional":true}
    ] }
  ];
  const normalize = value => String(value || '').replace(/^[A-Z]\.\s*/, '').trim();
  const build = exams => collections.map(collection => ({
    examVersion: collection.examVersion, title: collection.title, category: 'practice',
    rule: 'IOI', type: 'IOI', duration: 0, registered: 0,
    introduction: '每次 4 道核心题＋1 道选做题，不限时，可按自己的节奏完成。',
    questions: collection.questions.map(item => {
      const matches = exams.flatMap(exam => (exam.questions || []).filter(question =>
        normalize(question.name) === item.name || normalize(question.title) === item.name
      ).map(question => ({ exam, question })));
      if (matches.length > 1) throw new Error('作业题目来源不唯一：' + item.name);
      const source = matches[0];
      const homework = { homeworkOptional: item.optional, homeworkTraining: item.training,
        homeworkRequirement: item.requirement, difficulty: item.difficulty, sourceUrl: item.sourceUrl };
      if (!source) return { ...homework, id: item.sourceUrl.match(/\/p\/(\d+)/)[1],
        name: item.name, score: 100, externalOnly: true, judgeable: false,
        statement: '## 原站练习\n\n本题尚未导入本站，请在 [FZU 原题](' + item.sourceUrl + ') 作答。\n\n作业要求：' + item.requirement,
        unjudgeableReason: '本题尚未导入本站，请打开 FZU 原题练习。' };
      if (source.question.judgeable === false) throw new Error('作业题目缺少可靠测试点：' + item.name);
      return { ...source.question, ...homework, name: item.name, sourceExamVersion: source.exam.examVersion };
    })
  }));
  window.OMS_BUILD_PRACTICE_EXAMS = build;
  window.OMS_PRACTICE_EXAMS = build([window.OMS_EXAM_DATA, ...(window.OMS_EXAM_ARCHIVE || [])].filter(Boolean));
})();
