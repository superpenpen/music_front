import request, { ResponsePackage } from '@/utils/request'
import Qs from 'qs'

interface ModelListParams {
  modelName?: string
  nickName?: string
  roleid?: string
  page: number
  size: number
}
interface ModelListResponse extends ResponsePackage<ModelListItem[]> {
  [propName: string]: any
}
export interface ModelListItem {
  id: number
}
/**
 * modelList 模型列表
 * @param params 
 * @return 
 */
export function modelList(params: ModelListParams) {
  return request.post<ModelListResponse>('/api/model/pageQuery', null, {
    params
  }).then(res => res.data)
}





interface ModelCreateParams {
  name: string
  frameworkId: number
  note: string
  responseType: number
}
interface ModelCreateResponse extends ResponsePackage {

}
/**
 * modelCreate 创建模型
 * @param params 
 * @return 
 */
export function modelCreate(params: ModelCreateParams) {
  return request.post<ModelCreateResponse>('/api/model/create', Qs.stringify(params), ).then(res => res.data)
}





interface ModelDeleteResponse extends ResponsePackage {
}
/**
 * modelDelete 模型删除
 * @param params 
 * @return 
 */
export function modelDelete(params: { modelId: number }) {
  return request.post<ModelDeleteResponse>('/api/model/delete', Qs.stringify(params)).then(res => res.data)
}



/**
 *  查询模型与ID之间关系
 */
export function getModelsByUser() {
  return request.post<ModelListResponse>('/api/model/getModels/user').then(res => res.data)
}


/**
 *  查询模型版本与ID之间关系
 */
export function getFramework() {
  return request.post<ModelListResponse>('/api/framework/all').then(res => res.data)
}