import DefaultTheme from 'vitepress/theme'
import { ID_INJECTION_KEY, ZINDEX_INJECTION_KEY } from "element-plus"

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // 修复 SSR 构建时 Element Plus 需要的注入 key
    app.provide(ID_INJECTION_KEY, {
      prefix: Math.floor(Math.random() * 10000),
      current: 0,
    })
    app.provide(ZINDEX_INJECTION_KEY, { current: 0 })

    // 为 SSR 提供假的 $http 拦截，防止抛出 undefined 错误
    if (!app.config.globalProperties.$http) {
      app.config.globalProperties.$http = {
        get: () => Promise.resolve([]),
        post: () => Promise.resolve([]),
      }
    }
  },
}

