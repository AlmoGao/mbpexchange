<!-- 面积图 -->
<template>
    <div style="width: 100%;height: 100%;" :id="'chart' + props.id"></div>
</template>

<script setup>
import { init, dispose } from "klinecharts";
import { ref, computed, onUnmounted, onMounted } from "vue";

const props = defineProps({
    up: {
        type: Boolean,
        default: false,
    },
    id: {
        type: [String, Number],
        default: ''
    },
    list: {
        type: Array,
        default: () => []
    }
})

const chart = ref();
onMounted(() => {
    chart.value = init("chart" + props.id);
    chart.value.setStyles({
        candle: {
            type: 'area', priceMark: { show: false }, tooltip: { showRule: 'none', showType: "standard", custom: [] }, area: {
                lineSize: 1,
                lineColor: props.up ? '#09ca70' : '#e72f2b',
                point: { show: false },
                backgroundColor: [{
                    offset: 0,
                    color: 'rgba(0,0,0,0.6)'
                }, {
                    offset: 0.1,
                    color: 'rgba(111,111,111,0.2)',
                }, {
                    offset: 1,
                    color: props.up ? '#09ca70' : '#e72f2b'
                }],
            },
        },
        grid: {
            show: false
        },

        xAxis: { show: false },
        yAxis: { show: false },
        separator: { show: false },
        crosshair: { show: false },
    });
    chart.value.setOffsetRightDistance(0)
    chart.value.applyNewData(props.list.map(item => {
        return {
            timestamp: item.id * 1000,
            open: item.open,
            close: item.close,
            high: item.high,
            low: item.low,
            volume: item.vol,
            turnover: item.count
        }
    }).reverse())
})
onUnmounted(() => {
    dispose("chart");
})
</script>