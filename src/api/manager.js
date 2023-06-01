import axios from '~/axios'
import { queryParams } from '~/composables/util.js'

// 登录
export function login (username, password) {
  return axios.post('/admin/login', {
    username,
    password,
  })
}

// 获取管理员信息和权限菜单
export function getInfo () {
  return axios.post('/admin/getinfo')
}

// 退出登录
export function logOut () {
  return axios.post('/admin/logout')
}

// 修改密码
export function updatePassword (data) {
  return axios.post('/admin/updatepassword', data)
}

// 管理员列表
export function getManagerList (page, query = {}) {
  let r = queryParams(query)
  return axios.get(`/admin/manager/${page}${r}`)
}

// 修改管理员状态
export function updateManagerStatus (id, status) {
  return axios.post(`/admin/manager/${id}/update_status`, { status })
}

// 创建管理员
export function createManager (data) {
  return axios.post('/admin/manager', data)
}

// 修改管理员
export function updateManager (id, data) {
  return axios.post(`/admin/manager/${id}`, data)
}

// 删除管理员
export function deleteManager (id) {
  return axios.post(`/admin/manager/${id}/delete`)
}
