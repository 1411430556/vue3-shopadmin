<script setup>
import { showModal, toast } from '~/composables/util.js'
import { logOut, updatePassword } from '~/api/manager.js'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { useFullscreen } from '@vueuse/core'
import { ref, reactive } from 'vue'
import FormDrawer from '~/components/FormDrawer.vue'

// isFullscreen 是否全屏状态  toggle 切换全屏与退出全屏
const { isFullscreen, toggle } = useFullscreen()

const router = useRouter()
const store = useStore()

// 修改密码-抽屉弹出
const showDrawer = ref(false)

const formDrawerRef = ref(null)

const form = reactive({
  oldpassword: '',
  password: '',
  repassword: '',
})

//表单验证规则
const rules = reactive({
  oldpassword: [
    { required: true, message: '旧密码不能为空', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '新密码不能为空', trigger: 'blur' },
  ],
  repassword: [
    { required: true, message: '确认密码不能为空', trigger: 'blur' },
  ],
})

const formRef = ref(null)
// 登录按钮 loading 状态控制
const loading = ref(false)

const onSubmit = () => {
  formRef.value.validate((valid) => {
    if (!valid) {
      return false
    }
    loading.value = true
    updatePassword(form).then(res => {
      toast('修改密码成功，请重新登录', 'success')
      store.dispatch('logout')
      router.push('/login')
    }).finally(() => {
      loading.value = false
    })
  })
}

// 控制修改密码还是退出登录
const handleCommand = (c) => {
  switch (c) {
    case 'rePassword':
      // showDrawer.value = true
      formDrawerRef.value.open()
      break;
    case 'logout':
      handleLogout()
      break;
  }
}

// 刷新逻辑
const handleRefresh = () => location.reload()

// 退出登录的逻辑
function handleLogout() {
  showModal('是否退出登录？').then(res => {
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

<template>
  <div class="f-header">
    <!--左侧-->
    <span class="logo">
      <el-icon class="mr-1">
        <SwitchFilled />
      </el-icon>
      <span class="cursor-default">叽里呱啦</span>
    </span>
    <el-tooltip effect="dark" content="折叠" placement="bottom">
      <!-- 折叠图标 -->
      <el-icon class="icon-btn">
        <Fold />
      </el-icon>
    </el-tooltip>
    <el-tooltip effect="dark" content="刷新" placement="bottom">
      <!-- 刷新图标 -->
      <el-icon class="icon-btn" @click="handleRefresh">
        <Refresh />
      </el-icon>
    </el-tooltip>

    <!--右侧-->
    <div class="ml-auto flex items-center">
      <el-tooltip effect="dark" content="全屏切换" placement="bottom">
        <!-- 全屏图标 -->
        <el-icon class="icon-btn" @click="toggle">
          <FullScreen v-if="!isFullscreen" />
          <Aim v-else />
        </el-icon>

      </el-tooltip>

      <!--下拉菜单-->
      <el-dropdown class="dropdown" @command="handleCommand">
        <span class="flex items-center text-light-50">
          <!--头像-->
          <el-avatar class="mr-2" :size="25" :src="$store.state.user.avatar" />
          {{ $store.state.user.username }}
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="rePassword">修改密码</el-dropdown-item>
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>

  <!-- 修改密码 -->
  <!-- <el-drawer v-model="showDrawer" title="修改密码" size="45%" :close-on-click-modal="false">
    <el-form @keyup.enter.native="onSubmit" ref="formRef" :rules="rules" :model="form" label-width="80px" size="default">
      <el-form-item prop="oldpassword" label="旧密码">
        <el-input v-model="form.oldpassword" placeholder="请输入旧密码"></el-input>
      </el-form-item>
      <el-form-item prop="password" label="新密码">
        <el-input type="password" show-password v-model="form.password" placeholder="请输入新密码"></el-input>
      </el-form-item>
      <el-form-item prop="repassword" label="确认密码">
        <el-input type="password" show-password v-model="form.repassword" placeholder="请确认密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" :loading="loading">提交
        </el-button>
      </el-form-item>
    </el-form>
  </el-drawer> -->

  <FormDrawer ref="formDrawerRef">
   <!-- <div class="bg-rose-400" style="height: 2000px;"></div> -->
  </FormDrawer>

</template>

<style scoped>
.f-header {
  @apply flex items-center bg-indigo-700 text-light-50 fixed top-0 left-0 right-0;
  height: 64px
}

.logo {
  width: 250px;
  @apply flex justify-center items-center text-xl font-thin;
}

.icon-btn {
  @apply flex justify-center items-center;
  width: 42px;
  height: 64px;
  cursor: pointer;
}

.icon-btn:hover {
  @apply bg-indigo-600;
}

.f-header .dropdown {
  height: 64px;
  cursor: pointer;
  @apply flex justify-center items-center mx-5;
}
</style>
