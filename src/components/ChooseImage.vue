<script setup>
import { ref } from 'vue'
import ImageAside from '~/components/ImageAside.vue'
import ImageMain from '~/components/ImageMain.vue'
import { toast } from '~/composables/util'

const dialogVisible = ref(false)

// const callbackFunction = ref(null)
const open = () => dialogVisible.value = true
// 点击提交头像后关闭 dialog对话框
const close = () => dialogVisible.value = false

const ImageAsideRef = ref(null)
const handleOpenCreate = () => ImageAsideRef.value.handleCreate()

const ImageMainRef = ref(null)
const handleAsideChange = (image_class_id) => ImageMainRef.value.loadData(image_class_id)

const handleOpenUpload = () => ImageMainRef.value.openUploadFile()

const props = defineProps({
  modelValue: [String, Array],
  // limit: {
  //   type: Number,
  //   default: 1,
  // },
  // preview: {
  //   type: Boolean,
  //   default: true,
  // },
})

/*
 当 v-model 使用在一个组件上时，v-model 会被展开为如下的形式：
       <CustomInput
        :modelValue="searchText"
        @update:modelValue="newValue => searchText = newValue"
      />

      默认情况下，v-model 在组件上都是使用 modelValue 作为 prop，并以 update:modelValue 作为对应的事件。

参考：
      https://cn.vuejs.org/guide/components/v-model.html
*/
const emits = defineEmits(['update:modelValue'])

let urls = []
// 拿到选中图片的 url
const handleChoose = (e) => {
  urls = e.map(item => item.url)
}

const submit = () => {
  if (urls.length) {
    emits('update:modelValue', urls[0])
  }
  close()
}

// const removeImage = (url) => emits('update:modelValue', props.modelValue.filter(u => u !== url))

defineExpose({
  open,
})
</script>

<template>
  <div v-if="modelValue">
    <el-image :src="modelValue" fit="cover" class="w-[100px] h-[100px] rounded border mr-2 mt-2.5"/>
  </div>

  <div class="choose-image-btn" @click="open">
    <el-icon :size="25" class="text-gray-500">
      <Plus/>
    </el-icon>
  </div>
  <el-dialog
      title="选择图片"
      v-model="dialogVisible"
      width="80%"
      top="5vh">

    <el-container class="bg-white rounded" style="height:70vh;">
      <el-header class="image-header">
        <el-button type="primary" size="small" @click="handleOpenCreate">新增图片分类</el-button>
        <el-button type="warning" size="small" @click="handleOpenUpload">上传图片</el-button>
      </el-header>
      <el-container>
        <ImageAside ref="ImageAsideRef" @change="handleAsideChange"/>
        <ImageMain openChoose ref="ImageMainRef" @choose="handleChoose"/>
      </el-container>
    </el-container>

    <template #footer>
      <span>
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="submit">确定</el-button>
      </span>
    </template>
  </el-dialog>

</template>

<style>
.image-header {
  border-bottom: 1px solid #eeeeee;
  @apply flex items-center;
}

.choose-image-btn {
  @apply w-[100px] h-[100px] rounded border flex justify-center items-center cursor-pointer hover:(bg-gray-100);
}
</style>
