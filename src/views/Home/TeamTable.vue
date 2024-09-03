<template>
    <div class="team_table">
        <div class="tr" style="background-color: #232323;">
            <div class="td" style="flex:1.5">注册时间</div>
            <div class="td">用户名</div>
            <div class="td">充值金额</div>
            <div class="td">提现金额</div>
        </div>
        <div class="tr" v-for="(item, i) in level_list" :key="i">
            <div class="td" style="flex:1.5;font-size: 3rem">{{ parseTime(item.jointime) || '--' }}</div>
            <div class="td">{{ item.username || '--' }}</div>
            <div class="td">{{ item.totalrecharge || '--' }}</div>
            <div class="td">{{ item.totalwithdraw || '--' }}</div>
        </div>
    </div>
</template>

<script setup>
import { parseTime } from "@/tools/utils"
const props = defineProps({
    level_list: {
        type: Array,
        default: () => []
    }
})

</script>

<style lang="less" scoped>
.team_table {
    .tr {
        display: flex;
        align-items: stretch;
        background-color: #343445;

        .td {
            flex: 1;
            height: 12rem;
            padding: 0.5rem;
            display: flex;
            align-items: center;
            justify-content: center;
            word-break: break-all;
        }
    }
}
</style>