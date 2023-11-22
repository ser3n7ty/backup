import request from '@/utils/request'

export function gainSystemInfo() {
  return request({
    url: '/system-info',
    method: 'get'
  })
}

export function gainTrafficData() {
  return request({
    url: '/traffic',
    method: 'get'
  })
}

export function gainAverageTime() {
  return request({
    url: '/time',
    method: 'get'
  })
}
export function gainWafNumber() {
  return request({
    url: '/waf-number',
    method: 'get'
  })
}
