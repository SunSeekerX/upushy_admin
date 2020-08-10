/**
 * @name:
 * @author: SunSeekerX
 * @Date: 2020-07-28 09:52:25
 * @LastEditors: SunSeekerX
 * @LastEditTime: 2020-08-10 19:13:26
 */

import { request } from '@/utils/request/index'

export default {
  // 资源列表
  sources({ id, type, pageNum, pageSize }) {
    return request({
      url: '/api/source',
      method: 'GET',
      params: {
        projectId: id,
        type,
        pageNum,
        pageSize,
      },
    })
  },

  // 新建资源
  createSource({ projectId, version, versionCode, nativeVersionCode, url, isForceUpdate, type, remark }) {
    return request({
      url: '/api/source',
      method: 'POST',
      data: {
        projectId,
        version,
        versionCode,
        nativeVersionCode,
        url,
        isForceUpdate,
        type,
        remark,
      },
    })
  },

  // 修改资源
  updateSource({ id, version, versionCode, nativeVersionCode, url, isFullUpdated, isForceUpdate, remark, type }) {
    return request({
      url: '/api/source',
      method: 'PUT',
      data: {
        id,
        version,
        versionCode,
        nativeVersionCode,
        url,
        isFullUpdated,
        isForceUpdate,
        remark,
        type,
      },
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
