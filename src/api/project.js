/**
 * @name:
 * @author: SunSeekerX
 * @Date: 2020-07-27 17:23:24
 * @LastEditors: SunSeekerX
 * @LastEditTime: 2020-07-27 17:47:14
 */

import { request } from '@/utils/request/index'

export default {
  // 项目列表
  projects({pageNum,pageSize}) {
    return request({
      url: '/api/projects',
      method: 'GET',
      params:{
        pageNum,
        pageSize
      }
    })
  },

  // 新建项目
  createProject({ describe, name }) {
    return request({
      url: '/api/project',
      method: 'POST',
      data: {
        describe,
        name,
      },
    })
  },
  deleteProject({ id }) {
    return request({
      url: '/api/project',
      method: 'DELETE',
      data: {
        id
      },
    })
  },
  updateProject({ id,name,describe }) {
    return request({
      url: '/api/project',
      method: 'PUT',
      data: {
        id,
        name,
        describe
      },
    })
  },
}
