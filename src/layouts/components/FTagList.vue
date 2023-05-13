<script setup>
import { ref } from 'vue'
import { useRoute, useRouter, onBeforeRouteUpdate } from 'vue-router'
import { useCookies } from '@vueuse/integrations/useCookies'

const route = useRoute()
const router = useRouter()
const cookie = useCookies()

const activeTab = ref(route.path)
const tabList = ref([
  {
    title: '后台首页',
    path: '/',
  },
])

// 初始化标签导航列表
function initTabList () {
  let tabs = cookie.get('tabList')
  if (tabs) {
    tabList.value = tabs
  }
}

initTabList()

// 添加标签 tabs 的方法
function addTab (tab) {
  if (tabList.value.findIndex(item => item.path == tab.path) == -1) {
    tabList.value.push(tab)
  }
  // let noTab = tabList.value.findIndex(item => item.path == tab.path) == -1
  // if (noTab) {
  //   tabList.value.push(tab)
  // }
  cookie.set('tabList', tabList.value)
}

// onBeforeRouteUpdate 添加一个导航守卫，不论当前位置何时被更新都会触发。类似于 beforeRouteUpdate，但可以在任何组件中使用。当组件被卸载时，该守卫会被移除。
onBeforeRouteUpdate((to) => {
  activeTab.value = to.path
  addTab({
    title: to.meta.title,
    path: to.path,
  })
})

// 点击标签实现路由跳转
const changeTab = (item) => {
  // 这里的 item 就是你点击的标签的路径
  activeTab.value = item
  router.push(item)
}

// 删除标签的方法
const removeTab = (targetName) => {

}
</script>

<template>
  <div class="f-tag-list" :style="{ left: $store.state.isCollapse ? '64px' : '250px' }">
    <el-tabs
        v-model="activeTab"
        type="card"
        class="flex-1"
        @tab-remove="removeTab"
        @tab-change="changeTab"
        style="min-width: 100px;">
      <el-tab-pane :closable="item.path !== '/'" v-for="item in tabList" :key="item.path" :label="item.title"
                   :name="item.path">

      </el-tab-pane>
    </el-tabs>

    <!--下拉按钮-->
    <span class="tag-btn">
      <el-dropdown>
        <span class="el-dropdown-link">
          <el-icon>
            <arrow-down/>
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>Action 1</el-dropdown-item>
            <el-dropdown-item>Action 2</el-dropdown-item>
            <el-dropdown-item>Action 3</el-dropdown-item>
            <el-dropdown-item disabled>Action 4</el-dropdown-item>
            <el-dropdown-item divided>Action 5</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </span>
  </div>
  <div style="height: 44px;"></div>
</template>

<style scoped>
.f-tag-list {
  @apply flex items-center fixed bg-gray-100 px-2;
  top: 64px;
  right: 0;
  height: 44px;
  z-index: 100;
  transition: all .4s;
}

.tag-btn {
  @apply bg-white rounded ml-auto flex items-center px-2;
  height: 32px;
}

::v-deep(.el-tabs__header) {
  border: 0 !important;
  margin: 0;
}

/* 去除 tags 左右边框 */
::v-deep(.el-tabs__nav .el-tabs__item) {
  border: 0 !important;
  height: 32px;
  line-height: 32px;
  @apply bg-white mx-1 rounded;
}

::v-deep(.el-tabs__nav-next),
::v-deep(.el-tabs__nav-prev) {
  height: 32px;
  line-height: 40px;
}

::v-deep(.is-disabled) {
  cursor: not-allowed;
  @apply to-gray-300;
}
</style>
