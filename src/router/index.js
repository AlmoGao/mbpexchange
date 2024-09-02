import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '../views/Layout/Layout.vue'
import ws from '@/tools/ws'
import store from '../store/index'

const routes = [
  {
    path: '/',
    name: 'layout',
    component: Layout,
    redirect: '/home',
    children: [
      { // 首页
        path: '/home',
        name: 'home',
        component: () => import('../views/Home/Home.vue')
      },
      { // 公告
        path: '/notice',
        name: 'notice',
        component: () => import('../views/Home/NoticeList.vue')
      },
      { // 公告
        path: '/noticeInfo',
        name: 'noticeInfo',
        component: () => import('../views/Home/NoticeInfo.vue')
      },
      { // 市场
        path: '/markets',
        name: 'markets',
        component: () => import('../views/Home/Markets.vue')
      },
      { // 团队
        path: '/team',
        name: 'team',
        component: () => import('../views/Home/Team.vue')
      },
      { // 语言
        path: '/lang',
        name: 'lang',
        component: () => import('../views/Home/Lang.vue')
      },
      { // 资产
        path: '/assets',
        name: 'assets',
        component: () => import('../views/Assets/Assets.vue')
      },
      { // 安全中心
        path: '/safe',
        name: 'safe',
        component: () => import('../views/Assets/Safe.vue')
      },
      { // 登录密码
        path: '/pass',
        name: 'pass',
        component: () => import('../views/Assets/Pass.vue')
      },
      { // 登录密码
        path: '/password',
        name: 'password',
        component: () => import('../views/Assets/Password.vue')
      },
      { // 地址
        path: '/address',
        name: 'address',
        component: () => import('../views/Assets/Address.vue')
      },
      { // 银行卡
        path: '/bank',
        name: 'bank',
        component: () => import('../views/Assets/Bank.vue')
      },
      { // 列表
        path: '/list',
        name: 'list',
        component: () => import('../views/Assets/List.vue')
      },
      { // 充值
        path: '/recharge',
        name: 'recharge',
        component: () => import('../views/Assets/Recharge.vue')
      },
      { // 提现
        path: '/withdraw',
        name: 'withdraw',
        component: () => import('../views/Assets/Withdraw.vue')
      },
      { // 交易
        path: '/trade',
        name: 'trade',
        component: () => import('../views/Home/Trade.vue')
      },
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/User/Login.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/User/Register.vue')
  },
  {
    // 找不到路由时
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
]



const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.afterEach((to) => {
  setTimeout(() => {
    const layout = document.querySelector('.page-layout')
    if (layout) {
      layout.scrollTop = 0
    }
  }, 300)
})
export default router
