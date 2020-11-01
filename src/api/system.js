/**
 * @name:
 * @author: SunSeekerX
 * @Date: 2020-10-28 22:14:14
 * @LastEditors: SunSeekerX
 * @LastEditTime: 2020-11-01 20:50:25
 */

import { request } from '@/utils/request/index'

// 登录日志列表
export function logginLogs({ pageNum, pageSize, sortKey, order }) {
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
}
