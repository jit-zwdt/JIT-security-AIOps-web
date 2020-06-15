import axios from 'axios'
import store from '@/store'
import router from '@/router'
import api from '@/api/api'
import * as common from '@/utils/common'
import qs from 'qs'
import { Message, MessageBox } from 'element-ui'
// 是否正在刷新的标记
let isRefreshing = false
// 重试队列，每一项将是一个待执行的函数形式
let requests = []
function getRefreshToken () {
  const refreshForm = {
    refresh_token: sessionStorage.getItem('refreshToken')
  }
  return refreshForm
}
function refreshToken (params) {
  return axios.post(api.refreshToken, qs.stringify({
    refresh_token: params.refresh_token
  })).then(res => res.data)
}
axios.interceptors.request.use(
  config => {
    if (sessionStorage.getItem('token')) {
      config.headers.Authorization = sessionStorage.getItem('token')
      config.headers.Accept = 'application/json'
    }
    return config
  },
  err => {
    return Promise.reject(err)
  }
)
axios.interceptors.response.use(
  response => {
    const code = response.data.code
    if (code === 5007) {
      const config = response.config
      if (!isRefreshing) {
        isRefreshing = true
        const param = getRefreshToken()
        common.clearToken()
        return refreshToken(param).then(res => {
          const token = res.data.access_token
          const refreshToken = res.data.refresh_token
          common.setToken(token, refreshToken)
          config.headers.Authorization = token
          requests.forEach(cb => cb(token))
          requests = []
          return axios(config)
        }).catch(error => {
          console.log(error)
          window.location.href = '/'
        }).finally(() => {
          isRefreshing = false
        })
      } else {
        return new Promise((resolve) => {
          // 将resolve放进队列，用一个函数形式来保存，等token刷新后直接执行
          requests.push((token) => {
            resolve(axios(config))
          })
        })
      }
    } else if (code === 5004) {
      Message({
        showClose: true,
        message: '登录信息过期，请重新登录',
        type: 'error',
        duration: 5000
      })
      store.commit('LOGOUT')
      router.currentRoute.path !== 'login' &&
        router.replace({
          path: '/',
          query: { redirect: router.currentRoute.fullPath }
        })
    }
    return response
  },
  error => {
    if (error.response) {
      if (error.response.status === 404) {
        MessageBox({
          message: '系统异常请联系管理员',
          type: 'error',
          duration: 3000,
          callback: action => {
            router.go(-1)
          }
        })
      } else if (error.response.status === 500) {
        MessageBox({
          message: '系统异常请联系管理员',
          type: 'error',
          duration: 3000,
          callback: action => {
            router.go(-1)
          }
        })
      } else if (error.response.status === 403) {
        store.commit('LOGOUT')
        MessageBox({
          message: '没有访问权限',
          type: 'error',
          callback: action => {
            router.replace({
              path: '/',
              query: { redirect: router.currentRoute.fullPath }
            })
          }
        })
      }
    }
    return Promise.reject(error.response.data)
  }
)
export default axios
