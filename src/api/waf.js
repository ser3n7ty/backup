import request from '@utils/request'

export function add(data) {
  return request({
    url: '/new/waf',
    method: 'post',
    data
  })
}

export function queryAll() {
  return request({
    url: ''
  })
}
