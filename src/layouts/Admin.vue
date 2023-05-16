<script setup>
import FHeader from '~/layouts/components/FHeader.vue'
import FMenu from '~/layouts/components/FMenu.vue'
import FTabList from '~/layouts/components/FTabList.vue'
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
        <FTabList/>
        <!--
        下面这个 v-slot 可以在这两个链接看
        https://router.vuejs.org/zh/guide/migration/#%E5%B0%86%E5%86%85%E5%AE%B9%E4%BC%A0%E9%80%92%E7%BB%99%E8%B7%AF%E7%94%B1%E7%BB%84%E4%BB%B6%E7%9A%84-slot
        https://router.vuejs.org/zh/guide/advanced/composition-api.html#uselink
        -->
        <router-view v-slot="{ Component }">
          <transition name="fade">
            <keep-alive :max="10">
              <component :is="Component"></component>
            </keep-alive>
          </transition>
        </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped>
.el-aside {
  transition: all .4s;
}

/* 进入之前 */
.fade-enter-from {
  opacity: 0;
  -webkit-transform: translate3d(0, -100%, 0);
  transform: translate3d(0, -100%, 0);
}

/* 进入之后 */
.fade-enter-to {
  opacity: 1;
  -webkit-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
}

/* 离开之前 */
.fade-leave-from {
  opacity: 1;
}

/* 离开之后 */
.fade-leave-to {
  opacity: 0;
  -webkit-transform: translate3d(0, 100%, 0);
  transform: translate3d(0, 100%, 0);
}

/* 动画持续时间 */
.fade-enter-active,
.fade-leave-active {
  transition: all .3s;
}

/* 进入动画延迟 */
.fade-enter-active {
  transition-delay: .3s;
}
</style>
