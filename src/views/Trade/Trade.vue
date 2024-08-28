<!-- 交易 -->
<template>
    <div class="page-trade">

        <div class="top">
            <van-icon style="transform: rotate(90deg);" name="down" @click="router.back()" class="back" />
            <div class="name">{{ _t('t28') }}</div>
        </div>

        <!-- 选择 -->
        <div class="list_box">
            <img class="menu" @click="showLeft = true" src="@/assets/trade/menu.svg" alt="img">
            <div class="info">{{ currGood.name || '--' }}</div>
            <img class="icon" src="@/assets/trade/guize.svg" alt="img">
        </div>

        <!-- 下注 -->
        <div class="bets">
            <div class="left">
                <div class="num" :class="currGood.percent > 0 ? 'up' : 'down'">{{ currGood.price ?
                    _trans(currGood.price) : '--' }}</div>
                <div class="percent" :class="currGood.percent > 0 ? 'up' : 'down'">{{ currGood.percent ?
                    currGood.percent + '%' : '--' }}</div>
            </div>
            <div class="right">
                <div class="item">
                    <div class="name">{{ _t('t29') }}</div>
                    <div class="val">{{ currGood.high_price ?
                        _trans(currGood.high_price) : '--' }}</div>
                </div>
                <div class="item">
                    <div class="name">{{ _t('t30') }}</div>
                    <div class="val">{{ currGood.low_price ?
                        _trans(currGood.low_price) : '--' }}</div>
                </div>
                <div class="item">
                    <div class="name">{{ _t('t31') }}</div>
                    <div class="val">{{ currGood.volume || '--' }}</div>
                </div>
            </div>
            <div class="bottom fixd_div">
                <div class="bottom_btn" @click="openOrder(0)">{{ _t('t32') }}</div>
                <div class="bottom_btn" @click="openOrder(1)" style="background-color: #DF153D;">{{ _t('t33') }}</div>
            </div>
        </div>

        <!-- k线 -->
        <div class="klines">
            <div class="tabs">
                <div @click="changeType(key)" :class="{ 'active_tab': key == activeType }" class="tab"
                    v-for="(val, key) in klineType" :key="key">{{ val }}</div>
            </div>
            <div class="charts">
                <Kline ref="klRef" />
            </div>
        </div>

        <!-- 委托 -->
        <div class="orders" id="history">
            <div class="tabs">
                <div class="tab" @click="activeTab = 1" :class="{ 'active_tab': activeTab == 1 }">{{ _t('t34') }}</div>
                <div class="tab" @click="activeTab = 2" :class="{ 'active_tab': activeTab == 2 }">{{ _t('t35') }}</div>
                <div style="flex: 1;"></div>
                <van-icon @click="getOrders" name="replay" />
            </div>

            <div class="list">
                <div class="item" v-for="(item, i) in showOrders" :key=i>
                    <div class="item_box">
                        <span></span>
                        <span class="num">{{ item.product_name || '--' }}</span>
                    </div>
                    <div class="item_box">
                        <span>{{ _t('t36') }}</span>
                        <span class="num">{{ item.buy_price || '--' }}</span>
                    </div>
                    <div class="item_box">
                        <span>{{ _t('t37') }}</span>
                        <span class="num" :class="item.direction == '0' ? 'up' : 'down'">{{ item.direction == '0' ?
                            _t('t38')
                            : _t('t39') }}</span>
                    </div>
                    <div class="item_box">
                        <span>{{ _t('t40') }}</span>
                        <span class="num">{{ item.duration }}s</span>
                    </div>
                    <div class="item_box">
                        <span>{{ _t('t41') }}</span>
                        <span>{{ parseTime(item.createtime) }}</span>
                    </div>
                    <template v-if="item.status == 1">
                        <div class="item_box">
                            <span>{{ _t('t42') }}</span>
                            <span class="num">{{ item.sell_price || '--' }}</span>
                        </div>
                        <div class="item_box">
                            <span>{{ _t('t43') }}</span>
                            <span>{{ parseTime(item.selltime) }}</span>
                        </div>
                        <div class="item_box">
                            <span>{{ _t('t44') }}</span>
                            <span class="num" :class="Number(item.pl_amount) > 0 ? 'up' : 'down'">{{
                                Number(item.pl_amount) > 0 ? '+' :
                                    '' }}{{ item.pl_amount ||
                                    '--' }}</span>
                        </div>
                    </template>
                </div>
                <van-empty v-if="!showOrders.length" />
            </div>
        </div>


        <!-- 左侧列表 -->
        <van-popup round v-model:show="showLeft" position="left">
            <div style="height: 100vh;width:80rem">
                <Markets :page="'trade'" />
            </div>
        </van-popup>

        <!-- 下单弹窗 -->
        <van-popup round closeable v-model:show="showOrder" position="bottom">
            <div class="order-dialog">
                <div class="header">
                    <div class="name">{{ currGood.name }}</div>
                    <div class="status up-bg" v-if="direction == 0">{{ _t('t38') }}</div>
                    <div class="status down-bg" v-if="direction == 1">{{ _t('t39') }}</div>
                </div>

                <div class="form">
                    <div class="subtitle">{{ _t('t45') }}</div>
                    <div class="fasters">
                        <div class="faster" v-for="(val, key) in productTimes" :key="key" @click="activeFaster = key"
                            :class="{ 'active_faster': activeFaster == key }">
                            <div>{{ key }}s</div><br />
                            <div>{{ val }}%</div>
                        </div>
                    </div>
                    <div class="subtitle">{{ _t('t46') }}</div>
                    <div class="item">
                        <input type="number" v-model="amount" class="ipt" placeholder="">
                    </div>
                    <div class="fasters">

                        <div class="faster" @click="amount = 50" :class="{ 'active_faster': amount == 50 }">50</div>
                        <div class="faster" @click="amount = 100" :class="{ 'active_faster': amount == 100 }">100</div>
                        <div class="faster" @click="amount = 500" :class="{ 'active_faster': amount == 500 }">500</div>
                        <div class="faster" @click="amount = 1000" :class="{ 'active_faster': amount == 1000 }">1000
                        </div>
                        <div class="faster" @click="amount = 2000" :class="{ 'active_faster': amount == 2000 }">2000
                        </div>
                        <div class="faster" @click="amount = 10000" :class="{ 'active_faster': amount == 10000 }">10000
                        </div>
                        <div class="faster" @click="amount = 20000" :class="{ 'active_faster': amount == 20000 }">20000
                        </div>
                        <div class="faster" @click="amount = 50000" :class="{ 'active_faster': amount == 50000 }">50000
                        </div>
                    </div>
                    <div class="tip">{{ _t('t47') }}：{{ userInfo.money || '--' }} {{ currency }}</div>
                    <van-button class="btn" type="primary" size="large" @click="submitOrder">{{ _t('t48')
                        }}</van-button>
                </div>
            </div>
        </van-popup>
    </div>
