import Vue from 'vue'
import Vuex from 'vuex'
import api from '@/api/api'
import qs from 'qs'
import axios from '@/utils/http'
import Storage from 'good-storage'
import { setToken, clearToken } from '@/utils/common'
import { Message } from 'element-ui'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    system: {
      hideSidebar: Storage.get('HideSidebar'),
      miniSidebar: Storage.get('MiniSidebar'),
      navType: parseInt(Storage.get('NavType') || 1),
      windowType: Storage.get('WindowType')
    }
  },
  mutations: {
    LOGIN: (state, params) => {
      const accessToken = params.data.access_token
      const refreshToken = params.data.refresh_token
      clearToken()
      setToken(accessToken, refreshToken)
    },
    LOGOUT: (state) => {
      clearToken()
      var storage = window.localStorage
      storage.clear()
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
    },
    WINDOW_TYPE_TOGGLE (state, typedata) {
      const type = typedata
      state.system.windowType = type
      Storage.set('WindowType', type)
      if (type === 1) {
        state.system.hideSidebar = 1
        Storage.set('HideSidebar', 1)
      } else {
        state.system.hideSidebar = 0
        Storage.set('HideSidebar', 0)
      }
    }
  },
  actions: {
    login ({ commit }, params) {
      const username = params.username
      const password = params.password
      const verificationCode = params.verificationCode
      const verificationCodeKey = params.verificationCodeKey
      return new Promise((resolve, reject) => {
        axios.post(api.login, qs.stringify({
          username: username,
          password: password,
          verificationCode: verificationCode,
          verificationCodeKey: verificationCodeKey
        })).then((resp) => {
          if (resp.status === 200) {
            if (resp.data.code === 1) {
              commit('LOGIN', resp.data)
              resolve(resp)
            } else if (resp.data.code === 1003 || resp.data.code === 1004) {
              resolve(resp)
            } else {
              Message({
                message: resp.data.msg,
                type: 'error'
              })
            }
          }
        }).catch(error => {
          console.log(error)
          reject(error)
        })
      })
    },
    logout ({ commit }) {
      commit('LOGOUT')
    }
  },
  modules: {
  }
})
