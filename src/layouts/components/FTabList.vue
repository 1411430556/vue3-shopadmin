<script setup>
import { useTabList } from '~/composables/useTabList.js'

const {
  activeTab,
  tabList,
  changeTab,
  removeTab,
  handleClose,
} = useTabList()
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
                   :name="item.path"/>
    </el-tabs>

    <!--下拉按钮-->
    <span class="tag-btn">
      <el-dropdown @command="handleClose">
        <span class="el-dropdown-link">
          <el-icon>
            <arrow-down/>
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="clearOther">关闭其它</el-dropdown-item>
            <el-dropdown-item command="clearAll">全部关闭</el-dropdown-item>
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
  margin: 8px 0 0;
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

::v-deep(.el-tabs--card > .el-tabs__header .el-tabs__nav) {
  border: 0 !important;
}
</style>
