import { createApp } from 'vue'
import YoUi from "../../packages/dist/index.es.js"
import App from './App.vue'
import "../../packages/dist/style.css"
// import './style.css'

const app = createApp(App)

app.use(YoUi)

app.mount('#app')
