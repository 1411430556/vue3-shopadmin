<script setup>
import ImageAside from '~/components/ImageAside.vue'
import ImageMain from '~/components/ImageMain.vue'
import { ref } from 'vue'

// 优化重复点击图库分类，防止重复发送请求
let image_class_id_ = ''
const ImageAsideRef = ref(null)
// 打开抽屉
const handleOpenCreate = () => ImageAsideRef.value.handleCreate()
const ImageMainRef = ref(null)
const handleAsideChange = (image_class_id) => {
  if (image_class_id === image_class_id_) return
  image_class_id_ = image_class_id
  ImageMainRef.value.loadData(image_class_id)
}

// 打开上传图片抽屉
const handleOpenUpload = () => ImageMainRef.value.openUploadFile()

// const windowHeight = window.innerHeight || document.body.clientHeight
// const h = windowHeight - 64 - 44 - 40
</script>

<template>
  <!-- :style="{ height: h + 'px' }" -->
  <el-container class="bg-white rounded" style="height: 985px;">
    <el-header class="image-header">
      <el-button type="primary" size="small" @click="handleOpenCreate">新增图片分类</el-button>
      <el-button type="warning" size="small" @click="handleOpenUpload">上传图片</el-button>
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
