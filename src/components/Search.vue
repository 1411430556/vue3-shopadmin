<script setup>
import { ref, useSlots } from 'vue'

defineProps({
  model: Object,
})
defineEmits(['search', 'reset'])
const showSearch = ref(false)
const slots = useSlots()
// 判断具名插槽 show 里是否有内容
const hasShowSearch = ref(!!slots.show)
</script>

<template>
  <el-form :model="model" class="mb-3" size="small">
    <el-row :gutter="20">
      <slot/>
      <template v-if="showSearch">
        <slot name="show"/>
      </template>
      <el-col :span="8" :offset="showSearch ? 0 : 8">
        <div class="flex justify-end items-center">
          <el-button type="primary" @click="$emit('search')">搜索</el-button>
          <el-button @click="$emit('reset')">重置</el-button>
                                                            <!-- 下面直接换成 v-if="$slots.show" 也可以 -->
          <el-button type="primary" text @click="showSearch = !showSearch" v-if="hasShowSearch">
            {{ showSearch ? '收起' : '展开' }}
            <el-icon>
              <ArrowUp v-if="showSearch"/>
              <ArrowDown v-else/>
            </el-icon>
          </el-button>
        </div>
      </el-col>
    </el-row>
  </el-form>
</template>

<style scoped>

</style>
