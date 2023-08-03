import axios from '~/axios'
import { queryParams } from '~/composables/util'

/**
 * @description 分销推广员列表
 * @param page
 * @param query
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function getAgentList (page, query = {}) {
  let r = queryParams(query)
  return axios.get(`/admin/agent/${page}${r}`)
}

/**
 * @description 推广订单列表
 * @param page
 * @param query
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function getAgentOrderList (page, query = {}) {
  let r = queryParams(query)
  return axios.get(`/admin/user_bill/${page}${r}`)
}

/**
 * @description 分销数据统计
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function getAgentStatistics () {
  return axios.get('/admin/agent/statistics')
}

/**
 * @description 获取分销配置
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function getConfig () {
  return axios.get('/admin/distribution_setting/get')
}

/**
 * @description 修改分销配置
 * @param data
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function setConfig (data) {
  return axios.post('/admin/distribution_setting/set', data)
}
