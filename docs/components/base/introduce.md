# 介绍

- 本组件库基于 Vue 3 和 Element Plus 实现，提供了一系列基础组件，用于快速构建 Vue 3 应用。
- 本组件所有的属性和方法和element-plus保持一致。
- 业务组件不同

## 使用方式

```bash
npm install yo-component-library
pnpm add yo-component-library
yarn add yo-component-library
```

```ts
import { createApp } from "vue";
import App from "./App.vue";
// 当前包的样式需要手动引入
import YoComponentLibrary from "yo-component-library";
// 上述的导入可以不要,因为包内部已经做了自动注册
import "yo-component-library/dist/style.css";
// 但是建议引入
const app = createApp(App);
app.use(YoComponentLibrary);
app.mount("#app");
```
