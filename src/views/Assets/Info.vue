<!-- 详情 -->
<template>
    <div class="page-info">
        <Top :title="'充值详情'" />

        <div class="top_box">
            <div class="num">+111.00</div>
            <div>充值金额(ETH)</div>
        </div>

        <div class="info_box">
            <div class="info_item">
                <span>币种</span>
                <span>ETH</span>
            </div>
            <div class="info_item">
                <span>状态</span>
                <span>审核中</span>
            </div>
            <div class="info_item">
                <span>时间</span>
                <span>2022/02/02 22:22:22</span>
            </div>
            <div class="info_item" style="margin-bottom: 4rem;">
                <span>充值地址</span>
                <div class="item_full">
                    <span>sdasdasdasdasdasd</span>
                    <img src="@/assets/my/copy.svg" alt="copy">
                </div>
            </div>
            <div class="info_item">
                <span>订单号</span>
                <div class="item_full">
                    <span>sdasdasdasdasdasd</span>
                    <img src="@/assets/my/copy.svg" alt="copy">
                </div>
            </div>
        </div>


    </div>
</template>

<script setup>
import Top from '@/components/Top.vue';
</script>

<style lang="less" scoped>
.page-info {
    padding-top: 16rem;

    .top_box {
        padding: 10rem 0;
        border-bottom: 1px solid #e5e5e5;
        font-size: 4rem;
        color: #999;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;

        .num {
            font-size: 12rem;
            font-weight: bold;
            color: #2A18B8;
            margin-bottom: 2rem;
        }
    }

    .info_box {
        padding: 4rem;

        .info_item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-wrap: wrap;
            min-height: 12rem;
            color: #777;

            .item_full {
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: space-between;
                color: #000;
                font-weight: bold;

                img {
                    width: 4rem;
                    height: 4rem;
                }
            }
        }
    }
}
</style>