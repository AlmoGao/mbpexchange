<!-- 提现 -->
<template>
    <div class="page-rechagre">
        <Top :title="_t('t143') + ' ' + (currChannel.name || '')" />

        <!-- 币种列表 -->
        <div v-if="step == 1">
            <div class="list_title">{{ _t('t127') }}</div>
            <div class="list_item" v-for="(item, i) in channel" :key="i" @click="selectChannel(item)">
                <img class="icon" v-if="item.logo_image" :src="item.logo_image" alt="img">
                <div class="info">{{ item.name }}</div>
                <van-icon name="arrow" />
            </div>
        </div>

        <!-- 提现详情 -->
        <div v-if="step == 2">
            <div class="top_box">
                <div class="num">{{ userInfo.money || '0.00' }}</div>
                <div>{{ _t('t144') }}</div>
            </div>

            <div class="form">
                <!-- <div class="subtitle">提现币种（USDT）</div>
                <div class="item" style="background-color: #EBEBEB;">
                    <img class="icon icon_left" src="@/assets/assets/USDT.svg" alt="img">
                    <span style="flex:1">USDT</span>
                    <span></span>
                </div> -->
                <div class="subtitle">{{ _t('t145') }}</div>
                <div class="item">
                    <input v-model="form.amount" type="number" class="ipt" :placeholder="_t('ipt')">
                    <span style="color: #4936DF;" @click="form.amount = Number(userInfo.money)">{{ _t('t146') }}</span>
                </div>
                <!-- <div class="subtitle">提现地址</div>
                <div class="item">
                    <input type="text" class="ipt" :placeholder="_t('ipt')">
                </div> -->
                <!-- <div class="subtitle">提现密码</div>
                <div class="item">
                    <input :type="showPass1 ? 'text' : 'password'" class="ipt" :placeholder="_t('ipt')">
                    <van-icon @click="showPass1 = false" v-show="showPass1" class="icon icon_right" name="eye-o" />
                    <van-icon @click="showPass1 = true" v-show="!showPass1" class="icon icon_right" name="closed-eye" />
                </div> -->

                <div class="tip" @click="goCustomer">
                    <div>{{ _t('t147') }}<span class="a">{{ _t('t148') }}</span></div>
                    <br />
                    <div>{{ _t('t149') }}：{{ currChannel.fee ? currChannel.fee + '%' : '0' }}</div>
                </div>

                <van-button :loading="loading" @click="submit" style="margin-bottom:10rem" class="btn" type="primary"
                    size="large">{{ _t('t150') }}</van-button>
            </div>
        </div>
    </div>
</template>

<script setup>
import Top from '@/components/Top.vue';
import { ref, computed } from "vue"
import store from "@/store"
import http from "@/api"
import { showToast } from "vant"
import router from "@/router"
import { _t } from "@/lang/index";

const userInfo = computed(() => store.state.userInfo || {})
const channel = computed(() => {
    return (store.state.config.channel || []).filter(item => item.status == 1)
})
const currChannel = ref({})
const selectChannel = item => {
    currChannel.value = item
    step.value = 2
}


const form = ref({
    amount: '',
    fee: ''
})
const loading = ref(false)
const submit = () => {
    if (!form.value.amount || form.value.amount <= 0) return showToast(_t('t140'))
    if (loading.value) return
    loading.value = true
    form.value.fee = form.value.amount * currChannel.value.fee / 100
    http.withdrawal(form.value).then(res => {
        if (res.code == 1) {
            showToast(_t('t151'))
            setTimeout(() => {
                router.back()
            }, 1000)
            store.dispatch('updateUser')
        }
    }).finally(() => {
        setTimeout(() => {
            loading.value = false
        }, 1000)
    })
}

const step = ref(1)
const showPass1 = ref(false)

const changeFile = e => {
    console.error(e.target.files[0])
}


const goCustomer = () => {
    store.dispatch('goCustomer')
}
</script>

<style lang="less" scoped>
.page-rechagre {
    padding-top: 16rem;

    .list_title {
        padding: 12rem 4rem 2rem 4rem;
        font-size: 4rem;
    }

    .list_item {
        height: 15rem;
        display: flex;
        align-items: center;
        padding: 0 4rem;

        .icon {
            width: 6rem;
            height: 6rem;
            margin-right: 4rem;
        }

        .info {
            flex: 1;
        }
    }

    .top_box {
        padding: 10rem 0;
        border-bottom: 1px solid #e5e5e5;
        font-size: 4rem;
        color: #999;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;

        .num {
            font-size: 12rem;
            font-weight: bold;
            color: #2A18B8;
            margin-bottom: 2rem;
        }
    }

    .form {
        .form_info {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            color: #000;
            font-weight: bold;

            img {
                width: 4rem;
                height: 4rem;
            }
        }

        .upload_box {
            height: 25rem;
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;

            .icon {
                width: 10rem;
                height: 10rem;
            }

            .upload_ipt {
                width: 100%;
                height: 100%;
                position: absolute;
                top: 0;
                left: 0;
                z-index: 999;
                opacity: 0;
            }
        }
    }
}
</style>