/**
 * @name:
 * @author: SunSeekerX
 * @Date: 2020-07-28 11:30:36
 * @LastEditors: SunSeekerX
 * @LastEditTime: 2020-10-27 20:06:30
 */

import { request } from '@/utils/request/index'

// 文件上传
export function upload(data) {
  return request({
    url: '/api/upload',
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data,
  })
}

// 系统配置
export function getConfig() {
  return request({
    url: '/api/config',
    method: 'GET',
  })
}

// OSS临时访问
export function getOSSStsConfig() {
  return request({
    url: '/api/oss-sts',
    method: 'GET',
  })
}

// 系统信息
export function getSystemConfig(){
  return request({
    url: '/api/systemConfig',
    method: 'GET',
  })
}