</template>

<script setup>
import Markets from "../Markets/Markets.vue";
import { showLoadingToast, closeToast, showToast } from 'vant';
import { ref, computed, onBeforeUnmount } from "vue"
import store from "@/store"
import router from "@/router"
import http from "@/api"
import Kline from "@/components/Kline.vue"
import { parseTime } from "@/tools/utils"
import { useRoute } from "vue-router"
import { _trans } from "@/tools/utils"
import { _t } from "@/lang/index";

const route = useRoute()

const productTimes = computed(() => store.state.config.product_time || {})
const currency = computed(() => store.state.config.currency || 'USDT')
const goods = computed(() => store.state.goods || [])
const userInfo = computed(() => store.state.userInfo || {})
const currGood = computed(() => store.state.currGood || {})
if (!currGood.value.id) {
    store.commit('setCurrGood', goods.value[0] || {})
}

const activeTab = ref(route.query.activeTab || 1)
if (activeTab.value == 2) {
    setTimeout(() => {
        document.getElementById('history').scrollIntoView({ behavior: 'smooth' });
    }, 300)
}
const showLeft = ref(false)
const showOrder = ref(false)

// k线
const activeType = ref(1)
const klineType = ref({
    1: '1m',
    2: '5m',
    3: '15m',
    4: '30m',
    5: '1h',
    6: '2h',
    7: '4h',
    8: '1d',
    9: '1w',
})
const klRef = ref()
const changeType = key => {
    if (key) {
        activeType.value = key
        showLoadingToast({
            message: '',
            forbidClick: true,
        });
    }

    http.kline({
        code: currGood.value.code,
        kline_type: activeType.value,
        query_kline_num: 200,
        kline_timestamp_end: 0
    }).then(res => {
        if (res.data && res.data.kline_list) {
            if (res.data.kline_list.length) {
                const last = res.data.kline_list[res.data.kline_list.length - 1]
                last.price = last.close_price

                last.yprice = last.open_price
                if (last.yprice && last.price) {
                    last.percent = ((last.price - last.yprice) * 100 / last.yprice).toFixed(2)
                }
                store.commit('setCurrGood', {
                    ...currGood.value,
                    ...last,
                })
            }
            klRef.value._init(res.data.kline_list)
        }
    }).finally(() => {
        closeToast()
    })
}
changeType(1)

const interval = setInterval(() => {
    changeType()
}, 10000)
onBeforeUnmount(() => {
    interval && clearInterval(interval)
})

