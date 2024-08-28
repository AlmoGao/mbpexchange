<!-- 注册 -->
<template>
  <div class="page-register">
    <div class="top">
      <LangIcon class="lang" />
      <img class="close" @click="router.back()" src="@/assets/common/close.svg" alt="img">
    </div>

    <div class="title">{{ _t("t16") }}</div>

    <div class="tabs">
      <div @click="activeTab = 1" class="tab" :class="{ 'active_tab': activeTab == 1 }">{{ _t("t17") }}</div>
      <div @click="activeTab = 2" class="tab" :class="{ 'active_tab': activeTab == 2 }">{{ _t("t18") }}</div>
    </div>


    <div class="form" style="padding: 0">

      <!-- 账号注册 -->
      <template v-if="activeTab == 1">
        <div class="subtitle">{{ _t("t4") }}</div>
        <div class="item">
          <input v-model.trim="form.username" type="text" :placeholder="_t('t5')">
        </div>
        <div class="subtitle">{{ _t("t6") }}</div>
        <div class="item">
          <input v-model="form.password" :type="showPass1 ? 'text' : 'password'" :placeholder="_t('ipt')" class="ipt">
          <van-icon @click="showPass1 = false" v-show="showPass1" class="icon icon_right" name="eye-o" />
          <van-icon @click="showPass1 = true" v-show="!showPass1" class="icon icon_right" name="closed-eye" />
        </div>
        <div class="subtitle">{{ _t("t19") }}</div>
        <div class="item">
          <input v-model="form.password2" :type="showPass2 ? 'text' : 'password'" :placeholder="_t('ipt')" class="ipt">
          <van-icon @click="showPass2 = false" v-show="showPass2" class="icon icon_right" name="eye-o" />
          <van-icon @click="showPass2 = true" v-show="!showPass2" class="icon icon_right" name="closed-eye" />
        </div>
        <div class="subtitle">{{ _t("t20") }}</div>
        <div class="item">
          <input v-model="form.invite_code" type="text" :placeholder="_t('ipt')">
        </div>
      </template>

      <!-- 邮箱注册 -->
      <template v-if="activeTab == 2">
        <div class="subtitle">{{ _t("t7") }}</div>
        <div class="item">
          <input v-model="form.email" type="text" placeholder="邮箱">
        </div>
        <div class="subtitle">{{ _t("t6") }}</div>
        <div class="item">
          <input v-model="form.password" :type="showPass1 ? 'text' : 'password'" :placeholder="_t('ipt')" class="ipt">
          <van-icon @click="showPass1 = false" v-show="showPass1" class="icon icon_right" name="eye-o" />
          <van-icon @click="showPass1 = true" v-show="!showPass1" class="icon icon_right" name="closed-eye" />
        </div>
        <div class="subtitle">{{ _t("t19") }}</div>
        <div class="item">
          <input v-model="form.password2" :type="showPass2 ? 'text' : 'password'" :placeholder="_t('ipt')" class="ipt">
          <van-icon @click="showPass2 = false" v-show="showPass2" class="icon icon_right" name="eye-o" />
          <van-icon @click="showPass2 = true" v-show="!showPass2" class="icon icon_right" name="closed-eye" />
        </div>
        <div class="subtitle">{{ _t("t20") }}</div>
        <div class="item">
          <input v-model="form.invite_code" type="text" :placeholder="_t('ipt')">
        </div>
        <div class="subtitle">{{ _t("t8") }}</div>
        <div class="item">
          <input v-model="form.code" :type="'text'" :placeholder="_t('ipt')" class="ipt">
          <div class="icon_right ipt_btn">{{ _t("t9") }}</div>
        </div>
      </template>

      <!-- <div class="tip" style="text-align: right;color: #4936DF;">忘记密码</div> -->
      <van-button :loading="loading" class="btn" type="primary" size="large" @click="goRegister">{{ _t("t21")
        }}</van-button>

      <div class="tip" style="text-align: center;margin-top: 10rem;">
        <span>{{ _t("t22") }}？</span>
        <span class="a" @click="router.replace({ name: 'login' })">{{ _t("t23") }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"
import https from "@/api/index"
import { showToast } from 'vant';
import store from "@/store"
import router from "@/router"
import { _t } from "@/lang/index";
import LangIcon from "@/components/LangIcon"

const activeTab = ref(1)
const showPass1 = ref(false)
const showPass2 = ref(false)

const invite_code = localStorage.getItem('invite_code')

const form = ref({
  username: '',
  password: '',
  password2: '',
  email: '',
  mobile: '',
  invite_code: invite_code,
  code: ''
})

const loading = ref(false)
const goRegister = () => {
  if (activeTab.value == 1) {
    form.value.email = ''
    if (!form.value.username) return showToast(_t('t13'))
  } else {
    form.value.username = ''
    if (!form.value.email) return showToast(_t('t24'))
    if (!form.value.code) return showToast(_t('t25'))
  }
  if (!form.value.password) return showToast(_t('t14'))
  if (form.value.password != form.value.password2) return showToast(_t('t26'))
  if (loading.value) return
  loading.value = true
  https.register(form.value).then(res => {
    if (res && res.userinfo) {
      showToast(_t('t27'))
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
.page-register {
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
