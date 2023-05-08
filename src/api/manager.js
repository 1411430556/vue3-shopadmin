import axios from '~/axios'

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
