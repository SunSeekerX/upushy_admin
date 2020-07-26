/**
 * @name:
 * @author: SunSeekerX
 * @Date: 2020-07-26 18:38:31
 * @LastEditors: SunSeekerX
 * @LastEditTime: 2020-07-26 18:42:12
 */

import request from '@/utils/request'

export default {
  register({ username, password, email, nickname }) {
    return request({
      url: '/api/user',
      method: 'POST',
      data: { username, password, email, nickname },
    })
  },
}
