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

export function changeWafStatus(data) {
  // 0 表示上线， 1 表示下线
  if (data.op === 0) {
    return request({
      url: '/waf/online/{data.id}'
    })
  } else if (data.op === 1) {
    return request({
      url: '/waf/offline/{data.id}'
    })
  }
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
