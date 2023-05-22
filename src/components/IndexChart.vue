<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { getStatistics3 } from '~/api/index.js'
import * as echarts from 'echarts/core'
import { GridComponent } from 'echarts/components'
import { BarChart } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'

echarts.use([GridComponent, BarChart, CanvasRenderer])

// 因为 setup 生命周期时还不能获取到 DOM 元素，所以得写在 onMounted 生命周期里
let myChart = null
onMounted(() => {
  let chartDom = document.getElementById('chart')
  myChart = echarts.init(chartDom)
  getData()
})
// 设置图表自适应窗口大小变化
window.addEventListener('resize', function () {
  myChart.resize()
})
// 销毁 echarts 实例，防止出现白屏
onBeforeUnmount(() => {
  if (myChart) echarts.dispose(myChart)
})

function getData () {
  let option = {
    xAxis: {
      type: 'category',
      data: [],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [],
        type: 'bar',
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.2)',
        },
      },
    ],
  }
  // 获取到数据展示之前显示loading
  myChart.showLoading()
  getStatistics3(current.value).then(value => {
    option.xAxis.data = value.x
    option.series[0].data = value.y
    myChart.setOption(option)
  }).finally(() => {
    // 获取到数据之后隐藏loading
    myChart.hideLoading()
  })
}

const current = ref('week')

const handleChoose = (type) => {
  current.value = type
  getData()
}

const options = [
  {
    text: '近1个月',
    value: 'month',
  },
  {
    text: '近1周',
    value: 'week',
  },
  {
    text: '近24小时',
    value: 'hour',
  },
]

</script>

<template>
  <el-card shadow="never">
    <template #header>
      <div class="flex justify-between">
        <span class="text-sm leading-7 cursor-default">订单统计</span>
        <div>
          <el-check-tag v-for="(item, index) in options" :key="index" :checked="current === item.value"
                        @click="handleChoose(item.value)"
                        style="margin-right: 8px">
            {{ item.text }}
          </el-check-tag>
        </div>
      </div>
    </template>

    <!--echarts-->
    <div id="chart" style="width: 100%;height: 300px;"></div>
  </el-card>
</template>

<style scoped>

</style>
