<!-- 修改交易密码 -->
<template>
    <div class="page page-pass">
        <Top :title="'交易密码'" />

        <div class="subtitle">账号</div>
        <div class="item" style="color: #eee;">
            sadasdasd
        </div>
        <div class="subtitle">旧密码</div>
        <div class="item">
            <input placeholder="旧密码" type="password" class="ipt">
        </div>
        <div class="subtitle">新密码</div>
        <div class="item">
            <input placeholder="新密码" type="password" class="ipt">
        </div>
        <div class="subtitle">确认密码</div>
        <div class="item">
            <input placeholder="确认密码" type="password" class="ipt">
        </div>

        <div class="a_btn submit">确认修改</div>
    </div>
</template>

<script setup>
import Top from '@/components/Top.vue';
</script>

<style lang="less" scoped>
.page-pass {
    padding: 20rem 4rem 4rem 4rem;

    .subtitle {
        font-size: 3.2rem;
        margin-bottom: 1rem;
    }

    .item {
        height: 10rem;
        border-bottom: 1px solid #666;
        margin-bottom: 4rem;
        line-height: 10rem;
        font-size: 4rem;

        .ipt {
            width: 100%;
            height: 100%;
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
</style>