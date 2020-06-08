import Vue from 'vue'
import Vuex from 'vuex'
import api from '@/api/api'
import qs from 'qs'
import axios from '@/utils/http'
import Storage from 'good-storage'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: null,
    system: {
      hideSidebar: Storage.get('HideSidebar'),
      miniSidebar: Storage.get('MiniSidebar'),
      navType: parseInt(Storage.get('NavType') || 1)
    }
  },
  mutations: {
    LOGIN: (state, params) => {
      state.token = params.data
      sessionStorage.clear()
      sessionStorage.setItem('token', state.token)
    },
    LOGOUT: (state) => {
      state.token = null
      sessionStorage.clear()
    },
    MINI_SIDEBAR_TOGGLE (state) {
      const miniSidebar = state.system.miniSidebar === 1 ? 0 : 1
      state.system.miniSidebar = miniSidebar
      Storage.set('MiniSidebar', miniSidebar)
    },
    HIDE_SIDEBAR_TOGGLE (state) {
      const hideSidebar = state.system.hideSidebar === 1 ? 0 : 1
      state.system.hideSidebar = hideSidebar
      Storage.set('HideSidebar', hideSidebar)
    },
    NAV_TYPE_TOGGLE (state, type) {
      state.system.navType = type
      Storage.set('NavType', type)
    }
  },
  actions: {
    login ({ commit }, params) {
      const username = params.username
      const password = params.password
      return new Promise((resolve, reject) => {
        axios.post(api.login, qs.stringify({
          username: username,
          password: password
        })).then((resp) => {
          if (resp.status === 200) {
            commit('LOGIN', resp.data)
            resolve(resp)
          }
        }).catch(error => {
          console.log(error)
          reject(error)
        })
      })
    },
    logout ({ commit }) {
      console.log('logout')
      commit('LOGOUT')
    }
  },
  modules: {
  }
})
