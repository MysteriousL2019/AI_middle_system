// Vue
import Vue from 'vue'
import i18n from './i18n'
import App from './App'
// 核心插件
import d2Admin from '@/plugin/d2admin'
// store
import store from '@/store/index'
import VCharts from 'v-charts'

// 菜单和路由设置
import router from './router'
import { menuHeader, menuAside } from '@/menu'
import { menuHeader2, menuAside2 } from '@/menu2'

import { frameInRoutes } from '@/router/routes'
// 导入axios
import axios from 'axios'
// 挂载axios 到Vue的原型prototype的$http
Vue.prototype.$http = axios
// 设置请求的根路径
axios.defaults.baseURL = "http://localhost:9090/"
// 核心插件
Vue.use(d2Admin)
Vue.use(VCharts)

// 全局时间字符串
Vue.prototype.$Time = '';
//修改变量的函数
Vue.prototype.$setTime = (time) => {
  Vue.prototype.$Time = new Date().toLocaleString();
}

//记录全局操作的时间变量
Vue.prototype.$OperationTime='';
Vue.prototype.$setOperationTime=(time)=>{
  Vue.prototype.$OperationTime=new Date().toLocaleString();
}
// 用户字符串
Vue.prototype.$userPlace = '';
//修改地点
Vue.prototype.$setUserPlace = (place) => {
  Vue.prototype.$userPlace = place;
}
//全局名字
Vue.prototype.$Name='';
Vue.prototype.$setUserName=(name)=>{
  Vue.prototype.$Name=name;
}
//全局角色
Vue.prototype.$type = '';
Vue.prototype.$setUserType = (type) => {
  Vue.prototype.$type = type;
}
//全局的id
Vue.prototype.$idUser='';
Vue.prototype.$setIdUser = (type) =>{
  Vue.prototype.$idUser=type;
}
//全局性别
Vue.prototype.$Gender = '';
Vue.prototype.$setGender = (type) => {
  Vue.prototype.$Gender = type;
}

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
  created () {
    // 处理路由 得到每一级的路由设置
    this.$store.commit('d2admin/page/init', frameInRoutes)
    // // 设置顶栏菜单
    // this.$store.commit('d2admin/menu/headerSet', menuHeader2)
    // // 设置侧边栏菜单
    // this.$store.commit('d2admin/menu/asideSet', menuAside2)
    // // 初始化菜单搜索功能
    // this.$store.commit('d2admin/search/init', menuHeader2)
  },
  mounted () {
    // 展示系统信息
    this.$store.commit('d2admin/releases/versionShow')
    // 用户登录后从数据库加载一系列的设置
    this.$store.dispatch('d2admin/account/load')
    // 获取并记录用户 UA
    this.$store.commit('d2admin/ua/get')
    // 初始化全屏监听
    this.$store.dispatch('d2admin/fullscreen/listen')
  }
}).$mount('#app')
