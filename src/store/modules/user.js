/**
 * @name:
 * @author: SunSeekerX
 * @Date: 2020-07-26 17:49:41
 * @LastEditors: SunSeekerX
 * @LastEditTime: 2020-08-03 23:02:31
 */
import storage from 'store'

import { Auth } from '@/api/index'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { resetRouter } from '@/router/index'

const user = {
  state: {
    token: '',
    name: '',
    avatar: '',
    info: {},
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_INFO: (state, info) => {
      state.info = info
    },

    LOGIN_OUT(state) {
      state.token = ''
      storage.remove(ACCESS_TOKEN)

      // 重置路由
      resetRouter()
    },
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        Auth.login(userInfo)
          .then(res => {
            if (res.success) {
              storage.set(ACCESS_TOKEN, res.data.token, 7 * 24 * 60 * 60 * 1000)
              commit('SET_TOKEN', res.data.token)
              resolve(res)
            } else {
              reject(res)
            }
          })
          .catch(error => {
            reject(error)
          })
      })
    },
  },
}

export default user
