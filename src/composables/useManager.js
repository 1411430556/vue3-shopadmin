import { reactive, ref } from 'vue'
import { logOut, updatePassword } from '~/api/manager.js'
import { showModal, toast } from '~/composables/util.js'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { useConfetti } from './useConfetti.js'

export function useRepassword() {
  const router = useRouter()
  const store = useStore()
  // 修改密码-抽屉弹出
  const formDrawerRef = ref(null)

  const form = reactive({
    oldpassword: '',
    password: '',
    repassword: '',
  })

  //表单验证规则
  const rules = reactive({
    oldpassword: [{ required: true, message: '旧密码不能为空', trigger: 'blur' }],
    password: [{ required: true, message: '新密码不能为空', trigger: 'blur' }],
    repassword: [{ required: true, message: '确认密码不能为空', trigger: 'blur' }],
  })

  const formRef = ref(null)

  const onSubmit = () => {
    formRef.value.validate(valid => {
      if (!valid) {
        return false
      }
      // loading 状态打开
      formDrawerRef.value.showLoading()
      updatePassword(form)
        .then(() => {
          toast('修改密码成功，请重新登录')
          store.dispatch('logout')
          router.push('/login')
        })
        .finally(() => {
          // loading 状态关闭
          formDrawerRef.value.hideLoading()
        })
    })
  }

  const openRePasswordForm = () => formDrawerRef.value.open()

  return {
    formDrawerRef,
    form,
    rules,
    formRef,
    onSubmit,
    openRePasswordForm,
  }
}

export function useLogout() {
  const router = useRouter()
  const store = useStore()
  const { playConfettiAnimation } = useConfetti()

  // 退出登录的逻辑
  function handleLogout() {
    showModal('是否退出登录？').then(res => {
      // 播放烟花动画
      playConfettiAnimation()

      logOut().finally(() => {
        // 调用 store 状态管理里的 logout 函数移除 cookie 里的 token,清除当前用户状态 vuex
        store.dispatch('logout')
        //跳转回登录页
        router.push('/login')
        // 提示退出登录成功
        toast('已退出登录')
      })
    })
  }

  return {
    handleLogout,
  }
}
