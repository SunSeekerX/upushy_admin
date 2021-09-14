/**
 * @name:export all requet instance
 * @author: SunSeekerX
 * @Date: 2020-07-27 10:24:00
 * @LastEditors: SunSeekerX
 * @LastEditTime: 2020-11-01 20:05:40
 */

import createRequest from './request'

const request = createRequest({
  // API 请求的默认前缀
  baseURL: process.env.VUE_APP_API_BASE_URL,
  // 请求超时时间
  timeout: Number(process.env.VUE_APP_REQUEST_TIMEOUT) * 1000 || 6000,
})

export { request }
