<!-- usdt 地址 -->
<template>
    <div class="page page-address">
        <Top :title="_t('t58')" />

        <!-- 列表 -->
        <div class="list_box" v-if="step == 1">
            <div class="list">
                <div class="item" v-for="(item, i) in wallet" :key="i">
                    <div class="title">{{ item.type == 0 ? 'TRC20/USDT' : 'ERC20/USDT' }}</div>
                    <div class="info">{{ item.address }}</div>
                </div>
            </div>
            <div class="a_btn submit" @click="step = 2, address = ''">{{ _t('t59') }}</div>
        </div>

        <!-- 添加 -->
        <div class="add_box" v-if="step == 2">
            <div class="btns">
                <div class="btn" @click="type = 'trc20'" :class="{ 'a_btn': type == 'trc20' }">Trc-20</div>
                <div class="btn" @click="type = 'erc20'" :class="{ 'a_btn': type == 'erc20' }">Erc-20</div>
            </div>

            <div class="box">
                <div class="subtitle">{{ _t('t60') }}</div>
                <div class="item">
                    <input v-model="address" class="ipt" type="text" :placeholder="_t('t60')">
                </div>
                <!-- <div style="margin:4rem 0;border-top:1px solid #333"></div>
                <div class="subtitle">交易密码</div>
                <div class="item">
                    <input class="ipt" type="password" placeholder="交易密码">
                </div> -->
            </div>

            <div style="flex: 1;"></div>

            <div class="a_btn submit" @click="add" :class="{ 'loading': loading }">{{ _t('t61') }}</div>
        </div>

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

const step = ref(1)
const wallet = computed(() => store.state.userInfo?.wallet || [])

const type = ref('trc20') // 0-trc20 1-erc20
const address = ref('')
const loading = ref(false)
const add = () => {
    if (loading.value || !address.value) return
    loading.value = true
    http.bindaddress({
        type: type.value == 'trc20' ? 0 : 1,
        address: address.value
    }).then(res => {
        if (res.code == 1) {
            showToast(_t('t62'))
            store.dispatch("updateUser");
            step.value = 1
        }
    }).finally(() => {
        loading.value = false
    })
}
</script>

<style lang="less" scoped>
.page-address {
    padding: 20rem 4rem 4rem 4rem;
    height: 100%;
    display: flex;
    flex-direction: column;

    .list_box {
        flex: 1;
        display: flex;
        flex-direction: column;

        .list {
            flex: 1;
            overflow-y: auto;
            margin-bottom: 2rem;

            .item {
                padding: 4rem;
                margin-bottom: 4rem;
                background-color: #232323;
                border-radius: 4rem;

                .title {
                    line-height: 10rem;
                    font-size: 4.2rem;
                    color: #eee;
                    border-bottom: 1px solid #333;
                }

                .info {
                    padding: 4rem 0 2rem 0;
                }
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

    .add_box {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

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

        .box {
            margin-top: 8rem;
            padding: 4rem;
            border-radius: 4rem;
            background-color: #232323;

            .subtitle {
                margin-bottom: 1rem
            }

            .item {
                height: 10rem;

                .ipt {
                    width: 100%;
                    height: 100%;
                    font-size: 4rem;
                }
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
}
</style>