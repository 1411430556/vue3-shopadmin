<script setup>
import { ref, reactive } from 'vue'
import { getSysconfig, setSysconfig } from '~/api/sysconfig'
import { toast } from '~/composables/util'

const form = reactive({
  'ship': '',
})

const loading = ref(false)

function getData () {
  loading.value = true
  getSysconfig().then(res => {
    for (let k in form) {
      form[k] = res[k]
    }
  }).finally(() => {
    loading.value = false
  })
}

getData()

const submit = () => {
  loading.value = true
  setSysconfig({
    ...form,
  }).then(() => {
    toast('修改成功')
    getData()
  }).finally(() => {
    loading.value = false
  })
}
</script>

<template>
  <div v-loading="loading" class="bg-white p-4 rounded">
    <el-form :model="form" label-width="160px">
      <el-form-item label="物流查询key">
        <div>
          <el-input v-model="form.ship" placeholder="物流查询key"></el-input>
          <el-tag type="info">
            用于查询物流信息，接口申请（仅供参考）
          </el-tag>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="default" @click="submit">保存</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<style scoped>

</style>
