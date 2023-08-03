import axios from '~/axios.js'

/**
 * @description 获取规格列表数据
 * @param page
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function getSkusList (page) {
  return axios.get(`/admin/skus/${page}`)
}

/**
 * @description 新增规格
 * @param data
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function createSkus (data) {
  return axios.post('/admin/skus', data)
}

/**
 * @description 修改规格
 * @param id
 * @param data
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function updateSkus (id, data) {
  return axios.post('/admin/skus/' + id, data)
}

/**
 * @description 删除规格
 * @param ids
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function deleteSkus (ids) {
  ids = Array.isArray(ids) ? ids : [ids]
  return axios.post('/admin/skus/delete_all', { ids })
}

/**
 * @description 修改规格状态
 * @param id
 * @param status
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function updateSkusStatus (id, status) {
  return axios.post(`/admin/skus/${id}/update_status`, {status})
}
