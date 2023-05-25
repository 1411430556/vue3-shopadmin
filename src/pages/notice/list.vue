<script setup>
import { getNoticeList, createNotice, updateNotice, deleteNotice } from '~/api/notice.js'
import FormDrawer from '~/components/FormDrawer.vue'
import { computed, reactive, ref } from 'vue'
import { toast } from '~/composables/util.js'

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
  getNoticeList(currentPage.value).then(value => {
    tableData.value = value.list
    total.value = value.totalCount
  }).finally(() => loading.value = false)
}

getData()

// 删除
const handleDelete = (id) => {
  loading.value = true
  deleteNotice(id).then((value) => {
    toast('删除成功')
    getData()
  }).finally(() => loading.value = false)
}

// 新增公告列表，表单部分
const formDrawerRef = ref(null)
const formRef = ref(null)
const form = reactive({
  title: '',
  content: '',
})
// 表单验证规则
const rules = {
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
}

// 判断抽屉打开后抽屉的标题是新增还是修改；点击修改会拿到一个ID，就为true，点击新增下面把ID设为0了，就是false
const editID = ref(0)
const drawerTitle = computed(() => editID.value ? '修改' : '新增')

const handleSubmit = () => {
  formRef.value.validate((valid) => {
    if (!valid) return
    formDrawerRef.value.showLoading()
    const fun = editID.value ? updateNotice(editID.value, form) : createNotice(form)
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
    title: '',
    content: '',
  })
  formDrawerRef.value.open()
}

// 修改
const handleEdit = (row) => {
  editID.value = row.id
  resetForm(row)
  formDrawerRef.value.open()
}
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
