<template>
    <div class="team_table">
        <div class="tr" style="background-color: #232323;">
            <div class="td" style="flex:1.5">{{ _t('t36') }}</div>
            <div class="td">{{ _t('t37') }}</div>
            <div class="td">{{ _t('t38') }}</div>
            <div class="td">{{ _t('t39') }}</div>
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
import { _t } from "@/lang/index";
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