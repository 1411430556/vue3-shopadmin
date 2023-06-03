<script setup>
import { initSkusCardItem } from '~/composables/useSku.js'

const props = defineProps({
  skuCardID: [Number, String],
})

const { item } = initSkusCardItem(props.skuCardID)
</script>

<template>
  <div v-for="(tag, index) in item.goodsSkusCardValue" :key="index">
    {{tag.text}}
  </div>
</template>

<style scoped>

</style>
