import request from '@utils/request'

export function add(data) {
  return request({
    url: '/waf',
    method: 'post',
    data
  })
}

export function query(page, size, search) {
  return request({
    url: '/waf',
    method: 'get',
    params: {
      page,
      size,
      search
    }
  })
}

export function updateWaf(name, ip, port, status, desc) {
  return request({
    url: '/waf',
    method: 'put',
    params: {
      name,
      ip,
      port,
      status,
      desc
    }
  })
}

export function deleteWaf(id) {
  return request({
    url: '/waf',
    method: 'delete',
    id
  })
}
