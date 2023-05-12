import { createStore } from 'vuex'
import { login, getInfo } from '~/api/manager'
import { setToken, removeToken } from '~/composables/auth.js'

// 创建一个新的 store 实例
const store = createStore({
  state () {
    return {
      // 用户信息
      user: {},
      // 侧边栏状态
      isCollapse: false,
      menus: [],
      ruleNames: [],
    }
  },
  mutations: {
    // 记录用户实例
    SET_USERINFO (state, value) {
      state.user = value
    },
    // 控制展开和缩起侧边栏
    HANDLE_ASIDE (state) {
      state.isCollapse = !state.isCollapse
    },
    SET_MENUS (state, value) {
      state.menus = value
    },
    SET_RULENAMES (state, value) {
      state.ruleNames = value
    },
  },
  actions: {
    // 登录
    login (context, value) {
      return new Promise((resolve, reject) => {
        login(value.username, value.password).then(res => {
          setToken(res.token)
          resolve(res)
        }).catch(err => reject(err))
      })
    },
    // 获取当前登录用户信息
    getInfo (context) {
      return new Promise((resolve, reject) => {
        getInfo().then(res => {
          context.commit('SET_USERINFO', res)
          context.commit('SET_MENUS', res.menus)
          context.commit('SET_RULENAMES', res.ruleNames)
          resolve(res)
        }).catch(err => reject(err))
      })
    },
    // 退出登录
    logout (context) {
      // 移除 cookie 里的token
      removeToken()
      // 清除当前用户状态 vuex
      context.commit('SET_USERINFO', {})
    },
  },
})

export default store
