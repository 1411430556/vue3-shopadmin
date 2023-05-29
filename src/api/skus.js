import axios from '~/axios.js'

// 获取规格列表数据
export function getSkusList (page) {
  return axios.get(`/admin/skus/${page}`)
}

// 新增规格
export function createSkus (data) {
  return axios.post('/admin/skus', data)
}

// 修改规格
export function updateSkus (id, data) {
  return axios.post('/admin/skus/' + id, data)
}

// 删除规格
export function deleteSkus (ids) {
  ids = Array.isArray(ids) ? ids : [ids]
  return axios.post('/admin/skus/delete_all', { ids })
}

//修改规格状态
export function updateSkusStatus (id, status) {
  return axios.post(`/admin/skus/${id}/update_status`, {status})
}
