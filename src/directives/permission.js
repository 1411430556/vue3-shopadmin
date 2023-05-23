import store from '~/store/index.js'

function hasPermission (value, el = false) {
  if (!Array.isArray(value)) {
    throw new Error(`需要配置权限，例如 v-permission="['getStatistics3,GET']"`)
  }
  /* 下面这个 store.state.ruleNames.includes(item) 返回值为 boolean ，
  如果是false的话 value.findIndex() 值就为 -1 ，那么 (-1 !== -1) 为 false；
  其它情况就是 true 了
  --而且value.findIndex()里面如果通过了测试函数其实返回值一直是0，因为是单独的三个数组，然后他们一个一个去比较的
   */
  const hasAuth = value.findIndex(item => store.state.ruleNames.includes(item)) !== -1
  // 下面这个逻辑就只有 hasAuth 为false的才走下去
  if (el && !hasAuth) {
    if (el.parentNode) {
      el.parentNode.removeChild(el)
    }
    // el.parentNode && el.parentNode.removeChild(el)  上面一个if判断可以用这个  短路运算
  }
  return hasAuth
}

export default {
  install (app) {
    app.directive('permission', {
      mounted (el, binding) {
        hasPermission(binding.value, el)
      },
    })
  },
}
