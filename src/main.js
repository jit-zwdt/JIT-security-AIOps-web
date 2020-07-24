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
import ECharts from 'vue-echarts/components/ECharts.vue'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/tooltip'

Vue.config.productionTip = false
// Vue.use(VueAxios, axios)
Vue.prototype.axios = axios
Vue.use(ElementUI)
Vue.use(ToolBar)
Vue.prototype.GlobalCfg = Config
Vue.component('ToolBar', ToolBar)
Vue.component('v-chart', ECharts)

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
