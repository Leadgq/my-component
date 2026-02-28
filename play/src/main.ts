import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import App from './App.vue'

import 'element-plus/dist/index.css' // 导入 Element Plus 样式
import '../../packages/src/components/style/index.scss' // 导入自定义组件样式

const app = createApp(App)

app.use(ElementPlus)

app.mount('#app')
