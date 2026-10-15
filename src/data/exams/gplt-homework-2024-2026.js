(() => {
  // Non-official restated GPLT homework with self-generated practice cases.
  const data = [
  {
    "examVersion": "gplt-2024-l1-l2-homework",
    "title": "2024 年天梯赛 L1/L2 作业",
    "type": "IOI",
    "rule": "IOI",
    "category": "practice",
    "duration": 0,
    "totalScore": 200,
    "author": "天梯赛真题专题练习／公开题面重述",
    "introduction": "历年真题作业 · 天梯赛 L1/L2；8 道 L1＋4 道 L2，原分值 200 分，不限时。题面为非官方重述，每题 5 个自建测试点，不是 PTA 官方隐藏数据。部分题目采用包内勘误所述练习规则。",
    "questions": [
      {
        "id": "GPLT2024L1097",
        "letter": "L1-097",
        "name": "编程解决一切",
        "title": "编程解决一切",
        "score": 5,
        "tests": 5,
        "difficulty": "入门",
        "sampleInput": "",
        "sampleOutput": "Problem? The Solution: Programming.\n",
        "statement": "# L1-097 编程解决一切（5 分）\n\n> 【题面说明】这是一份基于公开题意整理的非逐字改写练习版。正式原版请访问 [PTA 官方练习集](https://pintia.cn/problem-sets/994805046380707840/exam/problems/type/7) 的 L1-097 对应练习题；[公开核对来源](https://www.cnblogs.com/MarisaMagic/p/18156303)。\n\n> 【练习版勘误】固定输出题没有输入；5 个评分文件内容相同，仅检查输出规范。\n\n## 题目描述\n\n无需读取任何数据，请输出题目指定的一句话。\n\n## 输入格式\n\n无。\n\n## 输出格式\n\n输出 `Problem? The Solution: Programming.`，独占一行。\n\n## 数据范围与保证\n\n无输入。\n\n## 输入样例（自建）\n\n```text\n（无输入）\n```\n\n## 输出样例（自建）\n\n```text\nProblem? The Solution: Programming.\n```\n\n## 作业评分\n\n本题 5 分，分为 5 个相互独立的评测文件，每点 1 分。练习数据不等同于 PTA 原站的隐藏测试。\n",
        "testArchive": {
          "file": "gplt-2024-2026-tests.zip",
          "prefix": "2024/L1-097",
          "count": 5,
          "score": 1
        },
        "originalId": "L1-097",
        "practiceNote": "固定输出题没有输入；5 个评分文件内容相同，仅检查输出规范。"
      },
      {
        "id": "GPLT2024L1098",
        "letter": "L1-098",
        "name": "再进去几个人",
        "title": "再进去几个人",
        "score": 5,
        "tests": 5,
        "difficulty": "入门",
        "sampleInput": "4 7\n",
        "sampleOutput": "3\n",
        "statement": "# L1-098 再进去几个人（5 分）\n\n> 【题面说明】这是一份基于公开题意整理的非逐字改写练习版。正式原版请访问 [PTA 官方练习集](https://pintia.cn/problem-sets/994805046380707840/exam/problems/type/7) 的 L1-098 对应练习题；[公开核对来源](https://www.cnblogs.com/MarisaMagic/p/18156303)。\n\n## 题目描述\n\n给定人数 A、B，计算差值 B-A。\n\n## 输入格式\n\n一行两个正整数 A、B，均不超过100，且 A<B。\n\n## 输出格式\n\n输出一个整数 B-A。\n\n## 数据范围与保证\n\n1≤A<B≤100。\n\n## 输入样例（自建）\n\n```text\n4 7\n```\n\n## 输出样例（自建）\n\n```text\n3\n```\n\n## 作业评分\n\n本题 5 分，分为 5 个相互独立的评测文件，每点 1 分。练习数据不等同于 PTA 原站的隐藏测试。\n",
        "testArchive": {
          "file": "gplt-2024-2026-tests.zip",
          "prefix": "2024/L1-098",
          "count": 5,
          "score": 1
        },
        "originalId": "L1-098"
      },
      {
        "id": "GPLT2024L1099",
        "letter": "L1-099",
        "name": "帮助色盲",
        "title": "帮助色盲",
        "score": 10,
        "tests": 5,
        "difficulty": "入门",
        "sampleInput": "0 0\n",
        "sampleOutput": "biii\nstop\n",
        "statement": "# L1-099 帮助色盲（10 分）\n\n> 【题面说明】这是一份基于公开题意整理的非逐字改写练习版。正式原版请访问 [PTA 官方练习集](https://pintia.cn/problem-sets/994805046380707840/exam/problems/type/7) 的 L1-099 对应练习题；[公开核对来源](https://www.cnblogs.com/MarisaMagic/p/18156303)。\n\n## 题目描述\n\n给定当前信号灯颜色及是否有同行行人，输出提示音和行走指令。有同行行人时不作声音提示；绿灯允许前进，其他灯停止。无行人时绿灯提示 dudu、红灯提示 biii、黄灯不提示。\n\n## 输入格式\n\n一行 A B：A=0/1/2 分别表示红/绿/黄，B=0/1 表示附近没有/有同行行人。\n\n## 输出格式\n\n两行：第一行为 `dudu`、`biii` 或 `-`；第二行为 `move` 或 `stop`。\n\n## 数据范围与保证\n\nA∈{0,1,2}, B∈{0,1}。\n\n## 输入样例（自建）\n\n```text\n0 0\n```\n\n## 输出样例（自建）\n\n```text\nbiii\nstop\n```\n\n## 作业评分\n\n本题 10 分，分为 5 个相互独立的评测文件，每点 2 分。练习数据不等同于 PTA 原站的隐藏测试。\n",
        "testArchive": {
          "file": "gplt-2024-2026-tests.zip",
          "prefix": "2024/L1-099",
          "count": 5,
          "score": 2
        },
        "originalId": "L1-099"
      },
      {
        "id": "GPLT2024L1100",
        "letter": "L1-100",
        "name": "四项全能",
        "title": "四项全能",
        "score": 10,
        "tests": 5,
        "difficulty": "普及-",
        "sampleInput": "50 4\n30 35 42 46\n",
        "sampleOutput": "3\n",
        "statement": "# L1-100 四项全能（10 分）\n\n> 【题面说明】这是一份基于公开题意整理的非逐字改写练习版。正式原版请访问 [PTA 官方练习集](https://pintia.cn/problem-sets/994805046380707840/exam/problems/type/7) 的 L1-100 对应练习题；[公开核对来源](https://www.cnblogs.com/MarisaMagic/p/18156303)。\n\n## 题目描述\n\n班级有 n 人，m 项技能，第 i 项技能有 k_i 人掌握。求无论掌握技能的人如何分配，至少有多少人掌握全部 m 项技能。\n\n## 输入格式\n\n第一行 n m；第二行 m 个掌握人数。\n\n## 输出格式\n\n一行一个最少可能人数。\n\n## 数据范围与保证\n\n4≤n≤1000, 2≤m≤n/2, 1≤k_i≤n。\n\n## 输入样例（自建）\n\n```text\n50 4\n30 35 42 46\n```\n\n## 输出样例（自建）\n\n```text\n3\n```\n\n## 作业评分\n\n本题 10 分，分为 5 个相互独立的评测文件，每点 2 分。练习数据不等同于 PTA 原站的隐藏测试。\n",
        "testArchive": {
          "file": "gplt-2024-2026-tests.zip",
          "prefix": "2024/L1-100",
          "count": 5,
          "score": 2
        },
        "originalId": "L1-100"
      },
      {
        "id": "GPLT2024L1101",
        "letter": "L1-101",
        "name": "别再来这么多猫娘了！",
        "title": "别再来这么多猫娘了！",
        "score": 15,
        "tests": 5,
        "difficulty": "普及",
        "sampleInput": "5\nMaoNiang\nSeQing\nBaoLi\nWeiGui\nBuHeShi\n4\nBianCheng MaoNiang ba! WeiGui De Hua Ye Keyi Shuo! BuYao BaoLi NeiRong.\n",
        "sampleOutput": "BianCheng <censored> ba! <censored> De Hua Ye Keyi Shuo! BuYao <censored> NeiRong.\n",
        "statement": "# L1-101 别再来这么多猫娘了！（15 分）\n\n> 【题面说明】这是一份基于公开题意整理的非逐字改写练习版。正式原版请访问 [PTA 官方练习集](https://pintia.cn/problem-sets/994805046380707840/exam/problems/type/7) 的 L1-101 对应练习题；[公开核对来源](https://www.cnblogs.com/MarisaMagic/p/18156303)。\n\n> 【练习版勘误】练习版按输入词序依次替换，已替换区段不再参与匹配；不同重述可能存在规则差异，请以本题面为准。\n\n## 题目描述\n\n给定一段文本和若干敏感词，按敏感词给定的顺序依次查找：同一个词从左到右依次处理不重叠出现，已处理位置不再参与后续匹配。若敏感词出现总次数达到阈值 k，输出总次数及警告；否则把匹配的位置替换为 `<censored>`。文本中的大小写、空格和标点均应保留。\n\n## 输入格式\n\n第一行 N；随后 N 行敏感词；再读非负整数 k；最后一整行原文。\n\n## 输出格式\n\n若计数≥k，先输出计数，再输出 `He Xie Ni Quan Jia!`；否则输出完成替换的文本。\n\n## 数据范围与保证\n\n1≤N≤100，每个敏感词长≤10，原文长度≤5000，0≤k≤100。\n\n## 输入样例（自建）\n\n```text\n5\nMaoNiang\nSeQing\nBaoLi\nWeiGui\nBuHeShi\n4\nBianCheng MaoNiang ba! WeiGui De Hua Ye Keyi Shuo! BuYao BaoLi NeiRong.\n```\n\n## 输出样例（自建）\n\n```text\nBianCheng <censored> ba! <censored> De Hua Ye Keyi Shuo! BuYao <censored> NeiRong.\n```\n\n## 作业评分\n\n本题 15 分，分为 5 个相互独立的评测文件，每点 3 分。练习数据不等同于 PTA 原站的隐藏测试。\n",
        "testArchive": {
          "file": "gplt-2024-2026-tests.zip",
          "prefix": "2024/L1-101",
          "count": 5,
          "score": 3
        },
        "originalId": "L1-101",
        "practiceNote": "练习版按输入词序依次替换，已替换区段不再参与匹配；不同重述可能存在规则差异，请以本题面为准。"
      },
      {
        "id": "GPLT2024L1102",
        "letter": "L1-102",
        "name": "兰州牛肉面",
        "title": "兰州牛肉面",
        "score": 15,
        "tests": 5,
        "difficulty": "入门",
        "sampleInput": "5\n140.62 98.55 16.00 31.11 54.31\n5 7\n1 2\n4 9\n4 6\n2 2\n5 10\n4 2\n5 5\n0 0\n",
        "sampleOutput": "2\n2\n0\n17\n22\n2202.03\n",
        "statement": "# L1-102 兰州牛肉面（15 分）\n\n> 【题面说明】这是一份基于公开题意整理的非逐字改写练习版。正式原版请访问 [PTA 官方练习集](https://pintia.cn/problem-sets/994805046380707840/exam/problems/type/7) 的 L1-102 对应练习题；[公开核对来源](https://www.cnblogs.com/MarisaMagic/p/18156303)。\n\n## 题目描述\n\n给定各种牛肉面的单价以及营业记录，统计每种面卖出的碗数以及总营业额。\n\n## 输入格式\n\n第一行种类数 N；第二行 N 个保留两位小数的价格；随后多行 `品种编号 碗数`，编号0作为结束。\n\n## 输出格式\n\n先逐行输出 N 类面销量，再单独一行输出总额，精确至小数点后两位。\n\n## 数据范围与保证\n\n1≤N≤100，价格0.01～200.00，结算总额≤1e6。\n\n## 输入样例（自建）\n\n```text\n5\n140.62 98.55 16.00 31.11 54.31\n5 7\n1 2\n4 9\n4 6\n2 2\n5 10\n4 2\n5 5\n0 0\n```\n\n## 输出样例（自建）\n\n```text\n2\n2\n0\n17\n22\n2202.03\n```\n\n## 作业评分\n\n本题 15 分，分为 5 个相互独立的评测文件，每点 3 分。练习数据不等同于 PTA 原站的隐藏测试。\n",
        "testArchive": {
          "file": "gplt-2024-2026-tests.zip",
          "prefix": "2024/L1-102",
          "count": 5,
          "score": 3
        },
        "originalId": "L1-102"
      },
      {
        "id": "GPLT2024L1103",
        "letter": "L1-103",
        "name": "整数的持续性",
        "title": "整数的持续性",
        "score": 20,
        "tests": 5,
        "difficulty": "普及-",
        "sampleInput": "500 700\n",
        "sampleOutput": "5\n679 688 697\n",
        "statement": "# L1-103 整数的持续性（20 分）\n\n> 【题面说明】这是一份基于公开题意整理的非逐字改写练习版。正式原版请访问 [PTA 官方练习集](https://pintia.cn/problem-sets/994805046380707840/exam/problems/type/7) 的 L1-103 对应练习题；[公开核对来源](https://www.cnblogs.com/MarisaMagic/p/18156303)。\n\n## 题目描述\n\n从正整数开始，将各个十进制位的数字相乘得到新数，反复操作直到个位数，所执行的次数称持续性。求闭区间内持续性的最大值及全部达到该值的数。\n\n## 输入格式\n\n一行两个整数 a b。\n\n## 输出格式\n\n第一行输出最大持续性；第二行按升序输出达到最大值的所有整数，单空格分隔。\n\n## 数据范围与保证\n\n1≤a≤b≤1e9 且 b-a<1000。\n\n## 输入样例（自建）\n\n```text\n500 700\n```\n\n## 输出样例（自建）\n\n```text\n5\n679 688 697\n```\n\n## 作业评分\n\n本题 20 分，分为 5 个相互独立的评测文件，每点 4 分。练习数据不等同于 PTA 原站的隐藏测试。\n",
        "testArchive": {
          "file": "gplt-2024-2026-tests.zip",
          "prefix": "2024/L1-103",
          "count": 5,
          "score": 4
        },
        "originalId": "L1-103"
      },
      {
        "id": "GPLT2024L1104",
        "letter": "L1-104",
        "name": "九宫格",
        "title": "九宫格",
        "score": 20,
        "tests": 5,
        "difficulty": "普及-",
        "sampleInput": "1\n5 1 9 2 8 3 4 6 7\n7 2 8 9 6 4 3 5 1\n3 4 6 5 7 1 9 2 8\n8 9 2 1 4 5 7 3 6\n4 7 3 6 2 8 1 9 5\n6 5 1 7 3 9 2 8 4\n9 3 4 8 1 6 5 7 2\n1 6 7 3 5 2 8 4 9\n2 8 5 4 9 7 6 1 3\n",
        "sampleOutput": "1\n",
        "statement": "# L1-104 九宫格（20 分）\n\n> 【题面说明】这是一份基于公开题意整理的非逐字改写练习版。正式原版请访问 [PTA 官方练习集](https://pintia.cn/problem-sets/994805046380707840/exam/problems/type/7) 的 L1-104 对应练习题；[公开核对来源](https://www.cnblogs.com/MarisaMagic/p/18156303)。\n\n## 题目描述\n\n对若干已填写的 9×9 数独棋盘判断是否合法：每行、每列、每个 3×3 宫内必须恰有1～9各一个。\n\n## 输入格式\n\n第一行 n；随后 n 个棋盘，每个9行、每行9个整数。\n\n## 输出格式\n\n每个棋盘输出一行 `1` 表示合法或 `0` 表示非法。\n\n## 数据范围与保证\n\n1≤n≤10；棋盘输入允许超出1～9的数，出现则视为不合法。\n\n## 输入样例（自建）\n\n```text\n1\n5 1 9 2 8 3 4 6 7\n7 2 8 9 6 4 3 5 1\n3 4 6 5 7 1 9 2 8\n8 9 2 1 4 5 7 3 6\n4 7 3 6 2 8 1 9 5\n6 5 1 7 3 9 2 8 4\n9 3 4 8 1 6 5 7 2\n1 6 7 3 5 2 8 4 9\n2 8 5 4 9 7 6 1 3\n```\n\n## 输出样例（自建）\n\n```text\n1\n```\n\n## 作业评分\n\n本题 20 分，分为 5 个相互独立的评测文件，每点 4 分。练习数据不等同于 PTA 原站的隐藏测试。\n",
        "testArchive": {
          "file": "gplt-2024-2026-tests.zip",
          "prefix": "2024/L1-104",
          "count": 5,
          "score": 4
        },
        "originalId": "L1-104"
      },
      {
        "id": "GPLT2024L2049",
        "letter": "L2-049",
        "name": "鱼与熊掌",
        "title": "鱼与熊掌",
        "score": 25,
        "tests": 5,
        "difficulty": "普及",
        "sampleInput": "4 8\n5 1 2 4 5 8\n5 1 2 3 5 8\n1 6\n1 4\n3\n1 8\n3 7\n2 4\n",
        "sampleOutput": "2\n0\n1\n",
        "statement": "# L2-049 鱼与熊掌（25 分）\n\n> 【题面说明】这是一份基于公开题意整理的非逐字改写练习版。正式原版请访问 [PTA 官方练习集](https://pintia.cn/problem-sets/994805046380707840/exam/problems/type/7) 的 L2-049 对应练习题；[公开核对来源](https://www.cnblogs.com/MarisaMagic/p/18156303)。\n\n## 题目描述\n\n给定每个人拥有的物品种类。对于每组查询，求同时拥有两种指定物品的人数。\n\n## 输入格式\n\n第一行 n m；接下来 n 行，第 i 行 `k 种类1 ... 种类k`；再给 Q 和 Q 行两个物品编号。\n\n## 输出格式\n\n按查询顺序输出各查询的共同持有人数。\n\n## 数据范围与保证\n\nn,m≤100000，m≥2，每人至多1000种且不重复，Q≤100。\n\n## 输入样例（自建）\n\n```text\n4 8\n5 1 2 4 5 8\n5 1 2 3 5 8\n1 6\n1 4\n3\n1 8\n3 7\n2 4\n```\n\n## 输出样例（自建）\n\n```text\n2\n0\n1\n```\n\n## 作业评分\n\n本题 25 分，分为 5 个相互独立的评测文件，每点 5 分。练习数据不等同于 PTA 原站的隐藏测试。\n",
        "testArchive": {
          "file": "gplt-2024-2026-tests.zip",
          "prefix": "2024/L2-049",
          "count": 5,
          "score": 5
        },
        "originalId": "L2-049"
      },
      {
        "id": "GPLT2024L2050",
        "letter": "L2-050",
        "name": "懂蛇语",
        "title": "懂蛇语",
        "score": 25,
        "tests": 5,
        "difficulty": "普及",
        "sampleInput": "8\nyong yuan de shen\nde chong huo shen\nshe bu wei xin de\nbu shen\nshen de she jing\nbai dian yuan\nliang she sha liang shen\nyong yuan de shen\n7\nde chong huo shen\ndian jing chong chong dong\nyao dong\nshen de she jing\nchong dian\nwei jing dong liang jing\nbu shen\n",
        "sampleOutput": "de chong huo shen\ndian jing chong chong dong\nyao dong\nshen de she jing\nchong dian\nwei jing dong liang jing\nbu shen\n",
        "statement": "# L2-050 懂蛇语（25 分）\n\n> 【题面说明】这是一份基于公开题意整理的非逐字改写练习版。正式原版请访问 [PTA 官方练习集](https://pintia.cn/problem-sets/994805046380707840/exam/problems/type/7) 的 L2-050 对应练习题；[公开核对来源](https://www.cnblogs.com/MarisaMagic/p/18156303)。\n\n## 题目描述\n\n把一句拼音句子各词的首字母连成一个缩写。对于每句查询，找到词典中缩写相同的所有句子；多个答案按字典序输出，用竖线分隔；找不到时原样输出查询。\n\n## 输入格式\n\n先输入词典大小 N，再输入 N 行拼音句子；然后输入查询数 M，随后 M 行查询句子。句子可能含连续空格。\n\n## 输出格式\n\n每条查询输出一行。所有候选句子之间用 `|` 分隔，并保留每个句子的原有空格。\n\n## 数据范围与保证\n\nN≤1e5，M≤1000，句子长度≤50，每个拼音词长度≤6。\n\n## 输入样例（自建）\n\n```text\n8\nyong yuan de shen\nde chong huo shen\nshe bu wei xin de\nbu shen\nshen de she jing\nbai dian yuan\nliang she sha liang shen\nyong yuan de shen\n7\nde chong huo shen\ndian jing chong chong dong\nyao dong\nshen de she jing\nchong dian\nwei jing dong liang jing\nbu shen\n```\n\n## 输出样例（自建）\n\n```text\nde chong huo shen\ndian jing chong chong dong\nyao dong\nshen de she jing\nchong dian\nwei jing dong liang jing\nbu shen\n```\n\n## 作业评分\n\n本题 25 分，分为 5 个相互独立的评测文件，每点 5 分。练习数据不等同于 PTA 原站的隐藏测试。\n",
        "testArchive": {
          "file": "gplt-2024-2026-tests.zip",
          "prefix": "2024/L2-050",
          "count": 5,
          "score": 5
        },
        "originalId": "L2-050"
      },
      {
        "id": "GPLT2024L2051",
        "letter": "L2-051",
        "name": "满树的遍历",
        "title": "满树的遍历",
        "score": 25,
        "tests": 5,
        "difficulty": "普及",
        "sampleInput": "1\n0\n",
        "sampleOutput": "0 yes\n1\n",
        "statement": "# L2-051 满树的遍历（25 分）\n\n> 【题面说明】这是一份基于公开题意整理的非逐字改写练习版。正式原版请访问 [PTA 官方练习集](https://pintia.cn/problem-sets/994805046380707840/exam/problems/type/7) 的 L2-051 对应练习题；[公开核对来源](https://www.cnblogs.com/MarisaMagic/p/18156303)。\n\n## 题目描述\n\n输入一棵有根多叉树。树的度是所有节点孩子数的最大值 k。若每个非叶节点恰有 k 个孩子则为 k 阶满树。输出度、是否为满树和先序访问序列；孩子按编号升序访问。\n\n## 输入格式\n\n第一行节点数 n；接下来 n 行，第 i 行是节点 i 的父节点编号，根的父节点为0。\n\n## 输出格式\n\n第一行 `k yes` 或 `k no`；第二行按先序输出节点编号。\n\n## 数据范围与保证\n\n1≤n≤100000，输入保证合法、唯一根。\n\n## 输入样例（自建）\n\n```text\n1\n0\n```\n\n## 输出样例（自建）\n\n```text\n0 yes\n1\n```\n\n## 作业评分\n\n本题 25 分，分为 5 个相互独立的评测文件，每点 5 分。练习数据不等同于 PTA 原站的隐藏测试。\n",
        "testArchive": {
          "file": "gplt-2024-2026-tests.zip",
          "prefix": "2024/L2-051",
          "count": 5,
          "score": 5
        },
        "originalId": "L2-051"
      },
      {
        "id": "GPLT2024L2052",
        "letter": "L2-052",
        "name": "吉利矩阵",
        "title": "吉利矩阵",
        "score": 25,
        "tests": 5,
        "difficulty": "普及+/提高-",
        "sampleInput": "7 3\n",
        "sampleOutput": "666\n",
        "statement": "# L2-052 吉利矩阵（25 分）\n\n> 【题面说明】这是一份基于公开题意整理的非逐字改写练习版。正式原版请访问 [PTA 官方练习集](https://pintia.cn/problem-sets/994805046380707840/exam/problems/type/7) 的 L2-052 对应练习题；[公开核对来源](https://www.cnblogs.com/MarisaMagic/p/18156303)。\n\n## 题目描述\n\n求所有 N×N 非负整数矩阵的数量，要求每一行及每一列的元素和都恰好等于 L。\n\n## 输入格式\n\n一行 L N。\n\n## 输出格式\n\n输出符合条件的矩阵总数。\n\n## 数据范围与保证\n\n2≤L≤9,2≤N≤4。\n\n## 输入样例（自建）\n\n```text\n7 3\n```\n\n## 输出样例（自建）\n\n```text\n666\n```\n\n## 作业评分\n\n本题 25 分，分为 5 个相互独立的评测文件，每点 5 分。练习数据不等同于 PTA 原站的隐藏测试。\n",
        "testArchive": {
          "file": "gplt-2024-2026-tests.zip",
          "prefix": "2024/L2-052",
          "count": 5,
          "score": 5
        },
        "originalId": "L2-052"
      }
    ],
    "homeworkGroup": "gplt",
    "practiceYear": 2024,
    "registered": 0
  },
  {
    "examVersion": "gplt-2025-l1-l2-homework",
    "title": "2025 年天梯赛 L1/L2 作业",
    "type": "IOI",
    "rule": "IOI",
    "category": "practice",
    "duration": 0,
    "totalScore": 200,
    "author": "天梯赛真题专题练习／公开题面重述",
    "introduction": "历年真题作业 · 天梯赛 L1/L2；8 道 L1＋4 道 L2，原分值 200 分，不限时。题面为非官方重述，每题 5 个自建测试点，不是 PTA 官方隐藏数据。部分题目采用包内勘误所述练习规则。",
    "questions": [
      {
        "id": "GPLT2025L1105",
        "letter": "L1-105",
        "name": "珍惜生命",
        "title": "珍惜生命",
        "score": 5,
        "tests": 5,
        "difficulty": "入门",
        "sampleInput": "",
        "sampleOutput": "Always code as if the guy who ends up maintaining your code will be a violent psychopath who knows where you live.\n",
        "statement": "# L1-105 珍惜生命（5 分）\n\n> 【题面说明】这是一份基于公开题意整理的非逐字改写练习版。正式原版请访问 [PTA 官方练习集](https://pintia.cn/problem-sets/994805046380707840/exam/problems/type/7) 的 L1-105 对应练习题；[公开核对来源](https://zeeklog.com/2025tuan-ti-cheng-xu-she-ji-tian-ti-sai-l1-l2ti-jie-c-3)。\n\n> 【练习版勘误】固定输出题没有输入；5 个评分文件内容相同，仅检查输出规范。\n\n## 题目描述\n\n无需输入，输出指定的英语格言。\n\n## 输入格式\n\n无。\n\n## 输出格式\n\n输出 `Always code as if the guy who ends up maintaining your code will be a violent psychopath who knows where you live.`\n\n## 数据范围与保证\n\n无输入。\n\n## 输入样例（自建）\n\n```text\n（无输入）\n```\n\n## 输出样例（自建）\n\n```text\nAlways code as if the guy who ends up maintaining your code will be a violent psychopath who knows where you live.\n```\n\n## 作业评分\n\n本题 5 分，分为 5 个相互独立的评测文件，每点 1 分。练习数据不等同于 PTA 原站的隐藏测试。\n",
        "testArchive": {
          "file": "gplt-2024-2026-tests.zip",
          "prefix": "2025/L1-105",
          "count": 5,
          "score": 1
        },
        "originalId": "L1-105",
        "practiceNote": "固定输出题没有输入；5 个评分文件内容相同，仅检查输出规范。"
      },
      {
        "id": "GPLT2025L1106",
        "letter": "L1-106",
        "name": "偷感好重",
        "title": "偷感好重",
        "score": 5,
        "tests": 5,
        "difficulty": "入门",
        "sampleInput": "87 37 14\n",
        "sampleOutput": "138\n",
        "statement": "# L1-106 偷感好重（5 分）\n\n> 【题面说明】这是一份基于公开题意整理的非逐字改写练习版。正式原版请访问 [PTA 官方练习集](https://pintia.cn/problem-sets/994805046380707840/exam/problems/type/7) 的 L1-106 对应练习题；[公开核对来源](https://zeeklog.com/2025tuan-ti-cheng-xu-she-ji-tian-ti-sai-l1-l2ti-jie-c-3)。\n\n## 题目描述\n\n给出熊猫嘴里、右手和左手拥有的苹果块数，计算总数。\n\n## 输入格式\n\n一行三个正整数。\n\n## 输出格式\n\n输出三个整数之和。\n\n## 数据范围与保证\n\n三个数均≤100。\n\n## 输入样例（自建）\n\n```text\n87 37 14\n```\n\n## 输出样例（自建）\n\n```text\n138\n```\n\n## 作业评分\n\n本题 5 分，分为 5 个相互独立的评测文件，每点 1 分。练习数据不等同于 PTA 原站的隐藏测试。\n",
        "testArchive": {
          "file": "gplt-2024-2026-tests.zip",
          "prefix": "2025/L1-106",
          "count": 5,
          "score": 1
        },
        "originalId": "L1-106"
      },
      {
        "id": "GPLT2025L1107",
        "letter": "L1-107",
        "name": "高温补贴",
        "title": "高温补贴",
        "score": 10,
        "tests": 5,
        "difficulty": "入门",
        "sampleInput": "36 1 33\n",
        "sampleOutput": "Bu Tie\n36\n",
        "statement": "# L1-107 高温补贴（10 分）\n\n> 【题面说明】这是一份基于公开题意整理的非逐字改写练习版。正式原版请访问 [PTA 官方练习集](https://pintia.cn/problem-sets/994805046380707840/exam/problems/type/7) 的 L1-107 对应练习题；[公开核对来源](https://zeeklog.com/2025tuan-ti-cheng-xu-she-ji-tian-ti-sai-l1-l2ti-jie-c-3)。\n\n## 题目描述\n\n根据最高气温 T、工作场所是否露天 S、实际场所温度 t 判断补贴情况。只有 T>35 且 t≥33 时满足温度条件；符合温度条件且 S=1 输出 Bu Tie，不露天则 Shi Nei；不符合温度条件且露天输出 Bu Re，不露天输出 Shu Shi。\n\n## 输入格式\n\n一行 T S t。\n\n## 输出格式\n\n输出两行：第一行为状态 `Bu Tie` / `Shi Nei` / `Bu Re` / `Shu Shi`，第二行当温度条件满足时输出 T，否则输出 t。\n\n## 数据范围与保证\n\nT,t∈[-40,50],S∈{0,1}。\n\n## 输入样例（自建）\n\n```text\n36 1 33\n```\n\n## 输出样例（自建）\n\n```text\nBu Tie\n36\n```\n\n## 作业评分\n\n本题 10 分，分为 5 个相互独立的评测文件，每点 2 分。练习数据不等同于 PTA 原站的隐藏测试。\n",
        "testArchive": {
          "file": "gplt-2024-2026-tests.zip",
          "prefix": "2025/L1-107",
          "count": 5,
          "score": 2
        },
        "originalId": "L1-107"
      },
      {
        "id": "GPLT2025L1108",
        "letter": "L1-108",
        "name": "零头就抹了吧",
        "title": "零头就抹了吧",
        "score": 10,
        "tests": 5,
        "difficulty": "入门",
        "sampleInput": "258\n",
        "sampleOutput": "256\n",
        "statement": "# L1-108 零头就抹了吧（10 分）\n\n> 【题面说明】这是一份基于公开题意整理的非逐字改写练习版。正式原版请访问 [PTA 官方练习集](https://pintia.cn/problem-sets/994805046380707840/exam/problems/type/7) 的 L1-108 对应练习题；[公开核对来源](https://zeeklog.com/2025tuan-ti-cheng-xu-she-ji-tian-ti-sai-l1-l2ti-jie-c-3)。\n\n## 题目描述\n\n给定应付款 N，老板取不超过 N 的最大 2 的整数次幂作为实际收款额。\n\n## 输入格式\n\n一行整数 N。\n\n## 输出格式\n\n输出不超过 N 的最大 2 的幂。\n\n## 数据范围与保证\n\n1≤N≤1e9。\n\n## 输入样例（自建）\n\n```text\n258\n```\n\n## 输出样例（自建）\n\n```text\n256\n```\n\n## 作业评分\n\n本题 10 分，分为 5 个相互独立的评测文件，每点 2 分。练习数据不等同于 PTA 原站的隐藏测试。\n",
        "testArchive": {
          "file": "gplt-2024-2026-tests.zip",
          "prefix": "2025/L1-108",
          "count": 5,
          "score": 2
        },
        "originalId": "L1-108"
      },
      {
        "id": "GPLT2025L1109",
        "letter": "L1-109",
        "name": "这是字符串题",
        "title": "这是字符串题",
        "score": 15,
        "tests": 5,
        "difficulty": "入门",
        "sampleInput": "hstpw\n-94 -55 6 -89 -8 -9 37 96 75 9 12 76 -65 -74 71 -43 88 -80 24 84 -15 61 -95 -82 35 61\n",
        "sampleOutput": "0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 1 0 0 1 1 0 0 1 0 0 0\n66\n",
        "statement": "# L1-109 这是字符串题（15 分）\n\n> 【题面说明】这是一份基于公开题意整理的非逐字改写练习版。正式原版请访问 [PTA 官方练习集](https://pintia.cn/problem-sets/994805046380707840/exam/problems/type/7) 的 L1-109 对应练习题；[公开核对来源](https://zeeklog.com/2025tuan-ti-cheng-xu-she-ji-tian-ti-sai-l1-l2ti-jie-c-3)。\n\n## 题目描述\n\n给定一个小写字母串和26个字母的权值，统计各个字母出现次数和字符串字符权值之和。\n\n## 输入格式\n\n第一行小写字符串 S；第二行26个整数，依次为 a～z 的权值。\n\n## 输出格式\n\n第一行26个出现次数，第二行总权值。\n\n## 数据范围与保证\n\n1≤|S|≤1000，权值绝对值≤100。\n\n## 输入样例（自建）\n\n```text\nhstpw\n-94 -55 6 -89 -8 -9 37 96 75 9 12 76 -65 -74 71 -43 88 -80 24 84 -15 61 -95 -82 35 61\n```\n\n## 输出样例（自建）\n\n```text\n0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 1 0 0 1 1 0 0 1 0 0 0\n66\n```\n\n## 作业评分\n\n本题 15 分，分为 5 个相互独立的评测文件，每点 3 分。练习数据不等同于 PTA 原站的隐藏测试。\n",
        "testArchive": {
          "file": "gplt-2024-2026-tests.zip",
          "prefix": "2025/L1-109",
          "count": 5,
          "score": 3
        },
        "originalId": "L1-109"
      },
      {
        "id": "GPLT2025L1110",
        "letter": "L1-110",
        "name": "这不是字符串题",
        "title": "这不是字符串题",
        "score": 15,
        "tests": 5,
        "difficulty": "普及",
        "sampleInput": "5 5\n14 1 20 19 2\n1\n3 11 26 9\n1 9\n1\n2 1 20\n1 15\n2\n1\n3 15 17 19\n1 8\n1\n1 14\n4 23 19 18 6\n",
        "sampleOutput": "23 19 18 6 8 2\n",
        "statement": "# L1-110 这不是字符串题（15 分）\n\n> 【题面说明】这是一份基于公开题意整理的非逐字改写练习版。正式原版请访问 [PTA 官方练习集](https://pintia.cn/problem-sets/994805046380707840/exam/problems/type/7) 的 L1-110 对应练习题；[公开核对来源](https://zeeklog.com/2025tuan-ti-cheng-xu-she-ji-tian-ti-sai-l1-l2ti-jie-c-3)。\n\n## 题目描述\n\n维护一列1～26的正整数，并顺次进行三类操作：1 查询第一次出现的连续模式串并用新的连续序列替换；2 对当前相邻两元素之和为偶数的相邻对插入平均数（本次新插入的数不参与本次判断）；3 将给定闭区间反转。\n\n## 输入格式\n\n输入 N M，接着 N 个初始数；每项操作先给类型：类型1另给模式长度及模式、替换长度及替换序列；类型2无更多参数；类型3给 l r（从1开始）。\n\n## 输出格式\n\n最终输出整个正整数序列，空格分隔。\n\n## 数据范围与保证\n\n1≤N,M≤1000，序列长度处理过程始终不超过100N，原值1～26。\n\n## 输入样例（自建）\n\n```text\n5 5\n14 1 20 19 2\n1\n3 11 26 9\n1 9\n1\n2 1 20\n1 15\n2\n1\n3 15 17 19\n1 8\n1\n1 14\n4 23 19 18 6\n```\n\n## 输出样例（自建）\n\n```text\n23 19 18 6 8 2\n```\n\n## 作业评分\n\n本题 15 分，分为 5 个相互独立的评测文件，每点 3 分。练习数据不等同于 PTA 原站的隐藏测试。\n",
        "testArchive": {
          "file": "gplt-2024-2026-tests.zip",
          "prefix": "2025/L1-110",
          "count": 5,
          "score": 3
        },
        "originalId": "L1-110"
      },
      {
        "id": "GPLT2025L1111",
        "letter": "L1-111",
        "name": "大幂数",
        "title": "大幂数",
        "score": 20,
        "tests": 5,
        "difficulty": "普及",
        "sampleInput": "91\n",
        "sampleOutput": "1^2+2^2+3^2+4^2+5^2+6^2\n",
        "statement": "# L1-111 大幂数（20 分）\n\n> 【题面说明】这是一份基于公开题意整理的非逐字改写练习版。正式原版请访问 [PTA 官方练习集](https://pintia.cn/problem-sets/994805046380707840/exam/problems/type/7) 的 L1-111 对应练习题；[公开核对来源](https://zeeklog.com/2025tuan-ti-cheng-xu-she-ji-tian-ti-sai-l1-l2ti-jie-c-3)。\n\n## 题目描述\n\n若给定 n 可以写成从 1 到 m 的正整数的同一正指数 k 次幂之和，称之为大幂数。求所有表示中 k 最大的一种，输出对应表达式；若不存在输出指定的无解语句。\n\n## 输入格式\n\n一行整数 n。\n\n## 输出格式\n\n有解输出 `1^k+2^k+...+m^k`（不包含省略号，实际逐项输出），否则 `Impossible for n.`\n\n## 数据范围与保证\n\n2<n<2^31，要求至少有两项相加。\n\n## 输入样例（自建）\n\n```text\n91\n```\n\n## 输出样例（自建）\n\n```text\n1^2+2^2+3^2+4^2+5^2+6^2\n```\n\n## 作业评分\n\n本题 20 分，分为 5 个相互独立的评测文件，每点 4 分。练习数据不等同于 PTA 原站的隐藏测试。\n",
        "testArchive": {
          "file": "gplt-2024-2026-tests.zip",
          "prefix": "2025/L1-111",
          "count": 5,
          "score": 4
        },
        "originalId": "L1-111"
      },
      {
        "id": "GPLT2025L1112",
        "letter": "L1-112",
        "name": "现代战争",
        "title": "现代战争",
        "score": 20,
        "tests": 5,
        "difficulty": "普及",
        "sampleInput": "4 5 2\n410178603 867342445 -720344086 578180308 -898421277\n111451156 -765280277 -557423748 860691849 -27138512\n-62078309 939475206 -186418378 863880709 80695946\n-1008769240 -1033342327 -394626454 793786945 900849642\n",
        "sampleOutput": "410178603 -720344086 578180308\n111451156 -557423748 860691849\n",
        "statement": "# L1-112 现代战争（20 分）\n\n> 【题面说明】这是一份基于公开题意整理的非逐字改写练习版。正式原版请访问 [PTA 官方练习集](https://pintia.cn/problem-sets/994805046380707840/exam/problems/type/7) 的 L1-112 对应练习题；[公开核对来源](https://zeeklog.com/2025tuan-ti-cheng-xu-she-ji-tian-ti-sai-l1-l2ti-jie-c-3)。\n\n## 题目描述\n\n给定各元素互不相同的 n×m 矩阵，重复 k 次：找到剩余部分数值最大的位置，将其所在行和列整体删除，保留其他元素的相对顺序。输出操作后的矩阵。\n\n## 输入格式\n\n第一行 n m k；接下来 n 行每行 m 个整数。\n\n## 输出格式\n\n逐行输出最终剩余矩阵，同行空格分隔。\n\n## 数据范围与保证\n\n2≤n,m≤1000，0≤k<min(n,m)，数值位于[-2^30,2^30]且互不相同。\n\n## 输入样例（自建）\n\n```text\n4 5 2\n410178603 867342445 -720344086 578180308 -898421277\n111451156 -765280277 -557423748 860691849 -27138512\n-62078309 939475206 -186418378 863880709 80695946\n-1008769240 -1033342327 -394626454 793786945 900849642\n```\n\n## 输出样例（自建）\n\n```text\n410178603 -720344086 578180308\n111451156 -557423748 860691849\n```\n\n## 作业评分\n\n本题 20 分，分为 5 个相互独立的评测文件，每点 4 分。练习数据不等同于 PTA 原站的隐藏测试。\n",
        "testArchive": {
          "file": "gplt-2024-2026-tests.zip",
          "prefix": "2025/L1-112",
          "count": 5,
          "score": 4
        },
        "originalId": "L1-112"
      },
      {
        "id": "GPLT2025L2053",
        "letter": "L2-053",
        "name": "算式拆解",
        "title": "算式拆解",
        "score": 25,
        "tests": 5,
        "difficulty": "普及",
        "sampleInput": "(((2+3)*4)-(5/(6*7)))\n",
        "sampleOutput": "2+3\n*4\n6*7\n5/\n-\n",
        "statement": "# L2-053 算式拆解（25 分）\n\n> 【题面说明】这是一份基于公开题意整理的非逐字改写练习版。正式原版请访问 [PTA 官方练习集](https://pintia.cn/problem-sets/994805046380707840/exam/problems/type/7) 的 L2-053 对应练习题；[公开核对来源](https://zeeklog.com/2025tuan-ti-cheng-xu-she-ji-tian-ti-sai-l1-l2ti-jie-c-3)。\n\n> 【练习版勘误】符号输出由原始表达式树解析；练习版操作数为非负十进制整数。\n\n## 题目描述\n\n算式仅包含非负十进制整数以及加减乘除，每个二元运算都由一对圆括号括住。按运算的实际先后顺序（子表达式先于外层）逐行输出操作的符号与**尚未计算的原始数字操作数**；来自子表达式的操作数不再次输出。\n\n## 输入格式\n\n一行全括号二元算式，不含空格。\n\n## 输出格式\n\n每一个二元运算输出一行，按从左到右的后序执行顺序，只保留该操作的原始数字操作数与运算符。\n\n## 数据范围与保证\n\n表达式长度≤100，保证语法正确。\n\n## 输入样例（自建）\n\n```text\n(((2+3)*4)-(5/(6*7)))\n```\n\n## 输出样例（自建）\n\n```text\n2+3\n*4\n6*7\n5/\n-\n```\n\n## 作业评分\n\n本题 25 分，分为 5 个相互独立的评测文件，每点 5 分。练习数据不等同于 PTA 原站的隐藏测试。\n",
        "testArchive": {
          "file": "gplt-2024-2026-tests.zip",
          "prefix": "2025/L2-053",
          "count": 5,
          "score": 5
        },
        "originalId": "L2-053",
        "practiceNote": "符号输出由原始表达式树解析；练习版操作数为非负十进制整数。"
      },
      {
        "id": "GPLT2025L2054",
        "letter": "L2-054",
        "name": "三点共线",
        "title": "三点共线",
        "score": 25,
        "tests": 5,
        "difficulty": "普及+/提高-",
        "sampleInput": "3\n0 0\n1 1\n2 2\n",
        "sampleOutput": "[0, 0] [1, 1] [2, 2]\n",
        "statement": "# L2-054 三点共线（25 分）\n\n> 【题面说明】这是一份基于公开题意整理的非逐字改写练习版。正式原版请访问 [PTA 官方练习集](https://pintia.cn/problem-sets/994805046380707840/exam/problems/type/7) 的 L2-054 对应练习题；[公开核对来源](https://zeeklog.com/2025tuan-ti-cheng-xu-she-ji-tian-ti-sai-l1-l2ti-jie-c-3)。\n\n## 题目描述\n\n平面中有若干整数坐标点，纵坐标只能为0、1、2。求全部位于一条非水平直线上的三点组合，每条解恰有一个 y=0、y=1、y=2 的点。去重后按 y=1 的 x 升序、再按 y=0 的 x 升序排列。\n\n## 输入格式\n\n第一行 n；随后 n 行两个整数 x y。\n\n## 输出格式\n\n无解输出 -1；否则每行输出 `[x0, 0] [x1, 1] [x2, 2]`。\n\n## 数据范围与保证\n\n3≤n≤50000，|x|≤1e6，输出保证不超过1e5行。\n\n## 输入样例（自建）\n\n```text\n3\n0 0\n1 1\n2 2\n```\n\n## 输出样例（自建）\n\n```text\n[0, 0] [1, 1] [2, 2]\n```\n\n## 作业评分\n\n本题 25 分，分为 5 个相互独立的评测文件，每点 5 分。练习数据不等同于 PTA 原站的隐藏测试。\n",
        "testArchive": {
          "file": "gplt-2024-2026-tests.zip",
          "prefix": "2025/L2-054",
          "count": 5,
          "score": 5
        },
        "originalId": "L2-054"
      },
      {
        "id": "GPLT2025L2055",
        "letter": "L2-055",
        "name": "胖达的山头",
        "title": "胖达的山头",
        "score": 25,
        "tests": 5,
        "difficulty": "普及-",
        "sampleInput": "4\n02:18:00 11:11:42\n04:58:31 17:43:21\n04:47:34 17:39:50\n11:03:46 13:51:03\n",
        "sampleOutput": "4\n",
        "statement": "# L2-055 胖达的山头（25 分）\n\n> 【题面说明】这是一份基于公开题意整理的非逐字改写练习版。正式原版请访问 [PTA 官方练习集](https://pintia.cn/problem-sets/994805046380707840/exam/problems/type/7) 的 L2-055 对应练习题；[公开核对来源](https://zeeklog.com/2025tuan-ti-cheng-xu-she-ji-tian-ti-sai-l1-l2ti-jie-c-3)。\n\n## 题目描述\n\n每只熊猫在某个闭时间区间活动，同一个山头的活动时间不能重叠。求能够安排所有熊猫所需的最少山头数。\n\n## 输入格式\n\n第一行 n；随后 n 行 `hh:mm:ss hh:mm:ss` 分别表示开始、结束。\n\n## 输出格式\n\n输出一个整数：所有时刻同时活动的最大熊猫数。\n\n## 数据范围与保证\n\n1≤n≤1e5，同一天内时间，start<finish，闭区间端点都包含。\n\n## 输入样例（自建）\n\n```text\n4\n02:18:00 11:11:42\n04:58:31 17:43:21\n04:47:34 17:39:50\n11:03:46 13:51:03\n```\n\n## 输出样例（自建）\n\n```text\n4\n```\n\n## 作业评分\n\n本题 25 分，分为 5 个相互独立的评测文件，每点 5 分。练习数据不等同于 PTA 原站的隐藏测试。\n",
        "testArchive": {
          "file": "gplt-2024-2026-tests.zip",
          "prefix": "2025/L2-055",
          "count": 5,
          "score": 5
        },
        "originalId": "L2-055"
      },
      {
        "id": "GPLT2025L2056",
        "letter": "L2-056",
        "name": "被 n 整除的 n 位数",
        "title": "被 n 整除的 n 位数",
        "score": 25,
        "tests": 5,
        "difficulty": "普及",
        "sampleInput": "5 34200 34500\n",
        "sampleOutput": "34200\n34205\n34240\n34245\n34280\n34285\n",
        "statement": "# L2-056 被 n 整除的 n 位数（25 分）\n\n> 【题面说明】这是一份基于公开题意整理的非逐字改写练习版。正式原版请访问 [PTA 官方练习集](https://pintia.cn/problem-sets/994805046380707840/exam/problems/type/7) 的 L2-056 对应练习题；[公开核对来源](https://zeeklog.com/2025tuan-ti-cheng-xu-she-ji-tian-ti-sai-l1-l2ti-jie-c-3)。\n\n## 题目描述\n\n求十进制 n 位数，使每个长度 i 的前缀数恰好可以被 i 整除（1≤i≤n），并列出位于闭区间[a,b]的所有这样的数。首位不能为0。\n\n## 输入格式\n\n一行 n a b。\n\n## 输出格式\n\n按数值升序、每行输出一个符合条件的数；若不存在输出 `No Solution`。\n\n## 数据范围与保证\n\n2≤n≤15,1≤a≤b<1e15。\n\n## 输入样例（自建）\n\n```text\n5 34200 34500\n```\n\n## 输出样例（自建）\n\n```text\n34200\n34205\n34240\n34245\n34280\n34285\n```\n\n## 作业评分\n\n本题 25 分，分为 5 个相互独立的评测文件，每点 5 分。练习数据不等同于 PTA 原站的隐藏测试。\n",
        "testArchive": {
          "file": "gplt-2024-2026-tests.zip",
          "prefix": "2025/L2-056",
          "count": 5,
          "score": 5
        },
        "originalId": "L2-056"
      }
    ],
    "homeworkGroup": "gplt",
    "practiceYear": 2025,
    "registered": 0
  },
  {
    "examVersion": "gplt-2026-l1-l2-homework",
    "title": "2026 年天梯赛 L1/L2 作业",
    "type": "IOI",
    "rule": "IOI",
    "category": "practice",
    "duration": 0,
    "totalScore": 200,
    "author": "天梯赛真题专题练习／公开题面重述",
    "introduction": "历年真题作业 · 天梯赛 L1/L2；8 道 L1＋4 道 L2，原分值 200 分，不限时。题面为非官方重述，每题 5 个自建测试点，不是 PTA 官方隐藏数据。部分题目采用包内勘误所述练习规则。",
    "questions": [
      {
        "id": "GPLT2026L1113",
        "letter": "L1-113",
        "name": "一行代码",
        "title": "一行代码",
        "score": 5,
        "tests": 5,
        "difficulty": "入门",
        "sampleInput": "",
        "sampleOutput": "Building the Future, One Line of Code at a Time.\n",
        "statement": "# L1-113 一行代码（5 分）\n\n> 【题面说明】这是一份基于公开题意整理的非逐字改写练习版。正式原版请访问 [PTA 官方练习集](https://pintia.cn/problem-sets/994805046380707840/exam/problems/type/7) 的 L1-113 对应练习题；[公开核对来源](https://acm-lycoris.cn/posts/gplt%E5%9B%A2%E4%BD%93%E7%A8%8B%E5%BA%8F%E8%AE%BE%E8%AE%A1%E5%A4%A9%E6%A2%AF%E8%B5%9B2026%E9%A2%98%E8%A7%A3/)。\n\n## 题目描述\n\n无需输入，输出固定英文句子。\n\n## 输入格式\n\n无。\n\n## 输出格式\n\n输出 `Building the Future, One Line of Code at a Time.`。\n\n## 数据范围与保证\n\n无输入。\n\n## 输入样例（自建）\n\n```text\n（无输入）\n```\n\n## 输出样例（自建）\n\n```text\nBuilding the Future, One Line of Code at a Time.\n```\n\n## 作业评分\n\n本题 5 分，分为 5 个相互独立的评测文件，每点 1 分。练习数据不等同于 PTA 原站的隐藏测试。\n",
        "testArchive": {
          "file": "gplt-2024-2026-tests.zip",
          "prefix": "2026/L1-113",
          "count": 5,
          "score": 1
        },
        "originalId": "L1-113"
      },
      {
        "id": "GPLT2026L1114",
        "letter": "L1-114",
        "name": "要刷多少题",
        "title": "要刷多少题",
        "score": 5,
        "tests": 5,
        "difficulty": "入门",
        "sampleInput": "1\n",
        "sampleOutput": "15\n",
        "statement": "# L1-114 要刷多少题（5 分）\n\n> 【题面说明】这是一份基于公开题意整理的非逐字改写练习版。正式原版请访问 [PTA 官方练习集](https://pintia.cn/problem-sets/994805046380707840/exam/problems/type/7) 的 L1-114 对应练习题；[公开核对来源](https://acm-lycoris.cn/posts/gplt%E5%9B%A2%E4%BD%93%E7%A8%8B%E5%BA%8F%E8%AE%BE%E8%AE%A1%E5%A4%A9%E6%A2%AF%E8%B5%9B2026%E9%A2%98%E8%A7%A3/)。\n\n## 题目描述\n\n每届天梯赛有15道互不相同的题，给出年数 n，求题目总数。\n\n## 输入格式\n\n输入一行正整数 n。\n\n## 输出格式\n\n输出 15n。\n\n## 数据范围与保证\n\n1≤n≤10。\n\n## 输入样例（自建）\n\n```text\n1\n```\n\n## 输出样例（自建）\n\n```text\n15\n```\n\n## 作业评分\n\n本题 5 分，分为 5 个相互独立的评测文件，每点 1 分。练习数据不等同于 PTA 原站的隐藏测试。\n",
        "testArchive": {
          "file": "gplt-2024-2026-tests.zip",
          "prefix": "2026/L1-114",
          "count": 5,
          "score": 1
        },
        "originalId": "L1-114"
      },
      {
        "id": "GPLT2026L1115",
        "letter": "L1-115",
        "name": "就挺突然的",
        "title": "就挺突然的",
        "score": 10,
        "tests": 5,
        "difficulty": "入门",
        "sampleInput": "2026 3001\n",
        "sampleOutput": "975\njiu ting tu ran de...\n",
        "statement": "# L1-115 就挺突然的（10 分）\n\n> 【题面说明】这是一份基于公开题意整理的非逐字改写练习版。正式原版请访问 [PTA 官方练习集](https://pintia.cn/problem-sets/994805046380707840/exam/problems/type/7) 的 L1-115 对应练习题；[公开核对来源](https://acm-lycoris.cn/posts/gplt%E5%9B%A2%E4%BD%93%E7%A8%8B%E5%BA%8F%E8%AE%BE%E8%AE%A1%E5%A4%A9%E6%A2%AF%E8%B5%9B2026%E9%A2%98%E8%A7%A3/)。\n\n## 题目描述\n\n给出孩子的出生年份 A 和可能活到的年份 B，计算 B-A 年寿命，判断是否为正以及是否超过250年。\n\n## 输入格式\n\n一行两个整数 A B。\n\n## 输出格式\n\n先输出寿命 B-A；再输出 `jiu ting tu ran de...`（超过250）、`hai sheng ma?`（≤0）、`nin tai cong ming le!`（其余）。\n\n## 数据范围与保证\n\n1≤A,B≤5000。\n\n## 输入样例（自建）\n\n```text\n2026 3001\n```\n\n## 输出样例（自建）\n\n```text\n975\njiu ting tu ran de...\n```\n\n## 作业评分\n\n本题 10 分，分为 5 个相互独立的评测文件，每点 2 分。练习数据不等同于 PTA 原站的隐藏测试。\n",
        "testArchive": {
          "file": "gplt-2024-2026-tests.zip",
          "prefix": "2026/L1-115",
          "count": 5,
          "score": 2
        },
        "originalId": "L1-115"
      },
      {
        "id": "GPLT2026L1116",
        "letter": "L1-116",
        "name": "普及赛排名",
        "title": "普及赛排名",
        "score": 10,
        "tests": 5,
        "difficulty": "入门",
        "sampleInput": "5\n1500 2700 1700 1000 1699\n",
        "sampleOutput": "3\n",
        "statement": "# L1-116 普及赛排名（10 分）\n\n> 【题面说明】这是一份基于公开题意整理的非逐字改写练习版。正式原版请访问 [PTA 官方练习集](https://pintia.cn/problem-sets/994805046380707840/exam/problems/type/7) 的 L1-116 对应练习题；[公开核对来源](https://acm-lycoris.cn/posts/gplt%E5%9B%A2%E4%BD%93%E7%A8%8B%E5%BA%8F%E8%AE%BE%E8%AE%A1%E5%A4%A9%E6%A2%AF%E8%B5%9B2026%E9%A2%98%E8%A7%A3/)。\n\n> 【练习版勘误】练习版按评分严格小于 1700 计数；公开转载存在题意矛盾，未经官方原题核准。\n\n## 题目描述\n\n统计 n 名学生中，所属学校评级分**低于1700**的学生数。此处采用与公开样例输出一致的比较方向（某些转载题面对此处有冲突，请见勘误）。\n\n## 输入格式\n\n第一行 n；接下来 n 个学校分数。\n\n## 输出格式\n\n输出评级分小于1700的个数。\n\n## 数据范围与保证\n\n1≤n≤10000，0≤分数≤3000。\n\n## 输入样例（自建）\n\n```text\n5\n1500 2700 1700 1000 1699\n```\n\n## 输出样例（自建）\n\n```text\n3\n```\n\n## 作业评分\n\n本题 10 分，分为 5 个相互独立的评测文件，每点 2 分。练习数据不等同于 PTA 原站的隐藏测试。\n",
        "testArchive": {
          "file": "gplt-2024-2026-tests.zip",
          "prefix": "2026/L1-116",
          "count": 5,
          "score": 2
        },
        "originalId": "L1-116",
        "practiceNote": "练习版按评分严格小于 1700 计数；公开转载存在题意矛盾，未经官方原题核准。"
      },
      {
        "id": "GPLT2026L1117",
        "letter": "L1-117",
        "name": "做什么都被骂怎么办",
        "title": "做什么都被骂怎么办",
        "score": 15,
        "tests": 5,
        "difficulty": "普及-",
        "sampleInput": "7\n23333 0\n1 0\n2 0\n1 1\n2 0\n666 1\n5555 0\n",
        "sampleOutput": "2 5555 23333\n",
        "statement": "# L1-117 做什么都被骂怎么办（15 分）\n\n> 【题面说明】这是一份基于公开题意整理的非逐字改写练习版。正式原版请访问 [PTA 官方练习集](https://pintia.cn/problem-sets/994805046380707840/exam/problems/type/7) 的 L1-117 对应练习题；[公开核对来源](https://acm-lycoris.cn/posts/gplt%E5%9B%A2%E4%BD%93%E7%A8%8B%E5%BA%8F%E8%AE%BE%E8%AE%A1%E5%A4%A9%E6%A2%AF%E8%B5%9B2026%E9%A2%98%E8%A7%A3/)。\n\n> 【练习版勘误】练习版筛选只有批评记录、从未受过表扬的人。\n\n## 题目描述\n\n若某编号只出现过批评记录（0），从未出现过表扬记录（1），该编号符合筛选要求。统计所有出现过的编号并筛选合格者。\n\n## 输入格式\n\n第一行 n；随后 n 行 `编号 记录`，记录0表示批评、1表示表扬。\n\n## 输出格式\n\n按编号升序输出合格者，空格分隔；没有则输出 `NONE`。\n\n## 数据范围与保证\n\n1≤n≤10000，编号1～100000。\n\n## 输入样例（自建）\n\n```text\n7\n23333 0\n1 0\n2 0\n1 1\n2 0\n666 1\n5555 0\n```\n\n## 输出样例（自建）\n\n```text\n2 5555 23333\n```\n\n## 作业评分\n\n本题 15 分，分为 5 个相互独立的评测文件，每点 3 分。练习数据不等同于 PTA 原站的隐藏测试。\n",
        "testArchive": {
          "file": "gplt-2024-2026-tests.zip",
          "prefix": "2026/L1-117",
          "count": 5,
          "score": 3
        },
        "originalId": "L1-117",
        "practiceNote": "练习版筛选只有批评记录、从未受过表扬的人。"
      },
      {
        "id": "GPLT2026L1118",
        "letter": "L1-118",
        "name": "钓鱼佬专用挪车电话",
        "title": "钓鱼佬专用挪车电话",
        "score": 15,
        "tests": 5,
        "difficulty": "入门",
        "sampleInput": "m\nmm\nmmmmmmmm\nmmm\nm\nmm\nm\nmmmmmmmm\n\nmmmmmmmm\nmm\n",
        "sampleOutput": "12831218082\n",
        "statement": "# L1-118 钓鱼佬专用挪车电话（15 分）\n\n> 【题面说明】这是一份基于公开题意整理的非逐字改写练习版。正式原版请访问 [PTA 官方练习集](https://pintia.cn/problem-sets/994805046380707840/exam/problems/type/7) 的 L1-118 对应练习题；[公开核对来源](https://acm-lycoris.cn/posts/gplt%E5%9B%A2%E4%BD%93%E7%A8%8B%E5%BA%8F%E8%AE%BE%E8%AE%A1%E5%A4%A9%E6%A2%AF%E8%B5%9B2026%E9%A2%98%E8%A7%A3/)。\n\n> 【练习版勘误】应输出完整 11 位电话，并保留前导 0。\n\n## 题目描述\n\n用字符 m 的重复次数表示11位号码的每一位：每行长度表示一位数字，空行表示0。求号码。\n\n## 输入格式\n\n恰好11行，每行包含0～9个字符 m，允许空行。\n\n## 输出格式\n\n在一行输出长度为11的号码字符串（保留开头的0）。\n\n## 数据范围与保证\n\n恰好11位。\n\n## 输入样例（自建）\n\n```text\nm\nmm\nmmmmmmmm\nmmm\nm\nmm\nm\nmmmmmmmm\n\nmmmmmmmm\nmm\n```\n\n## 输出样例（自建）\n\n```text\n12831218082\n```\n\n## 作业评分\n\n本题 15 分，分为 5 个相互独立的评测文件，每点 3 分。练习数据不等同于 PTA 原站的隐藏测试。\n",
        "testArchive": {
          "file": "gplt-2024-2026-tests.zip",
          "prefix": "2026/L1-118",
          "count": 5,
          "score": 3
        },
        "originalId": "L1-118",
        "practiceNote": "应输出完整 11 位电话，并保留前导 0。"
      },
      {
        "id": "GPLT2026L1119",
        "letter": "L1-119",
        "name": "网络流量监测",
        "title": "网络流量监测",
        "score": 20,
        "tests": 5,
        "difficulty": "普及-",
        "sampleInput": "10\n150 180 200 120 5000 136 115 131 4700 239\n",
        "sampleOutput": "5000 115 1097\n5 9\n",
        "statement": "# L1-119 网络流量监测（20 分）\n\n> 【题面说明】这是一份基于公开题意整理的非逐字改写练习版。正式原版请访问 [PTA 官方练习集](https://pintia.cn/problem-sets/994805046380707840/exam/problems/type/7) 的 L1-119 对应练习题；[公开核对来源](https://acm-lycoris.cn/posts/gplt%E5%9B%A2%E4%BD%93%E7%A8%8B%E5%BA%8F%E8%AE%BE%E8%AE%A1%E5%A4%A9%E6%A2%AF%E8%B5%9B2026%E9%A2%98%E8%A7%A3/)。\n\n> 【练习版勘误】异常值按严格大于真实平均值的两倍判断，不能先将平均值取整。\n\n## 题目描述\n\n给定每小时流量记录，输出最大值、最小值、平均值向下取整，并标出流量**严格超过两倍真实平均值**的所有小时编号。\n\n## 输入格式\n\n第一行 n；第二行 n 个非负流量值。\n\n## 输出格式\n\n首行 `最大值 最小值 向下取整的平均值`；第二行输出全部异常小时编号（从1开始），没有输出 `Normal`。\n\n## 数据范围与保证\n\n1≤n≤1000，每项≤1e6。\n\n## 输入样例（自建）\n\n```text\n10\n150 180 200 120 5000 136 115 131 4700 239\n```\n\n## 输出样例（自建）\n\n```text\n5000 115 1097\n5 9\n```\n\n## 作业评分\n\n本题 20 分，分为 5 个相互独立的评测文件，每点 4 分。练习数据不等同于 PTA 原站的隐藏测试。\n",
        "testArchive": {
          "file": "gplt-2024-2026-tests.zip",
          "prefix": "2026/L1-119",
          "count": 5,
          "score": 4
        },
        "originalId": "L1-119",
        "practiceNote": "异常值按严格大于真实平均值的两倍判断，不能先将平均值取整。"
      },
      {
        "id": "GPLT2026L1120",
        "letter": "L1-120",
        "name": "智慧文本编辑器",
        "title": "智慧文本编辑器",
        "score": 20,
        "tests": 5,
        "difficulty": "普及",
        "sampleInput": "10\nababa\n1 a\n1 aba\n1 aca\n2 0 X\n2 6 Y\n2 3 M\n3 2 6\n3 4 4\n1 aa\n3 0 7\n",
        "sampleOutput": "0 2 4\n0 2\n-1\nXababa\nXababaY\nXabMabaY\nXaabaMbY\nXaabaMbY\n1\nYbMabaaX\n",
        "statement": "# L1-120 智慧文本编辑器（20 分）\n\n> 【题面说明】这是一份基于公开题意整理的非逐字改写练习版。正式原版请访问 [PTA 官方练习集](https://pintia.cn/problem-sets/994805046380707840/exam/problems/type/7) 的 L1-120 对应练习题；[公开核对来源](https://acm-lycoris.cn/posts/gplt%E5%9B%A2%E4%BD%93%E7%A8%8B%E5%BA%8F%E8%AE%BE%E8%AE%A1%E5%A4%A9%E6%A2%AF%E8%B5%9B2026%E9%A2%98%E8%A7%A3/)。\n\n## 题目描述\n\n维护一个由大小写字母和数字组成的字符串 T，执行操作：1 找子串前3次出现的0基位置（重叠有效），2 在位置 p 前插入字符串（p=|T|表示末尾），3 反转闭区间[l,r]。每次操作都对当前 T 生效。\n\n## 输入格式\n\n第一行 N；第二行初始字符串；后续 N 行各一条：`1 子串`、`2 p 插入串` 或 `3 l r`。\n\n## 输出格式\n\n对操作1输出位置序列，找不到输出-1；对操作2、3输出修改后的整个字符串。\n\n## 数据范围与保证\n\n1≤N≤50，初始长度1～1000，查找串长≤5、插入串长≤10，保证下标合法。\n\n## 输入样例（自建）\n\n```text\n10\nababa\n1 a\n1 aba\n1 aca\n2 0 X\n2 6 Y\n2 3 M\n3 2 6\n3 4 4\n1 aa\n3 0 7\n```\n\n## 输出样例（自建）\n\n```text\n0 2 4\n0 2\n-1\nXababa\nXababaY\nXabMabaY\nXaabaMbY\nXaabaMbY\n1\nYbMabaaX\n```\n\n## 作业评分\n\n本题 20 分，分为 5 个相互独立的评测文件，每点 4 分。练习数据不等同于 PTA 原站的隐藏测试。\n",
        "testArchive": {
          "file": "gplt-2024-2026-tests.zip",
          "prefix": "2026/L1-120",
          "count": 5,
          "score": 4
        },
        "originalId": "L1-120"
      },
      {
        "id": "GPLT2026L2057",
        "letter": "L2-057",
        "name": "姥姥改作业",
        "title": "姥姥改作业",
        "score": 25,
        "tests": 5,
        "difficulty": "普及",
        "sampleInput": "10 2\n233 8 1 6 0 745 2 555 42 3\n",
        "sampleOutput": "3 5 7 10 9 4 2 1 8 6\n",
        "statement": "# L2-057 姥姥改作业（25 分）\n\n> 【题面说明】这是一份基于公开题意整理的非逐字改写练习版。正式原版请访问 [PTA 官方练习集](https://pintia.cn/problem-sets/994805046380707840/exam/problems/type/7) 的 L2-057 对应练习题；[公开核对来源](https://acm-lycoris.cn/posts/gplt%E5%9B%A2%E4%BD%93%E7%A8%8B%E5%BA%8F%E8%AE%BE%E8%AE%A1%E5%A4%A9%E6%A2%AF%E8%B5%9B2026%E9%A2%98%E8%A7%A3/)。\n\n> 【练习版勘误】左栈阈值使用剩余作业的平均混乱度向下取整。\n\n## 题目描述\n\n按当前堆中作业的顺序逐本处理：混乱度≤阈值T的立即批改并记录编号，>T的压到左侧栈。该轮结束后，若栈非空，将阈值更新为本轮未批改作业混乱度的**平均值向下取整**，并以栈顶到栈底的顺序继续下一轮。直到所有作业被批改。\n\n## 输入格式\n\n第一行 n T；第二行按顶到下顺序给 n 个混乱指数。\n\n## 输出格式\n\n一行按批改顺序输出全部作业编号（1～n），单空格分隔。\n\n## 数据范围与保证\n\n1≤n,T≤1000，0≤混乱指数≤1000。\n\n## 输入样例（自建）\n\n```text\n10 2\n233 8 1 6 0 745 2 555 42 3\n```\n\n## 输出样例（自建）\n\n```text\n3 5 7 10 9 4 2 1 8 6\n```\n\n## 作业评分\n\n本题 25 分，分为 5 个相互独立的评测文件，每点 5 分。练习数据不等同于 PTA 原站的隐藏测试。\n",
        "testArchive": {
          "file": "gplt-2024-2026-tests.zip",
          "prefix": "2026/L2-057",
          "count": 5,
          "score": 5
        },
        "originalId": "L2-057",
        "practiceNote": "左栈阈值使用剩余作业的平均混乱度向下取整。"
      },
      {
        "id": "GPLT2026L2058",
        "letter": "L2-058",
        "name": "超参数搜索",
        "title": "超参数搜索",
        "score": 25,
        "tests": 5,
        "difficulty": "普及-",
        "sampleInput": "10\n87 91 65 72 95 84 77 95 91 85\n3\n87\n75\n95\n",
        "sampleOutput": "5 8\n2\n7\n0\n",
        "statement": "# L2-058 超参数搜索（25 分）\n\n> 【题面说明】这是一份基于公开题意整理的非逐字改写练习版。正式原版请访问 [PTA 官方练习集](https://pintia.cn/problem-sets/994805046380707840/exam/problems/type/7) 的 L2-058 对应练习题；[公开核对来源](https://acm-lycoris.cn/posts/gplt%E5%9B%A2%E4%BD%93%E7%A8%8B%E5%BA%8F%E8%AE%BE%E8%AE%A1%E5%A4%A9%E6%A2%AF%E8%B5%9B2026%E9%A2%98%E8%A7%A3/)。\n\n> 【练习版勘误】查询严格大于 x 的最低评分，并列取编号最小者。\n\n## 题目描述\n\n给定 n 个方案的整数评分，先列出取得最高分的所有方案编号。再对每个目标评分 x，在所有评分**严格大于x**的方案中选择评分最小者，同分取编号最小者。无满足方案时输出0。\n\n## 输入格式\n\n第一行 n，第二行 n 个评分，随后 m 和 m 个查询目标评分。\n\n## 输出格式\n\n第一行列出全部最高分方案编号，升序、空格分隔；后续每行输出一个查询答案。\n\n## 数据范围与保证\n\n2≤n≤1e5，1≤m≤n/2，评分和x均在[0,1e8]，方案从1编号。\n\n## 输入样例（自建）\n\n```text\n10\n87 91 65 72 95 84 77 95 91 85\n3\n87\n75\n95\n```\n\n## 输出样例（自建）\n\n```text\n5 8\n2\n7\n0\n```\n\n## 作业评分\n\n本题 25 分，分为 5 个相互独立的评测文件，每点 5 分。练习数据不等同于 PTA 原站的隐藏测试。\n",
        "testArchive": {
          "file": "gplt-2024-2026-tests.zip",
          "prefix": "2026/L2-058",
          "count": 5,
          "score": 5
        },
        "originalId": "L2-058",
        "practiceNote": "查询严格大于 x 的最低评分，并列取编号最小者。"
      },
      {
        "id": "GPLT2026L2059",
        "letter": "L2-059",
        "name": "森林藏宝图",
        "title": "森林藏宝图",
        "score": 25,
        "tests": 5,
        "difficulty": "普及",
        "sampleInput": "9\n0 30\n0 10\n0 0\n1 8\n1 15\n2 20\n4 40\n5 10\n",
        "sampleOutput": "10\n6 8\n",
        "statement": "# L2-059 森林藏宝图（25 分）\n\n> 【题面说明】这是一份基于公开题意整理的非逐字改写练习版。正式原版请访问 [PTA 官方练习集](https://pintia.cn/problem-sets/994805046380707840/exam/problems/type/7) 的 L2-059 对应练习题；[公开核对来源](https://acm-lycoris.cn/posts/gplt%E5%9B%A2%E4%BD%93%E7%A8%8B%E5%BA%8F%E8%AE%BE%E8%AE%A1%E5%A4%A9%E6%A2%AF%E8%B5%9B2026%E9%A2%98%E8%A7%A3/)。\n\n## 题目描述\n\n每个非根节点 i 恰有一个父节点及连接边安全系数，形成根为0的树。对于每个叶节点，定义其安全值为从根到该叶子所有边权的最小值。输出最高安全值及全部达到最高值的叶子编号。\n\n## 输入格式\n\n第一行 n；随后 i=1..n-1 给出 `父节点编号 边权`。\n\n## 输出格式\n\n第一行最大安全值，第二行所有符合条件的叶节点编号升序、单空格分隔。\n\n## 数据范围与保证\n\n2≤n≤1e5，0≤边权≤100，合法树。\n\n## 输入样例（自建）\n\n```text\n9\n0 30\n0 10\n0 0\n1 8\n1 15\n2 20\n4 40\n5 10\n```\n\n## 输出样例（自建）\n\n```text\n10\n6 8\n```\n\n## 作业评分\n\n本题 25 分，分为 5 个相互独立的评测文件，每点 5 分。练习数据不等同于 PTA 原站的隐藏测试。\n",
        "testArchive": {
          "file": "gplt-2024-2026-tests.zip",
          "prefix": "2026/L2-059",
          "count": 5,
          "score": 5
        },
        "originalId": "L2-059"
      },
      {
        "id": "GPLT2026L2060",
        "letter": "L2-060",
        "name": "大语言模型的推理",
        "title": "大语言模型的推理",
        "score": 25,
        "tests": 5,
        "difficulty": "普及",
        "sampleInput": "10 18\n2 3 1\n2 1 3\n2 6 3\n6 2 3\n3 1 4\n1 6 5\n6 1 2\n1 4 5\n1 5 4\n4 5 1\n5 6 3\n5 7 4\n7 4 7\n7 8 1\n8 9 8\n9 7 9\n9 5 9\n3 8 6\n5\n2 3 10 6 7\n",
        "sampleOutput": "2->1->4->5->7->8->9\n3->8->9->5->7->4\n10\n6->2->1->4->5->7->8->9\n7->4->5->6->2->1\n",
        "statement": "# L2-060 大语言模型的推理（25 分）\n\n> 【题面说明】这是一份基于公开题意整理的非逐字改写练习版。正式原版请访问 [PTA 官方练习集](https://pintia.cn/problem-sets/994805046380707840/exam/problems/type/7) 的 L2-060 对应练习题；[公开核对来源](https://acm-lycoris.cn/posts/gplt%E5%9B%A2%E4%BD%93%E7%A8%8B%E5%BA%8F%E8%AE%BE%E8%AE%A1%E5%A4%A9%E6%A2%AF%E8%B5%9B2026%E9%A2%98%E8%A7%A3/)。\n\n> 【练习版勘误】使用题面中的有向图路径定义，避免参考资料误混入前题内容。\n\n## 题目描述\n\n有向图中的每条边带整数概率权值。对于每个给定起点，从起点出发，每一步仅在**当前节点未访问过的出边终点**中，选择概率最高的；若并列取终点编号最小者。访问过的节点不能再次进入。当无新后继时终止。不同起点的访问记录相互独立。\n\n## 输入格式\n\n第一行 n m；接下来 m 行 `u v p`；最后给 K 和 K 个起点编号。\n\n## 输出格式\n\n每个起点输出一行完整推理路径，节点间用 `->` 连接。\n\n## 数据范围与保证\n\n1≤n≤10000，0≤m≤10n，1≤p≤100，u≠v，无重复有向边，1≤K≤100。\n\n## 输入样例（自建）\n\n```text\n10 18\n2 3 1\n2 1 3\n2 6 3\n6 2 3\n3 1 4\n1 6 5\n6 1 2\n1 4 5\n1 5 4\n4 5 1\n5 6 3\n5 7 4\n7 4 7\n7 8 1\n8 9 8\n9 7 9\n9 5 9\n3 8 6\n5\n2 3 10 6 7\n```\n\n## 输出样例（自建）\n\n```text\n2->1->4->5->7->8->9\n3->8->9->5->7->4\n10\n6->2->1->4->5->7->8->9\n7->4->5->6->2->1\n```\n\n## 作业评分\n\n本题 25 分，分为 5 个相互独立的评测文件，每点 5 分。练习数据不等同于 PTA 原站的隐藏测试。\n",
        "testArchive": {
          "file": "gplt-2024-2026-tests.zip",
          "prefix": "2026/L2-060",
          "count": 5,
          "score": 5
        },
        "originalId": "L2-060",
        "practiceNote": "使用题面中的有向图路径定义，避免参考资料误混入前题内容。"
      }
    ],
    "homeworkGroup": "gplt",
    "practiceYear": 2026,
    "registered": 0
  }
];
  const archive = window.OMS_EXAM_ARCHIVE || (window.OMS_EXAM_ARCHIVE = []);
  for (const item of data) {
    const existing = archive.findIndex(exam => exam.examVersion === item.examVersion);
    const sources = [window.OMS_EXAM_DATA, ...archive].filter(exam => exam && exam.examVersion !== item.examVersion);
    const exam = window.OMS_NUMBER_EXAM ? window.OMS_NUMBER_EXAM(item, sources, { newBatch: true }) : item;
    if (existing >= 0) archive[existing] = exam;
    else archive.push(exam);
  }
})();
