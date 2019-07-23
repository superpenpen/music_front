import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: '/login/auth',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function getInfo() {
  return request({
    url: '/login/info',
    method: 'post'
  })
}

export function logout() {
  return request({
    url: '/login/logout',
    method: 'post'
  })
}
