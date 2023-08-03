import axios from '~/axios'
import { queryParams } from '~/composables/util'

/**
 * @description 获取订单列表
 * @param page
 * @param query
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function getOrderList (page, query = {}) {
  let r = queryParams(query)
  return axios.get(`/admin/order/${page}${r}`)
}

/**
 * @description 批量删除订单
 * @param ids
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function deleteOrder (ids) {
  return axios.post('/admin/order/delete_all', {
    ids,
  })
}

/**
 * @description 导出订单
 * @param query
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function exportOrder (query = {}) {
  let r = queryParams(query)
  return axios.post(`/admin/order/excelexport${r}`, {}, {
    responseType: 'blob',
  })
}

/**
 * @description 物流信息
 * @param id
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function getShipInfo (id) {
  return axios.get(`/admin/order/${id}/get_ship_info`)
}

/**
 * @description 同意、拒绝退款
 * @param id
 * @param data
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function refundOrder (id, data) {
  return axios.post(`/admin/order/${id}/handle_refund`, data)
}
