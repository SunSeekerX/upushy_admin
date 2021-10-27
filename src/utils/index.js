import dayjs from 'dayjs'
import QRCode from 'qrcode'

export * from './core/rsa-encrypt'
export * from './core/encode'

export function formatTime(timeStr) {
  return dayjs(timeStr).format('YYYY-MM-DD HH:mm:ss')
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
 * 来源：https://www.jianshu.com/p/fdbf293d0a85
 * @param { Number } len uuid 长度
 * @param { Number } radix 基数
 */
export function guid(len = 32, radix = 16) {
  const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
  const uuid = []
  let i = 0
  radix = radix || chars.length

  if (len) {
    // Compact form
    for (i = 0; i < len; i++) uuid[i] = chars[0 | (Math.random() * radix)]
  } else {
    // rfc4122, version 4 form
    let r

    // rfc4122 requires these characters
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-'
    uuid[14] = '4'

    // Fill in random data.  At i==19 set the high bits of clock sequence as
    // per rfc4122, sec. 4.1.5
    for (i = 0; i < 36; i++) {
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
export function removeEmptyKey(obj = {}, rule = [undefined, null, '']) {
  // 处理参数为 [undefined, null, ''] 情况
  for (const [key, value] of Object.entries(obj)) {
    if (rule.includes(value)) {
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

/**
 * @name 二维码生成
 * @property { string } 二维码内容
 * @return { string } 二维码 base64
 */
// 生成base64二维码图片
export function strToQrcodeBase64(str, options) {
  options = Object.assign({ width: 200, margin: 0, colorDark: '#000000', colorLight: '#ffffff' }, options)
  return new Promise((resolve, reject) => {
    QRCode.toDataURL(
      str,
      {
        width: options.width,
        margin: options.margin,
        color: {
          dark: options.colorDark,
          light: options.colorLight,
        },
      },
      (err, url) => {
        err ? reject(err) : resolve(url)
      }
    )
  })
}
