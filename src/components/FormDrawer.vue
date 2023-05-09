<template>
    <el-drawer v-model="showDrawer" title="修改密码" size="45%" :close-on-click-modal="false">
        <div class="formDrawer">
            <!-- 内容部分 -->
            <div class="body">
                <slot>123</slot>
            </div>
            <!-- 底部按钮 -->
            <div class="actions">
                <el-button type="primary">提交</el-button>
                <el-button type="default" @click="close">取消</el-button>
            </div>
        </div>
    </el-drawer>
</template>
<script setup>
import { ref } from 'vue'
const showDrawer = ref(false)
// 打开抽屉
const open = () => showDrawer.value = true
// 关闭抽屉
const close = () => showDrawer.value = false
// 向父组件暴露以下方法
defineExpose({
    open,
    close
})
</script>

<style scoped>
.formDrawer {
    position: relative;
    width: 100%;
    height: 100%;
    @apply flex flex-col;
}

.formDrawer .body {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 50px;
    flex: 1;
    overflow-y: auto;
}

.formDrawer .actions {
    height: 50px;
    @apply flex items-center mt-auto;
}
</style>