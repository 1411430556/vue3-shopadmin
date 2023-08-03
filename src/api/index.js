import axios from '~/axios.js'

/**
 * @description 支付订单，订单量，销售额，新增用户数据的接口
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function getStatistics1 () {
  return axios.get('/admin/statistics1')
}

export function getStatistics2 () {
  return axios.get('/admin/statistics2')
}

/**
 * @description echarts数据的接口
 * @param type
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function getStatistics3 (type) {
  return axios.get('/admin/statistics3?type=' + type)
}


