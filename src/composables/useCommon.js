import { computed, reactive, ref } from 'vue'
import { toast } from '~/composables/util.js'

// 列表、分页、搜索、修改、删除状态
export function useInitTable (opt = {}) {
  let searchForm = null
  let resetSearchForm = null
  if (opt.searchForm) {
    searchForm = reactive({ ...opt.searchForm })
    resetSearchForm = () => {
      for (let key in opt.searchForm) {
        searchForm[key] = opt.searchForm[key]
      }
      getData()
    }
  }

// 表格数据
  const tableData = ref([])
  const loading = ref(false)
// 分页
  const currentPage = ref(1)
  const total = ref(0)
  const limit = ref(10)

// 获取数据
  function getData (numberOfPages = null) {
    // 点击按钮也换当前显示的哪页
    if (typeof numberOfPages === 'number') currentPage.value = numberOfPages
    loading.value = true
    opt.getList(currentPage.value, searchForm).then(value => {
      if (opt.onGetListSuccess && typeof opt.onGetListSuccess === 'function') {
        opt.onGetListSuccess(value)
      } else {
        tableData.value = value.list
        total.value = value.totalCount
      }
    }).finally(() => loading.value = false)
  }

  getData()

  // 删除
  const handleDelete = (id) => {
    loading.value = true
    opt.delete(id).then(() => {
      toast('删除成功')
      getData()
    }).finally(() => loading.value = false)
  }

  // 修改状态
  const handleStatusChange = (status, row) => {
    // status 是开关的状态 0关 1开
    row.statusLoading = true
    opt.updateStatus(row.id, status).then(() => {
      toast('修改状态成功')
      row.status = status
    }).finally(() => {
      row.statusLoading = false
    })
  }

  return {
    searchForm,
    resetSearchForm,
    tableData,
    loading,
    currentPage,
    total,
    limit,
    getData,
    handleDelete,
    handleStatusChange,
  }
}

// 新增、修改
export function useInitForm (opt = {}) {
  // 新增管理员列表，表单部分
  const formDrawerRef = ref(null)
  const formRef = ref(null)
  const form = reactive({})
// 表单验证规则
  const rules = opt.rules || {}

// 判断抽屉打开后抽屉的标题是新增还是修改；点击修改会拿到一个ID，就为true，点击新增下面把ID设为0了，就是false
  const editID = ref(0)
  const drawerTitle = computed(() => editID.value ? '修改' : '新增')

  const handleSubmit = () => {
    formRef.value.validate((valid) => {
      if (!valid) return
      formDrawerRef.value.showLoading()
      const fun = editID.value
        ? opt.update(editID.value, form)
        : opt.create(form)
      fun.then(() => {
        toast(drawerTitle.value + '成功')
        // 修改刷新当前页，新增刷新第一页
        opt.getData(editID.value ? false : 1)
        formDrawerRef.value.close()
      }).finally(() => formDrawerRef.value.hideLoading())
    })
  }

// 重置表单
  function resetForm (row = false) {
    if (formRef.value) formRef.value.clearValidate()
    for (let key in opt.form) {
      form[key] = row[key]
    }
  }

// 新增
  const handleCreate = () => {
    editID.value = 0
    resetForm(opt.form)
    formDrawerRef.value.open()
  }

// 修改
  const handleEdit = (row) => {
    editID.value = row.id
    resetForm(row)
    formDrawerRef.value.open()
  }

  return {
    formDrawerRef,
    formRef,
    form,
    rules,
    editID,
    drawerTitle,
    handleSubmit,
    resetForm,
    handleCreate,
    handleEdit,
  }
}
