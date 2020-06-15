import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/components/Login.vue'
import Create from '@/components/Create.vue'
import Edit from '@/components/Edit.vue'
import Index from '@/components/Index.vue'
import Layout from '@/views/layout/App.vue'
import RegionManager from '@/views/regionManager/Index.vue'
import RegionTree from '@/views/regionManager/Tree.vue'
Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/index',
    component: Layout,
    name: 'Dashboard',
    meta: {
      title: '仪表盘'
    },
    children: [
      {
        path: '',
        name: 'index',
        meta: {
          title: '首页'
        },
        component: Index
      }
    ]
  },
  {
    path: '/regionManager',
    component: Layout,
    name: 'regionManager',
    meta: {
      title: '地区应用信息维护'
    },
    // TODO 三级菜单怎么处理路由
    children: [
      {
        path: 'list',
        name: 'regionManagerList',
        meta: {
          title: '各地区服务器管理'
        },
        component: RegionManager
      },
      {
        path: 'info',
        name: 'regionInfo',
        meta: {
          title: '地区信息维护'
        },
        component: RegionTree
      }
    ]
  },
  {
    path: '/create',
    name: 'Create',
    component: Create,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/edit/:serverId',
    component: Edit,
    name: 'Edit',
    meta: {
      requireAuth: true
    }
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(r => r.meta.requireAuth)) {
    if (sessionStorage.getItem('token')) {
      next()
    } else {
      next({
        path: '/',
        query: { redirect: to.fullPath }
      })
    }
  } else {
    next()
  }
})

export default router
