window.OMS_EXAM_DATA = {
  "examVersion": "2026-10-04-first-weekly-practice",
  "title": "2026-10-04 转专业第一次周练",
  "duration": 120,
  "totalScore": 100,
  "questions": [
    {
      "id": "1001",
      "name": "迟到统计",
      "score": 8,
      "tests": 5,
      "sampleInput": "",
      "sampleOutput": "",
      "statement": "## 题目描述\n\n某课程进行了 `n` 次签到。规定上课时间为 8:00。\n\n每次签到给出一名学生到达的时间 `h m`。若到达时间晚于 8:00，则记为迟到；8:00 到达不算迟到。\n\n请统计迟到人数，并计算所有迟到学生一共迟到了多少分钟。\n\n## 输入格式\n\n第一行一个整数 `n`。\n\n接下来 `n` 行，每行两个整数 `h,m`，表示到达时间。\n\n## 输出格式\n\n输出两个整数：\n\n```text\n迟到人数 总迟到分钟数\n```\n\n## 数据范围\n\n```text\n1<=n<=1000\n0<=h<=23\n0<=m<=59\n```\n\n## 样例输入\n\n```text\n5\n7 58\n8 0\n8 12\n9 3\n7 50\n```\n\n## 样例输出\n\n```text\n2 75\n```",
      "testCases": [
        {
          "input": "5\n7 58\n8 0\n8 12\n9 3\n7 50",
          "expected": "2 75",
          "score": 2
        },
        {
          "input": "5\n7 30\n8 0\n0 0\n7 59\n6 45",
          "expected": "0 0",
          "score": 1
        },
        {
          "input": "4\n8 1\n8 30\n9 0\n10 15",
          "expected": "4 226",
          "score": 2
        },
        {
          "input": "6\n7 59\n8 0\n8 1\n8 59\n9 0\n23 59",
          "expected": "4 1079",
          "score": 1
        },
        {
          "input": "8\n12 0\n8 2\n7 0\n11 59\n8 0\n15 30\n9 15\n6 30",
          "expected": "5 1006",
          "score": 2
        }
      ]
    },
    {
      "id": "1002",
      "name": "循环计数器",
      "score": 8,
      "tests": 5,
      "sampleInput": "",
      "sampleOutput": "",
      "statement": "## 题目描述\n\n有一个计数器，初始值为 `0`，它的取值范围为 `0~m-1`。\n\n接下来执行 `n` 次操作：\n\n```text\n+ x\n```\n\n表示计数器向前移动 `x` 格；\n\n```text\n- x\n```\n\n表示计数器向后移动 `x` 格。\n\n计数器是循环的。例如当 `m=10` 时，从 `8` 向前移动 `5` 格后变成 `3`；从 `2` 向后移动 `4` 格后变成 `8`。\n\n输出所有操作结束后的计数器值。\n\n## 输入格式\n\n第一行两个整数 `n,m`。\n\n接下来 `n` 行，每行一个字符 `op` 和一个整数 `x`。\n\n## 输出格式\n\n输出最终计数器的值。\n\n## 数据范围\n\n```text\n1<=n<=1000\n2<=m<=100000\n0<=x<=10^9\n```\n\n## 样例输入\n\n```text\n4 10\n+ 8\n+ 5\n- 4\n+ 13\n```\n\n## 样例输出\n\n```text\n2\n```",
      "testCases": [
        {
          "input": "4 10\n+ 8\n+ 5\n- 4\n+ 13",
          "expected": "2",
          "score": 2
        },
        {
          "input": "3 10\n- 1\n- 20\n+ 3",
          "expected": "2",
          "score": 1
        },
        {
          "input": "4 7\n+ 14\n+ 1\n- 8\n+ 100",
          "expected": "2",
          "score": 2
        },
        {
          "input": "5 100000\n+ 1000000000\n- 999999999\n+ 123456789\n- 56790\n+ 100000",
          "expected": "0",
          "score": 1
        },
        {
          "input": "6 5\n+ 4\n+ 4\n+ 4\n- 3\n- 8\n+ 12",
          "expected": "3",
          "score": 2
        }
      ]
    },
    {
      "id": "1003",
      "name": "连续字符",
      "score": 10,
      "tests": 6,
      "sampleInput": "",
      "sampleOutput": "",
      "statement": "## 题目描述\n\n给定一个只包含大小写英文字母和数字的字符串。\n\n请找到其中最长的一段连续相同字符，输出这个字符以及它连续出现的次数。\n\n若存在多段长度相同的最长连续段，输出最先出现的一段。\n\n## 输入格式\n\n输入一行字符串 `s`。\n\n## 输出格式\n\n输出：\n\n```text\n字符 连续次数\n```\n\n## 数据范围\n\n```text\n1<=|s|<=100000\n```\n\n## 样例输入\n\n```text\nabbbcc1111ddd\n```\n\n## 样例输出\n\n```text\n1 4\n```",
      "testCases": [
        {
          "input": "abbbcc1111ddd",
          "expected": "1 4",
          "score": 2
        },
        {
          "input": "aaaaa",
          "expected": "a 5",
          "score": 1
        },
        {
          "input": "aabbccdd",
          "expected": "a 2",
          "score": 2
        },
        {
          "input": "Z9ZZ9999aa",
          "expected": "9 4",
          "score": 2
        },
        {
          "input": "aA111bbBBBB22222c",
          "expected": "2 5",
          "score": 1
        },
        {
          "input": "xYYzzzzYYxxxx",
          "expected": "z 4",
          "score": 2
        }
      ]
    },
    {
      "id": "1004",
      "name": "最近的训练成绩",
      "score": 12,
      "tests": 6,
      "sampleInput": "",
      "sampleOutput": "",
      "statement": "## 题目描述\n\n教练保存了 `n` 个历史训练成绩。\n\n现在进行 `q` 次查询。每次给出一个目标成绩 `x`，需要找到历史成绩中与 `x` 差的绝对值最小的成绩。\n\n若有两个成绩与 `x` 的距离相同，输出较小的那个。\n\n## 输入格式\n\n第一行两个整数 `n,q`。\n\n第二行 `n` 个整数，表示历史成绩。\n\n接下来 `q` 行，每行一个整数 `x`。\n\n## 输出格式\n\n对于每次查询，输出一个答案，每个答案占一行。\n\n## 数据范围\n\n```text\n1<=n,q<=100000\n0<=成绩,x<=10^9\n```\n\n## 样例输入\n\n```text\n5 4\n20 3 15 40 27\n18\n25\n2\n50\n```\n\n## 样例输出\n\n```text\n20\n27\n3\n40\n```",
      "testCases": [
        {
          "input": "5 4\n20 3 15 40 27\n18\n25\n2\n50",
          "expected": "20\n27\n3\n40",
          "score": 2
        },
        {
          "input": "4 5\n10 20 30 40\n15\n25\n35\n5\n45",
          "expected": "10\n20\n30\n10\n40",
          "score": 2
        },
        {
          "input": "6 5\n5 5 5 100 100 50\n5\n6\n75\n99\n100",
          "expected": "5\n5\n50\n100\n100",
          "score": 2
        },
        {
          "input": "1 4\n123456789\n0\n123456789\n1000000000\n123456788",
          "expected": "123456789\n123456789\n123456789\n123456789",
          "score": 2
        },
        {
          "input": "3 4\n0 1000000000 500000000\n250000000\n750000000\n499999999\n500000001",
          "expected": "0\n500000000\n500000000\n500000000",
          "score": 2
        },
        {
          "input": "8 5\n42 7 19 88 63 31 55 100\n1\n24\n47\n72\n94",
          "expected": "7\n19\n42\n63\n88",
          "score": 2
        }
      ]
    },
    {
      "id": "1005",
      "name": "任务处理器",
      "score": 12,
      "tests": 5,
      "sampleInput": "",
      "sampleOutput": "",
      "statement": "## 题目描述\n\n一个任务处理器需要维护若干等待执行的任务。\n\n每个任务有一个正整数编号。\n\n共有 `n` 次操作：\n\n```text\n1 x\n```\n\n表示加入编号为 `x` 的任务。\n\n```text\n2\n```\n\n表示执行当前编号最小的任务，并将它删除。\n\n```text\n3\n```\n\n表示输出当前编号最小的任务，但不删除它。\n\n保证执行操作 `2` 或 `3` 时至少存在一个任务。\n\n注意：不同任务可以具有相同编号。\n\n## 输入格式\n\n第一行一个整数 `n`。\n\n接下来 `n` 行，每行表示一次操作。\n\n## 输出格式\n\n对于每一个操作 `3`，输出当前最小任务编号。\n\n## 数据范围\n\n```text\n1<=n<=200000\n1<=x<=10^9\n```\n\n## 样例输入\n\n```text\n8\n1 7\n1 3\n1 10\n3\n2\n3\n1 2\n3\n```\n\n## 样例输出\n\n```text\n3\n7\n2\n```",
      "testCases": [
        {
          "input": "8\n1 7\n1 3\n1 10\n3\n2\n3\n1 2\n3",
          "expected": "3\n7\n2",
          "score": 2
        },
        {
          "input": "10\n1 5\n1 5\n1 3\n3\n2\n3\n2\n3\n1 2\n3",
          "expected": "3\n5\n5\n2",
          "score": 3
        },
        {
          "input": "8\n1 10\n3\n2\n1 7\n3\n1 2\n3\n2",
          "expected": "10\n7\n2",
          "score": 2
        },
        {
          "input": "12\n1 9\n1 1\n1 8\n1 2\n1 7\n1 3\n3\n2\n3\n2\n3\n2",
          "expected": "1\n2\n3",
          "score": 2
        },
        {
          "input": "8\n1 1000000000\n1 999999999\n1 1000000000\n3\n2\n3\n1 1\n3",
          "expected": "999999999\n1000000000\n1",
          "score": 3
        }
      ]
    },
    {
      "id": "1006",
      "name": "朋友圈",
      "score": 14,
      "tests": 6,
      "sampleInput": "",
      "sampleOutput": "",
      "statement": "## 题目描述\n\n学校中有 `n` 名学生，编号为 `1~n`。\n\n开始时每个人都只属于自己的朋友圈。\n\n之后发生 `m` 个事件：\n\n```text\n1 x y\n```\n\n表示学生 `x` 和学生 `y` 所在的两个朋友圈建立联系。从此以后，这两个朋友圈中的所有人都属于同一个朋友圈。\n\n```text\n2 x y\n```\n\n询问学生 `x` 和学生 `y` 当前是否属于同一个朋友圈。\n\n若属于，输出：\n\n```text\nYES\n```\n\n否则输出：\n\n```text\nNO\n```\n\n## 输入格式\n\n第一行两个整数 `n,m`。\n\n接下来 `m` 行，每行三个整数 `op,x,y`。\n\n## 输出格式\n\n对于每个查询操作输出一行结果。\n\n## 数据范围\n\n```text\n1<=n,m<=200000\n1<=x,y<=n\n```\n\n## 样例输入\n\n```text\n5 6\n1 1 2\n1 3 4\n2 1 3\n1 2 3\n2 1 4\n2 4 5\n```\n\n## 样例输出\n\n```text\nNO\nYES\nNO\n```",
      "testCases": [
        {
          "input": "5 6\n1 1 2\n1 3 4\n2 1 3\n1 2 3\n2 1 4\n2 4 5",
          "expected": "NO\nYES\nNO",
          "score": 2
        },
        {
          "input": "4 6\n2 1 2\n1 1 2\n2 1 2\n1 2 3\n2 1 3\n2 3 4",
          "expected": "NO\nYES\nYES\nNO",
          "score": 2
        },
        {
          "input": "6 9\n1 1 2\n1 2 3\n1 4 5\n2 1 3\n2 3 4\n1 3 4\n2 1 5\n1 1 5\n2 2 4",
          "expected": "YES\nNO\nYES\nYES",
          "score": 2
        },
        {
          "input": "5 8\n1 1 2\n1 3 4\n1 4 5\n2 3 5\n2 1 5\n1 2 3\n2 1 5\n2 2 4",
          "expected": "YES\nNO\nYES\nYES",
          "score": 3
        },
        {
          "input": "3 5\n2 1 1\n2 2 2\n1 1 2\n2 1 2\n2 2 3",
          "expected": "YES\nYES\nYES\nNO",
          "score": 2
        },
        {
          "input": "8 10\n1 1 2\n1 3 4\n1 5 6\n1 7 8\n2 1 8\n1 2 3\n1 6 7\n2 1 4\n2 5 8\n2 4 5",
          "expected": "NO\nYES\nYES\nNO",
          "score": 3
        }
      ]
    },
    {
      "id": "1007",
      "name": "实验器材",
      "score": 16,
      "tests": 7,
      "sampleInput": "",
      "sampleOutput": "",
      "statement": "## 题目描述\n\n实验室中共有 `n` 件器材。\n\n第 `i` 件器材占用 `w[i]` 单位空间，可以获得 `v[i]` 点实验价值。\n\n背包最多能够容纳 `W` 单位空间，每件器材最多选择一次。\n\n请计算最多可以获得多少实验价值。\n\n## 输入格式\n\n第一行两个整数 `n,W`。\n\n第二行 `n` 个整数：\n\n```text\nw[1],w[2],...,w[n]\n```\n\n第三行 `n` 个整数：\n\n```text\nv[1],v[2],...,v[n]\n```\n\n## 输出格式\n\n输出最大实验价值。\n\n## 数据范围\n\n```text\n1<=n<=100\n1<=W<=10000\n1<=w[i]<=W\n1<=v[i]<=10000\n```\n\n## 样例输入\n\n```text\n4 7\n2 3 4 5\n3 4 5 8\n```\n\n## 样例输出\n\n```text\n11\n```",
      "testCases": [
        {
          "input": "4 7\n2 3 4 5\n3 4 5 8",
          "expected": "11",
          "score": 2
        },
        {
          "input": "3 5\n1 2 3\n6 10 12",
          "expected": "22",
          "score": 2
        },
        {
          "input": "4 5\n5 4 3 2\n10 40 50 35",
          "expected": "85",
          "score": 2
        },
        {
          "input": "5 10\n2 2 6 5 4\n6 3 5 4 6",
          "expected": "15",
          "score": 2
        },
        {
          "input": "4 1\n1 1 1 1\n1 5 3 4",
          "expected": "5",
          "score": 2
        },
        {
          "input": "2 10\n5 6\n10 12",
          "expected": "12",
          "score": 3
        },
        {
          "input": "4 9\n2 4 6 7\n3 8 9 10",
          "expected": "13",
          "score": 3
        }
      ]
    },
    {
      "id": "1008",
      "name": "逃离数字迷宫",
      "score": 20,
      "tests": 8,
      "sampleInput": "",
      "sampleOutput": "",
      "statement": "## 题目描述\n\n你现在位于数字 `s`。\n\n每进行一步，可以进行以下三种操作之一：\n\n```text\nx -> x-1\nx -> x+1\nx -> 2*x\n```\n\n要求数字在整个过程中始终处于：\n\n```text\n0<=x<=100000\n```\n\n给定目标数字 `t`，求从 `s` 到达 `t` 最少需要多少步。\n\n## 输入格式\n\n输入两个整数：\n\n```text\ns t\n```\n\n## 输出格式\n\n输出最少操作次数。\n\n## 数据范围\n\n```text\n0<=s,t<=100000\n```\n\n## 样例输入\n\n```text\n5 17\n```\n\n## 样例输出\n\n```text\n4\n```\n\n例如可以经过：\n\n```text\n5 -> 4 -> 8 -> 16 -> 17\n```",
      "testCases": [
        {
          "input": "5 17",
          "expected": "4",
          "score": 2
        },
        {
          "input": "42 42",
          "expected": "0",
          "score": 1
        },
        {
          "input": "10 3",
          "expected": "7",
          "score": 3
        },
        {
          "input": "0 7",
          "expected": "5",
          "score": 2
        },
        {
          "input": "1 100000",
          "expected": "21",
          "score": 4
        },
        {
          "input": "99999 100000",
          "expected": "1",
          "score": 2
        },
        {
          "input": "7 31",
          "expected": "4",
          "score": 3
        },
        {
          "input": "37 59",
          "expected": "9",
          "score": 3
        }
      ]
    }
  ]
};
window.OMS_EXAM_ARCHIVE = [
  {
    "examVersion": "legacy-demo",
    "title": "程序设计基础上机考试",
    "date": "2026-09-29",
    "duration": 120,
    "totalScore": 95,
    "status": "已结束",
    "questions": [
      { "id": "1001", "name": "打印沙漏", "score": 20 },
      { "id": "1002", "name": "写出这个数", "score": 20 },
      { "id": "1003", "name": "个位数统计", "score": 20 },
      { "id": "1004", "name": "成绩转换", "score": 15 },
      { "id": "1005", "name": "继续(3n+1)猜想", "score": 20 }
    ]
  }
];
