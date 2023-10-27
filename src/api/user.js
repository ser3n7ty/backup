import request from '@/utils/request'
// TODO: 接口 URL 替换
// TODO： 接入本地 Mock
export function login(data) {
  return request({
    // url: '/user/login',
    url: '/vue-admin-template/user/login',
    method: 'post',
    data
  })
}

export function register(data) {
  return request({
    // url: '/user/register',
    url: '/vue-admin-template/user/register',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    // url: '/user/info',
    url: '/vue-admin-template/user/info',
    method: 'get',
    params: { token }
  })
}

export function getUserInfo(token) {
  return request({
    // url: '/user/info',
    url: '/vue-admin-template/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    // url: '/user/logout',
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
