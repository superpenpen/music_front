import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/

/**
 * constantRouterMap
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRouterMap = [
  { path: '/login',
    component: () => import('@/views/login/Login'),
    hidden: true
  },

  { path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'dashboard',
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/Dashboard'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  }
]

/**
 * asyncRouterMap
 * a page that has permission requirements
 * specific roles can be accessed
 */
export const asyncRouterMap = [
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/user',
    name: 'permission',
    meta: { title: '权限管理', icon: 'permission' },
    children: [
      {
        path: 'user',
        name: 'user',
        component: () => import('@/views/permission/user/User'),
        meta: { title: '用户管理', icon: 'user' },
        menu: 'user'
      },
      {
        path: 'role',
        name: 'role',
        component: () => import('@/views/permission/role/Role'),
        meta: { title: '角色管理', icon: 'role' },
        menu: 'role'
      }
    ]
  },
  {
    path: '/music_score',
    component: Layout,
    redirect: '/music_score/music_score',
    name: 'music_score',
    meta: { title: '乐谱管理', icon: 'music' },
    children: [
      {
        path: 'music_score',
        name: 'music_score',
        component: () => import('@/views/music_score/music_score/music_score'),
        meta: { title: '乐谱管理', icon: 'music_score' },
        menu: 'music_score'
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

