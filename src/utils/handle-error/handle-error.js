/**
 * @name Handle error
 * @author SunSeekerX
 * @time 2019-11-27 15:18:44
 * @LastEditors: SunSeekerX
 * @LastEditTime: 2021-09-14 21:50:21
 */

import { message as Message } from 'ant-design-vue'
// import notification from 'ant-design-vue/es/notification'

/**
 * @name Handle api request exception
 * @description when api request fail, you should using this in your catch block
 * @param { Error } e exception object
 * @returns void
 */
function handleApiRequestException(error) {
  Message['error'](error.message || '请求出现错误，请稍后再试')
}

/**
 * @name Handle WebSocket exception
 * @description when WebSocket exception, you should using this in your catch block
 * @param { Error } e exception object
 * @returns void
 */
function handleWebSocketException(e) {
  console.error(e)
}

/**
 * @name Handle application exception
 * @description when Application exception, you should using this in your catch block
 * @param { Error } e exception object
 * @returns void
 */
function handleApplicationException(e) {
  console.error(e)
}

/**
 * @name Handle when request result success no true
 * @param { String } msg tips message
 */
function handleRequestFail(res) {
  let type = 'warn'
  let message = res.message
  if (res.statusCode >= 500) {
    type = 'error'
    message = '内部服务错误'
  }

  switch (res.statusCode) {
    case 403:
      message = '访问被禁止'
      break
    case 401:
      message = '登陆过期'
      break
    case 400:
      message = '客户端错误'
      break
    default:
      break
  }

  Message[type](message)
}

export {
  // Api请求出错
  handleApiRequestException,
  // WebSocket错误
  handleWebSocketException,
  // 程序出错
  handleApplicationException,
  // 请求失败
  handleRequestFail,
}
