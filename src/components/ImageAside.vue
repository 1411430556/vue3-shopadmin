<script setup>
import AsideList from '~/components/AsideList.vue'
import FormDrawer from '~/components/FormDrawer.vue'
import { getImageClassList, createImageClass, updateImageClass, deleteImageClass } from '~/api/image_class.js'
import { computed, reactive, ref } from 'vue'
import { toast } from '~/composables/util.js'

// 加载动画
const loading = ref(false)
// 列表数据
const list = ref([])

// 分页
// 当前所在的页数
const currentPage = ref(1)
// 总条数
const total = ref(0)
// 一页显示几条
const limit = ref(10)

// 获取图库列表数据
function getData (numberOfPages = null) {
  // 点击按钮也换当前显示的哪页
  if (typeof numberOfPages === 'number') currentPage.value = numberOfPages
  loading.value = true
  getImageClassList(currentPage.value).then(value => {
    total.value = value.totalCount
    list.value = value.list
    // 进页面后默认选中第一个
    let item = list.value[0]
    if (item) handleChangeActiveID(item.id)
  }).finally(() => loading.value = false)
}

getData()

const editID = ref(0)
// 点击编辑打开抽屉后抽屉的标题，editID 默认为0就是 false，点击修改的话就是1、2、3...这些，就为  true 了
const drawerTitle = computed(() => editID.value ? '修改' : '新增')
// 抽屉组件
const formDrawerRef = ref(null)
// 打开抽屉

const form = reactive({
  name: '',
  order: 50,
})
// 验证规则
const rules = {
  name: [
    {
      required: true,
      message: '图库分类名称不能为空',
      trigger: 'blur',
    },
  ],
}
const formRef = ref(null)
const handleSubmit = () => {
  formRef.value.validate((valid) => {
    if (!valid) return
    // 打开提交按钮 loading 状态
    formDrawerRef.value.showLoading()
    // 判断是走新增逻辑还是修改逻辑，editID 默认为0就是 false，点击修改的话就是1、2、3...这些，就为  true 了
    const fun = editID.value ? updateImageClass(editID.value, form) : createImageClass(form)
    fun.then(() => {
      toast(drawerTitle.value + '成功')
      // 修改数据后就保持在当前页，新增成功后重新获取数据加载回到第一页
      getData(editID.value ? currentPage.value : 1)
      // 关闭抽屉
      formDrawerRef.value.close()
    }).finally(() => formDrawerRef.value.hideLoading())
  })
}

// 新增
const handleCreate = () => {
  editID.value = 0
  // 清空输入框
  form.name = ''
  form.order = 50
  formDrawerRef.value.open()
}

// 编辑
const handleEdit = (row) => {
  editID.value = row.id
  form.name = row.name
  form.order = row.order
  formDrawerRef.value.open()
}

// 删除
const handleDelete = (id) => {
  loading.value = true
  deleteImageClass(id).then(() => {
    toast('删除成功')
    getData()
  }).finally(() => loading.value = false)
}

// 选中图库分类ID
const activeID = ref(0)

const emits = defineEmits(['change'])

// 切换图库分类
function handleChangeActiveID (image_class_id) {
  activeID.value = image_class_id
  emits('change', image_class_id)
}

defineExpose({
  handleCreate,
})
</script>

<template>
  <el-aside width="220px" class="image-aside" v-loading="loading" element-loading-text="Loading...">
    <div class="top">
      <AsideList :active="activeID === item.id" v-for="(item, index) in list" :key="index"
                 @edit="handleEdit(item)" @delete="handleDelete(item.id)" @click="handleChangeActiveID(item.id)">
        {{ item.name }}
      </AsideList>
    </div>

    <!--分页器-->
    <div class="bottom">
      <el-pagination background layout="prev, next" :total="total" :current-page="currentPage" :page-size="limit"
                     @current-change="getData"/>
    </div>
  </el-aside>

  <!--头部新增图片分类的抽屉弹框组件-->
  <FormDrawer :title="drawerTitle" ref="formDrawerRef" @submit="handleSubmit">
    <el-form :model="form" ref="formRef" :rules="rules" label-width="80px" :inline="false">
      <el-form-item label="分类名称" prop="name">
        <el-input v-model="form.name" clearable></el-input>
      </el-form-item>
      <el-form-item label="排序" prop="order">
        <el-input-number v-model="form.order" :min="0" :max="1000"/>
      </el-form-item>
    </el-form>
  </FormDrawer>
</template>

<style scoped>
.image-aside {
  border-right: 1px solid #eeeeee;
  position: relative;
}

.image-aside .top {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 50px;
  overflow-y: auto;
}

.image-aside .bottom {
  position: absolute;
  bottom: 0;
  height: 50px;
  left: 0;
  right: 0;
  @apply flex justify-center items-center;
}
</style>
