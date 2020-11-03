/**
 * @name:
 * @author: SunSeekerX
 * @Date: 2020-10-28 22:14:14
 * @LastEditors: SunSeekerX
 * @LastEditTime: 2020-11-03 10:45:39
 */

import { request } from '@/utils/request/index'

// 登录日志列表
export function logginLogs({ pageNum, pageSize, sortKey, order }) {
  return request({
    url: '/api/log/login',
    method: 'GET',
    params: {
      pageNum,
      pageSize,
      sortKey,
      order,
    },
  })
}
