<!-- 提现记录 -->
<template>
    <div class="page-rc_list">
        <Top :title="'提现记录'" />

        <van-tabs v-model:active="activeTab" animated>
            <van-tab title="全部" name="all">
            </van-tab>
            <van-tab title="审核" name="0">
            </van-tab>
            <van-tab title="成功" name="1">
            </van-tab>
            <van-tab title="失败" name="2">
            </van-tab>
        </van-tabs>

        <div class="list" v-for="(item, i) in showList" :key="i">
            <div class="item" @click="jump">
                <!-- <div class="top">
                    <img class="icon" v-if="item.image" :src="item.image" alt="img">
                    <div class="info"></div>
                    <van-icon name="arrow" />
                </div> -->
                <div class="item_box">
                    <span>金额</span>
                    <span class="num">{{ item.amount || '--' }}</span>
                </div>
                <div class="item_box">
                    <span>状态</span>
                    <span class="status">{{ statusMap[item.status] || '--' }}</span>
                </div>
                <div class="item_box">
                    <span>时间</span>
                    <span>{{ parseTime(item.createtime) }}</span>
                </div>
            </div>
        </div>
        <van-empty v-if="!showList.length" />
    </div>
</template>

<script setup>
import Top from '@/components/Top.vue';
import { ref, computed } from "vue"
import router from '@/router';
import http from "@/api"
import { parseTime } from "@/tools/utils"

const activeTab = ref('all')
const statusMap = ref({
    0: '待审核',
    1: '成功',
    2: '失败'
})

const jump = item => {
    router.push({
        name: 'info'
    })
}

const list = ref([])
const showList = computed(() => {
    if (activeTab.value == 'all') return list.value
    return list.value.filter(item => item.status == activeTab.value) || []
})
const getList = () => {
    http.withdrawalList({ status: 'all' }).then(res => {
        list.value = res || []
    })
}
getList()
</script>

<style lang="less" scoped>
.page-rc_list {
    padding-top: 16rem;

    .list {
        padding: 4rem;

        .item {
            border-top: 1px solid #e5e5e5;
            padding: 4rem 0;

            &:last-child {
                border-bottom: 1px solid #e5e5e5;
            }

            .top {
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-bottom: 4rem;

                .icon {
                    width: 6rem;
                    height: 6rem;
                    margin-right: 4rem;
                }

                .info {
                    flex: 1;
                    font-size: 4.2rem;
                }
            }

            .item_box {
                display: flex;
                align-items: center;
                justify-content: space-between;
                height: 8rem;

                .num {
                    color: #d50f3a;
                    font-weight: 600;
                    font-size: 4rem;
                }

                .status {
                    font-size: 4rem;
                }
            }
        }
    }
}
</style>