import axios from '~/axios'
import { queryParams } from '~/composables/util'

/**
 * @description 用户列表
 * @param page
 * @param query
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function getUserList (page, query = {}) {
  let r = queryParams(query)
  return axios.get(`/admin/user/${page}${r}`)
}

/**
 * @description 修改用户状态
 * @param id
 * @param status
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function updateUserStatus (id, status) {
  return axios.post(`/admin/user/${id}/update_status`, {
    status,
  })
}

/**
 * @description 增加用户
 * @param data
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function createUser (data) {
  return axios.post('/admin/user', data)
}

/**
 * @description 修改用户
 * @param id
 * @param data
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function updateUser (id, data) {
  return axios.post(`/admin/user/${id}`, data)
}

/**
 * @description 删除会员
 * @param id
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function deleteUser (id) {
  return axios.post(`/admin/user/${id}/delete`)
}
