import request from '@/utils/request'

export function add(data) {
  return request({
    url: '/waf',
    method: 'post',
    data
  })
}

export function queryInfo(search) {
  const data = search
  return request({
    url: '/waf',
    method: 'get',
    data
  })
}

export function updateWafInfo(form) {
  return request({
    url: '/waf',
    method: 'put',
    form
  })
}

export function deleteWaf(id) {
  return request({
    url: '/waf',
    method: 'delete',
    id
  })
}

export function changeWafStatus(id, enable) {
  const data = {
    id, enable
  }
  return request({
    url: '/waf',
    method: 'put',
    data
  })
}

export function queryLog({ pageNum, pageSize, search }) {
  const data = {
    pageNum, pageSize, search
  }
  return request({
    url: '/request',
    method: 'get',
    data
  })
}

export function queryImage() {
  return request({
    url: '/image',
    method: 'get'
  })
}

export function deleteImage(id) {
  return request({
    url: '/image',
    method: 'delete',
    id
  })
}

export function createContainer({ name, imageId }) {
  return request({
    url: '/image/container/{name}/{imageId}',
    method: 'get'
  })
}

export function uploadImage(file) {
  return request({
    url: '/image/upload',
    method: 'post',
    file
  })
}
