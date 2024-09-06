<!-- 充值 -->
<template>
    <div class="page page-recharge">
        <Top :title="'充值'" :rightRecord="true" @clickRight="rightRecord" />

        <div class="box">
            <div class="btns">
                <div class="btn" @click="channel = item.id" v-for="(item, i) in channels" :key="i"
                    :class="{ 'a_btn': channel == item.id }">{{
                        item.name }}</div>
            </div>
            <div class="amount_box">
                <div>充值金额</div>
                <input v-model="amount" type="number" class="ipt" placeholder="请输入金额">
            </div>

            <div class="fasters">
                <div @click="amount = f" class="faster shadow" v-for="f in fasters" :key="f">{{ f }}</div>
            </div>

            <div :style="{ opacity: loading ? '0.4' : '1' }" class="a_btn submit" @click="submit">确认</div>
        </div>

        <div class="tip_box">
            <div class="tip_title">Regarding recharge rules:</div>
            <div>
                ①. Do not save the recharge account. Every time you recharge. You must be logged in to your MBP account.
                Click Recharge to submit the order and obtain the latest bank account number to complete the recharge
                (recharge is completed, wait a few minutes, and the amount will be automatically deposited into your MBP
                account.)
            </div>
            <div>
                ②. When Pay1 cannot be recharged, you can choose Pay2/Pay3/Pay4/Pay5 to recharge.
            </div>
            <div>
                ③. The minimum recharge amount for a single transaction is: 500 ₹, and the maximum recharge amount is:
                20,000 ₹.
            </div>
            <div>
                ④. If the recharge is completed, the amount has not been added to the MBP account after 10 minutes.
                Please send the detailed bill and mobile phone number screenshot of the completed recharge to the online
                customer service staff for processing.
            </div>
        </div>
    </div>
</template>

<script setup>
import Top from '@/components/Top.vue';
import router from '@/router';
import { ref, computed } from "vue"
import store from '@/store';
import http from "@/api/index"
import { showConfirmDialog } from 'vant';

const fasters = computed(() => store.state.config.recharge_quick || [])
const channels = computed(() => store.state.config.channel || [])


const amount = ref('')
const channel = ref('')
if (channels.value && channels.value[0]) {
    channel.value = channels.value[0].id
}

const rightRecord = () => {
    router.push({
        name: 'rList'
    })
}

const loading = ref(false)
const submit = () => {
    if (!amount.value || amount.value < 0) return
    if (loading.value) return
    loading.value = true
    http.recharge({
        money: Number(amount.value),
        channel_id: channel.value
    }).then(res => {
        if (res.url) {
            amount.value = ''
            showConfirmDialog({
                showCancelButton: false,
                title: '',
                message:
                    '提交成功，是否跳转充值页面？',
            })
                .then(() => {
                    window.open(res.url)
                })
        }
    }).finally(() => {
        loading.value = false
    })
}
</script>

<style lang="less" scoped>
.page-recharge {
    padding: 18rem 4rem 4rem 4rem;
    position: relative;

    .box {
        padding: 4rem;
        border-radius: 4rem;
        background-color: #191919;

        .btns {
            display: flex;
            align-items: center;
            justify-content: space-between;

            .btn {
                width: 45%;
                height: 10rem;
                display: flex;
                align-items: center;
                justify-content: center;
                background-color: #232323;
                color: #fff !important;
                border-radius: 10rem;
            }
        }

        .amount_box {
            margin: 6rem 0;
            padding: 4rem;
            border-radius: 4rem;
            background-color: #303030;

            input {
                height: 10rem;
                color: #eee;
                font-size: 4rem;
            }
        }

        .fasters {
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-wrap: wrap;

            .faster {
                height: 10rem;
                border-radius: 1rem;
                background-color: #313131;
                display: flex;
                align-items: center;
                justify-content: center;
                color: #eee;
                font-size: 4rem;
                margin-bottom: 4rem;
                min-width: 30%;
            }
        }

        .submit {
            height: 12rem;
            margin: 6rem 0rem 4rem 0rem;
            display: flex;
            align-items: center;
            justify-content: center;
        }
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
}
</style>