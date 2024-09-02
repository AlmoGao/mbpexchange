<!-- 登录 -->
<template>
  <div class="page-login">
    <div class="top">
      <van-icon @click="goHome" class="back" name="arrow-left" />

      <img class="lang" @click="router.push({ name: 'lang' })" src="@/assets/lang/lang.png" alt="">
    </div>

    <div class="title">
      <img class="logo" src="@/assets/logo.png" alt="">
    </div>


    <div class="form">

      <!-- 账号登录 -->
      <div class="subtitle">账号</div>
      <div class="item">
        <input v-model.trim="form.account" type="text" :placeholder="'请输入账号'">
      </div>
      <div class="subtitle">密码</div>
      <div class="item">
        <input v-model="form.password" :type="showPass1 ? 'text' : 'password'" :placeholder="'请输入密码'" class="ipt">
        <van-icon @click="showPass1 = false" v-show="showPass1" class="icon icon_right" name="eye-o" />
        <van-icon @click="showPass1 = true" v-show="!showPass1" class="icon icon_right" name="closed-eye" />
      </div>


      <!-- <div class="tip" style="text-align: right;color: #4936DF;">忘记密码</div> -->
      <van-button :loading="loading" @click="submit" class="btn a_btn" type="primary" size="large">登录</van-button>
      <van-button @click="router.push({ name: 'register' })" style="margin-top:4rem" class="btn b_btn" type="primary"
        size="large">注册</van-button>

    </div>

    <img class="kf" src="@/assets/kf.png" alt="kf" @click="openLink">
  </div>
</template>

<script setup>
import { ref, computed } from "vue"
import router from "@/router"
import https from "@/api/index"
import { showToast } from 'vant';
import store from "@/store"
import { _t } from "@/lang/index";

const showPass1 = ref(false)
const telegram = computed(() => store.state.config.telegram || '')
const whats_app = computed(() => store.state.config.whats_app || '')

const openLink = () => {
  const url = telegram.value || whats_app.value
  if (url) {
    window.open(url)
  }
}

const form = ref({
  account: '',
  password: ''
})


const loading = ref(false)
const submit = () => {
  if (!form.value.account) return
  if (!form.value.password) return
  if (loading.value) return
  loading.value = true
  https.login(form.value).then(res => {
    if (res && res.userinfo) {
      showToast('登录成功')
      store.commit('setToken', res.userinfo.token)
      store.commit('setUserInfo', res.userinfo)
      setTimeout(() => {
        store.dispatch("updateUser");
        router.replace({
          name: 'assets'
        })
      }, 1000);
    }
  }).finally(() => {
    setTimeout(() => {
      loading.value = false
    }, 1000)
  })
}

const goHome = () => {
  router.push({
    name: 'home'
  })
}
</script>

<style lang="less" scoped>
.page-login {
  padding: 4rem 4rem 12rem 4rem;
  background-image: url('@/assets/bg.png');
  background-size: 100% 100%;
  height: 100%;

  .top {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .lang {
      width: 6rem;
      height: 6rem;
    }

    .back {
      font-size: 4rem;
      color: #ccc;
    }
  }

  .title {

    margin: 8rem 0 4rem 0;
    text-align: center;

    .logo {
      width: 20rem;
    }
  }

  .kf {
    width: 12rem;
    height: 12rem;
    margin: 6rem 4rem 4rem 80rem;
  }
}
</style>
