<script setup>
import { ref } from 'vue'
import { useInitTable } from '~/composables/useCommon.js'
import { getGoodsList } from '~/api/goods.js'

const dialogVisible = ref(false)

const {
  tableData,
  loading,
  currentPage,
  total,
  limit,
  getData,
  handleSelectionChange,
  multipleTableRef,
  multiSelectionIDs,
} = useInitTable({
  searchForm: {
    title: '',
    tab: 'all',
    category_id: null,
  },
  getList: getGoodsList,
  onGetListSuccess: (value) => {
    tableData.value = value.list
    total.value = value.totalCount
  },
})

function close () {
  dialogVisible.value = false
}

const callbackFunction = ref(null)
const open = (callback = null) => {
  callbackFunction.value = callback
  dialogVisible.value = true
}

const submit = () => {
  if (typeof callbackFunction.value === 'function') {
    callbackFunction.value(multiSelectionIDs.value)
  }
  close()
}

defineExpose({
  open,
})
</script>

<template>
  <el-dialog title="商品选择" v-model="dialogVisible" width="80%" destroy-on-close>
    <el-table ref="multipleTableRef" @selection-change="handleSelectionChange"
              :data="tableData" stripe style="width: 100%" v-loading="loading" height="300px" empty-text="无数据">
      <el-table-column type="selection" width="55"/>
      <el-table-column label="商品">
        <template #default="{row}">
          <div class="flex">
            <el-image class="mr-3 rounded" :src="row.cover" style="width: 50px; height: 50px;" :lazy="true"
                      fit="cover"/>
            <div class="flex-1">
              <p>{{ row.title }}</p>
              <p class="text-gray-400 text-xs mb-1">分类:{{ row.category ? row.category.name : '未分配' }}</p>
              <p class="text-gray-400 text-xs">创建时间:{{ row.create_time }}</p>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="总库存" width="150" prop="stock" align="center"/>
      <el-table-column label="价格(元)" width="150" align="center">
        <template #default="{row}">
          <span class="text-rose-500">￥{{ row.min_price }}</span>
          <el-divider direction="vertical"/>
          <span class="text-gray-500 text-xs">￥{{ row.min_oprice }}</span>
        </template>
      </el-table-column>
    </el-table>
    <!--分页器-->
    <div class="flex justify-center items-center mt-5">
      <el-pagination background layout="prev, pager, next" :total="total" :current-page="currentPage"
                     :page-size="limit" @current-change="getData"/>
    </div>
    <template #footer>
      <span>
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="submit">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped>

</style>
