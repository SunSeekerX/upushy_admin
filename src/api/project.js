import { request } from '@/utils/request'

// 项目列表
export function getProjectsApi({ pageNum, pageSize }) {
  return request({
    url: '/api/upushy/projects',
    method: 'GET',
    params: {
      pageNum,
      pageSize,
    },
  })
}

// 新建项目
export function createProjectApi({ appid, describe, name }) {
  return request({
    url: '/api/upushy/projects',
    method: 'POST',
    data: {
      appid,
      describe,
      name,
    },
  })
}

// 删除项目
export function deleteProjectApi({ id }) {
  return request({
    url: `/api/upushy/projects/${id}`,
    method: 'DELETE',
  })
}

// 更新项目
export function updateProjectApi({ id, appid, name, describe }) {
  return request({
    url: `/api/upushy/projects/${id}`,
    method: 'PATCH',
    data: {
      appid,
      name,
      describe,
    },
  })
}
