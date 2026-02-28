import DefaultTheme from 'vitepress/theme'
import { watch } from 'vue'
import { useData } from 'vitepress'

export default {
  extends: DefaultTheme,
  setup() {
    // 获取当前主题状态
    const { isDark } = useData()

    // 监听 isDark 变化，更新 html 的 class
    watch(isDark, (val) => {
      if (val) {
        // 暗色模式：移除 theme-light，保留原有 dark 类（VitePress 默认会添加 dark）
        document.documentElement.classList.remove('theme-light')
        document.documentElement.classList.add('theme-dark')
      } else {
        // 亮色模式：移除 theme-dark，保留原有 light 类（VitePress 默认会添加 light）
        document.documentElement.classList.remove('theme-dark')
        document.documentElement.classList.add('theme-light')
      }
    }, { immediate: true }) // immediate 确保初始加载时正确设置
  }
}