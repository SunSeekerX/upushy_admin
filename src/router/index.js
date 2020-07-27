/**
 * @name: 
 * @author: SunSeekerX
 * @Date: 2020-07-27 09:56:07
 * @LastEditors: SunSeekerX
 * @LastEditTime: 2020-07-27 16:57:19
 */

import Vue from 'vue'
import Router from 'vue-router'
import { constantRouterMap } from '@/config/router.config'

// hack router push callback
const originalPush = Router.prototype.push
Router.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)

const createRouter = () =>
  new Router({
    scrollBehavior: () => ({ y: 0 }),
    mode: 'history',
    routes: constantRouterMap,
  })

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  // reset router
  router.matcher = newRouter.matcher
}

export default router
