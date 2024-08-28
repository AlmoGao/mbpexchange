<!-- 充值 -->
<template>
    <div class="page-rechagre">
        <Top :title="_t('t76') + ' ' + (currChannel.name || '')" />

        <!-- 币种列表 -->
        <div v-if="step == 1">
            <div class="list_title">{{ _t('t127') }}</div>
            <div class="list_item" v-for="(item, i) in channel" :key="i" @click="selectChannel(item)">
                <img class="icon" v-if="item.logo_image" :src="item.logo_image" alt="img">
                <div class="info">{{ item.name }}</div>
                <van-icon name="arrow" />
            </div>
        </div>

        <!-- 充值详情 -->
        <div v-if="step == 2">
            <!-- <div class="top_box">
                <div class="qrcode"></div>
            </div> -->

            <div class="form">
                <!-- <div class="subtitle">充值地址</div>
                <div class="form_info">
                    <span>sdasdasasd</span>
                    <img src="@/assets/my/copy.svg" alt="copy">
                </div> -->
                <div class="subtitle">{{ _t('t128') }}</div>
                <div class="item">
                    <input v-model="form.amount" type="number" class="ipt" :placeholder="_t('ipt')">
                </div>
                <div class="subtitle">{{ _t('t129') }}</div>
                <div class="item upload_box">
                    <img class="icon" src="@/assets/common/upload.png" alt="img">
                    <input @change="changeFile" class="upload_ipt" type="file" accept="images/*">
                    <img style="position: absolute;width:100%;height:100%;background-color: #fff;top:0;left:0;z-index: 1;"
                        v-if="form.image" :src="form.image" alt="img">
                </div>

                <van-button :loading="loading" @click="submit" style="margin-bottom:10rem" class="btn" type="primary"
                    size="large">{{ _t('t130') }}</van-button>
            </div>
        </div>
    </div>
</template>

<script setup>
import Top from '@/components/Top.vue';
import { ref, computed } from "vue"
import store from "@/store"
import http from "@/api"
import { showLoadingToast, closeToast, showToast } from "vant"
import router from "@/router"
import { _t } from "@/lang/index";

const channel = computed(() => {
    return (store.state.config.channel || []).filter(item => item.status == 0)
})
const currChannel = ref({})
const selectChannel = item => {
    currChannel.value = item
    step.value = 2
}

const step = ref(1)

const form = ref({
    amount: '',
    image: ''
})

const loading = ref(false)
const submit = () => {
    if (!form.value.amount) return showToast(_t('t140'))
    if (!form.value.image) return showToast(_t('t141'))
    if (loading.value) return
    loading.value = true
    http.recharge(form.value).then(res => {
        if (res.code == 1) {
            showToast(_t('t142'))
            form.value = {
                amount: '',
                image: ''
            }
            setTimeout(() => {
                router.back()
            }, 1000)
        }
    }).finally(() => {
        loading.value = false
    })
}

const changeFile = async e => {
    form.value.image = await upload(e.target.files[0])
}

const upload = file => {
    showLoadingToast({
        message: '',
        forbidClick: true,
    });
    return new Promise(resolve => {
        http.upload({ file: file }).then(res => {
            resolve(res.fullurl)
        }).catch(() => {
            resolve('')
        }).finally(() => {
            closeToast()
        })
    })
}


</script>

<style lang="less" scoped>
.page-rechagre {
    padding-top: 16rem;

    .list_title {
        padding: 12rem 4rem 2rem 4rem;
        font-size: 4rem;
    }

    .list_item {
        height: 15rem;
        display: flex;
        align-items: center;
        padding: 0 4rem;

        .icon {
            width: 6rem;
            height: 6rem;
            margin-right: 4rem;
        }

        .info {
            flex: 1;
        }
    }

    .top_box {
        padding: 10rem 0;
        border-bottom: 1px solid #e5e5e5;
        display: flex;
        align-items: center;
        justify-content: center;

        .qrcode {
            width: 45rem;
            height: 45rem;
            border: 1px solid #4936DF;
        }
    }

    .form {
        .form_info {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            color: #000;
            font-weight: bold;

            img {
                width: 4rem;
                height: 4rem;
            }
        }

        .upload_box {
            height: 25rem;
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;

            .icon {
                width: 10rem;
                height: 10rem;
            }

            .upload_ipt {
                width: 100%;
                height: 100%;
                position: absolute;
                top: 0;
                left: 0;
                z-index: 999;
                opacity: 0;
            }
        }
    }
}
</style>