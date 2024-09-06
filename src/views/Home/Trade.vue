<!-- 交易 -->
<template>
    <div class="page page-trade">
        <Top :title="currGood.name" />

        <!-- k线 -->
        <div class="klines">
            <div class="tabs">
                <div @click="changeType(val)" :class="{ 'active_tab': val == activeType }" class="tab"
                    v-for="(val, key) in klineType" :key="key">{{ val }}</div>
            </div>
            <div class="charts">
                <Kline ref="klRef" :activeType="activeType" />
            </div>
        </div>

        <!-- 表单 -->
        <div class="form_box">

            <div class="amount_box">
                <div class="left">
                    <div>余额</div>
                    <div>{{ userInfo.money }}</div>
                </div>
                <div class="right" v-if="!currGood.balance_ratio">
                    <van-icon name="arrow-down" @click="openMenu = !openMenu" />
                    <input v-model="amount" placeholder="金额" type="number" class="ipt">
                    <img src="@/assets/home/close.png" alt="x">
                </div>
                <div class="right" v-if="currGood.balance_ratio">
                    投注金额：{{ amount }}
                </div>

                <!-- 快捷 -->
                <div class="percents" v-show="openMenu">
                    <div class="percent a_btn" @click="put(1)">全部</div>
                    <div class="percent a_btn" @click="put(100)">1/100</div>
                    <div class="percent a_btn" @click="put(5)">1/5</div>
                    <div class="percent a_btn" @click="put(3)">1/3</div>
                    <div class="percent a_btn" @click="put(2)">1/2</div>
                </div>
            </div>

            <div class="tabs_box">
                <div class="tab_item" @click="faster = item.sec" :class="{ 'a_btn': faster == item.sec }"
                    v-for="(item, i) in fasters" :key="i">
                    <div>{{ item.sec }}</div>
                    <div>{{ item.per }}%</div>
                </div>
            </div>

            <div class="btns" :class="{ 'loading': loading }">
                <div class="btn a_btn" @click="buy(0)">买涨</div>
                <div class="btn b_btn" @click="buy(1)">买跌</div>
            </div>
        </div>

        <!-- 记录 -->
        <van-tabs animated v-model:active="active" @change="getList">
            <van-tab title="持仓">
                <div class="item" v-for="(item, i) in list" :key="i">
                    <div class="tr" style="margin-bottom: 2rem;">
                        <div class="time">{{ parseTime(item.createtime) }}</div>
                        <div></div>
                    </div>
                    <div class="tr">
                        <div class="t">方向</div>
                        <div class="v">{{ item.direction == 0 ? '买涨' : '买跌' }}</div>
                    </div>
                    <div class="tr">
                        <div class="t">金额</div>
                        <div class="v">{{ item.amount }}</div>
                    </div>
                    <div class="tr">
                        <div class="t">购买价格</div>
                        <div class="v">{{ item.buy_price }}</div>
                    </div>
                    <div class="tr">
                        <div class="t">时长</div>
                        <div class="v">{{ item.duration }}s</div>
                    </div>
                </div>
                <NoData v-if="!list.length" />
            </van-tab>
            <van-tab title="记录">
                <div class="item" v-for="(item, i) in list" :key="i">
                    <div class="tr" style="margin-bottom: 2rem;">
                        <div class="time">{{ parseTime(item.createtime) }}</div>
                        <div class="amount" :class="[Number(item.pl_amount) > 0 ? 'up' : 'down']">{{
                            Number(item.pl_amount) > 0 ? '+' + item.pl_amount : item.pl_amount }}</div>
                    </div>
                    <div class="tr">
                        <div class="t">方向</div>
                        <div class="v">{{ item.direction == 0 ? '买涨' : '买跌' }}</div>
                    </div>
                    <div class="tr">
                        <div class="t">金额</div>
                        <div class="v">{{ item.amount }}</div>
                    </div>
                    <div class="tr">
                        <div class="t">购买价格</div>
                        <div class="v">{{ item.buy_price }}</div>
                    </div>
                    <div class="tr">
                        <div class="t">时长</div>
                        <div class="v">{{ item.duration }}s</div>
                    </div>
                    <div class="tr">
                        <div class="t">出售价格</div>
                        <div class="v">{{ item.sell_price }}</div>
                    </div>
                    <div class="tr">
                        <div class="t">状态</div>
                        <div class="v">{{ item.status_text }}</div>
                    </div>
                </div>
                <NoData v-if="!list.length" />
            </van-tab>
        </van-tabs>
    </div>
</template>

