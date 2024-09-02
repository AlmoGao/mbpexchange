<!-- 银行卡 -->
<template>
    <div class="page page-bank">
        <Top :title="'银行卡'" />

        <!-- 列表 -->
        <div class="list_box" v-if="step == 1">
            <div class="list">
                <div class="item" v-for="(item, i) in bank" :key="i">
                    <div class="title">{{ item.code }}-{{ item.ifsc }}</div>
                    <div class="info">{{ item.card }}</div>
                </div>
            </div>
            <div class="a_btn submit" @click="step = 2">添加</div>
        </div>

        <template v-if="step == 2">
            <div class="box">
                <div class="subtitle">姓名</div>
                <div class="item">
                    <input v-model="form.real_name" type="text" class="ipt" placeholder="姓名">
                </div>
                <div class="subtitle">银行编码</div>
                <div class="item">
                    <input v-model="form.code" type="text" class="ipt" placeholder="银行编码">
                </div>
                <div class="subtitle">银行卡号</div>
                <div class="item">
                    <input v-model="form.card" type="text" class="ipt" placeholder="银行卡号">
                </div>
                <div class="subtitle">IFSC</div>
                <div class="item">
                    <input v-model="form.ifsc" type="text" class="ipt" placeholder="IFSC">
                </div>
            </div>

            <div class="a_btn submit" :class="{ 'loading': loading }" @click="submit">提交</div>
        </template>
    </div>
</template>

<script setup>
import Top from '@/components/Top.vue';
import http from "@/api"
import { ref, computed } from "vue"
import store from "@/store"
import { showToast } from "vant"
import router from "@/router"

const step = ref(1)
const bank = computed(() => store.state.userInfo?.bank || [])

const form = ref({
    real_name: '',
    card: '',
    ifsc: '',
    code: ''
})
const loading = ref(false)
const submit = () => {
    if (loading.value) return
    if (!form.value.real_name || !form.value.card || !form.value.ifsc || !form.value.code) return
    loading.value = true
    http.bindbank(form.value).then(res => {
        if (res.code == 1) {
            showToast('操作成功')
            store.dispatch("updateUser");
            step.value = 1
            form.value = {
                real_name: '',
                card: '',
                ifsc: '',
                code: ''
            }
        }
    }).finally(() => {
        loading.value = false
    })
}
</script>

<style lang="less" scoped>
.page-bank {
    padding: 18rem 4rem 4rem 4rem;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .list_box {
        flex: 1;
        display: flex;
        flex-direction: column;

        .list {
            flex: 1;
            overflow-y: auto;
            margin-bottom: 2rem;

            .item {
                padding: 4rem;
                margin-bottom: 4rem;
                background-color: #232323;
                border-radius: 4rem;

                .title {
                    line-height: 10rem;
                    font-size: 4.2rem;
                    color: #eee;
                    border-bottom: 1px solid #333;
                }

                .info {
                    padding: 4rem 0 2rem 0;
                }
            }
        }

        .submit {
            height: 12rem;
            margin-top: 10rem;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }

    .box {
        .subtitle {
            color: #eee;
            font-size: 4rem;
            margin-bottom: 2rem
        }

        .item {
            height: 12rem;
            margin-bottom: 4rem;
            background-color: #191919;
            padding: 0 4rem;

            .ipt {
                width: 100%;
                height: 100%;
                font-size: 4rem;
            }
        }
    }

    .submit {
        height: 12rem;
        margin-top: 10rem;
        display: flex;
        align-items: center;
        justify-content: center;
    }
}
</style>