<script setup>
import FHeader from '~/layouts/components/FHeader.vue'
import FMenu from '~/layouts/components/FMenu.vue'
import FTagList from '~/layouts/components/FTagList.vue'
</script>

<template>
  <el-container>

    <!--头部-->
    <el-header>
      <FHeader/>
    </el-header>

    <el-container>
      <!--侧边栏-->
      <el-aside :width="$store.state.isCollapse ? '64px' : '250px' ">
        <FMenu/>
      </el-aside>

      <!--主内容区-->
      <el-main>
        <FTagList/>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped>
.el-aside {
  transition: all .4s;
}
</style>
