import { JSEncrypt } from 'jsencrypt'

const encryptor = new JSEncrypt()

/**
 * @name EncryptedData
 * @param {String} publicKey 公钥
 * @param {Any} data 需要加密的数据，只支持原生类型、及能够通过 JSON.stringify 序列化的对象
 */
function rsaEncrypted(publicKey, data) {
  encryptor.setPublicKey(publicKey)
  return encryptor.encrypt(data)
}

/**
 * @name DecryptData
 * @param {*} privateKey 私钥
 * @param {*} data 需要解密的串
 */
function rsaDecrypt(privateKey, data) {
  encryptor.setPrivateKey(privateKey)
  return encryptor.decrypt(data)
}

export { rsaEncrypted, rsaDecrypt }
