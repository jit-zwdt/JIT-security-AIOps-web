import axios from 'axios'
import store from '@/store'
import router from '@/router'

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
    return response
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 403:
          store.commit('LOGOUT')
          router.currentRoute.path !== 'login' &&
            router.replace({
              path: 'login',
              query: { redirect: router.currentRoute.path }
            })
      }
    }
    return Promise.reject(error.response.data)
  }
)
export default axios
