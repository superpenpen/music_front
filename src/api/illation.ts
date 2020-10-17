import request, { ResponsePackage } from '@/utils/request'
import Qs from 'qs'

interface TaskListParams {
  taskName?: string
  roleid?: string
  page: number
  size: number
}
interface TaskListResponse extends ResponsePackage<TaskListItem[]> {
  [propName: string]: any
}
export interface TaskListItem {
  id: number
  name: string
  modelId: number
  version: string
  state: number
}
/**
 * taskList 推理服务列表
 * @param params 
 * @return 
 */
export function taskList(params: TaskListParams) {
  return request.post<TaskListResponse>('/api/illation/pageQuery', null, {
    params
  }).then(res => res.data)
}





interface TaskCreateParams {
  name: string
  modelFileId: number
}
interface TaskCreateResponse extends ResponsePackage {

}
/**
 * taskCreate 创建推理服务
 * @param params 
 * @return 
 */
export function taskCreate(params: TaskCreateParams) {
  return request.post<TaskCreateResponse>('/api/illation/create', Qs.stringify(params), ).then(res => res.data)
}





interface TaskDeleteResponse extends ResponsePackage {
}
/**
 * taskDelete 删除推理服务
 * @param params 
 * @return 
 */
export function taskDelete(params: { id: number }) {
  return request.post<TaskDeleteResponse>('/api/illation/delete', Qs.stringify(params)).then(res => res.data)
}



interface TaskStartResponse extends ResponsePackage {
}
/**
 * taskDelete 启动推理服务
 * @param params 
 * @return 
 */
export function taskStart(params: { id: number }) {
  return request.post<TaskStartResponse>('/api/illation/start', Qs.stringify(params)).then(res => res.data)
}




interface TaskStopResponse extends ResponsePackage {
}
/**
 * taskDelete 停止推理服务
 * @param params 
 * @return 
 */
export function taskStop(params: { id: number }) {
  return request.post<TaskStopResponse>('/api/illation/stop', Qs.stringify(params)).then(res => res.data)
}

