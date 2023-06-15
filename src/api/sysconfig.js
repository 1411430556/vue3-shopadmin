import axios from '~/axios'

// 获取系统设置
export function getSysconfig () {
  return axios.get(`/admin/sysconfig`)
}

// 修改系统设置
export function setSysconfig (data) {
  return axios.post(`/admin/sysconfig`, data)
}

// 上传文件
export const uploadAction = import.meta.env.VITE_APP_BASE_API +
  '/admin/sysconfig/upload'
