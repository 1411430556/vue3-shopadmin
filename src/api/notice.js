import axios from '~/axios.js'

/**
 * @description 获取公告列表数据
 * @param page
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function getNoticeList (page) {
  return axios.get(`/admin/notice/${page}`)
}

/**
 * @description 新增公告
 * @param data
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function createNotice (data) {
  return axios.post('/admin/notice', data)
}

/**
 * @description 修改公告
 * @param id
 * @param data
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function updateNotice (id, data) {
  return axios.post('/admin/notice/' + id, data)
}

/**
 * @description 删除公告
 * @param id
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function deleteNotice (id) {
  return axios.post(`/admin/notice/${id}/delete`)
}
