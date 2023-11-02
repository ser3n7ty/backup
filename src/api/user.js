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
export function query(page, size, search) {
  return request({
    url: '/user/query',
    method: 'get',
    data: {
      page,
      size,
      search
    }
  })
}

// 查询当前用户信息
export function getUserInfo() {
  return request({
    url: '/user/info',
    method: 'get'
  })
}

// 删除用户
export function deleteUser(id) {
  return request({
    url: '/user/${id}',
    method: 'delete'
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

export function update(form) {
  return request({
    url: 'user',
    method: 'put',
    form
  })
}
