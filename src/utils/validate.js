/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

// 简单验证邮箱账号的格式
export function validEmail(email) {
  const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
  return mailReg.test(email)
}

export function validPwd(pwd) {
  const pwdReg = /^(?![0-9]+$)(?![a-zA-Z]+ $)[0-9A-Za-z]{8,16}$/
  return pwdReg.test(pwd)
}

export function validIP(ip) {
  const ipReg = /^((2((5[0-5])|([0-4]\d)))|([0-1]?\d{1,2}))(\.((2((5[0-5])|([0-4]\d)))|([0-1]?\d{1,2}))){3}$/
  return ipReg.test(ip)
}

// 格式: http(s)://ipv4:port
export function validServer(data) {
  const regex = /^(https?:\/\/)(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}):(\d{1,5})$/
  return regex.test(data)
}
