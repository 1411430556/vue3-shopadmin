<script setup>
  import { useFullscreen } from '@vueuse/core'
  import FormDrawer from '~/components/FormDrawer.vue'
  import { useRepassword, useLogout } from '~/composables/useManager.js'

  /*
   * 这里面很多逻辑都在 ~/composables/useManager.js 里面
   *  */

  // isFullscreen 是否全屏状态  toggle 切换全屏与退出全屏
  const { isFullscreen, toggle } = useFullscreen()
  // 解构出来
  const { formDrawerRef, form, rules, formRef, onSubmit, openRePasswordForm } = useRepassword()

  // 退出登录
  const { handleLogout } = useLogout()

  // 控制修改密码还是退出登录
  const handleCommand = c => {
    switch (c) {
      case 'rePassword':
        openRePasswordForm()
        break
      case 'logout':
        handleLogout()
        break
    }
  }

  // 刷新页面
  const handleRefresh = () => location.reload()
</script>

<template>
  <div class="f-header">
    <!--左侧-->
    <span class="logo">
      <el-icon class="mr-1">
        <Cloudy />
      </el-icon>
      <span class="cursor-default">SHOP</span>
    </span>
    <el-tooltip
      effect="dark"
      :content="$store.state.isCollapse === false ? '折叠' : '展开'"
      placement="bottom"
    >
      <!-- 折叠图标 -->
      <el-icon class="icon-btn" @click="$store.commit('HANDLE_ASIDE')">
        <Fold v-if="$store.state.isCollapse === false" />
        <Expand v-else />
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
  <FormDrawer ref="formDrawerRef" title="修改密码" destroyOnClose @submit="onSubmit">
    <el-form
      @keyup.enter="onSubmit"
      ref="formRef"
      :rules="rules"
      :model="form"
      label-width="80px"
      size="default"
    >
      <el-form-item prop="oldpassword" label="旧密码">
        <el-input v-model="form.oldpassword" placeholder="请输入旧密码"></el-input>
      </el-form-item>
      <el-form-item prop="password" label="新密码">
        <el-input
          type="password"
          show-password
          v-model="form.password"
          placeholder="请输入新密码"
        ></el-input>
      </el-form-item>
      <el-form-item prop="repassword" label="确认密码">
        <el-input
          type="password"
          show-password
          v-model="form.repassword"
          placeholder="请确认密码"
        ></el-input>
      </el-form-item>
    </el-form>
  </FormDrawer>
</template>

<style scoped>
  .f-header {
    @apply flex items-center text-light-50 fixed top-0 left-0 right-0;
    /* background-color: #0093E9; */
    background-color: #2a73d0;
    height: 64px;
    z-index: 999;
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
    background-color: #0093e9;
  }

  .f-header .dropdown {
    height: 64px;
    cursor: pointer;
    @apply flex justify-center items-center mx-5;
  }

  .el-dropdown-link {
    color: white;
  }
</style>
