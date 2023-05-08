import { createStore } from 'vuex'
import { login, getInfo } from '~/api/manager'
import { setToken } from '~/composables/auth.js'

// 创建一个新的 store 实例
const store = createStore({
  state () {
    return {
      // 用户信息
      user: {},
    }
  },
  mutations: {
    // 记录用户实例
    SET_USERINFO (state, value) {
      state.user = value
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
          resolve(res)
        }).catch(err => reject(err))
      })
    },
  },
})

export default store
