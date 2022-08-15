import { request } from '@/utils/request'

// 系统配置
export function getConfigApi() {
  return request({
    url: '/api/system/config',
    method: 'GET',
  })
}

// OSS临时访问
export function getOSSStsConfigApi() {
  return request({
    url: '/api/upushy/basic/oss-sts',
    method: 'GET',
  })
}

// 系统信息
export function getSystemConfigApi() {
  return request({
    url: '/api/system/info',
    method: 'GET',
  })
}
