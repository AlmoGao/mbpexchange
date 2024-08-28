<!-- 初级认证 -->
<template>
    <div class="page-auth1">
        <Top :title="_t('t52')" />


        <!-- <div class="tip">为了保障账户安全体验，请您绑定个人身份信息</div> -->

        <div class="form">
            <div class="subtitle">{{ _t('t53') }}：</div>
            <div class="item">
                <input v-model="form.bank_on" :type="'text'" :placeholder="_t('ipt')" class="ipt">
            </div>
            <div class="subtitle">{{ _t('t54') }}：</div>
            <div class="item">
                <input v-model="form.bank_name" :type="'text'" :placeholder="_t('ipt')" class="ipt">
            </div>
            <div class="subtitle">{{ _t('t55') }}：</div>
            <div class="item">
                <input v-model="form.username" :type="'text'" :placeholder="_t('ipt')" class="ipt">
            </div>

            <van-button v-if="!userInfo.bank_info.bank_name" class="btn" type="primary" size="large" :loading="loading"
                @click="submit">{{ _t('t56') }}</van-button>
        </div>
    </div>
</template>

<script setup>
import Top from '@/components/Top.vue';
import http from "@/api"
import { ref, computed } from "vue"
import { showToast } from "vant"
import store from "@/store"
import { _t } from "@/lang/index";

const userInfo = computed(() => store.state.userInfo || {})
store.dispatch('updateUser')

const form = ref({
    bank_on: userInfo.value.bank_info.bank_on || '',
    bank_name: userInfo.value.bank_info.bank_name || '',
    username: userInfo.value.bank_info.username || '',
})

const loading = ref(false)
const submit = () => {
    if (!form.value.bank_on) return showToast(_t("t57"))
    if (!form.value.bank_name) return showToast(_t("t58"))
    if (!form.value.username) return showToast(_t("t59"))
    if (loading.value) return
    loading.value = true
    http.bindBank(form.value).then(res => {
        if (res.code == 1) {
            showToast(_t("t60"))
        }
    }).finally(() => {
        loading.value = false
    })
}
</script>

<style lang="less" scoped>
.page-auth1 {
    padding-top: 20rem;

    .tip {
        padding: 8rem 4rem;
        color: #d62548;
    }
}
</style>