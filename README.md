<div align="center">

[![Typing SVG](https://readme-typing-svg.demolab.com?font=Fira+Code&pause=1000&random=false&width=435&lines=%E5%9F%BA%E4%BA%8Evue3%2Belement-ui%E7%9A%84%E5%90%8E%E5%8F%B0%E7%AE%A1%E7%90%86%E7%B3%BB%E7%BB%9F%F0%9F%92%BB;%E8%A7%89%E5%BE%97%E4%B8%8D%E9%94%99%E7%9A%84%E8%AF%9D%E5%8F%AF%E4%BB%A5%E7%82%B9%E4%B8%AAstar%E2%AD%90;Thank+you%EF%BC%81%F0%9F%92%95)](https://git.io/typing-svg)

[![Security Status](https://www.murphysec.com/platform3/v31/badge/1671852797116628992.svg)](https://www.murphysec.com/console/report/1671848506901479424/1671852797116628992)

# Vue3 Shop Admin - 电商后台管理系统

[![GitHub Repo stars](https://img.shields.io/github/stars/1411430556/vue3-shopadmin?style=social)](https://github.com/1411430556/vue3-shopadmin/stargazers) ![GitHub Issues or Pull Requests](https://img.shields.io/github/issues/1411430556/vue3-shopadmin)

![Vue](https://img.shields.io/badge/Vue-3.2.47-brightgreen.svg) ![Element Plus](https://img.shields.io/badge/Element_Plus-2.2.11-blue.svg) ![Vite](https://img.shields.io/badge/Vite-4.3.9-purple.svg) ![License](https://img.shields.io/badge/License-MIT-yellow.svg) ![Build](https://img.shields.io/badge/Build-Passing-brightgreen.svg) ![Node.js](https://img.shields.io/badge/Node.js-18.16.0-green.svg) ![WindiCSS](https://img.shields.io/badge/WindiCSS-3.5.6-blue.svg)

基于 Vue3 + Element Plus 的现代化电商后台管理系统，提供完整的商品管理、订单管理、用户管理等功能，助力电商运营高效管理。

</div>

## 📚 技术栈

- **前端框架**: Vue 3.2.47
- **UI 组件库**: Element Plus 2.2.11
- **路由管理**: Vue Router 4.1.6
- **状态管理**: Vuex 4.0.2
- **构建工具**: Vite 4.3.9
- **HTTP 客户端**: Axios
- **图表库**: ECharts 5.4.2
- **富文本编辑**: TinyMCE 6.4.2
- **CSS 框架**: WindiCSS 3.5.6
- **日期处理**: Moment.js 2.29.4
- **动画库**: GSAP 3.11.5
- **进度条**: NProgress 0.2.0

## 🚀 功能特性

### 🛒 商品管理

- 商品列表、添加、编辑、删除
- 商品分类管理
- 商品规格(SKU)管理
- 商品图片管理

### 🧑‍💼 用户管理

- 用户列表查看
- 会员等级设置
- 用户数据统计

### 📦 订单管理

- 订单列表与详情
- 订单状态更新
- 物流信息跟踪

### 💰 营销管理

- 优惠券创建与发放
- 分销系统设置
- 分销员管理

### 📢 内容管理

- 公告发布与管理
- 用户评价管理

### ⚙️ 系统设置

- 基础配置
- 支付设置
- 物流设置

### 👮 权限管理

- 管理员账户管理
- 角色权限设置
- 菜单权限分配

## 🔍 系统截图

_(可根据实际项目添加系统截图)_

## 📁 项目结构

```
src/
├── api/                # API 接口管理
│   ├── goods.js        # 商品相关接口
│   ├── order.js        # 订单相关接口
│   ├── user.js         # 用户相关接口
│   ├── manager.js      # 管理员相关接口
│   └── ...             # 其他模块接口
│
├── assets/             # 静态资源
│
├── components/         # 公共组件
│
├── composables/        # 组合式函数
│   ├── auth.js         # 认证相关
│   ├── useCommon.js    # 通用功能hooks
│   ├── useSku.js       # SKU相关功能
│   ├── useManager.js   # 管理员相关功能
│   └── util.js         # 工具函数
│
├── config/             # 配置文件
│
├── directives/         # 自定义指令
│   └── permission.js   # 权限控制指令
│
├── layouts/            # 布局组件
│   └── Admin.vue       # 后台管理布局
│
├── pages/              # 页面组件
│   ├── goods/          # 商品管理
│   ├── order/          # 订单管理
│   ├── user/           # 用户管理
│   ├── category/       # 分类管理
│   ├── comment/        # 评论管理
│   ├── coupon/         # 优惠券管理
│   ├── distribution/   # 分销管理
│   ├── image/          # 图片管理
│   ├── level/          # 会员等级
│   ├── manager/        # 管理员管理
│   ├── notice/         # 公告管理
│   ├── role/           # 角色管理
│   ├── setting/        # 系统设置
│   ├── skus/           # 规格管理
│   ├── Index.vue       # 首页仪表盘
│   ├── Login.vue       # 登录页面
│   └── 404.vue         # 404页面
│
├── router/             # 路由配置
│   └── index.js        # 路由定义及权限控制
│
├── store/              # Vuex 状态管理
│
├── App.vue             # 根组件
├── main.js             # 入口文件
├── permission.js       # 权限控制
└── axios.js            # Axios配置
```

## ⚡ 快速开始

### 环境要求

- Node.js >= 14.0.0
- npm >= 6.0.0

### 安装依赖

```bash
npm install
```

### 开发环境运行

```bash
npm run dev
```

### 生产环境构建

```bash
npm run build
```

### 预览生产构建

```bash
npm run preview
```

## 📊 API 接口说明

系统使用 RESTful API 规范，主要包括以下模块接口：

- 用户认证接口: 登录、登出、获取用户信息
- 商品管理接口: 商品 CRUD、分类管理、规格管理
- 订单管理接口: 订单查询、订单状态更新、发货管理
- 营销管理接口: 优惠券管理、分销设置
- 系统管理接口: 角色权限管理、系统配置管理

API 基础地址：`http://ceshi13.dishait.cn`（开发环境下自动代理）

## 🛠️ 开发相关

### 权限系统

项目实现了基于 RBAC 的权限控制系统：

1. 基于角色的权限控制
2. 动态菜单路由生成
3. 按钮级别权限控制
4. 自定义权限指令

### 组件自动导入

使用 `unplugin-vue-components` 和 `unplugin-auto-import` 实现组件和 API 的自动导入，提高开发效率：

```javascript
// vite.config.js
plugins: [
  AutoImport({
    resolvers: [ElementPlusResolver()],
  }),
  Components({
    resolvers: [ElementPlusResolver()],
  }),
]
```

### 主要依赖

- **UI 组件**:

  - `element-plus`: Element Plus UI 组件库
  - `@element-plus/icons-vue`: Element Plus 图标库

- **功能增强**:

  - `@vueuse/core`: Vue Composition API 工具集
  - `@vueuse/integrations`: VueUse 集成工具
  - `@tinymce/tinymce-vue`: TinyMCE 富文本编辑器 Vue 组件

- **数据处理**:

  - `axios`: HTTP 客户端
  - `universal-cookie`: Cookie 处理库
  - `moment`: 日期时间处理

- **视觉效果**:
  - `echarts`: 图表库
  - `gsap`: 动画库
  - `nprogress`: 进度条

### 开发工具

- `@vitejs/plugin-vue`: Vite Vue 插件
- `code-inspector-plugin`: 代码检查插件
- `unplugin-auto-import`: 自动导入 API
- `unplugin-vue-components`: 组件自动导入
- `vite-plugin-windicss`: WindiCSS 支持
- `windicss`: 原子化 CSS 框架

## 🔐 安全

项目使用[MurphySec](https://www.murphysec.com/)进行安全扫描，确保依赖无安全漏洞。

## 📈 Star History

[![Star History Chart](https://api.star-history.com/svg?repos=1411430556/vue3-shopadmin&type=Date)](https://www.star-history.com/#1411430556/vue3-shopadmin&Date)

## 🤝 贡献指南

1. Fork 本仓库
2. 创建您的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交您的更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开一个 Pull Request

## 📄 许可证

[MIT License](LICENSE)

## 🙏 鸣谢

感谢所有为这个项目做出贡献的开发者！

---

如有问题或建议，欢迎提 Issue 或 PR！
