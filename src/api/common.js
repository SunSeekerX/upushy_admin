import { request } from '@/utils/request/index'

// 系统配置
export function getConfig() {
  return request({
    url: '/api/basic/config',
    method: 'GET',
  })
}

// OSS临时访问
export function getOSSStsConfig() {
  return request({
    url: '/api/basic/oss-sts',
    method: 'GET',
  })
}

// 系统信息
export function getSystemConfig() {
  return request({
    url: '/api/basic/config/system',
    method: 'GET',
  })
}
