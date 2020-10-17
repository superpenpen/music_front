import request, { ResponsePackage } from '@/utils/request'
import Qs from 'qs'



export interface UserLoginParams {
  userName: string
  password: string
}
interface UserLoginResponseData {
  userId: number,
  userName: string,
  nickName: string,
  roleId: number,
  token: string,
}
export interface UserLoginResponse extends ResponsePackage<UserLoginResponseData> {
}
/**
 * userLogin 用户登录
 * @param params 
 * @return 
 */
export function userLogin(params: UserLoginParams) {
  return request.post<UserLoginResponse>('/api/login', Qs.stringify(params)).then(res => res.data)
}




interface UserListParams {
  userName?: string
  nickName?: string
  roleid?: string
  page: number
  size: number
}
interface UserListResponse extends ResponsePackage<UserListItem[]> {
  [propName: string]: any
}
export interface UserListItem {
  id: number
  userName: string
  nickName: string
  roleId: number
}
/**
 * userList 用户列表
 * @param params 
 * @return 
 */
export function userList(params: UserListParams) {
  return request.post<UserListResponse>('/api/user/pageQuery', null, {
    params
  }).then(res => res.data)
}






interface UserCreateParams {
  userName: string
  nickName: string
  roleId: number
}
interface UserCreateResponse extends ResponsePackage {
}
/**
 * userCreate 创建用户
 * @param params 
 * @return 
 */
export function userCreate(params: UserCreateParams) {
  return request.post<UserCreateResponse>('/api/user/create', Qs.stringify(params), ).then(res => res.data)
}








interface UserDeleteResponse extends ResponsePackage {
}
/**
 * userDelete 用户删除
 * @param params 
 * @return 
 */
export function userDelete(params: { userId: number }) {
  return request.post<UserDeleteResponse>('/api/user/delete', Qs.stringify(params)).then(res => res.data)
}






interface UserPasswordEditParams {
  id: number
  password: string
  passwordNew: string
}
interface UserPasswordEditResponse extends ResponsePackage {
}
/**
 * userPasswordEdit 用户修改密码
 * @param params 
 * @return 
 */
export function userPasswordEdit(params: UserPasswordEditParams) {
  return request.post<UserPasswordEditResponse>('/api/user/edit/pwd', Qs.stringify(params)).then(res => res.data)
}






interface UserPwdResetParams {
  id: number
}
interface UserPwdResetResponse extends ResponsePackage {
}
/**
 * userEditPhone 重置用户密码
 * @param params 
 * @return 
 */
export function userPwdReset(params: UserPwdResetParams) {
  return request.post<UserPwdResetResponse>('/api/user/reset/pwd', Qs.stringify(params)).then(res => res.data)
}






interface UserEditNickNameParams {
  id: number
  nickName: string
}
interface UserEditNickNameResponse extends ResponsePackage {
}
/**
 * userEditNickName 修改昵称
 * @param params 
 * @return 
 */
export function userEditNickName(params: UserEditNickNameParams) {
  return request.post<UserEditNickNameResponse>('/api/user/edit/nickName', Qs.stringify(params)).then(res => res.data)
}






interface UserEditRoleParams {
  id: number
  roleId: number
}
interface UserEditRoleResponse extends ResponsePackage {
}
/**
 * userEditRole 修改用户角色
 * @param params 
 * @return 
 */
export function userEditRole(params: UserEditRoleParams) {
  return request.post<UserEditRoleResponse>('/api/user/edit/role', Qs.stringify(params)).then(res => res.data)
}

