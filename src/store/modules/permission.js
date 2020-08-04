/**
 * @name:
 * @author: SunSeekerX
 * @Date: 2020-07-26 17:49:41
 * @LastEditors: SunSeekerX
 * @LastEditTime: 2020-08-04 09:18:43
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

    RESET_ROUTER(state) {
      state.routers = constantRouterMap
      state.addRouters = []
    },
  },
}

export default permission
