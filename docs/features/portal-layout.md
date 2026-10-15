# 门户、路由与布局

## 职责

提供 OMS 顶栏、福州大学门户侧栏、首页、页面路由、主题、缩放、全屏和考试工作区尺寸调整。

## 代码位置

- `index.html`：固定页面骨架和浏览器资源加载顺序。
- `src/client/core/pta-clone.js`：`renderPortalHome`、`renderFzuOjHome`、`renderPtaHome`、`route`。
- `src/client/core/pta-clone-interactions.js`：主题、账号菜单和个人资料交互。
- `src/client/core/pta-geometry.js`：侧栏、移动布局和题面/代码区拖拽尺寸。
- `src/client/styles/`：门户、主题、图标和响应式布局样式。

## 状态与存储

路由使用地址栏 Hash；主题、页面缩放和工作区分栏比例保存在 `localStorage`。移动端切换布局时应停止桌面拖拽逻辑。

## 验证

启动本地服务后依次打开首页、题目、练习、考试、评测和备考；切换浅色/深色、缩放窗口，并拖动考试工作区分隔条。底部测试与提交区域必须始终可达。
