import axios from '~/axios.js'

/**
 * @description 获取角色列表数据
 * @param page
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function getRoleList (page) {
  return axios.get(`/admin/role/${page}`)
}

/**
 * @description 新增角色
 * @param data
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function createRole (data) {
  return axios.post('/admin/role', data)
}

/**
 * @description 修改角色
 * @param id
 * @param data
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function updateRole (id, data) {
  return axios.post('/admin/role/' + id, data)
}

/**
 * @description 删除角色
 * @param id
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function deleteRole (id) {
  return axios.post(`/admin/role/${id}/delete`)
}

/**
 * @description 修改角色状态
 * @param id
 * @param status
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function updateRoleStatus (id, status) {
  return axios.post(`/admin/role/${id}/update_status`, {status})
}

/**
 * @description 配置角色权限
 * @param id
 * @param rule_ids
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function setRoleRules (id, rule_ids) {
  return axios.post(`/admin/role/set_rules`, {id, rule_ids})
}
