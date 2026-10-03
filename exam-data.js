window.OMS_EXAM_DATA = {
  "examVersion": "2026-10-04-first-weekly-practice-800",
  "title": "2026-10-04 转专业第一次周练",
  "duration": 120,
  "totalScore": 800,
  "questions": [
    {
      "id": "1001",
      "name": "迟到统计",
      "score": 100,
      "tests": 10,
      "sampleInput": "5\n7 58\n8 0\n8 12\n9 3\n7 50",
      "sampleOutput": "2 75",
      "statement": "## 题目描述\n\n某课程进行了 `n` 次签到。规定上课时间为 8:00。\n\n每次签到给出一名学生到达的时间 `h m`。若到达时间晚于 8:00，则记为迟到；8:00 到达不算迟到。\n\n请统计迟到人数，并计算所有迟到学生一共迟到了多少分钟。\n\n## 输入格式\n\n第一行一个整数 `n`。\n\n接下来 `n` 行，每行两个整数 `h,m`，表示到达时间。\n\n## 输出格式\n\n输出两个整数：\n\n```text\n迟到人数 总迟到分钟数\n```\n\n## 数据范围\n\n```text\n1<=n<=1000\n0<=h<=23\n0<=m<=59\n```\n\n## 样例输入\n\n```text\n5\n7 58\n8 0\n8 12\n9 3\n7 50\n```\n\n## 样例输出\n\n```text\n2 75\n```",
      "testCases": [
        {
          "input": "5\n7 58\n8 0\n8 12\n9 3\n7 50",
          "expected": "2 75",
          "score": 10
        },
        {
          "input": "5\n7 30\n8 0\n0 0\n7 59\n6 45",
          "expected": "0 0",
          "score": 10
        },
        {
          "input": "4\n8 1\n8 30\n9 0\n10 15",
          "expected": "4 226",
          "score": 10
        },
        {
          "input": "6\n7 59\n8 0\n8 1\n8 59\n9 0\n23 59",
          "expected": "4 1079",
          "score": 10
        },
        {
          "input": "8\n12 0\n8 2\n7 0\n11 59\n8 0\n15 30\n9 15\n6 30",
          "expected": "5 1006",
          "score": 10
        },
        {
          "input": "7\n8 5\n8 10\n8 15\n8 20\n8 25\n8 30\n8 35",
          "expected": "7 140",
          "score": 10
        },
        {
          "input": "6\n8 0\n8 0\n8 0\n8 0\n8 0\n8 1",
          "expected": "1 1",
          "score": 10
        },
        {
          "input": "5\n9 30\n10 45\n12 0\n16 20\n23 0",
          "expected": "5 1895",
          "score": 10
        },
        {
          "input": "1\n8 37",
          "expected": "1 37",
          "score": 10
        },
        {
          "input": "10\n7 50\n8 0\n8 3\n8 17\n9 20\n10 0\n6 30\n12 40\n8 1\n7 59",
          "expected": "6 501",
          "score": 10
        }
      ]
    },
    {
      "id": "1002",
      "name": "循环计数器",
      "score": 100,
      "tests": 10,
      "sampleInput": "4 10\n+ 8\n+ 5\n- 4\n+ 13",
      "sampleOutput": "2",
      "statement": "## 题目描述\n\n有一个计数器，初始值为 `0`，它的取值范围为 `0~m-1`。\n\n接下来执行 `n` 次操作：\n\n```text\n+ x\n```\n\n表示计数器向前移动 `x` 格；\n\n```text\n- x\n```\n\n表示计数器向后移动 `x` 格。\n\n计数器是循环的。例如当 `m=10` 时，从 `8` 向前移动 `5` 格后变成 `3`；从 `2` 向后移动 `4` 格后变成 `8`。\n\n输出所有操作结束后的计数器值。\n\n## 输入格式\n\n第一行两个整数 `n,m`。\n\n接下来 `n` 行，每行一个字符 `op` 和一个整数 `x`。\n\n## 输出格式\n\n输出最终计数器的值。\n\n## 数据范围\n\n```text\n1<=n<=1000\n2<=m<=100000\n0<=x<=10^9\n```\n\n## 样例输入\n\n```text\n4 10\n+ 8\n+ 5\n- 4\n+ 13\n```\n\n## 样例输出\n\n```text\n2\n```",
      "testCases": [
        {
          "input": "4 10\n+ 8\n+ 5\n- 4\n+ 13",
          "expected": "2",
          "score": 10
        },
        {
          "input": "3 10\n- 1\n- 20\n+ 3",
          "expected": "2",
          "score": 10
        },
        {
          "input": "4 7\n+ 14\n+ 1\n- 8\n+ 100",
          "expected": "2",
          "score": 10
        },
        {
          "input": "5 100000\n+ 1000000000\n- 999999999\n+ 123456789\n- 56790\n+ 100000",
          "expected": "0",
          "score": 10
        },
        {
          "input": "6 5\n+ 4\n+ 4\n+ 4\n- 3\n- 8\n+ 12",
          "expected": "3",
          "score": 10
        },
        {
          "input": "1 13\n- 27",
          "expected": "12",
          "score": 10
        },
        {
          "input": "5 12\n+ 6\n+ 18\n- 7\n- 13\n+ 25",
          "expected": "5",
          "score": 10
        },
        {
          "input": "7 2\n+ 1\n+ 1\n+ 1\n- 1\n- 1\n+ 1000000000\n- 999999999",
          "expected": "0",
          "score": 10
        },
        {
          "input": "4 99991\n+ 99990\n+ 99990\n- 1\n- 99989",
          "expected": "99990",
          "score": 10
        },
        {
          "input": "8 17\n+ 34\n- 5\n+ 51\n- 100\n+ 3\n+ 1000000000\n- 999999999\n+ 8",
          "expected": "9",
          "score": 10
        }
      ]
    },
    {
      "id": "1003",
      "name": "连续字符",
      "score": 100,
      "tests": 10,
      "sampleInput": "abbbcc1111ddd",
      "sampleOutput": "1 4",
      "statement": "## 题目描述\n\n给定一个只包含大小写英文字母和数字的字符串。\n\n请找到其中最长的一段连续相同字符，输出这个字符以及它连续出现的次数。\n\n若存在多段长度相同的最长连续段，输出最先出现的一段。\n\n## 输入格式\n\n输入一行字符串 `s`。\n\n## 输出格式\n\n输出：\n\n```text\n字符 连续次数\n```\n\n## 数据范围\n\n```text\n1<=|s|<=100000\n```\n\n## 样例输入\n\n```text\nabbbcc1111ddd\n```\n\n## 样例输出\n\n```text\n1 4\n```",
      "testCases": [
        {
          "input": "abbbcc1111ddd",
          "expected": "1 4",
          "score": 10
        },
        {
          "input": "aaaaa",
          "expected": "a 5",
          "score": 10
        },
        {
          "input": "aabbccdd",
          "expected": "a 2",
          "score": 10
        },
        {
          "input": "Z9ZZ9999aa",
          "expected": "9 4",
          "score": 10
        },
        {
          "input": "aA111bbBBBB22222c",
          "expected": "2 5",
          "score": 10
        },
        {
          "input": "xYYzzzzYYxxxx",
          "expected": "z 4",
          "score": 10
        },
        {
          "input": "abcde",
          "expected": "a 1",
          "score": 10
        },
        {
          "input": "AAaaAAA",
          "expected": "A 3",
          "score": 10
        },
        {
          "input": "1111222233334444",
          "expected": "1 4",
          "score": 10
        },
        {
          "input": "a99999bb99999c",
          "expected": "9 5",
          "score": 10
        }
      ]
    },
    {
      "id": "1004",
      "name": "最近的训练成绩",
      "score": 100,
      "tests": 10,
      "sampleInput": "5 4\n20 3 15 40 27\n18\n25\n2\n50",
      "sampleOutput": "20\n27\n3\n40",
      "statement": "## 题目描述\n\n教练保存了 `n` 个历史训练成绩。\n\n现在进行 `q` 次查询。每次给出一个目标成绩 `x`，需要找到历史成绩中与 `x` 差的绝对值最小的成绩。\n\n若有两个成绩与 `x` 的距离相同，输出较小的那个。\n\n## 输入格式\n\n第一行两个整数 `n,q`。\n\n第二行 `n` 个整数，表示历史成绩。\n\n接下来 `q` 行，每行一个整数 `x`。\n\n## 输出格式\n\n对于每次查询，输出一个答案，每个答案占一行。\n\n## 数据范围\n\n```text\n1<=n,q<=100000\n0<=成绩,x<=10^9\n```\n\n## 样例输入\n\n```text\n5 4\n20 3 15 40 27\n18\n25\n2\n50\n```\n\n## 样例输出\n\n```text\n20\n27\n3\n40\n```",
      "testCases": [
        {
          "input": "5 4\n20 3 15 40 27\n18\n25\n2\n50",
          "expected": "20\n27\n3\n40",
          "score": 10
        },
        {
          "input": "4 5\n10 20 30 40\n15\n25\n35\n5\n45",
          "expected": "10\n20\n30\n10\n40",
          "score": 10
        },
        {
          "input": "6 5\n5 5 5 100 100 50\n5\n6\n75\n99\n100",
          "expected": "5\n5\n50\n100\n100",
          "score": 10
        },
        {
          "input": "1 4\n123456789\n0\n123456789\n1000000000\n123456788",
          "expected": "123456789\n123456789\n123456789\n123456789",
          "score": 10
        },
        {
          "input": "3 4\n0 1000000000 500000000\n250000000\n750000000\n499999999\n500000001",
          "expected": "0\n500000000\n500000000\n500000000",
          "score": 10
        },
        {
          "input": "8 5\n42 7 19 88 63 31 55 100\n1\n24\n47\n72\n94",
          "expected": "7\n19\n42\n63\n88",
          "score": 10
        },
        {
          "input": "7 6\n13 2 29 21 8 34 55\n3\n10\n17\n25\n40\n60",
          "expected": "2\n8\n13\n21\n34\n55",
          "score": 10
        },
        {
          "input": "5 5\n100 200 300 400 500\n100\n250\n350\n450\n999",
          "expected": "100\n200\n300\n400\n500",
          "score": 10
        },
        {
          "input": "6 4\n1 1000000000 10 100 1000 10000\n9\n99\n999\n999999999",
          "expected": "10\n100\n1000\n1000000000",
          "score": 10
        },
        {
          "input": "10 5\n14 28 42 56 70 84 98 112 126 140\n35\n63\n91\n119\n133",
          "expected": "28\n56\n84\n112\n126",
          "score": 10
        }
      ]
    },
    {
      "id": "1005",
      "name": "任务处理器",
      "score": 100,
      "tests": 10,
      "sampleInput": "8\n1 7\n1 3\n1 10\n3\n2\n3\n1 2\n3",
      "sampleOutput": "3\n7\n2",
      "statement": "## 题目描述\n\n一个任务处理器需要维护若干等待执行的任务。\n\n每个任务有一个正整数编号。\n\n共有 `n` 次操作：\n\n```text\n1 x\n```\n\n表示加入编号为 `x` 的任务。\n\n```text\n2\n```\n\n表示执行当前编号最小的任务，并将它删除。\n\n```text\n3\n```\n\n表示输出当前编号最小的任务，但不删除它。\n\n保证执行操作 `2` 或 `3` 时至少存在一个任务。\n\n注意：不同任务可以具有相同编号。\n\n## 输入格式\n\n第一行一个整数 `n`。\n\n接下来 `n` 行，每行表示一次操作。\n\n## 输出格式\n\n对于每一个操作 `3`，输出当前最小任务编号。\n\n## 数据范围\n\n```text\n1<=n<=200000\n1<=x<=10^9\n```\n\n## 样例输入\n\n```text\n8\n1 7\n1 3\n1 10\n3\n2\n3\n1 2\n3\n```\n\n## 样例输出\n\n```text\n3\n7\n2\n```",
      "testCases": [
        {
          "input": "8\n1 7\n1 3\n1 10\n3\n2\n3\n1 2\n3",
          "expected": "3\n7\n2",
          "score": 10
        },
        {
          "input": "10\n1 5\n1 5\n1 3\n3\n2\n3\n2\n3\n1 2\n3",
          "expected": "3\n5\n5\n2",
          "score": 10
        },
        {
          "input": "8\n1 10\n3\n2\n1 7\n3\n1 2\n3\n2",
          "expected": "10\n7\n2",
          "score": 10
        },
        {
          "input": "12\n1 9\n1 1\n1 8\n1 2\n1 7\n1 3\n3\n2\n3\n2\n3\n2",
          "expected": "1\n2\n3",
          "score": 10
        },
        {
          "input": "8\n1 1000000000\n1 999999999\n1 1000000000\n3\n2\n3\n1 1\n3",
          "expected": "999999999\n1000000000\n1",
          "score": 10
        },
        {
          "input": "11\n1 4\n1 2\n1 8\n1 6\n3\n2\n3\n1 1\n2\n3\n2",
          "expected": "2\n4\n4",
          "score": 10
        },
        {
          "input": "9\n1 3\n1 3\n1 3\n3\n2\n3\n2\n3\n2",
          "expected": "3\n3\n3",
          "score": 10
        },
        {
          "input": "10\n1 50\n1 40\n1 30\n1 20\n1 10\n3\n2\n2\n3\n2",
          "expected": "10\n30",
          "score": 10
        },
        {
          "input": "12\n1 12\n1 7\n3\n1 5\n3\n2\n3\n1 6\n1 4\n2\n3\n2",
          "expected": "7\n5\n7\n6",
          "score": 10
        },
        {
          "input": "15\n1 9\n1 2\n1 15\n1 2\n3\n2\n3\n1 1\n1 20\n2\n3\n2\n3\n2\n3",
          "expected": "2\n2\n2\n9\n15",
          "score": 10
        }
      ]
    },
    {
      "id": "1006",
      "name": "朋友圈",
      "score": 100,
      "tests": 10,
      "sampleInput": "5 6\n1 1 2\n1 3 4\n2 1 3\n1 2 3\n2 1 4\n2 4 5",
      "sampleOutput": "NO\nYES\nNO",
      "statement": "## 题目描述\n\n学校中有 `n` 名学生，编号为 `1~n`。\n\n开始时每个人都只属于自己的朋友圈。\n\n之后发生 `m` 个事件：\n\n```text\n1 x y\n```\n\n表示学生 `x` 和学生 `y` 所在的两个朋友圈建立联系。从此以后，这两个朋友圈中的所有人都属于同一个朋友圈。\n\n```text\n2 x y\n```\n\n询问学生 `x` 和学生 `y` 当前是否属于同一个朋友圈。\n\n若属于，输出 `YES`；否则输出 `NO`。\n\n## 输入格式\n\n第一行两个整数 `n,m`。\n\n接下来 `m` 行，每行三个整数 `op,x,y`。\n\n## 输出格式\n\n对于每个查询操作输出一行结果。\n\n## 数据范围\n\n```text\n1<=n,m<=200000\n1<=x,y<=n\n```\n\n## 样例输入\n\n```text\n5 6\n1 1 2\n1 3 4\n2 1 3\n1 2 3\n2 1 4\n2 4 5\n```\n\n## 样例输出\n\n```text\nNO\nYES\nNO\n```",
      "testCases": [
        {
          "input": "5 6\n1 1 2\n1 3 4\n2 1 3\n1 2 3\n2 1 4\n2 4 5",
          "expected": "NO\nYES\nNO",
          "score": 10
        },
        {
          "input": "4 6\n2 1 2\n1 1 2\n2 1 2\n1 2 3\n2 1 3\n2 3 4",
          "expected": "NO\nYES\nYES\nNO",
          "score": 10
        },
        {
          "input": "6 9\n1 1 2\n1 2 3\n1 4 5\n2 1 3\n2 3 4\n1 3 4\n2 1 5\n1 1 5\n2 2 4",
          "expected": "YES\nNO\nYES\nYES",
          "score": 10
        },
        {
          "input": "5 8\n1 1 2\n1 3 4\n1 4 5\n2 3 5\n2 1 5\n1 2 3\n2 1 5\n2 2 4",
          "expected": "YES\nNO\nYES\nYES",
          "score": 10
        },
        {
          "input": "3 5\n2 1 1\n2 2 2\n1 1 2\n2 1 2\n2 2 3",
          "expected": "YES\nYES\nYES\nNO",
          "score": 10
        },
        {
          "input": "8 10\n1 1 2\n1 3 4\n1 5 6\n1 7 8\n2 1 8\n1 2 3\n1 6 7\n2 1 4\n2 5 8\n2 4 5",
          "expected": "NO\nYES\nYES\nNO",
          "score": 10
        },
        {
          "input": "7 9\n1 1 2\n1 2 3\n1 5 6\n2 1 3\n2 3 5\n1 3 5\n2 2 6\n2 4 7\n2 5 6",
          "expected": "YES\nNO\nYES\nNO\nYES",
          "score": 10
        },
        {
          "input": "6 8\n1 1 6\n1 2 5\n1 3 4\n2 1 2\n1 6 5\n2 1 2\n2 3 6\n2 4 3",
          "expected": "NO\nYES\nNO\nYES",
          "score": 10
        },
        {
          "input": "10 12\n1 1 2\n1 2 3\n1 4 5\n1 6 7\n1 8 9\n2 1 5\n1 3 4\n2 1 5\n1 7 8\n2 6 9\n2 5 10\n2 1 9",
          "expected": "NO\nYES\nYES\nNO\nNO",
          "score": 10
        },
        {
          "input": "5 9\n1 1 2\n1 1 2\n2 1 2\n1 2 3\n1 3 4\n2 1 4\n1 4 5\n2 2 5\n2 3 3",
          "expected": "YES\nYES\nYES\nYES",
          "score": 10
        }
      ]
    },
    {
      "id": "1007",
      "name": "实验器材",
      "score": 100,
      "tests": 10,
      "sampleInput": "4 7\n2 3 4 5\n3 4 5 8",
      "sampleOutput": "11",
      "statement": "## 题目描述\n\n实验室中共有 `n` 件器材。\n\n第 `i` 件器材占用 `w[i]` 单位空间，可以获得 `v[i]` 点实验价值。\n\n背包最多能够容纳 `W` 单位空间，每件器材最多选择一次。\n\n请计算最多可以获得多少实验价值。\n\n## 输入格式\n\n第一行两个整数 `n,W`。\n\n第二行 `n` 个整数，表示 `w[1]~w[n]`。\n\n第三行 `n` 个整数，表示 `v[1]~v[n]`。\n\n## 输出格式\n\n输出最大实验价值。\n\n## 数据范围\n\n```text\n1<=n<=100\n1<=W<=10000\n1<=w[i]<=W\n1<=v[i]<=10000\n```\n\n## 样例输入\n\n```text\n4 7\n2 3 4 5\n3 4 5 8\n```\n\n## 样例输出\n\n```text\n11\n```",
      "testCases": [
        {
          "input": "4 7\n2 3 4 5\n3 4 5 8",
          "expected": "11",
          "score": 10
        },
        {
          "input": "3 5\n1 2 3\n6 10 12",
          "expected": "22",
          "score": 10
        },
        {
          "input": "4 5\n5 4 3 2\n10 40 50 35",
          "expected": "85",
          "score": 10
        },
        {
          "input": "5 10\n2 2 6 5 4\n6 3 5 4 6",
          "expected": "15",
          "score": 10
        },
        {
          "input": "4 1\n1 1 1 1\n1 5 3 4",
          "expected": "5",
          "score": 10
        },
        {
          "input": "2 10\n5 6\n10 12",
          "expected": "12",
          "score": 10
        },
        {
          "input": "4 9\n2 4 6 7\n3 8 9 10",
          "expected": "13",
          "score": 10
        },
        {
          "input": "6 15\n2 3 5 7 9 10\n4 5 10 13 15 17",
          "expected": "28",
          "score": 10
        },
        {
          "input": "5 12\n6 6 6 6 6\n10 11 12 13 14",
          "expected": "27",
          "score": 10
        },
        {
          "input": "7 20\n3 4 5 8 9 10 12\n5 6 10 14 16 18 21",
          "expected": "36",
          "score": 10
        }
      ]
    },
    {
      "id": "1008",
      "name": "逃离数字迷宫",
      "score": 100,
      "tests": 10,
      "sampleInput": "5 17",
      "sampleOutput": "4",
      "statement": "## 题目描述\n\n你现在位于数字 `s`。\n\n每进行一步，可以进行以下三种操作之一：\n\n```text\nx -> x-1\nx -> x+1\nx -> 2*x\n```\n\n要求数字在整个过程中始终处于：\n\n```text\n0<=x<=100000\n```\n\n给定目标数字 `t`，求从 `s` 到达 `t` 最少需要多少步。\n\n## 输入格式\n\n输入两个整数：\n\n```text\ns t\n```\n\n## 输出格式\n\n输出最少操作次数。\n\n## 数据范围\n\n```text\n0<=s,t<=100000\n```\n\n## 样例输入\n\n```text\n5 17\n```\n\n## 样例输出\n\n```text\n4\n```\n\n例如可以经过：\n\n```text\n5 -> 4 -> 8 -> 16 -> 17\n```",
      "testCases": [
        {
          "input": "5 17",
          "expected": "4",
          "score": 10
        },
        {
          "input": "42 42",
          "expected": "0",
          "score": 10
        },
        {
          "input": "10 3",
          "expected": "7",
          "score": 10
        },
        {
          "input": "0 7",
          "expected": "5",
          "score": 10
        },
        {
          "input": "1 100000",
          "expected": "21",
          "score": 10
        },
        {
          "input": "99999 100000",
          "expected": "1",
          "score": 10
        },
        {
          "input": "7 31",
          "expected": "4",
          "score": 10
        },
        {
          "input": "37 59",
          "expected": "9",
          "score": 10
        },
        {
          "input": "2 9",
          "expected": "3",
          "score": 10
        },
        {
          "input": "12345 54321",
          "expected": "1238",
          "score": 10
        }
      ]
    }
  ]
};

