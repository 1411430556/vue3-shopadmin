<script setup>
import SkuCardItem from '~/pages/goods/componets/SkuCardItem.vue'
import { sku_card_list, addSkuCardEvent, btnLoading, handleUpdate } from '~/composables/useSku.js'

</script>

<template>
  <el-form-item label="规格选项">
    <el-card shadow="never" class="w-full mb-3" v-for="(item) in sku_card_list" :key="item.id" v-loading="item.loading">
      <template #header>
        <div class="flex items-center">
          <el-input v-model="item.text" placeholder="规格名称" style="width: 200px;" @change="handleUpdate(item)">
            <template #append>
              <el-icon>
                <More/>
              </el-icon>
            </template>
          </el-input>
          <el-button size="small" class="ml-auto">
            <el-icon>
              <Top/>
            </el-icon>
          </el-button>
          <el-button size="small">
            <el-icon>
              <Bottom/>
            </el-icon>
          </el-button>
          <el-button size="small">
            <el-icon>
              <Delete/>
            </el-icon>
          </el-button>
        </div>
      </template>
      <SkuCardItem :skuCardID="item.id"/>
    </el-card>
    <el-button type="success" size="small" :loading="btnLoading" @click="addSkuCardEvent">添加规格</el-button>
  </el-form-item>
</template>

<style scoped>
:deep(.el-card__header) {
  @apply p-2 bg-gray-50;
}
</style>
