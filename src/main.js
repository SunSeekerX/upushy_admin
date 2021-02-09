/**
 * @name:
 * @author: SunSeekerX
 * @Date: 2020-07-26 17:49:41
 * @LastEditors: SunSeekerX
 * @LastEditTime: 2021-02-09 16:04:36
 */

/**
 * @name 引入依赖库
 */
// with polyfills
import 'core-js/stable'
import 'regenerator-runtime/runtime'
import Vue from 'vue'
import moment from 'moment'

/**
 * @name 引入文件
 */
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import i18n from './locales/index'
import ProLayout, { PageHeaderWrapper } from '@ant-design-vue/pro-layout'
import themePluginConfig from '../config/themePluginConfig'
import * as api from './api/index'
import * as util from './utils/index'
import HandleError from './utils/handle-error/index'


import bootstrap from './utils/bootstrap'
import './utils/lazy-use'
import './permission' // permission control
import './utils/filter' // global filter
import './global.less'

/**
 * @name 依赖设置
 */
Vue.config.productionTip = false

/**
 * @name 挂载全局组件和安装插件
 */
Vue.use(HandleError)
Vue.component('pro-layout', ProLayout)
Vue.component('page-header-wrapper', PageHeaderWrapper)

/**
 * @name 挂载原型属性
 */
Vue.prototype.$api = api
Vue.prototype.$util = util
Vue.prototype.$moment = moment

window.umi_plugin_ant_themeVar = themePluginConfig.theme

new Vue({
  router,
  store,
  i18n,
  created: bootstrap,
  render: h => h(App),
}).$mount('#app')
