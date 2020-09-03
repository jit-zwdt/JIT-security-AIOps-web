import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import VueAxios from 'vue-axios'
import axios from './utils/http'
import NProgress from 'nprogress'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/nprogress/nprogress.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/style.scss'
import Config from '@/config/app'
import ToolBar from '@/components/ToolBar.vue'
import echarts from 'echarts'
import api from '@/api/api'
import './promission'// 这里进行路由后台获取的模拟
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false
// Vue.use(VueAxios, axios)
Vue.prototype.axios = axios
Vue.prototype.$api = api
Vue.use(ElementUI)
Vue.use(ToolBar)
Vue.prototype.GlobalCfg = Config
Vue.component('ToolBar', ToolBar)
router.beforeResolve((to, from, next) => {
  if (to.name) {
    NProgress.start()
  }
  next()
})

router.afterEach(() => {
  NProgress.done()
})

new Vue({
  router,
  store,
  axios,
  render: h => h(App)
}).$mount('#app')
