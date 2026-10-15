# 整体架构

## 启动链路

1. `npm start` 先运行 `validate-exam-data.js`，确认题库和测试点完整。
2. `server.js` 加载账号、题库、本地评测机，并建立静态文件白名单。
3. 浏览器加载 `index.html`，依次载入题库数据、主界面、账号交互、编辑器和评测脚本。
4. 用户运行或提交代码时，浏览器调用 `/api/judge`；服务端使用正式测试点评测并保存最佳成绩。

## 目录边界

- `src/client/core/` 负责页面状态和交互，不保存正式测试答案。
- `src/client/editor/` 只负责代码编辑器，不决定考试状态或成绩。
- `src/client/judge/` 负责浏览器端评测请求与显示；最终成绩由服务端决定。
- `src/data/exams/` 保存公开题面、考试配置和测试库索引。
- ZIP 测试库保留在项目根目录，由 `server.js` 按题目配置读取。
- `src/server/auth/` 和 `src/server/judge/` 保存认证与评测实现；根目录 `server.js` 保持为稳定启动入口。
- `src/client/admin/` 和 `src/client/legacy/` 不在当前主页面加载链中，修改前要先确认兼容用途。

## 当前兼容边界

`src/client/core/pta-clone.js` 仍是共享状态较多的主文件。它已经在目录上归入核心层，但尚未拆成 ES 模块。后续拆分必须保持脚本加载顺序、全局变量可见性、路由启动时机和测试中的源码片段定位。

## 修改规则

- 新功能优先放入对应功能目录，不再把独立逻辑追加到根目录。
- 新增浏览器资源时，同步更新 `index.html` 和 `server.js` 的 `publicFiles`。
- 新增题库时放入 `src/data/exams/`，并加入 `validate-exam-data.js` 的补充题库列表。
- 正式测试点不得发送到浏览器；浏览器只提交代码、语言、题号和试卷标识。
- 完成修改后运行 `npm test`，涉及页面布局时还需在本地服务中实际刷新验证。
