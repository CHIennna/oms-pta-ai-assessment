# 题库数据与测试库

## 职责

保存考试元数据、题面、公开样例、题解、难度、正式测试点索引和练习分组。

## 代码位置

- `src/data/exams/exam-data.js`：主考试数据。
- `src/data/exams/zixun-contest-data.js`：转专业与历史比赛补充数据。
- `src/data/exams/weekly-practice-2.js`：第二次周练。
- `src/data/exams/fuzhou-quality-check-20261018.js`：福州质检。
- `src/data/exams/shenzhuo-round3-20260920.js`：神桌杯 Round 3。
- `src/data/exams/gplt-homework-2024-2026.js`：天梯赛三年作业。
- `src/data/exams/fzu-practice-homework.js`：专项练习。
- 根目录四个 ZIP：按 `testArchive` 配置提供正式测试输入输出。
- `validate-exam-data.js`：统一完整性校验。

## 约束

`examVersion + problemId` 必须能唯一定位正式测试。补充题库可复用测试前缀，但不得让同一试卷中的题号冲突。明确缺少资料的历史题使用 `judgeable: false` 和原因说明。

## 验证

运行 `npm test`，确认试卷数、可评测题数和测试点总数符合预期。修改 ZIP 或 `testArchive` 后还要核对每个 `.in/.out` 对是否存在且可读取。
