<!-- 登录 -->
<template>
  <div class="page-login">
    <div class="top">
      <LangIcon class="lang" />
      <img @click="router.back()" class="close" src="@/assets/common/close.svg" alt="img">
    </div>

    <div class="title">{{ _t('t1') }}</div>

    <div class="tabs">
      <div @click="activeTab = 1" class="tab" :class="{ 'active_tab': activeTab == 1 }">{{ _t('t2') }}</div>
      <div @click="activeTab = 2" class="tab" :class="{ 'active_tab': activeTab == 2 }">{{ _t('t3') }}</div>
    </div>


    <div class="form" style="padding: 0">

      <!-- 账号登录 -->
      <template v-if="activeTab == 1">
        <div class="subtitle">{{ _t('t4') }}</div>
        <div class="item">
          <input v-model.trim="form.account" type="text" :placeholder="_t('t5')">
        </div>
        <div class="subtitle">{{ _t('t6') }}</div>
        <div class="item">
          <input v-model="form.password" :type="showPass1 ? 'text' : 'password'" :placeholder="_t('ipt')" class="ipt">
          <van-icon @click="showPass1 = false" v-show="showPass1" class="icon icon_right" name="eye-o" />
          <van-icon @click="showPass1 = true" v-show="!showPass1" class="icon icon_right" name="closed-eye" />
        </div>
      </template>

      <!-- 邮箱登录 -->
      <template v-if="activeTab == 2">
        <div class="subtitle">{{ _t('t7') }}</div>
        <div class="item">
          <input type="text" :placeholder="_t('t7')">
        </div>
        <div class="subtitle">{{ _t('t8') }}</div>
        <div class="item">
          <input :type="'text'" :placeholder="_t('ipt')" class="ipt">
          <div class="icon_right ipt_btn">{{ _t('t9') }}</div>
        </div>
      </template>

      <!-- <div class="tip" style="text-align: right;color: #4936DF;">忘记密码</div> -->
      <van-button :loading="loading" @click="submit" class="btn" type="primary" size="large">{{ _t('t10')
        }}</van-button>

      <div class="tip" style="text-align: center;margin-top: 10rem;">
        <span>{{ _t('t11') }}？</span>
        <span class="a" @click="router.replace({ name: 'register' })">{{ _t('t12') }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"
import router from "@/router"
import https from "@/api/index"
import { showToast } from 'vant';
import store from "@/store"
import { _t } from "@/lang/index";
import LangIcon from "@/components/LangIcon"

const activeTab = ref(1)
const showPass1 = ref(false)

const form = ref({
  account: '',
  password: ''
})


const loading = ref(false)
const submit = () => {
  if (!form.value.account) return showToast(_t('t13'))
  if (!form.value.password) return showToast(_t('t14'))
  if (loading.value) return
  loading.value = true
  https.login(form.value).then(res => {
    if (res && res.userinfo) {
      showToast(_t('t15'))
      store.commit('setToken', res.userinfo.token)
      store.commit('setUserInfo', res.userinfo)
      setTimeout(() => {
        router.replace({
          name: 'my'
        })
      }, 1000);
    }
  }).finally(() => {
    setTimeout(() => {
      loading.value = false
    }, 1000)
  })
}
</script>

<style lang="less" scoped>
.page-login {
  padding: 4rem 4rem 12rem 4rem;

  .top {
    padding: 4rem 0;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .lang {
      width: 8rem;
      height: 8rem;
    }

    .close {
      width: 6rem;
      height: 6rem;
    }
  }

  .title {
    font-size: 6rem;
    margin: 8rem 0;
  }

  .tabs {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-bottom: 10rem;

    .tab {
      margin-right: 6rem;
      font-size: 4rem;
    }

    .active_tab {
      color: #4936DF;
    }
  }
}
</style>
