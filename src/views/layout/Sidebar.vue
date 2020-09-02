<template>
  <div class="sidebar-content">
    <div class="sidebar-top">
      <img class="logo" v-if="system.miniSidebar === 1" src="~@/assets/images/whiteLogo.svg" alt />
      <span v-else>{{ GlobalCfg.siteName }}</span>
    </div>
    <div class="sidebar-menu">
      <el-menu
        router
        background-color="#222d32"
        text-color="#fff"
        :default-active="$route.path"
        style="border-color: #222d32"
        :collapse="system.miniSidebar === 1"
      >
        <template v-for="(menu_v, menu_k) in routes">
          <template v-if="menu_v.children && menu_v.meta && menu_v.isShow ==='0'">
            <el-submenu :index="menu_v.path" :key="menu_k">
              <template slot="title">
                <i :class="menu_v.meta.icon"></i>
                <span>{{menu_v.meta.title}}</span>
              </template>
              <template v-for="(menuChildren_v, menuChildren_k) in menu_v.children">
                <el-submenu
                  v-if="menuChildren_v.children && menuChildren_v.meta && menuChildren_v.isShow ==='0'"
                  :index="menuChildren_v.path"
                  :key="menuChildren_k"
                >
                  <template slot="title">
                    <i :class="menuChildren_v.meta.icon"></i>
                    <span>{{menuChildren_v.meta.title}}</span>
                  </template>
                  <el-menu-item
                    v-for="itemChild_Child in menuChildren_v.children"
                    :index="itemChild_Child.path"
                    :key="itemChild_Child.path"
                  >
                    <template v-if="itemChild_Child.meta && itemChild_Child.isShow ==='0'">
                      <i :class="itemChild_Child.meta.icon"></i>
                      <span slot="title">{{itemChild_Child.meta.title}}</span>
                    </template>
                  </el-menu-item>
                </el-submenu>
                <el-menu-item
                  v-else-if="menuChildren_v.meta && menuChildren_v.isShow ==='0'"
                  :index="menuChildren_v.path"
                  :key="menuChildren_k"
                >
                  <i :class="menuChildren_v.meta.icon"></i>
                  <span slot="title">{{menuChildren_v.meta.title}}</span>
                </el-menu-item>
              </template>
            </el-submenu>
          </template>
          <template v-else-if="menu_v.children && !menu_v.meta">
            <template v-for="(menuChildren_v, menuChildren_k) in menu_v.children">
              <el-submenu
                v-if="menuChildren_v.children && menuChildren_v.meta && menuChildren_v.isShow ==='0'"
                :index="menuChildren_v.path"
                :key="menuChildren_k"
              >
                <template slot="title">
                  <i :class="menuChildren_v.meta.icon"></i>
                  <span>{{menuChildren_v.meta.title}}</span>
                </template>
                <el-menu-item
                  v-for="itemChild_Child in menuChildren_v.children"
                  :index="itemChild_Child.path"
                  :key="itemChild_Child.path"
                >
                  <template v-if="itemChild_Child.meta && itemChild_Child.isShow ==='0'">
                    <i :class="itemChild_Child.meta.icon"></i>
                    <span slot="title">{{itemChild_Child.meta.title}}</span>
                  </template>
                </el-menu-item>
              </el-submenu>
              <el-menu-item
                v-else-if="menuChildren_v.meta && menuChildren_v.isShow ==='0'"
                :index="menuChildren_v.path"
                :key="menuChildren_k"
              >
                <i :class="menuChildren_v.meta.icon"></i>
                <span slot="title">{{menuChildren_v.meta.title}}</span>
              </el-menu-item>
            </template>
          </template>
          <template v-else>
            <el-menu-item
              v-if="menu_v.meta && menu_v.isShow ==='0'"
              :index="menu_v.path"
              :key="menu_k"
            >
              <i :class="menu_v.meta.icon"></i>
              <span slot="title">{{menu_v.meta.title}}</span>
            </el-menu-item>
          </template>
        </template>
      </el-menu>
    </div>
    <div class="sidebar-bottom" @click="$store.commit('MINI_SIDEBAR_TOGGLE')">
      <div class="icon-left">
        <i class="el-icon-back"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Sidebar',
  data () {
    return {
      routes: global.antRouter
    }
  },
  created () {
    console.log(global.antRouter)
  },
  methods: {},
  computed: mapState(['system'])
}
</script>
<style lang="scss" scoped>
@import '~@/assets/css/variables.scss';
.sidebar-content {
  overflow: hidden;
  background-color: #222d32;
  transition: all 0.3s ease-in-out;
  .sidebar-top {
    width: 100%;
    color: #fff;
    background-color: mix(#000, $--color-primary, 10%);
    display: flex;
    justify-content: center;
    align-items: center;
    height: $--top-height;
    span {
      white-space: nowrap;
    }
    .logo {
      width: 38px;
    }
  }
  .sidebar-menu {
    width: 100%;
    height: calc(100vh - #{$--top-height} - #{$--top-height});
    overflow-y: auto;
    overflow-x: hidden;
  }
  .sidebar-bottom {
    position: relative;
    width: 100%;
    height: $--top-height;
    background-color: mix(#000, $--color-primary, 10%);
    color: #fff;
    cursor: pointer;
    .icon-left {
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;
      right: 0;
      width: 64px;
      height: 100%;
      font-size: 20px;
      transition: all 0.3s ease-in-out;
    }
  }
}
</style>
