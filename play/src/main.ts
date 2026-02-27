import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import MyComponentLibrary from '../../packages/components'
import '../../packages/components/src/style/index.scss'
import App from './App.vue'

const app = createApp(App)

app.use(ElementPlus)
app.use(MyComponentLibrary)
app.mount('#app')
