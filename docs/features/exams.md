# 考试工作台

## 职责

负责考试信息、题目导航、题面、编辑器、倒计时、上一题/下一题、草稿恢复和考试结束限制。

## 代码位置

- `src/client/core/pta-clone.js`：`activateExam`、`updateCountdown`、`render`、`renderExamInfo`、`route`。
- `src/client/editor/`：代码编辑器。
- `src/client/core/pta-geometry.js`：题面和代码区比例。
- `src/data/exams/`：考试时间、题目、分值和公开样例。

## 状态与存储

草稿和已提交代码按试卷版本与题号分开保存在 `localStorage`。正式考试开始前和结束后，客户端禁用运行/提交；服务端 `assertExamOpen` 会再次校验，客户端状态不能绕过该限制。

## 验证

检查考试前、进行中、结束后和练习四种状态；切换题目后草稿应恢复；题面、代码区、测试用例和提交栏在不同窗口尺寸下都可访问。
