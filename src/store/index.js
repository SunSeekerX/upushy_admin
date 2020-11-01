/**
 * @name:
 * @author: SunSeekerX
 * @Date: 2020-07-26 17:49:41
 * @LastEditors: SunSeekerX
 * @LastEditTime: 2020-11-01 21:22:52
 */

import Vue from 'vue'
import Vuex from 'vuex'

import app from './modules/app'
import config from './modules/config'
import user from './modules/user'
import permission from './modules/permission'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    config,
    user,
    permission,
  },
  getters: {
    isMobile: state => state.app.isMobile,
    lang: state => state.app.lang,
    theme: state => state.app.theme,
    color: state => state.app.color,
    token: state => state.user.token,
    refreshToken: state => state.user.refreshToken,
    userInfo: state => state.user.info,
    addRouters: state => state.permission.addRouters,
  },
})
