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

```main.ts
import { createApp } from 'vue'
import App from './App.vue'
import YoComponentLibrary from 'yo-component-library'
import 'yo-component-library/dist/style.css'

const app = createApp(App)
app.use(YoComponentLibrary)
app.mount('#app')
```