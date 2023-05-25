<script setup>
import { uploadImageAction } from '~/api/image.js'
import { getToken } from '~/composables/auth.js'
import { toast } from '~/composables/util.js'

// 获取 token 加到图片上传头部
const token = getToken()
// 上传成功
const uploadSuccess = (response, uploadFile, uploadFiles) => {
  emits('success', { response, uploadFile, uploadFiles })
}
// 上传失败
const uploadError = (error) => {
  const msg = JSON.parse(error.message).msg || '上传失败'
  toast(msg, 'error')
}

const emits = defineEmits(['success'])
defineProps({
  data: Object,
})
</script>

<template>
  <el-upload
      drag
      :action="uploadImageAction"
      multiple
      :headers="{token}"
      name="img"
      :data="data"
      :on-success="uploadSuccess"
      :on-error="uploadError"
  >
    <el-icon class="el-icon--upload">
      <upload-filled/>
    </el-icon>
    <div class="el-upload__text">
      将文件拖到此处 <em>点击上传</em>
    </div>
    <template #tip>
      <div class="el-upload__tip">
        只能上传jpg/png文件，且不超过500kb
      </div>
    </template>
  </el-upload>
</template>

<style scoped>

</style>
