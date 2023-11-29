<script setup>
import { ref, reactive } from 'vue'
// import { login } from '~/api/manager'
import { toast } from '~/composables/util.js'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
// import { ElLoading } from 'element-plus'

const store = useStore()
const router = useRouter()

// do not use same name with ref
const form = reactive({
  username: '',
  password: '',
})

//表单验证规则
const rules = reactive({
  username: [
    { required: true, message: '用户名不能为空', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '密码不能为空', trigger: 'blur' },
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
    // 登录按钮 loading 状态控制
    loading.value = true

    store.dispatch('login', form).then(() => {
      toast('登录成功')
      router.push('/')
    }).finally(() => {
      loading.value = false
    })

    // 之前版本
    // login(form.username, form.password).then(res => {
    //   // 提示成功
    //   toast('登录成功')
    //   // 存储 token 和用户相关信息
    //   setToken(res.token)
    //
    //   /* 原操作
    //   const cookie = useCookies()
    //   // 这里的 res.token 就是token，因为在axios.js里设置了响应拦截器
    //   cookie.set('admin-token', res.token) */
    //
    //   // 跳转到后台首页
    //   router.push('/')
    // }).finally(() => {
    //   // 登录按钮 loading 状态控制
    //   loading.value = false
    // })
  })
}
</script>

<template>
  <el-row class="login-container">
    <el-col :lg="16" :md="12" class="left">
      <div>
        <img src="https://qiniu.fc-barcelona.cn/image/JNPF.gif" alt="">
      </div>
    </el-col>

    <el-col :lg="8" :md="12" class="right">
      <h2 class="font-bold text-3xl text-gray-800">欢迎回来</h2>
      <div class="title">
        <span class="line"></span>
        <span>账号密码登录</span>
        <span class="line"></span>
      </div>
      <el-popover
          placement="top"
          :width="200"
          trigger="click"
          content="账号：admin 密码：admin"
      >
        <template #reference>
          <el-tag class="mb-3 cursor-pointer">点我</el-tag>
        </template>
      </el-popover>
      <el-form @keyup.enter.native="onSubmit" ref="formRef" :rules="rules" :model="form" class="w-[250px]">
        <el-form-item prop="username">
          <el-input v-model.trim="form.username" placeholder="请输入用户名">
            <template #prefix>
              <el-icon>
                <User />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" show-password v-model.trim="form.password" placeholder="请输入密码">
            <template #prefix>
              <el-icon>
                <Lock />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="w-[250px] btn-grad" round color="#626aef" type="primary" @click="onSubmit" :loading="loading">
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<style scoped>
.el-button {
  border: 0;
}

/* 登录按钮渐变 */
.btn-grad {
  background-image: linear-gradient(to right, #36D1DC 0%, #5B86E5 51%, #36D1DC 100%);
  text-align: center;
  text-transform: uppercase;
  transition: 0.5s;
  background-size: 200% auto;
  color: white;
  box-shadow: 0 0 20px #eee;
}

.btn-grad:hover {
  background-position: right center;
  /* change the direction of the change here */
  color: #fff;
  text-decoration: none;
}

/* 背景动态渐变 */
.login-container {
  @apply min-h-screen;
  background-color: #0093E9;
  background-image: -webkit-linear-gradient(135deg, #0093E9 0%, #80D0C7 100%);
  background-image: -moz-linear-gradient(135deg, #0093E9 0%, #80D0C7 100%);
  background-image: -o-linear-gradient(135deg, #0093E9 0%, #80D0C7 100%);
  background-image: linear-gradient(135deg, #0093E9 0%, #80D0C7 100%);
  background-size: 400%;
  animation: bgmove 10s infinite;
}

@keyframes bgmove {
  0% {
    background-position: 0 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0 50%;
  }
}

.login-container .left,
.login-container .right {
  @apply flex items-center justify-center;
}

.login-container .right {
  @apply bg-light-50 flex-col;
}

.left>div>div:first-child {
  @apply font-bold text-5xl text-light-50 mb-4;
}

.left>div>div:nth-child(2) {
  @apply text-gray-200 text-sm;
}

.right .title {
  @apply flex items-center justify-center my-5 text-gray-300 space-x-2;
}

.right .title .line {
  @apply h-[1px] w-16 bg-gray-200;
}
</style>
