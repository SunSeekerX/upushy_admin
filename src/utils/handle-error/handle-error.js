/**
 * @name Handle error
 * @author SunSeekerX
 * @time 2019-11-27 15:18:44
 * @LastEditors: SunSeekerX
 * @LastEditTime: 2020-11-01 23:31:54
 */

import notification from 'ant-design-vue/es/notification'

/**
 * @name Handle api request exception
 * @description when api request fail, you should using this in your catch block
 * @param { Error } e exception object
 * @returns void
 */
function handleApiRequestException(error) {
  notification['error']({
    message: '错误',
    description: error.message || '请求出现错误，请稍后再试',
  })
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
 * @name Hanle when request result success no true
 * @param { String } msg tips message
 */
function handleRequestFail(res) {
  const type = res.type ? res.type : 'warn'
  notification[type]({
    message: '警告',
    description: res.message ? res.message : res,
  })
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
