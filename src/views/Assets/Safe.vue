<!-- 安全中心 -->
<template>
    <div class="page page-safe">
        <Top :title="_t('t93')" />

        <div class="box">
            <div class="item" @click="jump('pass')">
                <span>{{ _t('t83') }}</span>
                <van-icon name="arrow" />
            </div>
            <div style="height:1px;width:100%;background-color: #333"></div>
            <div class="item" @click="jump('password')">
                <span>{{ _t('t89') }}</span>
                <van-icon name="arrow" />
            </div>
        </div>
    </div>
</template>

<script setup>
import Top from '@/components/Top.vue';
import router from '@/router';
import { _t } from "@/lang/index";

const jump = name => {
    router.push({
        name
    })
}
</script>

<style lang="less" scoped>
.page-safe {
    padding: 22rem 4rem 4rem 4rem;

    .box {
        background-color: #232323;
        border-radius: 4rem;
        padding: 4rem;

        .item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 2rem;
            height: 12rem;
            color: #eee;
            font-size: 4rem;
        }
    }
}
</style>