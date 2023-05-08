<template>
  <div>
    首页
    {{ $store.state.user.username }}
    <el-button @click="handleLogout">退出登录</el-button>
  </div>
</template>

<script setup>
import { showModal, toast } from '~/composables/util.js'
import { logOut } from '~/api/manager.js'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const router = useRouter()
const store = useStore()

function handleLogout () {
  showModal('是否退出登录?').then(res => {
    logOut().finally(() => {
      // 调用store状态管理里的logout函数移除 cookie 里的token,清除当前用户状态 vuex
      store.dispatch('logout')
      //跳转回登录页
      router.push('/login')
      // 提示退出登录成功
      toast('已退出登录', 'success')
    })
  })
}
</script>
