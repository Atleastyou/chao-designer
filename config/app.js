
const devApiUrl = ''
const proApiUrl = ''
const nodeDevEnv = process.env.NODE_ENV === 'development'

export default {
  apiUrl: nodeDevEnv ? devApiUrl : proApiUrl, // 请求地址
  apiPrefix: 'api',
  timeout: 6000, // 请求超时时间
  designSize: 375 // 设计稿宽度 375
}
