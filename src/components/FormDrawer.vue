<!--抽屉组件的封装-->
<script setup>
import { ref } from 'vue'

const showDrawer = ref(false)

const props = defineProps({
  title: String,
  size: {
    type: String,
    default: '45%',
  },
  // 控制是否在关闭 Drawer 之后将子元素全部销毁
  destroyOnClose: {
    type: Boolean,
    default: false,
  },
  confirmText: {
    type: String,
    default: '提交',
  },
})

// 提交按钮 loading 状态控制
const loading = ref(false)
const showLoading = () => loading.value = true
const hideLoading = () => loading.value = false

// 打开抽屉
const open = () => showDrawer.value = true
// 关闭抽屉
const close = () => showDrawer.value = false

const emit = defineEmits(['submit'])
// 提交
const submit = () => emit('submit')

// 向父组件暴露以下方法
defineExpose({
  open,
  close,
  showLoading,
  hideLoading,
})
</script>

<template>
  <el-drawer v-model="showDrawer"
             :title="title"
             :size="size"
             :close-on-click-modal="false"
             :destroy-on-close="destroyOnClose">
    <div class="formDrawer">
      <!-- 内容部分 -->
      <div class="body">
        <slot></slot>
      </div>
      <!-- 底部按钮 -->
      <div class="actions">
        <el-button type="primary" @click="submit" :loading="loading">{{ confirmText }}</el-button>
        <el-button type="default" @click="close">取消</el-button>
      </div>
    </div>
  </el-drawer>
</template>

<style scoped>
.formDrawer {
  position: relative;
  width: 100%;
  height: 100%;
  @apply flex flex-col;
}

.formDrawer .body {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 50px;
  flex: 1;
  overflow-y: auto;
}

.formDrawer .actions {
  height: 50px;
  @apply flex items-center mt-auto;
}
</style>
