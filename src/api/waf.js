import request from '@/utils/request'

export function add(data) {
  return request({
    url: '/waf',
    method: 'post',
    data
  })
}

export function query(pageNum, pageSize, search) {
  const data = {
    pageNum, pageSize, search
  }
  return request({
    url: '/waf',
    method: 'get',
    data
  })
}

export function updateWaf(form) {
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

export function changeEnable(id, enable) {
  const data = {
    id, enable
  }
  return request({
    url: '/waf',
    method: 'put',
    data
  })
}
