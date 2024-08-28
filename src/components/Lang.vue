<!-- 多语言 -->
<template>
  <div @click="showPicker=true">{{ _t("lang") }}<van-icon name="play" /></div>
  <van-popup v-model:show="showPicker" round position="bottom">
    <van-picker
      :columns="columns"
      @cancel="showPicker = false"
      @confirm="onConfirm"
    />
  </van-popup>
</template>

<script setup>
import { _t, _changeLang } from "@/lang/index";
import { ref } from "vue";

const showPicker = ref(false);
const columns = ref([
  { text: "中文简体", value: "zh" },
  { text: "中文繁體", value: "tw" },
  { text: "English", value: "en" },
  { text: "แบบไทย", value: "th" },
  { text: "한국인", value: "kr" },
  { text: "日本語", value: "jp" },
  { text: "Tiếng Việt", value: "vi" },
  // { text: "français", value: "fr" },
  // { text: "Português", value: "pt" },
  // { text: "italiano", value: "it" },
  // { text: "Deutsch", value: "de" },
  { text: "Bahasa Indonesia", value: "id" },
  // { text: "español", value: "es" },
  { text: "Melayu", value: "ms" },
]);

const onConfirm = val => {
  _changeLang(val.selectedValues[0])
}
</script>
