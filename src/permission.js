import router from './router'
import store from './store'
import storage from 'store'
import NProgress from 'nprogress'
import '@/components/NProgress/nprogress.less'
// import notification from 'ant-design-vue/es/notification'

import { handleRequestFail } from '@/utils/handle-error/handle-error'
import { setDocumentTitle, domTitle } from '@/utils/domUtil'
import { ACCESS_TOKEN, GENERATE_ROUTERS } from '@/store/mutation-types'
import { i18nRender } from '@/locales'

NProgress.configure({ showSpinner: false })

const whiteList = ['Login', 'Register', 'RegisterResult']
const loginRoutePath = '/user/login'
const defaultRoutePath = '/dashboard/workplace'

router.beforeEach(async (to, from, next) => {
  NProgress.start()
  to.meta && typeof to.meta.title !== 'undefined' && setDocumentTitle(`${i18nRender(to.meta.title)} - ${domTitle}`)

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
        store.getters.addRouters.forEach((r) => {
          router.addRoute(r)
        })
        // router.addRoutes(store.getters.addRouters)
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
      next()
    } else {
      next({ path: loginRoutePath })
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
