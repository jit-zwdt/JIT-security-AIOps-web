import router from './router'
import { MessageBox } from 'element-ui'
import axios from './utils/http'
import Layout from '@/views/layout/App.vue'
// import datajson from './data.json'
import store from './store'
import api from '@/api/api'
import History from '@/utils/history'
import { resetRouter } from '@/router/index'

var getRouter

router.beforeEach((to, from, next) => {
  try {
    if (sessionStorage.getItem('token')) {
      if (!getRouter || getRouter.length === 0) { // 不加这个判断，路由会陷入死循环
        if (!getObjArr('router')) {
          axios.get(api.sysManager.getMenus).then(res => {
            if (res.status === 200) {
              if (res.data.code === 1) {
                getRouter = res.data.data
                saveObjArr('router', getRouter)
                routerGo(to, next)
              } else {
                MessageBox({
                  message: '获取菜单失败',
                  type: 'error'
                })
              }
            }
          })
        } else {
          getRouter = getObjArr('router')
          routerGo(to, next)
        }
      } else {
        getRouter = []
        next()
      }
    } else {
      getRouter = []
      next()
    }
  } catch (e) {
    getRouter = []
    store.commit('LOGOUT')
    MessageBox({
      message: '路由加载失败',
      type: 'error',
      callback: action => {
        window.location.href = '/'
      }
    })
  }
})

function routerGo (to, next) {
  getRouter = filterAsyncRouter(getRouter)
  resetRouter()
  router.addRoutes(getRouter)
  global.antRouter = getRouter
  next({ ...to, replace: true })
}

function saveObjArr (name, data) {
  localStorage.setItem(name, JSON.stringify(data))
}

function getObjArr (name) {
  var data = window.localStorage.getItem(name)
  if (data === null || data === 'undefined' || data === undefined) {
    return false
  }
  return JSON.parse(window.localStorage.getItem(name))
}
const _import = require('./router/_import_' + process.env.NODE_ENV)
function filterAsyncRouter (asyncRouterMap) {
  const accessedRouters = asyncRouterMap.filter(route => {
    if (route.component) {
      if (route.component === 'Layout') {
        route.component = Layout
      } else {
        route.component = _import(route.component)
      }
    }
    if (route.children && route.children.length > 0) {
      route.children = filterAsyncRouter(route.children)
    }
    return true
  })

  return accessedRouters
}

router.afterEach((to, from) => {
  if (from.name !== null) {
    const referrer = {
      name: from.name,
      query: from.query
    }
    History.dataNull()
    const referrerData = JSON.parse(sessionStorage.getItem('referrer'))
    if (referrerData !== null) {
      referrerData.push(referrer)
      if (referrerData !== null && referrerData !== '') {
        referrerData.forEach(element => {
          History.push({
            name: element.name,
            query: element.query
          })
        })
        sessionStorage.setItem('referrer', JSON.stringify(History.data()))
      }
    } else {
      History.push(referrer)
      sessionStorage.setItem('referrer', JSON.stringify(History.data()))
    }
  }
})
