<script setup>

</script>

<template>
  <router-view></router-view>
</template>

<style>
/* 设置全局背景颜色 */
body {
  @apply bg-gray-100;
}

#nprogress .bar {
  background-color: #8EC5FC !important;
  background-image: linear-gradient(90deg, #8EC5FC 0%, #E0C3FC 50%, #54f16a 100%) !important;
  height: 3px !important;
}
</style>
