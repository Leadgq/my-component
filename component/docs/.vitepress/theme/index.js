import DefaultTheme from 'vitepress/theme'
import { ID_INJECTION_KEY } from 'element-plus'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.provide(ID_INJECTION_KEY, {
      prefix: Math.floor(Math.random() * 10000),
      current: 0,
    })
  },
}
