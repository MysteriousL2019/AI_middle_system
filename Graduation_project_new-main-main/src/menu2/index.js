import { uniqueId } from 'lodash'

/**
 * @description 给菜单数据补充上 path 字段
 * @description https://github.com/d2-projects/d2-admin/issues/209
 * @param {Array} menu 原始的菜单数据
 */
function supplementPath(menu) {
    return menu.map(e => ({
        ...e,
        path: e.path || uniqueId('d2-menu-empty-'),
        ...e.children ? {
            children: supplementPath(e.children)
        } : {}
    }))
}

export const menuHeader2 = supplementPath([
    { path: '/modelManagement', title: 'modelManagement', icon: 'fa-solid fa-sitemap' },
    // {
    //     path: '/userManagement', title: 'User Management', icon: 'fa-solid fa-user',
    // },
    // {
    //     path: '/resourceManagement', title: 'Resource Management', icon: 'fa-solid fa-file',
    // },
    {
        title: 'ResourceManagement',
        icon: 'fa-solid fa-database',
        children: [
            { icon: 'fa-solid fa-camera', path: '/ResourcesManagement1', title: 'ResourceView' },
            { icon: 'fa-solid fa-desktop', path: '/ResourcesManagement2', title: 'ResourcesManagement' },
            // { icon: 'fa-solid fa-desktop', path: '/page3', title: 'OperationHistory' }
        ]
    },
    { path: '/page1Data', title: 'dataManagement', icon: 'fa-solid fa-file' },

    // {
        // title: 'FileManagement',
        // icon: 'fa-solid fa-folder-open',
        // children: [
        //     { icon: 'fa-solid fa-file', path: '/page1Data', title: 'dataManagement' },
        //     { icon: 'fa-solid fa-server', path: '/page2Data', title: 'dataSetManagement' },
        //     // { icon: 'fa-solid fa-desktop', path: '/page3', title: 'OperationHistory' }
        // ]
        
    // },
    // { path: '/personalInfo', title: 'personalInfo', icon: 'fa-solid fa-user' },

])

export const menuAside2 = supplementPath([
    { path: '/modelManagement', title: 'modelManagement', icon: 'fa-solid fa-sitemap' },
    // {
    //     path: '/userManagement', title: 'User Management', icon: 'fa-solid fa-user',
    // },
    // {
    //     path: '/resourceManagement', title: 'Resource Management', icon: 'fa-solid fa-file',
    // },
    {
        title: 'ResourceManagement',
        icon: 'fa-solid fa-database',
        children: [
            { icon: 'fa-solid fa-camera', path: '/ResourcesManagement1', title: 'ResourceView' },
            { icon: 'fa-solid fa-desktop', path: '/ResourcesManagement2', title: 'ResourcesManagement' },
            // { icon: 'fa-solid fa-desktop', path: '/page3', title: 'OperationHistory' }
        ]
    },
    { path: '/page1Data', title: 'dataManagement', icon: 'fa-solid fa-file' },

    // {
        // title: 'FileManagement',
        // icon: 'fa-solid fa-folder-open',
        // children: [
        //     { icon: 'fa-solid fa-file', path: '/page1Data', title: 'dataManagement' },
        //     { icon: 'fa-solid fa-server', path: '/page2Data', title: 'dataSetManagement' },
        //     // { icon: 'fa-solid fa-desktop', path: '/page3', title: 'OperationHistory' }
        // ]
    // },
    // { path: '/personalInfo', title: 'personalInfo', icon: 'fa-solid fa-user' },

])
