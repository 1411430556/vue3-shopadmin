<script setup>
import { getAgentStatistics } from '~/api/distribution.js'
import { ref } from 'vue'
import { User } from '@element-plus/icons-vue'

const list = ref([])
const loading = ref(false)
loading.value = true
getAgentStatistics().then(value => {
  list.value = value.panels
}).finally(() => loading.value = false)
</script>

<template>
  <el-row :gutter="20" class="mb-5">
    <!--骨架屏-->
    <template v-if="loading">
      <el-col :span="6" v-for="i in 4" :key="i">
        <el-skeleton style="width: 100%" animated loading>
          <template #template>
            <el-card shadow="never" class="border-0">
              <template #header>
                <div class="flex justify-between">
                  <el-skeleton-item variant="text" style="width: 50%"/>
                  <el-skeleton-item variant="text" style="width: 10%"/>
                </div>
              </template>
              <el-skeleton-item variant="h3" style="width: 80%"/>
            </el-card>
          </template>
        </el-skeleton>
      </el-col>
    </template>

    <el-col :span="6" v-for="(item, index) in list" :key="index">
      <el-card shadow="never">
        <div class="flex items-center">
            <el-icon :size="20" :class="item.color" class="text-white w-[40px] h-[40px] rounded-full">
              <User v-if="index === 0"/>
              <ShoppingCart v-if="index === 1"/>
              <PriceTag v-if="index === 2"/>
              <Timer v-if="index === 3"/>
            </el-icon>
            <div class="ml-6">
              <h2 class="text-lg font-bold">{{item.value}}</h2>
              <small class="text-xs text-gray-400">{{item.label}}</small>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<style scoped>

</style>
