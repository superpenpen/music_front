import request from '@/utils/request'

export function getTargetLibs() {
  return request({
    url: '/face/target_libs',
    method: 'get'
  })
}

export function startFaceOne2NTop(params) {
  return request({
    url: '/face/faceOneToN',
    method: 'post',
    data: params
  })
}

export function startFaceOne2NThreshold(params) {
  return request({
    url: '/face/faceOneToNByThreshold',
    method: 'post',
    data: params
  })
}

