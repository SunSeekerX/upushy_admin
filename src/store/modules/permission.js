/**
 * @name:
 * @author: SunSeekerX
 * @Date: 2020-07-26 17:49:41
 * @LastEditors: SunSeekerX
 * @LastEditTime: 2020-11-01 20:29:45
 */

import { asyncRouterMap, constantRouterMap } from '@/router/index'
import { GENERATE_ROUTERS, RESET_ROUTERS } from '@/store/mutation-types'

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: [],
  },

  mutations: {
    // Generate routers
    [GENERATE_ROUTERS]: state => {
      state.addRouters = asyncRouterMap
      state.routers = constantRouterMap.concat(asyncRouterMap)
    },
    // Reset routers
    [RESET_ROUTERS](state) {
      state.routers = constantRouterMap
      state.addRouters = []
    },
  },
}

export default permission
