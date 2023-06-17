import axios from '~/axios.js'

export function getImageList (id, page = 1) {
  return axios.get(`/admin/image_class/${id}/image/${page}`)
}

// 修改图片名称
export function updateImage (id, name) {
  return axios.post(`/admin/image/${id}`, { name })
}

// 删除图片
export function deleteImage (ids) {
  return axios.post(`/admin/image/delete_all`, { ids })
}

// 上传图片地址
export const uploadImageAction = import.meta.env.VITE_APP_BASE_API + '/api/admin/image/upload'
