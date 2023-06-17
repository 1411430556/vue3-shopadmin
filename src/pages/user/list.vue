<script setup>
import { getUserList, updateUserStatus, createUser, updateUser, deleteUser } from '~/api/user.js'
import FormDrawer from '~/components/FormDrawer.vue'
import ChooseImage from '~/components/ChooseImage.vue'
import ListHeader from '~/components/ListHeader.vue'
import { useInitTable, useInitForm } from '~/composables/useCommon.js'
import { ref } from 'vue'
import Search from '~/components/Search.vue'
import SearchItem from '~/components/SearchItem.vue'

// 管理员类型列表
const roles = ref([])
const user_level = ref([])

const {
  searchForm,
  resetSearchForm,
  tableData,
  loading,
  currentPage,
  total,
  limit,
  getData,
  handleDelete,
  handleStatusChange,
} = useInitTable({
  searchForm: {
    keyword: '',
    user_level_id: null,
  },
  getList: getUserList,
  onGetListSuccess: (value) => {
    tableData.value = value.list.map(o => {
      o.statusLoading = false
      return o
    })
    total.value = value.totalCount
    user_level.value = value.user_level
  },
  delete: deleteUser,
  updateStatus: updateUserStatus,
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
    username: '',
    password: '',
    user_level_id: null,
    status: 1,
    avatar: '',
    nickname: '',
    phone: '',
    email: '',
  },
  getData,
  update: updateUser,
  create: createUser,
})
</script>

<template>
  <el-card shadow="never" class="border-0">
    <!--搜索-->
    <Search :model="searchForm" @search="getData" @reset="resetSearchForm">
      <SearchItem label="关键词">
        <el-input v-model="searchForm.keyword" placeholder="手机号/邮箱/会员昵称" clearable
                  @keyup.enter.native="getData"/>
      </SearchItem>
      <template #show>
        <SearchItem label="会员等级">
          <el-select v-model="searchForm.user_level_id" placeholder="请选择会员等级" clearable>
            <el-option v-for="item in user_level"
                       :key="item.id"
                       :label="item.name"
                       :value="item.id"/>
          </el-select>
        </SearchItem>
      </template>
    </Search>

    <!--新增/刷新-->
    <ListHeader @create="handleCreate" @refresh="getData"/>

    <el-table :data="tableData" stripe style="width: 100%" v-loading="loading" empty-text="无数据">
      <el-table-column label="会员" width="200">
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
      <el-table-column label="会员等级" align="center">
        <template #default="{row}">
          <!--row.role?.name等于row.role ? row.role.name : ''-->
          {{ row.user_level?.name || '-' }}
        </template>
      </el-table-column>
      <el-table-column label="登陆注册" align="center">
        <template #default="{row}">
          <p v-if="row.last_login_time">最后登录:{{ row.last_login_time }}</p>
          <p>注册时间:{{ row.create_time }}</p>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="100">
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
            <el-popconfirm title="是否删除该记录？" confirm-button-text="确认" cancel-button-text="取消"
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
          <el-input v-model="form.username" placeholder="用户名"/>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" placeholder="密码"/>
        </el-form-item>
        <el-form-item label="昵称" prop="nickname">
          <el-input v-model="form.nickname" placeholder="昵称"/>
        </el-form-item>
        <el-form-item label="头像" prop="avatar">
          <ChooseImage v-model="form.avatar"/>
        </el-form-item>
        <el-form-item label="会员等级" prop="user_level_id">
          <el-select v-model="form.user_level_id" placeholder="选择会员等级">
            <el-option v-for="item in user_level"
                       :key="item.id"
                       :label="item.name"
                       :value="item.id"/>
          </el-select>
        </el-form-item>
        <el-form-item label="手机" prop="phone">
          <el-input v-model="form.phone" placeholder="手机"/>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email" placeholder="邮箱"/>
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