<script setup>
import Top from '@/components/Top.vue';
import { ref, onMounted, computed } from "vue"
import Kline from "@/components/Kline.vue"
import store from "@/store"
import { showToast } from "vant"
import http from "@/api"
import NoData from '@/components/NoData.vue';
import { parseTime } from "@/tools/utils"

const currGood = computed(() => store.state.currGood || {})
const userInfo = computed(() => store.state.userInfo || {})
const openMenu = ref(false)

// 表单
const amount = ref('') // 下注金额
if (currGood.value.balance_ratio) {
    amount.value = Number(userInfo.value.money * currGood.value.balance_ratio / 100).toFixed(2)
}
const faster = ref(60)
const fasters = computed(() => {
    if (!store.state.config.contract_play) return []
    const arr = []
    for (let key in store.state.config.contract_play) {
        arr.push({
            sec: key,
            per: store.state.config.contract_play[key]
        })
    }
    return arr
})

const loading = ref(false)
const buy = (dir) => {
    if (loading.value) return
    if (!amount.value || amount.value <= 0) return
    if (Number(amount.value) > Number(userInfo.value.money)) return showToast('余额不足')
    if (!currGood.value.close) return showToast('获取价格中')
    const params = {
        product_id: currGood.value.id,
        buy_price: currGood.value.close,
        direction: dir,
        amount: amount.value,
        duration: faster.value
    }
    loading.value = true
    http.buy(params).then(async res => {
        if (res.code == 1) {
            showToast('购买成功')
            getList()
            await store.dispatch('updateUser')
            amount.value = amount.value = Number(userInfo.value.money * currGood.value.balance_ratio / 100).toFixed(2)
        }
    }).finally(() => {
        loading.value = false
    })
}
const put = num => {
    amount.value = Number(userInfo.value.money * 1 / num).toFixed(2)
    openMenu.value = false
}

// k线
const activeType = ref('5m')
const klineType = ref({
    1: '1m',
    2: '5m',
    3: '15m',
    4: '30m',
    7: '4h',
    8: '1d',
    9: '1w',
})
const klRef = ref()
const changeType = key => {
    activeType.value = key
    setTimeout(() => {
        klRef.value && klRef.value._init(key)
    }, 500)
}
onMounted(() => {
    changeType('5m')
})



// 记录
const active = ref(0)
const list = ref([])

const getList = () => {
    setTimeout(() => {
        list.value = []
        http.orderList({
            status: active.value // 0-持仓  1-平仓
        }).then(res => {
            list.value = res || []
        })
    }, 0)
}
getList()
</script>

<style lang="less" scoped>
.page-trade {
    height: 100%;
    padding: 16rem 0 10rem 0;
    overflow-y: auto;

    .klines {
        .tabs {
            padding: 4vw;
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 1px solid #f5f5f5;

            .tab {}

            .active_tab {
                color: #53d6f0;
                font-weight: bold;
            }
        }

        .charts {
            height: 80vw;
        }
    }

    .form_box {
        padding: 4rem;
    }

    .tabs_box {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .tab_item {
            width: 30%;
            height: 13rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            background-color: #F6F6F6;
            border-radius: 10rem;
            font-size: 4rem;
            font-weight: bold;
        }
    }

    .btns {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 6rem 0 0 0;

        .btn {
            width: 45%;
            height: 10rem;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #000 !important;
        }
    }

    .item {
        padding: 4rem;
        border-radius: 2rem;
        margin: 4rem 4rem 0 4rem;
        background-color: #303030;

        .tr {
            display: flex;
            align-items: center;
            justify-content: space-between;
            line-height: 5.4rem;

            .amount {
                font-size: 4rem;
                font-weight: bold;
            }

            .t {}

            .v {
                color: #eee;
            }
        }
    }

    .amount_box {
        background-color: #191919;
        border-radius: 1rem;
        padding: 2rem;
        display: flex;
        align-items: stretch;
        margin: 0 0 4rem 0;
        position: relative;

        .percents {
            position: absolute;
            width: 100%;
            top: 100%;
            left: 0;
            padding: 4rem;
            border-radius: 1rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            background-color: #303030;

            .percent {
                padding: 2rem 4rem;
            }
        }

        .left {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-width: 20rem;
            color: #eee;
        }

        .right {
            flex: 1;
            margin-left: 2rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            background-color: #303030;
            height: 12rem;
            padding: 0 4rem;
            border-radius: 1rem;

            .ipt {
                flex: 1;
                margin: 0 2rem;
                color: #eee;
                height: 100%;
            }
        }
    }
}
</style>