import { createApp } from 'vue'
import YoUi from "../../packages/dist/index.js"
// import YoUi from "../../packages/src/index.js"
import { zhCn } from "../../packages/dist/locale.js"
import App from './App.vue'
import "../../packages/dist/style.css"


const app = createApp(App)

app.use(YoUi, {
    locale: zhCn
})
app.mount('#app')
