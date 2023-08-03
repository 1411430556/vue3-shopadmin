import axios from '~/axios.js'

/**
 * @description 图库列表
 * @param page
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function getImageClassList (page) {
  return axios.get('/admin/image_class/' + page)
}

/**
 * @description 增加图库分类
 * @param data
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function createImageClass (data) {
  return axios.post('/admin/image_class', data)
}

/**
 * @description 修改图库分类
 * @param id
 * @param data
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function updateImageClass (id, data) {
  return axios.post('/admin/image_class/' + id, data)
}

/**
 * @description 删除图库分类
 * @param id
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function deleteImageClass (id) {
  return axios.post(`/admin/image_class/${id}/delete`)
}
