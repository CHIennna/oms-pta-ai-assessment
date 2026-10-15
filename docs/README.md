# OMS 功能文档索引

本目录说明现有代码的职责边界。先阅读 [整体架构](architecture.md)，再按功能进入对应文档。

| 功能区 | 文档 | 主要代码 |
| --- | --- | --- |
| 门户、路由与布局 | [portal-layout.md](features/portal-layout.md) | `index.html`、`src/client/core/` |
| 题库与筛选 | [problems.md](features/problems.md) | `renderProblemDirectory` |
| 练习与作业 | [practice.md](features/practice.md) | `renderHomeworkCards`、练习题库数据 |
| 考试工作台 | [exams.md](features/exams.md) | `activateExam`、`render`、`route` |
| 运行与评测 | [judge.md](features/judge.md) | `src/client/judge/`、`src/server/judge/` |
| 提交记录与成绩 | [results.md](features/results.md) | `renderSubmissions`、`renderScoreboard` |
| 题解 | [solutions.md](features/solutions.md) | `renderSolutions`、题库 `solution` 字段 |
| 备考与外部题单 | [study.md](features/study.md) | 代码随想录、PAT 乙级、关键题目 |
| 登录与个人资料 | [account.md](features/account.md) | `src/server/auth/`、账号交互脚本 |
| 管理与导入 | [admin.md](features/admin.md) | 管理页、Markdown 导入 |
| 题库数据与测试库 | [data.md](features/data.md) | `src/data/exams/`、四个测试 ZIP |

每次改动至少检查相关功能文档中的“验证”部分。若一个改动跨越两个功能区，应同时更新两份文档。
