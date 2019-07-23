import { login, logout, getInfo } from '@/api/login'
import { setToken, removeToken } from '@/utils/auth'
import store from '@/store'
import router from '@/router'

const user = {
  state: {
    userId: '',
    userName: '',
    roleId: '',
    roleName: '',
    menus: [],
    permissions: []
  },

  mutations: {
    SET_USER: (state, userInfo) => {
      state.userId = userInfo.userId
      state.userName = userInfo.userName
      state.roleId = userInfo.roleId
      state.roleName = userInfo.roleName
      state.menus = userInfo.menuList
      state.permissions = userInfo.permissionList
    },
    RESET_USER: (state) => {
      state.userId = ''
      state.userName = ''
      state.roleId = ''
      state.roleName = ''
      state.menus = []
      state.permissions = []
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password).then(res => {
          if (res.result === 'success') {
            setToken()
            resolve(res)
          } else {
            reject('用户名或密码错误！')
          }
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo().then(res => {
          if (!res) {
            reject('登录已经过期，请重新登录！')
          }
          // 储存用户信息
          commit('SET_USER', res.userPermission)
          // cookie保存登录状态,仅靠vuex保存的话,页面刷新就会丢失登录状态
          setToken()
          // 生成路由
          const userPermission = res.userPermission
          store.dispatch('GenerateRoutes', userPermission).then(() => {
            // 生成该用户的新路由json操作完毕之后,调用vue-router的动态新增路由方法,将新路由添加
            router.addRoutes(store.getters.addRouters)
          })
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout().then(data => {
          commit('RESET_USER')
          removeToken()
          resolve(data)
        }).catch(() => {
          commit('RESET_USER')
          removeToken()
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('RESET_USER')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