window.OMS_EXAM_ARCHIVE = [
  {
    "examVersion": "2025-transfer-major-exam",
    "title": "2025 大二计算机转专业机试",
    "duration": 120,
    "totalScore": 800,
    "questions": [
      {
        "id": "1",
        "name": "判断素数",
        "score": 100,
        "tests": 10,
        "sampleInput": "5\n2\n3\n4\n17\n21",
        "sampleOutput": "Yes\nYes\nNo\nYes\nNo",
        "statement": "## 题目描述\n\n给定 `n` 个整数，请依次判断它们是否为素数。\n\n若一个整数大于 `1`，且除了 `1` 和它本身以外没有其他正因数，则称它为素数。\n\n对于每个整数：\n\n- 若它是素数，输出 `Yes`；\n- 否则输出 `No`。\n\n每个结果单独占一行。\n\n## 输入格式\n\n第一行输入一个整数 `n`，表示需要判断的整数个数。\n\n接下来 `n` 行，每行输入一个整数 `x`。\n\n## 输出格式\n\n对于每个整数输出一行 `Yes` 或 `No`。\n\n## 数据范围\n\n```text\n1<=n<=100\n0<=x<=2^63-1\n```\n\n## 样例输入\n\n```text\n5\n2\n3\n4\n17\n21\n```\n\n## 样例输出\n\n```text\nYes\nYes\nNo\nYes\nNo\n```",
        "testCases": [
          {
            "input": "5\n2\n3\n4\n17\n21",
            "expected": "Yes\nYes\nNo\nYes\nNo",
            "score": 10
          },
          {
            "input": "6\n0\n1\n2\n9\n97\n100",
            "expected": "No\nNo\nYes\nNo\nYes\nNo",
            "score": 10
          },
          {
            "input": "4\n2147483647\n2147483646\n1000000007\n1000000008",
            "expected": "Yes\nNo\nYes\nNo",
            "score": 10
          },
          {
            "input": "5\n49\n121\n127\n169\n173",
            "expected": "No\nNo\nYes\nNo\nYes",
            "score": 10
          },
          {
            "input": "3\n999983\n999981\n999979",
            "expected": "Yes\nNo\nYes",
            "score": 10
          },
          {
            "input": "4\n1000003\n1000033\n1000037\n1000039",
            "expected": "Yes\nYes\nYes\nYes",
            "score": 10
          },
          {
            "input": "5\n25\n29\n31\n35\n37",
            "expected": "No\nYes\nYes\nNo\nYes",
            "score": 10
          },
          {
            "input": "3\n99991\n99989\n99990",
            "expected": "Yes\nYes\nNo",
            "score": 10
          },
          {
            "input": "4\n1000000007\n1000000009\n1000000010\n1000000011",
            "expected": "Yes\nYes\nNo\nNo",
            "score": 10
          },
          {
            "input": "5\n2\n999983\n1000003\n2147483647\n2147483645",
            "expected": "Yes\nYes\nYes\nYes\nNo",
            "score": 10
          }
        ]
      },
      {
        "id": "2",
        "name": "加油站",
        "score": 100,
        "tests": 10,
        "sampleInput": "5\n-2 3 6 5 1",
        "sampleOutput": "1 1",
        "statement": "## 题目描述\n\n数轴上有 `n` 个加油站，第 `i` 个加油站的位置为 `a[i]`。\n\n现在从这些加油站中选择两个不同的加油站修建一条道路，道路长度等于两个加油站坐标之差的绝对值。\n\n请你求出：\n\n1. 可以得到的最短道路长度；\n2. 有多少对加油站能够得到这一最短长度。\n\n一对加油站只计算一次。\n\n## 输入格式\n\n第一行输入一个整数 `n`，表示加油站数量。\n\n第二行输入 `n` 个整数 `a[1],a[2],...,a[n]`，表示各加油站的位置。\n\n## 输出格式\n\n在一行中输出两个整数：\n\n```text\n最短距离 方案数\n```\n\n## 数据范围\n\n```text\n2<=n<=200000\n-10^9<=a[i]<=10^9\n```\n\n保证所有加油站的位置两两不同。\n\n## 样例输入\n\n```text\n5\n-2 3 6 5 1\n```\n\n## 样例输出\n\n```text\n1 1\n```",
        "testCases": [
          {
            "input": "5\n-2 3 6 5 1",
            "expected": "1 1",
            "score": 10
          },
          {
            "input": "4\n1 3 5 7",
            "expected": "2 3",
            "score": 10
          },
          {
            "input": "6\n10 -10 0 20 30 40",
            "expected": "10 5",
            "score": 10
          },
          {
            "input": "5\n100 101 103 106 110",
            "expected": "1 1",
            "score": 10
          },
          {
            "input": "7\n-8 -3 2 7 12 17 22",
            "expected": "5 6",
            "score": 10
          },
          {
            "input": "3\n-1000000000 0 1000000000",
            "expected": "1000000000 2",
            "score": 10
          },
          {
            "input": "6\n4 20 9 13 15 30",
            "expected": "2 1",
            "score": 10
          },
          {
            "input": "8\n1 100 2 99 3 98 4 97",
            "expected": "1 6",
            "score": 10
          },
          {
            "input": "5\n-5 -1 4 10 17",
            "expected": "4 1",
            "score": 10
          },
          {
            "input": "10\n11 21 31 41 51 61 71 81 91 101",
            "expected": "10 9",
            "score": 10
          }
        ]
      },
      {
        "id": "3",
        "name": "开关灯",
        "score": 100,
        "tests": 10,
        "sampleInput": "2 3\n101\n202\n102",
        "sampleOutput": "3",
        "statement": "## 题目描述\n\n一栋酒店共有 `N` 层，每层有 `N` 个房间，其中 `1<=N<=9`。\n\n第 `r` 层第 `c` 个房间的门牌号记为 `r0c`。例如：\n\n```text\n101\n202\n309\n```\n\n分别表示第 1 层第 1 个房间、第 2 层第 2 个房间和第 3 层第 9 个房间。\n\n初始时所有房间的灯均处于关闭状态。\n\n现在依次进行 `m` 次操作。每次选择一个房间按下开关。若按下的是第 `r` 层第 `c` 个房间，则：\n\n- 第 `r` 层的所有房间灯状态全部翻转；\n- 其他楼层中，第 `c` 个房间的灯状态全部翻转。\n\n也就是说，本次操作一共影响 `2N-1` 个房间，被按下开关的房间本身只翻转一次。\n\n每次操作完成后，酒店都会形成一个新的灯光状态。\n\n请输出整个操作过程中，曾经同时亮起的灯的最大数量。\n\n## 输入格式\n\n第一行输入两个整数 `N,m`，分别表示酒店层数和操作次数。\n\n接下来 `m` 行，每行输入一个三位门牌号，表示本次按下开关的房间。\n\n## 输出格式\n\n输出一个整数，表示操作过程中同时亮灯数量的最大值。\n\n## 数据范围\n\n```text\n1<=N<=9\n1<=m<=100000\n```\n\n## 样例输入\n\n```text\n2 3\n101\n202\n102\n```\n\n## 样例输出\n\n```text\n3\n```",
        "testCases": [
          {
            "input": "2 3\n101\n202\n102",
            "expected": "3",
            "score": 10
          },
          {
            "input": "1 4\n101\n101\n101\n101",
            "expected": "1",
            "score": 10
          },
          {
            "input": "3 3\n101\n202\n303",
            "expected": "6",
            "score": 10
          },
          {
            "input": "3 4\n101\n102\n103\n101",
            "expected": "9",
            "score": 10
          },
          {
            "input": "2 5\n101\n102\n201\n202\n101",
            "expected": "4",
            "score": 10
          },
          {
            "input": "4 4\n101\n202\n303\n404",
            "expected": "10",
            "score": 10
          },
          {
            "input": "3 6\n101\n201\n301\n102\n202\n302",
            "expected": "9",
            "score": 10
          },
          {
            "input": "2 2\n101\n101",
            "expected": "3",
            "score": 10
          },
          {
            "input": "4 6\n104\n204\n304\n404\n101\n401",
            "expected": "13",
            "score": 10
          },
          {
            "input": "3 8\n101\n202\n101\n303\n102\n203\n301\n103",
            "expected": "6",
            "score": 10
          }
        ]
      },
      {
        "id": "4",
        "name": "艾莲的化学实验",
        "score": 100,
        "tests": 1,
        "sampleInput": "8\n5 3\n1 2\n2 3\n4 5\n3\n1 2 3\n6 3\n1 2\n3 4\n5 6\n3\n1 3 5\n7 6\n1 2\n2 3\n3 4\n4 5\n5 6\n6 7\n4\n1 3 5 7\n5 2\n1 2\n4 5\n1\n3\n8 4\n1 2\n2 3\n5 6\n6 7\n3\n1 2 4\n10 8\n1 2\n2 3\n3 4\n5 6\n6 7\n7 8\n8 9\n9 10\n5\n5 6 7 8 10\n6 5\n1 2\n2 3\n3 1\n4 5\n5 6\n4\n1 2 3 6\n4 3\n1 2\n2 3\n3 4\n4\n4 3 2 1",
        "sampleOutput": "YES\nNO\nYES\nYES\nNO\nYES\nNO\nYES",
        "statement": "## 题目描述\n\n艾莲正在研究药剂之间的相溶关系。\n\n共有 `n` 种药剂，编号为 `1~n`。\n\n药剂之间的相溶关系具有对称性和传递性。若药剂 `x` 与药剂 `y` 相溶，则二者属于同一个相溶集合；若药剂 `A` 与药剂 `B` 相溶，药剂 `B` 与药剂 `C` 相溶，则药剂 `A` 与药剂 `C` 也视为相溶。\n\n对于每组数据，首先给出若干组已知的相溶关系，随后给出 `k` 种待查询药剂。请判断这 `k` 种药剂是否全部属于同一个相溶集合。\n\n若是，输出 `YES`；否则输出 `NO`。\n\n## 输入格式\n\n第一行输入一个整数 `T`，表示测试数据组数。\n\n对于每组数据：\n\n第一行输入两个整数 `n,m`，表示药剂种数和已知相溶关系数。\n\n接下来 `m` 行，每行输入两个整数 `x,y`，表示药剂 `x` 与药剂 `y` 可以相溶。\n\n接下来一行输入一个整数 `k`。\n\n最后一行输入 `k` 个整数，表示需要查询的药剂编号。\n\n## 输出格式\n\n对于每组数据输出一行：\n\n```text\nYES\n```\n\n或\n\n```text\nNO\n```\n\n## 数据范围\n\n```text\n1<=T<=20\n1<=n<=200000\n0<=m<=200000\n1<=k<=n\n1<=x,y<=n\n```\n\n## 样例输入\n\n```text\n1\n5 3\n1 2\n2 3\n4 5\n3\n1 2 3\n```\n\n## 样例输出\n\n```text\nYES\n```",
        "testCases": [
          {
            "input": "8\n5 3\n1 2\n2 3\n4 5\n3\n1 2 3\n6 3\n1 2\n3 4\n5 6\n3\n1 3 5\n7 6\n1 2\n2 3\n3 4\n4 5\n5 6\n6 7\n4\n1 3 5 7\n5 2\n1 2\n4 5\n1\n3\n8 4\n1 2\n2 3\n5 6\n6 7\n3\n1 2 4\n10 8\n1 2\n2 3\n3 4\n5 6\n6 7\n7 8\n8 9\n9 10\n5\n5 6 7 8 10\n6 5\n1 2\n2 3\n3 1\n4 5\n5 6\n4\n1 2 3 6\n4 3\n1 2\n2 3\n3 4\n4\n4 3 2 1",
            "expected": "YES\nNO\nYES\nYES\nNO\nYES\nNO\nYES",
            "score": 100
          }
        ]
      },
      {
        "id": "5",
        "name": "迷宫",
        "score": 100,
        "tests": 10,
        "sampleInput": "2 2\n0\n0 0\n0",
        "sampleOutput": "1",
        "statement": "## 题目描述\n\n给定一个 `R×C` 的迷宫。\n\n每个格子可以向上、下、左、右相邻格移动，但相邻格之间可能存在墙壁。\n\n可以从第一行任意一个格子作为起点。当到达最后一行任意一个格子时，视为成功走出迷宫。每移动到一个上下左右相邻且中间没有墙壁的格子，记作 1 步。\n\n请判断能否走出迷宫；如果可以，输出最少步数。\n\n### 墙壁输入\n\n在 `R,C` 之后共有 `2R-1` 行墙壁信息。\n\n从第 1 行墙壁信息开始编号：\n\n- 第 `2r-1` 行有 `C-1` 个整数，第 `j` 个数表示 `(r,j)` 与 `(r,j+1)` 之间是否有墙；\n- 第 `2r` 行有 `C` 个整数，第 `j` 个数表示 `(r,j)` 与 `(r+1,j)` 之间是否有墙。\n\n其中：\n\n```text\n1 表示有墙\n0 表示没有墙\n```\n\n## 输入格式\n\n第一行输入两个整数 `R,C`。\n\n接下来输入 `2R-1` 行墙壁信息。\n\n## 输出格式\n\n如果可以到达最后一行，输出最少移动步数。\n\n否则输出：\n\n```text\nNo Way\n```\n\n## 数据范围\n\n```text\n1<=R,C<=1000\n```\n\n## 样例输入\n\n```text\n2 2\n0\n0 0\n0\n```\n\n## 样例输出\n\n```text\n1\n```",
        "testCases": [
          {
            "input": "2 2\n0\n0 0\n0",
            "expected": "1",
            "score": 10
          },
          {
            "input": "2 2\n1\n1 1\n1",
            "expected": "No Way",
            "score": 10
          },
          {
            "input": "3 3\n0 1\n0 1 0\n1 0\n0 0 1\n0 0",
            "expected": "2",
            "score": 10
          },
          {
            "input": "3 2\n1\n0 1\n0\n1 0\n1",
            "expected": "3",
            "score": 10
          },
          {
            "input": "4 3\n0 0\n1 0 1\n1 1\n0 1 0\n0 0\n1 1 0\n0 0",
            "expected": "No Way",
            "score": 10
          },
          {
            "input": "2 4\n1 1 1\n0 1 0 1\n1 0 1",
            "expected": "1",
            "score": 10
          },
          {
            "input": "3 4\n0 0 0\n1 1 0 1\n1 0 1\n0 0 1 0\n0 0 0",
            "expected": "3",
            "score": 10
          },
          {
            "input": "5 2\n0\n0 1\n1\n1 0\n0\n0 0\n1\n1 1\n0",
            "expected": "No Way",
            "score": 10
          },
          {
            "input": "4 4\n1 0 1\n0 1 0 1\n0 1 0\n1 0 1 0\n1 1 0\n0 0 0 1\n0 1 0",
            "expected": "4",
            "score": 10
          },
          {
            "input": "3 3\n1 1\n0 0 0\n0 1\n1 0 1\n1 1",
            "expected": "2",
            "score": 10
          }
        ]
      },
      {
        "id": "6",
        "name": "兄弟数",
        "score": 100,
        "tests": 10,
        "sampleInput": "5\n2 1 2 4 3",
        "sampleOutput": "3 3 4 -1 -1",
        "statement": "## 题目描述\n\n给定一个长度为 `n` 的整数序列：\n\n```text\nA[1],A[2],...,A[n]\n```\n\n对于位置 `i`，在它右侧寻找第一个满足\n\n```text\nA[j]>=A[i]\n```\n\n的位置 `j`。\n\n如果这样的 `j` 存在，则把 `j` 称为位置 `i` 的兄弟数下标；如果不存在，则答案为 `-1`。\n\n请依次输出每个位置的答案。\n\n## 输入格式\n\n第一行输入一个整数 `n`。\n\n第二行输入 `n` 个整数 `A[1],A[2],...,A[n]`。\n\n## 输出格式\n\n在一行中输出 `n` 个整数。\n\n第 `i` 个整数表示位置 `i` 右侧第一个不小于 `A[i]` 的数的下标；不存在时输出 `-1`。\n\n下标从 `1` 开始。\n\n## 数据范围\n\n```text\n1<=n<=200000\n-10^9<=A[i]<=10^9\n```\n\n## 样例输入\n\n```text\n5\n2 1 2 4 3\n```\n\n## 样例输出\n\n```text\n3 3 4 -1 -1\n```",
        "testCases": [
          {
            "input": "5\n2 1 2 4 3",
            "expected": "3 3 4 -1 -1",
            "score": 10
          },
          {
            "input": "5\n5 4 3 2 1",
            "expected": "-1 -1 -1 -1 -1",
            "score": 10
          },
          {
            "input": "5\n1 2 3 4 5",
            "expected": "2 3 4 5 -1",
            "score": 10
          },
          {
            "input": "6\n3 3 3 3 3 3",
            "expected": "2 3 4 5 6 -1",
            "score": 10
          },
          {
            "input": "7\n4 1 2 5 3 5 2",
            "expected": "4 3 4 6 6 -1 -1",
            "score": 10
          },
          {
            "input": "8\n10 1 9 2 8 3 7 4",
            "expected": "-1 3 -1 5 -1 7 -1 -1",
            "score": 10
          },
          {
            "input": "6\n-1 -2 -1 -3 0 -1",
            "expected": "3 3 5 5 -1 -1",
            "score": 10
          },
          {
            "input": "1\n42",
            "expected": "-1",
            "score": 10
          },
          {
            "input": "9\n2 7 1 8 2 8 1 8 2",
            "expected": "2 4 4 6 6 8 8 -1 -1",
            "score": 10
          },
          {
            "input": "10\n5 1 5 1 5 1 5 1 5 1",
            "expected": "3 3 5 5 7 7 9 9 -1 -1",
            "score": 10
          }
        ]
      },
      {
        "id": "7",
        "name": "最长子序列",
        "score": 100,
        "tests": 10,
        "sampleInput": "8 2 4\n1 3 2 5 4 6 5 7",
        "sampleOutput": "6",
        "statement": "## 题目描述\n\n给定一个长度为 `n` 的整数数组，并给定闭区间 `[m,k]`。\n\n请找出一个**连续子序列**，使得该连续子序列中的最大值与最小值之差满足：\n\n```text\nm<=max-min<=k\n```\n\n求满足条件的连续子序列的最大长度。\n\n如果不存在满足条件的连续子序列，输出 `0`。\n\n## 输入格式\n\n第一行输入三个整数 `n,m,k`。\n\n第二行输入 `n` 个整数 `A[1],A[2],...,A[n]`。\n\n## 输出格式\n\n输出一个整数，表示满足条件的最长连续子序列长度。\n\n## 数据范围\n\n```text\n1<=n<=200000\n0<=m<=k<=2*10^9\n-10^9<=A[i]<=10^9\n```\n\n## 样例输入\n\n```text\n8 2 4\n1 3 2 5 4 6 5 7\n```\n\n## 样例输出\n\n```text\n6\n```",
        "testCases": [
          {
            "input": "8 2 4\n1 3 2 5 4 6 5 7",
            "expected": "6",
            "score": 10
          },
          {
            "input": "5 0 0\n1 1 1 1 1",
            "expected": "5",
            "score": 10
          },
          {
            "input": "5 1 2\n1 2 3 4 5",
            "expected": "3",
            "score": 10
          },
          {
            "input": "6 3 5\n1 6 2 5 3 4",
            "expected": "6",
            "score": 10
          },
          {
            "input": "7 2 3\n10 8 9 7 6 8 9",
            "expected": "6",
            "score": 10
          },
          {
            "input": "4 10 20\n1 2 3 4",
            "expected": "0",
            "score": 10
          },
          {
            "input": "8 1 100\n5 1 9 2 8 3 7 4",
            "expected": "8",
            "score": 10
          },
          {
            "input": "10 4 6\n1 5 3 7 2 6 4 8 5 9",
            "expected": "8",
            "score": 10
          },
          {
            "input": "6 0 3\n100 101 102 103 104 105",
            "expected": "4",
            "score": 10
          },
          {
            "input": "9 2 2\n1 3 5 7 9 11 13 15 17",
            "expected": "2",
            "score": 10
          }
        ]
      },
      {
        "id": "8",
        "name": "染色",
        "score": 100,
        "tests": 10,
        "sampleInput": "1 0\n5",
        "sampleOutput": "10",
        "statement": "## 题目描述\n\n给定一棵树，共有 `n` 个节点和 `m` 条边。第 `i` 个节点有权值 `A[i]`。\n\n初始时所有节点均为白色，你需要把所有节点染成黑色。已经变成黑色的节点允许再次被染色。\n\n可以进行以下两类操作：\n\n### 操作 1\n\n选择一个节点 `i`，将节点 `i` 染成黑色，代价为：\n\n```text\n2*A[i]\n```\n\n### 操作 2\n\n选择树中的一条边 `(i,j)`，将这条边的两个端点 `i,j` 同时染成黑色，代价为：\n\n```text\nA[i]+A[j]\n```\n\n求把所有节点都染成黑色所需要的最小总代价。\n\n## 输入格式\n\n第一行输入两个整数 `n,m`。\n\n第二行输入 `n` 个整数 `A[1],A[2],...,A[n]`。\n\n接下来 `m` 行，每行输入两个整数 `u,v`，表示节点 `u` 和节点 `v` 之间有一条边。\n\n输入保证构成一棵树，因此：\n\n```text\nm=n-1\n```\n\n## 输出格式\n\n输出一个整数，表示最小总代价。\n\n## 数据范围\n\n```text\n1<=n<=200000\n1<=A[i]<=10^9\nm=n-1\n```\n\n## 样例输入\n\n```text\n4 3\n4 1 6 3\n1 2\n2 3\n3 4\n```\n\n## 样例输出\n\n```text\n14\n```",
        "testCases": [
          {
            "input": "1 0\n5",
            "expected": "10",
            "score": 10
          },
          {
            "input": "2 1\n5 3\n1 2",
            "expected": "8",
            "score": 10
          },
          {
            "input": "3 2\n5 1 4\n1 2\n2 3",
            "expected": "11",
            "score": 10
          },
          {
            "input": "4 3\n4 1 6 3\n1 2\n2 3\n3 4",
            "expected": "14",
            "score": 10
          },
          {
            "input": "5 4\n3 8 2 7 4\n1 2\n1 3\n1 4\n1 5",
            "expected": "32",
            "score": 10
          },
          {
            "input": "6 5\n5 2 9 1 7 3\n1 2\n2 3\n3 4\n4 5\n5 6",
            "expected": "27",
            "score": 10
          },
          {
            "input": "7 6\n10 1 1 1 1 1 1\n1 2\n1 3\n1 4\n1 5\n1 6\n1 7",
            "expected": "21",
            "score": 10
          },
          {
            "input": "7 6\n1 10 10 10 10 10 10\n1 2\n2 3\n2 4\n1 5\n5 6\n5 7",
            "expected": "82",
            "score": 10
          },
          {
            "input": "8 7\n6 2 8 3 7 4 5 1\n1 2\n1 3\n2 4\n2 5\n3 6\n3 7\n7 8",
            "expected": "40",
            "score": 10
          },
          {
            "input": "10 9\n9 4 7 2 8 3 6 1 5 10\n1 2\n2 3\n2 4\n4 5\n4 6\n1 7\n7 8\n7 9\n9 10",
            "expected": "58",
            "score": 10
          }
        ]
      }
    ],
    "category": "past",
    "date": "2025",
    "status": "历年卷"
  }
];
