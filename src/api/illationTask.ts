import request, { ResponsePackage } from '@/utils/request'
import Qs from 'qs'
import  { AxiosRequestConfig } from 'axios'


interface TaskListParams {
  taskName?: string
  type: number
  illationId: number
  page: number
  size: number
}
interface TaskListResponse extends ResponsePackage<TaskListItem[]> {
  [propName: string]: any
}
export interface TaskListItem {
  id: number
  name: string
  type: number
  picUrl: string
  rtmpUrl: string
}
/**
 * taskList 推理服务任务列表
 * @param params 
 * @return 
 */
export function taskList(params: TaskListParams) {
  return request.post<TaskListResponse>('/api/illation/task/pageQuery', null, {
    params
  }).then(res => res.data)
}




interface TaskCreateParams {
  name: string
  file: File
  rtmpUrl: string
  illationId: Number
}
interface config extends AxiosRequestConfig{
  headers: any
}
interface TaskCreateResponse extends ResponsePackage {
}
/**
 * taskCreate 推理服务任务新增
 * @param params 
 * @return 
 */
export function taskCreate(params, config: config) {
  return request.post<TaskCreateResponse>('/api/illation/task/create', params, config).then(res => res.data)
}




interface TaskDeleteResponse extends ResponsePackage {
}
/**
 * taskDelete 推理服务任务删除
 * @param params 
 * @return 
 */
export function taskDelete(params: { taskId: number }) {
  return request.post<TaskDeleteResponse>('/api/illation/task/delete', Qs.stringify(params)).then(res => res.data)
}





/**
 * picTaskRes 图片任务返回结果
 * @param params 
 * @return 
 */
export function picTaskRes(params) {
  return request.post<TaskListResponse>('/api/illation/task/picRes', null, {
    params
  }).then(res => res.data)
}
