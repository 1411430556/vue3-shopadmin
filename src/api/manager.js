import axios from '~/axios'
import { queryParams } from '~/composables/util.js'

/**
 * @description 登录
 * @param username
 * @param password
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function login (username, password) {
  return axios.post('/admin/login', {
    username,
    password,
  })
}

/**
 * @description 获取管理员信息和权限菜单
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function getInfo () {
  return axios.post('/admin/getinfo')
}

/**
 * @description 退出登录
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function logOut () {
  return axios.post('/admin/logout')
}

/**
 * @description 修改密码
 * @param data
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function updatePassword (data) {
  return axios.post('/admin/updatepassword', data)
}

/**
 * @description 管理员列表
 * @param page
 * @param query
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function getManagerList (page, query = {}) {
  let r = queryParams(query)
  return axios.get(`/admin/manager/${page}${r}`)
}

/**
 * @description 修改管理员状态
 * @param id
 * @param status
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function updateManagerStatus (id, status) {
  return axios.post(`/admin/manager/${id}/update_status`, { status })
}

/**
 * @description 创建管理员
 * @param data
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function createManager (data) {
  return axios.post('/admin/manager', data)
}

/**
 * @description 修改管理员
 * @param id
 * @param data
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function updateManager (id, data) {
  return axios.post(`/admin/manager/${id}`, data)
}

/**
 * @description 删除管理员
 * @param id
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function deleteManager (id) {
  return axios.post(`/admin/manager/${id}/delete`)
}
