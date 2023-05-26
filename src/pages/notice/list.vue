<script setup>
import { getNoticeList, createNotice, updateNotice, deleteNotice } from '~/api/notice.js'
import FormDrawer from '~/components/FormDrawer.vue'
import { useInitTable, userInitForm } from '~/composables/useCommon.js'

const {
  tableData,
  loading,
  currentPage,
  total,
  limit,
  getData,
  handleDelete,
} = useInitTable({
  getList: getNoticeList,
  delete: deleteNotice,
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
} = userInitForm({
  form: {
    title: '',
    content: '',
  },
  // 表单验证规则
  rules: {
    title: [
      {
        required: true,
        message: '公告标题不能为空',
        trigger: 'blur',
      },
    ],
    content: [
      {
        required: true,
        message: '公告内容不能为空',
        trigger: 'blur',
      },
    ],
  },
  getData,
  update: updateNotice,
  create: createNotice,
})
</script>

<template>
  <el-card shadow="never" class="border-0">
    <!--新增|刷新-->
    <div class="flex justify-between items-center mb-4">
      <el-button type="primary" size="small" @click="handleCreate">新增</el-button>
      <el-tooltip
          effect="dark"
          content="刷新数据"
          placement="top"
      >
        <el-button text @click="getData">
          <el-icon :size="20">
            <Refresh/>
          </el-icon>
        </el-button>
      </el-tooltip>
    </div>

    <!--表格-->
    <el-table :data="tableData" stripe style="width: 100%" v-loading="loading">
      <el-table-column prop="title" label="公告标题"/>
      <el-table-column prop="create_time" label="发布时间" width="680"/>
      <el-table-column label="操作" width="180" align="center">
        <template #default="scope">
          <el-button type="primary" size="small" text @click="handleEdit(scope.row)">修改</el-button>
          <el-popconfirm title="是否删除该公告？" confirm-button-text="确认" cancel-button-text="取消"
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
        <el-form-item label="公告标题" prop="title">
          <el-input v-model="form.title" placeholder="公告标题"></el-input>
        </el-form-item>
        <el-form-item label="公告内容" prop="content">
          <el-input v-model="form.content" placeholder="公告内容" type="textarea" :rows="5"></el-input>
        </el-form-item>
      </el-form>
    </FormDrawer>
  </el-card>
</template>

<style scoped>

</style>
