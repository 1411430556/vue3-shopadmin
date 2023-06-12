import axios from '~/axios'
import { queryParams } from '~/composables/util'

// 商品评价列表
export function getGoodsCommentList (page, query = {}) {
  let r = queryParams(query)
  return axios.get(`/admin/goods_comment/${page}${r}`)
}

// 修改商品评价状态
export function updateGoodsCommentStatus (id, status) {
  return axios.post(`/admin/goods_comment/${id}/update_status`, {
    status,
  })
}

// 回复商品评价
export function reviewGoodsComment (id, data) {
  return axios.post(`/admin/goods_comment/review/${id}`, {
    data,
  })
}

