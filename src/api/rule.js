import axios from '~/axios.js'

/**
 * @description 获取菜单权限列表
 * @param page
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function getRuleList (page) {
  return axios.get(`/admin/rule/${page}`)
}

/**
 * @description 增加菜单权限
 * @param data
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function createRule (data) {
  return axios.post('/admin/rule', data)
}

/**
 * @description 修改菜单权限
 * @param id
 * @param data
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function updateRule (id, data) {
  return axios.post('/admin/rule/' + id, data)
}

/**
 * @description 修改菜单权限状态
 * @param id
 * @param status
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function updateRuleStatus (id, status) {
  return axios.post(`/admin/rule/${id}/update_status`, {status})
}

/**
 * @description 删除菜单权限
 * @param id
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function deleteRule (id) {
  return axios.post(`/admin/rule/${id}/delete`)
}
