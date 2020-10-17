import { RouteConfig } from 'vue-router'
import Layout from '@/views/Layout/index.vue'

const routes: Array<RouteConfig> = [
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [{
      path: 'home',
      name: 'Home',
      component: () => import('@/views/Dashboard/index.vue')
    }]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login/index.vue')
  },
  {
    path: '/userList',
    component: Layout,
    children: [{
      path: '',
      name: 'UserList',
      component: () => import('@/views/UserManage/UserList.vue')
    }]
  },
  
]

export default routes
