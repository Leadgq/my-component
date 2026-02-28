import type { App } from 'vue'


import MyButton from './src/button/button.vue'
import MyInput from './src/input/input.vue'


import './src/style/index.scss'


const components = {
  MyButton,
  MyInput,
} as const


export { MyButton, MyInput }


export * from './src/button/button.ts'
export * from './src/input/input.ts'

export default {
  install(app: App) {
    Object.entries(components).forEach(([name, component]) => {
      app.component(name, component)
    })
  },
}

// ============ 导出组件列表（用于文档生成） ============
export const componentList = Object.keys(components)