import axios from '~/axios'

/**
 * @description 获取分类列表
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function getCategoryList () {
  return axios.get('/admin/category')
}

/**
 * @description 增加商品分类
 * @param data
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function createCategory (data) {
  return axios.post('/admin/category', data)
}

/**
 * @description 修改商品分类
 * @param id
 * @param data
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function updateCategory (id, data) {
  return axios.post('/admin/category/' + id, data)
}

/**
 * @description 更新商品分类状态
 * @param id
 * @param status
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function updateCategoryStatus (id, status) {
  return axios.post(`/admin/category/${id}/update_status`, {
    status,
  })
}

/**
 * @description 删除商品分类
 * @param id
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function deleteCategory (id) {
  return axios.post(`/admin/category/${id}/delete`)
}

/**
 * @description 分类关联产品列表
 * @param id
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function getCategoryGoods (id) {
  return axios.get(`/admin/app_category_item/list?category_id=${id}`)
}

/**
 * @description 删除关联产品
 * @param id
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function deleteCategoryGoods (id) {
  return axios.post(`/admin/app_category_item/${id}/delete`)
}

/**
 * @description 关联产品
 * @param data
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function connectCategoryGoods (data) {
  return axios.post('/admin/app_category_item', data)
}
