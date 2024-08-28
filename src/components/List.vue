<!-- 列表数据 -->
<template>
    <div class="data-list">
        <div class="tr">
            <div class="td td1">{{ _t("t123") }}</div>
            <div class="td td2">{{ _t("t124") }}</div>
            <div class="td td3">{{ _t("t125") }}</div>
        </div>
        <div class="tr" v-for="(item, i) in showList" :key="i" @click="clickItem(item)">
            <div class="td td1">
                <img class="icon" v-if="item.image" :src="item.image" alt="icon">
                <span class="name">{{ item.name }}</span>
            </div>
            <div class="td td2">{{ item.price ? _trans(item.price) : '--' }}</div>
            <div class="td td3">
                <div class="percent" :class="item.percent ? (item.percent > 0 ? 'up-bg' : 'down-bg') : ''">{{
                    item.percent || '--' }}%</div>
            </div>
        </div>
        <NoData v-show="!showList.length" />
    </div>
</template>

<script setup>
import { useRoute } from "vue-router"
import router from "@/router"
import store from "@/store"
import NoData from "./NoData.vue"
import { computed } from "vue"
import { _trans } from "@/tools/utils"
import { _t } from "@/lang/index";


const props = defineProps({
    filterStr: {
        type: String,
        default: ''
    },
    list: {
        type: Array,
        default: () => []
    }
})

const token = computed(() => store.state.token)
const route = useRoute()
const list = computed(() => props.list.length ? props.list : (store.state.goods || []))
const showList = computed(() => list.value.filter(item => item.code.includes(props.filterStr.toUpperCase())))

const clickItem = (item) => {
    if (!token.value) return router.push({ name: 'login' })
    store.commit('setCurrGood', item)
    if (route.name == 'trade') {
        location.reload()
    } else {
        router.push({
            name: 'trade'
        })
    }
}

</script>

<style lang="less" scoped>
.data-list {
    .tr {
        display: flex;
        align-items: center;
        padding: 3rem 0;

        .td {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .td1 {
            flex: 2;
            justify-content: flex-start;

            .icon {
                width: 6rem;
                margin-right: 3rem;
            }

            .name {
                font-size: 4rem;
            }


        }

        .td3 {
            justify-content: flex-end;

            .percent {
                padding: 1.8rem 2.8rem;
                border-radius: 0.5rem;
            }
        }
    }
}
</style>