import { request } from '@/utils/request'

// auth
// 注册验证码
export const registerCaptchaApi = () =>
  request({ url: `/api/system/auth/captcha/register?t=${Date.now()}`, method: 'GET' })
// 注册
export const registerApi = (data) => request({ url: '/api/system/auth/register', method: 'POST', data })
// 登录
export const loginApi = (data) => request({ url: '/api/system/auth/register', method: 'POST', data })
// 登录验证码
export const loginCaptchaApi = () => request({ url: `/api/system/auth/captcha/login?t=${Date.now()}`, method: 'GET' })

// common
// 系统配置
export const getConfigApi = () => request({ url: '/api/system/config', method: 'GET' })
// OSS临时访问
export const getOSSStsConfigApi = () => request({ url: '/api/upushy/basic/oss-sts', method: 'GET' })
// 系统信息
export const getSystemConfigApi = () => request({ url: '/api/system/info', method: 'GET' })

// project
// 项目列表
export const getProjectsApi = (data) => request({ url: '/api/upushy/projects', method: 'GET', params: data })
// 新建项目
export const createProjectApi = (data) => request({ url: '/api/upushy/projects', method: 'POST', data })
// 删除项目
export const deleteProjectApi = ({ id }) => request({ url: `/api/upushy/projects/${id}`, method: 'DELETE' })
// 更新项目
export const updateProjectApi = (data) => request({ url: `/api/upushy/projects/${data.id}`, method: 'PATCH', data })

// source
// 资源列表
export const getSourcesApi = (data) => request({ url: '/api/upushy/sources', method: 'GET', params: data })
// 新建资源
export const createSourceApi = (data) => request({ url: '/api/upushy/sources', method: 'POST', data })
// 修改资源
export const updateSourceApi = (data) => request({ url: `/api/upushy/sources/${data.id}`, method: 'PATCH', data })
// 删除资源
export const deleteSourceApi = (data) => request({ url: `/api/upushy/sources/${data.id}`, method: 'DELETE' })
// 查询最新的原生版本
export const getLatestNativeSourceApi = (data) =>
  request({ url: '/api/upushy/sources/native/latest', method: 'GET', params: data })

// system
// 登录日志列表
export const loginLogsApi = (data) => request({ url: '/api/upushy/log/login', method: 'GET', params: data })
