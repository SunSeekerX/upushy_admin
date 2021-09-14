import { request } from '@/utils/request/index'

// 获取字典列表
export function getDictList({ pageNum, pageSize }) {
  return request({
    url: '/api/dict/type',
    method: 'GET',
    params: {
      pageNum,
      pageSize,
    },
  })
}

// 新建字典类型
export function addDictType({ type, name, status, remark }) {
  return request({
    url: '/api/dict/type',
    method: 'POST',
    data: {
      name,
      type,
      status,
      remark,
    },
  })
}

// 删除字典类型
export function removeDictType({ id, ids }) {
  return request({
    url: '/api/dict/type',
    method: 'DELETE',
    data: {
      id,
      ids,
    },
  })
}

// 修改字典类型
export function editDictType({ id, type, name, status, remark }) {
  return request({
    url: '/api/dict/type',
    method: 'PUT',
    data: {
      id,
      name,
      type,
      status,
      remark,
    },
  })
}

// 获取字典数据列表
export function getDictDataList({ dictTypeId, pageNum, pageSize }) {
  return request({
    url: '/api/dict/data',
    method: 'GET',
    params: {
      dictTypeId,
      pageNum,
      pageSize,
    },
  })
}

// 新建字典数据
export function addDictData({ dictTypeId, label, value, sort, isDefault, status, remark }) {
  return request({
    url: '/api/dict/data',
    method: 'POST',
    data: {
      // 字典类型ID
      dictTypeId,
      // 字典标签
      label,
      // 字典键值
      value,
      // 字典排序
      sort,
      // 是否默认（0是 1否）
      isDefault,
      // 状态（0正常 1停用）
      status,
      // 备注
      remark,
    },
  })
}
// 删除字典数据
export function removeDictData({ id, ids }) {
  return request({
    url: '/api/dict/data',
    method: 'DELETE',
    data: {
      id,
      ids,
    },
  })
}

// 修改字典数据
export function editDictData({ id, label, value, sort, isDefault, status, remark }) {
  return request({
    url: '/api/dict/data',
    method: 'PUT',
    data: {
      // ID
      id,
      // 字典标签
      label,
      // 字典键值
      value,
      // 字典排序
      sort,
      // 是否默认（0是 1否）
      isDefault,
      // 状态（0正常 1停用）
      status,
      // 备注
      remark,
    },
  })
}
