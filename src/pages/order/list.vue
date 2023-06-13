<script setup>
import {
  getOrderList,
  deleteOrder,
} from '~/api/order.js'
import ListHeader from '~/components/ListHeader.vue'
import Search from '~/components/Search.vue'
import SearchItem from '~/components/SearchItem.vue'
import { useInitTable } from '~/composables/useCommon.js'

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
  handleSelectionChange,
  multipleTableRef,
  handleMultiDelete,
  multiSelectionIDs,
} = useInitTable({
  searchForm: {
    no: '',
    tab: 'all',
    starttime: '',
    endtime: '',
    name: '',
    phone: '',
  },
  getList: getOrderList,
  onGetListSuccess: (value) => {
    tableData.value = value.list.map(o => {
      o.bannersLoading = false
      o.contentLoading = false
      o.skusLoading = false
      return o
    })
    total.value = value.totalCount
  },
  delete: deleteOrder,
})

const tabbars = [
  {
    key: 'all',
    name: '全部',
  },
  {
    key: 'checking',
    name: '审核中',
  },
  {
    key: 'saling',
    name: '出售中',
  },
  {
    key: 'off',
    name: '已下架',
  },
  {
    key: 'min_stock',
    name: '库存预警',
  },
  {
    key: 'delete',
    name: '回收站',
  },
]
</script>

<template>
  <div>
    <el-tabs v-model="searchForm.tab" @tab-change="getData">
      <el-tab-pane v-for="(item, index) in tabbars" :key="index" :label="item.name" :name="item.key"></el-tab-pane>
    </el-tabs>

    <el-card shadow="never" class="border-0">
      <!--搜索-->
      <Search :model="searchForm" @search="getData" @reset="resetSearchForm">
        <SearchItem label="关键词">
          <el-input v-model="searchForm.no" placeholder="订单编号" clearable
                    @keyup.enter.native="getData"/>
        </SearchItem>
        <!--        <template #show>
                  <SearchItem label="商品分类">
                    <el-select v-model="searchForm.category_id" placeholder="请选择商品分类" clearable>
                      <el-option v-for="item in cateGory_list"
                                 :key="item.id"
                                 :label="item.name"
                                 :value="item.id"/>
                    </el-select>
                  </SearchItem>
                </template>-->
      </Search>

      <!--新增/刷新-->
      <ListHeader layout="">
        <el-button type="danger" size="small" @click="handleMultiDelete">批量删除</el-button>
      </ListHeader>

      <el-table ref="multipleTableRef" @selection-change="handleSelectionChange"
                :data="tableData" stripe style="width: 100%" v-loading="loading">
        <el-table-column type="selection" width="55"/>
        <el-table-column label="商品" width="300">
          <template #default="{row}">
            <div class="flex">
              <el-image class="mr-3 rounded" :src="row.cover" style="width: 50px; height: 50px;" :lazy="true"
                        fit="cover"/>
              <div class="flex-1">
                <p>{{ row.title }}</p>
                <div>
                  <span class="text-rose-500">￥{{ row.min_price }}</span>
                  <el-divider direction="vertical"/>
                  <span class="text-gray-500 text-xs">￥{{ row.min_oprice }}</span>
                </div>
                <p class="text-gray-400 text-xs mb-1">分类:{{ row.category ? row.category.name : '未分配' }}</p>
                <p class="text-gray-400 text-xs">创建时间:{{ row.create_time }}</p>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="实际销量" width="90" prop="sale_count" align="center"/>
        <el-table-column label="商品状态" width="100">
          <template #default="{row}">
            <el-tag :type="row.status ? 'success' : 'danger'" size="small">{{ row.status ? '上架' : '仓库' }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="审核状态" width="120" align="center" v-if="searchForm.tab !== 'delete'">
          <template #default="{row}">
            <div class="flex flex-col" v-if="row.ischeck === 0">
              <el-button type="success" size="small" plain>审核通过</el-button>
              <el-button class="mt-2 !ml-0" type="danger" size="small" plain>审核拒绝</el-button>
            </div>
            <span v-else>{{ row.ischeck === 1 ? '通过' : '拒绝' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="总库存" width="150" prop="stock" align="center"/>
        <el-table-column label="操作" align="center">
          <template #default="scope">
            <el-button class="px-1" type="primary" size="small" text>订单详情</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!--分页器-->
      <div class="flex justify-center items-center mt-5">
        <el-pagination background layout="prev, pager, next" :total="total" :current-page="currentPage"
                       :page-size="limit" @current-change="getData"/>
      </div>
    </el-card>
  </div>
</template>

<style scoped>

</style>
