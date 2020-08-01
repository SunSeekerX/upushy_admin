// eslint-disable-next-line
import { UserLayout, BasicLayout, BlankLayout } from '@/layouts'
import { bxAnaalyse } from '@/core/icons'

const RouteView = {
  name: 'RouteView',
  render: h => h('router-view'),
}

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
          icon: bxAnaalyse,
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
          // 外部链接
          // {
          //   path: 'https://www.baidu.com/',
          //   name: 'Monitor',
          //   meta: { title: 'menu.dashboard.monitor', target: '_blank' }
          // },
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
          // {
          //   path: '/list/table-list/:pageNo([1-9]\\d*)?',
          //   name: 'TableListWrapper',
          //   hideChildrenInMenu: true, // 强制显示 MenuItem 而不是 SubMenu
          //   component: () => import('@/views/list/TableList'),
          //   meta: { title: '查询表格', keepAlive: true, permission: ['table'] },
          // },
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
      // dict
      {
        path: '/dict',
        component: RouteView,
        redirect: '/dict/center',
        name: 'dict',
        meta: {
          title: '数据字典',
          icon: 'user',
          permission: ['user'],
        },
        children: [
          {
            path: '/dict/center',
            name: 'dictHome',
            component: () => import('@/views/dict/dict.vue'),
            meta: { title: '字典首页', permission: ['user'] },
          },
        ],
      },
    ],
  },

  // {
  //   path: '*',
  //   redirect: '/404',
  //   hidden: true,
  // },
]

/**
 * 基础路由
 * @type { *[] }
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
