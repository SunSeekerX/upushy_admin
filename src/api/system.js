import { request } from '@/utils/request'

// 登录日志列表
export function loginLogsApi({ pageNum, pageSize, sortKey, order }) {
  return request({
    url: '/api/upushy/log/login',
    method: 'GET',
    params: {
      pageNum,
      pageSize,
      sortKey,
      order,
    },
  })
}
