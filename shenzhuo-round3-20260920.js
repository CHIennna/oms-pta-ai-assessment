(() => {
  const data = {
  "examVersion": "fzu-2026-09-shenzhuo-round3-practice",
  "title": "厦门神桌杯 2026年9月算法设计月赛 Round 3（练习复刻）",
  "type": "IOI",
  "rule": "IOI",
  "category": "practice",
  "duration": 240,
  "startAt": "2026-09-20T18:00:00+08:00",
  "endAt": "2026-09-20T22:00:00+08:00",
  "totalScore": 1100,
  "author": "福州大学原赛题面／用户保存题面整理",
  "introduction": "根据2026-09-20原赛11题制作的1100分练习考试；每题10个自建评分点、每点10分；K题需要Special Judge，未集成前禁用自动提交。非原赛隐藏测试集。",
  "questions": [
    {
      "id": "FZU20260920R3A",
      "letter": "A",
      "name": "禁用前缀",
      "title": "禁用前缀",
      "score": 100,
      "tests": 10,
      "sampleInput": "4\n1 at\n2 watcoder\n2 atcoder\n1 wa",
      "sampleOutput": "0\n1\n1\n0",
      "statement": "# A. 禁用前缀（100分）\n\n\n**原题链接：** https://oj.fzu.edu.cn/p/514?tid=6aae8b3ae943a1ff033c9de5  \n**题目类型：** 传统题　 **时间限制：** 2000 ms　 **内存限制：** 256 MiB\n\n### 题目描述\n\n有两个字符串多重集合 $X$ 和 $Y$，初始时它们都为空。\n\n你需要依次处理 $Q$ 次操作。第 $i$ 次操作给出一个整数 $T_i$ 和一个字符串 $S_i$：\n\n- 如果 $T_i=1$，将 $S_i$ 加入 $X$；\n- 如果 $T_i=2$，将 $S_i$ 加入 $Y$。\n\n每次操作结束后，求 $Y$ 中满足以下条件的字符串数量：不存在任何 $x\\in X$，使得 $x$ 是该字符串的前缀。\n\n如果存在一个可以为空的字符串 $w$，使得 $y=x+w$，则称 $x$ 是 $y$ 的前缀。例如，`abc` 是 `abcdef` 和 `abc` 的前缀，但不是 `ab` 或 `zabc` 的前缀。\n\n注意，$X$ 和 $Y$ 都是多重集合。同一个字符串可以加入多次，$Y$ 中的每次出现都要分别计数。所有操作的影响都会保留。\n\n### 输入格式\n\n第一行包含一个整数 $Q$（$1\\le Q\\le2\\times10^5$），表示操作数量。\n\n接下来 $Q$ 行，每行包含一个整数 $T_i$ 和一个字符串 $S_i$（$T_i\\in\\{1,2\\}$）。字符串 $S_i$ 仅由小写英文字母组成，且 $1\\le |S_i|\\le5\\times10^5$。\n\n保证所有操作中字符串的长度之和不超过 $5\\times10^5$。\n\n### 输出格式\n\n输出 $Q$ 行。第 $i$ 行输出一个整数，表示第 $i$ 次操作结束后，$Y$ 中不以 $X$ 中任何字符串为前缀的字符串数量。\n\n### 样例\n\n#### 样例 1\n\n```text\n4\n1 at\n2 watcoder\n2 atcoder\n1 wa\n```\n\n```text\n0\n1\n1\n0\n```\n\n#### 样例 1 解释\n\n- 第一次操作后，$Y$ 为空，答案为 $0$。\n- 第二次操作加入 `watcoder`，它不以 `at` 开头，答案为 $1$。\n- 第三次操作加入 `atcoder`，它以 `at` 开头，不计入答案；`watcoder` 仍符合条件，答案为 $1$。\n- 第四次操作把 `wa` 加入 $X$，已有的 `watcoder` 也不再符合条件，答案变为 $0$。\n\n#### 样例 2\n\n```text\n8\n2 abc\n2 abc\n2 ab\n1 abc\n1 abc\n2 abcd\n1 a\n2 z\n```\n\n```text\n1\n2\n3\n1\n1\n1\n0\n1\n```\n\n#### 样例 2 解释\n\n前三次操作加入两份 `abc` 和一份 `ab`，它们分别计数，答案依次为 $1,2,3$。\n\n第四次操作加入禁用前缀 `abc`，两份 `abc` 同时失效，但 `ab` 不受影响，答案变为 $1$。重复加入 `abc` 不会再次扣除答案，新加入的 `abcd` 也不会计入答案。\n\n第七次操作加入禁用前缀 `a`，使 `ab` 失效，答案变为 $0$。最后加入的 `z` 符合条件，答案为 $1$。\n\n### 样例文件\n\n- 样例 1：[输入](https://oj.fzu.edu.cn/d/system/p/514/file/sample1.in?tid=6aae8b3ae943a1ff033c9de5) / [输出](https://oj.fzu.edu.cn/d/system/p/514/file/sample1.out?tid=6aae8b3ae943a1ff033c9de5)\n- 样例 2：[输入](https://oj.fzu.edu.cn/d/system/p/514/file/sample2.in?tid=6aae8b3ae943a1ff033c9de5) / [输出](https://oj.fzu.edu.cn/d/system/p/514/file/sample2.out?tid=6aae8b3ae943a1ff033c9de5)",
      "testArchive": {
        "file": "shenzhuo-round3-20260920-tests.zip",
        "prefix": "P1",
        "count": 10,
        "score": 10
      },
      "difficulty": "普及+/提高-"
    },
    {
      "id": "FZU20260920R3B",
      "letter": "B",
      "name": "冲浪之旅",
      "title": "冲浪之旅",
      "score": 100,
      "tests": 10,
      "sampleInput": "4\n2 5 50\n7 14\n30 40\n2 2\n3 1\n3 5\n18 2\n22 32\n4 3 50\n4 6\n15 18\n20 26\n34 38\n1 2\n8 2\n10 2\n1 4 17\n10 14\n1 6\n1 2\n1 2\n16 9\n1 2 10\n5 9\n2 3\n2 2",
      "sampleOutput": "4\n-1\n1\n2",
      "statement": "# B. 冲浪之旅（100分）\n\n\n**原题链接：** https://oj.fzu.edu.cn/p/511?tid=6aae8b3ae943a1ff033c9de5  \n**题目类型：** 传统题　 **时间限制：** 2000 ms　 **内存限制：** 256 MiB\n\n### 题目描述\n\nMualani 正在一条可以看作数轴的路径上冲浪。她从位置 $1$ 出发，目标是到达位置 $L$。\n\n她最初的跳跃能力为 $k=1$。当她位于整数位置 $x$ 时，可以跳到任意满足 $x\\le y\\le x+k$ 的整数位置 $y$。\n\n路径上有 $n$ 个障碍区间，第 $i$ 个为 $[l_i,r_i]$。她不能落在任何障碍区间内，但可以直接跳过障碍，只要最终落点合法。障碍按位置从左到右给出，且相邻障碍之间至少有一个合法的整数位置。\n\n路径上还有 $m$ 个强化道具，第 $i$ 个道具位于位置 $x_i$，强化值为 $v_i$。当她到达 $x_i$ 时，可以选择拾取该道具，使跳跃能力永久增加 $v_i$。每个道具最多拾取一次。同一位置可以有多个道具，每个都可以单独选择是否拾取。保证所有道具均不在障碍区间内。\n\n求她到达位置 $L$ 最少需要拾取多少个道具。如果无法到达，输出 $-1$。\n\n### 输入格式\n\n第一行包含一个整数 $t$（$1\\le t\\le 10^4$），表示测试用例的数量。\n\n对于每个测试用例：\n\n第一行包含三个整数 $n,m,L$（$1\\le n,m\\le 2\\times10^5$，$3\\le L\\le10^9$）。\n\n接下来 $n$ 行，每行包含两个整数 $l_i,r_i$（$2\\le l_i\\le r_i\\le L-1$），表示一个障碍区间。保证对所有 $1\\le i<n$，均有 $r_i+1<l_{i+1}$。\n\n接下来 $m$ 行，每行包含两个整数 $x_i,v_i$（$1\\le x_i,v_i\\le L$），表示一个道具的位置和强化值。保证 $x_i\\le x_{i+1}$，且每个 $x_i$ 都不属于任何障碍区间。\n\n保证所有测试用例的 $n$ 之和不超过 $2\\times10^5$，$m$ 之和不超过 $2\\times10^5$。\n\n### 输出格式\n\n对于每个测试用例，输出一行一个整数，表示最少需要拾取的道具数量；如果无法到达终点，则输出 $-1$。\n\n### 样例\n\n#### 样例 1\n\n```text\n4\n2 5 50\n7 14\n30 40\n2 2\n3 1\n3 5\n18 2\n22 32\n4 3 50\n4 6\n15 18\n20 26\n34 38\n1 2\n8 2\n10 2\n1 4 17\n10 14\n1 6\n1 2\n1 2\n16 9\n1 2 10\n5 9\n2 3\n2 2\n```\n\n```text\n4\n-1\n1\n2\n```\n\n#### 样例 1 解释\n\n- 第一组：越过 $[7,14]$ 至少需要跳跃能力 $9$。必须拾取此前强化值为 $2,1,5$ 的三个道具，使能力达到 $9$。再拾取位置 $22$、强化值为 $32$ 的道具，即可越过第二个障碍，共需 $4$ 个道具。只拾取此前三个道具还无法越过第二个障碍，所以答案为 $4$。\n- 第二组：越过第一个障碍 $[4,6]$ 至少需要能力 $4$，但此前只能取得位置 $1$ 的道具，能力最多为 $3$，因此无法到达终点。\n- 第三组：只需拾取位置 $1$、强化值为 $6$ 的道具，能力就会变为 $7$，足以越过 $[10,14]$，答案为 $1$。\n- 第四组：越过 $[5,9]$ 至少需要能力 $6$。拾取两个道具后能力恰好为 $1+3+2=6$，单独拾取任意一个都不够，答案为 $2$。\n\n### 样例文件\n\n- 样例 1：[输入](https://oj.fzu.edu.cn/d/system/p/511/file/sample1.in?tid=6aae8b3ae943a1ff033c9de5) / [输出](https://oj.fzu.edu.cn/d/system/p/511/file/sample1.out?tid=6aae8b3ae943a1ff033c9de5)",
      "testArchive": {
        "file": "shenzhuo-round3-20260920-tests.zip",
        "prefix": "P2",
        "count": 10,
        "score": 10
      },
      "difficulty": "普及"
    },
    {
      "id": "FZU20260920R3C",
      "letter": "C",
      "name": "Typewriter",
      "title": "Typewriter",
      "score": 100,
      "tests": 10,
      "sampleInput": "5\n19\n100\n911\n2024\n88810",
      "sampleOutput": "3\n2\n2\n3\n2",
      "statement": "# C. Typewriter（100分）\n\n\n**原题链接：** https://oj.fzu.edu.cn/p/508?tid=6aae8b3ae943a1ff033c9de5  \n**题目类型：** 传统题　 **时间限制：** 2000 ms　 **内存限制：** 256 MiB\n\n### 题目描述\n\nCuber QQ 买了一台古董打字机，但它的数字键 `0` 和 `1` 分别被替换成了 `=` 和 `+`。因此，他不能直接输入十进制表示中含有数字 `0` 或 `1` 的整数。\n\n现在他想得到一个正整数 $n$。他可以输入若干个十进制表示中**不包含数字 `0` 和 `1`** 的正整数，并用加号将它们相加。\n\n求最小的正整数 $k$，使得存在 $k$ 个整数 $a_1,a_2,\\ldots,a_k$，满足：\n\n- 对每个 $1\\le i\\le k$，$2\\le a_i\\le n$；\n- 每个 $a_i$ 的十进制表示均不包含数字 `0` 和 `1`；\n- $a_1+a_2+\\cdots+a_k=n$。\n\n加数可以相同。你只需要输出最少的加数个数，不需要输出具体方案。\n\n### 输入格式\n\n第一行包含一个整数 $T$（$1\\le T\\le 1000$），表示测试用例的数量。\n\n接下来 $T$ 行，每行包含一个正整数 $n$（$10\\le n\\le 10^{100}$）。\n\n保证 $n$ 的十进制表示没有前导零，且至少包含一个数字 `0` 或 `1`。保证存在满足条件的表示方法。\n\n注意，$n$ 可能无法用常见的整数类型存储；上界 $10^{100}$ 的十进制表示有 $101$ 位。\n\n### 输出格式\n\n对于每个测试用例，输出一行一个整数 $k$，表示所需加数个数的最小值。\n\n### 样例\n\n#### 样例 1\n\n```text\n5\n19\n100\n911\n2024\n88810\n```\n\n```text\n3\n2\n2\n3\n2\n```\n\n#### 样例 1 解释\n\n五组数据分别可以使用以下最优方案：\n\n- $19=9+8+2$，需要 $3$ 个加数。\n- $100=22+78$，需要 $2$ 个加数。\n- $911=222+689$，需要 $2$ 个加数。\n- $2024=999+999+26$，需要 $3$ 个加数。\n- $88810=22222+66588$，需要 $2$ 个加数。\n\n输入的数都含有 `0` 或 `1`，因此不能只使用一个加数。\n\n对于 $19$，不超过它的合法加数只能是 $2$ 到 $9$，两个加数的和最多为 $18$。对于 $2024$，最小的合法四位数为 $2222$，超过 $2024$，因此每个合法加数至多为 $999$，两个的和最多为 $1998$。所以这两组至少需要三个加数。\n\n### 样例文件\n\n- 样例 1：[输入](https://oj.fzu.edu.cn/d/system/p/508/file/sample1.in?tid=6aae8b3ae943a1ff033c9de5) / [输出](https://oj.fzu.edu.cn/d/system/p/508/file/sample1.out?tid=6aae8b3ae943a1ff033c9de5)",
      "testArchive": {
        "file": "shenzhuo-round3-20260920-tests.zip",
        "prefix": "P3",
        "count": 10,
        "score": 10
      },
      "difficulty": "普及"
    },
    {
      "id": "FZU20260920R3D",
      "letter": "D",
      "name": "Popcount Sum 3",
      "title": "Popcount Sum 3",
      "score": 100,
      "tests": 10,
      "sampleInput": "2\n20 2\n1234567890 17",
      "sampleOutput": "100\n382730918",
      "statement": "# D. Popcount Sum 3（100分）\n\n\n**原题链接：** https://oj.fzu.edu.cn/p/507?tid=6aae8b3ae943a1ff033c9de5  \n**题目类型：** 传统题　 **时间限制：** 2000 ms　 **内存限制：** 256 MiB\n\n### 题目描述\n\n给定两个正整数 $N$ 和 $K$。\n\n定义 $\\operatorname{popcount}(x)$ 为整数 $x$ 的二进制表示中 `1` 的个数。例如，$5=(101)_2$，因此 $\\operatorname{popcount}(5)=2$。\n\n求所有满足以下条件的正整数 $x$ 的**总和**，并对 $998244353$ 取模：\n\n- $1\\le x\\le N$；\n- $\\operatorname{popcount}(x)=K$。\n\n如果不存在满足条件的整数，总和为 $0$。\n\n### 输入格式\n\n第一行包含一个整数 $T$（$1\\le T\\le 100$），表示测试用例的数量。\n\n接下来 $T$ 行，每行包含两个整数 $N,K$（$1\\le N<2^{60}$，$1\\le K\\le 60$）。\n\n### 输出格式\n\n对于每个测试用例，输出一行一个整数，表示所求总和对 $998244353$ 取模后的结果。\n\n### 样例\n\n#### 样例 1\n\n```text\n2\n20 2\n1234567890 17\n```\n\n```text\n100\n382730918\n```\n\n#### 样例 1 解释\n\n第一组数据中，满足条件的整数为 $3,5,6,9,10,12,17,18,20$，总和为 $100$。其中 $20$ 也被计入，因为条件是 $x\\le N$。\n\n第二组数据中，将所有不超过 $1234567890$、二进制中恰有 $17$ 个 `1` 的整数相加，再对 $998244353$ 取模，得到 $382730918$。\n\n### 样例文件\n\n- 样例 1：[输入](https://oj.fzu.edu.cn/d/system/p/507/file/sample1.in?tid=6aae8b3ae943a1ff033c9de5) / [输出](https://oj.fzu.edu.cn/d/system/p/507/file/sample1.out?tid=6aae8b3ae943a1ff033c9de5)",
      "testArchive": {
        "file": "shenzhuo-round3-20260920-tests.zip",
        "prefix": "P4",
        "count": 10,
        "score": 10
      },
      "difficulty": "普及+/提高-"
    },
    {
      "id": "FZU20260920R3E",
      "letter": "E",
      "name": "Beautiful Kadomatsu",
      "title": "Beautiful Kadomatsu",
      "score": 100,
      "tests": 10,
      "sampleInput": "4\n1 3 4 2",
      "sampleOutput": "4",
      "statement": "# E. Beautiful Kadomatsu（100分）\n\n\n**原题链接：** https://oj.fzu.edu.cn/p/506?tid=6aae8b3ae943a1ff033c9de5  \n**题目类型：** 传统题　 **时间限制：** 3000 ms　 **内存限制：** 256 MiB\n\n### 题目描述\n\n给定一个长度为 $N$ 的排列 $P=(P_1,P_2,\\ldots,P_N)$。\n\n考虑 $P$ 的一个非空子序列 $a=(a_1,a_2,\\ldots,a_k)$。子序列是从原排列中选择若干个位置，并按照原有顺序取出对应元素得到的序列，所选位置不要求连续。\n\n对于每个满足 $2\\le i\\le k-1$ 的位置 $i$：\n\n- 若 $a_{i-1}<a_i>a_{i+1}$，则称该位置为一个**峰**；\n- 若 $a_{i-1}>a_i<a_{i+1}$，则称该位置为一个**谷**。\n\n设子序列中峰的数量为 $x$，谷的数量为 $y$。若 $x>y$，则称这个子序列为 **Beautiful Kadomatsu**。\n\n求排列 $P$ 中 Beautiful Kadomatsu 子序列的数量，对 $998244353$ 取模。选择的位置集合不同，就视为不同的子序列。\n\n当 $k<3$ 时，峰和谷的数量均为 $0$。\n\n### 输入格式\n\n第一行包含一个整数 $N$（$1\\le N\\le 300000$）。\n\n第二行包含 $N$ 个整数 $P_1,P_2,\\ldots,P_N$。保证 $P$ 是 $1,2,\\ldots,N$ 的一个排列。\n\n### 输出格式\n\n输出一个整数，表示满足条件的子序列数量对 $998244353$ 取模后的结果。\n\n### 样例\n\n#### 样例 1\n\n```text\n4\n1 3 4 2\n```\n\n```text\n4\n```\n\n#### 样例 1 解释\n\n满足条件的子序列共有 $4$ 个：$(1,3,2)$、$(1,4,2)$、$(3,4,2)$ 和 $(1,3,4,2)$。它们均有一个峰、没有谷。\n\n#### 样例 2\n\n```text\n1\n1\n```\n\n```text\n0\n```\n\n#### 样例 2 解释\n\n唯一的非空子序列为 $(1)$，没有峰或谷，不满足峰的数量大于谷的数量，因此答案为 $0$。\n\n#### 样例 3\n\n```text\n20\n11 10 18 13 12 16 5 19 7 6 17 4 9 1 14 2 20 15 8 3\n```\n\n```text\n431610\n```\n\n#### 样例 3 解释\n\n例如，子序列 $(10,13,12,5,7,9,20,3)$ 有两个峰 $13,20$ 和一个谷 $5$，因此满足条件。统计全部子序列后，答案为 $431610$。\n\n### 样例文件\n\n- 样例 1：[输入](https://oj.fzu.edu.cn/d/system/p/506/file/sample1.in?tid=6aae8b3ae943a1ff033c9de5) / [输出](https://oj.fzu.edu.cn/d/system/p/506/file/sample1.out?tid=6aae8b3ae943a1ff033c9de5)\n- 样例 2：[输入](https://oj.fzu.edu.cn/d/system/p/506/file/sample2.in?tid=6aae8b3ae943a1ff033c9de5) / [输出](https://oj.fzu.edu.cn/d/system/p/506/file/sample2.out?tid=6aae8b3ae943a1ff033c9de5)\n- 样例 3：[输入](https://oj.fzu.edu.cn/d/system/p/506/file/sample3.in?tid=6aae8b3ae943a1ff033c9de5) / [输出](https://oj.fzu.edu.cn/d/system/p/506/file/sample3.out?tid=6aae8b3ae943a1ff033c9de5)",
      "testArchive": {
        "file": "shenzhuo-round3-20260920-tests.zip",
        "prefix": "P5",
        "count": 10,
        "score": 10
      },
      "difficulty": "普及+/提高-"
    },
    {
      "id": "FZU20260920R3F",
      "letter": "F",
      "name": "动态异或表示",
      "title": "动态异或表示",
      "score": 100,
      "tests": 10,
      "sampleInput": "10\n3 2 1 1\n1 3\n3 2 1 2\n1 3\n2 3\n3 1 3\n2 3\n3 1 3\n1 0\n3 1 0",
      "sampleOutput": "No\nYes\nYes\nNo\nNo",
      "statement": "# F. 动态异或表示（100分）\n\n\n**原题链接：** https://oj.fzu.edu.cn/p/504?tid=6aae8b3ae943a1ff033c9de5  \n**题目类型：** 传统题　 **时间限制：** 3000 ms　 **内存限制：** 256 MiB\n\n给定一个初始为空的多重集合 $S$，你需要处理 $Q$ 次操作。\n\n对于一个整数序列 $T$，如果可以选择其中若干个元素，使这些元素的异或和等于 $x$，则称 $x$ 可以被 $T$ **异或表示**。\n\n每个元素至多选择一次，允许选择零个元素，因此任意序列都可以异或表示 $0$。对于多重集合，每个副本视为一个独立的元素。\n\n你需要支持以下三种操作：\n\n- `1 x`：向多重集合 $S$ 中加入一个整数 $x$。\n- `2 x`：从多重集合 $S$ 中删除一个整数 $x$。保证操作前 $S$ 中至少存在一个 $x$，且每次只删除一个副本。\n- `3 k a1 a2 ... ak`：给定 $k$ 个整数 $a_1,a_2,\\ldots,a_k$，判断是否存在一个**非零整数** $y$，使得：\n  - $y$ 能由当前多重集合 $S$ 中的若干个元素异或表示；\n  - $y$ 也能由序列 $a_1,a_2,\\ldots,a_k$ 中的若干个元素异或表示。\n\n第三类操作不会修改 $S$。\n\n### 输入格式\n\n第一行包含一个整数 $Q$（$1\\le Q\\le 2\\times 10^5$）——操作次数。\n\n接下来 $Q$ 行，每行表示一次操作，格式为以下三种之一：\n\n```text\n1 x\n2 x\n3 k a1 a2 ... ak\n```\n\n其中：\n\n- $0\\le x<2^{30}$；\n- 对于第三类操作，$1\\le k\\le 2\\times 10^5$；\n- $0\\le a_i<2^{30}$；\n- 所有第三类操作中的 $k$ 之和不超过 $2\\times 10^5$；\n- 对于每次第二类操作，保证操作前 $S$ 中至少存在一个 $x$。\n\n### 输出格式\n\n对于每次第三类操作，输出一行。\n\n如果存在满足条件的非零整数 $y$，输出 `Yes`；否则输出 `No`。\n\n### 样例\n\n#### 样例 1 输入\n\n```text\n10\n3 2 1 1\n1 3\n3 2 1 2\n1 3\n2 3\n3 1 3\n2 3\n3 1 3\n1 0\n3 1 0\n```\n\n#### 样例 1 输出\n\n```text\nNo\nYes\nYes\nNo\nNo\n```\n\n### 样例解释\n\n第一次查询时，$S$ 为空，因此只能异或表示 $0$，不存在满足条件的非零整数，答案为 `No`。\n\n第二次查询时，$S={3}$。给定序列为 ${1,2}$，且\n\n$$1\\oplus 2=3,$$\n\n因此双方都可以异或表示 $3$，答案为 `Yes`。\n\n之后再次向 $S$ 中加入一个 $3$，并删除其中一个副本，此时 $S$ 中仍然存在一个 $3$，因此第三次查询的答案仍为 `Yes`。\n\n随后删除剩余的 $3$，此时 $S$ 重新变为空集，因此第四次查询的答案为 `No`。\n\n最后向 $S$ 中加入 $0$。虽然 $S$ 和给定序列都可以异或表示 $0$，但题目要求 $y$ 必须是**非零整数**，因此答案仍为 `No`。",
      "testArchive": {
        "file": "shenzhuo-round3-20260920-tests.zip",
        "prefix": "P6",
        "count": 10,
        "score": 10
      },
      "difficulty": "提高+/省选-"
    },
    {
      "id": "FZU20260920R3G",
      "letter": "G",
      "name": "FZUFZU Again",
      "title": "FZUFZU Again",
      "score": 100,
      "tests": 10,
      "sampleInput": "9 4\nFZUFZUFZU\n1 A\n1 F\n4 A\n4 F",
      "sampleOutput": "1\n2\n0\n2",
      "statement": "# G. FZUFZU Again（100分）\n\n\n**原题链接：** https://oj.fzu.edu.cn/p/505?tid=6aae8b3ae943a1ff033c9de5  \n**题目类型：** 传统题　 **时间限制：** 2000 ms　 **内存限制：** 256 MiB\n\n### 题目描述\n\n给定一个长度为 $N$ 的字符串 $S$，字符串仅包含大写英文字母。\n\n你需要依次进行 $Q$ 次修改。每次修改给出一个位置 $x$ 和一个字符 $c$，将 $S$ 的第 $x$ 个字符替换为 $c$。**修改会永久保留**，后续操作均在修改后的字符串上进行。\n\n每次修改后，求字符串中子串 `FZUFZU` 的出现次数。不同出现可以相互重叠。例如，`FZUFZUFZU` 中有两次出现，起点分别为第 $1$ 个和第 $4$ 个字符。\n\n### 输入格式\n\n第一行包含两个整数 $N,Q$（$1\\le N,Q\\le 200000$），分别表示字符串长度和修改次数。\n\n第二行包含一个长度为 $N$ 的字符串 $S$，仅由大写英文字母组成。\n\n接下来 $Q$ 行，每行包含一个整数 $x$ 和一个大写英文字母 $c$（$1\\le x\\le N$），表示将第 $x$ 个字符修改为 $c$。位置从 $1$ 开始编号。\n\n### 输出格式\n\n对于每次修改，输出一行一个整数，表示修改后 `FZUFZU` 的出现次数。\n\n### 样例\n\n#### 样例 1\n\n```text\n9 4\nFZUFZUFZU\n1 A\n1 F\n4 A\n4 F\n```\n\n```text\n1\n2\n0\n2\n```\n\n#### 样例 1 解释\n\n初始字符串为 `FZUFZUFZU`，匹配的起点为 $1$ 和 $4$。\n\n- 第一次修改后为 `AZUFZUFZU`，仅剩起点 $4$ 的匹配，答案为 $1$。\n- 第二次修改恢复原串，答案为 $2$。\n- 第三次修改后为 `FZUAZUFZU`，两个匹配均被破坏，答案为 $0$。\n- 第四次修改再次恢复原串，答案为 $2$。\n\n### 样例文件\n\n- 样例 1：[输入](https://oj.fzu.edu.cn/d/system/p/505/file/sample1.in?tid=6aae8b3ae943a1ff033c9de5) / [输出](https://oj.fzu.edu.cn/d/system/p/505/file/sample1.out?tid=6aae8b3ae943a1ff033c9de5)",
      "testArchive": {
        "file": "shenzhuo-round3-20260920-tests.zip",
        "prefix": "P7",
        "count": 10,
        "score": 10
      },
      "difficulty": "普及-"
    },
    {
      "id": "FZU20260920R3H",
      "letter": "H",
      "name": "FZU 子串（Easy Version）",
      "title": "FZU 子串（Easy Version）",
      "score": 100,
      "tests": 10,
      "sampleInput": "1",
      "sampleOutput": "1",
      "statement": "# H. FZU 子串（Easy Version）（100分）\n\n\n**原题链接：** https://oj.fzu.edu.cn/p/515?tid=6aae8b3ae943a1ff033c9de5  \n**题目类型：** 传统题　 **时间限制：** 3000 ms　 **内存限制：** 256 MiB\n\n给定一个正整数 $n$。\n\n对于一个仅由 `F`、`Z`、`U` 三种字符组成的字符串 $S$，定义它的价值为其中本质不同的非空子串数量。\n\n子串是从字符串中取出的一段连续字符。两个子串本质不同，当且仅当它们作为字符串不完全相同。相同的子串即使出现在不同位置，也只计数一次。\n\n例如，字符串 `FZF` 的本质不同非空子串为 `F`、`Z`、`FZ`、`ZF`、`FZF`，因此它的价值为 $5$。\n\n请计算所有长度恰好为 $n$、且仅由 `F`、`Z`、`U` 组成的字符串中，最大的价值。**你只需要输出最大值，不需要构造或输出字符串。**\n\n### 输入格式\n\n输入一行，包含一个正整数 $n$（$1\\le n\\le 2\\times10^5$）。\n\n### 输出格式\n\n输出一个整数，表示最大的价值。\n\n### 样例\n\n#### 样例 1 输入\n\n```text\n1\n```\n\n#### 样例 1 输出\n\n```text\n1\n```\n\n#### 样例 1 说明\n\n可以选择字符串 `F`，它只有一个非空子串，价值为 $1$。\n\n#### 样例 2 输入\n\n```text\n5\n```\n\n#### 样例 2 输出\n\n```text\n13\n```\n\n#### 样例 2 说明\n\n可以选择字符串 `FZUUF`。长度为 $1$ 的不同子串有 $3$ 个，长度为 $2$ 的不同子串有 `FZ`、`ZU`、`UU`、`UF`，共 $4$ 个；长度为 $3,4,5$ 的不同子串分别有 $3,2,1$ 个。因此价值为 $3+4+3+2+1=13$。\n\n任意长度为 $5$ 的合法字符串，在这些长度下的不同子串数量分别不超过 $3,4,3,2,1$，所以最大价值为 $13$。\n\n#### 样例 3 输入\n\n```text\n10\n```\n\n#### 样例 3 输出\n\n```text\n48\n```\n\n#### 样例 3 说明\n\n可以选择字符串 `FUUZZUFZFF`。三种字符均有出现，九个长度为 $2$ 的子串依次为 `FU`、`UU`、`UZ`、`ZZ`、`ZU`、`UF`、`FZ`、`ZF`、`FF`，两两不同。因此所有长度至少为 $2$ 的同长度子串也两两不同。\n\n它的价值为 $3+9+8+7+6+5+4+3+2+1=48$，达到了各长度子串数量上界的总和。",
      "testArchive": {
        "file": "shenzhuo-round3-20260920-tests.zip",
        "prefix": "P8",
        "count": 10,
        "score": 10
      },
      "difficulty": "普及+/提高-"
    },
    {
      "id": "FZU20260920R3I",
      "letter": "I",
      "name": "质数拼接计数（Hard Version）",
      "title": "质数拼接计数（Hard Version）",
      "score": 100,
      "tests": 10,
      "sampleInput": "30",
      "sampleOutput": "4",
      "statement": "# I. 质数拼接计数（Hard Version）（100分）\n\n\n**原题链接：** https://oj.fzu.edu.cn/p/519?tid=6aae8b3ae943a1ff033c9de5  \n**题目类型：** 传统题　 **时间限制：** 5000 ms　 **内存限制：** 512 MiB\n\n### 质数拼接计数\n\n#### 请注意两题的计数方式略有不同\n\n设 $A$ 和 $B$ 均为质数。将它们的十进制表示直接拼接，不插入任何字符或前导零，得到一个新的整数，记为 $A\\Vert B$。\n\n例如，$2\\Vert3=23$，$11\\Vert7=117$，$23\\Vert7=237$。\n\n给定一个正整数 $n$，你的任务是求满足\n\n$$A\\Vert B\\le n$$\n\n的**有序质数对** $(A,B)$ 的数量。\n\n$A$ 和 $B$ 可以相同，且不要求拼接结果 $A\\Vert B$ 本身是质数。有序数对中的顺序有意义：当 $A\\ne B$ 时，$(A,B)$ 与 $(B,A)$ 是不同的数对，它们是否满足条件需要分别判断。\n\n**不同的质数对需要分别计数，即使它们拼接后得到的整数相同。**例如，$2\\Vert37=237$，同时 $23\\Vert7=237$。因此，当 $n\\ge237$ 时，$(2,37)$ 和 $(23,7)$ 都应分别计入答案。\n\n### 输入格式\n\n输入一行，包含一个正整数 $n$（$1\\le n\\le10^{12}$）。\n\n### 输出格式\n\n输出一行，包含一个整数，表示满足条件的有序质数对 $(A,B)$ 的数量。\n\n### 样例\n\n#### 样例 1 输入\n\n```text\n30\n```\n\n#### 样例 1 输出\n\n```text\n4\n```\n\n#### 样例 1 说明\n\n满足条件的有序质数对为 $(2,2),(2,3),(2,5),(2,7)$，它们分别拼接得到 $22,23,25,27$，因此答案为 $4$。\n\n#### 样例 2 输入\n\n```text\n237\n```\n\n#### 样例 2 输出\n\n```text\n44\n```\n\n#### 样例 2 说明\n\n$(2,37)$ 与 $(23,7)$ 虽然都拼接得到 $237$，但需要分别计数。",
      "testArchive": {
        "file": "shenzhuo-round3-20260920-tests.zip",
        "prefix": "P9",
        "count": 10,
        "score": 10
      },
      "difficulty": "省选/NOI-",
      "difficultyNote": "人工评级，暂定"
    },
    {
      "id": "FZU20260920R3J",
      "letter": "J",
      "name": "质数拼接计数（Easy Version）",
      "title": "质数拼接计数（Easy Version）",
      "score": 100,
      "tests": 10,
      "sampleInput": "30",
      "sampleOutput": "4",
      "statement": "# J. 质数拼接计数（Easy Version）（100分）\n\n\n**原题链接：** https://oj.fzu.edu.cn/p/517?tid=6aae8b3ae943a1ff033c9de5  \n**题目类型：** 传统题　 **时间限制：** 3000 ms　 **内存限制：** 256 MiB\n\n### 质数拼接好数\n\n#### 请注意两题的计数方式略有不同\n\n设 $A$ 和 $B$ 均为**质数**，将它们的十进制表示**直接拼接**，不插入任何符号或前导零，得到一个新的整数，记为 $AB$。\n\n如果一个整数可以表示为这样的 $AB$，则称它为**好数**。\n\n例如，$A=2,B=3$ 时，拼接结果为 $23$；$A=11,B=7$ 时，拼接结果为 $117$。这里的 $AB$ 表示十进制拼接，**不是乘法**，也不要求拼接结果本身是质数。\n\n给定一个正整数 $n$，求不超过 $n$ 的好数的个数。\n\n注意：$A$ 和 $B$ 可以相同。即使一个好数存在多种合法拆分方式，也只计数一次。例如，$237$ 可以由 $2$ 和 $37$ 拼接，也可以由 $23$ 和 $7$ 拼接，但它只算一个好数。\n\n### 输入格式\n\n输入一行，包含一个正整数 $n$（$1\\le n\\le 10^8$）。\n\n### 输出格式\n\n输出一行，包含一个整数，表示小于等于 $n$ 的好数的数量。\n\n### 样例\n\n#### 样例 1 输入\n\n```text\n30\n```\n\n#### 样例 1 输出\n\n```text\n4\n```\n\n#### 样例 1 说明\n\n不超过 $30$ 的好数分别是 $22,23,25,27$，共 $4$ 个。",
      "testArchive": {
        "file": "shenzhuo-round3-20260920-tests.zip",
        "prefix": "P10",
        "count": 10,
        "score": 10
      },
      "difficulty": "普及+/提高-"
    },
    {
      "id": "FZU20260920R3K",
      "letter": "K",
      "name": "FZU 子串（Hard Version）",
      "title": "FZU 子串（Hard Version）",
      "score": 100,
      "tests": 10,
      "sampleInput": "1",
      "sampleOutput": "F",
      "statement": "# K. FZU 子串（Hard Version）（100分）\n\n\n**原题链接：** https://oj.fzu.edu.cn/p/521?tid=6aae8b3ae943a1ff033c9de5  \n**题目类型：** 传统题　 **时间限制：** 3000 ms　 **内存限制：** 256 MiB\n\n给定一个正整数 $n$。\n\n对于一个仅由 `F`、`Z`、`U` 三种字符组成的字符串 $S$，定义它的价值为其中本质不同的非空子串数量。\n\n子串是从原字符串中取出的一段连续字符。两个子串本质不同，当且仅当它们作为字符串不完全相同。相同的子串即使出现在不同位置，也只计数一次。\n\n例如，字符串 `FZF` 的本质不同非空子串为 `F`、`Z`、`FZ`、`ZF`、`FZF`，因此它的价值为 $5$。\n\n请构造一个长度恰好为 $n$、且仅由 `F`、`Z`、`U` 组成的字符串，使它的价值在所有满足条件的字符串中最大。\n\n### 输入格式\n\n输入一行，包含一个整数 $n$（$1\\le n\\le 2\\times 10^5$）。\n\n### 输出格式\n\n输出一行，包含一个长度恰好为 $n$、且仅由 `F`、`Z`、`U` 组成的字符串，表示你构造的方案。\n\n如果有多种最优方案，输出任意一种即可。你不需要输出字符串的价值。\n\n### 样例\n\n#### 样例 1 输入\n\n```text\n1\n```\n\n#### 样例 1 输出\n\n```text\nF\n```\n\n#### 样例 1 说明\n\n字符串 `F` 只有一个非空子串，价值为 $1$，已达到最大值。\n\n#### 样例 2 输入\n\n```text\n5\n```\n\n#### 样例 2 输出\n\n```text\nFZUUF\n```\n\n#### 样例 2 说明\n\n其中长度为 $1$ 的不同子串有 $3$ 个，长度为 $2$ 的不同子串为 `FZ`、`ZU`、`UU`、`UF`，有 $4$ 个；长度为 $3,4,5$ 的子串分别有 $3,2,1$ 个，且同长度的子串互不相同。\n\n因此价值为 $3+4+3+2+1=13$。任意长度为 $5$ 的合法字符串，在这五种长度下的不同子串数量分别不超过 $3,4,3,2,1$，所以这已经是最大值。\n\n#### 样例 3 输入\n\n```text\n10\n```\n\n#### 样例 3 输出\n\n```text\nFUUZZUFZFF\n```\n\n#### 样例 3 说明\n\n其中三种字符均有出现，九个长度为 $2$ 的子串依次为 `FU`、`UU`、`UZ`、`ZZ`、`ZU`、`UF`、`FZ`、`ZF`、`FF`，两两不同，因此所有长度至少为 $2$ 的同长度子串也两两不同。\n\n它的价值为 $3+9+8+7+6+5+4+3+2+1=48$，达到了各长度子串数量上界的总和。",
      "testArchive": {
        "file": "shenzhuo-round3-20260920-tests.zip",
        "prefix": "P11",
        "count": 10,
        "score": 10
      },
      "judgeable": false,
      "requiresSpecialJudge": true,
      "judgeNote": "K允许任意正确构造，不可按文本比较；需要独立SPJ/自定义判题接入。",
      "difficulty": "提高+/省选-",
      "difficultyNote": "人工评级，暂定",
      "unjudgeableReason": "本题允许多种正确构造，需要特殊判题器；本站暂未接入，可前往 FZU 原站作答。"
    }
  ]
};
  const archive = window.OMS_EXAM_ARCHIVE || (window.OMS_EXAM_ARCHIVE = []);
  const existing = archive.findIndex(exam => exam.examVersion === data.examVersion);
  const others = [window.OMS_EXAM_DATA, ...archive].filter(exam => exam && exam.examVersion !== data.examVersion);
  const exam = window.OMS_NUMBER_EXAM ? window.OMS_NUMBER_EXAM(data, others, { newBatch: true }) : data;
  if (existing >= 0) archive[existing] = exam;
  else archive.unshift(exam);
})();
