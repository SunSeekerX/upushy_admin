/**
 * @name:
 * @author: SunSeekerX
 * @Date: 2020-07-27 09:56:07
 * @LastEditors: SunSeekerX
 * @LastEditTime: 2021-02-12 23:49:38
 */

import router from './router'
import store from './store'
import storage from 'store'
import NProgress from 'nprogress' // progress bar
import '@/components/NProgress/nprogress.less' // progress bar custom style
// import notification from 'ant-design-vue/es/notification'

import { handleRequestFail } from '@/utils/handle-error/handle-error'
import { setDocumentTitle, domTitle } from '@/utils/domUtil'
import { ACCESS_TOKEN, GENERATE_ROUTERS } from '@/store/mutation-types'
import { i18nRender } from '@/locales'
// import { asyncRouterMap } from '@/router/index'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['login', 'register', 'registerResult'] // no redirect whitelist
const loginRoutePath = '/user/login'
const defaultRoutePath = '/dashboard/workplace'

router.beforeEach(async (to, from, next) => {
  NProgress.start() // start progress bar

  to.meta &&
    typeof to.meta.title !== 'undefined' &&
    setDocumentTitle(`${i18nRender(to.meta.title)} - ${domTitle}`)

  const { config } = store.state
  if (!config.isUpdated) {
    try {
      await store.dispatch('getConfig')
    } catch (error) {
      handleRequestFail(error)
    }
  }

  /* has token */
  if (storage.get(ACCESS_TOKEN)) {
    if (to.path === loginRoutePath) {
      next({ path: defaultRoutePath })
      NProgress.done()
    } else {
      if (store.getters.addRouters.length === 0) {
        store.commit(GENERATE_ROUTERS)
        router.addRoutes(store.getters.addRouters)
        // for (const route of store.getters.addRouters) {
        //   router.addRoute(route)
        // }
        
        next({ ...to, replace: true })
      } else {
        next()
      }
    }
  } else {
    if (whiteList.includes(to.name)) {
      // 在免登录白名单，直接进入
      next()
    } else {
      next({ path: loginRoutePath })
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
