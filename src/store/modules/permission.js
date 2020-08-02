/**
 * @name:
 * @author: SunSeekerX
 * @Date: 2020-07-26 17:49:41
 * @LastEditors: SunSeekerX
 * @LastEditTime: 2020-08-02 18:56:08
 */

import { asyncRouterMap, constantRouterMap } from '@/router/index'

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: [],
  },

  mutations: {
    // 生成路由
    GENNERAT_ROUTES: state => {
      state.addRouters = asyncRouterMap
      state.routers = constantRouterMap.concat(asyncRouterMap)
    },
  },
}

export default permission
