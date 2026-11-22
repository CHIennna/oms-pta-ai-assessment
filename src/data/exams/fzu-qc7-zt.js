(() => {
  const data = {
  "examVersion": "fzu-qc7-zwillingstuerme-remake-20261128-v2",
  "revision": "独立重制V2 · 2026年11月21日验证",
  "title": "福州大学2025级第七次质量检测",
  "type": "IOI",
  "rule": "IOI",
  "contestType": "IOI",
  "category": "mock",
  "selfScheduled": false,
  "date": "2026-11-26",
  "duration": 120,
  "totalScore": 800,
  "author": "转专业命题中心",
  "setter": {
    "label": "转专业命题中心"
  },
  "introduction": "望见烈日焚烧天空之影。\n望见君王的国沦殁，隐逸在心中的最后喉音。\n恩典永恒，如金律不可动摇。\n权威无情，泪滑过脸庞。\n告别他的愿景。告别他的罪。献上君王的终局。\n拾级而上吧，此为步上双塔之时。",
  "questions": [
    {
      "id": "1211",
      "letter": "ZT-1",
      "name": "ZT-1 清唱「晴空之歌」",
      "difficulty": "普及-",
      "title": "ZT-1 清唱「晴空之歌」",
      "score": 100,
      "tests": 10,
      "sampleInput": "9\n1 1 3 3 2 2 4 4 3",
      "sampleOutput": "3 3",
      "statement": "## ZT-1 清唱「晴空之歌」（100分）\n\n### 莱塔尼亚纪事\n\n莱塔尼亚的庆典音乐从低音逐渐转入高音，偶尔又走向下降旋律。记录员希望辨认真正发生过的旋律转折，而不是把连续重复的音高误当作转折。\n\n### 题目描述\n\n有 N 个依次出现的整数音高 $a_{i}$。先将相邻且相等的音高压缩为一个音高，并保留每个连续等值段的起始位置，得到序列 $b_{1}$...$b_{k}$。对于 1<i<k，若 $b_{i}$ 同时严格大于两侧音高，或者同时严格小于两侧音高，就称它为一个转折。求转折总数 T，以及第一个转折在原序列中的位置 P（取对应连续等值段的起始位置）。没有转折时输出 0 -1。\n\n### 输入格式\n\n第一行输入 N。第二行输入 N 个整数 $a_{i}$。\n\n### 输出格式\n\n输出 T P，若无转折则输出 0 -1。\n\n### 数据范围与约定\n\n1≤N≤200000，-$10^{9}$≤$a_{i}$≤$10^{9}$。\n\n### 输入样例\n\n```text\n9\n1 1 3 3 2 2 4 4 3\n```\n\n### 输出样例\n\n```text\n3 3\n```\n",
      "judgeable": true,
      "testArchive": {
        "file": "QC7_20261121_hidden_tests.zip",
        "prefix": "QC7/P01",
        "count": 10,
        "score": 0,
        "scores": [
          5,
          5,
          5,
          5,
          10,
          10,
          10,
          10,
          20,
          20
        ]
      },
      "legacyIds": [
        "2026112801",
        "1"
      ]
    },
    {
      "id": "1212",
      "letter": "ZT-2",
      "name": "ZT-2 序曲「哨兵」",
      "difficulty": "普及+/提高-",
      "title": "ZT-2 序曲「哨兵」",
      "score": 100,
      "tests": 12,
      "sampleInput": "4 6\n4 7 7 2\nQ 1\nQ 3\nC 4 5\nQ 2\nC 2 -8\nQ 4",
      "sampleOutput": "7 2\n4 1\n7 3\n-1 1",
      "statement": "## ZT-2 序曲「哨兵」（100分）\n\n### 莱塔尼亚纪事\n\n庆典执勤人员按照战备值排名。战备值随时可能增加或减少，指挥部不断询问当前第k高的战备值，以及有多少人的战备值恰好等于它。\n\n### 题目描述\n\n初始有 N 名哨兵，编号1...N，初始整数战备值分别为 $a_{i}$。接下来 Q 条操作，格式为 `C id delta` 或 `Q k`：前者把编号 id 的战备值增加 delta（delta 可以为负），后者对当前所有 N 名哨兵的战备值从大到小排列，查询第 k 高的数值 v，以及恰好等于 v 的哨兵人数 cnt。战备值相同的哨兵在排序中占据不同名次。所有操作依次生效。\n\n### 输入格式\n\n第一行输入 N Q；第二行输入 N 个整数 $a_{i}$；接下来 Q 行为 C id delta 或 Q k。\n\n### 输出格式\n\n对每条 Q k 输出 v cnt。\n\n### 数据范围与约定\n\n1≤N,Q≤200000，-$10^{9}$≤$a_{i}$,delta≤$10^{9}$，1≤id≤N，1≤k≤N；战备值可能超出32位整数范围。\n\n### 输入样例\n\n```text\n4 6\n4 7 7 2\nQ 1\nQ 3\nC 4 5\nQ 2\nC 2 -8\nQ 4\n```\n\n### 输出样例\n\n```text\n7 2\n4 1\n7 3\n-1 1\n```\n",
      "judgeable": true,
      "testArchive": {
        "file": "QC7_20261121_hidden_tests.zip",
        "prefix": "QC7/P02",
        "count": 12,
        "score": 0,
        "scores": [
          5,
          5,
          5,
          5,
          5,
          5,
          10,
          10,
          10,
          10,
          10,
          20
        ]
      },
      "legacyIds": [
        "2026112802",
        "2"
      ]
    },
    {
      "id": "1213",
      "letter": "ZT-3",
      "name": "ZT-3 练习曲「奇遇」",
      "difficulty": "普及+/提高-",
      "title": "ZT-3 练习曲「奇遇」",
      "score": 100,
      "tests": 12,
      "sampleInput": "5 4\n1 4\n2 4\n4 5\n3 5",
      "sampleOutput": "1 2 3 4 5\n3",
      "statement": "## ZT-3 练习曲「奇遇」（100分）\n\n### 莱塔尼亚纪事\n\n两位乐师想在庆典上让一系列合奏依次上演。但某些合奏必须等到其他合奏结束后才能开始。每场合奏都需要在演出清单中排一个位置，也可能发生互相等待的矛盾。\n\n### 题目描述\n\n共有 N 场合奏，编号1...N，给定 M 条约束 u v：合奏 u 必须先于合奏 v。求所有满足约束的清单中字典序最小的一份，并同时计算如果允许没有依赖关系的合奏在同一轮并行完成、每场合奏恰好持续一轮、依赖必须跨轮，那么全部完成所需的最少轮数 R。若依赖关系形成有向环，则输出 CYCLE。\n\n### 输入格式\n\n第一行输入 N M；接下来 M 行各输入 u v。允许 u=v 与重复约束。\n\n### 输出格式\n\n存在环时输出 CYCLE；否则第一行输出按顺序的 N 个编号，第二行输出最少轮数 R。\n\n### 数据范围与约定\n\n1≤N≤200000，0≤M≤200000，1≤u,v≤N。\n\n### 输入样例\n\n```text\n5 4\n1 4\n2 4\n4 5\n3 5\n```\n\n### 输出样例\n\n```text\n1 2 3 4 5\n3\n```\n",
      "judgeable": true,
      "testArchive": {
        "file": "QC7_20261121_hidden_tests.zip",
        "prefix": "QC7/P03",
        "count": 12,
        "score": 0,
        "scores": [
          5,
          5,
          5,
          5,
          5,
          5,
          5,
          5,
          15,
          15,
          15,
          15
        ]
      },
      "legacyIds": [
        "2026112803",
        "3"
      ]
    },
    {
      "id": "1214",
      "letter": "ZT-4",
      "name": "ZT-4 狂想曲「望想」",
      "difficulty": "普及",
      "title": "ZT-4 狂想曲「望想」",
      "score": 100,
      "tests": 12,
      "sampleInput": "5 3\n1 2 8 4 9",
      "sampleOutput": "3",
      "statement": "## ZT-4 狂想曲「望想」（100分）\n\n### 莱塔尼亚纪事\n\n年轻的作曲家希望把一串恰好排成一线的观测台改造成音乐传声站。为了避免不同传声站互相干扰，他们之间应尽量保持距离。\n\n### 题目描述\n\n在数轴上给出 N 个不同的候选位置 $x_{i}$，可以在其中恰好选择 K 个位置设置传声站。定义方案间隔为所选任意两个位置之间绝对距离的最小值；当 K=1 时没有两站之间的距离，此情况答案定义为0。求所有方案中间隔的最大值 D。注意只能选给定位置，不允许随意添加新位置。\n\n### 输入格式\n\n第一行输入 N K；第二行输入 N 个互不相同的整数 $x_{i}$。\n\n### 输出格式\n\n输出最大可能间隔 D。\n\n### 数据范围与约定\n\n1≤K≤N≤200000，-$10^{9}$≤$x_{i}$≤$10^{9}$。\n\n### 输入样例\n\n```text\n5 3\n1 2 8 4 9\n```\n\n### 输出样例\n\n```text\n3\n```\n",
      "judgeable": true,
      "testArchive": {
        "file": "QC7_20261121_hidden_tests.zip",
        "prefix": "QC7/P04",
        "count": 12,
        "score": 0,
        "scores": [
          5,
          5,
          5,
          5,
          5,
          5,
          5,
          10,
          10,
          10,
          15,
          20
        ]
      },
      "legacyIds": [
        "2026112804",
        "4"
      ]
    },
    {
      "id": "1215",
      "letter": "ZT-5",
      "name": "ZT-5 奏鸣曲「秋日」",
      "difficulty": "普及+/提高-",
      "title": "ZT-5 奏鸣曲「秋日」",
      "score": 100,
      "tests": 11,
      "sampleInput": "7 3\n0010111",
      "sampleOutput": "2",
      "statement": "## ZT-5 奏鸣曲「秋日」（100分）\n\n### 莱塔尼亚纪事\n\n演奏者获得一份由两种声部记号组成的简谱。指挥希望将它整理成恰好K段相互交替的乐句，每段内必须使用同一种声部记号。\n\n### 题目描述\n\n给定长度为 N 的01串 s。可以花费1次修改，把其中任意一个字符从0改成1或从1改成0。目标是使修改后的字符串恰好由 K 个非空的连续等值段组成，即所有连续相同字符合并成段后恰有 K 段；相邻段的字符必然不同。求需要修改的最少字符数。允许修改任意多个位置，K≥1，K≤N。\n\n### 输入格式\n\n第一行输入 N K；第二行输入长度为 N 的01串。\n\n### 输出格式\n\n输出最少修改次数。\n\n### 数据范围与约定\n\n1≤K≤N≤200000，K≤20，$s_{i}$∈{0,1}。\n\n### 输入样例\n\n```text\n7 3\n0010111\n```\n\n### 输出样例\n\n```text\n2\n```\n",
      "judgeable": true,
      "testArchive": {
        "file": "QC7_20261121_hidden_tests.zip",
        "prefix": "QC7/P05",
        "count": 11,
        "score": 0,
        "scores": [
          5,
          5,
          5,
          5,
          5,
          10,
          10,
          10,
          10,
          10,
          25
        ]
      },
      "legacyIds": [
        "2026112805",
        "5"
      ]
    },
    {
      "id": "1216",
      "letter": "ZT-6",
      "name": "ZT-6 华尔兹「假面」",
      "difficulty": "普及",
      "title": "ZT-6 华尔兹「假面」",
      "score": 100,
      "tests": 12,
      "sampleInput": "11\n+ 5\n+ 2\n?\n-\n?\n!\n?\n+ 5\n?\n!\n?",
      "sampleOutput": "2 2\n1 5\n2 2\n2 5\n2 2",
      "statement": "## ZT-6 华尔兹「假面」（100分）\n\n### 莱塔尼亚纪事\n\n假面舞会开始时舞台上没有演员。演员依次登场与退场，舞会总监偶尔会要求撤销刚刚实施的一次登场或退场操作。观众只关心当前仍在台上的面具种类，以及最后登场且尚未退场的演员。\n\n### 题目描述\n\n维护一个初始为空的栈，栈中的每个元素是整数面具编号。依次执行Q条操作：`+ x` 将面具编号x压入栈顶；`-` 将栈顶元素弹出（保证当前栈非空）；`!` 撤销最近一次尚未被撤销的 `+` 或 `-` 操作，恢复该操作之前的栈状态（保证存在可撤销的操作）。被撤销的操作不再能被下次 `!` 撤销；新进行的普通操作会加入可撤销记录。`?` 查询当前栈中不同面具编号的数量 d，以及栈顶编号 top，空栈时 top=-1。`?` 和 `!` 本身不加入可撤销记录。对于每次 `?`，输出 d top。\n\n### 输入格式\n\n第一行输入 Q；接下来 Q 行为上述四种操作之一。\n\n### 输出格式\n\n对每次 ? 输出 d top。\n\n### 数据范围与约定\n\n1≤Q≤200000，1≤x≤$10^{9}$，所有操作合法。\n\n### 输入样例\n\n```text\n11\n+ 5\n+ 2\n?\n-\n?\n!\n?\n+ 5\n?\n!\n?\n```\n\n### 输出样例\n\n```text\n2 2\n1 5\n2 2\n2 5\n2 2\n```\n",
      "judgeable": true,
      "testArchive": {
        "file": "QC7_20261121_hidden_tests.zip",
        "prefix": "QC7/P06",
        "count": 12,
        "score": 0,
        "scores": [
          5,
          5,
          5,
          5,
          5,
          5,
          5,
          5,
          5,
          5,
          25,
          25
        ]
      },
      "legacyIds": [
        "2026112806",
        "6"
      ]
    },
    {
      "id": "1217",
      "letter": "ZT-7",
      "name": "ZT-7 协奏曲「复活」",
      "difficulty": "普及+/提高-",
      "title": "ZT-7 协奏曲「复活」",
      "score": 100,
      "tests": 14,
      "sampleInput": "4 4 3\n1 2\n2 3\n3 4\n1 4\n1 2 4",
      "sampleOutput": "6\n3\n1",
      "statement": "## ZT-7 协奏曲「复活」（100分）\n\n### 莱塔尼亚纪事\n\n被遗忘的双塔地下连接网正在关闭。边上的封锁顺序已经确定，守护者想知道每封锁一条通道之后，究竟还有多少对不同的区域能够互相抵达。\n\n### 题目描述\n\n给定一个包含N个顶点、M条无向边的图，允许平行边和自环。接着给出Q条删除指令 $e_{1}$...$e_{Q}$，表示依次删除编号为$e_{i}$的边，保证每条边至多被删除一次。对于每次删除之后的图，求不同的无序顶点对 {u,v}（u≠v）中仍然存在路径连接的数量。注意需要在每次删除后分别输出结果，初始未删除的边始终保留。\n\n### 输入格式\n\n第一行输入 N M Q；接下来 M 行各输入 u v，第 i 行边编号为i；最后一行输入Q个不同的边编号（可跨行给出）。\n\n### 输出格式\n\n按删除顺序输出Q行，每行一个仍然连通的无序顶点对数量。\n\n### 数据范围与约定\n\n1≤N≤200000，1≤M≤200000，1≤Q≤M，1≤u,v≤N；答案使用64位整数。\n\n### 输入样例\n\n```text\n4 4 3\n1 2\n2 3\n3 4\n1 4\n1 2 4\n```\n\n### 输出样例\n\n```text\n6\n3\n1\n```\n",
      "judgeable": true,
      "testArchive": {
        "file": "QC7_20261121_hidden_tests.zip",
        "prefix": "QC7/P07",
        "count": 14,
        "score": 0,
        "scores": [
          5,
          5,
          5,
          5,
          5,
          5,
          5,
          5,
          10,
          10,
          10,
          10,
          10,
          10
        ]
      },
      "legacyIds": [
        "2026112807",
        "7"
      ]
    },
    {
      "id": "1218",
      "letter": "ZT-8",
      "name": "ZT-8 夜歌「未见的高塔」",
      "difficulty": "普及+/提高-",
      "title": "ZT-8 夜歌「未见的高塔」",
      "score": 100,
      "tests": 13,
      "sampleInput": "5 3\n1 2 2\n2 3 3\n2 4 4\n4 5 1\n1 3 5\n3 3 5\n1 1 1",
      "sampleOutput": "2 10\n3 8\n1 0",
      "statement": "## ZT-8 夜歌「未见的高塔」（100分）\n\n### 莱塔尼亚纪事\n\n双塔顶端的旧日乐声最终沿着一棵没有回路的地下通道树传播。三名来自不同入口的探访者约定在树上的同一个节点会合，希望三人走过的总路程最短。\n\n### 题目描述\n\n给定一棵含有N个顶点的带权无向树，每条边长度为正整数。对于每次询问给出三个顶点 a,b,c（允许相同）。三人分别从这三个顶点出发，沿着树上唯一的简单路径走到某个共同节点 x（x 必须是树上原有顶点）。求使 dist(a,x)+dist(b,x)+dist(c,x) 最小的节点 x，以及最小总距离 D。对于三个起点，树上的最优会合点是唯一的。\n\n### 输入格式\n\n第一行输入 N Q；随后 N-1 行每行 u v w；随后 Q 行每行 a b c。\n\n### 输出格式\n\n每次询问输出 x D。\n\n### 数据范围与约定\n\n1≤N,Q≤200000，1≤u,v,a,b,c≤N，1≤w≤$10^{9}$；树结构保证连通且没有环，距离使用64位整数。\n\n### 输入样例\n\n```text\n5 3\n1 2 2\n2 3 3\n2 4 4\n4 5 1\n1 3 5\n3 3 5\n1 1 1\n```\n\n### 输出样例\n\n```text\n2 10\n3 8\n1 0\n```\n",
      "judgeable": true,
      "testArchive": {
        "file": "QC7_20261121_hidden_tests.zip",
        "prefix": "QC7/P08",
        "count": 13,
        "score": 0,
        "scores": [
          5,
          5,
          5,
          5,
          5,
          5,
          10,
          10,
          10,
          10,
          10,
          10,
          10
        ]
      },
      "legacyIds": [
        "2026112808",
        "8"
      ]
    }
  ],
  "startAt": "2026-11-26T15:00:00+08:00",
  "endAt": "2026-11-26T17:00:00+08:00",
  "scheduleVersion": "20261122-remake-v2-fixed",
  "numberingVersion": 1,
  "registered": 1,
  "participants": 1
};
  const archive=window.OMS_EXAM_ARCHIVE||(window.OMS_EXAM_ARCHIVE=[]);
  const existing=archive.findIndex(exam=>exam.examVersion===data.examVersion);
  const others=[window.OMS_EXAM_DATA,...archive].filter(exam=>exam&&exam.examVersion!==data.examVersion);
  const exam=window.OMS_NUMBER_EXAM?window.OMS_NUMBER_EXAM(data,[...others,data]):data;
  if(existing>=0)archive[existing]=exam;
  else archive.unshift(exam);
})();
