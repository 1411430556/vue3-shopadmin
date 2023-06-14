<script setup>
import { ref, reactive } from 'vue'
import { exportOrder } from '~/api/order.js'
import { toast } from '~/composables/util.js'
import moment from 'moment'

defineProps({
  tabs: Array,
})
const dialogVisible = ref(false)
const open = () => dialogVisible.value = true
const close = () => dialogVisible.value = false

const form = reactive({
  tab: null,
  time: '',
})
const loading = ref(false)
const onSubmit = () => {
  if (!form.tab) return toast('订单类型不能为空', 'error')
  loading.value = true
  let starttime = null
  let endtime = null
  if (form.time && Array.isArray(form.time)) {
    starttime = form.time[0]
    endtime = form.time[1]
  }
  exportOrder({
    tab: form.tab,
    starttime,
    endtime,
  }).then(data => {
    let url = window.URL.createObjectURL(new Blob([data]))
    let link = document.createElement('a')
    link.style.display = 'none'
    link.href = url
    let filename = moment().format('YYYY-MM-DD') + '.xlsx'
    link.setAttribute('download', filename)
    document.body.appendChild(link)
    link.click()
    close()
  }).finally(() => loading.value = false)
}

defineExpose({
  open,
})
</script>

<template>
  <el-drawer title="导出订单" v-model="dialogVisible" size="40%">
    <el-form :model="form" label-width="80px">
      <el-form-item label="订单类型">
        <el-select v-model="form.tab" placeholder="请选择">
          <el-option v-for="item in tabs" :key="item.key" :label="item.name" :value="item.key">

          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="时间范围">
        <el-date-picker v-model="form.time"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        value-format="YYYY-MM-DD"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" :loading="loading">导出</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>

<style scoped>

</style>
