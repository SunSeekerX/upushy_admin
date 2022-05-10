import createRequest from './request'

const request = createRequest({
  // API 请求的默认前缀
  baseURL: process.env.VUE_APP_API_BASE_URL,
  // 请求超时时间
  timeout: Number(process.env.VUE_APP_REQUEST_TIMEOUT) * 1000 || 6000,
})

export { request }
