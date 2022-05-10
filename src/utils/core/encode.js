function base64Encode2String(val) {
  return Buffer.from(val).toString('base64')
}

function base64Decode(val) {
  return Buffer.from(val, 'base64').toString('utf-8')
}

export { base64Encode2String, base64Decode }
