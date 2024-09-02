<!-- 修改登录密码 -->
<template>
    <div class="page page-pass">
        <Top :title="'登录密码'" />

        <div class="subtitle">账号</div>
        <div class="item" style="color: #eee;">
            {{ userInfo.username }}
        </div>
        <div class="subtitle">旧密码</div>
        <div class="item">
            <input v-model="form.oldpassword" placeholder="旧密码" type="password" class="ipt">
        </div>
        <div class="subtitle">新密码</div>
        <div class="item">
            <input v-model="form.newpassword" placeholder="新密码" type="password" class="ipt">
        </div>
        <div class="subtitle">确认密码</div>
        <div class="item">
            <input v-model="form.newpassword2" placeholder="确认密码" type="password" class="ipt">
        </div>

        <div class="a_btn submit" :class="{ 'loading': loading }" @click="changePass">确认修改</div>
    </div>
</template>

<script setup>
import Top from '@/components/Top.vue';
import http from "@/api"
import { ref, computed } from "vue"
import store from "@/store"
import { showToast } from "vant"
import router from "@/router"

const userInfo = computed(() => store.state.userInfo || {})

const form = ref({
    oldpassword: '',
    newpassword: '',
    newpassword2: ''
})
const loading = ref(false)
const changePass = () => {
    if (!form.value.oldpassword || !form.value.newpassword) return
    if (form.value.newpassword != form.value.newpassword2) return showToast('两次密码不一致')
    if (loading.value) return
    loading.value = true
    http.changepwd(form.value).then(res => {
        if (res.code == 1) {
            showToast('修改成功')
            setTimeout(() => {
                router.replace({
                    name: 'login'
                })
            }, 500)
        }
    }).finally(() => {
        loading.value = false
    })
}

</script>

<style lang="less" scoped>
.page-pass {
    padding: 20rem 4rem 4rem 4rem;

    .subtitle {
        font-size: 3.2rem;
        margin-bottom: 1rem;
    }

    .item {
        height: 10rem;
        border-bottom: 1px solid #666;
        margin-bottom: 4rem;
        line-height: 10rem;
        font-size: 4rem;

        .ipt {
            width: 100%;
            height: 100%;
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