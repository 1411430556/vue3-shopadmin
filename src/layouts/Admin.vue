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
        <!--这里放备案信息-->
        <div class="putOnRecords">
          <svg class="icon record" aria-hidden="true">
            <use xlink:href="#icon-beian"></use>
          </svg>
          <span class="num">
            <a href="https://beian.miit.gov.cn/" target="_blank">蜀ICP备2023006780号-1</a>
          </span>
        </div>
        <div style="width:300px;margin:0 auto; padding:20px 0;">
          <a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=51062302000198"
             style="display:inline-block;text-decoration:none;height:20px;line-height:20px;">
            <img src="https://image.fc-barcelona.cn/%E5%A4%87%E6%A1%88%E5%9B%BE%E6%A0%87.png" style="float:left;" alt=""/>
            <p style="float:left;height:20px;line-height:20px;margin: 0 0 0 5px; color:#939393;">川公网安备&nbsp;51062302000198号</p>
          </a>
        </div>
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

.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.25em;
  fill: currentColor;
  overflow: hidden;
}

.putOnRecords {
  position: relative;
  text-align: center;
  margin-top: 50px;
  left: 50%;
  bottom: 0;
  transform: translate(-50%, -50%);
  vertical-align: middle;
  z-index: 999;
}

.record {
  display: inline-block;
  font-size: 20px;
  margin: 0 auto;
}

.num {
  display: inline-block;
  margin: 0 auto;
  font-size: 15px;
}

.num a {
  color: #f96c16;
}
</style>
