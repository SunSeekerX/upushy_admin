import * as handleError from './handle-error'

export default function install(Vue) {
  Object.defineProperties(Vue.prototype, {
    $handleError: {
      get: function get() {
        return handleError
      },
    },
  })
}
