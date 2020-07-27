/**
 * @name:export all requet instance
 * @author: SunSeekerX
 * @Date: 2020-07-27 10:24:00
 * @LastEditors: SunSeekerX
 * @LastEditTime: 2020-07-27 10:44:49
 */

import createRequest from './request'

const request = createRequest({
  // API 请求的默认前缀
  baseURL: process.env.VUE_APP_API_BASE_URL,
  timeout: 6000, // 请求超时时间
})

export { request }
