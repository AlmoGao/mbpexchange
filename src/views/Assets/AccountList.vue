<!-- 列表 -->
<template>
    <div class="page page-list">
        <Top :title="_t('t54')" />

        <div class="tr th">
            <div class="td td1" style="flex:1.5">{{ _t('t55') }}</div>
            <div class="td">{{ _t('t56') }}</div>
            <div class="td td2">{{ _t('t57') }}</div>
        </div>
        <div class="tr" v-for="(item, i) in list" :key="i">
            <div class="td td1" style="flex:1.5">{{ parseTime(item.createtime) }}</div>
            <div class="td">{{ item.type_text }}</div>
            <div class="td td2">{{ item.money }}</div>
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
    http.money_log().then(res => {
        list.value = res || []
    })
}
getList()
</script>

<style lang="less" scoped>
.page-list {
    padding: 16rem 4rem 2rem 4rem;

    .tr {
        display: flex;
        align-items: stretch;
        width: 100%;
        padding: 2rem 0;

        .td {
            flex: 1;
            min-height: 6rem;
            display: flex;
            font-size: 4rem;
            align-items: center;
            justify-content: center;
            word-break: break-all;
            color: #eee;
        }

        .td1 {
            justify-content: flex-start;
            word-break: normal;
        }

        .td2 {
            justify-content: flex-end;
        }
    }

    .th {
        .td {
            font-weight: bold;
            color: #9fa6b5 !important;
        }
    }
}
</style>