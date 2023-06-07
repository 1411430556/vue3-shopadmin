<script setup>
import SkuCardItem from '~/pages/goods/componets/SkuCardItem.vue'
import ChooseSku from '~/components/ChooseSku.vue'
import {
  sku_card_list,
  addSkuCardEvent,
  btnLoading,
  handleUpdate,
  handleDelete,
  sortCard,
  bodyLoading,
} from '~/composables/useSku.js'
import { ref } from 'vue'

const ChooseSkuRef = ref(null)
const handleChooseSku = (item) => {
  ChooseSkuRef.value.open()
}
</script>

<template>
  <el-form-item label="规格选项" v-loading="bodyLoading">
    <el-card shadow="never" class="w-full mb-3" v-for="(item, index) in sku_card_list" :key="item.id"
             v-loading="item.loading">
      <template #header>
        <div class="flex items-center">
          <el-input v-model="item.text" placeholder="规格名称" style="width: 200px;" @change="handleUpdate(item)">
            <template #append>
              <el-icon @click="handleChooseSku(item)" class="cursor-pointer">
                <More/>
              </el-icon>
            </template>
          </el-input>
          <el-button size="small" class="ml-auto" @click="sortCard('up', index)" :disabled="index === 0">
            <el-icon>
              <Top/>
            </el-icon>
          </el-button>
          <el-button size="small" @click="sortCard('down', index)" :disabled="index === sku_card_list.length - 1">
            <el-icon>
              <Bottom/>
            </el-icon>
          </el-button>
          <el-popconfirm title="是否删除该选项？" confirm-button-text="确认" cancel-button-text="取消"
                         @confirm="handleDelete(item)">
            <template #reference>
              <el-button size="small">
                <el-icon>
                  <Delete/>
                </el-icon>
              </el-button>
            </template>
          </el-popconfirm>
        </div>
      </template>
      <SkuCardItem :skuCardID="item.id"/>
    </el-card>
    <el-button type="success" size="small" :loading="btnLoading" @click="addSkuCardEvent">添加规格</el-button>
  </el-form-item>

  <ChooseSku ref="ChooseSkuRef"/>
</template>

<style scoped>
:deep(.el-card__header) {
  @apply p-2 bg-gray-50;
}
</style>
