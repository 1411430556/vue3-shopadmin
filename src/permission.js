// 权限验证相关
import router from '~/router'
import { getToken } from '~/composables/auth.js'
import { showFullLoading, hideFullLoading, toast } from '~/composables/util.js'
import store from '~/store/index.js'

// 全局前置守卫
router.beforeEach(async (to, from, next) => {
  // 显示全屏 loading
  showFullLoading()
  const token = getToken()
  //没有登录，强制跳转回登录页
  if (!token && to.path !== '/login') {
    toast('请先登录！', 'error')
    return next({ path: '/login' })
  }
  // 防止重复登陆
  if (token && to.path === '/login') {
    toast('请勿重复登录！', 'error')
    return next({ path: from.path ? from.path : '/' })
  }

  // 如果用户登录了，自动获取用户信息并存储在 vuex 中
  if (token) {
    await store.dispatch('getInfo')
  }

  next()
})

// 全局后置守卫
router.afterEach((to) => {
  document.title = to.meta.title + '-商城后台管理系统'
  // 关闭全屏 loading
  hideFullLoading()
})
