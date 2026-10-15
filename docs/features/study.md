# 备考与外部题单

## 职责

提供知识讲解、错题集、关键题目和经验帖；知识讲解内嵌代码随想录，关键题目可在 OMS 框架中查看 PAT 乙级等内容。

## 代码位置

- `src/client/core/pta-clone.js`：`renderStudyAdvice`、`renderKnowledgeReader`、`setupKnowledgeReader`、`renderKeyQuestionLinks`、PAT 查看器。
- `server.js`：`/api/learning/carl`、`/api/learning/pat-basic` 及公开内容缓存。
- `carl-reader.test.js`：外链白名单、内容清理和阅读器回归测试。

## 安全边界

服务端只允许代码随想录公开页面和固定 PAT 乙级题库，不代理任意主机，不转发用户凭据。外部页面无法嵌入时应显示站内错误提示和原文链接。

## 验证

打开讲解首页、专题文章、文章内力扣链接、PAT 列表和 PAT 题面；检查加载失败、返回讲解和打开原文按钮。
