import { createRouter, createWebHashHistory } from 'vue-router'

import Index from '~/pages/Index.vue'
import NotFound from '~/pages/404.vue'
import Login from '~/pages/Login.vue'
import Admin from '~/layouts/admin.vue'

const routes = [
  {
    path: '/',
    component: Admin,
    // 子路由
    children: [
      {
        path: '/',
        component: Index,
        meta: {
          title: '后台首页',
        },
      }],
  },
  {
    path: '/login',
    component: Login,
    meta: {
      title: '请登录',
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
  },
]
const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
