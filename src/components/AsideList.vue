<script setup>
defineProps({
  active: {
    type: Boolean,
    default: false,
  },
})
defineEmits(['edit', 'delete'])
</script>

<template>
  <div class="aside-list" :class="{ 'active': active }">
    <!-- truncate 是windicss的语法，多余的文字以省略号形式显示 -->
    <span class="truncate">
        <slot/>
    </span>
    <el-button class="ml-auto px-1" text type="primary" size="small" @click.stop="$emit('edit')">
      <el-icon :size="16">
        <Edit/>
      </el-icon>
    </el-button>

    <el-popconfirm title="是否删除该分类？" confirm-button-text="确认" cancel-button-text="取消" @confirm.stop="$emit('delete')">
      <template #reference>
        <el-button class="px-1" text type="primary" size="small">
          <el-icon :size="16">
            <Close/>
          </el-icon>
        </el-button>
      </template>
    </el-popconfirm>
  </div>
</template>

<style scoped>
.aside-list {
  border-bottom: 1px solid #f4f4f4;
  @apply flex items-center p-3 text-sm to-gray-600 cursor-pointer;
}

.aside-list:hover,
.active {
  @apply bg-blue-50;
}
</style>
