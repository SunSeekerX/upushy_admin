import { request } from '@/utils/request'

// 项目列表
export function projects({ pageNum, pageSize }) {
  return request({
    url: '/api/projects',
    method: 'GET',
    params: {
      pageNum,
      pageSize,
    },
  })
}

// 新建项目
export function createProject({ appid, describe, name }) {
  return request({
    url: '/api/project',
    method: 'POST',
    data: {
      appid,
      describe,
      name,
    },
  })
}

// 删除项目
export function deleteProject({ id }) {
  return request({
    url: '/api/project',
    method: 'DELETE',
    data: {
      id,
    },
  })
}

// 更新项目
export function updateProject({ id, appid, name, describe }) {
  return request({
    url: '/api/project',
    method: 'PUT',
    data: {
      id,
      appid,
      name,
      describe,
    },
  })
}
