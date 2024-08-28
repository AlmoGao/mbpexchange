<!-- 实名认证 -->
<template>
    <div class="page-auth1">
        <Top :title="_t('t61')" />


        <div class="tip">{{ _t('t62') }}</div>
        <div class="form">
            <div class="item">
                <div class="left_text">{{ _t('t63') }}：</div>
                <input v-model="form.name" :type="'text'" :placeholder="_t('ipt')" class="ipt">
            </div>
            <div class="subtitle"></div>
            <div class="item select_item" @click="typeDialog = true">
                <span class="select_val">{{ currName }}</span>
                <van-icon class="icon icon_right" name="arrow" />
            </div>
            <div class="subtitle"></div>
            <div class="item">
                <div class="left_text">{{ _t('t64') }}：</div>
                <input v-model="form.id_number" :type="'text'" :placeholder="_t('ipt')" class="ipt">
            </div>
            <div class="subtitle">{{ _t('t65') }}</div>
            <div class="item upload_box">
                <img class="icon" src="@/assets/common/upload.png" alt="img">
                <input @change="changeFile" class="upload_ipt" type="file" accept="images/*">
                <img style="position: absolute;width:100%;height:100%;background-color: #fff;top:0;left:0;z-index: 1;"
                    v-if="form.front_image" :src="form.front_image" alt="img">
            </div>
            <div class="subtitle">{{ _t('t66') }}</div>
            <div class="item upload_box">
                <img class="icon" src="@/assets/common/upload.png" alt="img">
                <input @change="changeFile2" class="upload_ipt" type="file" accept="images/*">
                <img style="position: absolute;width:100%;height:100%;background-color: #fff;top:0;left:0;z-index: 1;"
                    v-if="form.back_image" :src="form.back_image" alt="img">
            </div>

            <van-button :loading="loading" @click="submit" class="btn" type="primary" size="large">{{ _t('t56')
                }}</van-button>
        </div>


        <!-- 证件类型弹窗 -->
        <van-popup v-model:show="typeDialog" round position="bottom">
            <van-picker :columns="typeColumns" @cancel="typeDialog = false" @confirm="onConfirmType" />
        </van-popup>
    </div>
</template>

<script setup>
import Top from '@/components/Top.vue';
import { ref, computed } from "vue"
import http from "@/api"
import { showLoadingToast, closeToast, showToast } from "vant"
import router from "@/router"
import { _t } from "@/lang/index";


const typeDialog = ref(false)
const currName = computed(() => {
    const target = typeColumns.find(item => item.value == form.value.type)
    if (target) return target.text
    return '--'
})
const typeColumns = [
    { text: _t('t67'), value: '0' },
    { text: _t('t68'), value: '1' },
    { text: _t('t69'), value: '2' },
];
const onConfirmType = item => {
    form.value.type = item.selectedOptions[0].value
    typeDialog.value = false
}
const form = ref({
    name: '',
    type: '0',
    id_number: '',
    front_image: '',
    back_image: ''
})

const loading = ref(false)
const submit = () => {
    if (!form.value.name) return showToast(_t('t70'))
    if (!form.value.id_number) return showToast(_t('t71'))
    if (!form.value.front_image) return showToast(_t('t72'))
    if (!form.value.back_image) return showToast(_t('t73'))
    if (loading.value) return
    loading.value = true
    http.verif(form.value).then(res => {
        if (res.code == 1) {
            showToast(_t('t74'))
            setTimeout(() => {
                router.back()
            }, 1000)
        }
    }).finally(() => {
        setTimeout(() => {
            loading.value = false
        }, 1000)
    })
}


const changeFile = async e => {
    form.value.front_image = await upload(e.target.files[0])
}
const changeFile2 = async e => {
    form.value.back_image = await upload(e.target.files[0])
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
.page-auth1 {
    padding-top: 20rem;

    .tip {
        padding: 8rem 4rem;
        color: #d62548;
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
</style>