// 权限验证相关
import { router, addRoutes } from '~/router'
import { getToken } from '~/composables/auth.js'
import { showFullLoading, hideFullLoading, toast } from '~/composables/util.js'
import store from '~/store/index.js'
import { useConfetti } from '~/composables/useConfetti.js'

const { playConfettiAnimation } = useConfetti()

// 全局前置守卫
let hasGetInfo = false // 处理点击一次菜单就会获取两次 getInfo 的问题
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

  let hasNewRoutes = false
  // 如果用户登录了，自动获取用户信息并存储在 vuex 中
  // 并且防止重复获取用户信息 getInfo，加快点击菜单的反应速度
  if (token && !hasGetInfo) {
    // 同为真才会走下面的逻辑，这里 !hasGetInfo 也可以换成 hasGetInfo === false
    let { menus } = await store.dispatch('getInfo')
    hasGetInfo = true
    // 动态添加路由
    hasNewRoutes = addRoutes(menus)
  }
  hasNewRoutes ? next(to.fullPath) : next()
})

// 全局后置守卫
router.afterEach((to, from) => {
  document.title = to.meta.title + '-商城后台管理系统'
  // 关闭全屏 loading
  hideFullLoading()

  // 只在页面刷新时触发烟花动画（页面刷新时from.name为undefined）
  // 页面刷新时from.name为undefined，触发烟花动画
  if (!from.name) playConfettiAnimation()

  /**
   * 第二种方法：<短路求值>
   * 1. from 是路由守卫提供的参数，表示用户从哪个路由来
   * 2. from.name 是来源路由的名称
   * 3. !from.name 判断是否没有来源路由名称
   *   页面刷新时：from.name 为 undefined，所以 !from.name 为 true，执行 playConfettiAnimation()
   *   正常导航时：from.name 有值，所以 !from.name 为 false，不执行 playConfettiAnimation()
   * 4. 短路求值：只有当 !from.name 为 true 时才会执行 playConfettiAnimation()
   * 5. 这样设计可以让烟花动画只在用户刷新页面时显示，而不是每次页面导航都显示，提供更好的用户体验。
   * !from.name && playConfettiAnimation()
   */
})
