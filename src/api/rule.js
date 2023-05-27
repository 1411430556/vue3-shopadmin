import axios from '~/axios.js'

// 获取菜单权限列表
export function getRuleList (page) {
  return axios.get(`/admin/rule/${page}`)
}
