<div align="center">

[![Typing SVG](https://readme-typing-svg.demolab.com?font=Fira+Code&pause=1000&random=false&width=435&lines=%E5%9F%BA%E4%BA%8Evue3%2Belement-plus%E7%9A%84%E5%90%8E%E5%8F%B0%E7%AE%A1%E7%90%86%E7%B3%BB%E7%BB%9F%F0%9F%92%BB;%E8%A7%89%E5%BE%97%E4%B8%8D%E9%94%99%E7%9A%84%E8%AF%9D%E5%8F%AF%E4%BB%A5%E7%82%B9%E4%B8%AAstar%E2%AD%90;Thank+you%EF%BC%81%F0%9F%92%95)](https://git.io/typing-svg)

[![Security Status](https://www.murphysec.com/platform3/v31/badge/1671852797116628992.svg)](https://www.murphysec.com/console/report/1671848506901479424/1671852797116628992)

# Vue3 Shop Admin - 现代化电商后台管理系统

[![GitHub Repo stars](https://img.shields.io/github/stars/1411430556/vue3-shopadmin?style=social)](https://github.com/1411430556/vue3-shopadmin/stargazers) ![GitHub Issues or Pull Requests](https://img.shields.io/github/issues/1411430556/vue3-shopadmin)

![Vue](https://img.shields.io/badge/Vue-3.2.47-brightgreen.svg) ![Element Plus](https://img.shields.io/badge/Element_Plus-2.2.11-blue.svg) ![Vite](https://img.shields.io/badge/Vite-4.3.9-purple.svg) ![License](https://img.shields.io/badge/License-MIT-yellow.svg) ![Build](https://img.shields.io/badge/Build-Passing-brightgreen.svg) ![Node.js](https://img.shields.io/badge/Node.js-18.16.0-green.svg) ![WindiCSS](https://img.shields.io/badge/WindiCSS-3.5.6-blue.svg) ![Canvas Confetti](https://img.shields.io/badge/Canvas_Confetti-1.9.3-orange.svg)

基于 Vue3 + Element Plus 的现代化电商后台管理系统，提供完整的商品管理、订单管理、用户管理等功能，助力电商运营高效管理。

</div>

## 📚 技术栈

### 核心框架

- **Vue 3.2.47** - 渐进式 JavaScript 框架
- **Element Plus 2.2.11** - 基于 Vue 3 的组件库
- **Vite 4.3.9** - 下一代前端构建工具

### 状态管理与路由

- **Vuex 4.0.2** - 状态管理
- **Vue Router 4.1.6** - 路由管理

### 工具库

- **Axios 1.4.0** - HTTP 客户端
- **ECharts 5.4.2** - 数据可视化图表库
- **TinyMCE 6.4.2** - 富文本编辑器
- **WindiCSS 3.5.6** - 原子化 CSS 框架
- **Moment.js 2.29.4** - 日期处理
- **GSAP 3.11.5** - 动画库
- **NProgress 0.2.0** - 进度条
- **@vueuse/core 10.1.2** - Vue 组合式 API 工具集
- **@vueuse/integrations 10.1.2** - Vue 集成工具
- **canvas-confetti 1.9.3** - 粒子动画效果
- **universal-cookie 4.0.4** - Cookie 管理

## 🚀 功能特性

### 🛒 商品管理

- 商品列表、添加、编辑、删除
- 商品分类管理
- 商品规格(SKU)管理
- 商品图片管理
- 商品上下架控制
- 商品库存管理
- 商品批量操作
- 商品导入导出

### 🧑‍💼 用户管理

- 用户列表查看与搜索
- 会员等级设置
- 用户数据统计与分析
- 用户行为追踪
- 用户标签管理
- 用户积分管理
- 用户黑名单管理
- 用户反馈处理

### 📦 订单管理

- 订单列表与详情
- 订单状态更新
- 物流信息跟踪
- 订单导出功能
- 订单退款处理
- 订单评价管理
- 订单统计报表
- 订单批量操作

### 💰 营销管理

- 优惠券创建与发放
- 分销系统设置
- 分销员管理
- 促销活动管理
- 积分商城设置
- 秒杀活动管理
- 拼团活动管理
- 满减活动管理

### 📢 内容管理

- 公告发布与管理
- 用户评价管理
- 文章管理
- 轮播图管理
- 帮助中心
- 商品问答管理
- 商品推荐管理
- 专题活动管理

### ⚙️ 系统设置

- 基础配置
- 支付设置
- 物流设置
- 短信配置
- 邮件配置
- 存储配置
- 安全设置
- 日志管理

### 👮 权限管理

- 管理员账户管理
- 角色权限设置
- 菜单权限分配
- 操作日志记录
- 登录日志查看
- 数据权限控制
- 接口权限控制
- 按钮权限控制

## 📁 项目结构

```bash
src/
├── api/                # API 接口管理
│   ├── goods.js        # 商品相关接口
│   ├── order.js        # 订单相关接口
│   ├── user.js         # 用户相关接口
│   ├── manager.js      # 管理员相关接口
│   └── ...             # 其他模块接口
│
├── assets/             # 静态资源
│   ├── images/         # 图片资源
│   ├── styles/         # 样式文件
│   └── icons/          # 图标资源
│
├── components/         # 公共组件
│   ├── common/         # 通用组件
│   ├── business/       # 业务组件
│   └── layout/         # 布局组件
│
├── composables/        # 组合式函数
│   ├── auth.js         # 认证相关
│   ├── useCommon.js    # 通用功能hooks
│   ├── useSku.js       # SKU相关功能
│   ├── useManager.js   # 管理员相关功能
│   └── util.js         # 工具函数
│
├── config/             # 配置文件
│   ├── index.js        # 主配置
│   ├── api.js          # API配置
│   └── constants.js    # 常量配置
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
│   ├── modules/        # 状态模块
│   └── index.js        # 状态入口
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
- Git

### 安装步骤

1. 克隆项目
```bash
git clone https://github.com/1411430556/vue3-shopadmin.git
cd vue3-shopadmin
```

2. 安装依赖
```bash
npm install
```

3. 启动开发服务器
```bash
npm run dev
```

4. 构建生产版本
```bash
npm run build
```

5. 预览生产构建
```bash
npm run preview
```

## 📊 API 接口说明

系统使用 RESTful API 规范，主要包括以下模块接口：

### 认证接口

- 登录: `POST /api/auth/login`
- 登出: `POST /api/auth/logout`
- 获取用户信息: `GET /api/auth/info`

### 商品接口

- 商品列表: `GET /api/goods`
- 商品详情: `GET /api/goods/:id`
- 创建商品: `POST /api/goods`
- 更新商品: `PUT /api/goods/:id`
- 删除商品: `DELETE /api/goods/:id`

### 订单接口

- 订单列表: `GET /api/orders`
- 订单详情: `GET /api/orders/:id`
- 更新订单状态: `PUT /api/orders/:id/status`
- 发货处理: `POST /api/orders/:id/ship`

### 用户接口

- 用户列表: `GET /api/users`
- 用户详情: `GET /api/users/:id`
- 更新用户: `PUT /api/users/:id`
- 删除用户: `DELETE /api/users/:id`

API 基础地址：`http://ceshi13.dishait.cn`（开发环境下自动代理）

## 🛠️ 开发指南

### 权限系统

项目实现了基于 RBAC 的权限控制系统：

1. 基于角色的权限控制
   - 角色管理
   - 权限分配
   - 菜单配置

2. 动态菜单路由生成
   - 根据用户权限动态生成菜单
   - 支持多级菜单
   - 菜单图标配置

3. 按钮级别权限控制
   - 使用自定义指令控制按钮权限
   - 支持多个权限条件
   - 权限缓存机制

4. 自定义权限指令
   - `v-permission` 指令使用
   - 权限判断逻辑
   - 权限缓存处理

### 组件开发规范

1. 组件命名
   - 使用 PascalCase 命名组件
   - 组件名应该具有描述性
   - 避免使用单个单词作为组件名

2. 组件结构
   - 使用 `<script setup>` 语法
   - 按需导入组件和 API
   - 使用 TypeScript 类型定义

3. 样式规范
   - 使用 WindiCSS 原子类
   - 遵循 BEM 命名规范
   - 避免使用行内样式

### 代码规范

1. 命名规范
   - 变量使用 camelCase
   - 常量使用 UPPER_SNAKE_CASE
   - 组件使用 PascalCase

2. 注释规范
   - 使用 JSDoc 注释
   - 关键逻辑添加注释
   - 复杂函数添加参数说明

3. Git 提交规范
   - feat: 新功能
   - fix: 修复 bug
   - docs: 文档更新
   - style: 代码格式
   - refactor: 重构
   - test: 测试
   - chore: 构建过程或辅助工具的变动

## 🔐 安全

项目使用 [MurphySec](https://www.murphysec.com/) 进行安全扫描，确保依赖无安全漏洞。

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
