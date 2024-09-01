<!-- 银行卡 -->
<template>
    <div class="page page-bank">
        <Top :title="'银行卡'" />

        <div class="box">
            <div class="subtitle">姓名</div>
            <div class="item">
                <input type="text" class="ipt" placeholder="姓名">
            </div>
            <div class="subtitle">银行名字</div>
            <div class="item">
                <input type="text" class="ipt" placeholder="银行名字">
            </div>
            <div class="subtitle">银行卡号</div>
            <div class="item">
                <input type="text" class="ipt" placeholder="银行卡号">
            </div>
            <div class="subtitle">交易密码</div>
            <div class="item">
                <input type="password" class="ipt" placeholder="交易密码">
            </div>
        </div>

        <div class="a_btn submit">提交</div>
    </div>
</template>

<script setup>
import Top from '@/components/Top.vue';
</script>

<style lang="less" scoped>
.page-bank {
    padding: 18rem 4rem 4rem 4rem;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .box {
        .subtitle {
            color: #eee;
            font-size: 4rem;
            margin-bottom: 2rem
        }

        .item {
            height: 12rem;
            margin-bottom: 4rem;
            background-color: #191919;
            padding: 0 4rem;

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
</style>