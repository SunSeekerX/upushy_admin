/**
 * @name: 
 * @author: SunSeekerX
 * @Date: 2020-07-27 09:56:07
 * @LastEditors: SunSeekerX
 * @LastEditTime: 2020-07-27 16:51:37
 */
/**
 * 向后端请求用户的菜单，动态生成路由
 */
import { constantRouterMap, asyncRouterMap } from '@/config/router.config'
import { generatorDynamicRouter } from '@/router/generator-routers'

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    // SET_ROUTERS: (state, routers) => {
    //   state.addRouters = routers
    //   state.routers = constantRouterMap.concat(routers)
    // },

    SET_ROUTERS: (state) => {
      state.addRouters = asyncRouterMap
      state.routers = constantRouterMap.concat(asyncRouterMap)
    },
  },
  actions: {
    GenerateRoutes ({ commit }, data) {
      return new Promise(resolve => {
        const { token } = data
        generatorDynamicRouter(token).then(routers => {
          commit('SET_ROUTERS', routers)
          resolve()
        })
      })
    }
  }
}

export default permission
