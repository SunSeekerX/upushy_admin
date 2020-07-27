/**
 * @name: 
 * @author: SunSeekerX
 * @Date: 2020-07-27 11:15:25
 * @LastEditors: SunSeekerX
 * @LastEditTime: 2020-07-27 11:22:35
 */

import * as handleError from './handle-error'

export default function install(Vue) {
  // if (this.installed) {
  //   return
  // }
  // this.installed = true

  // if (!handleError) {
  //   // eslint-disable-next-line no-console
  //   console.error('You have to install axios')
  //   return
  // }

  Object.defineProperties(Vue.prototype, {
    $handleError: {
      get: function get() {
        return handleError
      },
    },
  })
}
