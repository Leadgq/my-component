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
          { text: 'Button', link: '/components/button' },
        ],
      },
    ],
    nav: [
      { text: 'Home', link: '/components/button' }
    ],
  },
})