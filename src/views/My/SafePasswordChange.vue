<!-- 修改资金密码 -->
<template>
    <div class="page-password_set">
        <Top :title="_t('t101')" />

        <!-- 状态 -->
        <div v-if="step == 1" class="content">
            <img class="success" src="@/assets/common/success2.png" alt="img">
            <div class="tip">{{ _t('t102') }}</div>
            <van-button @click="step = 2" class="btn" type="primary" size="large">{{ _t('t103') }}</van-button>
            <div class="text-btn" @click="goTip">{{ _t('t104') }}？</div>
        </div>

        <!-- 修改 -->
        <div class="form" v-if="step == 2">
            <div class="subtitle">{{ _t('t90') }}</div>
            <div class="item">
                <van-icon class="icon icon_left" name="lock" />
                <input v-model="form.oldpassword" :type="showPass1 ? 'text' : 'password'" :placeholder="_t('ipt')"
                    class="ipt">
                <van-icon @click="showPass1 = false" v-show="showPass1" class="icon icon_right" name="eye-o" />
                <van-icon @click="showPass1 = true" v-show="!showPass1" class="icon icon_right" name="closed-eye" />
            </div>
            <div class="subtitle">{{ _t('t91') }}</div>
            <div class="item">
                <van-icon class="icon icon_left" name="lock" />
                <input v-model="form.newpassword" :type="showPass2 ? 'text' : 'password'" type="text"
                    :placeholder="_t('ipt')" class="ipt">
                <van-icon @click="showPass2 = false" v-show="showPass2" class="icon icon_right" name="eye-o" />
                <van-icon @click="showPass2 = true" v-show="!showPass2" class="icon icon_right" name="closed-eye" />
            </div>
            <div class="subtitle">{{ _t('t19') }}</div>
            <div class="item">
                <van-icon class="icon icon_left" name="lock" />
                <input v-model="form.newpassword2" :type="showPass3 ? 'text' : 'password'" type="text"
                    :placeholder="_t('ipt')" class="ipt">
                <van-icon @click="showPass3 = false" v-show="showPass3" class="icon icon_right" name="eye-o" />
                <van-icon @click="showPass3 = true" v-show="!showPass3" class="icon icon_right" name="closed-eye" />
            </div>

            <van-button :loading="loading" @click="submit" class="btn" type="primary" size="large">{{ _t('t48')
                }}</van-button>

        </div>

    </div>
</template>

<script setup>
import Top from '@/components/Top.vue';
import { ref } from "vue"
import { showToast } from "vant"
import http from "@/api"
import router from "@/router"
import { _t } from "@/lang/index";

const step = ref(1) // 1-状态 2-修改

const showPass1 = ref(false)
const showPass2 = ref(false)
const showPass3 = ref(false)

const form = ref({
    oldpassword: '',
    newpassword: '',
    newpassword2: ''
})

const goTip = () => {
    showToast(_t('t105'))
}

const loading = ref(false)
const submit = () => {
    if (!form.value.oldpassword) return showToast(_t('t97'))
    if (!form.value.newpassword) return showToast(_t('t98'))
    if (form.value.newpassword != form.value.newpassword2) return showToast(_t('t26'))
    if (loading.value) return
    loading.value = true
    http.changeFundpwd(form.value).then(res => {
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

    .content {
        padding: 30rem 4rem 4rem 4rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        .success {
            width: 30rem;
        }

        .tip {
            margin: 8rem 0;
        }

        .text-btn {
            margin-top: 6rem;
            color: #4936DF;
        }
    }
}
</style>