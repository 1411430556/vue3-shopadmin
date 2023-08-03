import axios from '~/axios.js'

export function getImageList (id, page = 1) {
  return axios.get(`/admin/image_class/${id}/image/${page}`)
}

/**
 * @description 修改图片名称
 * @param id
 * @param name
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function updateImage (id, name) {
  return axios.post(`/admin/image/${id}`, { name })
}

/**
 * @description 删除图片
 * @param ids
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function deleteImage (ids) {
  return axios.post(`/admin/image/delete_all`, { ids })
}

/**
 * @description 上传图片地址
 * @type {string}
 */
export const uploadImageAction = import.meta.env.VITE_APP_BASE_API + '/api/admin/image/upload'
