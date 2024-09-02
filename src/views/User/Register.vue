<!-- 注册 -->
<template>
  <div class="page-register">
    <div class="top">
      <van-icon @click="router.back()" class="back" name="arrow-left" />
      <span>注册</span>
      <img class="lang" @click="router.push({ name: 'lang' })" src="@/assets/lang/lang.png" alt="">
    </div>


    <div style="height:10rem"></div>
    <div class="form">

      <!-- 账号注册 -->
      <div class="subtitle">账号</div>
      <div class="item">
        <input v-model.trim="form.username" type="text" :placeholder="'账号'">
      </div>
      <div class="subtitle">邮箱</div>
      <div class="item">
        <input v-model.trim="form.email" type="text" :placeholder="'邮箱'">
      </div>
      <div class="subtitle">密码</div>
      <div class="item">
        <input v-model="form.password" :type="showPass1 ? 'text' : 'password'" :placeholder="'密码'" class="ipt">
        <van-icon @click="showPass1 = false" v-show="showPass1" class="icon icon_right" name="eye-o" />
        <van-icon @click="showPass1 = true" v-show="!showPass1" class="icon icon_right" name="closed-eye" />
      </div>
      <div class="subtitle">确认密码</div>
      <div class="item">
        <input v-model="form.password2" :type="showPass2 ? 'text' : 'password'" :placeholder="'确认密码'" class="ipt">
        <van-icon @click="showPass2 = false" v-show="showPass2" class="icon icon_right" name="eye-o" />
        <van-icon @click="showPass2 = true" v-show="!showPass2" class="icon icon_right" name="closed-eye" />
      </div>
      <div class="subtitle">邀请码</div>
      <div class="item">
        <input v-model="form.invite_code" type="text" :placeholder="'邀请码'">
      </div>

      <van-button :loading="loading" class="btn a_btn" type="primary" size="large" @click="goRegister">注册</van-button>
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
  if (!form.value.username) return
  if (!form.value.email) return
  if (!form.value.password) return
  if (form.value.password != form.value.password2) return showToast('两次密码不一致')
  if (loading.value) return
  loading.value = true
  https.register(form.value).then(res => {
    if (res && res.userinfo) {
      showToast('注册成功')
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
</script>

<style lang="less" scoped>
.page-register {
  padding: 4rem 4rem 12rem 4rem;
  background-image: url('@/assets/bg.png');
  background-size: 100% 100%;
  height: 100%;

  .top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #fff;
    font-size: 5rem;

    .lang {
      width: 6rem;
      height: 6rem;
    }

    .back {
      font-size: 4rem;
      color: #ccc;
    }
  }

}
</style>
