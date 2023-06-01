<script setup>
defineProps({
  label: String,
})
</script>

<template>
  <el-col :span="8">
    <el-form-item :label="label">
     <slot/>
    </el-form-item>
  </el-col>
</template>

<style scoped>

</style>
