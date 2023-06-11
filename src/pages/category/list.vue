<script setup>
import ListHeader from '~/components/ListHeader.vue'
import FormDrawer from '~/components/FormDrawer.vue'
import GoodsDrawer from '~/pages/category/components/GoodsDrawer.vue'
import {
  getCategoryList,
  createCategory,
  updateCategory,
  updateCategoryStatus,
  deleteCategory,
} from '~/api/category.js'
import { useInitTable, useInitForm } from '~/composables/useCommon.js'
import { ref } from 'vue'

const {
  loading,
  tableData,
  getData,
  handleDelete,
  handleStatusChange,
} = useInitTable({
  getList: getCategoryList,
  onGetListSuccess: (value) => {
    tableData.value = value.map(o => {
      o.goodsDrawerLoading = false
      return o
    })
  },
  delete: deleteCategory,
  updateStatus: updateCategoryStatus,
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
  },
  // 表单验证规则
  rules: {},
  getData,
  update: updateCategory,
  create: createCategory,
})

const GoodsDrawerRef = ref(null)
const openGoodsDrawer = (data) => GoodsDrawerRef.value.open(data)
</script>

<template>
  <el-card shadow="never" class="border-0">
    <ListHeader @create="handleCreate" @refresh="getData"/>
    <el-tree :data="tableData" :props="{label: 'name', children: 'child'}"
             v-loading="loading" node-key="id">
      <template #default="{ node, data }">
        <!--左侧-->
        <div class="custom-tree-node">
          <span>{{ data.name }}</span>
          <!--右侧-->
          <div class="ml-auto">
            <span @click.stop="()=>{}" class="mr-6">
              <el-button text type="primary" size="small" class="mr-3" @click="openGoodsDrawer(data)" :loading="data.goodsDrawerLoading">推荐商品</el-button>
              <el-switch @change="handleStatusChange($event, data)" :model-value="data.status" :active-value="1"
                         :inactive-value="0"/>
            </span>
            <el-button text type="primary" size="small" @click.stop="handleEdit(data)" class="mr-3">修改</el-button>
            <el-popconfirm title="是否删除该记录？" confirm-button-text="确认" cancel-button-text="取消"
                           @confirm="handleDelete(data.id)">
              <template #reference>
                <span @click.stop="()=>{}">
                  <el-button text type="primary" size="small">删除</el-button>
                </span>
              </template>
            </el-popconfirm>

          </div>
        </div>
      </template>
    </el-tree>

    <!--抽屉-->
    <FormDrawer ref="formDrawerRef" :title="drawerTitle" @submit="handleSubmit">
      <el-form :model="form" ref="formRef" :rules="rules" label-width="80px" :inline="false">
        <!--<el-form-item label="上级菜单" prop="rule_id">-->
        <!--  <el-cascader v-model="form.rule_id"-->
        <!--               :options="options"-->
        <!--               :props="{value: 'id', label: 'name', children: 'child', checkStrictly: true, emitPath: false}"-->
        <!--               placeholder="请选择上级菜单"/>-->
        <!--</el-form-item>-->
        <el-form-item label="分类名称" prop="name">
          <el-input v-model="form.name" placeholder="分类名称"/>
        </el-form-item>
      </el-form>
    </FormDrawer>
    <!--弹框组件-->
    <GoodsDrawer ref="GoodsDrawerRef"/>
  </el-card>
</template>

<style scoped>
.custom-tree-node {
  display: flex;
  flex: 1;
  align-items: center;
  font-size: 14px;
  padding-right: 8px;
}

:deep(.el-tree-node__content) {
  padding: 20px 0;
}
</style>
