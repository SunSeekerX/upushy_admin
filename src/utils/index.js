/**
 * @name:
 * @author: SunSeekerX
 * @Date: 2020-08-10 10:29:06
 * @LastEditors: SunSeekerX
 * @LastEditTime: 2020-08-13 21:26:07
 */

import moment from 'moment'

import md5 from './core/md5'

export function formatTime(timeStr) {
  return moment(timeStr).format('YYYY-MM-DD HH:mm:ss')
}
export { md5 }
