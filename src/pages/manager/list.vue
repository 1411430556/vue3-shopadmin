<script setup>
import { getManagerList, updateManagerStatus, createManager, updateManager, deleteManager } from '~/api/manager.js'
import FormDrawer from '~/components/FormDrawer.vue'
import ChooseImage from '~/components/ChooseImage.vue'
import { toast } from '~/composables/util.js'
import { computed, reactive, ref } from 'vue'

// 搜索
const searchForm = reactive({
  keyword: '',
})
// 重置搜索
const resetSearchForm = () => {
  searchForm.keyword = ''
  getData()
}

// 管理员类型列表
const roles = ref([])

// 表格数据
const tableData = ref([])
const loading = ref(false)
// 分页
const currentPage = ref(1)
const total = ref(0)
const limit = ref(10)

// 获取数据
function getData (numberOfPages = null) {
  // 点击按钮也换当前显示的哪页
  if (typeof numberOfPages === 'number') currentPage.value = numberOfPages
  loading.value = true
  getManagerList(currentPage.value, searchForm).then(value => {
    tableData.value = value.list.map(o => {
      o.statusLoading = false
      return o
    })
    total.value = value.totalCount
    roles.value = value.roles
  }).finally(() => loading.value = false)
}

getData()

// 删除
const handleDelete = (id) => {
  loading.value = true
  deleteManager(id).then(() => {
    toast('删除成功')
    getData()
  }).finally(() => loading.value = false)
}

// 新增管理员列表，表单部分
const formDrawerRef = ref(null)
const formRef = ref(null)
const form = reactive({
  username: '',
  password: '',
  role_id: null,
  status: 1,
  avatar: '',
})
// 表单验证规则
const rules = {
  username: [
    {
      required: true,
      message: '用户名不能为空',
      trigger: 'blur',
    },
  ],
  role_id: [
    {
      required: true,
      message: '角色不能为空',
      trigger: 'blur',
    },
  ],
}

// 判断抽屉打开后抽屉的标题是新增还是修改；点击修改会拿到一个ID，就为true，点击新增下面把ID设为0了，就是false
const editID = ref(0)
const drawerTitle = computed(() => editID.value ? '修改' : '新增')

const handleSubmit = () => {
  formRef.value.validate((valid) => {
    if (!valid) return
    formDrawerRef.value.showLoading()
    const fun = editID.value ? updateManager(editID.value, form) : createManager(form)
    fun.then(() => {
      toast(drawerTitle.value + '成功')
      // 修改刷新当前页，新增刷新第一页
      getData(editID.value ? false : 1)
      formDrawerRef.value.close()
    }).finally(() => formDrawerRef.value.hideLoading())
  })
}

// 重置表单
function resetForm (row) {
  if (formRef.value) formRef.value.clearValidate()
  if (row) {
    for (let key in form) {
      form[key] = row[key]
    }
  }
}

// 新增
const handleCreate = () => {
  editID.value = 0
  resetForm({
    username: '',
    password: '',
    role_id: null,
    status: 1,
    avatar: '',
  })
  formDrawerRef.value.open()
}

// 修改
const handleEdit = (row) => {
  editID.value = row.id
  resetForm(row)
  formDrawerRef.value.open()
}

// 修改状态
const handleStatusChange = (status, row) => {
  // status 是开关的状态 0关 1开
  row.statusLoading = true
  updateManagerStatus(row.id, status).then(() => {
    toast('修改状态成功')
    row.status = status
  }).finally(() => {
    row.statusLoading = false
  })
}
</script>

<template>
  <el-card shadow="never" class="border-0">

    <!--搜索-->
    <el-form :model="searchForm" class="mb-3" size="small">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="关键词">
            <el-input v-model="searchForm.keyword" placeholder="管理员名称" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" :offset="8">
          <div class="flex justify-end items-center">
            <el-button type="primary" @click="getData">搜索</el-button>
            <el-button @click="resetSearchForm">重置</el-button>
          </div>
        </el-col>
      </el-row>
    </el-form>

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

    <el-table :data="tableData" stripe style="width: 100%" v-loading="loading">
      <el-table-column label="管理员" width="200">
        <template #default="{row}">
          <div class="flex items-center">
            <el-avatar :size="40" :src="row.avatar">
              <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
                   alt="头像"/>
            </el-avatar>
            <div class="ml-3">
              <h6>{{ row.username }}</h6>
              <small>ID: {{ row.id }}</small>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="所属管理员" align="center">
        <template #default="{row}">
          <!--row.role?.name等于row.role ? row.role.name : ''-->
          {{ row.role?.name || '-' }}
        </template>
      </el-table-column>
      <el-table-column label="状态" width="580">
        <template #default="{row}">
          <el-switch :model-value="row.status" :active-value="1" :inactive-value="0"
                     @change="handleStatusChange($event, row)" :loading="row.statusLoading"
                     :disabled="row.super === 1"/>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180" align="center">
        <template #default="scope">
          <small v-if="scope.row.super === 1" class="text-sm text-gray-500">暂无操作</small>
          <div v-else>
            <el-button type="primary" size="small" text @click="handleEdit(scope.row)">修改</el-button>
            <el-popconfirm title="是否删除该管理员？" confirm-button-text="确认" cancel-button-text="取消"
                           @confirm="handleDelete(scope.row.id)">
              <template #reference>
                <el-button text type="primary" size="small">删除</el-button>
              </template>
            </el-popconfirm>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <!--分页器-->
    <div class="flex justify-center items-center mt-5">
      <el-pagination background layout="prev, pager, next" :total="total" :current-page="currentPage"
                     :page-size="limit" @current-change="getData"/>
    </div>

    <!--抽屉-->
    <FormDrawer ref="formDrawerRef" :title="drawerTitle" @submit="handleSubmit">
      <el-form :model="form" ref="formRef" :rules="rules" label-width="80px" :inline="false">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item label="头像" prop="avatar">
          <ChooseImage v-model="form.avatar"/>
        </el-form-item>
        <el-form-item label="所属角色" prop="role_id">
          <el-select v-model="form.role_id" placeholder="选择所属角色">
            <el-option v-for="item in roles"
                       :key="item.id"
                       :label="item.name"
                       :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="content">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="0"/>
        </el-form-item>
      </el-form>
    </FormDrawer>
  </el-card>
</template>

<style scoped>

</style>
