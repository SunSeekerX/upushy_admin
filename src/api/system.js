/**
 * @name:
 * @author: SunSeekerX
 * @Date: 2020-10-28 22:14:14
 * @LastEditors: SunSeekerX
 * @LastEditTime: 2020-10-28 22:47:17
 */

import { request } from '@/utils/request/index'

export default {
  // 登录日志列表
  logginLogs({ pageNum, pageSize, sortKey, order }) {
    return request({
      url: '/api/basic/loginLog',
      method: 'GET',
      params: {
        pageNum,
        pageSize,
        sortKey,
        order,
      },
    })
  },
}
