/**
 * @name:
 * @author: SunSeekerX
 * @Date: 2020-07-27 12:17:08
 * @LastEditors: SunSeekerX
 * @LastEditTime: 2020-07-27 14:20:58
 */

import { request } from '@/utils/request/index'

export default {
  // 注册
  register({ username, password, email, nickname }) {
    return request({
      url: '/api/user',
      method: 'POST',
      data: { username, password, email, nickname },
    })
  },

  // 登录
  login({ username, password }) {
    return request({
      url: '/api/user/login',
      method: 'POST',
      data: { username, password },
    })
  },
}
