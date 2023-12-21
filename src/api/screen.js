import request from '@/utils/request'

export function gainSystemInfo() {
  return request({
    url: '/stat/system-info',
    method: 'get'
  })
}

export function gainTrafficData() {
  return request({
    url: '/stat/traffic',
    method: 'get'
  })
}

export function gainAverageTime() {
  return request({
    url: '/stat/time',
    method: 'get'
  })
}
export function gainWafNumber() {
  return request({
    url: '/stat/waf-number',
    method: 'get'
  })
}
export function gainAnimationData() {
  return request({
    url: '/stat/cart',
    method: 'get'
  })
}
export function initCart() {
  return request({
    url: '/stat/init',
    method: 'get'
  })
}

export function getLogs() {
  return request({
    url: '/stat/log',
    method: 'get'
  })
}
