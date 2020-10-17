

import router from '@/router'
import store from '@/store/index'

import {
  getToken
} from '@/utils/auth'
// 免登录验证 页面白名单
const whiteList: string[] = ['/login']
router.beforeEach(async (to, from, next) => {
  const hasToken: boolean = getToken()
  // setDocumentTitle(mergePageTitle(to.meta.title))
  console.log(hasToken)
  // 有token令牌
  if (hasToken) {
    // 对当前已登录的 访问登录页 则 跳回首页
    if (to.path === '/login') {
      // 如果有token已登陆  跳到主页
      next({
        path: '/'
      })
      // NProgress.done()
    } else { // 访问其他页面

      // 判断  用户权限菜单是生成好
      // 用户路由没有获取
      // if (!store.getters.authRoutes.length) {
      //   // 获取用户权限菜单
      //   await store.dispatch('permission/getMenuList')
      //   const {
      //     query
      //   } = from

      //   if (!query.redirect) {
      //     next({
      //       ...to,
      //       replace: true
      //     })
      //   } else {
      //     next({
      //       path: (query.redirect as string),
      //       replace: true
      //     })
      //   }
      // } else {
      //   next()
      // }
      next()

    }
    // 设置系统标题  pageTitle-documentTitle

  } else { // 无token令牌
    // 当前页面是否在白名单内 在则跳转  不在跳转到登录
    if (whiteList.indexOf(to.path) !== -1) {
      next()
      // 设置系统标题  pageTitle-documentTitle
      // setDocumentTitle(mergePageTitle(to.meta.title))
    } else {
      // next(`/login`)
      // debugger;
      next(`/login?redirect=${to.path}`)
      // NProgress.done()
      // 设置系统标题  pageTitle-documentTitle
      // setDocumentTitle(mergePageTitle('登录'))
    }

  }
})


router.afterEach(() => {

})


