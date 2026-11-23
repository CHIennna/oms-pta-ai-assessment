(() => {
  const data = {
  "examVersion": "fzu-qc6-volcano-ex-remake-20261125-v2",
  "revision": "独立重制V2 · 2026年11月21日验证",
  "title": "福州大学2025级第六次质量检测",
  "type": "IOI",
  "rule": "IOI",
  "contestType": "IOI",
  "category": "mock",
  "selfScheduled": false,
  "date": "2026-11-23",
  "duration": 120,
  "totalScore": 800,
  "author": "转专业命题中心",
  "setter": {
    "label": "转专业命题中心"
  },
  "introduction": "汐斯塔迁移了一百公里，站在新址的地块边缘向东遥望，还能看到远处的火山。\n\n傍晚灯光亮起，晚霞将天染成粉红色，\n\n星星连成一串，霓虹的梦从草叶中升起，\n\n不论是远行的旅客还是归乡的人，都请安静坐下来，在晚风中听一曲木吉他吧。\n\n新汐斯塔的夏日庆典进入特别篇。金色礼饰、海边行囊、旧城区、离港的船、漂流的记忆、田野、遥远归途与常青树，构成八段新的旅途。所有计算规则以各题正式描述为准。",
  "questions": [
    {
      "id": "1203",
      "letter": "SL-EX-1",
      "name": "SL-EX-1 黄金与玫瑰",
      "difficulty": "普及-",
      "title": "SL-EX-1 黄金与玫瑰",
      "score": 100,
      "tests": 10,
      "sampleInput": "4\n2 9 5 5\n8 3 5 10",
      "sampleOutput": "5",
      "statement": "## SL-EX-1 黄金与玫瑰（100分）\n\n### 海边旅梦\n\n汐斯塔的火山旅梦开幕，游客们携带刻有编号的金色纪念章与玫瑰徽章来到礼品台。调度员可以重新排列两种礼物，只需确保每份纪念章与一份徽章配对。\n\n### 题目描述\n\n有 N 枚黄金纪念章，第 i 枚的编号为 $a_{i}$；另有 N 枚玫瑰徽章，第 i 枚的编号为 $b_{i}$。你可以任意改变两组物品各自的排列顺序，随后将两组物品一一配对。配对 (x,y) 的不协调度定义为 |x-y|。求所有 N 对的不协调度总和的最小值。两组物品均必须全部使用，每个物品恰好参与一对，编号可以重复。\n\n### 输入格式\n\n第一行输入 N。第二行输入 N 个整数 $a_{i}$。第三行输入 N 个整数 $b_{i}$。\n\n### 输出格式\n\n输出一个整数，表示最小不协调度总和。\n\n### 数据范围与约定\n\n1≤N≤200000，0≤$a_{i}$,$b_{i}$≤$10^{9}$，答案使用64位整数。\n\n### 输入样例\n\n```text\n4\n2 9 5 5\n8 3 5 10\n```\n\n### 输出样例\n\n```text\n5\n```\n",
      "judgeable": true,
      "testArchive": {
        "file": "QC6_20261121_hidden_tests.zip",
        "prefix": "QC6/P01",
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
        "2026112501",
        "1"
      ]
    },
    {
      "id": "1204",
      "letter": "SL-EX-2",
      "name": "SL-EX-2 轻装旅行",
      "difficulty": "普及",
      "title": "SL-EX-2 轻装旅行",
      "score": 100,
      "tests": 11,
      "sampleInput": "7 10\n2 1 6 1 5 0 2",
      "sampleOutput": "3 3 5",
      "statement": "## SL-EX-2 轻装旅行（100分）\n\n### 海边旅梦\n\n棘刺为度假旅行划定了若干段步行路线。每段都有不同的疲劳消耗；出于时间考虑，旅行团希望尽快累计足够的疲劳量来安排一次休息。\n\n### 题目描述\n\n有 N 段连续的步行路线，第 i 段消耗非负疲劳值 $a_{i}$。旅行团希望找到一段非空、连续的路线，其疲劳值之和至少为 S。请找出满足要求的路线中长度最短的一段。若存在多段最短路线，选择左端点最小者，输出长度与这段路线的左右端点（从1开始）；若不存在则输出 -1。注意允许 $a_{i}$=0，但 S 始终为正。\n\n### 输入格式\n\n第一行输入 N S。第二行输入 N 个非负整数 $a_{i}$。\n\n### 输出格式\n\n存在时输出 len l r；否则输出 -1。\n\n### 数据范围与约定\n\n1≤N≤200000，1≤S≤$10^{14}$，0≤$a_{i}$≤$10^{9}$。\n\n### 输入样例\n\n```text\n7 10\n2 1 6 1 5 0 2\n```\n\n### 输出样例\n\n```text\n3 3 5\n```\n",
      "judgeable": true,
      "testArchive": {
        "file": "QC6_20261121_hidden_tests.zip",
        "prefix": "QC6/P02",
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
        "2026112502",
        "2"
      ]
    },
    {
      "id": "1205",
      "letter": "SL-EX-3",
      "name": "SL-EX-3 脏旧小城",
      "difficulty": "普及",
      "title": "SL-EX-3 脏旧小城",
      "score": 100,
      "tests": 12,
      "sampleInput": "4 5\nA 2\nC 4\nC 1\nB 3\n1\n3\n7\n8\n10",
      "sampleOutput": "A\nC\nC\nB\nB",
      "statement": "## SL-EX-3 脏旧小城（100分）\n\n### 海边旅梦\n\n旧城区的街牌已经磨损。巡查员按照出现顺序记下每一种牌面和它连续出现的次数，却不想真的展开一条极长的街道。\n\n### 题目描述\n\n一条街道共有 M 段连续的街牌。第 i 段由同一个大写英文字母 $c_{i}$ 连续出现 $k_{i}$ 次组成，各段首尾连接，构成一个长度为 L=Σ$k_{i}$ 的字符串。现在进行 Q 次查询，每次给出位置 x（从1开始），要求回答展开后的字符串在该位置的字母。不允许把整个字符串实际展开到内存中。注意相邻两段允许相同字母，L 可能远大于32位整数范围。\n\n### 输入格式\n\n第一行输入 M Q。接下来 M 行各给出字符 $c_{i}$ 和正整数 $k_{i}$。再接下来 Q 行每行一个位置 x。\n\n### 输出格式\n\n每次询问输出一个大写英文字母，单独占一行。\n\n### 数据范围与约定\n\n1≤M,Q≤200000，1≤$k_{i}$≤$10^{9}$，1≤x≤L，所有位置与总长度使用64位整数。\n\n### 输入样例\n\n```text\n4 5\nA 2\nC 4\nC 1\nB 3\n1\n3\n7\n8\n10\n```\n\n### 输出样例\n\n```text\nA\nC\nC\nB\nB\n```\n",
      "judgeable": true,
      "testArchive": {
        "file": "QC6_20261121_hidden_tests.zip",
        "prefix": "QC6/P03",
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
        "2026112503",
        "3"
      ]
    },
    {
      "id": "1206",
      "letter": "SL-EX-4",
      "name": "SL-EX-4 启航",
      "difficulty": "普及+/提高-",
      "title": "SL-EX-4 启航",
      "score": 100,
      "tests": 14,
      "sampleInput": "12\nL 2\nL 4\nR 7\n?\nB 3\nL 9\nR 5\nS\nM\nB 2\n?\nB 1",
      "sampleOutput": "2 1\n3 35243\n2 1184\n0 0\n0 0",
      "statement": "## SL-EX-4 启航（100分）\n\n### 海边旅梦\n\n汐斯塔游轮设有左右两条登船通道。游客不断进入队列，工作人员会调换整个通道、调拨游客，或者按照既定节奏依次放行。\n\n### 题目描述\n\n维护两条初始为空的队列，分别为左队列 L 和右队列 R。按顺序处理 Q 条指令：\n\n- `L x`：将编号 x 的游客加入左队列尾部。\n- `R x`：将编号 x 的游客加入右队列尾部。\n- `S`：交换左右两条队列的全部内容，交换后原左队列变为右队列。\n- `M`：若左队列非空，将左队列队首游客移到右队列队尾；否则不做任何事。\n- `B k`：本次最多让 k 人登船，若队列总人数不足 k，则让全部人登船。一次登船操作总是先尝试左队列，再尝试右队列，依次交替；若当前轮到的队列为空，则直接从另一队列取一人。注意只有成功放行一人后才切换下一人优先尝试的队列。每次 `B` 都重新从左队列优先开始。\n- `?`：查询两条队列中的人数，输出 `sizeL sizeR`。\n\n每次 `B` 还需要报告本次实际登船的人数 cnt 和登船编号序列的哈希 h。设实际登船编号依次为 $v_{1}$,...,$v_{cnt}$，初始 h=0，每放行一人令 `h=(h×131+v_i) mod 1000000007`。如果没有任何人登船，输出 `0 0`。游客编号可以重复；同一个游客每次入队都是独立的一份记录。\n\n### 输入格式\n\n第一行输入 Q；接下来 Q 行每行一条指令。\n\n### 输出格式\n\n每条 B 指令输出 cnt h；每条 ? 指令输出 sizeL sizeR。\n\n### 数据范围与约定\n\n1≤Q≤200000，1≤x≤$10^{9}$，1≤k≤$10^{9}$，所有指令合法。\n\n### 输入样例\n\n```text\n12\nL 2\nL 4\nR 7\n?\nB 3\nL 9\nR 5\nS\nM\nB 2\n?\nB 1\n```\n\n### 输出样例\n\n```text\n2 1\n3 35243\n2 1184\n0 0\n0 0\n```\n",
      "judgeable": true,
      "testArchive": {
        "file": "QC6_20261121_hidden_tests.zip",
        "prefix": "QC6/P04",
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
        "2026112504",
        "4"
      ]
    },
    {
      "id": "1207",
      "letter": "SL-EX-5",
      "name": "SL-EX-5 瓶中时光",
      "difficulty": "普及+/提高-",
      "title": "SL-EX-5 瓶中时光",
      "score": 100,
      "tests": 11,
      "sampleInput": "3 6\n2\n2 5\n4 8\n2\n3 6\n1 2\n2\n3 7\n5 9",
      "sampleOutput": "14 6",
      "statement": "## SL-EX-5 瓶中时光（100分）\n\n### 海边旅梦\n\n旧日记忆封存在一组组瓶中，每组都只允许打开一瓶。挑选者拥有有限的携带容量，必须决定哪些记忆值得带走。\n\n### 题目描述\n\n有 G 组记忆瓶，第 g 组包含 $t_{g}$ 瓶。第 j 瓶具有正整数重量 w 和非负整数价值 v。每组至多选择一瓶，也可以整组不选；被选瓶子的总重量不得超过容量 C。第一目标是最大化总价值 V。在所有总价值达到 V 的方案中，第二目标是最小化被选物品的总重量 W。输出 V W。\n\n### 输入格式\n\n第一行输入 G C。随后依次输入 G 组：每组先输入整数 $t_{g}$，再输入 $t_{g}$ 行，每行 w v。\n\n### 输出格式\n\n输出两个整数 V W。\n\n### 数据范围与约定\n\n1≤G≤100，0≤C≤3000，1≤$t_{g}$，Σ$t_{g}$≤1500，1≤w≤C+3000，0≤v≤$10^{6}$。\n\n### 输入样例\n\n```text\n3 6\n2\n2 5\n4 8\n2\n3 6\n1 2\n2\n3 7\n5 9\n```\n\n### 输出样例\n\n```text\n14 6\n```\n",
      "judgeable": true,
      "testArchive": {
        "file": "QC6_20261121_hidden_tests.zip",
        "prefix": "QC6/P05",
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
        "2026112505",
        "5"
      ]
    },
    {
      "id": "1208",
      "letter": "SL-EX-6",
      "name": "SL-EX-6 棉花田野",
      "difficulty": "普及",
      "title": "SL-EX-6 棉花田野",
      "score": 100,
      "tests": 12,
      "sampleInput": "4 5\n11101\n11111\n11110\n01111",
      "sampleOutput": "3 2 1 1",
      "statement": "## SL-EX-6 棉花田野（100分）\n\n### 海边旅梦\n\n湖边的棉花田铺成整齐的方格，有些格子已经成熟，有些尚未成熟。为了布置一片完整的展示田，工作人员只接受全由成熟格子组成的正方形。\n\n### 题目描述\n\n给定 R 行 C 列的01网格，字符 1 表示棉花成熟，0 表示尚未成熟。你需要求出仅包含 1 的正方形子矩阵的最大边长 L，并统计边长恰为 L 的正方形子矩阵数量 cnt；若存在多个，输出左上角行号最小、再列号最小的那个正方形左上角坐标 x y。网格坐标从1开始。若没有任何成熟格子，输出 0 0 -1 -1。\n\n### 输入格式\n\n第一行输入 R C；随后 R 行各输入一个长度为 C 的01串。\n\n### 输出格式\n\n输出 L cnt x y。\n\n### 数据范围与约定\n\n1≤R,C≤2000，R×C≤4000000。\n\n### 输入样例\n\n```text\n4 5\n11101\n11111\n11110\n01111\n```\n\n### 输出样例\n\n```text\n3 2 1 1\n```\n",
      "judgeable": true,
      "testArchive": {
        "file": "QC6_20261121_hidden_tests.zip",
        "prefix": "QC6/P06",
        "count": 12,
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
          10,
          10,
          10,
          10
        ]
      },
      "legacyIds": [
        "2026112506",
        "6"
      ]
    },
    {
      "id": "1209",
      "letter": "SL-EX-7",
      "name": "SL-EX-7 离家五百里",
      "difficulty": "普及+/提高-",
      "title": "SL-EX-7 离家五百里",
      "score": 100,
      "tests": 13,
      "sampleInput": "4 5\n1 2 8\n2 4 4\n1 3 5\n3 4 7\n2 3 1",
      "sampleOutput": "8 1",
      "statement": "## SL-EX-7 离家五百里（100分）\n\n### 海边旅梦\n\n锡耶斯塔到外地城市的交通由单向道路连接。旅行团得到一张仅可使用一次的折价车票，可以在某一条道路上支付原路费的一半（向下取整），也可以不使用。\n\n### 题目描述\n\n有 N 座城市、M 条有向道路。第 i 条道路从 $u_{i}$ 通往 $v_{i}$，费用 $w_{i}$>0。出发城市为1，目的城市为N。旅行团最多可以使用一次折价票：选择经过的一条道路，将其费用由 w 变为 floor(w/2)。求到达N所需最小总费用 D；在所有费用为 D 的路线中，输出使用折价票次数最少的次数 k（0或1）。允许经过同一城市多次，但所有道路原费用为正整数。不可达则输出 -1 -1。\n\n### 输入格式\n\n第一行输入 N M。接下来 M 行各给出 u v w。允许平行边与自环。\n\n### 输出格式\n\n存在合法路线输出 D k；不存在输出 -1 -1。\n\n### 数据范围与约定\n\n1≤N≤200000，0≤M≤300000，1≤u,v≤N，1≤w≤$10^{9}$；答案使用64位整数。\n\n### 输入样例\n\n```text\n4 5\n1 2 8\n2 4 4\n1 3 5\n3 4 7\n2 3 1\n```\n\n### 输出样例\n\n```text\n8 1\n```\n",
      "judgeable": true,
      "testArchive": {
        "file": "QC6_20261121_hidden_tests.zip",
        "prefix": "QC6/P07",
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
        "2026112507",
        "7"
      ]
    },
    {
      "id": "1210",
      "letter": "SL-EX-8",
      "name": "SL-EX-8 常青树",
      "difficulty": "普及+/提高-",
      "title": "SL-EX-8 常青树",
      "score": 100,
      "tests": 13,
      "sampleInput": "4\n1 2 1 1\n1 2 2\n2 3 1\n2 4 3",
      "sampleOutput": "6 2",
      "statement": "## SL-EX-8 常青树（100分）\n\n### 海边旅梦\n\n火山脚下的常青树之间由步道相连，构成一棵树。每棵树附近住着数量不同的居民。要在其中一棵树旁设置信息站，使每位居民前往信息站所走的距离总和尽量小。\n\n### 题目描述\n\n给定 N 个节点、N-1 条无向边，保证形成一棵树。每个节点 i 住着 $p_{i}$ 人。每条边长度为正整数 d。若将信息站设在节点 x，需要付出的总行走距离为 F(x)=Σ $p_{i}$×dist(i,x)，其中 dist 是树上路径的边权和。求最小的 F(x) 以及达到最小值的节点编号中最小的编号。允许所有 $p_{i}$=0。\n\n### 输入格式\n\n第一行输入 N；第二行输入 N 个非负整数 $p_{i}$；接下来 N-1 行各给出 u v d。\n\n### 输出格式\n\n输出 best node。\n\n### 数据范围与约定\n\n1≤N≤200000，0≤$p_{i}$≤1000，1≤d≤1000，所有运算可放入有符号64位整数。\n\n### 输入样例\n\n```text\n4\n1 2 1 1\n1 2 2\n2 3 1\n2 4 3\n```\n\n### 输出样例\n\n```text\n6 2\n```\n",
      "judgeable": true,
      "testArchive": {
        "file": "QC6_20261121_hidden_tests.zip",
        "prefix": "QC6/P08",
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
        "2026112508",
        "8"
      ]
    }
  ],
  "startAt": "2026-11-23T15:00:00+08:00",
  "endAt": "2026-11-23T17:00:00+08:00",
  "scheduleVersion": "20261123-qc6-fixed-1123",
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
