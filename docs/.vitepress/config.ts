import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'My Component Library',
  description: 'Vue 3 Component Library based on Element Plus',
  
  base: '/my-component/',
  
  themeConfig: {
    sidebar: [
      {
        text: 'Components',
        items: [
          { text: '按钮', link: '/components/button' },
          { text: '输入框', link: '/components/input' },
          { text: '图标', link: '/components/icon' },
        ],
      },
    ],
    nav: [
      { text: 'Home', link: '/components/button' }
    ],
  },
})