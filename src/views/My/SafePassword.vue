<!-- 设置资金密码 -->
<template>
    <div class="page-password_set">
        <Top :title="_t('t99')" />

        <div class="form">
            <div class="item">
                <van-icon class="icon icon_left" name="lock" />
                <input v-model="password" :type="showPass1 ? 'text' : 'password'" :placeholder="_t('ipt')" class="ipt">
                <van-icon @click="showPass1 = false" v-show="showPass1" class="icon icon_right" name="eye-o" />
                <van-icon @click="showPass1 = true" v-show="!showPass1" class="icon icon_right" name="closed-eye" />
            </div>

            <van-button @click="submit" :loading="loading" class="btn" type="primary" size="large">{{ _t('t48')
                }}</van-button>

        </div>

    </div>
</template>

<script setup>
import Top from '@/components/Top.vue';
import { ref, computed } from "vue"
import store from "@/store"
import router from "@/router"
import http from "@/api"
import { showToast } from "vant"
import { _t } from "@/lang/index";

const userInfo = computed(() => store.state.userInfo || {})
const showPass1 = ref(false)

if (userInfo.value.fund_password) {
    router.replace({
        name: 'safePasswordChange'
    })
}

const loading = ref(false)
const password = ref('')
const submit = () => {
    if (!password.value) return showToast(_t('t14'))
    if (loading.value) return
    loading.value = true
    http.setfFundpwd({
        password: password.value
    }).then(res => {
        if (res.code == 1) {
            showToast(_t('t100'))
            setTimeout(() => {
                router.back()
            }, 1000)
        }
    }).finally(() => {
        setTimeout(() => {
            loading.value = false
        }, 1000)
    })
}

</script>

<style lang="less" scoped>
.page-password_set {
    padding-top: 20rem;
}
</style>