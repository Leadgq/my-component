# 介绍

- 本组件库基于 Vue 3 和 Element Plus 实现，提供了一系列基础组件，用于快速构建 Vue 3 应用。
- 本组件所有的属性和方法和element-plus保持一致。
- 业务组件不同

## 使用方式

```ts
import { createApp } from 'vue'

import YoUi from "yo-pc-ui-component"
import { zhCn } from "yo-pc-ui-component"
import App from './App.vue'
import "yo-pc-ui-component/dist/style.css"


const app = createApp(App)

app.use(YoUi, {
    locale: zhCn
})
app.mount('#app')

```

## 多语言

- zhCn 中文
- en 英文
- ja 日文
- ko 韩文

```bash
目前只有这四个语言,新增语言在i18n中配置
```

```js
export {
  zhCn,
  en,
  ja,
  ko,
  // 新增语言
  // 例如:
  // fr 法语
} from 'element-plus/es/locales'
```
