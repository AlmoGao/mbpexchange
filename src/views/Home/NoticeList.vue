<!-- 公告列表 -->
<template>
    <div class="page page-notice">
        <Top :title="'公告'" />

        <div class="notice" v-for="(item, i) in noticeList" :key="i" @click="goInfo(item)">
            <span>{{ item.title }}</span>
            <van-icon style="margin-left:10rem" name="arrow" />
        </div>
    </div>
</template>

<script setup>
import Top from '@/components/Top.vue';
import { ref, computed, onMounted } from "vue"
import store from "@/store"
import router from "@/router"

const noticeList = computed(() => store.state.config.news || []) // 公告


const goInfo = info => {
    localStorage.setItem('noticeInfo', JSON.stringify(info))
    router.push({
        name: 'noticeInfo'
    })
}
</script>

<style lang="less" scoped>
.page-notice {
    padding: 16rem 4rem 4rem 4rem;

    .notice {
        padding: 4rem;
        border-radius: 4rem;
        background-color: #232323;
        margin-bottom: 5rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        line-height: 6rem;
    }
}
</style>