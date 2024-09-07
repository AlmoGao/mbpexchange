<!-- 公告详情 -->
<template>
    <div class="page page-notice">
        <Top :title="_t('t20')" />

        <div class="title">{{ info.title }}</div>

        <div class="content" v-html="info.content"></div>
    </div>
</template>

<script setup>
import Top from '@/components/Top.vue';
import { ref, computed, onMounted } from "vue"
import store from "@/store"
import { _t } from "@/lang/index";


const info = ref({})
try {
    info.value = JSON.parse(localStorage.getItem('noticeInfo') || '{}')
} catch { }
</script>

<style lang="less" scoped>
.page-notice {
    padding: 16rem 4rem 4rem 4rem;

    .title {
        color: #eee;
        font-size: 4rem;
        text-align: center;
        padding-bottom: 4rem;
        border-bottom: 1px solid #333;
    }

    .content {
        padding: 2rem 0;
    }

}
</style>