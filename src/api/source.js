import { request } from '@/utils/request'

// 资源列表
export function getSourcesApi({ id, type, pageNum, pageSize, sortKey, order }) {
  return request({
    url: '/api/upushy/sources',
    method: 'GET',
    params: {
      projectId: id,
      type,
      pageNum,
      pageSize,
      sortKey,
      order,
    },
  })
}

// 新建资源
export function createSourceApi({
  projectId,
  version,
  versionCode,
  nativeVersionCode,
  url,
  updateType,
  status,
  type,
  changelog,
  remark,
}) {
  return request({
    url: '/api/upushy/sources',
    method: 'POST',
    data: {
      projectId,
      version,
      versionCode,
      nativeVersionCode,
      url,
      updateType,
      status,
      type,
      changelog,
      remark,
    },
  })
}

// 修改资源
export function updateSourceApi({
  id,
  version,
  versionCode,
  nativeVersionCode,
  url,
  updateType,
  changelog,
  remark,
  type,
  status,
}) {
  return request({
    url: `/api/upushy/sources/${id}`,
    method: 'PATCH',
    data: {
      id,
      version,
      versionCode,
      nativeVersionCode,
      url,
      updateType,
      changelog,
      remark,
      type,
      status,
    },
  })
}

// 删除资源
export function deleteSourceApi({ id }) {
  return request({
    url: `/api/upushy/sources/${id}`,
    method: 'DELETE',
  })
}

// 查询最新的原生版本
export function getLatestNativeSourceApi({ projectId }) {
  return request({
    url: '/api/upushy/sources/native/latest',
    method: 'GET',
    params: {
      // 项目id
      projectId,
    },
  })
}
