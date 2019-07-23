import request from '@/utils/request'

export function getRoles(params) {
  return request({
    url: '/role/select',
    method: 'get',
    params: params
  })
}

export function insertRole(params) {
  return request({
    url: '/role/insert',
    method: 'post',
    data: params
  })
}

export function updateRole(params) {
  return request({
    url: '/role/update',
    method: 'post',
    data: params
  })
}

export function deleteRole(params) {
  return request({
    url: '/role/delete',
    method: 'post',
    data: params
  })
}

export function getAllPermission() {
  return request({
    url: '/role/all_permission',
    method: 'get'
  })
}
