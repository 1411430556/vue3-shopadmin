import { createApp } from 'vue'
// import './style.css'
import App from './App.vue'
// 引入Element-plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router'
// 引入全局图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
// 全局图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.use(ElementPlus)
// 路由
app.use(router)
// windicss插件配置
import 'virtual:windi.css'

app.mount('#app')
