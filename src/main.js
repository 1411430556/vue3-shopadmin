import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'
import store from './store'
// 引入全局图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
// 全局注册图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
// app.use(ElementPlus)
// 将 store 实例作为插件安装
app.use(store)
// 路由
app.use(router)
// windicss插件配置
import 'virtual:windi.css'
import './permission.js'
// 全局 loading 进度条
import 'nprogress/nprogress.css'

// 自定义指令
import permission from '~/directives/permission.js'
app.use(permission)

app.mount('#app')
