<script setup>
defineProps({
  title: String,
  tip: String,
  btns: Array,
})
</script>

<template>
  <el-card shadow="never">
    <template #header>
      <div class="flex justify-between">
        <span class="text-sm cursor-default">{{ title }}</span>
        <el-tag type="danger" effect="plain" class="cursor-default">
          {{ tip }}
        </el-tag>
      </div>
    </template>

    <el-row :gutter="20">
      <!--骨架屏-->
      <template v-if="btns.length === 0">
        <el-col :span="6" v-for="i in 4" :key="i">
          <el-skeleton animated loading>
            <template #template>
              <el-card shadow="never" class="border-0 bg-light-400 cursor-default">
                <div class="flex flex-col justify-center items-center">
                  <el-skeleton-item variant="h1" style="width: 10%;" class="mb-5.7"></el-skeleton-item>
                  <el-skeleton-item variant="text" style="width: 30%;"></el-skeleton-item>
                </div>
              </el-card>
            </template>
          </el-skeleton>
        </el-col>
      </template>

      <!--真实内容-->
      <el-col :span="6" v-for="(item, index) in btns" :key="index">
        <el-card shadow="hover" class="border-0 bg-light-400 cursor-default">
          <div class="flex flex-col justify-center items-center">
            <span class="text-xl mb-2">{{ item.value }}</span>
            <span class="text-sm text-gray-500">{{ item.label }}</span>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </el-card>
</template>

<style scoped>

</style>
