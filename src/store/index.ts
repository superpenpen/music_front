import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)
import getters from './getters'
import user, { UserState } from './modules/user'


export interface RootState {
  // user: UserState,
  [propsName: string]: any
}
export default new Vuex.Store<RootState>({
  state: {
    
  },
  mutations: {

  },
  actions: {
  },
  modules: {
    user
  },
  getters
})
