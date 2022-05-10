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
