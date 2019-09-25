// eslint-disable-next-line
import { UserLayout, BasicLayout, RouteView, BlankLayout, PageView } from '@/layouts'
import { bxAnaalyse } from '@/core/icons'

export const asyncRouterMap = [

  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: '首页' },
    redirect: '/statistics/page-pace-times',
    children: [
      {
        path: '/statistics',
        name: 'Statistics',
        redirect: '/statistics/page-pace-times',
        component: PageView,
        meta: { title: '销售统计', keepAlive: true, icon: bxAnaalyse },
        children: [
          {
            path: '/statistics/page-pace-times',
            name: 'PagePaceTimes',
            component: () => import('@/views/statistics/PagePaceTimes'),
            meta: { title: '页面停留时间', keepAlive: false }
          },
          {
            hideChildrenInMenu: true,
            hidden: true,
            path: '/statistics/page-pace-times/detail',
            name: 'PagePaceTime',
            component: () => import('@/views/statistics/PagePaceTime'),
            meta: { keepAlive: false, hiddenHeaderContent: true }
          },
          {
            path: '/statistics/quantity',
            name: 'Quantity',
            component: () => import('@/views/statistics/Quantity'),
            meta: { title: '数量统计', keepAlive: false }
          },
          {
            path: '/statistics/test',
            name: 'Test',
            component: () => import('@/views/statistics/Test'),
            meta: { title: '测试答案统计', keepAlive: false }
          }
        ]
      },

      {
        path: '/sale',
        name: 'SaleSetting',
        redirect: '/sale/product',
        component: RouteView,
        meta: { title: '销售设置', icon: 'form', keepAlive: true },
        children: [
          {
            path: '/sale/product',
            name: 'ProductSetting',
            component: () => import('@/views/sale/ProductSetting'),
            meta: { title: '产品设置', keepAlive: false }
          },
          {
            path: '/sale/question',
            name: 'Question',
            component: () => import('@/views/sale/Question'),
            meta: { title: '问题设置', keepAlive: false }
          }
        ]
      },

      {
        path: '/customers',
        name: 'Customers',
        component: RouteView,
        rediect: '/customers/customer-list',
        meta: { title: '客户管理', keepAlive: true, icon: 'team' },
        children: [
          {
            path: '/customers/customer-list',
            name: 'CustomerList',
            component: () => import('@/views/customer/CustomerList'),
            meta: { title: '客户列表', keepAlive: false }
          },
          {
            path: '/customers/:id',
            name: 'Customer',
            hideChildrenInMenu: true,
            hidden: true,
            component: () => import('@/views/customer/Customer'),
            meta: { title: '客户详情', keepAlive: false }
          }
        ]
      },

      {
        path: '/orders',
        name: 'Orders',
        redirect: '/orders/big-lucky-star',
        component: RouteView,
        meta: { title: '订单管理', keepAlive: true, icon: 'table' },
        children: [
          {
            path: '/orders/big-lucky-star',
            name: 'BigLuckyStar',
            component: () => import('@/views/order/BigLuckyStar'),
            meta: { title: '大福星', keepAlive: false }
          }
        ]
      },
      {
        path: '/account',
        hideChildrenInMenu: true,
        hidden: true,
        name: 'Account',
        component: RouteView,
        meta: { title: '账号设置' },
        children: [
          {
            path: '/account/update-password',
            name: 'UpdatePassword',
            component: () => import('@/views/account/UpdatePassword'),
            meta: { title: '修改密码' }
          }
        ]
      },

      // Exception
      {
        path: '/exception',
        hideChildrenInMenu: true,
        hidden: true,
        name: 'exception',
        component: RouteView,
        redirect: '/exception/403',
        meta: { title: '异常页', icon: 'warning', permission: [ 'exception' ] },
        children: [
          {
            path: '/exception/403',
            name: 'Exception403',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/403'),
            meta: { title: '403', permission: [ 'exception' ] }
          },
          {
            path: '/exception/500',
            name: 'Exception500',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/500'),
            meta: { title: '500', permission: [ 'exception' ] }
          }
        ]
      }
    ]
  },
  {
    path: '*', redirect: '/404', hidden: true
  }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login')
      }
    ]
  },
  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  }

]
