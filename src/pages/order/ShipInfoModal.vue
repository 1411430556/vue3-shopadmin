<script setup>
import { ref } from 'vue'
import { getShipInfo } from '~/api/order.js'
import { toast } from '~/composables/util.js'

const dialogVisible = ref(false)
const info = ref({})
const open = (id) => {
  // 返回的是一个 promise
  return getShipInfo(id).then(value => {
    if (value.status !== 0) return toast(value.msg, 'error')
    info.value = value.result
    dialogVisible.value = true
  })
}
defineExpose({
  open,
})
</script>

<template>
  <el-drawer title="物流信息" v-model="dialogVisible" size="40%">
    <el-card shadow="never" class="border-0 mb-3">
      <div class="flex item-center">
        <el-image :src="info.logo" fit="fill" lazy style="width: 60px;height: 60px;" class="rounded border"/>
        <div class="ml-3">
          <p>物流公司:{{ info.typename }}</p>
          <p>物流单号:{{ info.number }}</p>
        </div>
      </div>
    </el-card>

    <el-card shadow="never" class="border-0 border-t">
      <el-timeline class="ml-[-40px]">
        <el-timeline-item :timestamp="item.time" placement="top" v-for="(item, index) in info.list" :key="index">
          {{ item.status }}
        </el-timeline-item>
      </el-timeline>
    </el-card>
  </el-drawer>
</template>

<style scoped>

</style>
