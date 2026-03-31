import DefaultTheme from 'vitepress/theme'

export default {
  extends: DefaultTheme,
  async enhanceApp({ app }) {
    // ⭐ 只在浏览器环境执行
    if (typeof window !== 'undefined') {
      const { ID_INJECTION_KEY, ZINDEX_INJECTION_KEY } = await import('element-plus')

      // 修复 SSR 构建时 Element Plus 需要的注入 key
      app.provide(ID_INJECTION_KEY, {
        prefix: Math.floor(Math.random() * 10000),
        current: 0,
      })
      app.provide(ZINDEX_INJECTION_KEY, { current: 0 })
    }

    // 为 SSR 提供假的 $http 拦截，防止抛出 undefined 错误
    if (typeof window !== 'undefined' && !app.config.globalProperties.$http) {
      app.config.globalProperties.$http = {
        get: () => Promise.resolve([]),
        post: () => Promise.resolve([]),
      }
    }
    if (typeof window !== 'undefined') {
      // 使用自己的包
      const module = await import("../../../packages/dist/index");
      app.use(module.default)
    }
  },
}