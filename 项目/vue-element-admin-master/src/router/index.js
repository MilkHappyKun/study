import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {//登录
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {//404
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {//401
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {//首页
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'dashboard',
        meta: { title: '首页', icon: 'dashboard', affix: true }
      }
    ]
  },
  {//个人
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: { title: '个人', icon: 'user', noCache: true }
      }
    ]
  }
]

export const asyncRoutes = [

  {// 会员 用户管理
    path: '/usermanage',
    component: Layout,
    redirect: '/usermanage/membermanage',
    alwaysShow: true, // will always show the root menu
    name: 'userManage',
    meta: {
      title: '用户管理',
      icon: 'peoples',
      roles: ['admin']
    },
    children: [
      {
        path: 'membermanage',
        component: () => import('@/views/UserMange/member'),
        name: 'memberManage',
        meta: {
          title: '会员管理',
          roles: ['admin']
        }
      },
      {
        path: 'address',
        component: () => import('@/views/UserMange/address'),
        name: 'memberAddress',
        meta: {
          title: '收货地址',
          roles: ['admin']
        }
      },
      {
        path: 'collect',
        component: () => import('@/views/UserMange/collect'),
        name: 'memberCollect',
        meta: {
          title: '会员收藏',
          roles: ['admin']
        }
      },
      {
        path: 'footprint',
        component: () => import('@/views/UserMange/footprint'),
        name: 'memberFootprint',
        meta: {
          title: '会员足迹',
          roles: ['admin']
        }
      },
      {
        path: 'searchhistory',
        component: () => import('@/views/UserMange/searchhistory'),
        name: 'searchHistory',
        meta: {
          title: '搜索历史',
          roles: ['admin']
        }
      },
      {
        path: 'feedback',
        component: () => import('@/views/UserMange/feedback'),
        name: 'feedback',
        meta: {
          title: '意见反馈',
          roles: ['admin']
        }
      }
    ]
  },
  {//商品管理
    path: '/mall',
    component: Layout,
    redirect: '/mall/region',
    alwaysShow: true, // will always show the root menu
    name: 'mallManage',
    meta: {
      title: '商城管理',
      icon: 'nested',
      roles: ['admin']
    },
    children: [
      {
        path: 'region',
        component: () => import('@/views/mallManage/region'),
        name: 'region',
        meta: {
          title: '行政区域',
          roles: ['admin']
        }
      },
      {
        path: 'brand',
        component: () => import('@/views/mallManage/brand'),
        name: 'brand',
        meta: {
          title: '品牌制造商',
          roles: ['admin']
        }
      },
      {
        path: 'category',
        component: () => import('@/views/mallManage/category'),
        name: 'category',
        meta: {
          title: '商品类目',
          roles: ['admin']
        }
      },
      {
        path: 'order',
        component: () => import('@/views/mallManage/order'),
        name: 'order',
        meta: {
          title: '订单管理',
          roles: ['admin']
        }
      },
      {
        path: 'issue',
        component: () => import('@/views/mallManage/issue'),
        name: 'issue',
        meta: {
          title: '通用问题',
          roles: ['admin']
        }
      },
      {
        path: 'keyword',
        component: () => import('@/views/mallManage/keyword'),
        name: 'keyword',
        meta: {
          title: '关键词',
          roles: ['admin']
        }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  console.log(router.matcher)
  router.matcher = newRouter.matcher // reset router
  console.log(router.matcher)
}

export default router
