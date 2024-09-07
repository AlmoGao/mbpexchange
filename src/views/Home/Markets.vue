<!-- 市场 -->
<template>
    <div class="page page-markets">
        <div class="title">{{ _t('t19') }}</div>

        <div class="content">
            <div class="item" v-for="(item, i) in goods" :key="i" @click="goInfo(item)">
                <div class="icon">
                    <img :src="item.image" :alt="item.name">
                </div>
                <div class="left">
                    <div class="name">{{ item.name }}</div>
                    <div>24H {{ item.amount || '--' }}</div>
                </div>
                <div class="amount" :class="[getPercent(item) > 0 ? 'up' : 'down']">{{ item.close || '--' }}</div>
                <div class="percent" :class="[getPercent(item) > 0 ? 'up-bg' : 'down-bg']">{{ getPercent(item) ?
                    getPercent(item) + '%' : '--' }}</div>
            </div>
        </div>
    </div>
</template>

<script setup>
import http from "@/api/index"
import { ref, computed, onMounted } from "vue"
import store from "@/store"
import router from "@/router"
import { _t } from "@/lang/index";

const goods = computed(() => store.state.goods || [])

const goInfo = item => {
    store.commit('setCurrGood', item)
    router.push({
        name: 'trade'
    })
}

const getPercent = item => {
    if (item.open && item.close) {
        return Number((item.close - item.open) * 100 / item.open).toFixed(2)
    }
    return 0
}
</script>

<style lang="less" scoped>
.page-markets {
    padding-bottom: 16rem;
    display: flex;
    flex-direction: column;
    height: 100%;

    .title {
        height: 12rem;
        font-size: 4rem;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .content {
        flex: 1;
        overflow-y: auto;
        padding: 0 4rem;

        .item {
            padding: 4rem 2rem;
            border-radius: 4rem;
            background: linear-gradient(90deg, rgba(255, 122, 226, .2), rgba(8, 142, 255, .2));
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 3.4rem;
            margin-bottom: 4rem;

            .icon {
                width: 8rem;
                height: 8rem;
                border-radius: 50%;
                background-color: #000;
                margin-right: 2rem;
                overflow: hidden;

                img {
                    width: 100%;
                    height: 100%;
                }
            }

            .left {
                flex: 1;

                .name {
                    font-size: 4rem;
                    font-weight: bold;
                    margin-bottom: 1rem;
                    color: #fff;
                }
            }

            .amount {
                font-size: 4rem;
                font-weight: bold;
                margin: 0 2rem;
            }

            .percent {
                padding: 2.5rem 5rem;
                border-radius: 2rem;
                font-weight: bold;
            }
        }
    }
}
</style>