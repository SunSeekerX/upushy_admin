/**
 * @name: 
 * @author: SunSeekerX
 * @Date: 2020-07-27 09:56:07
 * @LastEditors: SunSeekerX
 * @LastEditTime: 2020-08-03 15:31:25
 */

// eslint-disable-next-line
import Vue from 'vue'
import Router from 'vue-router'

import { UserLayout, BasicLayout } from '@/layouts'

const RouteView = {
  name: 'RouteView',
  render: h => h('router-view'),
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
    redirect: '/dashboard/workplace',
    children: [
      // dashboard
      {
        path: '/dashboard',
        name: 'dashboard',
        redirect: '/dashboard/workplace',
        component: RouteView,
        meta: {
          title: 'menu.dashboard',
          keepAlive: true,
          icon: 'appstore',
          permission: ['dashboard'],
        },
        children: [
          {
            path: '/dashboard/analysis/:pageNo([1-9]\\d*)?',
            name: 'Analysis',
            component: () => import('@/views/dashboard/Analysis'),
            meta: {
              title: 'menu.dashboard.analysis',
              keepAlive: false,
              permission: ['dashboard'],
            },
          },

          {
            path: '/dashboard/workplace',
            name: 'Workplace',
            component: () => import('@/views/dashboard/Workplace'),
            meta: {
              title: 'menu.dashboard.workplace',
              keepAlive: true,
              permission: ['dashboard'],
            },
          },
        ],
      },

      // project
      {
        path: '/project',
        name: 'project',
        component: RouteView,
        redirect: '/project/projects',
        meta: { title: '项目', icon: 'table', permission: ['project'] },
        children: [
          {
            path: '/project/projects',
            name: 'BasicProject',
            component: () => import('@/views/project/Projects'),
            meta: {
              title: '所有项目',
              keepAlive: true,
              permission: ['project'],
            },
          },
        ],
      },

      // source
      {
        path: '/source',
        name: 'source',
        hidden: true,
        component: RouteView,
        redirect: '/source/sources',
        meta: { title: '资源', icon: 'table', permission: ['source'] },
        children: [
          {
            path: '/source/sources/:id([1-9]\\d*)?',
            name: 'BasicSource',
            component: () => import('@/views/source/Sources'),
            meta: {
              title: '所有资源',
              keepAlive: true,
              permission: ['source'],
            },
          },
        ],
      },

      // account
      {
        path: '/account',
        component: RouteView,
        redirect: '/account/center',
        name: 'account',
        hidden:true,
        meta: {
          title: '个人页',
          icon: 'user',
          keepAlive: true,
          permission: ['user'],
        },
        children: [
          {
            path: '/account/center',
            name: 'center',
            component: () => import('@/views/account/center'),
            meta: { title: '个人中心', keepAlive: true, permission: ['user'] },
          },
          {
            path: '/account/settings',
            name: 'settings',
            component: () => import('@/views/account/settings/Index'),
            meta: { title: '个人设置', hideHeader: true, permission: ['user'] },
            redirect: '/account/settings/base',
            hideChildrenInMenu: true,
            children: [
              {
                path: '/account/settings/base',
                name: 'BaseSettings',
                component: () => import('@/views/account/settings/BaseSetting'),
                meta: { title: '基本设置', hidden: true, permission: ['user'] },
              },
              {
                path: '/account/settings/security',
                name: 'SecuritySettings',
                component: () => import('@/views/account/settings/Security'),
                meta: {
                  title: '安全设置',
                  hidden: true,
                  keepAlive: true,
                  permission: ['user'],
                },
              },
              {
                path: '/account/settings/custom',
                name: 'CustomSettings',
                component: () => import('@/views/account/settings/Custom'),
                meta: {
                  title: '个性化设置',
                  hidden: true,
                  keepAlive: true,
                  permission: ['user'],
                },
              },
              {
                path: '/account/settings/binding',
                name: 'BindingSettings',
                component: () => import('@/views/account/settings/Binding'),
                meta: {
                  title: '账户绑定',
                  hidden: true,
                  keepAlive: true,
                  permission: ['user'],
                },
              },
              {
                path: '/account/settings/notification',
                name: 'NotificationSettings',
                component: () =>
                  import('@/views/account/settings/Notification'),
                meta: {
                  title: '新消息通知',
                  hidden: true,
                  keepAlive: true,
                  permission: ['user'],
                },
              },
            ],
          },
        ],
      },

      // System
      {
        path: '/system',
        component: RouteView,
        redirect: '/system/dict',
        name: 'system',
        meta: {
          title: '系统管理',
          icon: 'setting',
          permission: ['user'],
        },
        children: [
          {
            path: '/system/dict',
            name: 'dictHome',
            component: () => import('@/views/sys/dict/Dict'),
            meta: { title: '数据字典', icon: 'edit',  keepAlive: true, permission: ['user'] },
          },
          {
            path: '/system/dict-data',
            name: 'dictData',
            hidden: true,
            component: () => import('@/views/sys/dictData/DictData'),
            meta: { title: '数据字典详情', icon: 'edit', permission: ['user'] },
          },
        ],
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
        name: 'login',
        component: () =>
          import(/* webpackChunkName: "user" */ '@/views/user/Login'),
      },
      {
        path: 'register',
        name: 'register',
        component: () =>
          import(/* webpackChunkName: "user" */ '@/views/user/Register'),
      },
      {
        path: 'register-result',
        name: 'registerResult',
        component: () =>
          import(/* webpackChunkName: "user" */ '@/views/user/RegisterResult'),
      },
      {
        path: 'recover',
        name: 'recover',
        component: undefined,
      },
    ],
  },

  {
    path: '/404',
    component: () =>
      import(/* webpackChunkName: "fail" */ '@/views/exception/404'),
  },
]

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
router.addRoutes(asyncRouterMap)

export function resetRouter() {
  const newRouter = createRouter()
  // reset router
  router.matcher = newRouter.matcher
}

export default router
