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
      { // 语言
        path: '/lang',
        name: 'lang',
        component: () => import('../views/Home/Lang.vue')
      },
      { // 行情
        path: '/markets',
        name: 'markets',
        component: () => import('../views/Markets/Markets.vue')
      },
      { // 资产
        path: '/assets',
        name: 'assets',
        component: () => import('../views/Assets/Assets.vue')
      },
      { // 充币记录
        path: '/rcList',
        name: 'rcList',
        component: () => import('../views/Assets/RechargeList.vue')
      },
      { // 提现记录
        path: '/wdList',
        name: 'wdList',
        component: () => import('../views/Assets/WithdrawList.vue')
      },
      { // 提现记录
        path: '/wdList',
        name: 'wdList',
        component: () => import('../views/Assets/WithdrawList.vue')
      },
      { // 充值
        path: '/recharge',
        name: 'recharge',
        component: () => import('../views/Assets/Recharge.vue')
      },
      { // 充值
        path: '/withdraw',
        name: 'withdraw',
        component: () => import('../views/Assets/Withdraw.vue')
      },
      { // 我的
        path: '/my',
        name: 'my',
        component: () => import('../views/My/My.vue')
      },
      { // 设置登录密码
        path: '/passwordSet',
        name: 'passwordSet',
        component: () => import('../views/My/PasswordSet.vue')
      },
      { // 安全密码
        path: '/safePassword',
        name: 'safePassword',
        component: () => import('../views/My/SafePassword.vue')
      },
      { // 修改安全密码
        path: '/safePasswordChange',
        name: 'safePasswordChange',
        component: () => import('../views/My/SafePasswordChange.vue')
      },
      { // 邮箱认证
        path: '/emailSet',
        name: 'emailSet',
        component: () => import('../views/My/EmailSet.vue')
      },
      { // 邮箱绑定成功
        path: '/emailSuccess',
        name: 'emailSuccess',
        component: () => import('../views/My/EmailSuccess.vue')
      },
      { // 初级认证
        path: '/auth1',
        name: 'auth1',
        component: () => import('../views/My/Auth1.vue')
      },
      { // 高级认证
        path: '/auth2',
        name: 'auth2',
        component: () => import('../views/My/Auth2.vue')
      },
      { // 交易
        path: '/trade',
        name: 'trade',
        component: () => import('../views/Trade/Trade.vue')
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
