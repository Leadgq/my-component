import { App } from 'vue'
import * as ElementPlus from 'element-plus'

/**
 * 批量注册 Element Plus 组件并修改名称
 * @param app Vue 应用实例
 * @param prefix 自定义前缀，默认为 'My'
 */
export function registerCustomComponents(app: App, prefix: string = 'My') {
  // 筛选并注册组件
  for (const key in ElementPlus) {
    if (key.startsWith('El') && typeof ElementPlus[key] === 'object') {
      const newName = prefix + key.substring(2)
      app.component(newName, ElementPlus[key])
    }
  }
}