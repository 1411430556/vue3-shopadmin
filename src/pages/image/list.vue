<script setup>
import ImageAside from '~/components/ImageAside.vue'
import ImageMain from '~/components/ImageMain.vue'
import { ref } from 'vue'

const ImageAsideRef = ref(null)
// 打开抽屉
const handleOpenCreate = () => ImageAsideRef.value.handleCreate()

const ImageMainRef = ref(null)
let a = false
const handleAsideChange = (image_class_id) => ImageMainRef.value.loadData(image_class_id)

// const windowHeight = window.innerHeight || document.body.clientHeight
// const h = windowHeight - 64 - 44 - 40
</script>

<template>
  <!-- :style="{ height: h + 'px' }" -->
  <el-container class="bg-white rounded" style="height: 985px;">
    <el-header class="image-header">
      <el-button type="primary" size="small" @click="handleOpenCreate">新增图片分类</el-button>
    </el-header>
    <el-container>
      <!-- 左侧边栏 -->
      <ImageAside ref="ImageAsideRef" @change="handleAsideChange"/>
      <!-- 主体部分 -->
      <ImageMain ref="ImageMainRef"/>
    </el-container>
  </el-container>
</template>

<style scoped>
.image-header {
  border-bottom: 1px solid #eeeeee;
  @apply flex items-center;
}
</style>
