<!-- 团队 -->
<template>
    <div class="page page-team">
        <div class="top">
            <span>我的团队</span>
            <img class="bg" src="@/assets/home/invitebg.png" alt="img">
        </div>

        <div class="content">

            <!-- 时间 -->
            <div class="box time-box" @click="show = true">
                <span>{{ form.start ? parseTime(form.start, '{y}-{m}-{d}') : '开始时间' }}</span>
                <span>-</span>
                <span>{{ form.end ? parseTime(form.end, '{y}-{m}-{d}') : '结束时间' }}</span>
            </div>

            <!-- 统计 -->
            <div class="box top-box">
                <div class="top-item">
                    <div>团队人数</div>
                    <div class="num">{{ teamInfo.tema_count || 0 }}</div>
                </div>
                <div class="top-item">
                    <div>有效用户</div>
                    <div class="num">{{ teamInfo.valid_user || 0 }}</div>
                </div>
                <div class="top-item">
                    <div>总充值</div>
                    <div class="num">{{ teamInfo.totalrecharge || 0 }}</div>
                </div>
                <div class="top-item">
                    <div>今日人数</div>
                    <div class="num">{{ teamInfo.today_tema_count || 0 }}</div>
                </div>
                <div class="top-item">
                    <div>今日有效</div>
                    <div class="num">{{ teamInfo.today_valid_user || 0 }}</div>
                </div>
                <div class="top-item">
                    <div>总提现</div>
                    <div class="num">{{ teamInfo.totalwithdraw || 0 }}</div>
                </div>
            </div>

            <!-- tabs -->
            <div class="tabs">
                <div class="tab shadow">
                    <div class="left">
                        <div>邀请码</div>
                        <div class="val">{{ teamInfo.invite_code || '--' }}</div>
                    </div>
                    <van-icon style="font-size: 5rem" name="description" />
                </div>
                <div class="tab shadow" @click="copyLink">
                    <div class="left">
                        <div>邀请链接</div>
                        <div class="val">{{ teamInfo.invite_url || '--' }}</div>
                    </div>
                    <van-icon style="font-size: 5rem" name="description" />
                </div>
            </div>
            <div class="box link" @click="copyLink">复制邀请链接</div>


            <van-tabs animated v-model:active="active">
                <van-tab title="全部">
                    <TeamTable />
                </van-tab>
                <van-tab title="Level1">
                    <TeamTable />
                </van-tab>
                <van-tab title="Level2">
                    <TeamTable />
                </van-tab>
                <van-tab title="Level3">
                    <TeamTable />
                </van-tab>
            </van-tabs>
        </div>

        <!-- 日期选择 -->
        <Calendar :min-date="new Date(2024, 6, 1)" :max-date="new Date()" v-model:show="show" type="range"
            @confirm="onConfirm" />
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import TeamTable from "./TeamTable.vue"
import store from "@/store"
import { Calendar, showToast } from "vant"
import { parseTime, copyText } from "@/tools/utils"
import http from "@/api"

const userInfo = computed(() => store.state.userInfo || {})
const active = ref(0)

const copyLink = () => {
    if (teamInfo.value.invite_url) {
        copyText(teamInfo.value.invite_url)
        showToast('已复制')
    }
}

const form = ref({
    start: '',
    end: ''
})
const show = ref(false)
const onConfirm = values => {
    console.error(values)
    form.value.start = values[0]
    form.value.end = values[1]
    show.value = false

    // parseTime(form.end, '{y}-{m}-{d}')
    getTeam(parseTime(form.value.start, '{y}-{m}-{d}'), parseTime(form.value.end, '{y}-{m}-{d}'))
}

const teamInfo = ref({})
const getTeam = (start, end) => {
    http.team({
        start_time: start || '',
        end_time: end || '',
        level: 'all'
    }).then(res => {
        teamInfo.value = res || {}
    })
}
getTeam()
</script>

<style lang="less" scoped>
.page-team {
    background: linear-gradient(180deg, #0099FF 0%, #010318 32.9%, #0B0B0B 45.68%);
    height: 100%;
    padding: 0 0 16rem 0;

    .top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-left: 4rem;
        font-size: 5rem;

        .bg {
            height: 30rem;
        }
    }

    .content {
        padding: 2rem 4rem;
    }

    .box {
        background: linear-gradient(90deg, #239aff, #2effb4);
        border-radius: 4rem;
    }

    .time-box {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 4rem;
        font-weight: bold;
        color: #eee;
        padding: 4rem;
        margin-bottom: 6rem;
    }

    .top-box {
        display: flex;
        align-items: stretch;
        justify-content: space-between;
        flex-wrap: wrap;
        padding: 4rem 0 2rem 0;

        .top-item {
            width: 33%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            color: #000;
            margin-bottom: 2rem;

            .num {
                font-size: 4rem;
                font-weight: bold;
                color: #fff;
                margin-top: 1rem;
            }
        }
    }

    .tabs {
        display: flex;
        align-items: stretch;
        justify-content: space-between;
        margin: 4rem 0;

        .tab {
            width: 49%;
            padding: 3rem;
            border-radius: 4rem;
            display: flex;
            align-items: center;

            .left {
                flex: 1;
                word-break: break-all;
                margin-right: 1rem;

                .val {
                    color: #fff;
                    margin-top: 1rem;
                }
            }
        }
    }

    .link {
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        height: 8rem;
        margin-bottom: 6rem;
    }
}
</style>