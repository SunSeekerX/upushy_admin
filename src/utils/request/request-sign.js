/**
 * @name:
 * @author: SunSeekerX
 * @Date: 2020-08-17 09:41:41
 * @LastEditors: SunSeekerX
 * @LastEditTime: 2020-08-17 18:00:00
 */

import md5 from 'md5'

import store from '@/store/index'
import { guid, removeEmptyKey, rsaEncrypted } from '@/utils/index'

const VUE_APP_API_RSA_PUBLIC_KEY = process.env.VUE_APP_API_RSA_PUBLIC_KEY

export function createSign(config) {
  const { TDOA } = store.state.config

  const uuidStr = guid()
  const timestampStr = String(new Date().getTime() - TDOA)
  let keys = [uuidStr, timestampStr]

  switch (config.method.toUpperCase()) {
    case 'POST':
    case 'DELETE':
    case 'PUT':
      // 处理参数为undefined情况
      removeEmptyKey(config.data)
      const obj = {}
      for (const [key, value] of config.data && config.data.entries()) {
        if (value instanceof File) {
          continue
        }
        obj[key] = value
      }
      // 合并post参数
      keys = keys.concat(Object.keys(obj))
      keys = keys.concat(Object.values(obj))
      break
    case 'GET':
      // 处理参数为undefined情况
      removeEmptyKey(config.params)
      // 合并get参数
      keys = keys.concat(Object.keys(config.params ?? {}))
      keys = keys.concat(Object.values(config.params ?? {}))
      break

    default:
      break
  }

  const signStrArr = []
  for (const item of keys) {
    signStrArr.push(String(item))
  }

  const Sign = md5(signStrArr.sort().toString())
  const Nonce = rsaEncrypted(VUE_APP_API_RSA_PUBLIC_KEY, `${uuidStr},${timestampStr}`)

  config.headers['Nonce'] = Nonce
  config.headers['Sign'] = Sign
}
