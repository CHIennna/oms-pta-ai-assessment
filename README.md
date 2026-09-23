# OMS × PTA 智能程序评测原型

直接双击 `index.html` 即可预览。页面包含 OMS 考生顶栏、PTA 风格的题目导航和代码工作区、教师考试管理页，以及创建/参加考试的交互。

## 接入 ChatGPT 评测

点击“提交本题作答”时，前端会向同源后端的 `POST /api/ai-evaluate` 发送如下内容：`problemId`、`language`、`code`。后端应安全保存 OpenAI API 密钥，并返回：

```json
{ "status": "success", "title": "AI 评测通过 · 20 / 20", "feedback": "针对代码的具体建议" }
```

原型未配置后端时会自动使用本地演示评测，因此可直接体验交互。请勿把 OpenAI API 密钥放到浏览器端或提交到代码仓库。
