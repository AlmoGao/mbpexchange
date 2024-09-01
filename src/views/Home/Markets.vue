<!-- 市场 -->
<template>
    <div class="page page-markets">
        <div class="title">市场</div>

        <div class="content">
            <div class="item" v-for="i in 20" :key="i">
                <div class="icon"></div>
                <div class="left">
                    <div class="name">BTC</div>
                    <div>24Hamount 2342342</div>
                </div>
                <div class="amount up">$2342.23</div>
                <div class="percent up-bg">23%</div>
            </div>
        </div>
    </div>
</template>

<style lang="less" scoped>
.page-markets {
    padding-bottom: 16rem;
    display: flex;
    flex-direction: column;
    height: 100%;

    .title {
        height: 12rem;
        font-size: 4rem;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .content {
        flex: 1;
        overflow-y: auto;
        padding: 0 4rem;

        .item {
            padding: 4rem 2rem;
            border-radius: 4rem;
            background: linear-gradient(90deg, rgba(255, 122, 226, .2), rgba(8, 142, 255, .2));
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 3.4rem;
            margin-bottom: 4rem;

            .icon {
                width: 8rem;
                height: 8rem;
                border-radius: 50%;
                background-color: #000;
                margin-right: 2rem;
            }

            .left {
                flex: 1;

                .name {
                    font-size: 4rem;
                    font-weight: bold;
                    margin-bottom: 1rem;
                    color: #fff;
                }
            }

            .amount {
                font-size: 4rem;
                font-weight: bold;
                margin: 0 2rem;
            }

            .percent {
                padding: 2.5rem 5rem;
                border-radius: 2rem;
                font-weight: bold;
            }
        }
    }
}
</style>