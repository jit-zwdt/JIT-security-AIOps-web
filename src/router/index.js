import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login.vue'
Vue.use(Router)
const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
const constantRouterMap = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]
const router = new Router({
  routes: constantRouterMap,
  // base: '/projectName/',
  mode: 'history'
})

export default router
