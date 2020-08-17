/**
 * @name Axios request module
 * @author SunSeekerX
 * @time 2019-08-13 10:29:11
 * @LastEditors: SunSeekerX
 * @LastEditTime: 2020-08-17 15:13:47
 */

import axios from 'axios'
import storage from 'store'
import notification from 'ant-design-vue/es/notification'

import store from '@/store'
import router from '@/router'
import { createSign } from './request-sign'
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
      } else if (error.response.status === 401) {
        // notification.error({
        //   message: 'Unauthorized',
        //   description: 'Authorization verification failed',
        // })

        if (token) {
          store.commit('LOGIN_OUT')

          store.commit('RESET_ROUTER')

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
    // token
    token && (config.headers['Authorization'] = `Bearer ${token}`)
    // 接口加密
    // console.log(config);
    createSign(config)
    
    return config
  }, errorHandler)

  // Response interceptor
  instance.interceptors.response.use(response => response.data, errorHandler)

  return instance
}
