import { createApp } from 'vue'

import App from './App.vue'

import './style.css'

const app = createApp(App)

// import * as ElementPlus from 'element-plus'

// 获取所有组件 todo

// const elComponents = {}
// for (const key in ElementPlus) {
//   if (key.startsWith('El')) {
//     elComponents[key] = ElementPlus[key]
//   }
// }

// console.log(elComponents);


app.mount('#app')
