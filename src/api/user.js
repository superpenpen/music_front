import request from '@/utils/request'

export function getUsers(params) {
  return request({
    url: '/user/select',
    method: 'get',
    params: params
  })
}

export function insertUser(params) {
  return request({
    url: '/user/insert',
    method: 'post',
    data: params
  })
}

export function updateUser(params) {
  return request({
    url: '/user/update',
    method: 'post',
    data: params
  })
}

export function deleteUser(params) {
  return request({
    url: '/user/delete',
    method: 'post',
    data: params
  })
}

export function updateUserStatus(params) {
  return request({
    url: '/user/update_status',
    method: 'get',
    params: params
  })
}

export function getAllRoles() {
  return request({
    url: '/user/roles',
    method: 'get'
  })
}
