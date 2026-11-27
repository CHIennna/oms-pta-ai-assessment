(() => {
  const exam = {
  "examVersion": "2025-shuzhi-freshman-exam",
  "title": "2025数智实验班机试（大一）",
  "type": "OI",
  "rule": "OI",
  "category": "past",
  "duration": 90,
  "totalScore": 600,
  "author": "本站集备组",
  "introduction": "依据六道截图题面制作的自建可评测训练卷。每题100分，10个独立测试点，每点10分。试卷存在明确的补全与勘误说明。",
  "questions": [
    {
      "id": 2026111901,
      "letter": "1-1",
      "name": "三位数反转",
      "difficulty": "入门",
      "title": "三位数反转",
      "score": 100,
      "tests": 10,
      "sampleInput": "123",
      "sampleOutput": "321",
      "statement": "### 题目描述\n\n给定一个三位正整数 $x$，将其十进制数位顺序反转，输出所得的整数。反转后的前导零不予保留。\n\n例如，$123$ 反转后为 $321$；$700$ 反转后的数字序列为 `007`，作为整数输出为 $7$。\n\n### 输入格式\n\n输入一行一个整数 $x$。\n\n### 输出格式\n\n输出一行一个整数，表示反转后的结果。\n\n### 数据范围\n\n$100\\le x\\le999$。\n\n### 输入样例 1\n\n```text\n123\n```\n\n### 输出样例 1\n\n```text\n321\n```\n\n### 输入样例 2\n\n```text\n700\n```\n\n### 输出样例 2\n\n```text\n7\n```",
      "timeLimitMs": 1000,
      "memoryLimitMB": 256,
      "testArchive": {
        "file": "2026-11-19-t1-t6-tests.zip",
        "prefix": "P1",
        "count": 10,
        "score": 10
      },
      "judgeable": true
    },
    {
      "id": 2026111902,
      "letter": "1-2",
      "name": "奇偶数统计",
      "difficulty": "入门",
      "title": "奇偶数统计",
      "score": 100,
      "tests": 10,
      "sampleInput": "0 1 2 3 4 5 6 7 8 9",
      "sampleOutput": "5 5",
      "statement": "### 题目描述\n\n给定恰好 10 个非负整数，统计其中奇数和偶数的数量。数字 $0$ 计为偶数。\n\n### 输入格式\n\n输入一行 10 个非负整数，以空格分隔。\n\n### 输出格式\n\n输出一行两个整数，依次为奇数数量和偶数数量，中间以一个空格分隔。\n\n### 数据范围\n\n每个输入整数均在有符号 32 位整数范围内，即 $0\\le a_i\\le 2147483647$。\n\n### 输入样例\n\n```text\n0 1 2 3 4 5 6 7 8 9\n```\n\n### 输出样例\n\n```text\n5 5\n```",
      "timeLimitMs": 1000,
      "memoryLimitMB": 256,
      "testArchive": {
        "file": "2026-11-19-t1-t6-tests.zip",
        "prefix": "P2",
        "count": 10,
        "score": 10
      },
      "judgeable": true
    },
    {
      "id": 2026111903,
      "letter": "1-3",
      "name": "小于平均数的元素",
      "difficulty": "入门",
      "title": "小于平均数的元素",
      "score": 100,
      "tests": 10,
      "sampleInput": "6\n-5 2 7 -1 3 0",
      "sampleOutput": "-5 -1 0",
      "statement": "### 题目描述\n\n给定一个长度为 $n$ 的整数序列，求所有**严格小于该序列算术平均值**的元素，按照它们在原序列中的出现顺序输出。算术平均值使用精确的数学定义，不进行四舍五入或向下取整。\n\n### 输入格式\n\n第一行输入整数 $n$。第二行输入 $n$ 个整数 $a_1,a_2,\\ldots,a_n$。\n\n### 输出格式\n\n输出一行所有严格小于平均值的元素，相邻元素以一个空格分隔。若不存在符合条件的元素，输出一个空行。\n\n### 数据范围\n\n$1\\le n\\le 200000$，$-10^9\\le a_i\\le10^9$。\n\n### 输入样例\n\n```text\n6\n-5 2 7 -1 3 0\n```\n\n### 输出样例\n\n```text\n-5 -1 0\n```",
      "timeLimitMs": 2000,
      "memoryLimitMB": 256,
      "testArchive": {
        "file": "2026-11-19-t1-t6-tests.zip",
        "prefix": "P3",
        "count": 10,
        "score": 10
      },
      "judgeable": true
    },
    {
      "id": 2026111904,
      "letter": "1-4",
      "name": "删除元素后字典序最小",
      "difficulty": "普及",
      "title": "删除元素后字典序最小",
      "score": 100,
      "tests": 10,
      "sampleInput": "5 2\n1 4 2 5 3",
      "sampleOutput": "1 2 3",
      "statement": "### 题目描述\n\n给定长度为 $n$ 的整数序列 $A$，从中**恰好删除 $k$ 个元素**，其余元素保持原有相对顺序。求可以获得的字典序最小的长度为 $n-k$ 的序列。\n\n两个等长整数序列按字典序比较时，从左到右找到第一个不相同的位置，该位置数字较小的序列字典序更小。整数按数值比较，可为负数。\n\n### 输入格式\n\n第一行输入两个整数 $n,k$。第二行输入 $n$ 个整数 $a_1,a_2,\\ldots,a_n$。\n\n### 输出格式\n\n输出一行 $n-k$ 个整数，以空格分隔。若 $k=n$，输出一个空行。\n\n### 数据范围\n\n$2\\le n\\le200000$，$0\\le k\\le n$，$-2^{31}\\le a_i\\le2^{31}-1$。\n\n### 输入样例\n\n```text\n5 2\n1 4 2 5 3\n```\n\n### 输出样例\n\n```text\n1 2 3\n```",
      "timeLimitMs": 2000,
      "memoryLimitMB": 256,
      "testArchive": {
        "file": "2026-11-19-t1-t6-tests.zip",
        "prefix": "P4",
        "count": 10,
        "score": 10
      },
      "judgeable": true
    },
    {
      "id": 2026111905,
      "letter": "1-5",
      "name": "消灭怪物的最少回合数",
      "difficulty": "普及+/提高-",
      "title": "消灭怪物的最少回合数",
      "score": 100,
      "tests": 10,
      "sampleInput": "3\n3 4 7\n1 2 3\n1 1 1",
      "sampleOutput": "2",
      "statement": "### 题目描述\n\n有 $n$ 名战士和 $n$ 只怪物。第 $i$ 名战士只攻击第 $i$ 只怪物，怪物初始血量为 $h_i$，战士的基础攻击力为 $a_i$。\n\n每个回合中，所有战士同时对各自的怪物进行一次基础攻击，造成 $a_i$ 点伤害。此外，**每个回合至多选择一名战士**，使其在本回合的伤害额外增加 $b_i$。本回合的增益不会保留到下一回合；可以在不同回合选择不同战士，也可以多次选择同一战士。已经被消灭的怪物不需要继续攻击。\n\n当全部怪物的累计受伤量均不小于各自初始血量时，战斗结束。求至少需要多少个回合。\n\n### 输入格式\n\n第一行输入整数 $n$。第二行输入 $n$ 个整数 $h_i$；第三行输入 $n$ 个整数 $a_i$；第四行输入 $n$ 个整数 $b_i$。\n\n### 输出格式\n\n输出一个整数，表示最少回合数。\n\n### 数据范围\n\n$1\\le n\\le10^5$，$1\\le h_i\\le10^9$，$1\\le a_i,b_i\\le10^5$。\n\n### 输入样例\n\n```text\n3\n3 4 7\n1 2 3\n1 1 1\n```\n\n### 输出样例\n\n```text\n2\n```",
      "timeLimitMs": 2000,
      "memoryLimitMB": 256,
      "testArchive": {
        "file": "2026-11-19-t1-t6-tests.zip",
        "prefix": "P5",
        "count": 10,
        "score": 10
      },
      "judgeable": true
    },
    {
      "id": 2026111906,
      "letter": "1-6",
      "name": "满足性质 A 的子串总长度",
      "difficulty": "普及",
      "title": "满足性质 A 的子串总长度",
      "score": 100,
      "tests": 10,
      "sampleInput": "abcaba",
      "sampleOutput": "17",
      "statement": "### 题目描述\n\n给定一个字符串 $s$。对于其中的一个**长度至少为 2** 的连续子串 $s_l,s_{l+1},\\ldots,s_r$（$l<r$），如果它的首字符和尾字符相同，即 $s_l=s_r$，就称该子串满足性质 A。\n\n求所有满足性质 A 的子串的长度之和。不同的起止位置对应不同子串，即使子串内容相同，也应分别计入。\n\n### 输入格式\n\n输入一行一个非空字符串 $s$，其中不包含空白字符，由可打印 ASCII 字符组成。\n\n### 输出格式\n\n输出一行一个整数，表示满足性质 A 的所有子串长度之和。\n\n### 数据范围\n\n$1\\le |s|\\le10^5$。答案可能超过 32 位整数范围。\n\n### 输入样例\n\n```text\nabcaba\n```\n\n### 输出样例\n\n```text\n17\n```\n\n### 样例说明\n\n满足条件的子串是 `abca`、`abcaba`、`aba` 和 `bcab`，长度之和为 $4+6+3+4=17$。长度为 1 的子串不计入。",
      "timeLimitMs": 1000,
      "memoryLimitMB": 256,
      "testArchive": {
        "file": "2026-11-19-t1-t6-tests.zip",
        "prefix": "P6",
        "count": 10,
        "score": 10
      },
      "judgeable": true
    }
  ],
  "date": "2025",
  "status": "历年卷"
};
  const archive = window.OMS_EXAM_ARCHIVE || (window.OMS_EXAM_ARCHIVE = []);
  const index = archive.findIndex(item => item.examVersion === exam.examVersion);
  const registry = [window.OMS_EXAM_DATA, ...archive].filter(Boolean);
  const numbered = window.OMS_NUMBER_EXAM ? window.OMS_NUMBER_EXAM(exam, registry) : exam;
  if (index >= 0) archive[index] = numbered;
  else archive.push(numbered);
})();
