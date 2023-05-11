<script setup>
import { useRouter } from 'vue-router'
import { PartlyCloudy } from '@element-plus/icons-vue'

const router = useRouter()
const asideMenus = [
  {
    'name': '后台面板',
    'icon': 'help',
    'child': [
      {
        'name': '主控台',
        'icon': 'home-filled',
        'frontpath': '/',
      }],
  },
  {
    'name': '商城管理',
    'icon': 'shopping-bag',
    'child': [
      {
        'name': '商品管理',
        'icon': 'shopping-cart-full',
        'frontpath': '/goods/list',
      }],
  }]

// 点击菜单的路由跳转
const handleSelect = (e) => {
  router.push(e)
}
</script>

<template>
  <div class="f-menu">
    <el-menu
        :default-active="$route.path"
        class="border-0 el-menu-vertical-demo"
        @select="handleSelect"
        unique-opened
        :collapse="$store.state.isCollapse"
    >
      <template v-for="(item, index) in asideMenus" :key="index">
        <!--有子菜单就渲染这个-->
        <el-sub-menu v-if="item.child && item.child.length > 0" :index="item.name">
          <template #title>
            <el-icon>
              <!--动态组件-->
              <component :is="item.icon"></component>
            </el-icon>
            <span>{{ item.name }}</span>
          </template>
          <el-menu-item v-for="(item2, index2) in item.child" :key="index2" :index="item2.frontpath">
            <el-icon>
              <!--动态组件-->
              <component :is="item2.icon"></component>
            </el-icon>
            <span>{{ item2.name }}</span>
          </el-menu-item>
        </el-sub-menu>

        <!--没有子菜单就渲染这个-->
        <el-menu-item v-else :index="item.frontpath">
          <el-icon>
            <!--动态组件-->
            <component :is="item.icon"></component>
          </el-icon>
          <span>{{ item.name }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<style scoped>
.f-menu {
  top: 64px;
  bottom: 0;
  left: 0;
  overflow-y: auto;
  overflow-x: hidden;
  @apply shadow-md fixed bg-light-50;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 250px;
  min-height: 400px;
}
</style>
