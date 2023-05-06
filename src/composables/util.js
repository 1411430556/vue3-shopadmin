import { ElNotification } from 'element-plus'

// 消息提示 ElNotification 的封装
export function toast (message, type = 'success', dangerouslyUseHTMLString = true) {
  ElNotification({
    message,
    type,
    dangerouslyUseHTMLString,
    duration: 3000,
  })
}
