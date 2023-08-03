import axios from '~/axios'
import { queryParams } from '~/composables/util'

/**
 * @description 商品评价列表
 * @param page
 * @param query
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function getGoodsCommentList (page, query = {}) {
  let r = queryParams(query)
  return axios.get(`/admin/goods_comment/${page}${r}`)
}

/**
 * @description 修改商品评价状态
 * @param id
 * @param status
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function updateGoodsCommentStatus (id, status) {
  return axios.post(`/admin/goods_comment/${id}/update_status`, {
    status,
  })
}

/**
 * @description 回复商品评价
 * @param id
 * @param data
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function reviewGoodsComment (id, data) {
  return axios.post(`/admin/goods_comment/review/${id}`, {
    data,
  })
}

