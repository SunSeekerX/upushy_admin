/**
 * @name:
 * @author: SunSeekerX
 * @Date: 2020-07-27 17:23:24
 * @LastEditors: SunSeekerX
 * @LastEditTime: 2020-08-10 15:55:28
 */

import { request } from '@/utils/request/index'

export default {
  // 项目列表
  projects({ pageNum, pageSize }) {
    return request({
      url: '/api/projects',
      method: 'GET',
      params: {
        pageNum,
        pageSize,
      },
    })
  },

  // 新建项目
  createProject({ appid, describe, name }) {
    return request({
      url: '/api/project',
      method: 'POST',
      data: {
        appid,
        describe,
        name,
      },
    })
  },

  // 删除项目
  deleteProject({ id }) {
    return request({
      url: '/api/project',
      method: 'DELETE',
      data: {
        id,
      },
    })
  },

  // 更新项目
  updateProject({ id, appid, name, describe }) {
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
  },
}
