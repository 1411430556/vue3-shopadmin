<script setup>
import {
  getOrderList,
  deleteOrder,
  refundOrder,
} from '~/api/order.js'
import { showModal, showPrompt, toast } from '~/composables/util.js'
import ListHeader from '~/components/ListHeader.vue'
import Search from '~/components/Search.vue'
import SearchItem from '~/components/SearchItem.vue'
import ExportExcel from '~/pages/order/ExportExcel.vue'
import InfoModal from '~/pages/order/InfoModal.vue'
import { useInitTable } from '~/composables/useCommon.js'
import { ref } from 'vue'

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
  }, {
    key: 'nopay',
    name: '待支付',
  }, {
    key: 'noship',
    name: '待发货',
  }, {
    key: 'shiped',
    name: '待收货',
  }, {
    key: 'received',
    name: '已收货',
  }, {
    key: 'finish',
    name: '已完成',
  }, {
    key: 'closed',
    name: '已关闭',
  }, {
    key: 'refunding',
    name: '退款中',
  },
]

const ExportExcelRef = ref(null)
const handleExportExcel = () => {
  ExportExcelRef.value.open()
}

const InfoModalRef = ref(null)
const info = ref(null)
const openInfoModal = (row) => {
  row.order_items = row.order_items.map(o => {
    if (o.skus_type === 1 && o.goods_skus) {
      let s = []
      for (let k in o.goods_skus.skus) {
        s.push(o.goods_skus.skus[k].value)
      }
      o.sku = s.join(',')
    }
    return o
  })
  info.value = row
  InfoModalRef.value.open()
}

// 退款处理相关
const handleRefund = (id, agree) => {
  (agree ? showModal('是否同意该订单退款？') : showPrompt('请输入拒绝的理由')).then(({ value }) => {
    let data = { agree }
    if (!agree) {
      data.disagree_reason = value
    }
    refundOrder(id, data).then(() => {
      getData()
      toast('操作成功')
    })
  })
}
</script>

<template>
  <div>
    <el-tabs v-model="searchForm.tab" @tab-change="getData">
      <el-tab-pane v-for="(item, index) in tabbars" :key="index" :label="item.name" :name="item.key"/>
    </el-tabs>

    <el-card shadow="never" class="border-0">
      <!--搜索-->
      <Search :model="searchForm" @search="getData" @reset="resetSearchForm">
        <SearchItem label="关键词">
          <el-input v-model="searchForm.no" placeholder="订单编号" clearable
                    @keyup.enter.native="getData"/>
        </SearchItem>
        <template #show>
          <SearchItem label="收货人">
            <el-input v-model="searchForm.name" placeholder="请输入收货人" clearable/>
          </SearchItem>
          <SearchItem label="手机号">
            <el-input v-model="searchForm.phone" placeholder="请输入手机号" clearable/>
          </SearchItem>
          <SearchItem label="开始时间">
            <el-date-picker
                v-model="searchForm.starttime"
                type="date"
                placeholder="开始日期"
                style="width: 90%;"
                value-format="YYYY-MM-DD"
            />
          </SearchItem>
          <SearchItem label="结束时间">
            <el-date-picker
                v-model="searchForm.endtime"
                type="date"
                placeholder="结束日期"
                style="width: 90%;"
                value-format="YYYY-MM-DD"
            />
          </SearchItem>
        </template>
      </Search>

      <!--新增/刷新-->
      <ListHeader layout="refresh,download" @refresh="getData" @download="handleExportExcel">
        <el-button type="danger" size="small" @click="handleMultiDelete">批量删除</el-button>
      </ListHeader>

      <el-table ref="multipleTableRef" @selection-change="handleSelectionChange"
                :data="tableData" stripe style="width: 100%" v-loading="loading">
        <el-table-column type="selection" width="55"/>
        <el-table-column label="商品" width="300">
          <template #default="{row}">
            <div>
              <div class="flex text-sm">
                <div class="flex-1">
                  <p>订单号:</p>
                  <small>{{ row.no }}</small>
                </div>
                <div>
                  <p>下单时间:</p>
                  <small>{{ row.create_time }}</small>
                </div>
              </div>
              <div class="flex py-2" v-for="(item, index) in row.order_items" :key="index">
                <el-image :src="item.goods_item ? item.goods_item.cover : ''" fit="cover" lazy
                          style="width: 30px;height: 30px;"/>
                <p class="text-blue-500 ml-2">{{ item.goods_item ? item.goods_item.title : '商品已被删除' }}</p>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="实际付款" width="120" prop="total_price" align="center"/>
        <el-table-column label="买家" width="320" align="center">
          <template #default="{row}">
            <p>{{ row.user.nickname || row.user.username }}</p>
            <small>(用户ID:{{ row.user.id }})</small>
          </template>
        </el-table-column>
        <el-table-column label="交易状态" width="570" align="center">
          <template #default="{row}">
            <div>
              付款状态:
              <el-tag v-if="row.payment_method === 'wechat'" type="success" size="small">微信支付</el-tag>
              <el-tag v-else-if="row.payment_method === 'alipay'" size="small">支付宝支付</el-tag>
              <el-tag v-else type="info" size="small">未支付</el-tag>
            </div>
            <div>
              发货状态:
              <el-tag :type="row.ship_data ? 'success' : 'info'" size="small">
                {{ row.ship_data ? '已发货' : '未发货' }}
              </el-tag>
            </div>
            <div>
              收货状态:
              <el-tag :type="row.ship_status === 'received' ? 'success' : 'info'" size="small">
                {{ row.ship_status === 'received' ? '已收货' : '未收货' }}
              </el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template #default="{row}">
            <el-button class="px-1" type="primary" size="small" text @click="openInfoModal(row)">订单详情</el-button>
            <el-button v-if="searchForm.tab === 'noship'" class="px-1" type="primary" size="small" text>订单发货
            </el-button>
            <el-button v-if="searchForm.tab === 'refunding'" class="px-1" type="primary" size="small" text
                       @click="handleRefund(row.id, 1)">同意退款
            </el-button>
            <el-button v-if="searchForm.tab === 'refunding'" class="px-1" type="primary" size="small" text
                       @click="handleRefund(row.id, 0)">拒绝退款
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!--分页器-->
      <div class="flex justify-center items-center mt-5">
        <el-pagination background layout="prev, pager, next" :total="total" :current-page="currentPage"
                       :page-size="limit" @current-change="getData"/>
      </div>
    </el-card>

    <ExportExcel :tabs="tabbars" ref="ExportExcelRef"/>
    <InfoModal ref="InfoModalRef" :info="info"/>
  </div>
</template>

<style scoped>

</style>
