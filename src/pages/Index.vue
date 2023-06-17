<script setup>
import CountTo from '~/components/CountTo.vue'
import IndexNavs from '~/components/IndexNavs.vue'
import IndexChart from '~/components/IndexChart.vue'
import IndexCard from '~/components/IndexCard.vue'
import { getStatistics1, getStatistics2 } from '~/api/index.js'
import { ref } from 'vue'

const panels = ref([])
getStatistics1().then(res => {
  panels.value = res.panels
})

// 右下角数据
const goods = ref([])
const order = ref([])
getStatistics2().then((value) => {
  goods.value = value.goods
  order.value = value.order
})
</script>

<template>
  <div>
    <el-row :gutter="20" v-permission="['getStatistics1,GET']">
      <!-- 骨架屏 -->
      <template v-if="panels.length === 0">
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
                <!--分割线-->
                <el-divider/>
                <div class="flex justify-between text-sm to-gray-500">
                  <el-skeleton-item variant="text" style="width: 50%"/>
                  <el-skeleton-item variant="text" style="width: 10%"/>
                </div>
              </el-card>
              <el-skeleton-item variant="text" style="width: 30%"/>
            </template>
          </el-skeleton>
        </el-col>
      </template>

      <!-- 真正内容 -->
      <el-col :span="6" v-for="(item, index) in panels" :key="index">
        <el-card shadow="hover" class="border-0 cursor-default">
          <template #header>
            <div class="flex justify-between">
              <span class="text-sm">{{ item.title }}</span>
              <el-tag :type="item.unitColor" effect="plain">
                {{ item.unit }}
              </el-tag>
            </div>
          </template>
          <span class="text-3xl font-bold text-gray-500">
            <CountTo :value="item.value"/>
          </span>
          <!--分割线-->
          <el-divider/>
          <div class="flex justify-between text-sm to-gray-500">
            <span>{{ item.subTitle }}</span>
            <span>{{ item.subValue }}</span>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!--中间8个图标-->
    <IndexNavs/>

    <el-row :gutter="20" class="mt-5">
      <el-col :span="12">
        <!--echarts图表-->
        <IndexChart v-permission="['getStatistics3,GET']"/>
      </el-col>
      <el-col :span="12" v-permission="['getStatistics2,GET']">
        <!--右下方卡片-->
        <IndexCard title="店铺及商品提示" tip="店铺及商品提示" :btns="goods"/>
        <IndexCard title="交易提示" tip="需要立即处理的交易订单" :btns="order" class="mt-2.5"/>
      </el-col>
    </el-row>
  </div>
</template>

