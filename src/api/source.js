/**
 * @name:
 * @author: SunSeekerX
 * @Date: 2020-07-28 09:52:25
 * @LastEditors: SunSeekerX
 * @LastEditTime: 2020-07-28 18:11:26
 */

import { request } from '@/utils/request/index'

export default {
  // 资源列表
  sources({ id }) {
    return request({
      url: '/api/source',
      method: 'GET',
      params: {
        projectId: id,
      },
    })
  },

  // 新建资源
  createSource({ projectId, version, versionNum, url, isFullUpdated, remark }) {
    return request({
      url: '/api/source',
      method: 'POST',
      data: { projectId, version, versionNum, url, isFullUpdated, remark },
    })
  },

  // 修改资源
  updateSource({ id, version, versionNum, url, isFullUpdated, remark }) {
    return request({
      url: '/api/source',
      method: 'PUT',
      data: { id, version, versionNum, url, isFullUpdated, remark },
    })
  },

  // 删除资源
  deleteSource({ id }) {
    return request({
      url: '/api/source',
      method: 'DELETE',
      data: {
        // 资源id
        id,
      },
    })
  },
}
