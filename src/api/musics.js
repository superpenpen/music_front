import request from '@/utils/request'

export function getMusics(params) {
  return request({
    url: '/music_socre/musics',
    method: 'post',
    data: params,
    timeout: 5000,
    headers: {
      'Content-Type': 'application/json' // hearder 很重要，Content-Type 要写对
    }
  })
}

export function insertMusic(params) {
  return request({
    url: '/music_socre/add',
    method: 'post',
    data: params,
    timeout: 200000,
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'multipart/form-data' // hearder 很重要，Content-Type 要写对
    }
  })
}

export function updateMusic(params) {
  return request({
    url: '/music_socre/update',
    method: 'post',
    data: params,
    timeout: 5000
  })
}

export function deleteMusic(params) {
  return request({
    url: '/music_socre/delete',
    method: 'get',
    params: params,
    timeout: 5000
  })
}

export function getNames() {
  return request({
    url: '/music_socre/names',
    method: 'get',
    timeout: 5000
  })
}

export function getCountrys() {
  return request({
    url: '/music_socre/countrys',
    method: 'get',
    timeout: 5000
  })
}
