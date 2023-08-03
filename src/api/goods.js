import axios from '~/axios'
import { queryParams } from '~/composables/util'

export function getGoodsList (page, query = {}) {
  let r = queryParams(query)
  return axios.get(`/admin/goods/${page}${r}`)
}

/**
 * @description 批量上架/下架
 * @param ids
 * @param status
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function updateGoodsStatus (ids, status) {
  return axios.post('/admin/goods/changestatus', {
    ids,
    status,
  })
}

/**
 * @description 创建商品
 * @param data
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function createGoods (data) {
  return axios.post('/admin/goods', data)
}

/**
 * @description 修改商品
 * @param id
 * @param data
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function updateGoods (id, data) {
  return axios.post(`/admin/goods/${id}`, data)
}

/**
 * @description 删除商品
 * @param ids
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function deleteGoods (ids) {
  return axios.post('/admin/goods/delete_all', { ids })
}

/**
 * @description 批量恢复商品
 * @param ids
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function restoreGoods (ids) {
  return axios.post('/admin/goods/restore', { ids })
}

/**
 * @description 彻底删除商品
 * @param ids
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function destroyGoods (ids) {
  return axios.post('/admin/goods/destroy', { ids })
}

/**
 * @description 查看商品资料
 * @param id
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function readGoods (id) {
  return axios.get(`/admin/goods/read/${id}`)
}

/**
 * @description 设置商品轮播图
 * @param id
 * @param data
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function setGoodsBanner (id, data) {
  return axios.post(`/admin/goods/banners/${id}`, data)
}

/**
 * @description 更新商品规格
 * @param id
 * @param data
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function updateGoodsSkus (id, data) {
  return axios.post(`/admin/goods/updateskus/${id}`, data)
}

/**
 * @description 添加规格
 * @param data
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function createGoodsSkusCard (data) {
  return axios.post('/admin/goods_skus_card', data)
}

/**
 * @description 修改商品规格选项
 * @param id
 * @param data
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function updateGoodsSkusCard (id, data) {
  return axios.post(`/admin/goods_skus_card/${id}`, data)
}

/**
 * @description 删除规格选项
 * @param id
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function deleteGoodsSkusCard (id) {
  return axios.post(`/admin/goods_skus_card/${id}/delete`)
}

/**
 * @description 排序商品规格选项
 * @param data
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function sortGoodsSkusCard (data) {
  return axios.post('/admin/goods_skus_card/sort', data)
}

/**
 * @description 添加商品规格选项的值
 * @param data
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function createGoodsSkusCardValue (data) {
  return axios.post('/admin/goods_skus_card_value', data)
}

/**
 * @description 修改商品规格选项的值
 * @param id
 * @param data
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function updateGoodsSkusCardValue (id, data) {
  return axios.post(`/admin/goods_skus_card_value/${id}`, data)
}

/**
 * @description 删除商品规格选项的值
 * @param id
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function deleteGoodsSkusCardValue (id) {
  return axios.post(`/admin/goods_skus_card_value/${id}/delete`)
}

/**
 * @description 选择设置商品规格选项和值
 * @param id
 * @param data
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function chooseAndSetGoodsSkusCard (id, data) {
  return axios.post(`/admin/goods_skus_card/${id}/set`, data)
}

/**
 * @description 审核商品
 * @param id
 * @param ischeck
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function checkGoods (id, ischeck) {
  return axios.post(`/admin/goods/${id}/check`, { ischeck })
}
