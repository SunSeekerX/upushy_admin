/**
 * @name:
 * @author: SunSeekerX
 * @Date: 2020-08-10 10:29:06
 * @LastEditors: SunSeekerX
 * @LastEditTime: 2020-10-28 22:56:18
 */

import moment from 'moment'

export * from './core/rsa-encrypt'

export function formatTime(timeStr) {
  return moment(timeStr).format('YYYY-MM-DD HH:mm:ss')
}

export function getUrlParams(url) {
  const obj = {}
  const index = url.indexOf('?') // 看url有没有参数
  const params = url.substr(index + 1) // 截取url参数部分 id = 1 & type = 2

  if (index !== -1) {
    // 有参数时
    const parr = params.split('&') // 将参数分割成数组 ["id = 1 ", " type = 2"]
    for (const i of parr) {
      // 遍历数组
      const arr = i.split('=') // 1） i id = 1   arr = [id, 1]  2）i type = 2  arr = [type, 2]
      obj[arr[0]] = arr[1] // obj[arr[0]] = id, obj.id = 1   obj[arr[0]] = type, obj.type = 2
    }
  }

  return obj
}

/**
 * 本算法来源于简书开源代码，详见：https://www.jianshu.com/p/fdbf293d0a85
 * 全局唯一标识符（uuid，Globally Unique Identifier）,也称作 uuid(Universally Unique IDentifier)
 * 一般用于多个组件之间,给它一个唯一的标识符,或者v-for循环的时候,如果使用数组的index可能会导致更新列表出现问题
 * 最可能的情况是左滑删除item或者对某条信息流"不喜欢"并去掉它的时候,会导致组件内的数据可能出现错乱
 * v-for的时候,推荐使用后端返回的id而不是循环的index
 * @param {Number} len uuid的长度
 * @param {Boolean} firstU 将返回的首字母置为"u"
 * @param {Nubmer} radix 生成uuid的基数(意味着返回的字符串都是这个基数),2-二进制,8-八进制,10-十进制,16-十六进制
 */
export function guid(len = 32, radix = null) {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split(
    '',
  )
  const uuid = []
  radix = radix || chars.length

  if (len) {
    // 如果指定uuid长度,只是取随机的字符,0|x为位运算,能去掉x的小数位,返回整数位
    for (let i = 0; i < len; i++) uuid[i] = chars[0 | (Math.random() * radix)]
  } else {
    let r
    // rfc4122标准要求返回的uuid中,某些位为固定的字符
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-'
    uuid[14] = '4'

    for (let i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | (Math.random() * 16)
        uuid[i] = chars[i === 19 ? (r & 0x3) | 0x8 : r]
      }
    }
  }
  return uuid.join('')
}

/**
 * @name 去除对象中有 [undefined, null, ''] 的情况
 * @param { Object } obj
 * @returns { Object } 处理完成之后的对象
 */
export function removeEmptyKey(obj = {}) {
  // 处理参数为 [undefined, null, ''] 情况
  for (const [key, value] of Object.entries(obj)) {
    if ([undefined, null, ''].includes(value)) {
      delete obj[key]
    }
  }
  return obj
}


/**
 * Convert Bytes to Human-Readable Format
 * @param { Number } bytes
 * @returns { String }
 */
export function bytesToSize(bytes) {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']

  if (bytes === 0) {
    return 'n/a'
  }

  const i = parseInt(String(Math.floor(Math.log(bytes) / Math.log(1024))))

  if (i === 0) {
    return bytes + ' ' + sizes[i]
  }

  return (bytes / Math.pow(1024, i)).toFixed(1) + ' ' + sizes[i]
}

/**
 * 秒数转换为具体时间
 * @param { Number } second 秒
 */
export function secToTime(second) {
  const sec = second % 60
  const min = (second / 60) % 60 >> 0
  const hour = (second / 60 / 60) % 24 >> 0
  const day = (second / 60 / 60 / 24) >> 0
  return {
    sec,
    min,
    hour,
    day,
  }
}
