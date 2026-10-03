window.OMS_EXAM_DATA = {
  "examVersion": "2026-10-04-first-weekly-practice-800",
  "title": "2026-10-04 第一次周练",
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
window.OMS_EXAM_ARCHIVE.push({
  "examVersion": "2024-transfer-major-exam",
  "title": "2024 计算机转专业机试",
  "duration": 0,
  "totalScore": 1000,
  "questions": [
    {
      "id": "2024-1",
      "name": "A 的 B 次方的后四位",
      "score": 100,
      "tests": 1,
      "sampleInput": "2 1",
      "sampleOutput": "0002",
      "statement": "## 题目描述\n\n给定两个整数 `A` 和 `B`，请计算 `A^B` 的十进制表示的最后四位。\n\n如果结果不足四位，需要在前面补 `0`，使输出始终恰好包含四位数字。\n\n例如，`2^1=2`，应输出 `0002`。\n\n## 输入格式\n\n一行输入两个整数 `A,B`。\n\n## 输出格式\n\n输出 `A^B` 的最后四位，恰好四位数字。\n\n## 数据范围\n\n```text\n0<=B<=10000\n```\n\n## 输入样例\n\n```text\n2 1\n```\n\n## 输出样例\n\n```text\n0002\n```\n\n---",
      "testCases": [
        {
          "input": "2 1",
          "expected": "0002",
          "score": 100
        }
      ],
      "judgeable": true
    },
    {
      "id": "2024-2",
      "name": "最大子列和",
      "score": 100,
      "tests": 1,
      "sampleInput": "9\n-2 1 -3 4 -1 2 1 -5 4",
      "sampleOutput": "6",
      "statement": "## 题目描述\n\n给定一个长度为 `n` 的整数数组，请找出一个和最大的连续子数组，并输出该连续子数组的元素和。\n\n连续子数组至少包含一个元素。\n\n## 输入格式\n\n第一行输入一个整数 `n`，表示数组长度。\n\n第二行输入 `n` 个整数，表示数组中的元素。\n\n## 输出格式\n\n输出一个整数，表示所有非空连续子数组中的最大元素和。\n\n## 输入样例\n\n```text\n9\n-2 1 -3 4 -1 2 1 -5 4\n```\n\n## 输出样例\n\n```text\n6\n```\n\n---",
      "testCases": [
        {
          "input": "9\n-2 1 -3 4 -1 2 1 -5 4",
          "expected": "6",
          "score": 100
        }
      ],
      "judgeable": true
    },
    {
      "id": "2024-3",
      "name": "重排链表",
      "score": 100,
      "tests": 1,
      "sampleInput": "00100 6\n00000 4 99999\n00100 1 12309\n68237 6 -1\n33218 3 00000\n99999 5 68237\n12309 2 33218",
      "sampleOutput": "68237 6 00100\n00100 1 99999\n99999 5 12309\n12309 2 00000\n00000 4 33218\n33218 3 -1",
      "statement": "## 题目描述\n\n给定一个单链表：\n\n```text\nL1→L2→…→Ln-1→Ln\n```\n\n请将其重新排列为：\n\n```text\nLn→L1→Ln-1→L2→Ln-2→L3→…\n```\n\n例如，原链表为：\n\n```text\n1→2→3→4→5→6\n```\n\n重排后应为：\n\n```text\n6→1→5→2→4→3\n```\n\n链表中的每个结点由结点地址、数据域和下一结点地址组成。输入中可能包含不属于该链表的结点，只需处理从首地址出发实际能够访问到的结点。\n\n## 输入格式\n\n第一行输入链表首结点地址 `head` 和结点记录数 `N`。\n\n接下来 `N` 行，每行包含三个数据：\n\n```text\nAddress Data Next\n```\n\n其中：\n\n- `Address` 为当前结点地址；\n- `Data` 为当前结点存储的数据；\n- `Next` 为下一结点地址；\n- 若当前结点没有后继结点，则 `Next` 为 `-1`。\n\n非空结点地址均使用五位十进制数字表示。\n\n## 输出格式\n\n按照重排后的链表顺序，每行输出一个结点：\n\n```text\nAddress Data Next\n```\n\n最后一个结点的 `Next` 输出 `-1`。\n\n## 输入样例\n\n```text\n00100 6\n00000 4 99999\n00100 1 12309\n68237 6 -1\n33218 3 00000\n99999 5 68237\n12309 2 33218\n```\n\n## 输出样例\n\n```text\n68237 6 00100\n00100 1 99999\n99999 5 12309\n12309 2 00000\n00000 4 33218\n33218 3 -1\n```\n\n---",
      "testCases": [
        {
          "input": "00100 6\n00000 4 99999\n00100 1 12309\n68237 6 -1\n33218 3 00000\n99999 5 68237\n12309 2 33218",
          "expected": "68237 6 00100\n00100 1 99999\n99999 5 12309\n12309 2 00000\n00000 4 33218\n33218 3 -1",
          "score": 100
        }
      ],
      "judgeable": true
    },
    {
      "id": "2024-4",
      "name": "兔子试毒",
      "score": 100,
      "tests": 0,
      "sampleInput": "",
      "sampleOutput": "",
      "statement": "现有资料只保留了如下题意：有 1000 瓶药水，其中恰好一瓶有毒；兔子只要喝到一滴毒药，就会在一天后死亡。要求使用尽可能少的兔子和尽可能短的时间找出有毒药水。\n\n当前题解资料明确标注“题面不清，写不了答案”，因此无法可靠恢复本题在考试系统中的输入格式、输出格式和判定要求。该题暂不生成正式可评测题面。\n\n---",
      "testCases": [],
      "judgeable": false
    },
    {
      "id": "2024-5",
      "name": "淹没岛屿",
      "score": 100,
      "tests": 1,
      "sampleInput": "7\n.......\n.##....\n.##....\n....##.\n..####.\n...###.\n.......",
      "sampleOutput": "1",
      "statement": "## 题目描述\n\n给定一张 `N×N` 的海域地图，其中字符 `.` 表示海水，字符 `#` 表示陆地。\n\n上下左右四个方向相邻的陆地格属于同一座岛屿。\n\n由于海平面上升，所有与海水上下左右相邻的陆地格都会被淹没。请计算有多少座岛屿会因此被完全淹没。\n\n## 输入格式\n\n第一行输入一个整数 `N`。\n\n接下来 `N` 行，每行输入一个长度为 `N` 的字符串，表示海域地图。\n\n保证地图的第 1 行、第 1 列、第 `N` 行和第 `N` 列均为海水。\n\n## 输出格式\n\n输出一个整数，表示会被完全淹没的岛屿数量。\n\n## 数据范围\n\n```text\n1<=N<=1000\n```\n\n## 输入样例\n\n```text\n7\n.......\n.##....\n.##....\n....##.\n..####.\n...###.\n.......\n```\n\n## 输出样例\n\n```text\n1\n```\n\n---",
      "testCases": [
        {
          "input": "7\n.......\n.##....\n.##....\n....##.\n..####.\n...###.\n.......",
          "expected": "1",
          "score": 100
        }
      ],
      "judgeable": true
    },
    {
      "id": "2024-6",
      "name": "引水入城",
      "score": 100,
      "tests": 1,
      "sampleInput": "3 3\n9 8 7\n6 5 4\n3 2 1",
      "sampleOutput": "1\n1",
      "statement": "## 题目描述\n\n一个国家由 `N` 行 `M` 列城市组成，每座城市都有一个海拔高度。\n\n第 1 行城市与湖泊相邻，可以建设蓄水厂，将湖水抽入该城市。湖水可以通过输水设施从当前城市流向与其拥有公共边、且海拔严格更低的相邻城市。\n\n第 `N` 行城市位于干旱区，要求这些城市全部能够获得湖水。\n\n请判断这一要求能否满足：\n\n- 如果不能满足，求干旱区中无法获得湖水的城市数量；\n- 如果能够满足，求至少需要在第 1 行建设多少座蓄水厂。\n\n## 输入格式\n\n第一行输入两个正整数 `N,M`，表示城市矩阵的行数和列数。\n\n接下来 `N` 行，每行输入 `M` 个正整数，第 `i` 行第 `j` 个整数表示对应城市的海拔高度。\n\n## 输出格式\n\n如果不能使所有干旱区城市获得湖水，输出两行：\n\n```text\n0\n无法获得湖水的城市数量\n```\n\n如果能够满足要求，输出两行：\n\n```text\n1\n最少蓄水厂数量\n```\n\n## 输入样例\n\n```text\n3 3\n9 8 7\n6 5 4\n3 2 1\n```\n\n## 输出样例\n\n```text\n1\n1\n```\n\n---",
      "testCases": [
        {
          "input": "3 3\n9 8 7\n6 5 4\n3 2 1",
          "expected": "1\n1",
          "score": 100
        }
      ],
      "judgeable": true
    },
    {
      "id": "2024-7",
      "name": "无聊的游戏",
      "score": 100,
      "tests": 1,
      "sampleInput": "5\n3 1\n2 8\n7 7\n10 4\n1 0",
      "sampleOutput": "Alice 3",
      "statement": "## 题目描述\n\nAlice 和 Bob 进行 `n` 轮游戏。\n\n每一轮两人各给出一个整数：\n\n- 若 Alice 的数字更大，则 Alice 赢得这一轮；\n- 若 Bob 的数字更大，则 Bob 赢得这一轮；\n- 若两个数字相等，则本轮双方均不增加胜场。\n\n全部 `n` 轮结束后，比较两人的胜场数。胜场数更多的人获得最终胜利；如果两人的胜场数相同，则最终判 Bob 获胜。\n\n请输出最终获胜者的名字以及该获胜者取得的胜场数。\n\n## 输入格式\n\n第一行输入一个整数 `n`，表示游戏轮数。\n\n接下来 `n` 行，每行输入两个整数 `a,b`，分别表示 Alice 和 Bob 本轮给出的数字。\n\n## 输出格式\n\n输出：\n\n```text\n获胜者名字 获胜者胜场数\n```\n\n获胜者名字只可能为 `Alice` 或 `Bob`。\n\n## 输入样例\n\n```text\n5\n3 1\n2 8\n7 7\n10 4\n1 0\n```\n\n## 输出样例\n\n```text\nAlice 3\n```\n\n---",
      "testCases": [
        {
          "input": "5\n3 1\n2 8\n7 7\n10 4\n1 0",
          "expected": "Alice 3",
          "score": 100
        }
      ],
      "judgeable": true
    },
    {
      "id": "2024-8",
      "name": "字母串处理",
      "score": 100,
      "tests": 1,
      "sampleInput": "tour",
      "sampleOutput": ".t.r",
      "statement": "## 题目描述\n\n给定一个只包含拉丁字母的字符串，请按照以下规则进行处理：\n\n1. 删除所有元音字母 `A`、`O`、`Y`、`E`、`U`、`I` 以及对应的小写字母；\n2. 将剩余的大写字母转换为小写字母；\n3. 在每个剩余字母前添加一个字符 `.`。\n\n输出处理后的字符串。\n\n## 输入格式\n\n输入一行字符串。\n\n## 输出格式\n\n输出处理后的字符串。\n\n## 输入样例\n\n```text\ntour\n```\n\n## 输出样例\n\n```text\n.t.r\n```\n\n---",
      "testCases": [
        {
          "input": "tour",
          "expected": ".t.r",
          "score": 100
        }
      ],
      "judgeable": true
    },
    {
      "id": "2024-9",
      "name": "鱼与熊掌",
      "score": 100,
      "tests": 1,
      "sampleInput": "4 8\n3 4 1 8\n4 7 1 8 4\n5 6 5 1 2 3\n4 3 2 4 8\n3\n2 3\n7 6\n8 4",
      "sampleOutput": "2\n0\n3",
      "statement": "## 题目描述\n\n有 `n` 个人和 `m` 种物品，物品编号为 `1~m`。\n\n已知每个人拥有的物品种类。现在进行若干次查询，每次给出两种物品 `a,b`，请统计有多少人同时拥有这两种物品。\n\n## 输入格式\n\n第一行输入两个整数 `n,m`。\n\n接下来 `n` 行描述每个人拥有的物品。第 `i` 行首先输入一个整数 `k`，表示第 `i` 个人拥有 `k` 种物品，随后输入 `k` 个物品编号。\n\n接下来输入一个整数 `q`，表示查询次数。\n\n随后 `q` 行，每行输入两个整数 `a,b`，表示一次查询。\n\n## 输出格式\n\n对于每次查询，输出一行一个整数，表示同时拥有物品 `a` 和物品 `b` 的人数。\n\n## 输入样例\n\n```text\n4 8\n3 4 1 8\n4 7 1 8 4\n5 6 5 1 2 3\n4 3 2 4 8\n3\n2 3\n7 6\n8 4\n```\n\n## 输出样例\n\n```text\n2\n0\n3\n```\n\n---",
      "testCases": [
        {
          "input": "4 8\n3 4 1 8\n4 7 1 8 4\n5 6 5 1 2 3\n4 3 2 4 8\n3\n2 3\n7 6\n8 4",
          "expected": "2\n0\n3",
          "score": 100
        }
      ],
      "judgeable": true
    },
    {
      "id": "2024-10",
      "name": "绝对值比大小",
      "score": 100,
      "tests": 1,
      "sampleInput": "3\n3 -4 2",
      "sampleOutput": "-4 3 2",
      "statement": "## 题目描述\n\n给定 `n` 个整数，请按照以下规则进行排序：\n\n1. 绝对值较大的数排在前面；\n2. 如果两个数的绝对值相同，则原值较小的数排在前面。\n\n输出排序后的序列。\n\n## 输入格式\n\n第一行输入一个整数 `n`。\n\n第二行输入 `n` 个整数。\n\n## 输出格式\n\n在一行中输出排序后的 `n` 个整数，整数之间使用一个空格分隔。\n\n## 输入样例\n\n```text\n3\n3 -4 2\n```\n\n## 输出样例\n\n```text\n-4 3 2\n```",
      "testCases": [
        {
          "input": "3\n3 -4 2",
          "expected": "-4 3 2",
          "score": 100
        }
      ],
      "judgeable": true
    }
  ],
  "category": "past",
  "date": "2024",
  "status": "历年卷"
});
window.OMS_EXAM_ARCHIVE.push({
  "examVersion": "2023-transfer-major-exam",
  "title": "2023 计算机转专业机试",
  "duration": 0,
  "totalScore": 800,
  "questions": [
    {
      "id": "2023-1",
      "name": "敲笨钟",
      "score": 100,
      "tests": 10,
      "sampleInput": "5\nxun zhang zhai ju lao diao chong, xiao yue dang lian gua yu gong.\ntian sheng wo cai bi you yong, qian jin san jin huan fu lai.\nxue zhui rou zhi leng wei rong, an xiao chen jing shu wei long.\nzuo ye xing chen zuo ye feng, hua lou xi pan gui tang dong.\nren xian gui hua luo, ye jing chun shan kong.",
      "sampleOutput": "xun zhang zhai ju lao diao chong, xiao yue dang lian qiao ben zhong.\nSkipped\nxue zhui rou zhi leng wei rong, an xiao chen jing qiao ben zhong.\nSkipped\nSkipped",
      "statement": "## 题目描述\n\n给定若干句用汉语拼音表示的古诗词。每句诗由上下两半句组成，用逗号 `,` 分隔，并以句号 `.` 结尾。\n\n如果上下两半句的最后一个字都以字符串 `ong` 结尾，则认为该句押 `ong` 韵。对于押韵的诗句，将下半句最后三个字替换为：\n\n```text\nqiao ben zhong\n```\n\n并保持原有的逗号、空格和句号格式。若该句不押 `ong` 韵，则输出 `Skipped`。\n\n## 输入格式\n\n第一行输入一个正整数 `N`，表示诗句数量。\n\n接下来 `N` 行，每行输入一句用汉语拼音表示的诗句。上下两半句以逗号 `,` 分隔，整句以句号 `.` 结尾，相邻字的拼音之间用一个空格分隔。\n\n## 输出格式\n\n对于每句诗，若上下两半句均押 `ong` 韵，输出替换下半句最后三个字后的结果；否则输出 `Skipped`。每个结果占一行。\n\n## 数据范围\n\n```text\n1<=N<=20\n```\n\n每个字的拼音长度不超过 6 个字符，每行总长度不超过 100 个字符，下半句至少包含 3 个字。\n\n## 样例输入\n\n```text\n5\nxun zhang zhai ju lao diao chong, xiao yue dang lian gua yu gong.\ntian sheng wo cai bi you yong, qian jin san jin huan fu lai.\nxue zhui rou zhi leng wei rong, an xiao chen jing shu wei long.\nzuo ye xing chen zuo ye feng, hua lou xi pan gui tang dong.\nren xian gui hua luo, ye jing chun shan kong.\n```\n\n## 样例输出\n\n```text\nxun zhang zhai ju lao diao chong, xiao yue dang lian qiao ben zhong.\nSkipped\nxue zhui rou zhi leng wei rong, an xiao chen jing qiao ben zhong.\nSkipped\nSkipped\n```",
      "testCases": [
        {
          "input": "5\nxun zhang zhai ju lao diao chong, xiao yue dang lian gua yu gong.\ntian sheng wo cai bi you yong, qian jin san jin huan fu lai.\nxue zhui rou zhi leng wei rong, an xiao chen jing shu wei long.\nzuo ye xing chen zuo ye feng, hua lou xi pan gui tang dong.\nren xian gui hua luo, ye jing chun shan kong.",
          "expected": "xun zhang zhai ju lao diao chong, xiao yue dang lian qiao ben zhong.\nSkipped\nxue zhui rou zhi leng wei rong, an xiao chen jing qiao ben zhong.\nSkipped\nSkipped",
          "score": 10
        },
        {
          "input": "1\na ong, b c d ong.",
          "expected": "a ong, b qiao ben zhong.",
          "score": 10
        },
        {
          "input": "1\na ong, b c d ang.",
          "expected": "Skipped",
          "score": 10
        },
        {
          "input": "1\na ang, b c d ong.",
          "expected": "Skipped",
          "score": 10
        },
        {
          "input": "1\nlong long ong, yi er san ong.",
          "expected": "long long ong, yi qiao ben zhong.",
          "score": 10
        },
        {
          "input": "2\ndong, a b c gong.\nfeng, x y z long.",
          "expected": "dong, a qiao ben zhong.\nSkipped",
          "score": 10
        },
        {
          "input": "1\nabc ong, one two three four song.",
          "expected": "abc ong, one two qiao ben zhong.",
          "score": 10
        },
        {
          "input": "2\nabc tong, x y z tong.\nabc tong, x y z tang.",
          "expected": "abc tong, x qiao ben zhong.\nSkipped",
          "score": 10
        },
        {
          "input": "2\nx y z rong, a b c nong.\na b c song, d e f gong.",
          "expected": "x y z rong, a qiao ben zhong.\na b c song, d qiao ben zhong.",
          "score": 10
        },
        {
          "input": "1\nong, a b c ong.",
          "expected": "ong, a qiao ben zhong.",
          "score": 10
        }
      ],
      "judgeable": true
    },
    {
      "id": "2023-2",
      "name": "第 2 题（资料缺失）",
      "score": 100,
      "tests": 0,
      "sampleInput": "",
      "sampleOutput": "",
      "statement": "## 资料说明\n\n原始资料未保留本题题面，暂不支持评测。",
      "testCases": [],
      "judgeable": false
    },
    {
      "id": "2023-3",
      "name": "求化学式分子量",
      "score": 100,
      "tests": 10,
      "sampleInput": "C(OH)2",
      "sampleOutput": "46",
      "statement": "## 题目描述\n\n给定一个化学式，请计算其相对分子质量。\n\n化学式只包含元素 `C`、`H`、`O`、数字以及一对圆括号 `()`，圆括号不嵌套。元素的相对原子质量为：\n\n```text\nC = 12\nH = 1\nO = 16\n```\n\n元素符号后可以跟一个正整数，表示该元素的原子个数；若没有数字，则个数为 1。括号后也可以跟一个正整数，表示括号内所有元素数量均乘以该数；若没有数字，则倍数为 1。\n\n## 输入格式\n\n输入一行合法的化学式。\n\n## 输出格式\n\n输出一个整数，表示该化学式的相对分子质量。\n\n## 样例输入\n\n```text\nC(OH)2\n```\n\n## 样例输出\n\n```text\n46\n```",
      "testCases": [
        {
          "input": "H2O",
          "expected": "18",
          "score": 10
        },
        {
          "input": "CO2",
          "expected": "44",
          "score": 10
        },
        {
          "input": "CH3COOH",
          "expected": "60",
          "score": 10
        },
        {
          "input": "C(OH)2",
          "expected": "46",
          "score": 10
        },
        {
          "input": "CH3(COOH)3",
          "expected": "150",
          "score": 10
        },
        {
          "input": "C6H12O6",
          "expected": "180",
          "score": 10
        },
        {
          "input": "C2H5OH",
          "expected": "46",
          "score": 10
        },
        {
          "input": "C(OH)10",
          "expected": "182",
          "score": 10
        },
        {
          "input": "H2(OH)2",
          "expected": "36",
          "score": 10
        },
        {
          "input": "C10H20O5",
          "expected": "220",
          "score": 10
        }
      ],
      "judgeable": true
    },
    {
      "id": "2023-4",
      "name": "Prince and Princess",
      "score": 100,
      "tests": 10,
      "sampleInput": "2 0 0",
      "sampleOutput": "YES\n1",
      "statement": "## 题目描述\n\n王子需要在若干个房间中确定公主所在的房间。每个房间恰好住着一个人，所有人都知道每个人所在的房间。\n\n参与者分为三类：支持王子与公主婚姻的人始终说真话；反对婚姻的人始终说假话；中立者可以任意说真话或假话。公主属于第一类。\n\n王子可以向任意参与者询问下列三类问题中的任意一种：\n\n1. 你是谁？\n2. 某个指定房间里是谁？\n3. 公主在哪个房间？\n\n已知三类人的数量分别为 `a,b,c`。请判断王子是否能够在任何情况下都确定公主所在的房间。若可以，请求出最坏情况下保证确定公主位置所需询问的最少问题数。\n\n## 输入格式\n\n输入一行三个整数：\n\n```text\na b c\n```\n\n分别表示始终说真话、始终说假话和回答任意的参与者数量。\n\n## 输出格式\n\n如果无法保证确定公主的位置，输出：\n\n```text\nNO\n```\n\n如果可以确定，第一行输出 `YES`，第二行输出最坏情况下所需的最少问题数。\n\n## 数据范围\n\n```text\n1<=a<=200000\n0<=b,c<=200000\n```\n\n## 样例输入 1\n\n```text\n2 0 0\n```\n\n## 样例输出 1\n\n```text\nYES\n1\n```\n\n## 样例输入 2\n\n```text\n1 1 0\n```\n\n## 样例输出 2\n\n```text\nNO\n```",
      "testCases": [
        {
          "input": "2 0 0",
          "expected": "YES\n1",
          "score": 10
        },
        {
          "input": "1 1 0",
          "expected": "NO",
          "score": 10
        },
        {
          "input": "1 0 0",
          "expected": "YES\n0",
          "score": 10
        },
        {
          "input": "3 1 0",
          "expected": "YES\n3",
          "score": 10
        },
        {
          "input": "5 1 1",
          "expected": "YES\n5",
          "score": 10
        },
        {
          "input": "4 2 2",
          "expected": "NO",
          "score": 10
        },
        {
          "input": "10 3 2",
          "expected": "YES\n11",
          "score": 10
        },
        {
          "input": "7 3 3",
          "expected": "YES\n13",
          "score": 10
        },
        {
          "input": "200000 0 199999",
          "expected": "YES\n399999",
          "score": 10
        },
        {
          "input": "8 2 1",
          "expected": "YES\n7",
          "score": 10
        }
      ],
      "judgeable": true
    },
    {
      "id": "2023-5",
      "name": "小明打字",
      "score": 100,
      "tests": 10,
      "sampleInput": "abc[de",
      "sampleOutput": "deabc",
      "statement": "## 题目描述\n\n小明正在使用文本编辑器输入一篇文档。文档只包含小写英文字母和空格。\n\n输入过程中可能出现普通字符，也可能按下以下功能键：\n\n- `[`：Home，将光标移动到文本开头；\n- `]`：End，将光标移动到文本末尾；\n- `{`：左方向键，光标向左移动一位；若已经在文本开头则不移动；\n- `}`：右方向键，光标向右移动一位；若已经在文本末尾则不移动；\n- `-`：Insert，在插入模式和替换模式之间切换，初始为插入模式；\n- `=`：Backspace，删除光标左侧的一个字符；若光标已经位于文本开头则不进行操作。\n\n在插入模式下输入普通字符时，新字符插入到当前光标位置。\n\n在替换模式下输入普通字符时，若光标右侧存在字符，则用新字符替换光标位置的字符；若光标位于文本末尾，则直接在末尾添加新字符。输入普通字符后，光标向右移动一位。\n\n请输出全部按键操作结束后屏幕上显示的文本。\n\n## 输入格式\n\n输入一行字符串，表示按键序列。按键序列只包含小写英文字母、空格以及字符 `[ ] { } - =`。\n\n## 输出格式\n\n输出最终显示的文本。\n\n## 数据范围\n\n输入按键序列长度不超过 `50000`。\n\n## 样例输入\n\n```text\nabc[de\n```\n\n## 样例输出\n\n```text\ndeabc\n```",
      "testCases": [
        {
          "input": "abc",
          "expected": "abc",
          "score": 10
        },
        {
          "input": "abc[de",
          "expected": "deabc",
          "score": 10
        },
        {
          "input": "abc[de]f",
          "expected": "deabcf",
          "score": 10
        },
        {
          "input": "abc{{=x",
          "expected": "xbc",
          "score": 10
        },
        {
          "input": "abc-de",
          "expected": "abcde",
          "score": 10
        },
        {
          "input": "abc-XY",
          "expected": "abcXY",
          "score": 10
        },
        {
          "input": "hello[=a",
          "expected": "ahello",
          "score": 10
        },
        {
          "input": "abc{=x}",
          "expected": "axc",
          "score": 10
        },
        {
          "input": "ab-cd[xy]z",
          "expected": "xycdz",
          "score": 10
        },
        {
          "input": "the quick-brown{=X} fox",
          "expected": "the quickbroX fox",
          "score": 10
        }
      ],
      "judgeable": true
    },
    {
      "id": "2023-6",
      "name": "月饼",
      "score": 100,
      "tests": 10,
      "sampleInput": "3 20\n18 15 10\n75 72 45",
      "sampleOutput": "94.50",
      "statement": "## 题目描述\n\n给定 `N` 种月饼的库存量和全部库存的总售价，以及市场的最大需求量 `D`。不同种类的月饼可以只出售部分库存。请合理安排销售数量，使总收益最大。\n\n## 输入格式\n\n第一行输入一个正整数 `N` 和一个正数 `D`，分别表示月饼种类数和市场最大需求量。\n\n第二行输入 `N` 个正数，表示每种月饼的库存量。\n\n第三行输入 `N` 个正数，表示每种月饼全部库存的总售价。\n\n## 输出格式\n\n输出能够获得的最大收益，结果保留两位小数。\n\n## 数据范围\n\n```text\n1<=N<=1000\n0<D<=500\n```\n\n## 样例输入\n\n```text\n3 20\n18 15 10\n75 72 45\n```\n\n## 样例输出\n\n```text\n94.50\n```",
      "testCases": [
        {
          "input": "3 20\n18 15 10\n75 72 45",
          "expected": "94.50",
          "score": 10
        },
        {
          "input": "1 5\n10\n100",
          "expected": "50.00",
          "score": 10
        },
        {
          "input": "2 10\n5 5\n20 50",
          "expected": "70.00",
          "score": 10
        },
        {
          "input": "3 100\n10 20 30\n10 40 90",
          "expected": "140.00",
          "score": 10
        },
        {
          "input": "4 25\n10 10 10 10\n10 20 30 40",
          "expected": "80.00",
          "score": 10
        },
        {
          "input": "3 8\n2 4 8\n6 8 8",
          "expected": "16.00",
          "score": 10
        },
        {
          "input": "5 17\n3 6 9 12 15\n12 18 18 12 15",
          "expected": "46.00",
          "score": 10
        },
        {
          "input": "2 1\n3 7\n9 14",
          "expected": "3.00",
          "score": 10
        },
        {
          "input": "4 30\n5 10 15 20\n25 20 45 80",
          "expected": "120.00",
          "score": 10
        },
        {
          "input": "3 7\n1 2 10\n1 10 20",
          "expected": "20.00",
          "score": 10
        }
      ],
      "judgeable": true
    },
    {
      "id": "2023-7",
      "name": "质因数分解",
      "score": 100,
      "tests": 10,
      "sampleInput": "2\n6\n36",
      "sampleOutput": "2\n2*3\n2^2*3^2",
      "statement": "## 题目描述\n\n任意一个大于等于 2 的正整数都可以唯一分解为若干质数幂的乘积。\n\n给定若干个正整数，请分别输出它们的质因数分解式。质因子必须按照从小到大的顺序输出。\n\n若某个质因子的指数为 1，只输出该质因子；若指数大于 1，则使用 `质因子^指数` 的形式。不同质因子之间使用字符 `*` 连接。\n\n## 输入格式\n\n输入包含若干行，每行输入一个正整数 `n`，一直读到文件结束。\n\n## 输出格式\n\n对于每个输入的 `n`，输出一行对应的质因数分解式。\n\n## 数据范围\n\n```text\n2<=n<=100000000\n```\n\n## 样例输入\n\n```text\n2\n6\n36\n```\n\n## 样例输出\n\n```text\n2\n2*3\n2^2*3^2\n```",
      "testCases": [
        {
          "input": "2\n6\n36",
          "expected": "2\n2*3\n2^2*3^2",
          "score": 10
        },
        {
          "input": "8\n27\n125",
          "expected": "2^3\n3^3\n5^3",
          "score": 10
        },
        {
          "input": "97",
          "expected": "97",
          "score": 10
        },
        {
          "input": "100000000",
          "expected": "2^8*5^8",
          "score": 10
        },
        {
          "input": "99999989",
          "expected": "99999989",
          "score": 10
        },
        {
          "input": "12\n18\n20\n45",
          "expected": "2^2*3\n2*3^2\n2^2*5\n3^2*5",
          "score": 10
        },
        {
          "input": "49\n121\n169",
          "expected": "7^2\n11^2\n13^2",
          "score": 10
        },
        {
          "input": "1024\n6561",
          "expected": "2^10\n3^8",
          "score": 10
        },
        {
          "input": "99999999",
          "expected": "3^2*11*73*101*137",
          "score": 10
        },
        {
          "input": "30\n42\n70\n210",
          "expected": "2*3*5\n2*3*7\n2*5*7\n2*3*5*7",
          "score": 10
        }
      ],
      "judgeable": true
    },
    {
      "id": "2023-8",
      "name": "幸运 ID",
      "score": 100,
      "tests": 10,
      "sampleInput": "000000",
      "sampleOutput": "0",
      "statement": "## 题目描述\n\n给定一个长度为 6 的数字字符串作为票据 ID。\n\n如果前三位数字之和等于后三位数字之和，则称该 ID 为幸运 ID。\n\n一次操作可以选择 ID 中任意一位数字，并将其替换为 `0~9` 中的任意数字。请计算至少需要进行多少次操作，才能将给定 ID 变成幸运 ID。\n\n## 输入格式\n\n输入一行长度为 6 的字符串，仅包含数字 `0~9`。\n\n## 输出格式\n\n输出一个整数，表示最少操作次数。\n\n## 样例输入 1\n\n```text\n000000\n```\n\n## 样例输出 1\n\n```text\n0\n```\n\n## 样例输入 2\n\n```text\n000018\n```\n\n## 样例输出 2\n\n```text\n1\n```",
      "testCases": [
        {
          "input": "000000",
          "expected": "0",
          "score": 10
        },
        {
          "input": "000018",
          "expected": "1",
          "score": 10
        },
        {
          "input": "123456",
          "expected": "2",
          "score": 10
        },
        {
          "input": "555000",
          "expected": "2",
          "score": 10
        },
        {
          "input": "999000",
          "expected": "3",
          "score": 10
        },
        {
          "input": "123321",
          "expected": "0",
          "score": 10
        },
        {
          "input": "100999",
          "expected": "3",
          "score": 10
        },
        {
          "input": "090909",
          "expected": "1",
          "score": 10
        },
        {
          "input": "001900",
          "expected": "1",
          "score": 10
        },
        {
          "input": "987654",
          "expected": "1",
          "score": 10
        }
      ],
      "judgeable": true
    }
  ],
  "category": "past",
  "date": "2023",
  "status": "历年卷"
});
window.OMS_EXAM_ARCHIVE.push({
  "examVersion": "2022-transfer-major-exam",
  "title": "2022 计算机转专业机试",
  "duration": 0,
  "totalScore": 800,
  "questions": [
    {
      "id": "2022-1",
      "name": "螺旋矩阵",
      "score": 100,
      "tests": 10,
      "sampleInput": "3 4",
      "sampleOutput": "1 2 3 4\n10 11 12 5\n9 8 7 6",
      "statement": "## 题目描述\n\n给定两个正整数 `m,n`，请构造一个 `m` 行 `n` 列的螺旋矩阵。\n\n从左上角开始，将整数 `1,2,...,m×n` 按顺时针方向依次填入矩阵：先从左向右填满第一行，再向下、向左、向上，并不断向内收缩，直到所有位置均被填满。\n\n## 输入格式\n\n输入一行两个正整数：\n\n```text\nm n\n```\n\n分别表示矩阵的行数和列数。\n\n## 输出格式\n\n输出 `m` 行，每行 `n` 个整数，表示构造得到的螺旋矩阵。\n\n同一行相邻整数之间用一个空格分隔。\n\n## 样例输入\n\n```text\n3 4\n```\n\n## 样例输出\n\n```text\n1 2 3 4\n10 11 12 5\n9 8 7 6\n```",
      "testCases": [
        {
          "input": "1 1",
          "expected": "1",
          "score": 10
        },
        {
          "input": "1 5",
          "expected": "1 2 3 4 5",
          "score": 10
        },
        {
          "input": "5 1",
          "expected": "1\n2\n3\n4\n5",
          "score": 10
        },
        {
          "input": "2 2",
          "expected": "1 2\n4 3",
          "score": 10
        },
        {
          "input": "2 3",
          "expected": "1 2 3\n6 5 4",
          "score": 10
        },
        {
          "input": "3 2",
          "expected": "1 2\n6 3\n5 4",
          "score": 10
        },
        {
          "input": "3 3",
          "expected": "1 2 3\n8 9 4\n7 6 5",
          "score": 10
        },
        {
          "input": "4 5",
          "expected": "1 2 3 4 5\n14 15 16 17 6\n13 20 19 18 7\n12 11 10 9 8",
          "score": 10
        },
        {
          "input": "5 4",
          "expected": "1 2 3 4\n14 15 16 5\n13 20 17 6\n12 19 18 7\n11 10 9 8",
          "score": 10
        },
        {
          "input": "6 6",
          "expected": "1 2 3 4 5 6\n20 21 22 23 24 7\n19 32 33 34 25 8\n18 31 36 35 26 9\n17 30 29 28 27 10\n16 15 14 13 12 11",
          "score": 10
        }
      ],
      "judgeable": true
    },
    {
      "id": "2022-2",
      "name": "化学分子质量计算",
      "score": 100,
      "tests": 10,
      "sampleInput": "C9(O3H2)1",
      "sampleOutput": "158",
      "statement": "## 题目描述\n\n给定一个只包含元素 `C`、`H`、`O` 的化学式，请计算其相对分子质量。\n\n三种元素的相对原子质量为：\n\n```text\nC = 12\nH = 1\nO = 16\n```\n\n化学式遵循以下规则：\n\n1. 元素符号后可以跟一个正整数，表示该元素的原子个数；若没有数字，则个数为 1。\n2. 化学式中可以出现圆括号 `()`，括号后可以跟一个正整数，表示括号内所有元素的原子个数均乘以该数；若没有数字，则倍数为 1。\n3. 圆括号不会嵌套。\n4. 化学式中可能出现多个互不嵌套的括号组。\n\n## 输入格式\n\n输入一行合法的化学式。\n\n## 输出格式\n\n输出一个整数，表示该化学式的相对分子质量。\n\n## 样例输入\n\n```text\nC9(O3H2)1\n```\n\n## 样例输出\n\n```text\n158\n```",
      "testCases": [
        {
          "input": "H2O",
          "expected": "18",
          "score": 10
        },
        {
          "input": "CO2",
          "expected": "44",
          "score": 10
        },
        {
          "input": "C9(O3H2)1",
          "expected": "158",
          "score": 10
        },
        {
          "input": "CH3COOH",
          "expected": "60",
          "score": 10
        },
        {
          "input": "C(OH)2",
          "expected": "46",
          "score": 10
        },
        {
          "input": "C6H12O6",
          "expected": "180",
          "score": 10
        },
        {
          "input": "C2H5OH",
          "expected": "46",
          "score": 10
        },
        {
          "input": "C(OH)10",
          "expected": "182",
          "score": 10
        },
        {
          "input": "H2(OH)2",
          "expected": "36",
          "score": 10
        },
        {
          "input": "C2(OH)2O3",
          "expected": "106",
          "score": 10
        }
      ],
      "judgeable": true
    },
    {
      "id": "2022-3",
      "name": "购票插队",
      "score": 100,
      "tests": 10,
      "sampleInput": "5 5\n0\n0\n1 1 3\n0\n0",
      "sampleOutput": "1 2 4 5\n0",
      "statement": "## 题目描述\n\n共有 `n` 个人依次来到售票队伍。每个人的编号按照到达顺序依次为 `1~n`。\n\n系统维护一个总怒气值，初始为 `0`。给定怒气阈值 `m`。\n\n每个人有两种行为：\n\n### 正常排队\n\n输入：\n\n```text\n0\n```\n\n表示该人正常排到当前队伍末尾。\n\n### 插队\n\n输入：\n\n```text\n1 x y\n```\n\n表示该人插到当前队伍中编号为 `x` 的人前面。\n\n本次插队会使原本从 `x` 开始到队尾的每个人增加 `y` 点怒气，因此总怒气值增加：\n\n```text\n受影响人数 × y\n```\n\n如果一次插队后总怒气值严格大于 `m`，则立即将当前队伍中所有插队者赶走，只保留此前正常排队的人，并将总怒气值清零。\n\n题目保证执行插队操作时，编号 `x` 的人当前仍在队伍中。\n\n请输出所有 `n` 个人处理完毕后的最终队伍以及当前总怒气值。\n\n## 输入格式\n\n第一行输入两个整数：\n\n```text\nn m\n```\n\n接下来 `n` 行依次描述编号为 `1~n` 的人的行为。\n\n若该人正常排队，输入：\n\n```text\n0\n```\n\n若该人插队，输入：\n\n```text\n1 x y\n```\n\n## 输出格式\n\n第一行按照从队首到队尾的顺序输出最终仍在队伍中的人员编号，编号之间用一个空格分隔。\n\n第二行输出当前总怒气值。\n\n## 样例输入\n\n```text\n5 5\n0\n0\n1 1 3\n0\n0\n```\n\n## 样例输出\n\n```text\n1 2 4 5\n0\n```",
      "testCases": [
        {
          "input": "5 100\n0\n0\n0\n0\n0",
          "expected": "1 2 3 4 5\n0",
          "score": 10
        },
        {
          "input": "4 20\n0\n0\n1 1 2\n0",
          "expected": "3 1 2 4\n4",
          "score": 10
        },
        {
          "input": "5 5\n0\n0\n1 1 3\n0\n0",
          "expected": "1 2 4 5\n0",
          "score": 10
        },
        {
          "input": "6 20\n0\n0\n1 2 2\n0\n1 1 1\n0",
          "expected": "5 1 3 2 4 6\n6",
          "score": 10
        },
        {
          "input": "7 15\n0\n0\n0\n1 2 2\n1 1 1\n0\n0",
          "expected": "5 1 4 2 3 6 7\n8",
          "score": 10
        },
        {
          "input": "5 9\n0\n0\n1 1 2\n1 2 1\n0",
          "expected": "3 1 4 2 5\n5",
          "score": 10
        },
        {
          "input": "8 50\n0\n0\n0\n1 2 3\n0\n1 1 2\n0\n0",
          "expected": "6 1 4 2 3 5 7 8\n16",
          "score": 10
        },
        {
          "input": "6 6\n0\n0\n1 1 2\n0\n1 2 2\n0",
          "expected": "1 2 4 6\n0",
          "score": 10
        },
        {
          "input": "9 30\n0\n0\n0\n1 2 1\n1 1 2\n0\n0\n1 6 1\n0",
          "expected": "5 1 4 2 3 8 6 7 9\n12",
          "score": 10
        },
        {
          "input": "10 25\n0\n0\n0\n0\n1 3 2\n0\n1 2 1\n0\n0\n0",
          "expected": "1 7 2 5 3 4 6 8 9 10\n9",
          "score": 10
        }
      ],
      "judgeable": true
    },
    {
      "id": "2022-4",
      "name": "1-N 全排列",
      "score": 100,
      "tests": 10,
      "sampleInput": "3",
      "sampleOutput": "1 2 3\n1 3 2\n2 1 3\n2 3 1\n3 1 2\n3 2 1",
      "statement": "## 题目描述\n\n给定一个正整数 `n`，请按照字典序输出 `1~n` 的所有排列。\n\n每个数字在一个排列中恰好出现一次。\n\n## 输入格式\n\n输入一个整数：\n\n```text\nn\n```\n\n## 输出格式\n\n每行输出一个排列，数字之间用一个空格分隔。\n\n排列按照字典序从小到大输出。\n\n## 数据范围\n\n```text\n1<=n<10\n```\n\n## 样例输入\n\n```text\n3\n```\n\n## 样例输出\n\n```text\n1 2 3\n1 3 2\n2 1 3\n2 3 1\n3 1 2\n3 2 1\n```",
      "testCases": [
        {
          "input": "1",
          "expected": "1",
          "score": 10
        },
        {
          "input": "2",
          "expected": "1 2\n2 1",
          "score": 10
        },
        {
          "input": "3",
          "expected": "1 2 3\n1 3 2\n2 1 3\n2 3 1\n3 1 2\n3 2 1",
          "score": 10
        },
        {
          "input": "4",
          "expected": "1 2 3 4\n1 2 4 3\n1 3 2 4\n1 3 4 2\n1 4 2 3\n1 4 3 2\n2 1 3 4\n2 1 4 3\n2 3 1 4\n2 3 4 1\n2 4 1 3\n2 4 3 1\n3 1 2 4\n3 1 4 2\n3 2 1 4\n3 2 4 1\n3 4 1 2\n3 4 2 1\n4 1 2 3\n4 1 3 2\n4 2 1 3\n4 2 3 1\n4 3 1 2\n4 3 2 1",
          "score": 10
        },
        {
          "input": "5",
          "expected": "1 2 3 4 5\n1 2 3 5 4\n1 2 4 3 5\n1 2 4 5 3\n1 2 5 3 4\n1 2 5 4 3\n1 3 2 4 5\n1 3 2 5 4\n1 3 4 2 5\n1 3 4 5 2\n1 3 5 2 4\n1 3 5 4 2\n1 4 2 3 5\n1 4 2 5 3\n1 4 3 2 5\n1 4 3 5 2\n1 4 5 2 3\n1 4 5 3 2\n1 5 2 3 4\n1 5 2 4 3\n1 5 3 2 4\n1 5 3 4 2\n1 5 4 2 3\n1 5 4 3 2\n2 1 3 4 5\n2 1 3 5 4\n2 1 4 3 5\n2 1 4 5 3\n2 1 5 3 4\n2 1 5 4 3\n2 3 1 4 5\n2 3 1 5 4\n2 3 4 1 5\n2 3 4 5 1\n2 3 5 1 4\n2 3 5 4 1\n2 4 1 3 5\n2 4 1 5 3\n2 4 3 1 5\n2 4 3 5 1\n2 4 5 1 3\n2 4 5 3 1\n2 5 1 3 4\n2 5 1 4 3\n2 5 3 1 4\n2 5 3 4 1\n2 5 4 1 3\n2 5 4 3 1\n3 1 2 4 5\n3 1 2 5 4\n3 1 4 2 5\n3 1 4 5 2\n3 1 5 2 4\n3 1 5 4 2\n3 2 1 4 5\n3 2 1 5 4\n3 2 4 1 5\n3 2 4 5 1\n3 2 5 1 4\n3 2 5 4 1\n3 4 1 2 5\n3 4 1 5 2\n3 4 2 1 5\n3 4 2 5 1\n3 4 5 1 2\n3 4 5 2 1\n3 5 1 2 4\n3 5 1 4 2\n3 5 2 1 4\n3 5 2 4 1\n3 5 4 1 2\n3 5 4 2 1\n4 1 2 3 5\n4 1 2 5 3\n4 1 3 2 5\n4 1 3 5 2\n4 1 5 2 3\n4 1 5 3 2\n4 2 1 3 5\n4 2 1 5 3\n4 2 3 1 5\n4 2 3 5 1\n4 2 5 1 3\n4 2 5 3 1\n4 3 1 2 5\n4 3 1 5 2\n4 3 2 1 5\n4 3 2 5 1\n4 3 5 1 2\n4 3 5 2 1\n4 5 1 2 3\n4 5 1 3 2\n4 5 2 1 3\n4 5 2 3 1\n4 5 3 1 2\n4 5 3 2 1\n5 1 2 3 4\n5 1 2 4 3\n5 1 3 2 4\n5 1 3 4 2\n5 1 4 2 3\n5 1 4 3 2\n5 2 1 3 4\n5 2 1 4 3\n5 2 3 1 4\n5 2 3 4 1\n5 2 4 1 3\n5 2 4 3 1\n5 3 1 2 4\n5 3 1 4 2\n5 3 2 1 4\n5 3 2 4 1\n5 3 4 1 2\n5 3 4 2 1\n5 4 1 2 3\n5 4 1 3 2\n5 4 2 1 3\n5 4 2 3 1\n5 4 3 1 2\n5 4 3 2 1",
          "score": 10
        },
        {
          "input": "2",
          "expected": "1 2\n2 1",
          "score": 10
        },
        {
          "input": "3",
          "expected": "1 2 3\n1 3 2\n2 1 3\n2 3 1\n3 1 2\n3 2 1",
          "score": 10
        },
        {
          "input": "4",
          "expected": "1 2 3 4\n1 2 4 3\n1 3 2 4\n1 3 4 2\n1 4 2 3\n1 4 3 2\n2 1 3 4\n2 1 4 3\n2 3 1 4\n2 3 4 1\n2 4 1 3\n2 4 3 1\n3 1 2 4\n3 1 4 2\n3 2 1 4\n3 2 4 1\n3 4 1 2\n3 4 2 1\n4 1 2 3\n4 1 3 2\n4 2 1 3\n4 2 3 1\n4 3 1 2\n4 3 2 1",
          "score": 10
        },
        {
          "input": "5",
          "expected": "1 2 3 4 5\n1 2 3 5 4\n1 2 4 3 5\n1 2 4 5 3\n1 2 5 3 4\n1 2 5 4 3\n1 3 2 4 5\n1 3 2 5 4\n1 3 4 2 5\n1 3 4 5 2\n1 3 5 2 4\n1 3 5 4 2\n1 4 2 3 5\n1 4 2 5 3\n1 4 3 2 5\n1 4 3 5 2\n1 4 5 2 3\n1 4 5 3 2\n1 5 2 3 4\n1 5 2 4 3\n1 5 3 2 4\n1 5 3 4 2\n1 5 4 2 3\n1 5 4 3 2\n2 1 3 4 5\n2 1 3 5 4\n2 1 4 3 5\n2 1 4 5 3\n2 1 5 3 4\n2 1 5 4 3\n2 3 1 4 5\n2 3 1 5 4\n2 3 4 1 5\n2 3 4 5 1\n2 3 5 1 4\n2 3 5 4 1\n2 4 1 3 5\n2 4 1 5 3\n2 4 3 1 5\n2 4 3 5 1\n2 4 5 1 3\n2 4 5 3 1\n2 5 1 3 4\n2 5 1 4 3\n2 5 3 1 4\n2 5 3 4 1\n2 5 4 1 3\n2 5 4 3 1\n3 1 2 4 5\n3 1 2 5 4\n3 1 4 2 5\n3 1 4 5 2\n3 1 5 2 4\n3 1 5 4 2\n3 2 1 4 5\n3 2 1 5 4\n3 2 4 1 5\n3 2 4 5 1\n3 2 5 1 4\n3 2 5 4 1\n3 4 1 2 5\n3 4 1 5 2\n3 4 2 1 5\n3 4 2 5 1\n3 4 5 1 2\n3 4 5 2 1\n3 5 1 2 4\n3 5 1 4 2\n3 5 2 1 4\n3 5 2 4 1\n3 5 4 1 2\n3 5 4 2 1\n4 1 2 3 5\n4 1 2 5 3\n4 1 3 2 5\n4 1 3 5 2\n4 1 5 2 3\n4 1 5 3 2\n4 2 1 3 5\n4 2 1 5 3\n4 2 3 1 5\n4 2 3 5 1\n4 2 5 1 3\n4 2 5 3 1\n4 3 1 2 5\n4 3 1 5 2\n4 3 2 1 5\n4 3 2 5 1\n4 3 5 1 2\n4 3 5 2 1\n4 5 1 2 3\n4 5 1 3 2\n4 5 2 1 3\n4 5 2 3 1\n4 5 3 1 2\n4 5 3 2 1\n5 1 2 3 4\n5 1 2 4 3\n5 1 3 2 4\n5 1 3 4 2\n5 1 4 2 3\n5 1 4 3 2\n5 2 1 3 4\n5 2 1 4 3\n5 2 3 1 4\n5 2 3 4 1\n5 2 4 1 3\n5 2 4 3 1\n5 3 1 2 4\n5 3 1 4 2\n5 3 2 1 4\n5 3 2 4 1\n5 3 4 1 2\n5 3 4 2 1\n5 4 1 2 3\n5 4 1 3 2\n5 4 2 1 3\n5 4 2 3 1\n5 4 3 1 2\n5 4 3 2 1",
          "score": 10
        },
        {
          "input": "6",
          "expected": "1 2 3 4 5 6\n1 2 3 4 6 5\n1 2 3 5 4 6\n1 2 3 5 6 4\n1 2 3 6 4 5\n1 2 3 6 5 4\n1 2 4 3 5 6\n1 2 4 3 6 5\n1 2 4 5 3 6\n1 2 4 5 6 3\n1 2 4 6 3 5\n1 2 4 6 5 3\n1 2 5 3 4 6\n1 2 5 3 6 4\n1 2 5 4 3 6\n1 2 5 4 6 3\n1 2 5 6 3 4\n1 2 5 6 4 3\n1 2 6 3 4 5\n1 2 6 3 5 4\n1 2 6 4 3 5\n1 2 6 4 5 3\n1 2 6 5 3 4\n1 2 6 5 4 3\n1 3 2 4 5 6\n1 3 2 4 6 5\n1 3 2 5 4 6\n1 3 2 5 6 4\n1 3 2 6 4 5\n1 3 2 6 5 4\n1 3 4 2 5 6\n1 3 4 2 6 5\n1 3 4 5 2 6\n1 3 4 5 6 2\n1 3 4 6 2 5\n1 3 4 6 5 2\n1 3 5 2 4 6\n1 3 5 2 6 4\n1 3 5 4 2 6\n1 3 5 4 6 2\n1 3 5 6 2 4\n1 3 5 6 4 2\n1 3 6 2 4 5\n1 3 6 2 5 4\n1 3 6 4 2 5\n1 3 6 4 5 2\n1 3 6 5 2 4\n1 3 6 5 4 2\n1 4 2 3 5 6\n1 4 2 3 6 5\n1 4 2 5 3 6\n1 4 2 5 6 3\n1 4 2 6 3 5\n1 4 2 6 5 3\n1 4 3 2 5 6\n1 4 3 2 6 5\n1 4 3 5 2 6\n1 4 3 5 6 2\n1 4 3 6 2 5\n1 4 3 6 5 2\n1 4 5 2 3 6\n1 4 5 2 6 3\n1 4 5 3 2 6\n1 4 5 3 6 2\n1 4 5 6 2 3\n1 4 5 6 3 2\n1 4 6 2 3 5\n1 4 6 2 5 3\n1 4 6 3 2 5\n1 4 6 3 5 2\n1 4 6 5 2 3\n1 4 6 5 3 2\n1 5 2 3 4 6\n1 5 2 3 6 4\n1 5 2 4 3 6\n1 5 2 4 6 3\n1 5 2 6 3 4\n1 5 2 6 4 3\n1 5 3 2 4 6\n1 5 3 2 6 4\n1 5 3 4 2 6\n1 5 3 4 6 2\n1 5 3 6 2 4\n1 5 3 6 4 2\n1 5 4 2 3 6\n1 5 4 2 6 3\n1 5 4 3 2 6\n1 5 4 3 6 2\n1 5 4 6 2 3\n1 5 4 6 3 2\n1 5 6 2 3 4\n1 5 6 2 4 3\n1 5 6 3 2 4\n1 5 6 3 4 2\n1 5 6 4 2 3\n1 5 6 4 3 2\n1 6 2 3 4 5\n1 6 2 3 5 4\n1 6 2 4 3 5\n1 6 2 4 5 3\n1 6 2 5 3 4\n1 6 2 5 4 3\n1 6 3 2 4 5\n1 6 3 2 5 4\n1 6 3 4 2 5\n1 6 3 4 5 2\n1 6 3 5 2 4\n1 6 3 5 4 2\n1 6 4 2 3 5\n1 6 4 2 5 3\n1 6 4 3 2 5\n1 6 4 3 5 2\n1 6 4 5 2 3\n1 6 4 5 3 2\n1 6 5 2 3 4\n1 6 5 2 4 3\n1 6 5 3 2 4\n1 6 5 3 4 2\n1 6 5 4 2 3\n1 6 5 4 3 2\n2 1 3 4 5 6\n2 1 3 4 6 5\n2 1 3 5 4 6\n2 1 3 5 6 4\n2 1 3 6 4 5\n2 1 3 6 5 4\n2 1 4 3 5 6\n2 1 4 3 6 5\n2 1 4 5 3 6\n2 1 4 5 6 3\n2 1 4 6 3 5\n2 1 4 6 5 3\n2 1 5 3 4 6\n2 1 5 3 6 4\n2 1 5 4 3 6\n2 1 5 4 6 3\n2 1 5 6 3 4\n2 1 5 6 4 3\n2 1 6 3 4 5\n2 1 6 3 5 4\n2 1 6 4 3 5\n2 1 6 4 5 3\n2 1 6 5 3 4\n2 1 6 5 4 3\n2 3 1 4 5 6\n2 3 1 4 6 5\n2 3 1 5 4 6\n2 3 1 5 6 4\n2 3 1 6 4 5\n2 3 1 6 5 4\n2 3 4 1 5 6\n2 3 4 1 6 5\n2 3 4 5 1 6\n2 3 4 5 6 1\n2 3 4 6 1 5\n2 3 4 6 5 1\n2 3 5 1 4 6\n2 3 5 1 6 4\n2 3 5 4 1 6\n2 3 5 4 6 1\n2 3 5 6 1 4\n2 3 5 6 4 1\n2 3 6 1 4 5\n2 3 6 1 5 4\n2 3 6 4 1 5\n2 3 6 4 5 1\n2 3 6 5 1 4\n2 3 6 5 4 1\n2 4 1 3 5 6\n2 4 1 3 6 5\n2 4 1 5 3 6\n2 4 1 5 6 3\n2 4 1 6 3 5\n2 4 1 6 5 3\n2 4 3 1 5 6\n2 4 3 1 6 5\n2 4 3 5 1 6\n2 4 3 5 6 1\n2 4 3 6 1 5\n2 4 3 6 5 1\n2 4 5 1 3 6\n2 4 5 1 6 3\n2 4 5 3 1 6\n2 4 5 3 6 1\n2 4 5 6 1 3\n2 4 5 6 3 1\n2 4 6 1 3 5\n2 4 6 1 5 3\n2 4 6 3 1 5\n2 4 6 3 5 1\n2 4 6 5 1 3\n2 4 6 5 3 1\n2 5 1 3 4 6\n2 5 1 3 6 4\n2 5 1 4 3 6\n2 5 1 4 6 3\n2 5 1 6 3 4\n2 5 1 6 4 3\n2 5 3 1 4 6\n2 5 3 1 6 4\n2 5 3 4 1 6\n2 5 3 4 6 1\n2 5 3 6 1 4\n2 5 3 6 4 1\n2 5 4 1 3 6\n2 5 4 1 6 3\n2 5 4 3 1 6\n2 5 4 3 6 1\n2 5 4 6 1 3\n2 5 4 6 3 1\n2 5 6 1 3 4\n2 5 6 1 4 3\n2 5 6 3 1 4\n2 5 6 3 4 1\n2 5 6 4 1 3\n2 5 6 4 3 1\n2 6 1 3 4 5\n2 6 1 3 5 4\n2 6 1 4 3 5\n2 6 1 4 5 3\n2 6 1 5 3 4\n2 6 1 5 4 3\n2 6 3 1 4 5\n2 6 3 1 5 4\n2 6 3 4 1 5\n2 6 3 4 5 1\n2 6 3 5 1 4\n2 6 3 5 4 1\n2 6 4 1 3 5\n2 6 4 1 5 3\n2 6 4 3 1 5\n2 6 4 3 5 1\n2 6 4 5 1 3\n2 6 4 5 3 1\n2 6 5 1 3 4\n2 6 5 1 4 3\n2 6 5 3 1 4\n2 6 5 3 4 1\n2 6 5 4 1 3\n2 6 5 4 3 1\n3 1 2 4 5 6\n3 1 2 4 6 5\n3 1 2 5 4 6\n3 1 2 5 6 4\n3 1 2 6 4 5\n3 1 2 6 5 4\n3 1 4 2 5 6\n3 1 4 2 6 5\n3 1 4 5 2 6\n3 1 4 5 6 2\n3 1 4 6 2 5\n3 1 4 6 5 2\n3 1 5 2 4 6\n3 1 5 2 6 4\n3 1 5 4 2 6\n3 1 5 4 6 2\n3 1 5 6 2 4\n3 1 5 6 4 2\n3 1 6 2 4 5\n3 1 6 2 5 4\n3 1 6 4 2 5\n3 1 6 4 5 2\n3 1 6 5 2 4\n3 1 6 5 4 2\n3 2 1 4 5 6\n3 2 1 4 6 5\n3 2 1 5 4 6\n3 2 1 5 6 4\n3 2 1 6 4 5\n3 2 1 6 5 4\n3 2 4 1 5 6\n3 2 4 1 6 5\n3 2 4 5 1 6\n3 2 4 5 6 1\n3 2 4 6 1 5\n3 2 4 6 5 1\n3 2 5 1 4 6\n3 2 5 1 6 4\n3 2 5 4 1 6\n3 2 5 4 6 1\n3 2 5 6 1 4\n3 2 5 6 4 1\n3 2 6 1 4 5\n3 2 6 1 5 4\n3 2 6 4 1 5\n3 2 6 4 5 1\n3 2 6 5 1 4\n3 2 6 5 4 1\n3 4 1 2 5 6\n3 4 1 2 6 5\n3 4 1 5 2 6\n3 4 1 5 6 2\n3 4 1 6 2 5\n3 4 1 6 5 2\n3 4 2 1 5 6\n3 4 2 1 6 5\n3 4 2 5 1 6\n3 4 2 5 6 1\n3 4 2 6 1 5\n3 4 2 6 5 1\n3 4 5 1 2 6\n3 4 5 1 6 2\n3 4 5 2 1 6\n3 4 5 2 6 1\n3 4 5 6 1 2\n3 4 5 6 2 1\n3 4 6 1 2 5\n3 4 6 1 5 2\n3 4 6 2 1 5\n3 4 6 2 5 1\n3 4 6 5 1 2\n3 4 6 5 2 1\n3 5 1 2 4 6\n3 5 1 2 6 4\n3 5 1 4 2 6\n3 5 1 4 6 2\n3 5 1 6 2 4\n3 5 1 6 4 2\n3 5 2 1 4 6\n3 5 2 1 6 4\n3 5 2 4 1 6\n3 5 2 4 6 1\n3 5 2 6 1 4\n3 5 2 6 4 1\n3 5 4 1 2 6\n3 5 4 1 6 2\n3 5 4 2 1 6\n3 5 4 2 6 1\n3 5 4 6 1 2\n3 5 4 6 2 1\n3 5 6 1 2 4\n3 5 6 1 4 2\n3 5 6 2 1 4\n3 5 6 2 4 1\n3 5 6 4 1 2\n3 5 6 4 2 1\n3 6 1 2 4 5\n3 6 1 2 5 4\n3 6 1 4 2 5\n3 6 1 4 5 2\n3 6 1 5 2 4\n3 6 1 5 4 2\n3 6 2 1 4 5\n3 6 2 1 5 4\n3 6 2 4 1 5\n3 6 2 4 5 1\n3 6 2 5 1 4\n3 6 2 5 4 1\n3 6 4 1 2 5\n3 6 4 1 5 2\n3 6 4 2 1 5\n3 6 4 2 5 1\n3 6 4 5 1 2\n3 6 4 5 2 1\n3 6 5 1 2 4\n3 6 5 1 4 2\n3 6 5 2 1 4\n3 6 5 2 4 1\n3 6 5 4 1 2\n3 6 5 4 2 1\n4 1 2 3 5 6\n4 1 2 3 6 5\n4 1 2 5 3 6\n4 1 2 5 6 3\n4 1 2 6 3 5\n4 1 2 6 5 3\n4 1 3 2 5 6\n4 1 3 2 6 5\n4 1 3 5 2 6\n4 1 3 5 6 2\n4 1 3 6 2 5\n4 1 3 6 5 2\n4 1 5 2 3 6\n4 1 5 2 6 3\n4 1 5 3 2 6\n4 1 5 3 6 2\n4 1 5 6 2 3\n4 1 5 6 3 2\n4 1 6 2 3 5\n4 1 6 2 5 3\n4 1 6 3 2 5\n4 1 6 3 5 2\n4 1 6 5 2 3\n4 1 6 5 3 2\n4 2 1 3 5 6\n4 2 1 3 6 5\n4 2 1 5 3 6\n4 2 1 5 6 3\n4 2 1 6 3 5\n4 2 1 6 5 3\n4 2 3 1 5 6\n4 2 3 1 6 5\n4 2 3 5 1 6\n4 2 3 5 6 1\n4 2 3 6 1 5\n4 2 3 6 5 1\n4 2 5 1 3 6\n4 2 5 1 6 3\n4 2 5 3 1 6\n4 2 5 3 6 1\n4 2 5 6 1 3\n4 2 5 6 3 1\n4 2 6 1 3 5\n4 2 6 1 5 3\n4 2 6 3 1 5\n4 2 6 3 5 1\n4 2 6 5 1 3\n4 2 6 5 3 1\n4 3 1 2 5 6\n4 3 1 2 6 5\n4 3 1 5 2 6\n4 3 1 5 6 2\n4 3 1 6 2 5\n4 3 1 6 5 2\n4 3 2 1 5 6\n4 3 2 1 6 5\n4 3 2 5 1 6\n4 3 2 5 6 1\n4 3 2 6 1 5\n4 3 2 6 5 1\n4 3 5 1 2 6\n4 3 5 1 6 2\n4 3 5 2 1 6\n4 3 5 2 6 1\n4 3 5 6 1 2\n4 3 5 6 2 1\n4 3 6 1 2 5\n4 3 6 1 5 2\n4 3 6 2 1 5\n4 3 6 2 5 1\n4 3 6 5 1 2\n4 3 6 5 2 1\n4 5 1 2 3 6\n4 5 1 2 6 3\n4 5 1 3 2 6\n4 5 1 3 6 2\n4 5 1 6 2 3\n4 5 1 6 3 2\n4 5 2 1 3 6\n4 5 2 1 6 3\n4 5 2 3 1 6\n4 5 2 3 6 1\n4 5 2 6 1 3\n4 5 2 6 3 1\n4 5 3 1 2 6\n4 5 3 1 6 2\n4 5 3 2 1 6\n4 5 3 2 6 1\n4 5 3 6 1 2\n4 5 3 6 2 1\n4 5 6 1 2 3\n4 5 6 1 3 2\n4 5 6 2 1 3\n4 5 6 2 3 1\n4 5 6 3 1 2\n4 5 6 3 2 1\n4 6 1 2 3 5\n4 6 1 2 5 3\n4 6 1 3 2 5\n4 6 1 3 5 2\n4 6 1 5 2 3\n4 6 1 5 3 2\n4 6 2 1 3 5\n4 6 2 1 5 3\n4 6 2 3 1 5\n4 6 2 3 5 1\n4 6 2 5 1 3\n4 6 2 5 3 1\n4 6 3 1 2 5\n4 6 3 1 5 2\n4 6 3 2 1 5\n4 6 3 2 5 1\n4 6 3 5 1 2\n4 6 3 5 2 1\n4 6 5 1 2 3\n4 6 5 1 3 2\n4 6 5 2 1 3\n4 6 5 2 3 1\n4 6 5 3 1 2\n4 6 5 3 2 1\n5 1 2 3 4 6\n5 1 2 3 6 4\n5 1 2 4 3 6\n5 1 2 4 6 3\n5 1 2 6 3 4\n5 1 2 6 4 3\n5 1 3 2 4 6\n5 1 3 2 6 4\n5 1 3 4 2 6\n5 1 3 4 6 2\n5 1 3 6 2 4\n5 1 3 6 4 2\n5 1 4 2 3 6\n5 1 4 2 6 3\n5 1 4 3 2 6\n5 1 4 3 6 2\n5 1 4 6 2 3\n5 1 4 6 3 2\n5 1 6 2 3 4\n5 1 6 2 4 3\n5 1 6 3 2 4\n5 1 6 3 4 2\n5 1 6 4 2 3\n5 1 6 4 3 2\n5 2 1 3 4 6\n5 2 1 3 6 4\n5 2 1 4 3 6\n5 2 1 4 6 3\n5 2 1 6 3 4\n5 2 1 6 4 3\n5 2 3 1 4 6\n5 2 3 1 6 4\n5 2 3 4 1 6\n5 2 3 4 6 1\n5 2 3 6 1 4\n5 2 3 6 4 1\n5 2 4 1 3 6\n5 2 4 1 6 3\n5 2 4 3 1 6\n5 2 4 3 6 1\n5 2 4 6 1 3\n5 2 4 6 3 1\n5 2 6 1 3 4\n5 2 6 1 4 3\n5 2 6 3 1 4\n5 2 6 3 4 1\n5 2 6 4 1 3\n5 2 6 4 3 1\n5 3 1 2 4 6\n5 3 1 2 6 4\n5 3 1 4 2 6\n5 3 1 4 6 2\n5 3 1 6 2 4\n5 3 1 6 4 2\n5 3 2 1 4 6\n5 3 2 1 6 4\n5 3 2 4 1 6\n5 3 2 4 6 1\n5 3 2 6 1 4\n5 3 2 6 4 1\n5 3 4 1 2 6\n5 3 4 1 6 2\n5 3 4 2 1 6\n5 3 4 2 6 1\n5 3 4 6 1 2\n5 3 4 6 2 1\n5 3 6 1 2 4\n5 3 6 1 4 2\n5 3 6 2 1 4\n5 3 6 2 4 1\n5 3 6 4 1 2\n5 3 6 4 2 1\n5 4 1 2 3 6\n5 4 1 2 6 3\n5 4 1 3 2 6\n5 4 1 3 6 2\n5 4 1 6 2 3\n5 4 1 6 3 2\n5 4 2 1 3 6\n5 4 2 1 6 3\n5 4 2 3 1 6\n5 4 2 3 6 1\n5 4 2 6 1 3\n5 4 2 6 3 1\n5 4 3 1 2 6\n5 4 3 1 6 2\n5 4 3 2 1 6\n5 4 3 2 6 1\n5 4 3 6 1 2\n5 4 3 6 2 1\n5 4 6 1 2 3\n5 4 6 1 3 2\n5 4 6 2 1 3\n5 4 6 2 3 1\n5 4 6 3 1 2\n5 4 6 3 2 1\n5 6 1 2 3 4\n5 6 1 2 4 3\n5 6 1 3 2 4\n5 6 1 3 4 2\n5 6 1 4 2 3\n5 6 1 4 3 2\n5 6 2 1 3 4\n5 6 2 1 4 3\n5 6 2 3 1 4\n5 6 2 3 4 1\n5 6 2 4 1 3\n5 6 2 4 3 1\n5 6 3 1 2 4\n5 6 3 1 4 2\n5 6 3 2 1 4\n5 6 3 2 4 1\n5 6 3 4 1 2\n5 6 3 4 2 1\n5 6 4 1 2 3\n5 6 4 1 3 2\n5 6 4 2 1 3\n5 6 4 2 3 1\n5 6 4 3 1 2\n5 6 4 3 2 1\n6 1 2 3 4 5\n6 1 2 3 5 4\n6 1 2 4 3 5\n6 1 2 4 5 3\n6 1 2 5 3 4\n6 1 2 5 4 3\n6 1 3 2 4 5\n6 1 3 2 5 4\n6 1 3 4 2 5\n6 1 3 4 5 2\n6 1 3 5 2 4\n6 1 3 5 4 2\n6 1 4 2 3 5\n6 1 4 2 5 3\n6 1 4 3 2 5\n6 1 4 3 5 2\n6 1 4 5 2 3\n6 1 4 5 3 2\n6 1 5 2 3 4\n6 1 5 2 4 3\n6 1 5 3 2 4\n6 1 5 3 4 2\n6 1 5 4 2 3\n6 1 5 4 3 2\n6 2 1 3 4 5\n6 2 1 3 5 4\n6 2 1 4 3 5\n6 2 1 4 5 3\n6 2 1 5 3 4\n6 2 1 5 4 3\n6 2 3 1 4 5\n6 2 3 1 5 4\n6 2 3 4 1 5\n6 2 3 4 5 1\n6 2 3 5 1 4\n6 2 3 5 4 1\n6 2 4 1 3 5\n6 2 4 1 5 3\n6 2 4 3 1 5\n6 2 4 3 5 1\n6 2 4 5 1 3\n6 2 4 5 3 1\n6 2 5 1 3 4\n6 2 5 1 4 3\n6 2 5 3 1 4\n6 2 5 3 4 1\n6 2 5 4 1 3\n6 2 5 4 3 1\n6 3 1 2 4 5\n6 3 1 2 5 4\n6 3 1 4 2 5\n6 3 1 4 5 2\n6 3 1 5 2 4\n6 3 1 5 4 2\n6 3 2 1 4 5\n6 3 2 1 5 4\n6 3 2 4 1 5\n6 3 2 4 5 1\n6 3 2 5 1 4\n6 3 2 5 4 1\n6 3 4 1 2 5\n6 3 4 1 5 2\n6 3 4 2 1 5\n6 3 4 2 5 1\n6 3 4 5 1 2\n6 3 4 5 2 1\n6 3 5 1 2 4\n6 3 5 1 4 2\n6 3 5 2 1 4\n6 3 5 2 4 1\n6 3 5 4 1 2\n6 3 5 4 2 1\n6 4 1 2 3 5\n6 4 1 2 5 3\n6 4 1 3 2 5\n6 4 1 3 5 2\n6 4 1 5 2 3\n6 4 1 5 3 2\n6 4 2 1 3 5\n6 4 2 1 5 3\n6 4 2 3 1 5\n6 4 2 3 5 1\n6 4 2 5 1 3\n6 4 2 5 3 1\n6 4 3 1 2 5\n6 4 3 1 5 2\n6 4 3 2 1 5\n6 4 3 2 5 1\n6 4 3 5 1 2\n6 4 3 5 2 1\n6 4 5 1 2 3\n6 4 5 1 3 2\n6 4 5 2 1 3\n6 4 5 2 3 1\n6 4 5 3 1 2\n6 4 5 3 2 1\n6 5 1 2 3 4\n6 5 1 2 4 3\n6 5 1 3 2 4\n6 5 1 3 4 2\n6 5 1 4 2 3\n6 5 1 4 3 2\n6 5 2 1 3 4\n6 5 2 1 4 3\n6 5 2 3 1 4\n6 5 2 3 4 1\n6 5 2 4 1 3\n6 5 2 4 3 1\n6 5 3 1 2 4\n6 5 3 1 4 2\n6 5 3 2 1 4\n6 5 3 2 4 1\n6 5 3 4 1 2\n6 5 3 4 2 1\n6 5 4 1 2 3\n6 5 4 1 3 2\n6 5 4 2 1 3\n6 5 4 2 3 1\n6 5 4 3 1 2\n6 5 4 3 2 1",
          "score": 10
        }
      ],
      "judgeable": true
    },
    {
      "id": "2022-5",
      "name": "区间最小数乘区间和最大值",
      "score": 100,
      "tests": 10,
      "sampleInput": "6\n3 1 6 4 5 2",
      "sampleOutput": "60",
      "statement": "## 题目描述\n\n给定一个长度为 `n` 的正整数数组 `a`。\n\n对于任意一个非空连续区间 `[l,r]`，定义该区间的价值为：\n\n```text\n区间内的最小值 × 区间内所有元素之和\n```\n\n即：\n\n```text\nmin(a[l],a[l+1],...,a[r]) × (a[l]+a[l+1]+...+a[r])\n```\n\n请计算所有非空连续区间中的最大价值。\n\n## 输入格式\n\n第一行输入一个整数 `n`。\n\n第二行输入 `n` 个正整数：\n\n```text\na1 a2 ... an\n```\n\n## 输出格式\n\n输出一个整数，表示最大的区间价值。\n\n## 样例输入\n\n```text\n6\n3 1 6 4 5 2\n```\n\n## 样例输出\n\n```text\n60\n```",
      "testCases": [
        {
          "input": "1\n3",
          "expected": "9",
          "score": 10
        },
        {
          "input": "3\n1 2 3",
          "expected": "10",
          "score": 10
        },
        {
          "input": "6\n3 1 6 4 5 2",
          "expected": "60",
          "score": 10
        },
        {
          "input": "3\n5 5 5",
          "expected": "75",
          "score": 10
        },
        {
          "input": "7\n2 1 4 5 1 3 3",
          "expected": "36",
          "score": 10
        },
        {
          "input": "3\n10 1 10",
          "expected": "100",
          "score": 10
        },
        {
          "input": "4\n4 3 2 1",
          "expected": "21",
          "score": 10
        },
        {
          "input": "5\n1 3 2 4 2",
          "expected": "22",
          "score": 10
        },
        {
          "input": "7\n6 2 5 4 5 1 6",
          "expected": "56",
          "score": 10
        },
        {
          "input": "8\n8 7 3 9 2 6 5 4",
          "expected": "105",
          "score": 10
        }
      ],
      "judgeable": true
    },
    {
      "id": "2022-6",
      "name": "讨厌的数",
      "score": 100,
      "tests": 10,
      "sampleInput": "4 1\n1 2 2 3\n2",
      "sampleOutput": "1 2 3",
      "statement": "## 题目描述\n\n给定两个整数序列。\n\n第一个序列包含 `n` 个整数，表示原始序列。\n\n第二个序列包含 `m` 个互不相同的“讨厌的数”。\n\n对于第二个序列中的每一个数，需要从第一个序列中删除它的一次出现。若该数在第一个序列中出现多次，则只删除最靠后的那一次；若该数不存在，则不进行任何操作。\n\n所有删除操作完成后，保持其余元素的原相对顺序不变，输出最终序列。\n\n## 输入格式\n\n第一行输入两个整数：\n\n```text\nn m\n```\n\n第二行输入 `n` 个整数，表示原始序列。\n\n第三行输入 `m` 个互不相同的整数，表示讨厌的数。\n\n## 输出格式\n\n按原顺序输出删除后的序列，整数之间用一个空格分隔。\n\n若所有元素均被删除，则输出空行。\n\n## 样例输入\n\n```text\n4 1\n1 2 2 3\n2\n```\n\n## 样例输出\n\n```text\n1 2 3\n```",
      "testCases": [
        {
          "input": "5 2\n1 2 3 4 5\n2 4",
          "expected": "1 3 5",
          "score": 10
        },
        {
          "input": "4 1\n1 2 2 3\n2",
          "expected": "1 2 3",
          "score": 10
        },
        {
          "input": "3 1\n5 5 5\n5",
          "expected": "5 5",
          "score": 10
        },
        {
          "input": "3 1\n1 2 3\n4",
          "expected": "1 2 3",
          "score": 10
        },
        {
          "input": "5 2\n1 2 1 2 1\n1 2",
          "expected": "1 2 1",
          "score": 10
        },
        {
          "input": "5 2\n7 8 9 8 7\n7 8",
          "expected": "7 8 9",
          "score": 10
        },
        {
          "input": "1 1\n1\n1",
          "expected": "",
          "score": 10
        },
        {
          "input": "1 1\n1\n2",
          "expected": "1",
          "score": 10
        },
        {
          "input": "8 3\n3 1 4 1 5 9 2 6\n1 9 6",
          "expected": "3 1 4 5 2",
          "score": 10
        },
        {
          "input": "6 3\n2 2 2 3 3 4\n2 3 4",
          "expected": "2 2 3",
          "score": 10
        }
      ],
      "judgeable": true
    },
    {
      "id": "2022-7",
      "name": "质因数分解",
      "score": 100,
      "tests": 10,
      "sampleInput": "36",
      "sampleOutput": "2^2*3^2",
      "statement": "## 题目描述\n\n给定一个正整数 `n`，请输出它的质因数分解式。\n\n质因子必须按照从小到大的顺序输出。\n\n若某个质因子的指数为 1，只输出该质因子；若指数大于 1，则使用：\n\n```text\n质因子^指数\n```\n\n不同质因子之间使用字符 `*` 连接。\n\n## 输入格式\n\n输入一个整数：\n\n```text\nn\n```\n\n## 输出格式\n\n输出 `n` 的质因数分解式。\n\n## 数据范围\n\n```text\n2<=n<=100000000\n```\n\n## 样例输入\n\n```text\n36\n```\n\n## 样例输出\n\n```text\n2^2*3^2\n```",
      "testCases": [
        {
          "input": "2",
          "expected": "2",
          "score": 10
        },
        {
          "input": "6",
          "expected": "2*3",
          "score": 10
        },
        {
          "input": "36",
          "expected": "2^2*3^2",
          "score": 10
        },
        {
          "input": "97",
          "expected": "97",
          "score": 10
        },
        {
          "input": "100",
          "expected": "2^2*5^2",
          "score": 10
        },
        {
          "input": "1024",
          "expected": "2^10",
          "score": 10
        },
        {
          "input": "99991",
          "expected": "99991",
          "score": 10
        },
        {
          "input": "9999991",
          "expected": "9999991",
          "score": 10
        },
        {
          "input": "99999989",
          "expected": "99999989",
          "score": 10
        },
        {
          "input": "100000000",
          "expected": "2^8*5^8",
          "score": 10
        }
      ],
      "judgeable": true
    },
    {
      "id": "2022-8",
      "name": "解方程",
      "score": 100,
      "tests": 0,
      "sampleInput": "",
      "sampleOutput": "",
      "statement": "## 题目描述\n\n给定一个一元四次方程，使用浮点二分方法求解。\n\n现有资料未保留本题完整的输入格式、求根区间、根的数量要求以及输出精度，暂不提供评测数据。",
      "testCases": [],
      "judgeable": false
    }
  ],
  "category": "past",
  "date": "2022",
  "status": "历年卷"
});
