# 提交记录与成绩

## 职责

显示个人提交记录、每题最佳成绩和比赛成绩表，并在提交后刷新当前状态。

## 代码位置

- `src/client/core/pta-clone.js`：`renderSubmissions`、`renderScoreboard`、`scoreForQuestion`、持久化进度同步。
- `server.js`：`recordSubmission`、`progressFor`、`/api/progress`。
- `src/client/judge/judge-score.js`：单次提交计分。

## 数据规则

服务端只提高最佳成绩，不因后续较差提交降低分数。提交历史限制为每个用户、每套试卷最近 500 条。前端的本地状态仅用于即时显示，以服务端进度为准。

## 验证

依次提交错误、部分正确和正确答案，检查最佳分不倒退；重新登录或刷新后成绩与提交记录应恢复。
