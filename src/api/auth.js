/**
 * @name:
 * @author: SunSeekerX
 * @Date: 2020-07-27 12:17:08
 * @LastEditors: SunSeekerX
 * @LastEditTime: 2020-08-10 12:28:43
 */

import { request } from '@/utils/request/index'

export default {
  // 登录验证码
  registerCaptcha() {
    return request({
      url: `/api/user/register/captcha?t=${Date.now()}`,
      method: 'GET',
    })
  },

  // 注册
  register({ username, password, email, nickname, imgCaptcha, imgCaptchaKey }) {
    return request({
      url: '/api/user',
      method: 'POST',
      data: { username, password, email, nickname, imgCaptcha, imgCaptchaKey },
    })
  },

  // 登录
  login({ username, password, imgCaptcha, loginCaptchaKey }) {
    return request({
      url: '/api/user/login',
      method: 'POST',
      data: { username, password, imgCaptcha, loginCaptchaKey },
    })
  },

  // 登录验证码
  loginCaptcha() {
    return request({
      url: `/api/user/login/captcha?t=${Date.now()}`,
      method: 'GET',
    })
  },
}
