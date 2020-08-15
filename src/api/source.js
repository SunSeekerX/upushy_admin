/**
 * @name:
 * @author: SunSeekerX
 * @Date: 2020-07-28 09:52:25
 * @LastEditors: SunSeekerX
 * @LastEditTime: 2020-08-15 13:31:40
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
  createSource({ projectId, version, versionCode, nativeVersionCode, url, isForceUpdate, type, changelog, remark }) {
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
        changelog,
        remark,
      },
    })
  },

  // 修改资源
  updateSource({ id, version, versionCode, nativeVersionCode, url, isFullUpdated, isForceUpdate, changelog, remark, type }) {
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
        changelog,
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
