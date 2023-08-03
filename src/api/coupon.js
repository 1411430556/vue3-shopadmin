import axios from '~/axios.js'

/**
 * @description 获取优惠券数据
 * @param page
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function getCouponList (page) {
  return axios.get(`/admin/coupon/${page}`)
}

/**
 * @description 新增优惠券
 * @param data
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function createCoupon (data) {
  return axios.post('/admin/coupon', data)
}

/**
 * @description 修改优惠券
 * @param id
 * @param data
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function updateCoupon (id, data) {
  return axios.post('/admin/coupon/' + id, data)
}

/**
 * @description 删除优惠券
 * @param id
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function deleteCoupon (id) {
  return axios.post(`/admin/coupon/${id}/delete`)
}

/**
 * @description 修改优惠券状态为失效
 * @param id
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function updateCouponStatus(id){
  return axios.post(`/admin/coupon/${id}/update_status`,{ status:0 })
}
