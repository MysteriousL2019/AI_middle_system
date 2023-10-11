import { uniqueId } from 'lodash'

/**
 * @description 给菜单数据补充上 path 字段
 * @description https://github.com/d2-projects/d2-admin/issues/209
 * @param {Array} menu 原始的菜单数据
 */
function supplementPath (menu) {
  return menu.map(e => ({
    ...e,
    path: e.path || uniqueId('d2-menu-empty-'),
    ...e.children ? {
      children: supplementPath(e.children)
    } : {}
  }))
}

export const menuHeader = supplementPath([
  // { path: '/index', title: 'home', icon: 'home' },
  {
    path: '/userManagement', title: 'User Management', icon: 'fa-solid fa-user',
  },
  {
    path: '/resourceManagement', title: 'Resource Management', icon: 'fa-solid fa-file',
  },
  {
    title: 'operationManagement',
    icon: 'fa-solid fa-folder-open',
    children: [
      { icon: 'fa-solid fa-desktop', path: '/page1', title: 'ActionMonitor' },
      { icon: 'fa-solid fa-desktop', path: '/page2', title: 'ResourceMonitor' },
      // { icon: 'fa-solid fa-desktop', path: '/page3', title: 'OperationHistory' }
    ]
  },
])

export const menuAside = supplementPath([
  // { path: '/index', title: 'home', icon: 'home' },
  {
    path:'/userManagement',title:'User Management',icon:'fa-solid fa-user',
  },
  {
    path: '/resourceManagement', title: 'Resource Management', icon: 'fa-solid fa-file',
  },
  {
    title: 'operationManagement',
    icon: 'fa-solid fa-folder-open',
    children: [
      { icon: 'fa-solid fa-desktop', path: '/page1', title: 'ActionMonitor' },
      { icon: 'fa-solid fa-desktop', path: '/page2', title: 'ResourceMonitor' },
      // { icon: 'fa-solid fa-desktop', path: '/page3', title: 'OperationHistory' }
    ]
  },
])
