import { getConfigApi } from '@/api'
import { SET_TDOA, SET_SYSTEM_CONFIG } from '@/store/mutation-types'

const config = {
  state: {
    // 是否更新
    isUpdated: false,
    // 时间差
    TDOA: 0,
    // 后台配置
    systemConfig: {},
  },
  mutations: {
    [SET_TDOA](state, tdoa) {
      state.TDOA = tdoa
      state.isUpdated = true
    },
    [SET_SYSTEM_CONFIG](state, systemConfig) {
      Object.assign(state.systemConfig, systemConfig)
    },
  },
  actions: {
    async getConfig({ commit }) {
      const res = await getConfigApi()

      if (res.statusCode === 200) {
        // 计算和服务器时间差
        const timestamp = new Date().getTime()
        const TDOA = timestamp - res.data.serviceTime
        commit(SET_TDOA, TDOA)
        commit(SET_SYSTEM_CONFIG, res.data)
      } else {
        return Promise.reject(res)
      }
    },
  },
}

export default config
