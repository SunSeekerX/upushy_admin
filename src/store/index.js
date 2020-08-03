/**
 * @name:
 * @author: SunSeekerX
 * @Date: 2020-07-26 17:49:41
 * @LastEditors: SunSeekerX
 * @LastEditTime: 2020-08-03 23:06:25
 */

import Vue from 'vue'
import Vuex from 'vuex'

import app from './modules/app'
import user from './modules/user'
import permission from './modules/permission'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    user,
    permission,
  },
  getters: {
    isMobile: state => state.app.isMobile,
    lang: state => state.app.lang,
    theme: state => state.app.theme,
    color: state => state.app.color,
    token: state => state.user.token,
    avatar: state => state.user.avatar,
    nickname: state => state.user.name,
    welcome: state => state.user.welcome,
    roles: state => state.user.roles,
    userInfo: state => state.user.info,
    addRouters: state => state.permission.addRouters,
    multiTab: state => state.app.multiTab,
  },
})
