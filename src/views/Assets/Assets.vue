<!-- 资产 -->
<template>
    <div class="page page-assets">
        <img class="icon" src="@/assets/assets/icon.png" alt="img">

        <!-- top -->
        <div class="top">
            <div class="avatar">
                <img :src="userInfo.avatar" alt="avatar">
            </div>
            <div class="content">
                <div class="top_item">
                    <div class="name">{{ userInfo.username }}</div>
                    <!-- <div class="num">VIP0</div> -->
                </div>
                <div class="top_item">
                    <div>UID:{{ userInfo.id }}</div>
                    <div class="num">Level {{ userInfo.level }}</div>
                </div>
            </div>
        </div>

        <!-- tabs -->
        <div class="tabs">
            <div class="tab">总资产 {{ userInfo.money }}</div>
            <!-- <div class="tab">总提现 0.00</div> -->
        </div>

        <!-- btns -->
        <div class="btns">
            <div class="btn a_btn" @click="jump('recharge')">充值</div>
            <div class="btn c_btn" @click="jump('withdraw')">提现</div>
            <div class="btn c_btn" @click="jump('aList')">记录</div>
        </div>

        <!-- 统计 -->
        <div class="box">
            <div class="title">总收入</div>
            <div class="title_val">{{ userInfo.total_income || '0' }}</div>

            <div class="box_tabs">
                <div class="box_tab">
                    <div class="box_title">昨日收入</div>
                    <div class="num">{{ userInfo.yesterday_income || '0' }}</div>
                </div>
                <div class="box_tab">
                    <div class="box_title">今日收入</div>
                    <div class="num">{{ userInfo.today_income || '0' }}</div>
                </div>
                <div class="box_tab">
                    <div class="box_title">工资收入</div>
                    <div class="num">{{ userInfo.salary || '0' }}</div>
                </div>
            </div>
            <div class="box_tabs">
                <div class="box_tab">
                    <div class="box_title">当前利润率</div>
                    <div class="num">0</div>
                </div>
                <div class="box_tab">
                    <div class="box_title">下级利润率</div>
                    <div class="num">0</div>
                </div>
                <div class="box_tab">
                    <div class="box_title">升级有效邀请</div>
                    <div class="num">0/3</div>
                </div>
            </div>
        </div>

        <!-- 快捷项 -->
        <div class="navs">
            <div class="nav" @click="jump('aList')">
                <img class="nav_icon" src="@/assets/assets/t1.png" alt="img">
                <span>账变记录</span>
            </div>
            <!-- <div class="nav">
                <img class="nav_icon" src="@/assets/assets/t2.png" alt="img">
                <span>账变记录</span>
            </div> -->
            <div class="nav" @click="jump('bank')">
                <img class="nav_icon" src="@/assets/assets/t3.png" alt="img">
                <span>银行卡</span>
            </div>
            <div class="nav" @click="jump('address')">
                <img class="nav_icon" src="@/assets/assets/t4.png" alt="img">
                <span>USDT 地址</span>
            </div>
            <div class="nav" @click="jump('safe')">
                <img class="nav_icon" src="@/assets/assets/t5.png" alt="img">
                <span>修改密码</span>
            </div>
            <div class="nav">
                <img class="nav_icon" src="@/assets/assets/t6.png" alt="img">
                <span>App 下载</span>
            </div>

            <div class="d_btn login_out" @click="logout">退出</div>
        </div>

    </div>
</template>

<script setup>
import router from '@/router';
import store from "@/store"
import { computed } from "vue"
import http from "@/api"

const userInfo = computed(() => store.state.userInfo || {})

const jump = name => {
    router.push({
        name
    })
}

const logout = () => {
    http.logout()
    setTimeout(() => {
        router.push({
            name: 'login'
        })
    }, 500)
}
</script>

<style lang="less" scoped>
.page-assets {
    padding: 4rem 4rem 16rem 4rem;
    height: 100%;
    overflow-y: auto;
    background-image: url('@/assets/assets/bg.png');
    background-repeat: no-repeat;
    background-size: 100% auto;

    .icon {
        width: 52rem;
        height: 36rem;
        position: absolute;
        top: 4rem;
        right: 0;
    }

    .top {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        padding-top: 3rem;

        .avatar {
            width: 15rem;
            height: 15rem;
            border-radius: 50%;
            border: 2px solid #eee;
            margin-right: 2rem;
            overflow: hidden;

            img {
                width: 100%;
                height: 100%;
            }
        }

        .content {
            flex: 1;

            .top_item {
                display: flex;
                align-items: center;
                justify-content: flex-start;
                line-height: 6rem;

                .name {
                    color: #EEE;
                    font-size: 4rem;
                }

                .num {
                    margin-left: 2rem;
                    color: #edb748;
                }
            }
        }
    }

    .tabs {
        padding: 4rem 0;

        .tab {
            color: #eee;
            font-size: 5rem;
            line-height: 10rem;
            font-weight: bold;
        }
    }

    .btns {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .btn {
            width: 31%;
            height: 12rem;
            border-radius: 2rem !important;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 4rem;
        }
    }

    .box {
        position: relative;
        margin-top: 6rem;
        padding: 4rem;
        border-radius: 4rem;
        font-weight: bold;
        background: linear-gradient(178deg, #d8fef2 .06%, #bde7ff 52.58%, #49c4ff 126.09%);

        .title {
            color: #333;
            font-size: 3.6rem;
        }

        .title_val {
            font-size: 6rem;
            color: #000;
            margin: 2rem 0 4rem 0;
        }

        .box_tabs {
            display: flex;
            align-items: stretch;

            .box_tab {
                flex: 1;
                border-top: 1px solid #f0f0f0;
                padding: 4rem 0;
                font-size: 4rem;

                .num {
                    color: #000;
                    margin-top: 2rem;
                }
            }
        }
    }

    .navs {
        margin: 6rem 0;

        .nav {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            color: #eee;
            font-size: 4rem;
            height: 12rem;

            .nav_icon {
                width: 6rem;
                height: 6rem;
                margin-right: 2rem;
            }
        }
    }

    .login_out {
        height: 12rem;
        border-radius: 2rem !important;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid #eee;
        width: 60vw;
        margin: 10rem auto 10rem auto;
    }
}
</style>