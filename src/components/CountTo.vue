<!--数字滚动组件-->
<script setup>
import gsap from 'gsap'
import { reactive, watch } from 'vue'

const props = defineProps({
  // value 就是我们希望滚动到的一个终点
  value: {
    type: Number,
    default: 0,
  },
})
// 让谁动
const d = reactive({
  num: 0,
})

function AnimateToValue () {
  // 第一个参数d就是让谁动
  gsap.to(d, {
    duration: 0.6,
    num: props.value,
  })
}

AnimateToValue()

// 不能直接侦听reactive响应式对象中的某个属性值,这里需要用一个返回该属性的 getter 函数：() => props.value
// 参考：https://cn.vuejs.org/guide/essentials/watchers.html#basic-example
watch(() => props.value, () => AnimateToValue())
</script>

<template>
  {{ d.num.toFixed(0) }}
</template>

<style scoped>

</style>