// 下单
const direction = ref(0)
const openOrder = key => {
    amount.value = ''
    direction.value = key
    showOrder.value = true
}
const activeFaster = ref(30)
const amount = ref('')
const submitOrder = () => {
    if (!amount.value || amount.value <= 0) return showToast(_t('t49'))
    if (!currGood.value.price) return showToast(_t('t50'))
    const params = {
        id: currGood.value.id,
        price: Number(currGood.value.price),
        amount: amount.value,
        duration: activeFaster.value,
        direction: direction.value, // 0-涨 1-跌
    }
    showLoadingToast({
        message: '',
        forbidClick: true,
    });
    http.buy(params).then(res => {
        if (res.code == 1) {
            showToast(_t('t51'))
            amount.value = ''
            direction.value = 60
            showOrder.value = false

            store.dispatch('updateUser')
            getOrders()
        }
    }).finally(() => {
        closeToast()
    })
}


// 订单列表
const orders = ref([])
const showOrders = computed(() => {
    if (activeTab.value == 1) {
        return orders.value.filter(item => item.status == '0') || []
    }
    return orders.value || []
})
const getOrders = () => {
    showLoadingToast({
        message: '',
        forbidClick: true,
    });
    http.orderList({ status: 'all' }).then(res => {
        orders.value = res || []
    }).finally(() => {
        closeToast()
    })
}
getOrders()
</script>

<style lang="less" scoped>
.page-trade {
    padding-bottom: 35rem;

    .top {
        height: 14rem;
        display: flex;
        padding: 0 4rem;
        align-items: center;
        justify-content: flex-start;
        border-bottom: 1px solid #e5e5e5;

        .back {
            font-size: 5rem;
            margin-right: 4rem;
        }

        .name {
            color: #4936df;
            line-height: 14rem;
            position: relative;
            font-size: 4rem;


            &::after {
                content: '';
                width: 6rem;
                height: 0.5rem;
                border-radius: 0.5rem;
                background-color: #4936df;
                position: absolute;
                bottom: 0;
                left: 50%;
                transform: translateX(-50%);
            }
        }
    }

    .list_box {
        padding: 8rem 4rem;
        display: flex;
        align-items: center;

        .menu {
            width: 4.5rem;
            height: 4.5rem;
            margin-right: 4rem;
        }

        .info {
            flex: 1;
            font-size: 5rem;
            font-weight: bold;
        }

        .icon {
            width: 6rem;
            height: 6rem;
            margin-left: 4rem;
        }
    }

    .bets {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 4rem;

        .left {
            .num {
                color: #666;
                font-size: 8rem;
                line-height: 10rem;
                font-weight: bold;
            }

            .percent {
                font-weight: bold;
                color: #666;
                font-size: 3.2rem;
            }
        }

        .right {
            line-height: 6rem;

            .item {
                display: flex;
                align-items: center;

                .name {
                    color: #888;
                }

                .val {
                    text-align: right;
                    color: #000;
                    min-width: 10rem;
                    margin-left: 2rem;
                }
            }

        }

        .bottom {
            height: 30rem;
            width: 100%;
            background-color: #fff;
            bottom: 0;
            left: 0;
            position: fixed;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 4rem;

            .bottom_btn {
                width: 48%;
                height: 13.4rem;
                border-radius: 1rem;
                font-size: 4rem;
                display: flex;
                align-items: center;
                justify-content: center;
                color: #fff;
                background-color: #4936DF;
            }
        }
    }

    .klines {
        .tabs {
            padding: 4rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 1px solid #f5f5f5;

            .tab {}

            .active_tab {
                color: #4936DF;
                font-weight: bold;
            }
        }

        .charts {
            height: 80rem;
        }
    }

    .orders {
        border-top: 1rem solid #e5e5e5;

        .tabs {
            padding: 4rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 1px solid #e5e5e5;

            .tab {
                margin-right: 4rem;
            }

            .active_tab {
                color: #4936DF;
            }
        }

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
                        // color: #d50f3a;
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
}

.order-dialog {
    .header {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        padding: 4rem;
        border-bottom: 1px solid #e5e5e5;

        .name {
            color: #000;
            font-size: 4.6rem;
            font-weight: bold;
            margin-right: 4rem;
        }

        .status {
            padding: 2rem;
            border-radius: 1rem;
        }
    }

    .fasters {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        padding: 4rem 0 0 0;

        .faster {
            width: 24%;
            padding: 4rem 0;
            margin-bottom: 4rem;
            border-radius: 1rem;
            color: #000;
            background-color: #F1F1F1;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            font-size: 3.4rem;
            font-weight: 600;
        }

        .active_faster {
            background-color: #4936DF;
            color: #fff;
        }
    }
}
</style>