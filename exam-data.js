window.OMS_EXAM_DATA = {
  "examVersion": "2026-10-04-first-weekly-practice-800",
  "title": "2026-10-04 第一次周练",
  "duration": 120,
  "startAt": "2026-10-04T19:00",
  "endAt": "2026-10-04T21:00",
  "scheduleVersion": "2026-10-04-evening",
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
    "title": "2025 计算机转专业机试",
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

window.OMS_EXPERIENCE_POSTS=[
  {
    "label": "2025 经验贴",
    "title": "2025 物流工程 → 计算机类",
    "summary": "来自原经验文档的转专业备考、机试与复盘记录。",
    "sections": [
      {
        "key": "imported-0-1",
        "title": "⚙️看了两年经验帖，终于轮到我写了⚙️",
        "markdown": "因为大一就转计失败了\n\n✅**转专业本身有很多不确定性，本文的作用就是尽可能地消除这些不确定，但不做过度预测，仅代表过去的参考不预测未来，大家酌情参考，记住只有你能对你的决定负责。**\n\n笔者是大二转计算机的机考第五名，面试很低，因此*本文纯为机考经验不包含任何面试部分。*\n\n这次机考的参考分数：总分第一💯是软工的540，然后是计科的第一510，计科的第二500，本人计科第五410，第六也就是录取的分数线210。\n\n✅**本文每条经验是离散独立的，不需要就跳过。**"
      },
      {
        "key": "imported-0-2",
        "title": "📌应试部分",
        "markdown": "### 🟡及时提交\n考试的最后十秒到半分钟网络会很卡，可能无法提交，刷题就要养成每次做完就提交的习惯，**💥不要堆到最后**，这就好比选择题涂卡。另外测试用例那里的调试也会变得卡顿在本就不多的剩余时间里搞心态，这种时候干啥**详见最后五分钟**。\n\n### 🟡成绩计算\n成绩取**最后一次提交**的分数而不是最高，**💥假如在改bug的时候不小心让程序得分更少了，第一步是还原**，而不是继续改。同时，考试的页面就是[PTA网站](https://pintia.cn)，只不过套在了一个不允许关闭切换的窗口里（OMS是这个软件的名字）\n\n### 🟡时间安排\n考试最好提早二十分钟到半小时到场（**提前几天就要到考场看看不要到考试前再去找**），如果觉得太早来会紧张就戴上耳机听音乐。因为要提前进入OMS界面，也就是考试的界面，这个软件可能会抽风出错，这次就是，也有电脑连不上网，导致考试推迟15分钟开始，后来的人有刚好碰到无论如何进入不了的，会让情绪波动不利于考试。提前进入OMS界面的人能看到一个考试倒计时，考试结束前十五分钟会有弹窗，别被干扰慌了。\n\n### 🟡不要退出💥\n考试电脑由于安装了**智障**360，会在右下角偶尔出现弹窗广告遮挡代码，关掉的时候小心不要把那玩意点开了，那会触发监考老师手上的警报，**那时候务必！！！立刻找监考老师说明情况。**\n\n### 🟡座位问题\n考试用的不是你的PTA帐号（*所以你在PTA帐号上可以起一些抽象昵称调节备考心情,每次提交你的大名就会在提交列表上广播*），而是登入OMS界面以后会出现一个随机二维码，监考老师通过扫描把你的信息绑定到你面前的界面上（**所以你的座位不是死板固定的，有任何问题就要求换座位**），提早来的提早打开OMS，让监考老师扫完就可以静下心来看着倒计时等待考试开始。\n\n### 🟡考场键盘\n考场的键盘**非常垃圾!!!** 非机械键盘，阻尼大概是笔记本的两倍，不管明年会不会改善，建议大家练习的时候可以使用青轴等触发力度较大的机械键盘，适应敲击力度，老在笔记本上打代码可能会适应不了，不过这并不会影响你考试的打字速度，几乎是由你的心理素质决定。\n\n### 🟡无法撤回！！！💥 💥 💥\nPTA网站有一个恶心的特点就是假如选中的某段代码想复制（碰到代码相似又懒得写函数的情况）在选中以后如果不小心点到了选中的部分，**这个部分会立刻消失！！！无法撤回！！！这是PTA敲代码跟IDE最显著的区别，无法撤回！！！**\n\n### 🟡调试技巧\n如果提交显示段错误（其它错误也可参考这是最典型的），那么就是数组越界或者函数迭代次数过多，直接看代码肯定最后能找出来，更快的办法是，**把代码的每个功能区域一块块注释掉**，注释就是选中的情况下按住ctrl和/，每次注释完直接提交答案而不是点测试用例，哪次注释完段错误消失全部显示答案错误的时候，那块注释的地方就是数组越界的位置，当然如果代码太简单就直接瞪眼看。这个操作必须注意上面一点提到的选中误点消失问题，否则突然消失一堆代码，谁都会慌。取消选中要小心地把鼠标挪出选中区域。\n\n### 🟡最后五分钟💥 💥 💥\n最后十分钟或者五分钟，就是大概掂量一下自己绝对绝对不可能做对或者改对题目的时间（可能更长，半个小时一个小时都有可能，取决于你的能力），停下来，**抽奖**，意思就是如果一道题要输出的只是一个数字，或者只是个YES NO这种，直接让你的代码随便输出一个数，数字就是数数。**不要觉得这是开玩笑，据我所知不止一个人靠这个多得了几十甚至上百分都有。我当时并没想到这么干，是我低估了这个方法的掠夺能力。** 注意这个方法的使用情况，在确定接下来的时间没希望再得分了，不管剩下是一分钟还是两个小时，就这么干。这么干之前，你靠的是实力，接下来，是运气，备考的时候千万别相信运气，**考试的时候要不要这么干务必务必💥💥💥自行决定，说不定下次没有任何人能靠这个骗分（这很简单，只要稍微设计一下答案格式和数据大小就好），但这目前也是一条路，不过是最后一条。**"
      },
      {
        "key": "imported-0-3",
        "title": "📌备考部分",
        "markdown": "### 🟡语言选择\nC++，不要选别的，C++的执行时间有优势，竞赛都是采用C++。另外可以调用STL库里的函数，**就是别人帮你写好的常用函数，不用自己手搓了**\n对于有学过C的人，printf还是能用得上的，其它就没了，printf和cin cout（完整学输入输出流）各有优势在输出的时候\n头文件不用记一堆，可以用万能头（#include<bits/stdc++.h>），会出现你起的函数名字跟标准库里重合的情况，解决办法就是自己的函数名字**尽量猎奇一点**\n\n### 🟡对于零基础的人\n可以听B站黑马程序员，但切记，从头开始听什么时候讲到指针（**不要听**），就退出来，接下来的备考之路我保证你用不上这些网课了（除非你特别适合听课学习，即使是这样，**也强烈不建议听网课超过两周**，理由很简单，那样不可能做到精确备考），剩下的准备参照下一条。\n\n### 🟡刷题是提升能力的核心💥 💥 💥\n不建议先刷pta。更具体来说，先去洛谷和力扣这两个网站，洛谷的每道题都有题解，不会就点开学，别人写的最优代码（一定是最简洁的，那是为了炫技，算法基本也是最优的，但不一定是最好理解的，但零件部分可以学习，就是用了哪些你没见过的语法就去学），有哪个语法不会就问AI，这样能保证不会浪费任何时间学不必要的语法和算法。因此强烈不建议听网课，比如黑马程序员，里面说得面面俱到，其实从指针开始在做题的时候就用不上了（我从来没用过），引用倒是用得上，但这些知识点其实非常简单，黑马为了显得课程饱满把每个细枝末节交代的太清楚了，我可以很负责任地说80%听了对解题没帮助，过三天你就忘记了，**💥只有刷题和改BUG的经历能刻骨铭心**。\n\n📎 [洛谷](https://www.luogu.com.cn)\n📎 [力扣](https://leetcode.cn)\n\n\n### 🟡如何利用PTA\n**在做了一部分洛谷题，有一定水平以后**，再来PTA（以洛谷为主，PTA只是为了熟悉考试环境），练练手，再回去洛谷提升能力，做天梯赛和BASIC LEVEL这两个版块，pta主页往下看就能找到。分别是210题和125题，做题目的是熟悉考试环境。但为什么不建议先来这里？第一是没有难度划分，L1 L2那个分的太粗略了而且中间有断层。第二没有题解，我就是基本在PTA摸爬滚打过来的（机考410分），不会只能问ai，水平就是比在洛谷看着别人题解学的差一截（机考540分）。\n\n📎 [BASIC LEVEL 125题](https://pintia.cn/problem-sets/994805260223102976/exam/problems/type/7)\n📎 [天梯赛 210题](https://pintia.cn/problem-sets/994805046380707840/exam/problems/type/7)\n\n\n### 🟡关于AI的使用\n\n无论是在洛谷刷题时碰到不会的语法还是在PTA里做不出来一道题都可以问AI，但对于稍微有难度的题目，不要把自己的错误代码扔给AI找错误，往往会让你越来越火大因为AI找不到就会瞎说把明显是对的地方说成错的。那么AI适合干什么，离散的知识点，让它介绍。以及直接让它输出正确代码你去看去学，当然学之前先丢到平台里测一下是不是AC，我的使用感受是DEEPSEEK的解答比豆包好。另外一种，比如你想知道某个功能怎么实现，也可以问AI，但务必加一句给出最简洁的写法，否则AI会面面俱到地列出一大堆效果一样的方法看着很烦。\n\n### 🟡关于改BUG\n\n这个建议好好练，不要一不会就问AI，反而会让你更气，原因如上。自己找错的能力是非常重要的，从最基础的看着编译器的报错改，到编译器不报错了，但是提交还是有一两个各种各样的错误。这些错误有三种可能，第一是你对题目的理解本身不准确（要么是审题不仔细要么是误解）；第二是你的算法思路是错误的；第三种是你的算法对但你没把它准确地实现出来。检查bug就是反复看题干和代码，觉得对题目理解完全没问题了就想想算法是不是正确的，算法也觉得没问题就想想是不是那里少了符号啊循环套错了啊变量名字重复了啊边界情况考虑了没之类的。**一个错误你盯着代码一直看40分钟到一个小时才发现只是一个符号问题是再正常不过的了**。但这么耗时间的事情怎么做，很简单，到水课上，或者那些必须到场的课，既然那里你敲不了代码，那总可以改吧，没用的课就算40分钟才看出一个错误你也会很有成就感。\n\n### 🟡今年的题目通过率\n\n先说数据，一共八道题，两道（迷宫和树）是一个人都没做出来，一道只有一个人（化学溶剂那道）做出来，一道五个人做出来（开关灯），这是我的猜测，因为化学溶剂那道只有一个测试点一百分，比另一题的AC难度高非常多，算法用的是查并集，我自己把函数写完调用一提交就是超时，仅仅只是调用函数，调用完的数据处理还没做，那时只剩五分钟，绝不可能改对。所以这里提醒，**💥一道题的测试点越少，沉没成本就越高**，除非其它题目都不会了不然别来。（化学溶剂跟pta l2的红色警报的算法几乎一样，查并集是最优解）。\n\n**这里插播一下**，根据上面的数据，就是考试最后有人看的提交通过率来说，可以推断400分以上的最多六个，但实际上却不止六个，原因请看应试部分**💥最后五分钟**干什么。\n\n### 🟡洛谷题目难度划分\n\n从易到难分别是红橙黄绿蓝五级题目（在题库里直接筛选指定颜色的，但洛谷的标签比较乱，开始只做有单个标签的题目，做久了就明白怎么看难度了），**蓝以后基本不用考虑了**，哪怕准备一年，如果你蓝题能随便秒，必定是稳进。\n\n### 🟡今年题目难度\n去年的难度其实是比较正常的，难度分配大概是四道红题，四道黄题，一道绿题一道蓝题，机考第一💯只错了蓝题也就是900。\n\n今年的难度是比较离谱的，迷宫和树属于蓝题之后的等级，剩下的话开灯算绿题，化学溶剂算蓝题，剩下四道橙红吧。不过洛谷里面的难度划分是大致的，每个人感知的难度也不一样，一个等级里面的题目难度是有差异的，刷题策略就是，某个难度可以秒，就秒几道练练手，然后找一些稍微有点挑战又有希望做出来的题目试试，反复迭代。这样你的能力就可以稳步提升。\n\n### 🟡要准备到什么程度，什么时候开始准备比较好\n\n标准回答是**不知道**，但我可以把不知道说得很明白。准备程度的上限是洛谷蓝题，你如果蓝题能秒不用继续往下刷了。但并不代表必须刷到蓝题才有希望之类的，做几题以及几道什么难度的题进面或者录取完全取决于接下来一年有多少人准备，准备到什么程度。刷题肯定是保证一个难度等级的题能秒杀了再往下做，如果看到这句话的时候备考时间不够了照样是这么干。至于什么时候开始准备，很简单，**看你自己的耐受度**，如果你不容易对答题错误的挫折打击，不容易因为理解算法而疲倦烦躁，那就早点开始，耐受度低的就迟一点，刷题强度也是一样的道理，**本质就是保证，不要因为刷题对刷题产生负面情绪，那样你会厌恶，会断掉刷题一两个月甚至更久，这种情况如果出现在临考几个月后果就很严重了**，如果在准备过程中有这种情况的势头，降低强度，或者只做能秒的题目调节状态。心情好了再继续，直到考试为止。\n\n### 🟡调试代码\n\n不管之前喜欢在什么地方调试代码，考试前一段时间（具体多久自己掂量），**务必换到PTA练习一段时间**，因为得习惯PTA的调试界面，不管是报错方式还是测试用例那个界面，以及编译器的版本（**貌似是C++16自行确认**），编译器版本最好在其它地方做题的时候也调成这个（做不到就要留意有些写法可能不通用）。"
      }
    ]
  },
  {
    "label": "2023 经验贴",
    "title": "2023 数学 → 软件工程",
    "summary": "来自原经验文档的转专业备考、机试与复盘记录。",
    "sections": [
      {
        "key": "imported-1-0",
        "title": "转软件工程专业经验分享——以完全没有任何基础的编程小白为例",
        "markdown": "---\n\n### 个人概况\n\n- **2023年底，从2022级数学系降级转入2023级软件工程**\n- **欢迎学弟学妹们前来交流互动**\n\n---\n\n!!!  note **阅前声明**\n    请先阅读[正文部分](#old_article)，再阅读[补充部分](#new_article)，会更有收获。\n\n\n以下内容撰写于2025年初冬，转专业考试之后。\n\n---"
      },
      {
        "key": "imported-1-1",
        "title": "补充：写在正文一年之后的话",
        "markdown": "---\n\n### 零、前言\n\n尽管很不愿意面对，但我不得不承认，目前的计算机行业已与之前截然不同。\n\n这是最坏的专业。正文部分撰写于2024年深秋，现在是2025年初冬。仅一年时间，整个行业便发生了翻天覆地的变化，降本增效的各大企业裁员不断，日新月异的AI技术让非计算机专业的人也能写出不错的代码，这早就不是那个跟着黑马学三个月 Java 就能进大厂月薪过万的时代了。要学的东西太多，拥有的时间却太少。学校的课程并不能让你获得多少职场竞争力，每年成批产出的应届生和迭代速度快到超乎想象的大模型共同对你虎视眈眈，为了不被淘汰，你必须不断自主学习，并且这种学习是没有大纲的，如同在茫茫大海没有目标地漂浮，你目所能及和目所不能及的一切都是学习的对象。如果你看到这里有所犹豫，这个专业不适合你。\n\n这是最好的专业。客观来说，只有这个专业能让大二在读的同学拿到月薪10k的实习；只有这个专业能来一场不问 BG 的面试，让你在戴着 211 帽子的情况下，凭借个人的出色能力打败一众 985 的对手，获得令人羡艳的华丽薪资；只有这个专业能使你紧跟最新最前沿的技术，站在AI巨浪的潮头，亲身参与这可预见的未来里最伟大的科技革命。如果上面这些是你所渴望的，如果你对这个专业确实有赤诚的热爱，并且**不怕吃苦，愿意持续学习**，那就来吧，这是最适合你的的专业。\n\n如果你仔细思考之后没有选择关闭这份文档，就继续往下看吧，这些文字会对你有所帮助的。不过在此请先阅读[正文部分](#old_article)，会有更好的体验。\n\n\n### 一、难度的增长\n\n无论是今年（2025年）转专业机考的题目，还是24级、25级的整体培养方案的调整，都显现出计算机学院对算法的重视程度无疑是在持续增长的，这也就导致转专业机考题目的难度必然水涨船高。因此，正文部分推荐的某些教程应该缩短学时，做题的难度也需要加大。\n\n1. 大二机考考察的依旧是编程题，我依然推荐用C++参加考试。但相较于过去的更侧重考察基本的程序设计而言，今年对数据结构与算法的考察权重大大增加了，出现了较高难度的算法题。总体而言平均难度要略高于 PAT 乙级。\n\n2. 今年我认识的一位学妹，完美 AC 了 4 道题，加之额外得了一些分，就拿到了机试第二名的好成绩；还有一位学弟，总分 420 左右，也进面并成功录取了。乍一看好像题目变难了大家就都做不出来了，但这是建立在所有人都手足无措的基础之上（今年的转专业政策出现了巨大改动，且是在临近转专业的时候才通知的），就如同2022年的新高考全国一卷一样，一旦考过一次，大家就都会以这样的难度来备考，所以无论如何不要掉以轻心。\n\n3. 今年不能用Dev C++，只能在PTA的界面里写代码，所以平时在写代码的时候请关闭所有的代码补全。\n\n4. 如果你想转专业成功，那就必须比往年转专业同学投入更多的时间与精力，要做好心理准备。这可能会影响到你原本课程的学习，如果转专业失败，可能原专业也会挂科，一定要做好心理准备，想清楚究竟要不要转。\n\n### 二、课程调整\n\n如果你现在看到这段文字，那就意味着你至少有九个月的时间来准备转专业。借用一位某年转专业笔试第一的同学的话：“一年的时间都够完整学完408（计算机四门核心课程，包括计算机组成原理、数据结构与算法、操作系统、计算机网络）了。”我们固然不能完全以大佬的标准要求自己，但我们也必须清醒地认识到，时间是很多的，只要沉下心来学，一定可以学得完、学得会的。\n\n1. C语言：依然推荐翁凯的C语言课程，这是经久不衰的、大量前辈实践检验过的好课程。但要注意的是，如果某些地方理解不了，不要强求，可以跟着敲一遍，然后先暂停思考，往后多学一点新的知识可能就理解了。特别是最靠后的一部分，实在看不懂可以放一放，有一些内容C++做了更人性化的处理，不需要人工手动处理。注意，代码一定要跟着敲。\n\n2. C++：还是看黑马，面向对象不用看，知道类的基本用法就可以。其余内容按照我正文教程来即可，挑选合适的课程看完就行，不要全看完，时间够多不等于可以浪费。注意，STL部分的代码一定要跟着敲。\n\n3. 数据结构与算法：有几个备选，我不做推荐。你可以自己看一看喜欢哪一种的风格，选一个合适的跟着**学完**就好。注意，算法的代码一定要能做到**独立写出**。不能独立默写就是不会，要对自己负责，不要自己骗自己。\n    - 陈越的数据库结构与算法。（一位24级同学亲测的可行）\n    - [代码随想录](https://www.programmercarl.com/)（优秀的算法教程，貌似有24级同学推荐）\n    - [labuladong 的算法笔记](https://labuladong.online/zh/)（我自己学习过的课程，可能不是很适合新手初学，更适合有基础的同学。）\n\n### 三、刷题\n\n一定一定一定要做题。只看课不做题等于白看。\n\n1. 活用 AI ：无论是用国内的豆包、千问、Deepseek，还是用国外的 Gemini，ChatGPT，Claude，你的九成的问题都可以被 AI 解答。无论是对语言学习有疑惑，还是遇到了不会做的题目，喂给 AI，配上合适的提示词（这部分内容可以自己去摸索，很有意思），Ta 就会给你满意的答复。在这个过程中，你既能不断查缺补漏，也能获取不少AI使用的经验，这对于你未来的发展大有裨益。但是不要过于依赖 AI ，你从 AI 那里获取的不应该是简单的代码，而应该是清晰的解题思路和扎实的做题方法。如果一道题你不能再离开AI的情况下独立在没有自动补全的 IDE 里敲出来，那么你就是不会做。\n\n2. PTA：因为 FZU 年年都是用PTA考试，所以无论如何，都得做一部分 PTA 的题目，建议选择 PAT 乙级的题目来适应PTA 的答题模式（我个人建议把乙级全部做完，现在考试难度高了，对自己的要求也要对应高起来。如果有查不到答案的题目，喂给 AI 就行）。\n\n3.力扣（Leetcode）：有题解，有题单，很好的刷题网站，总体难度比较大，比 PTA 好用，因为不需要考虑输入输出——但正因为如此，它和 FZU 的考试是很冲突的。我个人建议一些复杂的算法题可以在上面做，但不要完全在这个平台做题，还是要时不时穿插一点PAT的题目，找一找输入输出的手感。 \n\n4. 洛谷：我自己不常使用，所以不太了解，听朋友说有题解，有题单，也是很好的刷题网站，而且难度划分比较合理，可以试试看。也要时不时穿插一点 PAT 的题目，找一找输入输出的手感。 \n\n\n### 四、一些注意点\n\n1. STL 永远是重中之重，包括容器、方法、头文件。我个人建议不要用万能头，该背的要背，别偷懒，要对自己负责。\n\n2. 刷题的优先级应该大于学习知识点，如果时间来不及以刷题为重，以练代学（不过如果春节前开始准备还会来不及的话，可能就要仔细考虑一下这个专业与自己的适配程度了）。如果觉得看课看不进去或者记不住课程内容，就去做题吧，网络上有很多题单，找一份狠狠做几道就会了。\n\n3. 虽然大家都很反对这种方法，但我认为对于相当一部分同学（包括我在内）是很有用的：如果一个算法你怎么都理解不了，那就直接把它的 C++ 代码背下来。不要认为这是笨办法，融会贯通是建立在大量积累的基础之上的。如果你背诵了足够多的内容，在某个时刻就会有一种福至心灵茅塞顿开的感觉，这是我个人的亲身体会。并非每个人的学习曲线都是线性的，有一些人就是先慢后快的。开始比别人慢并不需要沮丧，只要持之以恒，一年的时间足够拉平起步时的所有差距。\n\n4. 我列举了基本上可能涉及到的算法知识点，不一定要全部掌握，可以作为提纲来看，如果全会了就闭着眼睛考试吧，百分百拿下的。\n   - STL： \n     -  string,vector（包括二维）,map,unordered_map,set,unordered_set,stack,queue,deque\n     - 初始化、赋值、插入、删除、查找、修改、复制、遍历（下标/迭代器/范围 for）、迭代器（正向/反向 /const），排序（sort/稳定排序），**不同 STL 的嵌套使用**，截取/切片/拼接（string/vector），容器的容量操作（resize/reserve/empty/size），元素交换/清空，键值对容器的键值访问（map 的 first/second）\n     - pair/tuple（键值对/多元组，STL 嵌套核心）、priority_queue（优先队列/堆）\n     - 内置算法（sort,find,count,reverse,unique,lower_bound/upper_bound（二分查找）,accumulate（累加）等）\n   - 普通算法：\n     - 几大经典排序（冒泡/选择/插入/快速/归并/堆排序/希尔排序），自定义结构体/自定义规则排序，STL sort/稳定排序（stable_sort）结合使用，排序的时间/空间复杂度对比\n     - 几大经典查找（顺序查找/二分查找/插值查找/斐波那契查找），STL 内置查找（find/binary_search/lower_bound/upper_bound），哈希查找（unordered_map/set 底层）\n     - 递归（递归终止条件/递推公式/递归优化）\n   - 进阶算法：\n     - 搜索遍历：bfs（广度优先，队列实现）、dfs（深度优先，递归/栈实现），bfs/dfs 的剪枝优化，层序遍历\n     - 双指针/滑动窗口：普通双指针（前后/左右），滑动窗口（固定/可变窗口）\n     - 贪心：贪心策略选择，经典贪心问题模型，贪心与动态规划的区别\n     - 动态规划（DP）：背包问题是核心子模型（01 背包/完全背包/多重背包/分组背包），状态定义/状态转移方程/初始化/边界条件，递推/记忆化搜索两种实现，经典 DP 模型（最长上升子序列 LIS/最长公共子序列 LCS/最短路径 DP 等）\n     - 前缀和与差分：一维/二维前缀和（快速求区间和），一维/二维差分（快速区间修改），前缀和与差分结合使用\n     - 位运算\n   - 基础数据结构：\n     - 线性结构（这部分STL都封装的差不多了，但是链表一定要会写）\n       - 数组（静态/动态）\n       - 链表（单链表/双链表/循环链表的增删改查/反转/找环/快慢指针）\n       - 栈/队列\n     - 树形结构：\n       - 二叉树（二叉树的存储（链式/数组）、遍历方式（前序/中序/后序/层序，递归/非递归实现）、节点查找/统计/删除，二叉树的高度/深度计算，平衡二叉树的基础概念、二叉搜索树（BST，中序遍历有序，增删改查）、完全二叉树/满二叉树特性）\n       - 堆（大根堆/小根堆），优先队列底层，建堆/堆插入/堆删除/堆排序\n   - 进阶数据结构：\n     - 图论基础：\n       - 图的存储（邻接矩阵/邻接表，必掌握邻接表）、图的遍历（dfs/bfs，与树的遍历区别：判重/处理环）、最短路径（Dijkstra 算法/弗洛伊德 Floyd 算法/SPFA 算法）、最小生成树（Kruskal 算法/Prim 算法）、图的入度/出度统计、拓扑排序（有向无环图 DAG）；有向图/无向图/加权图/无权图，顶点/边，连通图/强连通图\n       - 哈希表（散列表，底层原理与解决哈希冲突的方法，STL unordered_map/set 的底层）\n       - 字符串（KMP 算法/朴素匹配）\n       - 并查集（查找（路径压缩）/ 合并（按秩/大小合并），连通性问题/最小生成树 Kruskal）\n\n5. 今年不能带纸质资料进考场了，所以该背的一定要背。\n\n6. 学不下去是正常的，刷不动题也是正常的，人的精力是有限的。正文的题记是“迎着晨风想一想，今天该怎样努力？”。但在经历了这一年的各种跌宕起伏，在看到身边的同学朋友的起起落落之后，我认为这句话是更合适的：“流水不争先，争滔滔不绝。”大半年的时间足够你把上述内容扎扎实实、干干净净地学完。保持好属于自己的合适的节奏，维持好自己的心力，把持好自己的目标，成功就会理所当然地到来。\n\n---\n---"
      },
      {
        "key": "imported-1-2",
        "title": "正文：转软件工程专业经验分享——以完全没有任何基础的编程小白为例",
        "markdown": "以下内容撰写于2024年深秋，转专业考试之前。\n\n---\n\n> “迎着晨风想一想，今天该怎样努力？”——题记\n\n\n---\n\n### 观前提示\n\n- **本文仅根据2023年的转专业情况，为毫无编程基础的同学而作**\n- **每一年的转专业情况都有变化，请根据自己的实际情况而有取舍地阅读**\n\n---\n\n### 一、前期准备\n\n在正文开始之前必须明确，计算机的处境已经今非昔比，转专业之前，要想好，我真的喜欢这个专业吗，我真的可以接受它的高强度的激烈的竞争吗？如果答案是“Yes”，那就继续往下看吧。\n\n我不排除2024年转专业考试形式和内容发生巨大改变的这种可能性。这种事情在之前发生过。所有内容都基于我今年的情况。\n\n大二转软件工程，如果考试题型不在明年大改的话，考察的是上机做题，也就是在 2h 的时限内，完成八道略有难度的编程题。\n\n什么是编程？在正式开始学习编程之前，我建议先看一看翁恺的对于编程的简介，尽管是基于C语言的，但是对于小白的入门很有帮助：\n\n[**翁凯的C语言编程课**](https://www.bilibili.com/video/BV1dr4y1n7vA)\n（P2-P3，P6-P8）\n\n看完之后，就会对编程有一个基本的了解。\n\n接着，需要安装一个IDE，也就是拿来写代码的东西。这里推荐Dev C++：\n\n<https://devcpp.gitee.io/>\n\n上面是下载链接。安装很简单，疯狂下一步就OK。\n\n接下来需要注册一个 PTA 的账号：\n\n<https://pintia.cn/home>\n\n这个注册很简单，按说明来就行。\n\n那 PTA 是什么呢？简单来说，在线的刷编程题的网站。具体的介绍和使用可以看上面翁恺课程的P21-P22。\n\n此外，要收藏好三个网站：\n\n- 福州大学教务处：<https://jwch.fzu.edu.cn/>\n- 福州大学计算机与大数据学院：<https://ccds.fzu.edu.cn/>\n- 福州大学转专业交流网站: <https://run.w2fzu.com/>\n\n大约从十月份开始，就应该时不时打开教务处与计算机学院的网站来查看是否有各种通知，一般来说转专业初通知是十月中下旬，各学院转专业细则是十一月初出来。\n\n那个转专业交流网，是完全针对福州大学的转专业资料，强烈建议反复仔细浏览其中的所有的关于计算机的内容，不管是大一的还是大二的。尤其不应该忽略备考资源中的计算机部分的内容，它有近几年的机试题目，参考价值很高。\n\n接下来要注册 MOOC 的账号。如果有的话，要去按这个网址：\n\n<https://www.icourse163.org/course/ZJU-93001>\n\n上的教程去绑定对应的习题集到PTA账号上，不着急做题，先把准备工作做好。\n\n随后，看这一页的几个视频和教程，绑定这个课程的习题到你的PTA账号：\n<https://www.icourse163.org/learn/ZJU-199001?tid=[个人编号已隐藏]#/learn/content?type=detail&id=[个人编号已隐藏]&cid=[个人编号已隐藏]&contentid=[个人编号已隐藏]>\n\n最后，加入这个QQ群：[个人编号已隐藏]，时不时关注群里的消息，尤其是九月份之后。\n\n至此，准备工作已全部完成。\n\n### 二、正式行动\n\n在此之前先问自己几个个问题：你的时间多吗？你下定决心为转专业牺牲一些东西了吗？能吃得了双倍学习压力的苦吗？\n\n如果你的回答是：“是！”，那请继续往下看吧。\n\n首先，扎扎实实地看完翁恺的 C 语言课程，上面那个链接是 b 站的课程，下面这个是 MOOC 的，内容大差不差， MOOC 内容会全一点，还有讨论区； b 站有实时弹幕解答疑惑，而且更方便，可以说各有千秋，按需索取。我建议视频看 b 站的，然后看 MOOC 里的一些文本教程和讨论区。\n\n光看课，没用，对应的课后习题一定一定要按它的要求认认真真写掉，一定要做题！一定要做题！一定要做题！\n\n<https://www.bilibili.com/video/BV1XZ4y1S7e1>\n\n上面那个b站视频只有前十节，这个更完整，如果学有余力，全看完。\n\n注意，在写题的时候，你应该在本地的Dev C++（为什么用这个不太好用的编译器，因为考试的时候只能用这个，而且它没有自动补全，对于新手打基础很好）先把代码写好，运行，能跑出大差不差的结果，再复制到PTA的答题框里跑，这是好习惯。\n\n最好边看边做点题，这个题还是很简单的，有助于形成自信心：\n<https://pintia.cn/problem-sets/994805046380707840/exam/problems/type/7>\n\n看完之后，你就成功入门编程，什么数组啦指针啦函数啦，判断素数啦求最大公因数啦这些东西应该都能掌握了。并且，如果有认真做题的话，PTA能踩应该踩了很多很多坑，这对于转专业考试非常有帮助。\n\n打好了基础，就开始对转专业考试的特训了。\n\n转专业考试可以用很多语言，但是绝大部分人都用C++。我也是。因此，开始学C++。有了C的基础，C++不会很难。学C++，看黑马的这个课：\n<https://www.bilibili.com/video/BV1et411b73Z/?p=1>\n这个课的1-71P可以说是C语言基础，对于已经扎实学完翁恺课程的人来说看起来可能会很枯燥无味，我的建议是，这72P的内容，每一P，看到一半感觉完全都会，就跳过去不看吧，问题不大，如果做题遇到问题再回来看。\n\n但是有一些内容，是C++和C的很重要的不同，大概有这些：\n\n- 输入输出流cin和cout\n- 常变量const\n- 变量引用\n- String字符串（string真的很重要）\n- 动态内存new与delete\n- 作用域\n（以上非常重要）\n- 函数重载\n- 函数模板\n- 函数默认参数\n（以上了解即可）\n\n接下来的内容，88-94（引用），185-263（STL库，很重要很重要很重要，没有它们基本上别想在短时间内写出算法题），是必须看的。面向对象那一块内容，有时间建议看看，实在看不懂就算了，问题也不是很大，就是看别人的一些代码的时候可能会有一些不理解。\n\n当然，如果有时间的话，想要自己打下更扎实的基础，让自己上考场不慌，我建议看从1-263的所有内容。如果跳着看的话，做题的时候遇到一些问题会很绝望，甚至不知道要怎么去搜索这些问题。当然，里面有几个实际案例，这个可以根据个人的需要跳过。\n\n有时间的话，最好跟着视频，把视频里的代码都在电脑上敲一遍。（虽然我没有这样做，但这是因为我之前已经有比较好的 C 和 Python 基础）。（STL部分必须跟着敲，前 72P 比较无所谓）。\n\n然后，边看边做题。STL看完vector容器部分之后就必须开始做题了。\n\n做什么题呢？\n\n<https://pintia.cn/problem-sets/994805260223102976/exam/problems/type/7>\n\n最好做这个，也就是PAT乙级。\n这个题难度五题一组，每一组难度逐渐上升（每组的难度也是在逐渐上升的，所以从头开始做，不要倒着做），就是说：\n5k+1题（第一题，第六题，第十一题这样的题目）最简单，\n5k+2题（第二题，第七题，第十二题这样的）会难一点，\n5k+3更难一点，\n5k+4再难一点，\n5k题（第五题，第十题，第十五题这样的）最难。\n5k+2到5k+4题和考试难度差不多（考试八道题里有一两道较难的算法题比5k还难得多，做不出来正常，考场上不要慌）。\n\n答案也有，但是不要一直看，先自己写，写不出来可以放一放，做点别的。\n<https://liuchuo.blog.csdn.net/?type=blog>\n\n这个前辈的博客里，直接搜PTA的题号（PTA乙级1020这样的数字）就有对应的C++写的答案。她的代码风格很好，而且用了很多STL，很适合学习。\n\n如果觉得太难了，可以先做一点这个，团体天梯赛：\n<https://pintia.cn/problem-sets/994805046380707840/exam/problems/type/7>\n\n找找手感，但是要尽早切换到难的那个，这个对于考试太简单了。（在看翁恺C语言课的时候拿来练手是很好的）。\n\n看完上面黑马的课，你就学会C++啦。\n\n然后，把青春投入到PAT乙级的刷题上吧。考前，做完每道题，最少最少做一次，有时间最好做完之后再从头到尾复盘一次。\n\nSTL库的内容，string和vector的（尤其是用vector构建二维数组、用vector构建动态数组、string的各种处理）用法以及一些常见排序算法和函数必须烂熟于心。\n\n计算机学院官网说转专业考试考面向对象程序设计和数据结构与算法。\n\n但摸着良心说，数据结构与算法的内容至少今年真的没怎么考。\n\n如果时间有限，优先刷题吧。一些常见的数据结构，去知乎搜搜，看看，了解一下就好，防止面试问。\n\n但是如果时间充足，还是要学一下的。因为谁知道明年出题风格会怎么变呢？\n\n数据结构与算法是计算机专业的一门课程，也是转专业文件里明确写出的考察内容之一。虽然我没学完，只学到了树的定义。我真的感觉没考，但也许它考了，只是我刚好没有意识到或者我不会做。\n\n总的来说，评价最高的数据结构与算法的课程是浙大的陈越教授的课：\n<https://www.icourse163.org/course/ZJU-93001>\n\n上面是慕课的网址，你可以按它的教程去绑定对应的习题集到你的PTA账号上，这样就可以同步做题了。\n<https://www.bilibili.com/video/BV1H4411N7oD/>\n\n这是一模一样的课程，只不过是b站的。我个人一般在b站看，弹幕可以解答我的很多疑惑。\n\n事实上，这门课程是基于C语言的，而我们考试用的是C++，其中的STL库可以方便快捷地帮我们解决很多数据结构的问题。所以我建议，在看的过程中，不用过分纠结于其中的用C语言对各种数据结构的实现。（但是不应该忽视对算法的实现，尽管STL也能实现一部分算法，但面试可能会问，机试也可能会考，这种思维方式的养成对于刷题也很有帮助）\n\n配套的习题不会做很正常。也不全需要做完，大概感受一下就可以。这门课算计算机专业里的比较难的课程了。更多地要注意对概念的理解，还有对算法的抽象的掌握。\n\n不管怎么样，刷题是重中之重，今年考了两道PTA乙级原题的。\n\n### 三、临阵磨枪\n\n“行百里者，九十而半。”\n距离正式的转专业考试只剩下很短的时间了，前半年已然付出了那么多汗水和努力，现在可千万不能轻言放弃。\n\n#### 1. 取舍\n\n首先，如果你现在连C++的课程都没有完全看完，那么，应该要做一些取舍了。\n\n首先，确保你的最基本的编程的基础知识没有问题：数据类型、基本运算、if、for（break、continue）、while、switch、数组、函数、指针（基本的一维指针）、最基本的类（创建一个类、给类添加一些数据成员和函数）。如果上述基础知识还有问题的话，那问题就比较大了，平时就要更多花时间在这上面了。\n\n其次，如果你确保了上述最基本的知识没有问题，那么，现在要立刻、马上、迅速地去把黑马的教程里的STL部分（P185-P263）扎实地看完、学完。转专业考试的题目相对来说还是比较有难度的，所以一定一定得学会这些容器的用法，才能比较好的做出一些题目。\n\n举个例子，比如，我现在告诉一个数组的长度为n，但是这个n的数据是由用户自己输入的，你应该怎么创建这个数组，怎么读取用户的输入？（输入样例：第一行输入一个整数n，为数组长度；第二行输入n个整数，中间以空格分隔）。再难一点，如果我现在要输入一个根本不知道有多长的数组，你应该怎么创建这个数组，怎么读取用户的输入？（输入样例：第一行输入若干整数，中间以空格分隔，整数的个数未知）。如果现在的你还不会写上面的题目，那么就需要敲敲心里的警钟了。\n\n最重要的容器是string、vevtor、map以及它们对应的方法（函数）。一定一定要牢牢掌握这三个容器。它们的创建、添加、删除、清空、查找、判空，读取、写入、输出、遍历、排序（由小到大、由大到小）、截取、复制、转换。这些是最基本的操作。\n\n各种头文件的写法，也至少要背下来。\n\n#### 2. 刷题\n\n刷题，刷题，刷题。争取把乙级的题目全做一遍。现在就好像是高考冲刺的时候，一定要多做题来测试自己的知识掌握程度、发现漏洞。特别是在这个过程中掌握对STL的使用方法。黑马的STL只是入门，做题的话，还不太够，还是得在实践中碰一碰。\n\n 做题，可以参考这个博主的，她貌似把乙级的题做的差不多了，直接在搜索栏里把题号输进去（比如：1005）就可以\n<https://liuchuo.blog.csdn.net/?type=blog>\n\n下面这篇文章可以算考前总结\n<https://blog.csdn.net/qq_[个人编号已隐藏]/article/details/[个人编号已隐藏]>\n\n做题的时候一定要注意积累，可以用txt文本、word文档甚至手写（**2025年补充：强烈建议学习 Markdown 语法，使用 Markdown 进行学习记录。哪怕是没有任何基础的同学，最慢三天也能学会 Markdown 了，随后你就能切身体会到它给你接下来三百天的学习带来的巨大收益，这绝对是一本万利的投资**），把一些重要的东西记下来。比如我上面说的不定长数组的输入。在做题的时候，其实相当一部分难度都来自数据的读取和输出，特别是读取。算法的难度反而不是很高。再强调一遍，string、vector非常非常非常重要，一定要把它们熟练掌握，它们是破局的关键。Map也很重要，但是相对于前面两个来说没有那么重要，但也要认真掌握。\n\n#### 3. 面试的注意事项\n\n面试其实不是特别重要，除非你竞赛拿过奖或者是ACM队的（服外和西二我不知道有没有用），不然笔试成绩基本上就等同于最终成绩。如果笔试成绩够高，只要不骂老师，都不会被刷掉的（我们去年面试进了6个，最后录取的就是笔试成绩从高到低排下来的四个）。\n\n面试的时候，老师可能会对你上强度。去年老师就拷问我的大物成绩和数分高代的成绩，问我是不是理科很差，是不是数学学不下去了才转来计算机。这种时候千万不能破防（其实我当时挺破防的┭┮﹏┭┮）。如果你已经明确了成绩单上会有某些科目成绩不太理想，可以提前在心里先准备一些理由。\n\n再强调一次，面试没有那么重要，机试才是核心，机试成绩够高，面试无所谓的。（应该不太可能出现你机试第一名但后面全都是A爷然后你被顶下去了吧……）\n\n### 四、最后的话\n\n最后冲刺的那段时间，每天三点睡七点起，白天有本专业的学业，深夜要顶着困意刷题。现在想来，那段日子委实痛苦。但看着如今在新专业的仍然辛苦但倍感充实的生活，又觉得当初的付出是值得的。\n\n又是一年深秋，看着转专业群里的学弟学妹们热烈的讨论，百感交集。\n\n大胆往前走吧。\n\n功不唐捐，玉汝于成，与卿共勉。"
      }
    ]
  },
  {
    "label": "2025 经验贴",
    "title": "2025 化工 → 软件工程",
    "summary": "来自原经验文档的转专业备考、机试与复盘记录。",
    "sections": [
      {
        "key": "imported-2-0",
        "title": "一颗零基础的卷心菜的转专业经历",
        "markdown": "叠甲：以下内容均为卷心菜的个人经历和建议，以供参考\n\n1. 前言\n2. 转专业信息来源\n3. 转专业各项事务的时间（以下时间均为25年的，仅供参考，请以具体通知为准）\n    - 3.1. 转专业的整体改革或者变动的通知时间\n    - 3.2. 报名时间\n    - 3.3. 打印申请表时间\n    - 3.4. 考试时间\n    - 3.5. 机试结果通知和面试通知时间\n    - 3.6. 面试时间\n    - 3.7. 面试结果和拟录取名单通知时间\n4. 备考前置准备\n5. 备考流程（作为参考，以实际和自身情况为准）\n    - 5.1. 自身学习情况\n    - 5.2. c语言的学习\n    - 5.2.1. 学习内容（主要）\n    - 5.2.2. 学习方法\n    - 5.2.3. 编译器\n    - 5.2.4. 调试\n    - 5.2.5. 刷题\n    - 5.3. c++的学习（包括c++，算法，数据结构）\n    - 5.3.1. 学习内容\n    - 5.3.2. 学习方法\n    - 5.3.3. 考试环境（编译器+调试）\n    - 5.3.4. 刷题\n6. 考试步骤注意事项流程（考前准备，考中规划）\n7. 备考助力（ai，课程，资源利用，笔记）\n8. 面试准备\n    - 8.1. 面试材料\n    - 8.2. 准备过程\n    - 8.3. 面试流程\n9. 想说的话（以下都是感想部分）\n    - 9.1. 自身的部分\n    - 9.2. 致正在看经验贴的你\n    - 9.3. 致谢"
      },
      {
        "key": "imported-2-1",
        "title": "1.前言",
        "markdown": "1. 在我看来未来的发展趋势还是智能化和现代化的，所以我还是坚信软件和计算机领域还是会不断发展，但是其实这个领域的发展的冲劲和狂热程度已经比前几年下降了很多，现在需要扎实专业基础，丰富实战经验，甚至有跨学科背景的人来进行开发和科研工作了，所以如果你还是希望转到这个专业，就得做好心理准备，要接受沉下心来积累知识、经验和不断动手实践的过程，还要面对对逻辑性和数学要求很高的各类课程，我希望你不是跟风或者抱着对原专业的不适，盲目觉得计算机多高级多牛逼就开始动起了转专业的念头，这个行业需要你真的热爱，要不然后续的学习不一定比原专业轻松，甚至会更加糟糕\n\n2. 如果有大二转专业的念头，还是要认真思考一下自己到底能不能顶住这份压力，因为这个时候转意味着要压上很多东西，近半年的空闲时间全部被占用，原专业课程可能挂科，周围人的不理解，刷题学习的艰苦，还有可能存在的失败之后重新面对原专业的无力。你原本可能可以依靠的人，但是在这件事情上你极大概率得不到任何人的专业支持，总的而言，这是一条属于你自己的路。\n\n3. 还有最好明确自己希望转到哪个专业，但是也得考虑到选择这个专业的风险，就像很多小专业只收一两个人，但凡来个佬，基本上这个专业就没了，还有今年的软工，感觉很多准备比较充分的都想避免选择计算机遇到大佬或者院内转的都来选择了软工，导致今年软工的报名人数和计算机一样多（计算机13：6，软工13:4）竞争异常激烈。\n\n所以当你了解自己的内心和这个专业后，仍然觉得应该为自己拼一把，那就带上你的激情和勇气，走上这条属于你的路，拼搏！拼搏！拼搏！——直到问心无愧。\n最后其实成绩也不算很高，机试420（76），面试32分，也算是当了一次守门员。"
      },
      {
        "key": "imported-2-2",
        "title": "2.转专业信息来源",
        "markdown": "1. 如果想要得到较为一线的各种消息和怕自己错过重要的通知，一定一定要加转专业交流群，在里面可以得到很多的消息，你也可以认识很多和你有一样目标的人。加群后一定一定要认真把群文件和群公告的相关内容全部阅读一遍，且最好做一下笔记，把重要的信息记录下来，而且要关注群里面的各种通知和文件。（不过进去一直水群而不是学习，可不是一个好习惯）\n\n2. 不要想转专业的通知会主动发到你面前，一定一定要多关注你想转的专业的学院的官网和福州大学教务处，把他们近几年的各种考试通知、要求、时间都了解清楚。而且不要错过最新的一些关于转专业的通知。\n\n3. 如果你能看到这篇文章，那希望你可以把和你年级相同的所有经验贴都看一遍（如果有时间的话其实可以全看一些因为25年大一也转为机考，他们的学习经验也是很宝贵的），那些都是很重要的经验和资源，我当时也是看经验贴后慢慢开始系统性准备的（今年过后经验贴多了好多啊），还有飞跃手册里面的历年考试题目，那些都是很重要的资源。"
      },
      {
        "key": "imported-2-3",
        "title": "3.转专业各项事务的时间（以下时间均为25年的，仅供参考，请以具体通知为准）",
        "markdown": "### 3.1. 转专业的整体改革或者变动的通知时间\n这个时间并不固定，所以这部分得多关注群里面的通知或者查看福州大学的官网（这点非常重要，比如25年大一的考试方式在考前应该不到一个月的时间从笔试转为了机考，完完全全颠覆了之前的备考逻辑）\n\n### 3.2. 报名时间\n（这个时间可以关注学校官网或者群里的通知）\n2025.11.21到2025.11.24（一般是11周左右），在此期间，你需要认真的确认你的报名信息，专业，年级（不过报名好像转入年级都是统一的，要降转是后续面试的时候在申请表上面手写说明），电话，申请理由等等，至少确认三遍。\n\n### 3.3. 打印申请表时间\n（获取方式同上）\n2025.11.27及之后（报名结束后2到3天），这个时候你需要打印你的申请表，然后整理好所有需要的材料和工具，如眼镜，纸笔（草稿用），学生证，身份证，申请表等\n\n### 3.4. 考试时间\n（学院官网会发具体通知（如座位号，考试地点，考试时间）\n群里也会有通知，一定一定要牢记）：2025.12.1（一般是结束报名的两周之内，有可能和课程或者实验冲突，要做好请假等的心理预期），记下考试的时间，可以多设几个闹钟，防止忘记，然后提前整理好各种材料，按时去考试\n\n### 3.5. 机试结果通知和面试通知时间\n（学院官网或群）\n2025.12.3（一般是考试结束后一周内）这个时候你就可以看到面试的名单，和面试的时间地点，仔细研读面试所需要的各种材料和细节，做好面试自我介绍的准备\n\n### 3.6. 面试时间\n（上一条）\n2025.12.4（机试结果出来的后两三天）准备好材料，牢记时间，说了很多遍了，但是还是非常重要！！！\n\n### 3.7. 面试结果和拟录取名单通知时间\n（学院官网或群）\n2025.12.6（这个看每年的习惯吧，可能压到要求的时间才出，也可能提前出）\n\nOK，看到这你也应该了解了转专业的大致信息来源和各种事务的时间，那么现在就让我们开始为转专业做准备吧"
      },
      {
        "key": "imported-2-4",
        "title": "4.备考前置准备",
        "markdown": "在大学中，特别是大二转专业并不是简单的学习就行，很多学习之外的事情没处理好，或者没平衡好都会带来很大的影响\n\n1. 如果你下定决心要转专业后，希望你可以认真梳理一下你们这学期的所有课程，大概率转专业是要到期中考之后的，甚至会和一些课程，实验，甚至考试撞到一起的，或者最极端的，如果失败你就得面对之前所有欠下来的课程，所以合理的对你的课程做出取舍，做好可能的缓考和请假的准备，不过最好不要养成旷课和挂科的习惯。\n\n2. 如果你明确有了转专业的想法，最好还是注意一下传播度（我更推荐低调一点），如果很累，可以找信任的人倾诉，但是大多数情况不反对不支持可能是最好的结果，你需要找一个比较不会被人打扰的地方（每栋宿舍楼都应该有考研自习室，如果没有人用，那边就是最好的地方）\n\n3. 如果你有任职学生干部或者什么其他的，还有原专业成绩比较好的，对于大二的安排就要好好考虑了，做好可能被导员或者其他leader谈话的准备（这个压力还是看学院，有的看的很松有的会压力），但是我希望你做你觉得正确的事情，这是属于你的生活。"
      },
      {
        "key": "imported-2-5",
        "title": "5.备考流程（作为参考，以实际和自身情况为准）",
        "markdown": "如果你是在大一或者大二前的暑假就看到这篇文章，那不用想，你算是最早开始规划的那批人了，不用为自己的零基础感到焦虑，你有充足的时间来学习，最重要的是你的行动力。\n\n### 5.1. 自身学习情况\n最开始还是说一下我的大致的学习过程和方式，作为参考，我学习的课程是自己报的班，和买的一些课程，所以如果想无开销备考，还是建议先看看别人的推荐的课程\n我是学c和c++的，花了半个多暑假学习完了c，后面的时间学习c++，数据结构和算法（这点不要学我，这样的时间分配太不合理了，导致我后续的刷题和进阶的时间被极大的压缩了），其实最终上机考试的时候基本上都不是用c的，因为很多题目用c++中的各种容器和算法会方便的非常多，如果用c那就是纯折磨，但是其实c和c++很多东西也是相通的，学习c也可以帮你打下编程的一些基础，不会后面c++时手忙脚乱\n（但是有看到有推荐直接学习Python的，你可以都参考一下，按照自己的情况选择）\n\n接下来我将以（学习内容->学习方法->编译器->调试->刷题）这个顺序来介绍一下我比较推荐的备考流程\n\n### 5.2. c语言的学习\n\n#### 5.2.1. 学习内容（主要）\n（1）重点常见概念；  \n（2）数据变量和类型；  \n（3）分支和循环；  \n（4）操作符，运算符，表达式；  \n（5）常用函数；  \n（6）数组和字符串数组；  \n（7）指针；  \n（8）位运算；  \n（9）结构体；  \n（10）可以补充一下基础的算法（排序，递归等），剩下的内容可以在题目中或者遇到的时候再补充（像那些内存管理，文件操作，编译操作可以都先放着，如果题目中真的遇到了再学（大概率不会有的））\n\n#### 5.2.2. 学习方法\n在一开始零基础的时候最好花半个月来学习一下c（注意重点还是在接下来的c++和刷题中），在学习的过程中重点是去理解基本的编程思维，很多代码和基础的结构跟着视频敲一敲，多熟悉一下那个感觉，（但是其实现在回想起来当时花在c和c++基础学习的时间太多了（特别是c），导致后续的算法学习和刷题有点被耽误了）\n\n#### 5.2.3. 编译器\n学习c的时候我用的编译器是vs2022（b站上面有很多教你怎么下载和如何调试的视频，找个播放量高的跟着即可），我感觉这个还用起来还是比较舒服的，它很方便，我没有像那些大佬一样配置自己的环境，但是用它你就可以比较轻松的完成各种调试操作\n\n#### 5.2.4. 调试\n可以说调试就是学习编程最关键的技能之一，（具体也可以到b站上面找到相关的教程，b站的资源还是很丰富的），因为很多时候你写出来的代码自己感觉没什么问题，但是就是跑不出想要的结果，这个时候可以通过断点加上监视窗口，一步一步看着代码是如何运行的，查看哪步和自己的想法出现偏差（印象会很深刻）\n不过后续的调试就不是这样的了，这个改变还是要源于今年超级无敌突然的调整，只能在考试界面答题，不能切到其他界面和编译器去编写和调试，也不能带任何的材料，所以后续真正刷题和适应考试环境的时候到调试方法是另一种\n\n#### 5.2.5. 刷题\n这个时候你如果想写点东西，就可以把你跟的课程里面的一些代码复现一下，或者做一些各个平台最基础的入门题目（但是就本人而言，这段学习更多是积累经验和基础，花太多时间刷题，反而可能因为稍微复杂的题目就要自己实现很多功能，或者把简单的题目复杂化，导致很容易被打击，所以你能把课堂上面的一些基本题目和算法完成和复现出来就可以了）\n\n\n### 5.3. c++的学习（包括c++，算法，数据结构）\n\n#### 5.3.1. 学习内容\n（1）stl的容器（比如vector，string，queue，stack，map这些，这些是考试中存储输入的数据和按照题目要求处理那些数据的基础）；\n\n（2）容器的使用函数（push_back(), back()等）；\n\n（3）各类函数或者容器所对应的头文件<span style=\"color:#039CED\">（注释1）</span>（这些就是包含你想使用的函数或者容器的库，只有包含了它，你才能使用）；\n\n（4）数据结构<span style=\"color:#039CED\">（注释2）</span>\n\n（5）算法<span style=\"color:#039CED\">（注释3）</span>\n\n（6）还有其他的也是建议做题目碰到或者必要的情况下再进行补充（其实那些面向对象编程的知识（封装继承多态等）其实都可以放着，因为考试中应该是完全不会使用到那一部分知识点）\n\n<span style=\"color:#039CED\">注释1：关于头文件：但是其实也有一个比较偷懒的方式，就是使用万能头文件（`#include<bits/stdc++.h>`（它就等于一次性包含了所有常用的头文件）（25年可以用））但是听学长说可能有稳定性的影响，所以你其他的头文件还是要背下来的，避免考场上出现使用不了的情况</span>\n\n<span style=\"color:#039CED\">注释2：其实这部分的关键是理解数组，链表，栈，队列等的底层结构和算法原理，上面提到的vector，string，queue，stack都是数据结构在c++中的实现，就是在c++中这些东西已经帮你构建好了，你可以直接使用，如果你的目标只是考试，那就可以直接学习c++中那些容器的使用，实在需要再去补充一下更加底层的数据结构的知识。</span>\n\n<span style=\"color:#039CED\">注释3：常用的算法，贪心，动态规划，搜索，排序，递归（还有双指针，位运算，滑动窗口，分治，模拟等，去其实对算法的种类还不太了解，如果有重复或者分类不合理见谅哈）等等这些都是要尽早开始学习的，别像我最后一个月才开始练算法，之前做一大堆题目都不知道用什么算法，只知道自己硬搞，结果做的慢，对的少，差点被打击到爆炸。</span>\n\n#### 5.3.2. 学习方法\n这个时候就得更加细心和耐心，要完完全全的掌握所有c++中常用的stl容器和函数的使用，及其对应的头文件，如果能了解一下其中的底层逻辑还是最好的，虽然说主要以做题使用为准，但是遇到真的理解不了的还是要了解一下它的原理（也就是数据结构的内容）\n\n还有算法学习，这个，emm，如果可以找到系统的课程还是要花时间跟完，并且要好好完成其中的题目（我这个部分没有非常了解，也因此吃了一些亏，我原本是纯硬写，后面慢慢的找到对应课程和练题中看一些高手的写法积累起来的，不过这个地方非常非常重要，在考试中挺多地方都考验基础算法的能力，所以不要犯和我一样的错误）\n\n#### 5.3.3. 考试环境（编译器+调试）\n现在来详细说一下考试编写代码的环境，考试用的是PTA（https://pintia.cn/home），你可以直接搜索PTA或者复印网址打开，你可以先尝试一些简单的题目（PAT乙级1001（题目难度排序我后面再说）或者团队天梯赛中的L1的题目），适应一下那个环境\n\n因为今年考试直接强制我们只能在那个界面下做题，所以平时调试的方法都没办法继续使用了，它只能用一个更加简单粗暴但是又麻烦的方式，就是用输出进行调试\n比如我设置了一个 `int a=10;` 接下来我可能需要通过一系列的操作来将其变化为我需要的答案，在操作的过程中我可以通过 `cout<<a;`/`printf(“%d”,a);` 在输出窗口查看a的变化是否和我希望的一致，但是因为PTA的题目都要求只有一个最后的输出，所以你调试完后要么注释掉，要么删掉。\n\n还有要熟悉只用注释分化代码，用输出来进行调试（比如就是有道题可以跑出结果，但是结果和要求不一样，那就可以把下面的代码先注释掉（但是不是删掉），先对上面的几个参数进行输出，看看这些参数的数值和我们预想的是不是一样的，依此来排查问题）\n\n因为操作的限制，你在学习和写代码的过程中要格外认真，习惯性粗心，学校比较卡的电脑（你可能想多调试一下就会花很长时间），难以调试的各种参数，题目对各种细节都重视都可能会让你在考场上没办法AC。\n（注意你常用的编译器类型，要记得，考试时不一定是你常用的那个，如果平时在pta上用g++结果考试时没调选择了clang，那就有可能出现一些问题）\n\n#### 5.3.4. 刷题\n这个时候你就需要大量的练习了，首先我还是想说一下题目的特点，考试的题目和PTA上的题目都有的很重要的考点，就是对数据输入，存储，处理，输出，特别是输入和输出这两个，最开始你要认真读题目，确定数据的范围，类型，输出的要求（包括换行和空格），PTA对这些东西抓的都非常严格，所以你必须把stl容器的各种函数和使用学的明明白白，如果输入都有问题，那后面也别做了，而输出也是很关键的，因为他会有很多的细节，你必须严格按照要求输出，多一个空格或者换行都是不行的\n\n还有注意有些题目的一些特点，就像pta乙级中的链表的排序，看着很唬人，其实解决的方法都是完全一样的，只要掌握存储这些数据的方法和按照要求输出即可，像这些很固定的模板题掌握一个其实一类都差不多了，只是细节有一点变化。\n\n核心题目：  \n1.\tPAT乙级所有题目<span style=\"color:#039CED\">（注释4）</span>  \n2.\tPTA团队程序设计天梯赛（L1,L2,<span style=\"color:#DEA9FF\">L3（进阶，时间不够就别碰了）</span>）<span style=\"color:#039CED\">（注释5）</span>  \n3.\t洛谷，牛客网，leetcode（算法题（简单到中等））<span style=\"color:#039CED\">（注释6）</span>\n\n<span style=\"color:#039CED\">\n注释4：关键要完成的题目有pta乙级的所有题目（这个我也才刷到2178分）（它的难度是每5题从简单到难不断上升的）（但是其中有一些几十上百行代码的模拟题真的有点恶心，那部分可以尝试实现一下核心的结构，如果时间很紧张可以放着），但是写题目的过程中，如果感觉自己下不去手，或者是题目经验太少写了几十行代码才勉勉强强写出来的，可以去找一下答案，但是绝对不是死硬板板的抄答案，看看答案思考是怎么入手的，怎么实现的，然后不看答案再自己再复现一遍，这个步骤就是在不断优化自己的算法和代码思维（别和我一样，一道简单题，输出不会输出if else写了十几个），\n</span>\n\n<span style=\"color:#039CED\">\n注释5：有些水题直接看一眼就走了，不用浪费时间\n</span>\n\n<span style=\"color:#039CED\">\n注释6：（这部分题目我刷得没有很多，所以也很难整理出具体的题目分类，可以参考一下其他经验帖中的内容），不过因为很多时候他们的答题和提交的模式和最后考试时的PTA差异很大，所以很多核心算法在AC之后要在编译器上面进行复现和构建出完整的代码（就是包含头文件，main函数，输入，输出）（这个在复现的过程中最好也是和考试环境一样，只用输出加注释的方式进行调试，如果没有习惯这种调试方法，考试的时候遇到答案错误真的束手无策）\n</span>"
      },
      {
        "key": "imported-2-6",
        "title": "6.考试步骤注意事项流程（考前准备，考中规划）",
        "markdown": "现在再来说一下关于机考的各种注意事项\n1.\t机考25年不让带材料，但是后面不知道会不会改回去（大概率不会），但是最好还是有点准备的，但是该准备的：学生证，身份证，申请表，纸笔（打草稿），卫生纸等\n\n2.\t一定一定要提前到场，因为电脑和键盘都不太好用，所以在刚开始就尽快查看你的电脑能不能打开考试的软件，还有如果键盘觉得不好直接和老师申请换键盘（我是做了一题后受不了了才换的）\n\n\n3.\t关于及格线，今年是有说明没到及格线的没办法参加面试，但是考完试咨询一下老师，及格线是根据考试的情况来划的，应该不是固定的分数（但是这边还是要以当时的考试和老师的通知为准）\n\n4.\t考试时保持好心态，刚开始的时候一定要确认一下编译器类型和扫一遍题目，确认可以下手的几道题目，从最简单的开始做（不要盯着难题，25年有两道题一个人都没做出来，还有一道只有一个人做出来，相信自己的准备），能把简单题都拿下，再加上中等题做出来一些，你就已经超过很多人了，最好在重要部分的时候先试运行一下，看看数据的内容和你预计的是不是一样的，发现AC不了的时候还是建议优先尝试修改那几道会做的，比如看看是不是超出变量的范围（int 改 long long 这类的）\n\n5.\t如果遇到有点难处理的中等题，最好可以打个草稿，把中间的处理过程大概写成来，然后在按照流程认真实现，如果直接头脑风暴的话有可能会出现中间的处理部分写的效果和希望的效果不一样，那样子重新梳理在调试会花掉更多的时间\n\n6.\t难题最后看，如果发现真的一点下手的地方都没有，就尝试打表（就是假如正确输出次数，错误输出no，那直接输出no也还是可以拿到一点分数的），难题除非你前面完全写完或者真的写不出来了再做（先打表拿点分），我当时就是在难题上花了太多时间导致有题中等题没时间去做了\n\n7.\t考试心态还是要再说一下的，你要做到的就是全程保持好心态，努力拿更多的分，不要被环境影响。"
      },
      {
        "key": "imported-2-7",
        "title": "7.备考助力（ai，课程，资源利用，笔记）",
        "markdown": "对于大部分零基础的人来说最重要的还是找到合适的课程，根据自己的情况来分配自己各个部分的学习时间，然后认真的学完。千万注意不要出现盲目的死磕某一个点，因为时间是最宝贵的资源，你需要在最短的时间里面积累足够的经验和知识，而不是一直追求理论的深度，而忘了刷题，遇到真的不会的可以问ai（虽然ai很多时候写的代码比较蠢，但是还是可以给出思路），请教别人，或者看看答案，我就是很多时候题目不会做或者不理解的就扔给ai，可以很快从盲目的胡乱思考中脱离出来。如果遇到迷茫的时候，翻翻经验贴，整理一下自己的思路。\n\n还有一个很重要的点，就是做笔记，如果不做的话会出现学了后面忘了前面的情况，从一开始学习的时候就要养成记笔记的习惯，笔记的方式因人而异，我是直接用ppt和word记的（可以参考其他大佬的笔记方法），把核心的知识点，关键的函数和头文件，做过的题目（分类，记最牛逼的几题）等记录下来，这些都可以在你最后复习的时候给予你巨大的帮助。"
      },
      {
        "key": "imported-2-8",
        "title": "8.面试准备",
        "markdown": "当你看到面试名单的时候，恭喜你已经通过了第一关，接下来你就要做好展现自我的准备了，虽然面试除非真的有含金量很高的奖项或者项目，要不然其实还是主要看机试的成绩和排名，但是这不意味着你可以随意对待面试（面试过于随意可能会被后面的同学翻盘）\n\n### 8.1. 面试材料\n（1）成绩单（可以到宿舍楼附近的学生社区服务中心去打印）\n（2）申请表（需要签名，和按照要求写明是否要降转）\n（3）各类奖项的原件及其复印件（emmm推荐还是努努力多找一些，最好不要空着手过去\n（4）学生证和身份证\n（5）其他材料依照当年的通知为准\n\n### 8.2. 准备过程\n因为面试名单和面试开始会隔一段时间，要好好整理自己的相关材料，写一篇发言稿（不过好像不让念稿），想想要怎么介绍自己，说清楚自己学习的基础，对这个专业的兴趣，为什么要转，有什么奖项等，因为大二一般是最后面试的，所以时间比较晚，尽量控制自己的发言时间在4到5分钟之间（我当时太长了差点被叫停了），如果吹牛逼或者有哪方面拉了要做好被拷打的准备（稳住，认真回答即可）\n\n### 8.3. 面试流程\n面试一般是5人面试1人，所以要做好心理准备，先在候考室等着，一次叫三个人出去，然后只能带着你的材料在门口等，到你的时候进去先交一下你的各项材料，然后进行自我介绍，然后老师会进行提问，然后结束。"
      },
      {
        "key": "imported-2-9",
        "title": "9.想说的话（以下都是感想部分）",
        "markdown": "### 9.1. 自身的部分\n其实我的高考分数并不是很高，虽然非常认真的填报志愿，但是还是是被最后一个志愿接住了，虽然这个专业我并不是很了解，原本在大一上的时候也尝试转专业过，但是当时准备的太拉了，而且脑袋一热把学生会和班干部全进了，导致第一次转专业考试直接爆炸了，其实当时看身边的有些人都转走了还是感觉很不甘心的\n\n后面也只能面对现实，大一下也老实本分的呆在原专业，努力学习，成绩也在保研边缘，但是面对那些真的很难适应的课程，感觉兴趣在一点点的被消磨，我想起之前说过的一句话“有那么多通往成功的路，选一条最喜欢的就可以了”，所以抱着这个想法我开始了尝试，很幸运，我第一次的尝试就遇到了感兴趣的点\n\n于是在暑假我就开始了解大二转专业的相关信息，那个暑假我基本上每天都在学习，不过因为过于追求深度导致我刷题量很少，那些考试时一般不会用到的文件处理，编译链接，面向对象编程的知识我都学了，但是就是没怎么刷题（这点非常不对）\n\n直到大二开学我还是觉得时间非常充足，直到越来越多的课程和工作，还有那些迟迟未开始的题目，让我意识到真的可能来不及了，最开始刷题的时候我还记得是PTA乙级的第一题，我连输入输出都不知道怎么弄，那题我做了一个下午，随着时间的推移，我的休息时间被不断压缩，那段时间2点休息7点起来上早八变成了我的常态，顶着学生工作，原专业课程，还有转专业的压力日复一日，现在回想起来还是心酸。\n\n随着考试时间的公布，我感觉比高考还紧张，最后几天也是浑浑噩噩的过去了，实话实说，考试的时候没那么紧张，更多是无力感，被难题占了太多时间，中等题写的一般，其实更多的还是麻木了\n\n现在我依然记得出机考成绩的那个下午，原本感觉发挥的一般，怀揣着可能要面对原专业的无力焦虑的刷新着手机屏幕，但是当打开那个名单看到我的名字时，我感觉一切付出都有了回报，真的是热泪盈眶啊。\n\n这里还想将一位学长的话送给你“功不唐捐，玉汝于成”，是这句话让我不断前进，我也一直在用自己的行动践行这段话。\n\n### 9.2. 致正在看经验贴的你\n或许你也因为对专业的不了解选到了一个不感兴趣的领域，或许你也很迷茫不知道未来的方向，不过我还是想说，其实人生的容错空间真的很大，与其用这些专业职位生涯规划来把自己框定住，我更希望你可以用感受和体验的方式来看待你的生活\n\n就像在你出生前，还是逝去后，所组成的的物质都还是存在，无论时间怎么流逝，只是在这一刻，它们组成了你，所以不用纠结太多，现在就用自己的方式去体验和感受这个世界，专业不是全部，工作不是全部，学业不是全部，你所需要的是不断的吸收，不断探索，不断前进，做那些你觉得对的事，成为你想成为的人，去看你想看的风景，在这物质的世界中找到自己的意义\n\n所以放开手去做吧，无论前路如何，无论成功失败，要做的就是把自己的路走到问心无愧，走的坦坦荡荡\n\n### 9.3. 致谢\n最后我想对所有帮助过我的人致谢，虽然我说过这是一条属于自己的路，但是在这条路上，我碰见了很多非常好的人，是他们不厌其烦的回答了我很多的问题，给予我宝贵的建议，包容了我的一些情绪，甚至帮我分担了很多压力，这条艰苦的经历因你们的存在而变得更加宝贵，再次向他们致谢！\n\n**如果你看到这段话，非常感谢你可以看完这篇文章**  \n**最后，献给所有不断前进的人，敬明天！**"
      }
    ]
  },
  {
    "label": "2025 经验贴",
    "title": "2025 环境工程 → 计算机类",
    "summary": "来自原经验文档的转专业备考、机试与复盘记录。",
    "sections": [
      {
        "key": "imported-3-0",
        "title": "笔者信息",
        "markdown": "2024级环境工程降转2025级计算机类\n\n机考520分第一，面试32，综合排名第二。"
      },
      {
        "key": "imported-3-2",
        "title": "关于备考",
        "markdown": "思来想去，还是先把干货部分放在前面吧，不浪费大家的时间了。\n\n  有关于转专业基本政策等的什么东西我不想在这里过多赘述，详细可以看交流群里的那一篇文档，里面写的清清楚楚（[uuz](https://github.com/ShaddockNH3)的恩情还不尽\\O/）。如果有文档里没有提及的部分可以在群里问喵（~~学长学姐都很热情不会把你们吃掉的~~）\n\n  **准备工作：**\n\n-   一个适合自己的IDE。\n-   一个用于记笔记的markdown编辑器。\n-   一个洛谷账号，一个力扣账号，一个PTA平台账号。\n-   一个AI平台账号。\n-   一颗能坚持下来的心\n\n\n  关于IDE，如果是在PTA平台刷题，那么只建议直接在平台上写题而且字号调成最小的那个字号，为什么呢？因为2025年机考突然不知道~~突发什么恶疾~~ 为什么突然变了，连Dev都不给用，只准在PTA平台上面直接作答，然后那个平台，字体相关的设置不能改！不能改！就导致一定要用那个看的眼睛都会疼的字体大小写题。以防考场上不适应，还是提前练好吧。\n\n  如果不是在PTA平台，那么可以选择的IDE就很多了。纯小白的话可以先使用那个紫色的Visual Studio，相关设置自己稍微调一下就好（当然如果连这都嫌弃麻烦，那说明你适合Dev-cpp）。如果想要更好的体验的话可以自己去配一个vsc的C++运行环境啊，也不是很难，网上教程一大把，跟着做总能会？再不会问AI去。至于其他的IDE我本人是没用过了（\n\n  然后讲讲markdown编辑器，为什么我推荐的是markdown呢？很简单，代码这种东西用Word记甚至手记自己想想是不是有点太变态了，我自己用过Word甚至手记，答案是效果全部不如markdown（~~我就说markdown是对的吧~~）\n\n  编辑器这一块推荐的是Typora，这个编辑器我觉得做的挺好的，不用去学markdown语法，点开即用，只需要掌握最基本的几个快捷键就能轻松上手，believe me，体验真的比其他的好很多很多。\n\n  然后是几个OJ平台，这个没什么好说的，到时候刷题的时候总会遇到的（~~我其实很讨厌PTA，因为我觉得PTA的题质量很低，而且没有解题区，生态真的是数一数二的差，但奈何学校真的喜欢用~~）\n\n  AI平台的话，推荐GPT，免费的GPT4已经够用了，次选DeepSeek老师。至于豆包？如果你真想学，别去问豆包代码问题，算法题依然是豆包最严厉的父亲之一。\n\n  其实这些准备工作做完后，应该就不至于还是电子文盲状态了，那么接下来就是备考的重头戏。\n\n**你需要有的：**\n\n-   洛谷深入浅出基础篇与进阶篇（进阶篇大二可选）\n-   代码随想录\n\n\n  洛谷深入浅出，这一套书是我目前在市面上见过最适合0基础新手入门的教材，我本人就是啃这一套书入门的。本人实测，如果以每周作5休2，每天6小时的强度学习，大概花费1.5个月时间就可以把基础篇学完。学完的收获还是很多的喵，而且不会做的习题在洛谷的网站上面都是有大佬分享的题解的，阅读他们的代码也可以学到一些其他的东西（~~虽然我觉得他们有些人的代码可读性真的很差~~）\n\n  代码随想录是学长推荐给我的，定位其实是面向求职的程序员的，但是，作者把很多算法都讲的非常的清楚，我目前真的找不到讲的比他还好还容易理解的了。我当时个人的经历是，学完搜索之后其实毛都没懂，然后看了他的讲解之后，当时突然有一种开智了的感觉（）。或许有点夸张，但真的很不错喵！网址：https://www.programmercarl.com/    (依旧[uuz](https://github.com/ShaddockNH3)的恩情还不尽)\n\n**你需要学习并掌握的：**\n\n-   C++的基础语法\n-   各种STL容器的用法，特点以及基本操作\n-   简单的数据结构\n-   各类基础算法，以洛谷基础篇和代码随想录为准\n-   ~~各种奇技淫巧~~\n\n\n  基础语法我懒得多说，这是最基本的，网上的课程一大堆，这边的建议是看b站黑马程序员的视频。但是，面向对象的内容不用看，别浪费那个时间。看完一个基本语法之后，就去洛谷的入门题库里面找到对应的题写，不写题不就等于没学嘛喵，希望都能记住这个道理。\n\n  STL容器的话，这个确实很重要，但是我个人的看法和很多人都不一样，我没有去看黑马STL容器的部分，而是自己看一个很神秘的文档，在写题的时候一点点学的，反正就是，这个题要用到这个了，那我学一下怎么用吧，就这样一路缝缝补补下来的，我也不敢说我很会用就是了。\n\n  数据结构的话，太复杂的应该是不用学，重点要学习的数据结构就是链表，二叉树，图论。尤其是图论，这个又难又杂，而且年年都考，这块硬骨头我知道很难啃，但是必须要啃下来的，嗯！\n\n  基础算法，什么贪心啦，二分啦，双指针单调栈滑动窗口和搜索动态规划啦……总之都是要学，并且必须掌握的。这个的话，我前面说过了，先啃基础篇，再啃随想录，如果踏踏实实的啃完之后，那么你对这些基础算法应该是有一个基础的认知了，记得刷题保持手感，并且记得定时复盘（这就是我说的markdown编辑器的作用了，你也不想你的笔记第二天你自己都看不懂吧），还是那句老话，不用等于没学。但是也要记得，不要死背模板，一定要理解这个算法的背后实现，独立能搓出来。主播当时踩过这个坑喵，还好当时还有时间（\n\n  奇技淫巧，这个我不知道怎么说，就像PTA的链表题其实都是套皮的数组题，全排列有一个妙妙小函数可以直接秒杀了一样，都是写题的时候慢慢自己发现并且总结出来的。传承？说不上，这更像是自己的一点小体悟吧，如果真的能自己总结出来规律什么的，那就说明真的学到东西了喵。\n\n  补充一个东西，学有余力可以学习一下Python，在写一些模拟题的时候特别好使，以及对于正则表达式的支持是非常关键的，虽然C++也有，但是regex库的性能其实是有点神秘的。（为什么我会说这个，当时和俩学弟一起刷L1的时候，一道题被他们用正则秒了，而我手搓了半天……~~虽然我当时一直嘴硬Python不过奇技淫巧，不如我C++手搓~~）\n\n**你需要刷完的题：**\n\n-   PTA乙级与PTA-L1,L2部分题\n-   洛谷入门题\n\n\n  PTA乙级其实是模拟大集训，有些题刷不下去也无所谓反正，毕竟有些题的存在就是意义不明的，那种百行超级大模拟可以稍微放一放，当然如果你对你自己代码的稳定性不自信的话，那这边建议还是全部刷完，如果对自己代码有一定自信的其实不用管，但是，至少得看一下思路。\n\n  L1的话，很多都是入门题，这一套挺不错的，但是，有些实在太若只的题目就跳了吧，那些20分题倒都挺不错的。至于L2，你可以不完全写，但是请务必掌握每一题的思路，这很重要。\n\n  洛谷入门，必须写完，而且是在语法学习阶段就必须写完！这是最基本的指标。\n\n  另外打一下广告，推荐题单可以看看这位整理的：https://blog.terraria.ink/blog/soft-enginering-exam/"
      },
      {
        "key": "imported-3-3",
        "title": "关于机考与面试",
        "markdown": "谢邀，考试当天紧张死我了，突然告诉我不能带纸质资料进考场，还好我早有预料在考前花了一点时间把资料上一些重要的东西背了下来，这个真的是我这辈子做过最正确的决定。\n\n  考试的时候要自己启动电脑，然后好像听说有些机子要自己连校园网，我的是已经连好了。一切调试确认没问题了之后，就可以举手找老师帮忙扫码进入考试页面了。这个时候还不能作答，题目集还没开放，但也请不要在电脑上乱点，出事了你解释不清楚的。\n\n  另外，记得适应一下考场的键盘和鼠标，这一套键鼠是我用过最烂的了，键盘要按的很重才能按的下去，鼠标也没有鼠标垫，唉唉，敲代码速度自动下降了。所以平时就要练一练自己敲代码的速度，别因为敲不完代码而丢分。\n\n  ~~顺带一提，如果你实在不会做了，可以尝试直接输出样例，能骗点分，真的。日后惹出事来别说是我教的就行了~~\n\n  做不出来别紧张（虽然我当时紧张到冷汗直流），有两种选择，一种是先跳过，另一种是接着debug一段时间看看。但其实不是很推荐第二种，除非你很清楚的知道是哪里错了。考场上的时间太过紧张，一分一秒都不能浪费。\n\n  我当时迷宫卡建图了，然后子序列和那个神秘压轴题不会写，考试结束拿了520，差点都准备回去复习流体力学和物理化学了，后来才知道，原来大家基本也都不会做，给我一菜鸡混到第一，那没事了。所以也不用把对手想的太厉害，大家都基本那个水平（~~其实是今年没有A✌炸鱼~~）\n\n  面试的话，我强调几个点：\n\n-   1 别吹牛逼，老师再怎么说也比你懂，吹牛逼被揭穿会扣非常非常多分数\n-   2 别聊着聊着就聊嗨了，发狂了，忘我了。\n-   3 有些老师会刻意刁难你，别怕，别紧张就行。\n-   4 老师会围绕你的审批表和自我介绍进行”拷打“，所以，不会的东西别往上写/说，踏实稳妥一点。\n-   5 如果你没有过开发经验/中学没拿过NOIP的奖项，那么就认为是0基础，学过语法不等于有基础。\n-   6 大二的如果有挂科记录，记得想好解释的理由，这是绝对会被拷打的。\n\n\n  当时我自我介绍完就被问了两个问题，一个是让我介绍两个算法，另外一个是拷打我的成绩单（把我晾在一边两分钟，几个老师自顾自的讨论起了我的学分怎么搞……）。\n\n  也不知道是因为什么，只问了这俩问题，反正我感觉应该是他们累了，想下班了。"
      },
      {
        "key": "imported-3-4",
        "title": "关于我自己",
        "markdown": "干货到此结束，只是想来看干货的其实可以退出了，下面的内容是我自己的一些感想和碎碎念了。\n\n>   **时间轴**\n>\n> -   2024.7 填写志愿犯蠢了，当场坠机，加入转专业交流群开始备考\n> -   2024.8-11 疯狂备考转专业，但后面……\n> -   2024.12 笔试第25耻辱下播，面试吹牛逼直接完蛋\n> -   2025.1 疯狂速通专业课补天ing\n> -   2025.3 开始思考未来\n> -   2025.4 开始学习语法备考转专业\n> -   2025.7-8 用暑假两个月的时间啃完了洛谷基础篇\n> -   2025.9-10 开始写PTA乙级\n> -   2025.10-11 开始刷代码随想录。并成功搭建起个人博客。\n> -   2025.11 开始刷L1，以及整理板子和到处找题，以及全平台500题达成\n> -   2025.12.1 机考当天\n> -   2025.12.3 出面试名单\n> -   2025.12.4 面试\n> -   2025.12.6 正式出结果，win！\n\n  有些人可能认识我，因为我收到福大录取通知书的那一刻起就抱着转专业的想法而且水群水的可不少。我的高考志愿报考简直是没话讲，可以拉出来当反面教材典型的程度，导致一下子给我滑到环境来。\n\n  所以我在新大一的那个暑假就开始学高数，买了导论的书，基本把所有的专业课都翘了，去的课也是没听。然后战线拉的实在是太长了，我后期真的学不动了，天天窝在宿舍里打游戏，等到要笔试了才想起来。最后虽然进面了，但现在确乎是很想扇当时的自己一巴掌，面试和老师大吹牛逼特吹牛逼，甚至吹完还不自知，也是不出所料，寄了。\n\n  实实在在当时是颓废逃避了20多天，直到期末周真的来了才想起来读书。也是很幸运，我大一上学期没有挂科，但绩点是被弄得很难看了。后来寒假回家过了个年，大一下学期才开始想自己的出路。\n\n  我想过两条路，一条是接着备考计算机，一条是在环境接着读下去，甚至有一段时间，我的想法更多是在环境接着读下去。但后来，我发现我真的很不喜欢学化学，可偏偏专业课里面又有一堆化学。也差不多是这个时候，我的想法开始转变了，我开始一点点的利用晚上的时间从语法学起，因为白天要上课。\n\n  很感谢柚柚子学长，确实是在我最迷茫的时候给我点了一条路出来，后来我开始去一点点碎片化的了解计算机也是他的功劳，给我提了很多很宝贵的意见，总之一句话总结就是，[uuz](https://github.com/ShaddockNH3)的恩情真的还不尽。\n\n  暑假的时候，我一天6h啃洛谷基础篇，然后坚持了一个半月（~~为什么是一个半月，最后十几天我读不下去了给自己放了个假说是~~），其实也是三打两晒，因为我很清楚我的抗压能力很差，也没把自己逼得太紧。这其实也是我选择降转的理由之一了。\n\n  大二上学期真就是每天base宿舍敲代码，有些课都懒得去了（因为这个我还被有些老师威胁平时分清0），当时赌注确实下的很大，如果没有转成，我大抵是要吃学业预警的（笑）。庆幸的也是转成了。\n\n  其实有人问难道不会坚持不下去吗，不会心态爆炸吗。我的答案是怎么可能不会，我也是人啊，我的抗压能力可能比一般人还差吧（？）。压力真的太大了就停下来吧\n\n（我当时缓解压力的方法是自己调教了一个写文的AI，然后想看什么就把什么输入进去让它写，它什么都能写（笑），~~所以有时候可能会看见我莫名奇妙对着手机傻笑~~）\n\n  机考前几天我每天过的提心吊胆，非常紧张，做过最坏的打算是今年不让带材料，最后也是真的应验了。考完之后感觉完蛋了，出院楼的时候腿都是软的，后来和几个朋友去了附近的一家糖水店小聚了一下，也就没那么紧张了。\n\n  最扯的是看到面试名单的那个下午，我真的以为我自己稳了，面试只要不打老师就能过，然后和舍友一起打了一下午游戏（好孩子不要学），后来被[155](https://github.com/155TuT)叫出去模拟面试，[uuz](https://github.com/ShaddockNH3)和[155](https://github.com/155TuT)一提醒，我才发现，不好，我好像一不小心会被翻盘！为了我不在福大实现某种意义上的永生，当天晚上就构思了一大堆问题我该怎么回答。虽然面试官也只问了我俩问题（蓝发小女孩这扯不扯.jpg）"
      },
      {
        "key": "imported-3-5",
        "title": "To the Lost You",
        "markdown": "这一部分原本是没打算写的，后来在各种地方观察后才发现，原来那么多人和当时大一刚刚失败了的我一样迷茫找不到未来，感觉人生就此被蒙上了一层雾，如果你能够坚持看到这里，倒可以听听我的想法。\n\n  有些话或许在现在讲是很难被人听进去的，但我依然需要讲，生命不止于转专业，人生的容错高不高，其实全部都是取决于自己。\n\n  如果你感觉看不到未来了，那么就先看看脚下吧。如果你实在累了，在路边坐坐也未尝不可。\n\n  你可以和我一样，花费一整个学期的时间去探索，最后做出选择是要留在原专业，还是要坚定的第二次再战转专业。也可以选择和每年都有的少部分人一样，退学复读，争取冲一个更高层次的高校，这都可以。\n\n  但请记住，这一切都需要建立在最后回归到正常的生活之上。而且，有些时候，塞翁失马焉知非福。如果大一那一次没有失败，或许我现在也依然浮躁。\n\n  很多人顾虑降转需要多读一年，但换个角度思考，在一个你快读不下去的专业读四年，和花费半年时间去到一个自己喜欢的专业读五年，哪个最后的结局会更好，我想心里都是有答案的，多出来的那一年未必不是一种沉淀。\n\n  找找别人聊聊吧，也和自己聊聊。我实在很难说我是否已经和过去的自己和解了，但无论是否和解，生活还是要继续的。\n\n  我为何会写这么多，因为我曾经也经历过。大一下我经历了道心破碎环节，那时一直在想，我前20年到底是在活什么，怎么书没读好，什么技能也没学到？后来暑假我释怀了，可能是突然想开的吧，只要忙起来，慢慢的就不在意了，每个人都有自己的方向和道路不是吗？毕竟有些事情是不继续走下去就无法传达的啊（笑）\n\n  献给阅读到这里并且有着相同困境的人\n\n> - 下手なりに泳ごうか 願うだけじゃ\n>\n>   笨拙地奋力向前游吧 只是祈愿的话\n>\n> - 海の月にはなれない\n>\n>   可成为不了海中之月呢\n>\n> - ただ 流れてゆく毎日に サヨナラをしよう\n>\n>   向这随波逐流的日常 来道别吧\n>\n>   ……\n>\n> - そうだね 沈み続けるのは簡単だ\n>\n> ​       是啊 这样消沉下去很简单\n>\n> - 抵抗してみようか 見苦しさも\n>\n> ​       但试着反抗一下吧 就算是这幅丑态\n>\n> - 私らしさなのだから\n>\n> ​       这就是我自己啊"
      },
      {
        "key": "imported-3-6",
        "title": "致谢",
        "markdown": "感谢帮我指明方向的[柚柚子](https://github.com/ShaddockNH3)，虽然我没有写到10万字（~~bushi~~）\n\n感谢帮助我查缺补漏和模拟面试的[155](https://github.com/155TuT)，专家会诊真的很有用！\n\n感谢一直陪伴我备考的各位朋友，并且赞美一下神丽（~~大丽姐要求的~~）！\n\n~~感谢GPT老师，虽然我提蠢问题的时候你会骂我~~\n\n还有我自己（）\n\n——By Schariac125\n\n写于福州大学旗山校区"
      },
      {
        "key": "imported-3-7",
        "title": "资源",
        "markdown": "[Luogu](https://www.luogu.com.cn/)\n\n[力扣](https://leetcode.cn/)\n\n[OI-WIKI](https://oi-wiki.org/)\n\n[PTA](https://pintia.cn/home)\n\n[代码随想录](https://www.programmercarl.com/)\n\n[UUZ的博客](https://shaddocknh3.github.io/)\n\n[155的博客](https://155tut.github.io/)\n\n[Cai的博客](https://blog.terraria.ink)\n\n由于某些原因，这里不给出GPT和Gemini的网址。\n\n\n（~~真的没有了~~）"
      }
    ]
  },
  {
    "label": "2025 经验贴",
    "title": "2025 数媒 → 计算机类",
    "summary": "来自原经验文档的转专业备考、机试与复盘记录。",
    "sections": [
      {
        "key": "imported-4-0",
        "title": "前言",
        "markdown": "今天是拟录取结束的第一天 先说以下我(数媒转计算机)的成绩:机试第2+面试第1 总排名第一\n\n如果你时间紧迫 直接跳到最后\n\n(我从9月开学开始刷算法道12月初考试 在机考前我刷完了\n\nPTA乙级2408分 \n\nLeetCode  AC了100道题 (以 简单和中等题为主)\n\nPTA团体程序设计天梯赛928分 \n\nPTA其他简单题目集100分 \n\n给你做一个参考) \n\n我的经验贴超详细(适合小白 针对大二转)\n\n我转专业成功之前就决定 等一切尘埃落定 一定也要写一篇转专业经验贴 给学弟学妹避避坑\n\n\n第一我要先劝退你 转专业不是退路 计算机 早已今非昔比 就业竞争压力大 如果你没有强大的决心要转专业 那很可能你会失败+挂科 为什么这么说呢 因为从决定转专业开始 你不仅要学习计算机编程语言 深入的了解一些算法 还要保证不挂科 如果挂科了就没有资格报名了(并且一个人只有一次转专业机会 关注一下往年的转专业资格 可能有变动) 一旦转专业失败可能会对你的学业有双重打击 \n\n第二 转专业会耗费你大量的时间 你是否真的愿意每天待在自习室学习 是否愿意一点一点的啃下来难懂的算法 按照我的情况给你做指导 每天都要待在自习室里刷题 一天真的很累 如果你没有这样的决心 还是早点放弃吧 转专业失败会给你带来巨大的挫败感\n\n第三 算法不可能速成 需要一点一点的学习 沉淀 反思 总结 不可能考前速成 刚开始一道简单的“回文字符串判断”要卡2小时，提交10次才通过，挫败感会反复冲击你。如果只是“试试水” 不如把时间花在本专业 避免两边都落空 \n\nok 现在你下定决心要转计算机学院了 接下来一步一步跟着我的脚步 \n\n“学习计算机需要有一颗强大的内心 计算机没有黑魔法 一切都是人想出来的 别人能想出来 我也一定能想出来”\n   \t\t\t\t\t\t\t\t\t\t\t\t--------翁恺老师\n                          \n正式开始(有取舍的阅读 后附图片)"
      },
      {
        "key": "imported-4-1",
        "title": "一. 了解考试",
        "markdown": "1. 考察内容:  大二转计算机考的是程序设计 考察编程语言的数据结构与算法\n实话实说2025年考到了一道关于树的题目 但是难度较大 也没有人做出来 应该先把中心放在算法上 这些数据结构可以先放一放\n\n2. 考试难度:  难度接近PTA乙级\n\n3. 考试语言:  2025可以选择C++/C语言/Python/Java 考试没有自动补全 请在平常练习的时候不要使用自动补全 \n\n4. 考试题型分值:  2025年是8道题(800分) 一道题有一个或者多个测试点(一个测试点5~100分) 实时提交 可以无限次提交 提交的次数不会影响成绩 可以实时看到所有题目的通过率 \n\n5. 我作答情况(参考):  2025年AC(accept)了4道题 其余题目部分得分就已经是第二了 (最后一刻看到情况是这样的:有两道题通过人数为0(会有两三道超过PTA乙级难度是正常的 也没有人写出来) 一道题通过人数为5 一道题通过人数为1 其他题较多人通过) 所以在考试时不要慌 有两道特别难的不用担心 你做不出来 别人也是这样 不要影响自己 心态也时考察的一部分\n\n6. 提交界面:   2025年时直接在[PTA](https://pintia.cn/home)的界面上写代码 不能用DEVC++ (往年是可以用的)\n\n7. 考试注意:  不能中途退出PTA界面(你一旦退出或者打开了其他界面老师会收到报警) 有防作弊系统 不要忘记带学生证和身份证 会发草稿纸 笔自己带"
      },
      {
        "key": "imported-4-2",
        "title": "二. 小白怎么入门语言",
        "markdown": "编程语言推荐C++ 大部分人都会选择C++(C++兼容C语言 意思是C语言的语法再C++中都适用) 你可以先学C语言 再学C++ 但记住如果只会C语言是不行的 因为C++中的STL(Standard template library)是解题的关键 一定要学 不然很多题太耗时间了 你也会思路混乱 这个是重中之重\n\nC语言推荐 翁恺的C语言编程课 \n\nC++推荐黑马程序员的课程 b站都可以找到 \n\n数据结构与算法推荐浙江大学陈越教授的<数据结构与算法>\n\n接着你需要一个编写代码的工具[DEVC++](https://devcpp.gitee.io) 它是一个轻量化的代码编辑工具 安装时选默认配置即可 编写完代码ctrl+s保存 编译 运行 就在终端显示运行结果了 没有太多繁琐的功能 适合小白入门\n\n看完之后尝试写一些简单的算法实现 比如交换两个数 数组求最大值 当然这些是完全达不到考试难度的 继续学习吧 学习完C语言就可以写PTA乙级题了 大概感受一下"
      },
      {
        "key": "imported-4-3",
        "title": "三. C语言->C++->进阶算法",
        "markdown": "- 已经学会了C语言了 就开始C++的学习 面向对象的知识并不是首要 因为这几年都没有考 不过可以学有余力再去学习 \n重要的是C++的一些库函数 STL库的熟练应用string vector 二维数组(2025考到了一般难度 你应该做出来) stack queue multiset set unordered_set map unordered_map(2025考到了) deque…他们的增删改查 时间效率 空间效率 怎么用这些容器优化算法 这个非常重要 没有STL容器别想在20min做出来\n\n- 主要:迭代器 sort函数 结构体排序 自定义排序 模拟算法 简单的贪心算法 字符串处理 哈希表(只会使用就ok 当然深入学习最好) 进制转化 素数判断(2025的第一道题 很简单) 最大公因数 最小公倍数 简单递归(不常考) 图形打印 线性查找 栈stack的使用 队列queue的使用\n\n- 学有余力(拉开差距)：二分查找 双指针 滑动窗口 动态规划 贪心算法 dfs bfs 前缀和优化 差分优化代码(这些算法会让你打开新世界的大门 但是进度太慢就不要学了)  \n\n- 在写代码时注意：不要使用万能头文件 `#include<bits/stdc++.h>` 有时候PTA不能通过编译 这也是一个不好的习惯"
      },
      {
        "key": "imported-4-4",
        "title": "四. 小白栽坑",
        "markdown": "1. 禁止眼高手低.在学习语法的时候一定要上手写一写 不要好高骛远 觉得自己会了 语法不是靠背的 是要实战练习的 建议在学习过程中就开始刷题 基础不牢地动山摇\n\n2. 初期别怕“写得丑”.我第一次写“素数判断”用了30行代码，后来优化到10行，进步是靠一次次修改来的\n\n3. 重视编译错误：比如“忘记加分号”“数组越界”，这些基础错误在考试中会浪费大量时间，平时写代码就养成“写完先检查语法”的习惯"
      },
      {
        "key": "imported-4-5",
        "title": "五. PTA常见提示(问GPT都可以轻松找到总结 但是不要太依赖AI 毕竟考试只有自己 没有AI陪你)",
        "markdown": "### Compile Error (编译错误)\n语法错误，代码无法被编译器识别，比如少分号、头文件缺失、变量未定义\t\n\n1. 先检查是否漏写分号、大括号配对；\n\n2. 确认使用的容器/函数对应的头文件已包含（如用string需加#include<string>）\n\n3. 检查变量名是否拼写一致（比如“count”写成“cout”）\n\n### Runtime Error (运行时错误)\n代码能编译，但运行时崩溃，常见原因：数组越界、除以零、指针异常\n\n1. 数组操作时确认下标范围（比如数组大小为n，下标别超过n-1）\n\n2. 除法运算前判断分母是否为0；3. 避免使用未初始化的指针（转专业机试少用指针，用vector替代更安全）\n\n### Wrong Answer (答案错误)\n逻辑错误，输出结果与正确答案不符，是最常见的错误\n\n1. 检查测试用例是否考虑边界值（如n=0、n=1，输入为空）\n\n2. 确认变量类型是否匹配（比如用int存10^10的数，需改成long long）\n\n3. 浮点运算时用fabs(a-b)<1e-6替代直接比较a==b\n\n### Time Limit Exceeded (超时)\n代码运行时间过长，超过题目限制，多因算法效率低\n\n1. 用STL容器优化（比如用unordered_map替代map，查找效率更高）\n\n2. 避免多层嵌套循环（比如O(n²)的算法改成O(n)）\n\n3.  减少不必要的输入输出操作（用scanf/printf替代cin/cout会更快）\n\n### Memory Limit Exceeded (内存超限)\n代码占用内存过多，多因数组开太大或重复创建大量对象\n\n1. 数组按需开大小，避免固定开1e6以上的数组（用vector动态扩容）\n\n2. 重复使用变量，避免在循环内频繁创建大对象\n\n3. 及时释放无用的内存（C++中vector可通过clear()释放）\n\n### Presentation Error (格式错误)\n输出格式不符，比如多空格、少换行、大小写错误\n\n1. 严格按题目要求输出分隔符（比如“用空格分隔”别用逗号）\n\n2. 确认每行末尾是否有多余空格（可在输出最后一个元素后不输出空格）\n\n3. 题目要求大写输出时别写成小写（比如“YES”别写成“yes”）\n\n### Output Limit Exceeded (输出超限)\n输出内容过多，远超题目要求，多因循环逻辑错误\n\n1. 检查循环条件是否正确（比如把`i<n`写成`i<=n`导致多输出）\n\n2. 确认是否有多余的调试输出（比如测试时的cout<<\"test\"没删掉）\n\n### Non-Zero Exit Code (非零退出码)\n\n程序异常退出，多与运行时错误类似，常见于数组越界或栈溢出\n\n1. 重点检查递归深度（递归次数别超过1e4，否则栈溢出，改用迭代实现）\n\n2. 按“运行时错误”的解决办法排查，优先检查数组和循环逻辑"
      },
      {
        "key": "imported-4-6",
        "title": "六. 关于做题",
        "markdown": "1. PTA乙级题目并不是按照难度排序 可以先做自己会的题目 刚开始可能比较吃力 一道题要做好久提交好多次 这是正常的 因为我也这样过来的\n\n2. 如果太难就先做PTA上<团体程序天梯赛>的题目 但是还是要转到PTA乙级题目上 毕竟这个难度较小 没有达到考试难度\n\n3. (如果我提到的这些你都能学会 并且PTA乙级所有题目都刷完 几乎每一道题都能在15min做出来 leetcode刷了100+题目 那我可以很负责的告诉你 你大概率会是第一或者第二名 因为我就是这样刷题的)\n\n4. 如果你起步较晚 一定一定要把PTA乙级题目刷完一遍 总结归纳题型 多做总结 其实考点也就专门几种"
      },
      {
        "key": "imported-4-7",
        "title": "七. 学习的工具",
        "markdown": "CSDN这个上面有很多博主的总结 PTA的答案也有直接搜题号就可以找到 还有博客可以看看"
      },
      {
        "key": "imported-4-8",
        "title": "八. 转专业文件及时间线(以2025为例)",
        "markdown": "一定密切关注三个网站 10月份左右一定经常打开看一看 \n\n福州大学教务处\n\n福州大学计算机与大数据学院\n\n福州大学转专业交流网站\n\n[个人编号已隐藏]学校在教务处发布了<关于做好2025-2026学年转专业工作的通知> 上面会有详细的时间线 包括 转专业细则发布时间 转专业报名截止时间 大致转专业考试时间 拟录取时间…\n\n[个人编号已隐藏] 学校在教务处发布了<转专业实施细则> 包含考什么 计划录取人数 \n\n[个人编号已隐藏] 我在计算机学院三楼参加了机考\n\n[个人编号已隐藏] 计算机与大数据学院官网发布转专业面试名单(2025机试不及格不让进面试)\n\n[个人编号已隐藏] 我在计算机学院三楼参加面试\n\n[个人编号已隐藏] 学校发布了拟录取名单"
      },
      {
        "key": "imported-4-9",
        "title": "九. 面试(面试没有那么重要 发面试名单之后再准备面试不晚)",
        "markdown": "面试名单发布后的第二天面试 所以一定要关注学校官网通知和学校转专业群里的通知\n\n机试为王 只要机试考得高 面试老师就不会刁难 我面试第一的秘诀就是:机试考得高+面试随和开朗真诚 尽量不要说谎 真诚才是必杀技 其实你说谎了老师是可以知道的 \n\n下面是我详细的面试过程(整个过程很轻松自在 没有刁难):\n\n回顾一下下午2点的计算机转专业面试过程:\n\n（先吐槽 2点开始面试 我1点到了教室 老师让去机房候着 一会机房又有学生上课 我们又被赶到楼上 乱七八糟的 到四点才真正开始我的面试 啊啊啊 中间进错教室了 好尴尬）\n面试有五个老师坐在我面前（有个小插曲就是 我走错了教室了 还没有轮到我 我就进去了 后来又出来了 挺尴尬的 不过不影响 哈哈哈）\n\n正式开始:\n自我介绍一会\n我说了一下自己的转专业原因（一是兴趣爱好 二是职业规划算法工程师）\n\n：你是数字媒体技术是吧 这个专业和计算机的某些课程相似  \n……\n\n：你是大二转的，大一有报名吗  \n没有……\n\n：那你是大二上才学习的算法 那你很厉害了 机试考这么好  \n……吹了一会牛逼 说自己刷算法刷了好多 我稍微把算法数量抱高了一点（我应该是机试第二或者机试和另外一个并列第一）\n\n：你的算法是怎么学习的 具体讲讲过程  \n……（我讲了在哪里刷题 刷了多少题 可能是老师觉得我机试成绩很好 夸了我 我有一句话回复了他的夸奖 这句话是（没有天赋就好好努力 勤奋一点吧）这句话让老师对我刮目相看 他点点头 示意了我）\n\n：你们大二有什么课程是计算机相关的  \n高等数学 数据结构与算法 线性代数……\n\n：有没有什么要补充的  \n……（我又随便说了关于算法的学习）\n\n：平时有什么缓解压力的方式吗  \n……（讲了我的骑行经历）\n:  你是哪里人  \n河南的(我感觉老师好像真的没有什么要问的了)\n：还有什么要补充的吗  \n……（我怕说的不够 又说了自己学习算法的决心）\n\n：好 你同意结束面试吗  \n同意  \n（结束了 全程老师都很好 气氛也轻松 还鼓励我继续学算法 我就知道那个学长说的果然没错 机试为王 机试只要考的高 面试的老师不会刁难 这下稳了 已经踏进计算机学院的大门了 哈哈哈）"
      },
      {
        "key": "imported-4-10",
        "title": "十. 是否降转",
        "markdown": "建议降转,给自己一个缓冲的机会 如果平转了你很有可能会一个学期考20门课程 太累了 \n\n我选择降转的原因: 以后规划做算法工程师 想再空余的一年自己练习算法 参加ACM 毕竟自己也想有更多的课余时间 毕竟靠技术吃饭 参加一些竞赛 保研什么的"
      },
      {
        "key": "imported-4-11",
        "title": "十一. 如果你时间紧迫 先抓大头",
        "markdown": "-\tSTL容器：string（拼接、截取、查找）、vector（动态数组，增删改查）、map/unordered_map（统计频次，2025年考题）、stack/queue（模拟题常用）。重点记容器的常用函数，比如vector的push_back()、map的find()。\n\n-\t基础算法：素数判断（2025年第一题，简单）、最大公约数（辗转相除法）、最小公倍数（两数乘积/GCD）、进制转换（10转2/8/16，除基取余法）、字符串处理（回文判断、大小写转换）。\n\n-\t排序与查找：C++ sort()函数（必须会自定义排序规则，比如按字符串长度排、降序排）、线性查找（遍历数组/字符串）。\n\n-\t模拟题：这是乙级核心题型，比如“模拟排队”“日期计算”，重点是把题目规则拆成步骤，用循环和条件判断实现"
      },
      {
        "key": "imported-4-12",
        "title": "十二. 机试小技巧",
        "markdown": "1. 机考的时候有些题目 直接cout<<[];输出答案就可以得到部分测试点的分数(我就是这样干的)\n\n2. 尽量早点到考场 我进考场了之后发现我的电脑是紫屏 校园网也翻吃了好久 乱七八糟的 还好最后登录了 \n\n3. 开始作答之后页面弹出来小广告 我点了一下❌ 没想到直接跳转了 也是很无语了 最后老师来问我 她没有计较 反正就是做题的过程比较曲折吧 遇到这种情况直接找老师就行了"
      },
      {
        "key": "imported-4-13",
        "title": "十三. 结束的话",
        "markdown": "看到这里我想 你应该已有了强大的决心 转专业不是一件容易的事情 考前的一个月一定要刷题刷题刷题 就像高考冲刺一样 相信自己 总结归纳 CSDN上有很多 博主的总结 很容易找到 \n\n-\t转专业不是“逆袭” 是“选择自己真正想走的路”\n\n-\t请坚信：算法没有捷径，刷题就是王道；心态决定成败，别被难题吓倒\n\n-\t祝所有想转计算机的学弟学妹，都能得偿所愿！\n\none can walk for alone."
      }
    ]
  }
];
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
