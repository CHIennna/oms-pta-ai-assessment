# 练习与作业

## 职责

展示练习入口和分组作业，包括五次专项作业、周练、天梯赛历年真题与赛事复刻。

## 代码位置

- `src/client/core/pta-clone.js`：`renderHomeworkCards`、`renderExamCenter`。
- `src/data/exams/fzu-practice-homework.js`：专项练习。
- `src/data/exams/gplt-homework-2024-2026.js`：2024—2026 天梯赛作业。
- 其他补充题库文件：周练、质检和赛事练习。

## 数据流

补充题库脚本向全局考试归档追加练习配置；前端按 `category`、`homeworkGroup`、年份和标题分组。进入练习后复用考试工作台，但练习不限时。

## 验证

检查每个练习卡片的题数和总分；打开第一题和最后一题；返回练习页后分组不能丢失。新增作业后运行 `npm test` 验证题号、测试点和跨试卷隔离。
