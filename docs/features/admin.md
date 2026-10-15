# 管理与导入

## 职责

维护考试基本信息、题目配置和 Markdown 题目导入。当前项目同时保留旧独立管理脚本和主界面内的管理逻辑。

## 代码位置

- `src/client/admin/admin.js`、`admin.css`：旧独立管理页逻辑和样式。
- `src/client/admin/markdown-import.js`：旧 Markdown 导入辅助逻辑。
- `src/client/core/pta-clone.js`：`renderSettings`、`parseMd`、`importNumberedQuestions` 等当前主界面管理逻辑。
- `generate-exam-data.js`：把规范 Markdown 转换为题库脚本。

## 维护提示

旧独立管理文件当前不在 `index.html` 的活动加载链中，修改前先确认是否仍有独立页面使用。正式题库导入后必须运行校验，不要只依赖浏览器本地配置。

## 验证

导入包含样例和多个测试点的 Markdown；核对题号、分数、测试数量和生成文件；运行 `npm test`。
