import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../api-config/api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
    register (context, payload) {
      return axios({
        method: 'POST',
        url: '/register',
        data: {
          name: payload.name,
          email: payload.email,
          password: payload.password
        }
      })
    },
    login ({ commit }, payload) {
      return axios({
        method: 'POST',
        url: '/login',
        data: {
          email: payload.email,
          password: payload.password
        }
      })
    },
    auth (context, payload) {
      return axios({
        method: 'POST',
        url: '/auth',
        data: {
          email: payload.email,
          authKey: payload.authKey
        }
      })
    }
  },
  modules: {
  }
})
