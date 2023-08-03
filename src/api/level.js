import axios from '~/axios'

/**
 * @description 获取会员等级列表
 * @param page
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function getUserLevelList (page) {
  return axios.get(`/admin/user_level/${page}`)
}

/**
 * @description 增加会员等级
 * @param data
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function createUserLevel (data) {
  return axios.post('/admin/user_level', data)
}

/**
 * @description 修改会员等级
 * @param id
 * @param data
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function updateUserLevel (id, data) {
  return axios.post('/admin/user_level/' + id, data)
}

/**
 * @description 删除会员等级
 * @param id
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function deleteUserLevel (id) {
  return axios.post(`/admin/user_level/${id}/delete`)
}

/**
 * @description 修改会员等级状态
 * @param id
 * @param status
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function updateUserLevelStatus (id, status) {
  return axios.post(`/admin/user_level/${id}/update_status`, {
    status,
  })
}
