/**
 * @name:
 * @author: SunSeekerX
 * @Date: 2020-07-28 11:30:36
 * @LastEditors: SunSeekerX
 * @LastEditTime: 2020-07-28 11:39:23
 */

import { request } from '@/utils/request/index'

export default {
  // 文件上传
  upload(data) {
    return request({
      url: '/api/upload',
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data,
    })
  },
}
