import axios from '~/axios'
import { queryParams } from '~/composables/util'

// 获取订单列表
export function getOrderList (page, query = {}) {
  let r = queryParams(query)
  return axios.get(`/admin/order/${page}${r}`)
}

// 批量删除订单
export function deleteOrder (ids) {
  return axios.post('/admin/order/delete_all', {
    ids,
  })
}

// 订单发货
export function exportOrder (query = {}) {
  let r = queryParams(query)
  return axios.post(`/admin/order/excelexport${r}`, {}, {
    responseType: 'blob',
  })
}

export function getShipInfo (id) {
  return axios.get(`/admin/order/${id}/get_ship_info`)
}

export function refundOrder (id, data) {
  return axios.post(`/admin/order/${id}/handle_refund`, data)
}
