(() => {
 const data = {
  "examVersion": "fzu-qc9-stability-20261129-v1",
  "revision": "第九次质量检测·2026-11-28·正式风格独立V1",
  "title": "福州大学2025级第九次质量检测",
  "type": "IOI",
  "rule": "IOI",
  "contestType": "IOI",
  "category": "mock",
  "selfScheduled": false,
  "date": "2026-11-28",
  "duration": 120,
  "totalScore": 800,
  "author": "转专业命题中心",
  "setter": {
    "label": "转专业命题中心"
  },
  "introduction": "2026年11月28日 · 非官方自主模拟考试\n\n考试时间120分钟，8道独立编程题，每题100分，满分800分。编译标准C++11。标准输入输出，按测试点独立计分，多次提交取最高分（以实际评测平台规则为准）。题号不代表难度。建议关闭参考资料，独立完成。每题建议时间限制2秒、内存限制256 MiB；最终以OMS判题配置为准。",
  "questions": [
    {
      "id": "20261129901",
      "letter": "P1",
      "name": "校验记录",
      "title": "校验记录",
      "score": 100,
      "tests": 8,
      "sampleInput": "4\n5 1 2?3\n2 0 1?\n7 3 ?\n10 0 1?",
      "sampleOutput": "05\nNONE\n3\nNONE",
      "statement": "### 题目描述\n\n某批数字记录使用如下校验规则：对于长度为 n 的数字串，令第 i 位数字为 d_i（位置从1开始），其校验值为 Σ(i×d_i) 对 m 取余的结果。\n每条记录恰好有一个字符丢失，以 `?` 表示。给定目标校验值 r，输出所有可能填入该位置的数字。允许数字串以0开头。\n\n### 输入格式\n\n第一行输入 T。接下来 T 行，每行输入 m r s，其中 s 为仅含数字和一个 `?` 的非空字符串。\n\n### 输出格式\n\n每条记录输出一行：将所有满足条件的数字按从小到大的顺序连成一个字符串（无空格）；若没有任何满足条件的数字，输出 `NONE`。\n\n### 数据范围与约定\n\n1≤T≤20000，2≤m≤97，0≤r<m，1≤|s|≤200000，所有字符串长度之和不超过200000。\n\n### 输入样例\n\n```text\n4\n5 1 2?3\n2 0 1?\n7 3 ?\n10 0 1?\n```\n\n### 输出样例\n\n```text\n05\nNONE\n3\nNONE\n```\n",
      "judgeable": true,
      "testArchive": {
        "file": "QC9_20261129_hidden_tests.zip",
        "prefix": "QC9/P01",
        "count": 8,
        "score": 0,
        "scores": [
          10,
          10,
          10,
          10,
          10,
          15,
          15,
          20
        ]
      },
      "difficulty": "普及-"
    },
    {
      "id": "20261129902",
      "letter": "P2",
      "name": "周期校准",
      "title": "周期校准",
      "score": 100,
      "tests": 10,
      "sampleInput": "5 10\n-3 9 21 33 45",
      "sampleOutput": "5 6",
      "statement": "### 题目描述\n\n有 n 台设备，其整数读数为 a_1,…,a_n。若存在某个整数 x，使得所有读数都可以表示为 x+k_i d（k_i 为任意整数），则称正整数 d 是这批设备的一个可用周期。现仅允许选择不超过 B 的周期。\n求可用周期的数量以及其中最大的周期。特别地，若所有读数相同，则每个 1 至 B 的整数都可用。\n\n### 输入格式\n\n第一行输入 n B。第二行输入 n 个整数 a_i。\n\n### 输出格式\n\n一行输出 cnt maxd，以一个空格隔开。\n\n### 数据范围与约定\n\n1≤n≤200000，1≤B≤10^9，−10^9≤a_i≤10^9。\n\n### 输入样例\n\n```text\n5 10\n-3 9 21 33 45\n```\n\n### 输出样例\n\n```text\n5 6\n```\n",
      "judgeable": true,
      "testArchive": {
        "file": "QC9_20261129_hidden_tests.zip",
        "prefix": "QC9/P02",
        "count": 10,
        "score": 0,
        "scores": [
          10,
          10,
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
      "difficulty": "普及"
    },
    {
      "id": "20261129903",
      "letter": "P3",
      "name": "文件归档",
      "title": "文件归档",
      "score": 100,
      "tests": 10,
      "sampleInput": "7\n/a//b/../c\n/a/c/.\n/../\n/a/c/\n/a/b\n/a/b/..\n///",
      "sampleOutput": "4\n3 /a/c",
      "statement": "### 题目描述\n\n系统收到 n 条绝对路径。路径以 `/` 开头，由斜杠和路径分量组成。连续多个斜杠视为一个分隔符；分量 `.` 表示保持当前目录，`..` 表示回到上一级目录（已经在根目录时保持不变）；其他分量表示进入该名称的子目录。路径中不区分文件与目录，全部按目录处理。\n将每条路径规范化为从根目录出发的最终绝对路径：根目录记为 `/`，其他路径只用单个斜杠分隔分量，末尾不加斜杠。\n统计不同规范路径的数量，并找出出现次数最多的一种规范路径；若有并列，选择按 ASCII 字符顺序字典序最小的路径。\n\n### 输入格式\n\n第一行输入 n。接下来 n 行，每行一个非空路径（不含空格）。\n\n### 输出格式\n\n第一行输出不同路径数量。第二行输出最高出现次数及对应路径，中间一个空格。\n\n### 数据范围与约定\n\n1≤n≤200000，路径长度总和≤400000。路径分量为 `.`、`..` 或只含小写英文字母和数字的非空字符串。\n\n### 输入样例\n\n```text\n7\n/a//b/../c\n/a/c/.\n/../\n/a/c/\n/a/b\n/a/b/..\n///\n```\n\n### 输出样例\n\n```text\n4\n3 /a/c\n```\n",
      "judgeable": true,
      "testArchive": {
        "file": "QC9_20261129_hidden_tests.zip",
        "prefix": "QC9/P03",
        "count": 10,
        "score": 0,
        "scores": [
          5,
          10,
          10,
          10,
          10,
          10,
          10,
          10,
          10,
          15
        ]
      },
      "difficulty": "普及"
    },
    {
      "id": "20261129904",
      "letter": "P4",
      "name": "通信链路",
      "title": "通信链路",
      "score": 100,
      "tests": 11,
      "sampleInput": "6 8 1 5\n1 2\n2 3\n3 2\n3 5\n1 4\n4 6\n6 4\n2 3",
      "sampleOutput": "4 5",
      "statement": "### 题目描述\n\n给定一个有向通信网络，有 n 个节点和 m 条有向链路，每条链路具有独立的编号，即使起点和终点相同也视为不同链路。\n消息从 s 发出，到 t 结束。合法传输过程是一条从 s 到 t 的有向游走：可经过同一个节点或同一条链路多次。若 s=t，允许不经过任何链路的零长度过程。\n一个节点或一条链路称为有效，当且仅当它出现在至少一种合法传输过程中（不要求所有有效对象同时出现在同一过程中）。求有效节点数量与有效链路数量。\n\n### 输入格式\n\n第一行输入 n m s t。接下来 m 行，每行输入 u v，表示一条 u 指向 v 的链路。\n\n### 输出格式\n\n一行输出有效节点数和有效链路数。若没有任何合法传输过程，则输出 `0 0`。\n\n### 数据范围与约定\n\n1≤n≤200000，0≤m≤300000，1≤s,t,u,v≤n；允许重边和自环。\n\n### 输入样例\n\n```text\n6 8 1 5\n1 2\n2 3\n3 2\n3 5\n1 4\n4 6\n6 4\n2 3\n```\n\n### 输出样例\n\n```text\n4 5\n```\n",
      "judgeable": true,
      "testArchive": {
        "file": "QC9_20261129_hidden_tests.zip",
        "prefix": "QC9/P04",
        "count": 11,
        "score": 0,
        "scores": [
          5,
          5,
          10,
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
      "difficulty": "普及+/提高-"
    },
    {
      "id": "20261129905",
      "letter": "P5",
      "name": "工位重新布置",
      "title": "工位重新布置",
      "score": 100,
      "tests": 11,
      "sampleInput": "9 4\n010010001\n1 7\n1 2\n5 7\n4 4",
      "sampleOutput": "5 4\n7 2\n6 5\n5 4",
      "statement": "### 题目描述\n\n一排 n 个工位中，恰有 k 个已安装设备，其余为空。用长度为 n 的01串表示初始状态，1 表示有设备，0 表示空位。一次操作可交换相邻两个工位的状态，代价为1。\n有 q 个相互独立的布置要求。每个要求给出允许的起始位置区间 [l,r]。你必须把全部 k 台设备集中在一个长度恰为 k 的连续区间 [x,x+k−1] 中，且 l≤x≤r；其他位置均为空。\n求完成该要求所需的最少操作次数，并输出所有最优起始位置中最小的 x。每次询问都从原始状态开始。\n\n### 输入格式\n\n第一行输入 n q。第二行输入长度为 n 的01串 s，保证至少一个1。接下来 q 行，每行输入 l r。\n\n### 输出格式\n\n每次询问输出一行 cost x。\n\n### 数据范围与约定\n\n1≤n,q≤200000；令 k 为 s 中1的数量，1≤l≤r≤n−k+1。操作次数使用64位整数。\n\n### 输入样例\n\n```text\n9 4\n010010001\n1 7\n1 2\n5 7\n4 4\n```\n\n### 输出样例\n\n```text\n5 4\n7 2\n6 5\n5 4\n```\n",
      "judgeable": true,
      "testArchive": {
        "file": "QC9_20261129_hidden_tests.zip",
        "prefix": "QC9/P05",
        "count": 11,
        "score": 0,
        "scores": [
          5,
          5,
          10,
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
      "difficulty": "普及+/提高-"
    },
    {
      "id": "20261129906",
      "letter": "P6",
      "name": "连续测量记录",
      "title": "连续测量记录",
      "score": 100,
      "tests": 11,
      "sampleInput": "6 2 4 3\n2 -2 3 1 -1 3",
      "sampleOutput": "6",
      "statement": "### 题目描述\n\n给出 n 次连续测量的整数结果 a_1,…,a_n。一个连续区间 [i,j] 合格，当且仅当区间长度在闭区间 [L,R] 中，并且区间元素之和是 m 的整数倍。负数和0同样遵循整数倍的定义。\n求合格区间的总数。不同端点的区间视为不同区间。\n\n### 输入格式\n\n第一行输入 n L R m。第二行输入 n 个整数 a_i。\n\n### 输出格式\n\n输出一个整数，表示合格区间总数。\n\n### 数据范围与约定\n\n1≤L≤R≤n≤200000，1≤m≤10^9，−10^9≤a_i≤10^9。答案使用64位整数。\n\n### 输入样例\n\n```text\n6 2 4 3\n2 -2 3 1 -1 3\n```\n\n### 输出样例\n\n```text\n6\n```\n",
      "judgeable": true,
      "testArchive": {
        "file": "QC9_20261129_hidden_tests.zip",
        "prefix": "QC9/P06",
        "count": 11,
        "score": 0,
        "scores": [
          5,
          10,
          10,
          10,
          5,
          10,
          10,
          10,
          10,
          10,
          10
        ]
      },
      "difficulty": "普及+/提高-"
    },
    {
      "id": "20261129907",
      "letter": "P7",
      "name": "二叉树核验",
      "title": "二叉树核验",
      "score": 100,
      "tests": 12,
      "sampleInput": "7\n2 3\n4 5\n0 6\n0 0\n0 0\n7 0\n0 0",
      "sampleOutput": "3 1",
      "statement": "### 题目描述\n\n某系统保存了 n 个编号为1至n的节点及每个节点的左、右孩子编号，0 表示对应孩子不存在。由于记录可能损坏，这些信息不一定构成一棵合法二叉树。\n合法二叉树须满足：恰有一个根节点，根没有父节点；其余每个节点恰在一个孩子位置出现；从根沿孩子指针可以访问全部节点，且不存在环。同一节点的左右孩子不能是同一个非零节点。\n若记录合法，定义空树高度为0，非空树高度为其左右子树高度的较大值加1。称一个节点的完整子树为平衡子树，当且仅当这棵子树内每个节点的左右子树高度之差的绝对值均不超过1。完整子树包含该节点和它的全部后代，不允许删去其中任何节点。\n在所有平衡子树中，找出包含节点数最多的子树大小，并统计达到该大小的不同子树数量。不同根节点视为不同子树。\n\n### 输入格式\n\n第一行输入 n。接下来 n 行，第 i 行输入 l_i r_i，表示编号 i 的左右孩子。\n\n### 输出格式\n\n记录非法时输出 `INVALID`。否则输出一行 `size count`，即最大平衡子树的节点数和数量。\n\n### 数据范围与约定\n\n1≤n≤200000，0≤l_i,r_i≤n。可能出现自环、环、重复父节点或不连通结构。\n\n### 输入样例\n\n```text\n7\n2 3\n4 5\n0 6\n0 0\n0 0\n7 0\n0 0\n```\n\n### 输出样例\n\n```text\n3 1\n```\n",
      "judgeable": true,
      "testArchive": {
        "file": "QC9_20261129_hidden_tests.zip",
        "prefix": "QC9/P07",
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
      "difficulty": "普及+/提高-"
    },
    {
      "id": "20261129908",
      "letter": "P8",
      "name": "联合编码",
      "title": "联合编码",
      "score": 100,
      "tests": 12,
      "sampleInput": "AB\nBA\n2 2 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1",
      "sampleOutput": "6 2",
      "statement": "### 题目描述\n\n两个部门分别提交非空大写字母串 A 和 B。现要生成一条大写字母串 C，使 A 和 B 都是 C 的子序列。子序列是从字符串中删除任意个字符（也允许不删），并保持其余字符相对顺序所得到的字符串。\n每个字母 X 有一个正整数编码费用 w_X。字符串 C 的费用为其中全部字符的费用之和，同一字母出现多次则重复计费。\n求所有满足要求的 C 的最小费用，并统计达到最小费用的不同字符串数量，对 1000000007 取模。仅当两个 C 作为字符串完全相同时才视为同一种方案；同一个 C 中不同的子序列匹配方式不另计数。\n\n### 输入格式\n\n第一行输入 A，第二行输入 B，第三行输入26个正整数，依次为 A 到 Z 的字母费用。\n\n### 输出格式\n\n一行输出最小费用和最优字符串数量（方案数取模）。\n\n### 数据范围与约定\n\n1≤|A|,|B|≤1500，1≤w_X≤10^6；最优费用使用64位整数。\n\n### 输入样例\n\n```text\nAB\nBA\n2 2 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1\n```\n\n### 输出样例\n\n```text\n6 2\n```\n",
      "judgeable": true,
      "testArchive": {
        "file": "QC9_20261129_hidden_tests.zip",
        "prefix": "QC9/P08",
        "count": 12,
        "score": 0,
        "scores": [
          5,
          5,
          5,
          10,
          10,
          10,
          10,
          10,
          10,
          5,
          10,
          10
        ]
      },
      "difficulty": "提高"
    }
  ],
  "startAt": "2026-11-28T15:00:00+08:00",
  "endAt": "2026-11-28T17:00:00+08:00",
  "scheduleVersion": "20261124-qc9-fixed-1128"
};
 const archive=window.OMS_EXAM_ARCHIVE||(window.OMS_EXAM_ARCHIVE=[]);
 const existing=archive.findIndex(e=>e.examVersion===data.examVersion);
 const others=[window.OMS_EXAM_DATA,...archive].filter(e=>e&&e.examVersion!==data.examVersion);
 const normalized=window.OMS_NUMBER_EXAM?window.OMS_NUMBER_EXAM(data,others,{newBatch:true}):data;
 if(existing>=0)archive[existing]=normalized;else archive.unshift(normalized);
})();
