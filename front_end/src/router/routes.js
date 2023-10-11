import layoutHeaderAside from '@/layout/header-aside'
import layoutHeaderAside2 from '@/layout/header-aside2'

import homeUser from '@/views/user/home/index'
// import layoutHeaderAsideForUser from '@/layout/header-aside'
// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

/**
 * 在主框架内显示
 */
const frameIn = [
  {
    path: '/',
    redirect: { name: 'index' },
    component: layoutHeaderAside,
    children: [


      
      // 首页
      {
        path: '/index',
        name: 'index',
        meta: {
          title:'home',
          auth: true
        },
        // 但好像就只能存在一个home,那就直接变成公共的吧,显示一些平台的数据.
        // component: _import('user/home')
        component: _import('system/index')
      },
      // 演示页面
      {
        path: '/page1',
        name: 'page1',
        meta: {
          title: 'ActionMonitor',
          auth: true
        },
        component: _import('demo/page1')
      },
      {
        path: '/page2',
        name: 'page2',
        meta: {
          title: 'ResourceMonitor',
          auth: true
        },
        component: _import('demo/page2')
      },
      {
        path: '/page3',
        name: 'page3',
        meta: {
          title: 'OperationHistory',
          auth: true
        },
        component: _import('demo/page3')
      },
      {
        path: '/userManagement',
        name: 'userManagement',
        meta: {
          title: 'userManagement',
          auth: true
        },
        component: _import('demo/userManagement')
      },
      {
        path: '/resourceManagement',
        name: 'resourceManagement',
        meta: {
          title: 'resourceManagement',
          auth: true
        },
        component: _import('demo/resourceManagement')
      },
      // 系统 前端日志
      {
        path: '/log',
        name: 'log',
        meta: {
          title: 'Logs',
          auth: true
        },
        component: _import('system/log')
      },
      // 刷新页面 必须保留
      {
        path: 'refresh',
        name: 'refresh',
        hidden: true,
        component: _import('system/function/refresh')
      },
      // 页面重定向 必须保留
      {
        path: 'redirect/:route*',
        name: 'redirect',
        hidden: true,
        component: _import('system/function/redirect')
      }
    ]
  },
  {
    // path: '/',
    // redirect: { name: 'homeUser' },
    // component: layoutHeaderAside2,
    // children: [
    //   // 首页
      // {
      //   path: '/homeUser',
      //   // 这个是左侧导航栏的信息
      //   name: 'homeUser',
      //   meta: {
      //     // 这个是可关闭的窗口上的名称
      //     title: 'homeUser',

      //     auth: true
      //   },
      //   component: _import('user/home')
      // },
    // ]
    path: '/index',
    // redirect: { name: 'index' },
    component: layoutHeaderAside,
    children: [
      // 首页
      {
        path: '/index',
        name: 'index',
        meta: {
          // title: 'homeUser',
          auth: true
        },
        // 但好像就只能存在一个home,那就直接变成公共的吧,显示一些平台的数据.
        // component: _import('user/home')
        component: _import('system/index')
      },
      {
        path: '/modelManagement',
        // 这个是左侧导航栏的信息
        name: 'modelManagement',
        meta: {
          // 这个是可关闭的窗口上的名称
          title: 'modelManagement',

          auth: true
        },
        component: _import('user/home')
      },
      {
        path: '/page1Data',
        // 这个是左侧导航栏的信息
        name: 'dataManagement',
        meta: {
          // 这个是可关闭的窗口上的名称
          title: 'dataManagement',

          auth: true
        },
        component: _import('demoUser/page1')
      },
     
      {
        path: '/page2Data',
        // 这个是左侧导航栏的信息
        name: 'dataSetManagement',
        meta: {
          // 这个是可关闭的窗口上的名称
          title: 'dataSetManagement',

          auth: true
        },
        component: _import('demoUser/page2')
      },
      {
        path: '/ResourcesManagement1',
        // 这个是左侧导航栏的信息
        name: 'ResourceView',
        meta: {
          // 这个是可关闭的窗口上的名称
          title: 'ResourceView',

          auth: true
        },
        component: _import('demoResource/page1')
      },      
      {
        path: '/ResourcesManagement2',
        // 这个是左侧导航栏的信息
        name: 'ResourcesManagement',
        meta: {
          // 这个是可关闭的窗口上的名称
          title: 'ResourcesManagement',

          auth: true
        },
        component: _import('demoResource/page2')
      },
      {
        path: '/personalInfo',
        // 这个是左侧导航栏的信息
        name: 'personalInfo',
        meta: {
          // 这个是可关闭的窗口上的名称
          title: 'personalInfo',

          auth: true
        },
        component: _import('user/Info')
      },
    ]
  }
  

]

/**
 * 在主框架之外显示
 */
const frameOut = [
  // 登录
  {
    path: '/login',
    name: 'login',
    component: _import('system/login')
  }
]

/**
 * 错误页面
 */
const errorPage = [
  {
    path: '*',
    name: '404',
    component: _import('system/error/404')
  }
]

// 导出需要显示菜单的
export const frameInRoutes = frameIn

// 重新组织后导出
export default [
  ...frameIn,
  ...frameOut,
  ...errorPage
]
