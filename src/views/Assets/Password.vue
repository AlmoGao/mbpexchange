<!-- 修改交易密码 -->
<template>
    <div class="page page-pass">
        <Top :title="_t('t89')" />

        <div class="subtitle">{{ _t('t1') }}</div>
        <div class="item" style="color: #eee;">
            {{ userInfo.username }}
        </div>
        <div class="subtitle" v-if="userInfo.fundpassword">{{ _t('t84') }}</div>
        <div class="item" v-if="userInfo.fundpassword">
            <input v-model="form.oldpassword" :placeholder="_t('t84')" type="password" class="ipt">
        </div>
        <div class="subtitle">{{ _t('t85') }}</div>
        <div class="item">
            <input v-model="form.newpassword" :placeholder="_t('t85')" type="password" class="ipt">
        </div>
        <div class="subtitle">{{ _t('t86') }}</div>
        <div class="item">
            <input v-model="form.newpassword2" :placeholder="_t('t86')" type="password" class="ipt">
        </div>

        <div class="a_btn submit" :class="{ 'loading': loading }" @click="changePass">{{ _t('t87') }}</div>
    </div>
</template>

<script setup>
import Top from '@/components/Top.vue';
import http from "@/api"
import { ref, computed } from "vue"
import store from "@/store"
import { showToast } from "vant"
import router from "@/router"
import { _t } from "@/lang/index";

const userInfo = computed(() => store.state.userInfo || {})

const form = ref({
    oldpassword: '',
    newpassword: '',
    newpassword2: ''
})
const loading = ref(false)
const changePass = () => {
    if (userInfo.value.fundpassword) {
        if (!form.value.oldpassword) return
    }
    if (!form.value.newpassword) return
    if (form.value.newpassword != form.value.newpassword2) return showToast(_t('t11'))
    if (loading.value) return
    loading.value = true
    http.changefundpwd(form.value).then(res => {
        if (res.code == 1) {
            showToast(_t('t62'))
            store.dispatch('updateUser')
            setTimeout(() => {
                router.back()
            }, 500)
        }
    }).finally(() => {
        loading.value = false
    })
}
</script>

<style lang="less" scoped>
.page-pass {
    padding: 20rem 4rem 4rem 4rem;

    .subtitle {
        font-size: 3.2rem;
        margin-bottom: 1rem;
    }

    .item {
        height: 10rem;
        border-bottom: 1px solid #666;
        margin-bottom: 4rem;
        line-height: 10rem;
        font-size: 4rem;

        .ipt {
            width: 100%;
            height: 100%;
        }
    }

    .submit {
        height: 12rem;
        margin-top: 10rem;
        display: flex;
        align-items: center;
        justify-content: center;
    }
}
</style>