import { ElNotification, ElMessageBox } from 'element-plus'
import nprogress from 'nprogress'

// 消息提示 ElNotification 的封装
export function toast (
  message, type = 'success', dangerouslyUseHTMLString = true) {
  ElNotification({
    message,
    type,
    dangerouslyUseHTMLString,
    duration: 3000,
  })
}

// 弹框提示 ElMessageBox 的封装
export function showModal (content = '提示内容', type = 'warning', title = '') {
  return ElMessageBox.confirm(
    content,
    title,
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type,
    },
  )
}

// 弹出输入框
export function showPrompt (tip, value = '') {
  return ElMessageBox.prompt(tip, '', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    // 输入框的初始文本
    inputValue: value,
  })
}

// 显示全屏 loading
export function showFullLoading () {
  nprogress.start()
}

// 隐藏全屏 loading
export function hideFullLoading () {
  nprogress.done()
}

