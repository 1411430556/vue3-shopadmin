<script setup>
import ListHeader from '~/components/ListHeader.vue'
import { getRuleList } from '~/api/rule.js'
import { useInitTable } from '~/composables/useCommon.js'
import { ref } from 'vue'

const defaultExpandedKeys = ref([])

const {
  loading,
  tableData,
  getData,
} = useInitTable({
  getList: getRuleList,
  onGetListSuccess: (value) => {
    tableData.value = value.list
    defaultExpandedKeys.value = value.list.map(item => item.id)
  }
})
</script>

<template>
  <el-card shadow="never" class="border-0">
    <ListHeader @refresh="getData"/>
    <el-tree :data="tableData" :props="{label: 'name', children: 'child'}"
             v-loading="loading" node-key="id" :default-expanded-keys="defaultExpandedKeys"/>
  </el-card>
</template>

<style scoped>

</style>
