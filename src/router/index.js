import Vue from 'vue'
import Router from 'vue-router'

import BasicLayout from '@/layouts/basic-layout'
import UserLayout from '@/layouts/user-layout'

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
    name: 'PathIndex',
    component: BasicLayout,
    meta: { title: 'menu.home' },
    redirect: '/charts',
    children: [
      // 图表
      {
        path: '/charts',
        name: 'PathCharts',
        component: () => import('@/views/dashboard/charts'),
        meta: {
          title: '统计图表',
          icon: 'pie-chart',
          keepAlive: true,
          permission: ['charts'],
        },
      },

      // 账户设置
      {
        path: '/account/settings',
        name: 'PageAccountSettingsIndex',
        hidden: true,
        component: () => import('@/views/account/settings/index'),
        redirect: '/account/settings/basic',
        meta: {
          title: '账户设置',
          keepAlive: false,
          permission: ['account.settings'],
        },
        children: [
          {
            title: '基础设置',
            path: 'basic',
            name: 'PageAccountSettingsBasic',
            component: () =>
              import(/* webpackChunkName: "PageAccountSettingsBasic" */ '@/views/account/settings/basic-setting'),
          },
          {
            title: '安全设置',
            path: 'security',
            name: 'PageAccountSettingsSecurity',
            component: () =>
              import(/* webpackChunkName: "PageAccountSettingsSecurity" */ '@/views/account/settings/security-setting'),
          },
          {
            title: '系统设置',
            path: 'system',
            name: 'PageAccountSettingsSystem',
            component: () =>
              import(/* webpackChunkName: "PageAccountSettingsSystem" */ '@/views/account/settings/system-setting'),
          },
        ],
      },

      // 我的项目
      {
        path: '/project',
        name: 'PathProject',
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
            name: 'PathProjects',
            component: () => import('@/views/project'),
            meta: {
              title: '项目列表',
              permission: ['project'],
            },
          },
          {
            path: 'sources',
            name: 'PathProjectSources',
            component: () => import('@/views/source'),
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
        name: 'PathMonitorServer',
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
        name: 'PathSystemLogLogin',
        component: () => import('@/views/system/log/login'),
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
    path: '/auth',
    component: UserLayout,
    redirect: '/auth/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'PathLogin',
        component: () => import(/* webpackChunkName: "login" */ '@/views/auth/login'),
      },
      {
        path: 'register',
        name: 'PathRegister',
        component: () => import(/* webpackChunkName: "register" */ '@/views/auth/register'),
      },
    ],
  },

  {
    path: '/404',
    name: 'PathException404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404'),
  },
]

// Hack router push callback
const originalPush = Router.prototype.push
Router.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch((err) => err)
}

Vue.use(Router)

const createRouter = () =>
  new Router({
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRouterMap,
  })

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

export default router
