<script setup>
import { getImageList, updateImage, deleteImage } from '~/api/image.js'
import { showPrompt, toast } from '~/composables/util.js'
import UploadFile from '~/components/UploadFile.vue'
import { computed, ref } from 'vue'

// 上传图片
const drawer = ref(false)
const openUploadFile = () => drawer.value = true

// 分页
// 当前所在的页数
const currentPage = ref(1)
// 总条数
const total = ref(0)
// 一页显示几条
const limit = ref(10)

const list = ref([])
const loading = ref(false)
// 当前所在图库的ID
const image_class_id = ref(0)

// 获取每个图库数据
function getData (numberOfPages = null) {
  // 点击按钮也换当前显示的哪页
  if (typeof numberOfPages === 'number') currentPage.value = numberOfPages
  loading.value = true
  getImageList(image_class_id.value, currentPage.value).then(value => {
    total.value = value.totalCount
    list.value = value.list.map(o => {
      // 为每个对象添加一个复选框所需要使用的属性，代表它选了还是没选
      o.checked = false
      return o
    })
  }).finally(() => loading.value = false)
}

// 根据图库分类ID重新加载图片列表
const loadData = (id) => {
  // 分页所在的页数
  currentPage.value = 1
  image_class_id.value = id
  getData()
}

// 重命名
const handleEdit = (item) => {
  showPrompt('重命名', item.name).then(({ value }) => {
    loading.value = true
    updateImage(item.id, value).then(() => {
      toast('修改成功')
      getData()
    }).finally(() => {
      loading.value = false
    })
  })
}

// 删除图片
const handleDelete = (id) => {
  loading.value = true
  deleteImage([id]).then(() => {
    toast('删除成功')
    getData()
  }).finally(() => loading.value = false)
}

// 上传成功后
const handleUploadSuccess = () => getData(1)

defineProps({
  openChoose: {
    type: Boolean,
    default: false,
  },
})

// 选中的图片
const checkedImage = computed(() => list.value.filter(item => item.checked))
const emits = defineEmits(['choose'])

// 复选框
const handleChooseChange = (item) => {
  if (item.checked && checkedImage.value.length > 1) {
    item.checked = false
    return toast('最多只能选中一张', 'error')
  }
  emits('choose', checkedImage.value)
}

defineExpose({
  loadData,
  openUploadFile,
})
</script>

<template>
  <el-main class="image-main" v-loading="loading">
    <div class="top p-3">
      <el-row :gutter="10">
        <el-col :span="6" v-for="(item, index) in list" :key="index">
          <el-card shadow="hover" class="relative mb-3" :body-style="{'padding': 0}"
                   :class="{'border-blue-500': item.checked}">
            <el-image :src="item.url" fit="cover" lazy class="w-full h-[150px]" style="width: 100%;"
                      :preview-src-list="[item.url]" :initial-index="0">
            </el-image>
            <div class="image-title">{{ item.name }}</div>
            <div class="flex justify-center items-center p-2">
              <!--复选框-->
              <el-checkbox v-if="openChoose" v-model="item.checked" @change="handleChooseChange(item)"/>
              <el-button type="primary" size="small" text @click="handleEdit(item)">重命名</el-button>
              <el-popconfirm title="是否删除该图片？" confirm-button-text="确认" cancel-button-text="取消"
                             @confirm="handleDelete(item.id)">
                <template #reference>
                  <el-button class="!m-0" type="primary" size="small" text>删除</el-button>
                </template>
              </el-popconfirm>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <div class="bottom">
      <!--分页器-->
      <el-pagination background layout="prev, pager, next" :total="total" :current-page="currentPage" :page-size="limit"
                     @current-change="getData"/>
    </div>
  </el-main>

  <!--上传图片文件抽屉-->
  <el-drawer
      v-model="drawer"
      title="上传图片"
  >
    <UploadFile :data="{image_class_id}" @success="handleUploadSuccess"/>
  </el-drawer>
</template>

<style scoped>
.image-main {
  position: relative;
}

.image-main .top {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 50px;
  overflow-y: auto;
}

.image-main .bottom {
  position: absolute;
  bottom: 0;
  height: 50px;
  left: 0;
  right: 0;
  @apply flex justify-center items-center;
}

.image-title {
  position: absolute;
  top: 122px;
  left: -1px;
  right: -1px;
  @apply text-sm truncate text-gray-100 bg-opacity-50 bg-gray-800 px-2 py-1 text-center;
}
</style>
