import axios from '~/axios.js'

export function getStatistics1 () {
  return axios.get('/admin/statistics1')
}
