<!-- 列表 -->
<template>
    <div class="page page-list">
        <Top :title="_t('t82')" />

        <div class="item" v-for="(item, i) in list" :key="i">
            <div style="color:#fff;font-size: 5rem;font-weight: bold;margin-bottom: 2rem;">{{ item.coin || '--' }}</div>
            <div class="tr" style="margin-bottom: 2rem;">
                <div class="time">{{ parseTime(item.createtime) }}</div>
                <div class="amount" :class="[Number(item.pl_amount) > 0 ? 'up' : 'down']">{{
                    Number(item.pl_amount) > 0 ? '+' + item.pl_amount : item.pl_amount }}</div>
            </div>
            <div class="tr">
                <div class="t">{{ _t('t45') }}</div>
                <div class="v">{{ item.direction == 0 ? _t('t42') : _t('t43') }}</div>
            </div>
            <div class="tr">
                <div class="t">{{ _t('t41') }}</div>
                <div class="v">{{ item.amount }}</div>
            </div>
            <div class="tr">
                <div class="t">{{ _t('t47') }}</div>
                <div class="v">{{ item.buy_price }}</div>
            </div>
            <div class="tr">
                <div class="t">{{ _t('t48') }}</div>
                <div class="v">{{ item.duration }}</div>
            </div>
            <div class="tr">
                <div class="t">{{ _t('t49') }}</div>
                <div class="v">{{ item.sell_price }}</div>
            </div>
            <div class="tr">
                <div class="t">{{ _t('t50') }}</div>
                <div class="v">{{ item.status_text }}</div>
            </div>
        </div>
        <NoData v-if="!list.length" />
    </div>
</template>

<script setup>
import Top from '@/components/Top.vue';
import http from "@/api"
import { ref } from "vue"
import { parseTime } from "@/tools/utils"
import NoData from '@/components/NoData.vue';
import { _t } from "@/lang/index";

const list = ref([])
const getList = () => {
    http.orderList({
        status: 1
    }).then(res => {
        list.value = res || []
    })
}
getList()
</script>

<style lang="less" scoped>
.page-list {
    padding: 16rem 4rem 2rem 4rem;

    .item {
        padding: 4rem;
        border-radius: 2rem;
        margin: 4rem 4rem 0 4rem;
        background-color: #303030;

        .tr {
            display: flex;
            align-items: center;
            justify-content: space-between;
            line-height: 5.4rem;

            .amount {
                font-size: 4rem;
                font-weight: bold;
            }

            .t {}

            .v {
                color: #eee;
            }
        }
    }
}
</style>