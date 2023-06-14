<script setup>
import { computed } from 'vue'
import { Download } from '@element-plus/icons-vue'

defineEmits(['create', 'refresh', 'delete', 'download'])
const props = defineProps({
  layout: {
    type: String,
    default: 'create,refresh',  // 不要加空格
  },
})
const btns = computed(() => props.layout.split(','))
</script>

<template>
  <div class="flex justify-between items-center mb-4">
    <div>
      <el-button v-if="btns.includes('create')" type="primary" size="small" @click="$emit('create')">新增</el-button>
      <el-popconfirm v-if="btns.includes('delete')" title="是否删除选中记录？" confirm-button-text="确认"
                     cancel-button-text="取消"
                     @confirm="$emit('delete')">
        <template #reference>
          <el-button type="danger" size="small">批量删除</el-button>
        </template>
      </el-popconfirm>
      <slot/>
    </div>
   <div>
     <el-tooltip
         v-if="btns.includes('refresh')"
         effect="dark"
         content="刷新数据"
         placement="top"
     >
       <el-button size="small" text @click="$emit('refresh')">
         <el-icon :size="15">
           <Refresh/>
         </el-icon>
       </el-button>
     </el-tooltip>

     <el-tooltip
         v-if="btns.includes('download')"
         effect="dark"
         content="导出数据"
         placement="top"
     >
       <el-button size="small" text @click="$emit('download')">
         <el-icon :size="15">
           <Download/>
         </el-icon>
       </el-button>
     </el-tooltip>
   </div>
  </div>
</template>

<style scoped>

</style>
