<template>
  <d2-container class="page">
    <d2-page-cover>
      <d2-icon-svg class="logo" name="d2-admin"/>
      <template slot="footer">
        <div class="btn-group">
          <span class="btn-group__btn" @click="$open('https://github.com/d2-projects')">开源组织</span> |
          <span class="btn-group__btn" @click="$open('https://d2.pub/zh/doc/d2-admin')">文档</span> |
          <span class="btn-group__btn" @click="$open('https://github.com/d2-projects/d2-admin-start-kit')">简化版</span> |
          <span class="btn-group__btn" @click="$open('https://juejin.im/user/57a48b632e958a006691b946/posts')">掘金</span> |
          <el-popover :width="172" trigger="hover">
            <p class="d2-mt-0 d2-mb-10">今日前端</p>
            <img src="./image/qr@2x.png" style="width: 172px;">
            <span slot="reference" class="btn-group__btn btn-group__btn--link">
              <d2-icon name="weixin"/>
              微信公众号
            </span>
            <p style="font-size: 12px; margin-top: 0px; margin-bottom: 0px;">
              官方公众号，主要推送前端技术类文章、框架资源、学习教程，以及 D2 系列项目更新信息
            </p>
          </el-popover>
        </div>
        <d2-badge/>
        <d2-help/>
      </template>
    </d2-page-cover>
  </d2-container>
</template>

<script>
import D2Badge from './components/d2-badge'
import D2Help from './components/d2-help'
import D2PageCover from './components/d2-page-cover'
import { menuHeader, menuAside } from '@/menu'
import { menuHeader2, menuAside2 } from '@/menu2'

import { frameInRoutes } from '@/router/routes'


export default {
  components: {
    D2Badge,
    D2Help,
    D2PageCover
  },
  data () {
    return{
       parm: ''
    }
  },
  created(){
        // 处理路由 得到每一级的路由设置
    this.parm=this.$route.params.parm;
    
    console.log("hhhhhh");
    console.log(this.parm);

    console.log("hhhhhh")

    // console.log(this.formLogin.username)
    // console.log(this.formLogin.password)

    // this.$store.commit('d2admin/page/init', frameInRoutes)

    if(this.parm=='ok1'){
        // this.$store.commit('d2admin/page/init', frameInRoutes)
        // 设置顶栏菜单
        this.$store.commit('d2admin/menu/headerSet', menuHeader)
        // 设置侧边栏菜单
        this.$store.commit('d2admin/menu/asideSet', menuAside)
        // 初始化菜单搜索功能
        this.$store.commit('d2admin/search/init', menuHeader)
    }
    else if(this.parm=='ok2'){
          // this.$store.commit('d2admin/page/init', frameInRoutes)
          // 设置顶栏菜单
          this.$store.commit('d2admin/menu/headerSet', menuHeader2)
          // 设置侧边栏菜单
          this.$store.commit('d2admin/menu/asideSet', menuAside2)
          // 初始化菜单搜索功能
          this.$store.commit('d2admin/search/init', menuHeader2)
    }
  }
}
</script>

<style lang="scss" scoped>
.page {
  .logo {
    width: 120px;
  }
  .btn-group {
    color: $color-text-placehoder;
    font-size: 12px;
    line-height: 12px;
    margin-top: 0px;
    margin-bottom: 20px;
    .btn-group__btn {
      color: $color-text-sub;
      &:hover {
        color: $color-text-main;
      }
      &.btn-group__btn--link {
        color: $color-primary;
      }
    }
  }
}
</style>
