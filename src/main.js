import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as icons from '@element-plus/icons' 
import router from './router'
import App from './App.vue'
const app = createApp(App)
Object.keys(icons).forEach(key => {
    app.component(key, icons[key])
})
app.use(ElementPlus)
app.use(router)
app.mount('#app')
