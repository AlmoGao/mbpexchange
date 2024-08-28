<!-- 邮箱绑定成功 -->
<template>
    <div class="page-email_success">
        <Top :title="'邮箱认证'" />

        <div class="content">
            <img class="success" src="@/assets/common/success.png" alt="img">
            <div class="title">恭喜您，邮箱绑定成功</div>
            <div class="email">你的邮箱: sdasas@adsad.com</div>

            <van-button style="margin-top:20rem" class="btn" type="primary" size="large">更改邮箱</van-button>
            <van-button style="margin-top:6rem" class="btn" type="default" size="large">返回首页</van-button>
        </div>
    </div>
</template>

<script setup>
import Top from '@/components/Top.vue';
</script>

<style lang="less" scoped>
.page-email_success {
    padding-top: 30rem;

    .content {
        padding: 0 4rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        .success {
            width: 40rem;
        }

        .title {
            margin: 8rem 0 4rem 0;
            font-size: 4.6rem;
        }

        .email {
            color: #999;
        }
    }
}
</style>