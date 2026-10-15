# 题解

## 职责

考试结束后在侧边栏开放题解页，按题目显示题解正文或“题解暂未发布”。

## 代码位置

- `src/client/core/pta-clone.js`：`examHasEnded`、`syncSolutionNavigation`、`renderSolutions`。
- `src/data/exams/`：各题的 `solution` 内容。
- 主界面的 Markdown 与代码高亮函数：渲染公式、代码块和横向滚动。

## 显示规则

未结束考试隐藏题解入口；练习或历史试卷按配置状态显示。题解代码块必须保留语法高亮和水平滚动，不能把长代码强制折行。

## 验证

分别打开进行中与已结束试卷；检查有题解、无题解、长代码和包含数学公式的题解。
