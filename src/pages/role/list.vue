<script setup>
import { getRoleList, createRole, updateRole, deleteRole, updateRoleStatus } from '~/api/role.js'
import FormDrawer from '~/components/FormDrawer.vue'
import { useInitTable, useInitForm } from '~/composables/useCommon.js'
import ListHeader from '~/components/ListHeader.vue'

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
  getList: getRoleList,
  delete: deleteRole,
  updateStatus: updateRoleStatus,
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
    desc: '',
    status: 1,
  },
  // 表单验证规则
  rules: {
    name: [
      {
        required: true,
        message: '角色名称不能为空',
        trigger: 'blur',
      },
    ],
  },
  getData,
  update: updateRole,
  create: createRole,
})
</script>

<template>
  <el-card shadow="never" class="border-0">
    <!--新增|刷新-->
    <ListHeader @create="handleCreate" @refresh="getData"/>

    <!--表格-->
    <el-table :data="tableData" stripe style="width: 100%" v-loading="loading">
      <el-table-column prop="name" label="角色名称"/>
      <el-table-column prop="desc" label="角色描述" width="680"/>
      <el-table-column label="状态" width="580">
        <template #default="{row}">
          <el-switch :model-value="row.status" :active-value="1" :inactive-value="0"
                     @change="handleStatusChange($event, row)" :loading="row.statusLoading"/>
        </template>

      </el-table-column>
      <el-table-column label="操作" width="180" align="center">
        <template #default="scope">
          {{scope.row.id}}
          <el-button type="primary" size="small" text @click="handleEdit(scope.row)">修改</el-button>
          <el-popconfirm title="是否删除该角色？" confirm-button-text="确认" cancel-button-text="取消"
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
    <FormDrawer ref="formDrawerRef" :title="drawerTitle" @submit="handleSubmit">
      <el-form :model="form" ref="formRef" :rules="rules" label-width="80px" :inline="false">
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="form.name" placeholder="角色名称"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="desc">
          <el-input v-model="form.desc" placeholder="角色描述" type="textarea" :rows="5"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="0"/>
        </el-form-item>
      </el-form>
    </FormDrawer>
  </el-card>
</template>

<style scoped>

</style>
