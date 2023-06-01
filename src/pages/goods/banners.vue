<script setup>
import { reactive, ref } from 'vue'
import ChooseImage from '~/components/ChooseImage.vue'
import { readGoods, setGoodsBanner } from '~/api/goods.js'
import { toast } from '~/composables/util.js'

const dialogVisible = ref(false)
const form = reactive({
  banners: [],
})

const goodsID = ref(0)
const open = (row) => {
  goodsID.value = row.id
  row.bannersLoading = true
  readGoods(goodsID.value).then(value => {
    form.banners = value.goodsBanner.map(item => item.url)
    dialogVisible.value = true
  }).finally(() => row.bannersLoading = false)
}

// 提交数据
const emits = defineEmits(['reloadData'])
const loading = ref(false)
const submit = () => {
  loading.value = true
  setGoodsBanner(goodsID.value, form).then(() => {
    toast('设置轮播图成功')
    dialogVisible.value = false
    emits('reloadData')
  }).finally(() => loading.value = false)
}

defineExpose({
  open,
})
</script>

<template>
  <el-drawer title="设置轮播图" v-model="dialogVisible" size="50%" destroy-on-close>
    <el-form :model="form" label-width="80px">
      <el-form-item label="轮播图">
        <ChooseImage :limit="9" v-model="form.banners"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit" :loading="loading">提交</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>

<style scoped>

</style>
