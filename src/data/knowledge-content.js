'use strict';

window.OMS_KNOWLEDGE_ARTICLES = [
  {
    id: 'complexity-basics',
    title: '如何判断时间复杂度',
    category: '算法基础',
    level: '入门',
    minutes: 8,
    summary: '从数据规模反推可接受的复杂度，快速排除会超时的做法。',
    tags: ['复杂度', '数据规模', '估算'],
    updatedAt: '2026-11-03',
    featured: true,
    sections: [
      { title: '先看数据规模', paragraphs: ['复杂度不是只看循环层数，而是看输入规模 n 增大时，基本操作次数如何增长。', '竞赛中可用每秒约 10^7 到 10^8 次简单操作做粗略估算，再结合语言、常数和时间限制留出余量。'] },
      { title: '常见数量级', bullets: ['n 不超过 20：可考虑状态压缩或指数级搜索。', 'n 约为 10^3：O(n²) 通常可行。', 'n 约为 10^5：优先考虑 O(n log n) 或 O(n)。', 'n 约为 10^7：通常需要接近 O(n) 的做法。'] },
      { title: '一个判断例子', paragraphs: ['如果 n=200000，两层完整循环约需 4×10^10 次操作，必然不合适；排序后线性扫描约为 O(n log n)，是更合理的方向。'] }
    ]
  },
  {
    id: 'prefix-sum',
    title: '前缀和：把区间查询降到 O(1)',
    category: '基础数据结构',
    level: '入门',
    minutes: 10,
    summary: '掌握一维前缀和的定义、下标设计和左端点边界处理。',
    tags: ['前缀和', '区间查询', '下标'],
    updatedAt: '2026-11-03',
    featured: true,
    sections: [
      { title: '核心定义', paragraphs: ['令 prefix[i] 表示前 i 个数的和，并设 prefix[0]=0。那么闭区间 [l,r] 的和为 prefix[r+1]-prefix[l]。', '把前缀和定义成“前 i 个”而不是“到 i 为止”，可以让左端点为 0 时不需要特判。'] },
      { title: '模板', code: 'vector<long long> prefix(n + 1, 0);\nfor (int i = 0; i < n; ++i) {\n    prefix[i + 1] = prefix[i] + a[i];\n}\nlong long sum = prefix[r + 1] - prefix[l];' },
      { title: '常见错误', bullets: ['prefix 应使用 long long，避免多个 int 累加溢出。', '先统一题目的下标是从 0 还是从 1 开始。', '二维前缀和需要容斥，不能直接照搬一维公式。'] }
    ]
  },
  {
    id: 'binary-search-boundary',
    title: '二分查找的边界写法',
    category: '算法基础',
    level: '普及',
    minutes: 12,
    summary: '用“找第一个满足条件的位置”统一 lower_bound 类问题。',
    tags: ['二分', '边界', '单调性'],
    updatedAt: '2026-11-02',
    featured: false,
    sections: [
      { title: '二分的前提', paragraphs: ['不一定要有一个已排序数组，但判定条件必须具有单调性：答案区间能分成连续的不满足区和满足区。'] },
      { title: '左闭右开模板', code: 'int left = 0, right = n;\nwhile (left < right) {\n    int mid = left + (right - left) / 2;\n    if (check(mid)) right = mid;\n    else left = mid + 1;\n}\n// left 是第一个满足 check 的位置' },
      { title: '自检问题', bullets: ['循环中维护的区间是什么？', 'check(mid) 为真时，答案应该留在左边还是右边？', '如果没有任何位置满足条件，返回值应该是什么？'] }
    ]
  },
  {
    id: 'bfs-shortest-path',
    title: 'BFS 为什么能求无权最短路',
    category: '图论',
    level: '普及',
    minutes: 11,
    summary: '从队列的分层扩展理解 BFS，并掌握 visited 的正确标记时机。',
    tags: ['BFS', '最短路', '队列'],
    updatedAt: '2026-10-31',
    featured: false,
    sections: [
      { title: '分层扩展', paragraphs: ['BFS 按照与起点的边数从小到大处理顶点。一个顶点第一次入队时得到的距离，就是起点到它的最少边数。'] },
      { title: '标记时机', paragraphs: ['顶点应在入队时立即标记已访问，而不是出队时再标记。否则同一顶点可能被多个前驱重复加入队列。'] },
      { title: '适用范围', bullets: ['每条边代价相同的图。', '网格中每步代价相同的最少步数。', '边权不同时应根据边权选择 0-1 BFS 或 Dijkstra。'] }
    ]
  },
  {
    id: 'dp-state-design',
    title: '动态规划的状态设计',
    category: '动态规划',
    level: '提高',
    minutes: 15,
    summary: '用“状态表示什么”和“最后一步是什么”推导转移方程。',
    tags: ['DP', '状态', '转移'],
    updatedAt: '2026-10-30',
    featured: false,
    sections: [
      { title: '先用一句话定义状态', paragraphs: ['例如“dp[i] 表示处理完前 i 个元素时的最优值”。如果无法用完整句子说清下标和值的含义，转移很容易写乱。'] },
      { title: '从最后一步推转移', paragraphs: ['考虑到达当前状态前的最后一次决策。枚举这次决策的可能性，将当前问题连接到已经解决的更小状态。'] },
      { title: '检查清单', bullets: ['初始状态是否和定义一致？', '转移依赖的状态是否已经计算？', '不可达状态是否使用了安全的哨兵值？', '答案是某个状态，还是一组状态的最优值？'] }
    ]
  }
];
