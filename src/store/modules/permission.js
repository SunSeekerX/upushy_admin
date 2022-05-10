import { asyncRouterMap, constantRouterMap } from '@/router/index'
import { GENERATE_ROUTERS, RESET_ROUTERS } from '@/store/mutation-types'

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: [],
  },

  mutations: {
    // Generate routers
    [GENERATE_ROUTERS]: (state) => {
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
