import axios from '~/axios'

/**
 * @description 获取系统设置
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function getSysconfig () {
  return axios.get(`/admin/sysconfig`)
}

/**
 * @description 修改系统设置
 * @param data
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function setSysconfig (data) {
  return axios.post(`/admin/sysconfig`, data)
}

/**
 * @description 上传文件
 * @type {string}
 */
export const  uploadAction = import.meta.env.VITE_APP_BASE_API + '/admin/sysconfig/upload'
