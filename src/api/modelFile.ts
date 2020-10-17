import request, { ResponsePackage } from '@/utils/request'
import Qs from 'qs'
import  { AxiosRequestConfig } from 'axios'


interface ModelFileListParams {
  version?: string
  modelId: number
}
interface ModelListFileResponse extends ResponsePackage<ModelFileListItem[]> {
  [propName: string]: any
}
export interface ModelFileListItem {
  id: number
  version: string
  fileUrl: string
  note: string
}
/**
 * modelFileList 模型文件列表
 * @param params 
 * @return 
 */
export function modelFileList(params: ModelFileListParams) {
  return request.post<ModelListFileResponse>('/api/model/file/query', null, {
    params
  }).then(res => res.data)
}




interface ModelFileCreateParams {
  version: string
  file: File
  note: string
  modelId: Number
}
interface config extends AxiosRequestConfig{
  headers: any
}
interface ModelFileCreateResponse extends ResponsePackage {
}
/**
 * modelFileCreate 上传模型文件
 * @param params 
 * @return 
 */
export function modelFileCreate(params, config: config) {
  return request.post<ModelFileCreateResponse>('/api/model/file/create', params, config).then(res => res.data)
}




interface ModelFileEditParams {
  id: number
  note: string 
}
interface ModelFileEditResponse extends ResponsePackage {
}
/**
 * modelFileEdit 模型版本文件修改信息
 * @param params 
 * @return 
 */
export function modelFileEdit(params: ModelFileEditParams) {
  return request.post<ModelFileEditResponse>('/api/model/file/edit', Qs.stringify(params)).then(res => res.data)
}




interface ModelFileDeleteResponse extends ResponsePackage {
}
/**
 * modelFileDelete 模型文件删除
 * @param params 
 * @return 
 */
export function modelFileDelete(params: { modelFileId: number }) {
  return request.post<ModelFileDeleteResponse>('/api/model/file/delete', Qs.stringify(params)).then(res => res.data)
}



/**
 *  查询模型文件与ID之间关系
 */
export function getModelFiles() {
  return request.post<ModelListFileResponse>('/api/model/file/getModelFiles').then(res => res.data)
}
