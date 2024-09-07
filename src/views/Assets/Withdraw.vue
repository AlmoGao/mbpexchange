<!-- 提现 -->
<template>
    <div class="page page-withdraw">
        <Top :bgColor="'rgba(0,0,0,0)'" :title="_t('t15')" :rightRecord="true" @clickRight="rightRecord" />

        <div class="title">{{ _t('t94') }}</div>
        <div class="btns">
            <div class="btn" :class="{ 'a_btn': type == 'bank' }">{{ _t('t71') }}</div>
            <!-- <div class="btn" :class="{ 'a_btn': type == 'trc20' }">Trc-20</div>
            <div class="btn" :class="{ 'a_btn': type == 'erc20' }">Erc-20</div> -->
        </div>

        <div class="info" @click="goBank" v-if="!userInfo.bank.length">
            <div class="info_text">{{ _t('t95') }}</div>
            <van-icon name="arrow" />
        </div>
        <div class="info" v-if="userInfo.bank.length" @click="showPicker = true">
            <div class="info_text">{{ currBank.card }}--{{ currBank.code }}</div>
            <van-icon name="arrow" />
        </div>


        <!-- 余额 -->
        <div class="amount">{{ _t('t41') }}：{{ userInfo.money }}</div>
        <!-- <div class="amount">有效余额：0.00</div> -->

        <!-- 表单 -->
        <div class="item" style="margin-top: 6rem;">
            <input v-model="amount" type="number" :placeholder="_t('t90')" class="ipt">

            <span class="all" @click="amount = userInfo.money">{{ _t('t34') }}</span>
        </div>
        <div class="tip">
            <!-- <span>最小提现金额：</span>
            <span class="tip_link">0</span> -->
        </div>
        <div class="subtitle">{{ _t('t96') }}</div>
        <div class="item">
            <input v-model="fee" type="number" disabled class="ipt">
        </div>
        <div class="tip">
            <span>{{ _t('t96') }}：{{ config.withdraw_fee }}%</span>
        </div>
        <div class="subtitle">{{ _t('t89') }}</div>
        <div class="item">
            <input v-model="password" type="password" :placeholder="_t('t97')" class="ipt">
        </div>

        <div class="a_btn submit" :style="{ opacity: loading ? '0.4' : '1' }" @click="submit">{{ _t('t15') }}</div>


        <div class="tip_box">
            <div class="tip_title">*Withdrawal rules*</div>
            <div v-html="config.withdraw_text"></div>
        </div>
    </div>

    <van-popup v-model:show="showPicker" round position="bottom">
        <van-picker :columns="columns" @cancel="showPicker = false" @confirm="onConfirm" />
    </van-popup>
</template>

<script setup>
import Top from '@/components/Top.vue';
import router from '@/router';
import { ref, computed } from "vue"
import store from "@/store"
import http from "@/api/index"
import { showToast } from 'vant';
import { _t } from "@/lang/index";

const userInfo = computed(() => store.state.userInfo || {})
const config = computed(() => store.state.config || {})

const amount = ref('')
const fee = computed(() => {
    if (!amount.value) return '--'
    return (amount.value * config.value.withdraw_fee / 100).toFixed(2)
})

const type = ref('bank')
const currBank = ref({})
if (userInfo.value.bank && userInfo.value.bank[0]) {
    currBank.value = userInfo.value.bank[0]
}
const showPicker = ref(false)
const columns = computed(() => {
    return userInfo.value.bank.map(item => {
        return {
            text: item.card + '--' + item.code,
            value: item.id,
            ...item
        }
    })
})
const onConfirm = item => {
    currBank.value = item.selectedOptions[0]
    showPicker.value = false
}


const rightRecord = () => {
    router.push({
        name: 'wList'
    })
}


const goBank = () => {
    router.push({
        name: 'bank'
    })
}

const password = ref('')
const loading = ref(false)
const submit = () => {
    if (!amount.value || amount.value < 0) return
    if (!password.value) return
    if (loading.value) return
    loading.value = true
    http.withdraw({
        money: Number(amount.value),
        user_bank_id: currBank.value.id,
        fee: Number(fee.value),
        fundpassword: password.value
    }).then(res => {
        if (res.code == 1) {
            amount.value = ''
            password.value = ''
            showToast(_t('t98'))
        }
    }).finally(() => {
        loading.value = false
    })
}
</script>

<style lang="less" scoped>
.page-withdraw {
    height: 100%;
    padding: 18rem 4rem 24rem 4rem;
    overflow-y: auto;
    background: linear-gradient(180deg, #0099FF 0%, #010318 32.9%, #0B0B0B 45.68%);

    .title {
        font-size: 6rem;
        color: #eee;
    }

    .btns {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 6rem 0 4rem 0;

        .btn {
            width: 30%;
            height: 8rem;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #232323;
            color: #fff !important;
            border-radius: 8rem;
        }
    }

    .info {
        padding: 4rem;
        border-radius: 4rem;
        background-color: #232323;
        display: flex;
        align-items: center;
        color: #eee;
        font-size: 4rem;
        margin: 8rem 0;

        .info_text {
            flex: 1;
            margin-right: 2rem;
        }
    }

    .amount {
        text-align: right;
        color: #eee;
        line-height: 6rem;
        font-size: 4rem;
    }

    .tip_box {
        margin-top: 6rem;
        line-height: 4.2rem;

        .tip_title {
            color: #e03e2d;
            font-size: 4rem;
            font-weight: bold;
            margin-bottom: 0.5rem;
        }
    }

    .item {
        height: 12rem;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 4rem;
        font-size: 4rem;
        border-radius: 6rem;
        background-color: #232323;
        margin-bottom: 8rem;

        .ipt {
            flex: 1;
            height: 100%;
            color: #eee;
        }

        .all {
            color: #53d6f0;
        }
    }

    .tip {
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: relative;
        top: -7rem;
        padding: 0 2rem;
    }

    .subtitle {
        color: #eee;
        font-size: 4rem;
        margin-bottom: 2rem;
    }

    .submit {
        height: 12rem;
        width: 80rem;
        display: flex;
        align-items: center;
        justify-content: center;
        position: fixed;
        z-index: 999;
        bottom: 8rem;
        left: 50%;
        transform: translateX(-50%)
    }
}
</style>