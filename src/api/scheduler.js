import request from '@/utils/request'

export function getCert() {
  return request({
    url: '/cert',
    method: 'get'
  })
}

export function getRule() {
  return request({
    url: '/rule',
    method: 'get'
  })
}

export function changeWeight(data) {
  return request({
    url: '/weight',
    method: 'post',
    data
  })
}

export function uploadImage(data) {
  return request({
    url: '/image/upload',
    method: 'post',
    data
  })
}

export function modifyProtectionMode(data) {
  return request({
    url: '/waf/method',
    method: 'post',
    data
  })
}

export function acquireSiteInfo() {
  return request({
    url: '/site',
    method: 'get'
  })
}

export function updateSiteInfo(form) {
  return request({
    url: '/site',
    method: 'post'
  })
}

export function deleteSite(data) {
  return request({
    url: '/site',
    method: 'delete',
    data
  })
}

export function getSchedulerWafInfo() {
  return request({
    url: '/scheduler/waf',
    method: 'get'
  })
}

export function modifyOnlineWaf(ids) {
  return request({
    url: 'scheduler/waf',
    method: 'post',
    ids
  })
}
