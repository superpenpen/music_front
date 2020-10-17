import { MutationTree, ActionTree } from 'vuex'
import { RootState } from '../index'
import { SET_ACCESS_TOKEN, SET_NICK_NAME, SET_USER_NAME, SET_USERID, SET_USER_ROLE } from '../mutation-types'
import { setToken, getToken } from '@/utils/auth'
import Cookie from 'js-cookie'
import { userLogin, UserLoginParams } from '@/api/user'

import { Encrypt } from '@/utils/secret'

export interface UserState {
  userId: string
  token: string
  userName: string
  nickName: string
  roleId: string
}

const state: UserState = {
  token: Cookie.get('token')!,
  userId: Cookie.get('userId')!,
  userName: Cookie.get('userName')!,
  nickName: Cookie.get('nickName')!,
  roleId: Cookie.get('roleId')!,
}

const mutations: MutationTree<UserState> = {
  [SET_ACCESS_TOKEN](state, token) {
    setToken(token)
    state.token = token
  },
  [SET_USER_NAME](state, userName) {
    Cookie.set('userName', userName)
    state.userName = userName
  },
  [SET_NICK_NAME](state, nickName) {
    Cookie.set('nickName', nickName)
    state.nickName = nickName
  },
  [SET_USERID](state, userId) {
    Cookie.set('userId', userId)
    state.userId = userId
  },
  [SET_USER_ROLE](state, roleId) {
    Cookie.set('roleId', roleId)
    state.roleId = roleId
  }
}

const actions: ActionTree<UserState, RootState> = {
  async userLogin({ commit }, formData: UserLoginParams) {
    const loginUserRes = await userLogin(formData)
    if(loginUserRes.code!=0){
      // this.$message.error(loginUserRes.msg);
      return loginUserRes
    }else{
      console.log(loginUserRes)
      const { userId, userName, nickName, roleId, token } = loginUserRes.data
      console.log(userName)
      commit(SET_USER_NAME, userName)
      commit(SET_NICK_NAME, nickName)
      commit(SET_USERID, userId)
      commit(SET_USER_ROLE, roleId)
      commit(SET_ACCESS_TOKEN, token)
  
      return loginUserRes
    }
  },
  userSignOut({ commit }): void {
    commit(SET_USER_NAME, '')
    commit(SET_NICK_NAME, '')
    commit(SET_USERID, '')
    commit(SET_USER_ROLE, '')
    commit(SET_ACCESS_TOKEN, '')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}