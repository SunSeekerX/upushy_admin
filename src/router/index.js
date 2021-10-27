/**
 * 路由配置
 * @author: SunSeekerX
 * @Date: 2020-07-27 09:56:07
 * @LastEditors: SunSeekerX
 * @LastEditTime: 2021-09-15 20:36:45
 */

import Vue from 'vue'
import Router from 'vue-router'

import { UserLayout, BasicLayout } from '@/layouts'

const RouteView = {
  name: 'RouteView',
  render: (h) => h('router-view'),
}

/**
 * @name 异步添加路由
 */
export const asyncRouterMap = [
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: 'menu.home' },
    redirect: '/charts',
    children: [
      // 图表
      {
        path: '/charts',
        name: 'Charts',
        component: () => import('@/views/dashboard/charts'),
        meta: {
          title: '统计图表',
          icon: 'pie-chart',
          keepAlive: true,
          permission: ['charts'],
        },
      },

      // 我的项目
      {
        path: '/project',
        name: 'Project',
        redirect: '/project/projects',
        hideChildrenInMenu: true,
        component: RouteView,
        meta: {
          title: '我的项目',
          icon: 'appstore',
          permission: ['project'],
        },
        children: [
          {
            path: 'projects',
            name: 'Projects',
            component: () => import('@/views/project/Projects'),
            meta: {
              title: '项目列表',
              permission: ['project'],
            },
          },
          {
            path: 'sources',
            name: 'ProjectSources',
            component: () => import('@/views/source/Sources'),
            meta: {
              title: '资源列表',
              permission: ['project'],
            },
          },
        ],
      },

      // 系统监控
      {
        path: '/monitor/server',
        name: 'MonitorServer',
        component: () => import('@/views/monitor/server'),
        meta: {
          title: '系统监控',
          icon: 'area-chart',
          keepAlive: true,
          permission: ['dashboard'],
        },
      },

      // 登录日志
      {
        path: '/system/log/login',
        name: 'SystemLogLogin',
        component: () => import('@/views/system/log/login/index'),
        meta: {
          title: '登录日志',
          icon: 'file-done',
          keepAlive: true,
          permission: ['dashboard'],
        },
      },
    ],
  },

  {
    path: '*',
    redirect: '/404',
    hidden: true,
  },
]

/**
 * @name 固定路由未登录即可使用
 */
export const constantRouterMap = [
  {
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'Login',
        component: () => import(/* webpackChunkName: "login" */ '@/views/user/Login'),
      },
      {
        path: 'register',
        name: 'Register',
        component: () => import(/* webpackChunkName: "register" */ '@/views/user/Register'),
      },
      {
        path: 'register-result',
        name: 'RegisterResult',
        component: () => import(/* webpackChunkName: "register-result" */ '@/views/user/RegisterResult'),
      },
      // {
      //   path: 'recover',
      //   name: 'recover',
      //   component: undefined,
      // },
    ],
  },

  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404'),
  },
]

// hack router push callback
const originalPush = Router.prototype.push
Router.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch((err) => err)
}

Vue.use(Router)

const createRouter = () =>
  new Router({
    scrollBehavior: () => ({ y: 0 }),
    // mode: 'history',
    routes: constantRouterMap,
  })

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

export default router
