import { request } from '@/utils/request'

// 注册验证码
export function registerCaptchaApi() {
  return request({
    url: `/api/system/auth/captcha/register?t=${Date.now()}`,
    method: 'GET',
  })
}

// 注册
export function registerApi({ username, password, email, nickname, imgCaptcha, imgCaptchaKey }) {
  return request({
    url: '/api/system/auth/register',
    method: 'POST',
    data: { username, password, email, nickname, imgCaptcha, imgCaptchaKey },
  })
}

// 登录
export function loginApi({ username, password, imgCaptcha, loginCaptchaKey }) {
  return request({
    url: '/api/system/auth/login',
    method: 'POST',
    data: { username, password, imgCaptcha, loginCaptchaKey },
  })
}

// 登录验证码
export function loginCaptchaApi() {
  return request({
    url: `/api/system/auth/captcha/login?t=${Date.now()}`,
    method: 'GET',
  })
}
