<script setup>
import { reactive, ref } from 'vue'
import FormDrawer from '~/components/FormDrawer.vue'
import Editor from '~/components/Editor.vue'
import { readGoods, updateGoods } from '~/api/goods.js'
import { toast } from '~/composables/util.js'

const formDrawerRef = ref(null)
const form = reactive({
  content: '',
})

const goodsID = ref(0)
const open = (row) => {
  goodsID.value = row.id
  row.contentLoading = true
  readGoods(goodsID.value).then(value => {
    form.content = value.content
    formDrawerRef.value.open()
  }).finally(() => row.contentLoading = false)
}

// 提交数据
const emits = defineEmits(['reloadData'])
const submit = () => {
  formDrawerRef.value.showLoading()
  updateGoods(goodsID.value, form).then(() => {
    toast('设置商品详情成功')
    formDrawerRef.value.close()
    emits('reloadData')
  }).finally(() => formDrawerRef.value.hideLoading())
}

defineExpose({
  open,
})
</script>

<template>
  <FormDrawer ref="formDrawerRef" title="设置商品详情" @submit="submit" destroy-on-close>
    <el-form :model="form">
      <el-form-item>
        <Editor v-model="form.content"/>
      </el-form-item>
    </el-form>
  </FormDrawer>
</template>

<style scoped>

</style>
