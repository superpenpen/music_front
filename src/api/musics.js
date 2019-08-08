import request from '@/utils/request'

export function getMusics(params) {
  return request({
    url: '/music_socre/musics',
    method: 'post',
    params: params,
    timeout: 5000
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
    method: 'post',
    data: params,
    timeout: 5000
  })
}
