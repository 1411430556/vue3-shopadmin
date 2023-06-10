<script setup>
import { reactive, ref } from 'vue'
import { getSkusList } from '~/api/skus.js'
import { useInitTable } from '~/composables/useCommon.js'

const dialogVisible = ref(false)
const activeID = ref(0)
const {
  loading,
  currentPage,
  limit,
  total,
  tableData,
  getData,
} = useInitTable({
  getList: getSkusList,
  onGetListSuccess: (value) => {
    tableData.value = value.list
    total.value = value.totalCount
    if (tableData.value.length > 0) handleChangeActiveID(tableData.value[0].id)
  },
})

const callbackFunction = ref(null)
const open = (callback = null) => {
  callbackFunction.value = callback
  getData(1)
  dialogVisible.value = true
}
const list = ref([])
const form = reactive({
  name: '',
  list: [],
})

function handleChangeActiveID (id) {
  activeID.value = id
  list.value = []
  let item = tableData.value.find(o => o.id === id)
  if (item) {
    list.value = item.default.split(',')
    form.name = item.name
  }
}

const submit = () => {
  if (typeof callbackFunction.value === 'function') {
    callbackFunction.value(form)
  }
  dialogVisible.value = false
}

defineExpose({
  open,
})
</script>

<template>
  <el-dialog
      title="规格选择"
      v-model="dialogVisible"
      width="80%"
      top="5vh">

    <el-container style="height:65vh;">
      <el-aside width="220px" class="image-aside">
        <div class="top">

          <div class="sku-list" :class="{ 'active': activeID === item.id }" v-for="(item, index) in tableData"
               :key="index" @click="handleChangeActiveID(item.id)">
            {{ item.name }}
          </div>

        </div>
        <div class="bottom">
          <el-pagination
              background
              layout="prev, next"
              :total="total"
              :current-page="currentPage"
              :page-size="limit"
              @current-change="getData"/>
        </div>
      </el-aside>
      <el-main>
        <el-checkbox-group v-model="form.list">
          <el-checkbox v-for="item in list" :key="item" :label="item" border>
            {{ item }}
          </el-checkbox>
        </el-checkbox-group>
      </el-main>
    </el-container>

    <template #footer>
            <span>
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="submit">确定</el-button>
            </span>
    </template>
  </el-dialog>
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
  @apply flex items-center justify-center;
}

.sku-list {
  border-bottom: 1px solid #f4f4f4;
  @apply p-3 text-sm text-gray-600 flex items-center cursor-pointer;
}

.sku-list:hover, .active {
  @apply bg-blue-50;
}
</style>
