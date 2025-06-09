import nprogress from 'nprogress'

// 消息提示 ElNotification 的封装
/**
 * 消息提示函数，封装了 Element Plus 的 ElNotification 组件
 * @param {string} message - 要显示的消息内容
 * @param {string} type - 消息类型，可选值：success、warning、info、error，默认为 success
 * @param {boolean} dangerouslyUseHTMLString - 是否将 message 属性作为 HTML 片段处理，默认为 true
 *
 * 该函数会显示一个消息通知，持续时间为 3 秒钟
 * 注意：ElNotification 来自 Element Plus UI 库，在这个项目中通过 Vite 插件自动导入，用于显示通知消息
 */
export function toast(message, type = 'success', dangerouslyUseHTMLString = true) {
  ElNotification({
    message,
    type,
    dangerouslyUseHTMLString,
    duration: 3000,
  })
}

// 弹框提示 ElMessageBox 的封装
export function showModal(content = '提示内容', type = 'warning', title = '') {
  return ElMessageBox.confirm(content, title, {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type,
  })
}

// 弹出输入框
export function showPrompt(tip, value = '') {
  return ElMessageBox.prompt(tip, '', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    // 输入框的初始文本
    inputValue: value,
  })
}

// 显示全屏 loading
export function showFullLoading() {
  nprogress.start()
}

// 隐藏全屏 loading
export function hideFullLoading() {
  nprogress.done()
}

// 将query对象转成url参数
export function queryParams(query) {
  let q = []
  for (const key in query) {
    if (query[key]) {
      q.push(`${key}=${encodeURIComponent(query[key])}`)
    }
  }
  let r = q.join('&')
  r = r ? '?' + r : ''
  return r
}

// 商品规格上移方法
export function useArrayMoveUp(arr, index) {
  swapArray(arr, index, index - 1)
}

// 商品规格下移方法
export function useArrayMoveDown(arr, index) {
  swapArray(arr, index, index + 1)
}

// index1:调换之前的位置，index2:调换之后的位置
function swapArray(arr, index1, index2) {
  arr[index1] = arr.splice(index2, 1, arr[index1])[0]
  return arr
}

// sku排列算法
export function cartesianProductOf() {
  return Array.prototype.reduce.call(
    arguments,
    function (a, b) {
      var ret = []
      a.forEach(function (a) {
        b.forEach(function (b) {
          ret.push(a.concat([b]))
        })
      })
      return ret
    },
    [[]],
  )
}