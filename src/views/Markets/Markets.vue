<!-- 行情 -->
<template>
    <div class="page-markets">
        <!-- 搜索框 -->
        <div class="search-box">
            <van-icon name="search" />
            <input v-model="filterStr" class="ipt" :placeholder="_t('t106')" type="text">
        </div>

        <van-tabs shrink v-model:active="activeTab" v-if="props.page != 'trade'">
            <van-tab :title="_t('t107')"></van-tab>
        </van-tabs>

        <div class="list-box">
            <List :filterStr="filterStr" />
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue"
import List from "@/components/List.vue";
import { _t } from "@/lang/index";

const filterStr = ref('')
const props = defineProps({
    page: {
        type: String,
        default: ''
    }
})

const activeTab = ref(0)
</script>


<style lang="less" scoped>
.page-markets {
    padding-top: 6rem;
    padding-bottom: 16rem;

    .search-box {
        margin: 0 4rem 2rem 4rem;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 4rem;
        border-radius: 10rem;
        background-color: #f5f5f5;

        .ipt {
            height: 8rem;
            flex: 1;
            margin-left: 2rem;
        }
    }

    .list-box {
        padding: 4rem;
    }
}
</style>