import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        containerHidden: true
    },
    mutations: {
        SET_CONTAINER_HIDDEN(state, isOpen) {
            state.containerHidden = isOpen
        }
    },
    actions: {
        setContainerHidden({
            commit
        }, isOpen) {
            commit('SET_CONTAINER_HIDDEN', isOpen)
        }
    },
    modules: {
    }
})
