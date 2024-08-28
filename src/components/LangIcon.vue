<template>
    <img :src="iconMap[locale]" alt="" @click="router.push({ name: 'lang' })">
</template>

<script setup>
import { _getLocal } from "@/lang/index";
import { ref, computed } from "vue";
import router from "@/router";

const locale = computed(() => _getLocal())
import cn from "@/assets/lang/cn.png"
import en from "@/assets/lang/en.png"
import hk from "@/assets/lang/hk.png"
import id from "@/assets/lang/id.png"
import jp from "@/assets/lang/jp.png"
import kr from "@/assets/lang/kr.png"
import ms from "@/assets/lang/ms.png"
import th from "@/assets/lang/th.png"
import vi from "@/assets/lang/vi.png"
import ru from "@/assets/lang/ru.svg"

const iconMap = ref({
    'zh-cn': cn,
    'zh-tw': hk,
    en,
    th,
    kr,
    jp,
    vi,
    id,
    ms,
    'ru-RU': ru
})
</script>