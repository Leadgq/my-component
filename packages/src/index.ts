import type { App } from 'vue'


import MyButton from './components/button/button.vue'
import MyInput from './components/input/input.vue'


import './components/style/index.scss'
import "./core"

const components = {
  MyButton,
  MyInput,
} as const


export { MyButton, MyInput }
export * from './core' 

export * from './components/button/button.ts'
export * from './components/input/input.ts'

export default {
  install(app: App) {
    Object.entries(components).forEach(([name, component]) => {
      app.component(name, component)
    })
  },
}

// ============ 导出组件列表（用于文档生成） ============
export const componentList = Object.keys(components)