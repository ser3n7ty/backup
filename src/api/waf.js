import request from '@/utils/request'

export function add(data) {
  return request({
    url: '/waf',
    method: 'post',
    data
  })
}

export function queryInfo(pageNum, pageSize, search) {
  const data = {
    pageNum, pageSize, search
  }
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
