<script setup>
import { getSkusList, createSkus, updateSkus, deleteSkus, updateSkusStatus } from '~/api/skus.js'
import { useInitTable, useInitForm } from '~/composables/useCommon.js'
import FormDrawer from '~/components/FormDrawer.vue'
import ListHeader from '~/components/ListHeader.vue'
import TagInput from '~/components/TagInput.vue'
import { ref } from 'vue'
import { toast } from '~/composables/util.js'

const {
  tableData,
  loading,
  currentPage,
  total,
  limit,
  getData,
  handleDelete,
  handleStatusChange,
} = useInitTable({
  getList: getSkusList,
  delete: deleteSkus,
  updateStatus: updateSkusStatus,
})

const {
  formDrawerRef,
  formRef,
  form,
  rules,
  drawerTitle,
  handleSubmit,
  handleCreate,
  handleEdit,
} = useInitForm({
  form: {
    name: '',
    status: 1,
    default: '',
    order: 50,
  },
  // 表单验证规则
  rules: {
    name: [
      {
        required: true,
        message: '规格名称不能为空',
        trigger: 'blur',
      },
    ],
    default: [
      {
        required: true,
        message: '规格值不能为空',
        trigger: 'blur',
      },
    ],
  },
  getData,
  update: updateSkus,
  create: createSkus,
})

// 多选框
// 多选选中ID
const multiSelectionIDs = ref([])
const handleSelectionChange = (e) => {
  multiSelectionIDs.value = e.map(item => item.id)
}
// 批量删除
const multipleTableRef = ref(null)
const handleMultiDelete = () => {
  loading.value = true
  deleteSkus(multiSelectionIDs.value).then(value => {
    toast('删除成功')
    // 清空选中
    if (multipleTableRef.value) {
      multipleTableRef.value.clearSelection()
    }
    getData()
  }).finally(() => loading.value = false)
}
</script>

<template>
  <el-card shadow="never" class="border-0">
    <!--新增|刷新-->
    <ListHeader layout="create,delete,refresh" @create="handleCreate" @refresh="getData" @delete="handleMultiDelete"/>

    <!--表格-->
    <el-table ref="multipleTableRef" :data="tableData" stripe style="width: 100%" @selection-change="handleSelectionChange"
              v-loading="loading">
      <el-table-column type="selection" width="55"/>
      <el-table-column prop="name" label="规格名称"/>
      <el-table-column prop="default" label="规格值" width="380"/>
      <el-table-column prop="order" label="排序"/>
      <el-table-column label="状态" width="580">
        <template #default="{row}">
          <el-switch :model-value="row.status" :active-value="1" :inactive-value="0"
                     @change="handleStatusChange($event, row)" :loading="row.statusLoading"/>
        </template>

      </el-table-column>
      <el-table-column label="操作" width="250" align="center">
        <template #default="scope">
          <el-button type="primary" size="small" text @click="handleEdit(scope.row)">修改</el-button>
          <el-popconfirm title="是否删除该规格？" confirm-button-text="确认" cancel-button-text="取消"
                         @confirm="handleDelete(scope.row.id)">
            <template #reference>
              <el-button text type="primary" size="small">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <!--分页器-->
    <div class="flex justify-center items-center mt-5">
      <el-pagination background layout="prev, pager, next" :total="total" :current-page="currentPage" :page-size="limit"
                     @current-change="getData"/>
    </div>

    <!--抽屉-->
    <FormDrawer destroyOnClose ref="formDrawerRef" :title="drawerTitle" @submit="handleSubmit">
      <el-form :model="form" ref="formRef" :rules="rules" label-width="80px" :inline="false">
        <el-form-item label="规格名称" prop="name">
          <el-input v-model="form.name" placeholder="规格名称"></el-input>
        </el-form-item>
        <el-form-item label="排序" prop="order">
          <el-input-number v-model="form.order" :min="0" :max="10000"/>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="0"/>
        </el-form-item>
        <el-form-item label="规格值" prop="default">
          <TagInput v-model="form.default"/>
        </el-form-item>
      </el-form>
    </FormDrawer>
  </el-card>
</template>

<style scoped>

</style>
