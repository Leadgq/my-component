import type { App } from 'vue'


import MyButton from './src/button/button.vue'


import './src/style/index.scss'


const components = {
  MyButton,
} as const


export { MyButton }


export * from './src/button/button.ts'

export default {
  install(app: App) {
    Object.entries(components).forEach(([name, component]) => {
      app.component(name, component)
    })
  },
}

// ============ 导出组件列表（用于文档生成） ============
export const componentList = Object.keys(components)