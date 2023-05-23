<script setup>
import { getImageList } from '~/api/image.js'
import { ref } from 'vue'

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
    list.value = value.list
  }).finally(() => loading.value = false)
}

// 根据图库分类ID重新加载图片列表
const loadData = (id) => {
  // 分页所在的页数
  currentPage.value = 1
  image_class_id.value = id
  getData()
}

defineExpose({
  loadData,
})
</script>

<template>
  <el-main class="image-main" v-loading="loading">
    <div class="top">
      <div v-for="(item, index) in list" :key="index">{{ item.url }}</div>
    </div>
    <div class="bottom">
      <!--分页器-->
      <el-pagination background layout="prev, pager, next" :total="total" :current-page="currentPage" :page-size="limit"
                     @current-change="getData"/>
    </div>
  </el-main>
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
</style>
