/**
 * @name:
 * @author: SunSeekerX
 * @Date: 2020-07-27 09:56:07
 * @LastEditors: SunSeekerX
 * @LastEditTime: 2020-08-02 19:17:23
 */
import router from './router'
// import store from './store'
import storage from 'store'
import NProgress from 'nprogress' // progress bar
import '@/components/NProgress/nprogress.less' // progress bar custom style
// import notification from 'ant-design-vue/es/notification'

import { setDocumentTitle, domTitle } from '@/utils/domUtil'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { i18nRender } from '@/locales'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['login', 'register', 'registerResult'] // no redirect whitelist
const loginRoutePath = '/user/login'
const defaultRoutePath = '/dashboard/workplace'

router.beforeEach(async (to, from, next) => {
  NProgress.start() // start progress bar

  to.meta &&
    typeof to.meta.title !== 'undefined' &&
    setDocumentTitle(`${i18nRender(to.meta.title)} - ${domTitle}`)

  /* has token */
  if (storage.get(ACCESS_TOKEN)) {
    if (to.path === loginRoutePath) {
      next({ path: defaultRoutePath })
      NProgress.done()
    } else {
      next()
      // if (store.state.permission.addRouters.length === 0) {
      //   console.log(123123);
      //   store.commit('GENNERAT_ROUTES')
      //   // 动态添加可访问路由表
      //   router.addRoutes(store.getters.addRouters)
      // }

      // 请求带有 redirect 重定向时，登录自动重定向到该地址
      // const redirect = decodeURIComponent(from.query.redirect || to.path)
      // if (to.path === redirect) {
      //   // set the replace: true so the navigation will not leave a history record
      //   next({ ...to, replace: true })
      // } else {
      //   // 跳转到目的路由
      //   next({ path: redirect })
      // }
    }
  } else {
    if (whiteList.includes(to.name)) {
      // 在免登录白名单，直接进入
      next()
    } else {
      next({ path: loginRoutePath, query: { redirect: to.fullPath } })
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
