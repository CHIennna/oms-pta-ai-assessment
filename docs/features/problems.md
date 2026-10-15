# 题库与筛选

## 职责

汇总所有可公开题目，支持状态、难度和关键词筛选，并从题目行进入相应试卷的考试工作台。

## 代码位置

- `src/client/core/pta-clone.js`：`renderProblemDirectory` 及题目打开事件。
- `src/data/exams/`：题号、名称、难度、题面和所属试卷。
- `src/client/styles/pta-clone.css`、`pta-geometry.css`：筛选栏和表格布局。

## 数据规则

难度使用统一文本值：入门、普及-、普及、普及+/提高-、提高、提高+/省选-、省选/NOI-、NOI/NOI+/CTS、待定。关键词同时匹配题号、名称和已有标签。

## 验证

分别测试状态标签、每个难度、中文关键词和题号；点击结果后应打开正确试卷与题目，重置后恢复全部题目。
