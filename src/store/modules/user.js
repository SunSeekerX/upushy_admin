import storage from 'store'

import { loginApi } from '@/api/index'
import { ACCESS_TOKEN, ACCESS_REFRESH_TOKEN, USER_INFO, LOGIN_OUT } from '@/store/mutation-types'
import { resetRouter } from '@/router/index'

const user = {
  state: {
    // token
    token: storage.get(ACCESS_TOKEN) || '',
    // refresh token
    refreshToken: storage.get(ACCESS_REFRESH_TOKEN) || '',
    // userInfo
    info: storage.get(USER_INFO) || {},
  },

  mutations: {
    [ACCESS_TOKEN]: (state, token) => {
      state.token = token
      storage.set(ACCESS_TOKEN, token)
    },
    [ACCESS_REFRESH_TOKEN]: (state, refreshToken) => {
      state.refreshToken = refreshToken
      storage.set(ACCESS_REFRESH_TOKEN, refreshToken)
    },
    [USER_INFO](state, info) {
      state.info = info
      storage.set(USER_INFO, info)
    },
    [LOGIN_OUT](state) {
      state.token = ''
      state.refreshToken = ''
      storage.remove(ACCESS_TOKEN)
      storage.remove(ACCESS_REFRESH_TOKEN)
      storage.remove(USER_INFO)
      // Reset router
      resetRouter()
    },
  },

  actions: {
    // Login
    Login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        loginApi(userInfo)
          .then((res) => {
            if (res.statusCode === 200) {
              commit(ACCESS_TOKEN, res.data.token)
              commit(ACCESS_REFRESH_TOKEN, res.data.refreshToken)
              commit(USER_INFO, res.data.userInfo)
              resolve(res)
            } else {
              reject(res)
            }
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
  },
}

export default user
