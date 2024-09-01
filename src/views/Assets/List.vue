<!-- 列表 -->
<template>
    <div class="page page-list">
        <Top :title="'列表'" />

        <div class="tr th">
            <div class="td td1">时间</div>
            <div class="td">状态</div>
            <div class="td td2">金额</div>
        </div>
        <div class="tr" v-for="i in 20" :key="i">
            <div class="td td1">2024-08-31 18:18:18</div>
            <div class="td">asdasasd</div>
            <div class="td td2">2343243</div>
        </div>
    </div>
</template>

<script setup>
import Top from '@/components/Top.vue';
</script>

<style lang="less" scoped>
.page-list {
    padding: 16rem 4rem 2rem 4rem;

    .tr {
        display: flex;
        align-items: stretch;
        width: 100%;

        .td {
            flex: 1;
            min-height: 10rem;
            display: flex;
            font-size: 4rem;
            align-items: center;
            justify-content: center;
            word-break: break-all;
            color: #eee;
        }

        .td1 {
            justify-content: flex-start;
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