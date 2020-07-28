/**
 * @name Axios request module
 * @author SunSeekerX
 * @time 2019-08-13 10:29:11
 * @LastEditors: SunSeekerX
 * @LastEditTime: 2020-07-28 11:42:51
 */

import axios from 'axios'
import storage from 'store'
// import notification from 'ant-design-vue/es/notification'

// import store from '@/store'
import { ACCESS_TOKEN } from '@/store/mutation-types'

/**
 * @name Create request object
 * @param { Object } options options for axios.create
 * @returns { Function } request function
 */
export default function createRequest(options) {
  // create an axios instance
  const instance = axios.create(
    Object.assign(
      {
        baseURL: process.env.VUE_APP_API_BASE_URL,
        withCredentials: false,
        timeout: 15000,
      },
      options,
    ),
  )

  // Request interceptor
  instance.interceptors.request.use(
    config => {
      const token = storage.get(ACCESS_TOKEN)
      // 如果 token 存在
      // 让每个请求携带自定义 token 请根据实际情况自行修改
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`
      }
      return config
    },
    error => Promise.reject(error),
  )

  // Response interceptor
  instance.interceptors.response.use(
    response => response.data,
    error => Promise.reject(error),
  )

  return instance
}
