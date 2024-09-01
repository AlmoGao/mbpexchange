<!-- 安全中心 -->
<template>
    <div class="page page-safe">
        <Top :title="'安全中心'" />

        <div class="box">
            <div class="item" @click="jump('pass')">
                <span>登录密码</span>
                <van-icon name="arrow" />
            </div>
            <div style="height:1px;width:100%;background-color: #333"></div>
            <div class="item" @click="jump('password')">
                <span>交易密码</span>
                <van-icon name="arrow" />
            </div>
        </div>
    </div>
</template>

<script setup>
import Top from '@/components/Top.vue';
import router from '@/router';

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