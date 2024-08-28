<!-- 邮箱认证 -->
<template>
    <div class="page-password_set">
        <Top :title="'邮箱认证'" />

        <div class="form">
            <div class="subtitle">邮箱</div>
            <div class="item">
                <input :type="'text'" :placeholder="_t('ipt')" class="ipt">
            </div>
            <div class="subtitle">验证码</div>
            <div class="item">
                <input :type="'text'" :placeholder="_t('ipt')" class="ipt">
                <div class="icon_right ipt_btn">发送</div>
            </div>

            <van-button class="btn" type="primary" size="large">确定</van-button>

        </div>
    </div>
</template>

<script setup>
import Top from '@/components/Top.vue';
import { ref } from "vue"
import { _t } from "@/lang/index";

const showPass1 = ref(false)
const showPass2 = ref(false)
const showPass3 = ref(false)

</script>

<style lang="less" scoped>
.page-password_set {
    padding-top: 20rem;
}
</style>