<!-- 顶部 -->
<template>
  <div class="top fixd_div" :style="{ color: props.color, backgroundColor: props.bgColor }">
    <van-icon style="transform: rotate(90deg);" name="down" @click="back" class="back" />
    <span class="info">{{ props.title || "" }}</span>
    <img @click="goCustomer" class="kefu" src="@/assets/my/kefu.svg" alt="img">
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import { useRouter } from "vue-router";
import store from "@/store"

const goCustomer = () => {
  store.dispatch('goCustomer')
}

const router = useRouter();
const props = defineProps({
  title: {
    type: String,
    default: "",
  },
  bgColor: {
    type: String,
    default: "#fff",
  },
  color: {
    type: String,
    default: "#333",
  },
  backFunc: {
    type: Function,
  },
});

const back = () => {
  if (props.backFunc) return props.backFunc();
  router.back();
};
</script>

<style lang="less" scoped>
.top {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 14rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4.2rem;
  z-index: 9;
  font-weight: 600;
  padding: 0 4rem;
  border-bottom: 1px solid #e5e5e5;

  .info {
    flex: 1;
    margin-left: 4rem;
  }

  .kefu {
    width: 6rem;
    height: 6rem;
  }
}
</style>
