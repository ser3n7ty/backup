import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function register(data) {
  return request({
    url: '/user/register',
    method: 'post',
    data
  })
}

// 查询所有用户信息
// data: {pageNum, pageSize, search}
export function query(data) {
  return request({
    url: '/user/query',
    method: 'get',
    data
  })
}

// 查询当前用户信息
export function getUserInfo() {
  return request({
    url: '/user/info',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/logout',
    method: 'get'
  })
}

// 删除用户
export function deleteUser(id) {
  return request({
    url: '/user/{id}',
    method: 'delete'
  })
}

// 修改用户基本信息
// data: {name, email}
export function updateInfo(data) {
  return request({
    url: 'user',
    method: 'put',
    data
  })
}

// 修改用户密码
// data: {oldPassword, newPassword}
export function changePassword(data) {
  return request({
    url: '',
    method: 'put',
    data
  })
}

// 发送验证码
export function sendVerifyCode(email) {
  return request({
    url: '/email/sendCode/{email}',
    method: 'get'
  })
}
