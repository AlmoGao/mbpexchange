<!-- 设置登录密码 -->
<template>
    <div class="page-password_set">
        <Top :title="_t('t89')" />

        <!-- 使用原密码修改 -->
        <div class="form" v-if="type == 1">
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
            <div class="subtitle">{{ _t('t92') }}</div>
            <div class="item">
                <van-icon class="icon icon_left" name="lock" />
                <input v-model="form.newpassword2" :type="showPass3 ? 'text' : 'password'" type="text"
                    :placeholder="_t('ipt')" class="ipt">
                <van-icon @click="showPass3 = false" v-show="showPass3" class="icon icon_right" name="eye-o" />
                <van-icon @click="showPass3 = true" v-show="!showPass3" class="icon icon_right" name="closed-eye" />
            </div>

            <van-button :loading="loading" class="btn" type="primary" size="large" @click="submit">{{ _t('t48')
                }}</van-button>

            <div class="link" @click="changeType">{{ _t('t93') }}</div>
        </div>

        <!-- 使用邮箱修改 -->
        <div class="form" v-if="type == 2">
            <div class="subtitle">{{ _t('t94') }}</div>
            <div class="item">
                <van-icon class="icon icon_left" name="notes" />
                <input :type="'text'" disabled :placeholder="_t('ipt')" class="ipt">
            </div>
            <div class="subtitle">{{ _t('t95') }}</div>
            <div class="item">
                <van-icon class="icon icon_left" name="award" />
                <input :type="'text'" :placeholder="_t('ipt')" class="ipt">
                <div class="ipt_btn">{{ _t('t9') }}</div>
            </div>
            <div class="subtitle">{{ _t('t91') }}</div>
            <div class="item">
                <van-icon class="icon icon_left" name="lock" />
                <input :type="showPass2 ? 'text' : 'password'" type="text" :placeholder="_t('ipt')" class="ipt">
                <van-icon @click="showPass2 = false" v-show="showPass2" class="icon icon_right" name="eye-o" />
                <van-icon @click="showPass2 = true" v-show="!showPass2" class="icon icon_right" name="closed-eye" />
            </div>
            <div class="subtitle">{{ _t('t92') }}</div>
            <div class="item">
                <van-icon class="icon icon_left" name="lock" />
                <input :type="showPass3 ? 'text' : 'password'" type="text" :placeholder="_t('ipt')" class="ipt">
                <van-icon @click="showPass3 = false" v-show="showPass3" class="icon icon_right" name="eye-o" />
                <van-icon @click="showPass3 = true" v-show="!showPass3" class="icon icon_right" name="closed-eye" />
            </div>

            <van-button class="btn" type="primary" size="large">{{ _t('t9') }}</van-button>

            <div class="link" @click="changeType">{{ _t('t96') }}</div>
        </div>
    </div>
</template>

<script setup>
import Top from '@/components/Top.vue';
import { ref } from "vue"
import http from "@/api/index"
import { showToast } from 'vant'
import router from '@/router'
import store from "@/store"
import { _t } from "@/lang/index";

const type = ref(1) // 1-密码 2-邮箱
const changeType = () => {
    if (type.value == 1) {
        // todo 检测邮箱绑定
        type.value = 2
    } else {
        type.value = 1
    }
}

const showPass1 = ref(false)
const showPass2 = ref(false)
const showPass3 = ref(false)

const form = ref({
    newpassword: '',
    newpassword2: '',
    oldpassword: '',
})

const loading = ref(false)
const submit = () => {
    if (!form.value.oldpassword) return showToast(_t('t97'))
    if (!form.value.newpassword) return showToast(_t('t98'))
    if (form.value.newpassword != form.value.newpassword2) return showToast(_t('t26'))
    if (loading.value) return
    loading.value = true
    http.changepwd(form.value).then(res => {
        showToast(res.msg)
        if (res.code == 1) {
            form.value = {
                newpassword: '',
                newpassword2: '',
                oldpassword: '',
            }
            setTimeout(() => {
                store.commit('setToken', '')
                store.commit('setUserInfo', {})
                router.push({
                    name: 'login'
                })
            }, 1000);
        }
    }).finally(() => {
        setTimeout(() => {
            loading.value = false
        }, 1000);
    })
}

</script>

<style lang="less" scoped>
.page-password_set {
    padding-top: 20rem;
}
</style>