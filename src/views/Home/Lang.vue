<!-- 切换语言 -->
<template>
    <div class="page-lang">
        <Top :title="_t('lang')" />
        <div class="list">
            <div @click="onConfirm(item)" class="item" v-for="(item, i) in columns" :key="i">
                <span>{{ item.text }}</span>
                <van-icon v-if="locale == item.value" class="icon" name="checked" />
            </div>
        </div>
    </div>
</template>

<script setup>
import Top from '@/components/Top.vue';
import { _changeLang, _getLocal } from "@/lang/index";
import { ref, computed } from "vue";
import { _t } from "@/lang/index";


const locale = computed(() => _getLocal())
const columns = ref([
    { text: "中文简体", value: "zh-cn" },
    { text: "English", value: "en" },
    { text: "हिंदी", value: "hi-Deva" },
]);

const onConfirm = item => {
    _changeLang(item.value)
}
</script>

<style lang="less" scoped>
.page-lang {
    padding-top: 20rem;

    .list {
        .item {
            font-size: 4.2rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 4rem;

            .icon {
                color: #568EF6;
            }
        }
    }
}
</style>