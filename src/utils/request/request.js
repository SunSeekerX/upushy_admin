/**
 * @name Axios request module
 * @author SunSeekerX
 * @time 2019-08-13 10:29:11
 * @LastEditors: SunSeekerX
 * @LastEditTime: 2020-08-03 22:58:44
 */

import axios from 'axios'
import storage from 'store'
import notification from 'ant-design-vue/es/notification'

import store from '@/store'
import router from '@/router'
import { ACCESS_TOKEN } from '@/store/mutation-types'

/**
 * @name Create request object
 * @param { Object } options options for axios.create
 * @returns { Function } request function
 */
export default function createRequest(options) {
  // 异常拦截处理器
  const errorHandler = error => {
    if (error.response) {
      const data = error.response.data
      // 从 localstorage 获取 token
      const token = storage.get(ACCESS_TOKEN)
      if (error.response.status === 403) {
        notification.error({
          message: 'Forbidden',
          description: data.message,
        })
      }
      if (
        error.response.status === 401 &&
        !(data.result && data.result.isLogin)
      ) {
        notification.error({
          message: 'Unauthorized',
          description: 'Authorization verification failed',
        })
        if (token) {
          store.commit('LOGIN_OUT')

          router.replace('/user/login')
        }
      }
    }
    return Promise.reject(error)
  }
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
  instance.interceptors.request.use(config => {
    const token = storage.get(ACCESS_TOKEN)
    // 如果 token 存在
    // 让每个请求携带自定义 token 请根据实际情况自行修改
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  }, errorHandler)

  // Response interceptor
  instance.interceptors.response.use(response => response.data, errorHandler)

  return instance
}
