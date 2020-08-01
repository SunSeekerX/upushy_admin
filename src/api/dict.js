import { request } from '@/utils/request/index'

export default {
  // 项目列表
  getDictList({ pageNum, pageSize }) {
    return request({
      url: '/api/dict/type',
      method: 'GET',
      data: {
        pageNum,
        pageSize,
      },
    })
  },

  // 新建项目
  addDict({ type, name, status, remark }) {
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
  },
  editDict({ id, type, name, status, remark }) {
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
  },
  removeDict({ id, ids }) {
    return request({
      url: '/api/dict/type',
      method: 'DELETE',
      data: {
        id,
        ids,
      },
    })
  },
}
