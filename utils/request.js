import Axios from 'axios'
import Config from '../config/app.js'

const service = Axios.create({
  baseURL: `${Config.apiUrl}/${Config.apiPrefix}`,
  headers: { Accept: '*/*' },
  params: {
    entry: 'back'
  },
  timeout: Config.timeout
})

service.interceptors.request.use(
  config => config,
  (error) => {
    Promise.reject(error)
  }
)

service.interceptors.response.use(
  (response) => {
    const { data } = response
    if (response.status !== 200 || data.status != 1) {
      return Promise.reject(data)
    }
    return data
  },
  (error) => {
    if (error.message === `timeout of ${Config.timeout}ms exceeded`) {
      return Promise.reject({ msg: '请求超时 请重试' })
    } else {
      return Promise.reject(error)
    }
  }
)

export default service
