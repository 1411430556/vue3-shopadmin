<script setup>
import FormDrawer from '~/components/FormDrawer.vue'
import ChooseGoods from '~/components/ChooseGoods.vue'
import { ref } from 'vue'
import { getCategoryGoods, deleteCategoryGoods, connectCategoryGoods } from '~/api/category.js'
import { toast } from '~/composables/util.js'

const formDrawerRef = ref(null)
const category_id = ref(0)
const tableData = ref([])
const open = (item) => {
  category_id.value = item.id
  item.goodsDrawerLoading = true
  getData().then(() => formDrawerRef.value.open()).finally(() => {
    item.goodsDrawerLoading = false
  })
}

function getData () {
  return getCategoryGoods(category_id.value).then(value => {
    tableData.value = value.map(o => {
      o.loading = false
      return o
    })
  })
}

const handleDelete = (row) => {
  row.loading = true
  deleteCategoryGoods(row.id).then(() => {
    toast('删除成功')
    getData()
  })
}

const ChooseGoodsRef = ref(null)
const handleConnect = () => {
  ChooseGoodsRef.value.open((goods_ids) => {
    formDrawerRef.value.showLoading()
    connectCategoryGoods({
      category_id: category_id.value,
      goods_ids,
    }).then(() => {
      getData()
      toast('关联成功')
    }).finally(() => formDrawerRef.value.hideLoading())
  })
}

defineExpose({
  open,
})
</script>

<template>
  <FormDrawer ref="formDrawerRef" title="推荐商品" confirmText="关联" @submit="handleConnect">
    <el-table :data="tableData" border stripe style="width: 100%;" empty-text="无数据">
      <el-table-column prop="goods_id" label="ID" width="60"/>
      <el-table-column label="商品封面" width="180">
        <template #default="{row}">
          <el-image :src="row.cover" fit="fill" lazy style="width: 64px;height: 64px;"/>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="商品名称" width="180"/>
      <el-table-column prop="name" label="操作按钮" width="180">
        <template #default="{row}">
          <el-popconfirm title="是否删除该记录？" confirm-button-text="确认" cancel-button-text="取消"
                         @confirm="handleDelete(row)">
            <template #reference>
                <span @click.stop="()=>{}">
                  <el-button text type="primary" size="small" :loading="row.loading">删除</el-button>
                </span>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </FormDrawer>

  <ChooseGoods ref="ChooseGoodsRef"/>
</template>

<style scoped>

</style>
