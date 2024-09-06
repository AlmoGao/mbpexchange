<!-- 列表 -->
<template>
    <div class="page page-list">
        <Top :title="'列表'" />

        <div class="item" v-for="(item, i) in list" :key="i">
            <div class="tr" style="margin-bottom: 2rem;">
                <div class="time">{{ parseTime(item.createtime) }}</div>
                <div class="amount" :class="[Number(item.pl_amount) > 0 ? 'up' : 'down']">{{
                    Number(item.pl_amount) > 0 ? '+' + item.pl_amount : item.pl_amount }}</div>
            </div>
            <div class="tr">
                <div class="t">方向</div>
                <div class="v">{{ item.direction }}</div>
            </div>
            <div class="tr">
                <div class="t">金额</div>
                <div class="v">{{ item.amount }}</div>
            </div>
            <div class="tr">
                <div class="t">购买价格</div>
                <div class="v">{{ item.buy_price }}</div>
            </div>
            <div class="tr">
                <div class="t">时长</div>
                <div class="v">{{ item.duration }}</div>
            </div>
            <div class="tr">
                <div class="t">出售价格</div>
                <div class="v">{{ item.sell_price }}</div>
            </div>
            <div class="tr">
                <div class="t">状态</div>
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