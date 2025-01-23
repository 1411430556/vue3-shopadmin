<script setup>

</script>

<template>
  <router-view></router-view>
</template>

<style>
/* 修改全局滚动条颜色为橙色 --使用腾讯云AI 啦啦啦*/
::-webkit-scrollbar-thumb {
  background: orange !important; /* 设置滚动条滑块颜色为橙色 */
  cursor: pointer;
  border-radius: 8px;
}
/* 设置全局背景颜色 */
body {
  @apply bg-gray-100;
}

#nprogress .bar {
  background-color: #8EC5FC !important;
  background-image: linear-gradient(90deg, #8EC5FC 0%, #E0C3FC 50%, #54f16a 100%) !important;
  height: 3px !important;
}

/* 全局滚动条样式 */
::-webkit-scrollbar {
  width: 4px;
  height: 6px;
}
::-webkit-scrollbar-button {
  display: none;
}
::-webkit-scrollbar-track {
  background: transparent;
  background: rgba(0, 0, 0, .1);
}
::-webkit-scrollbar-track-piece {
  background-color: transparent;
}
::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, .2);
  cursor: pointer;
  border-radius: 8px;
}
::-webkit-scrollbar-corner {
  display: none;
}
::-webkit-resizer {
  display: none;
}
</style>
