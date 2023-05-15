import { ref } from 'vue'
import { useRoute, onBeforeRouteUpdate } from 'vue-router'
import { useCookies } from '@vueuse/integrations/useCookies'
import { router } from '~/router/index.js'

export function useTabList () {
  const route = useRoute()
  // const router = useRouter()
  const cookie = useCookies()

// 当前激活的路由
  const activeTab = ref(route.path)
  const tabList = ref([
    {
      title: '后台首页',
      path: '/',
    },
  ])

// 初始化标签导航列表
  function initTabList () {
    let tabs = cookie.get('tabList')
    if (tabs) {
      tabList.value = tabs
    }
  }

  initTabList()

// 添加标签 tabs 的方法
  function addTab (tab) {
    if (tabList.value.findIndex(item => item.path === tab.path) === -1) {
      tabList.value.push(tab)
    }
    // let noTab = tabList.value.findIndex(item => item.path == tab.path) == -1
    // if (noTab) {
    //   tabList.value.push(tab)
    // }
    cookie.set('tabList', tabList.value)
  }

// onBeforeRouteUpdate 添加一个导航守卫，不论当前位置何时被更新都会触发。类似于 beforeRouteUpdate，但可以在任何组件中使用。当组件被卸载时，该守卫会被移除。
  onBeforeRouteUpdate((to) => {
    activeTab.value = to.path
    addTab({
      title: to.meta.title,
      path: to.path,
    })
  })

// 点击标签实现路由跳转
  const changeTab = (item) => {
    // 这里的 item 就是你点击的标签的路径
    activeTab.value = item
    router.push(item)
  }

// 删除标签的方法
  const removeTab = (targetName) => {
    let tabs = tabList.value
    let a = activeTab.value
    // targetName 是鼠标点的那个 tab 的路径，如 /goods/list
    // a 是当前所处页面的路径
    if (a === targetName) {
      tabs.forEach((item, index) => {
        if (item.path === targetName) {
          const nextTab = tabs[index + 1] || tabs[index - 1]
          if (nextTab) {
            a = nextTab.path
          }
        }
      })
    }
    activeTab.value = a
    // filter返回通过所提供函数实现的测试的所有元素。
    // 这一步是通过过滤把不是我们所点的 tab 留下，就相当于更新了 tabList 列表
    tabList.value = tabList.value.filter(item => item.path !== targetName)
    cookie.set('tabList', tabList.value)
  }

// 关闭其它和关闭所有
  const handleClose = (c) => {
    if (c === 'clearAll') {
      // 过滤只剩下首页
      tabList.value = tabList.value.filter(item => item.path === '/')
      // 标签激活跳回到首页
      activeTab.value = '/'
    } else if (c === 'clearOther') {
      // 过滤只剩下首页和当前所处的页面
      tabList.value = tabList.value.filter(
        item => item.path === '/' || item.path === route.path)  // 这里 route.path 也可以换成 activeTab.value
    }
    cookie.set('tabList', tabList.value)
  }

  return {
    activeTab,
    tabList,
    changeTab,
    removeTab,
    handleClose,
  }
}
