import { createApp } from 'vue'
// import './style.css'
import App from './App.vue'
// 引入Element-plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { router } from './router'
import store from './store'
// 引入全局图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
// 全局注册图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(ElementPlus)
// 将 store 实例作为插件安装
app.use(store)
// 路由
app.use(router)
// windicss插件配置
import 'virtual:windi.css'
import './permission.js'
// 全局 loading 进度条
import 'nprogress/nprogress.css'

app.mount('#app')
