<!-- 底部导航 -->
<template>
  <div class="bottom fixd_div">
    <div class="bottom-tab" :class="{ 'curr-tab': route.name == item.route }" v-for="(item, i) in navs"
      @click="jump(item)" :key="i">
      <img v-if="route.name != item.route" :src="item.icon" alt="o" />
      <img v-if="route.name == item.route" :src="item.icon2" alt="o" />
      <span>{{ item.title }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import icon1 from "@/assets/bottom/bt-1.jpeg";
import icon11 from "@/assets/bottom/bt-11.jpeg";
import icon2 from "@/assets/bottom/bt-2.jpeg";
import icon22 from "@/assets/bottom/bt-22.jpeg";
import icon3 from "@/assets/bottom/bt-3.jpeg";
import icon33 from "@/assets/bottom/bt-33.jpeg";
import icon4 from "@/assets/bottom/bt-4.jpeg";
import icon44 from "@/assets/bottom/bt-44.jpeg";
import icon5 from "@/assets/bottom/bt-5.jpeg";
import icon55 from "@/assets/bottom/bt-55.jpeg";
import { _t } from "@/lang/index";
import store from '@/store'

const route = useRoute();
const router = useRouter();
// const service = computed(() => store.state.config.service);
const token = computed(() => store.state.token)


const navs = ref([
  { title: _t("t116"), route: "home", icon: icon1, icon2: icon11 },
  { title: _t("t117"), route: "markets", icon: icon2, icon2: icon22 },
  { title: _t("t118"), route: "trade", icon: icon3, icon2: icon33 },
  { title: _t("t119"), route: "assets", icon: icon4, icon2: icon44 },
  { title: _t("t120"), route: "my", icon: icon5, icon2: icon55 },
]);

const jump = (item) => {
  // if (item.route == "server") {
  //   window.open("https://bursamalaysia.info/addons/kefu/index");
  //   return;
  // }
  if (!token.value) return router.push({
    name: 'login'
  })
  router.push({
    name: item.route,
  });
};
</script>

<style lang="less" scoped>
.bottom {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 10;
  width: 100%;
  height: 15rem;
  padding: 2.2rem 0 3rem 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  color: #999;
  border-top: 1px solid #ddd;

  .bottom-tab {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    padding-top: 0.5rem;
    font-size: 2.8rem;

    img {
      height: 5.5rem;
      margin-bottom: 1rem;
    }
  }

  .curr-tab {
    color: #4936DF;
  }
}
</style>
