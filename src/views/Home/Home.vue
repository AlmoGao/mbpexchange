<!-- 首页 -->
<template>
  <div class="page-home">

    <!-- 顶部 -->
    <div class="top">
      <img :class="config.logo" style="height: 100%;width:auto" v-if="config.logo" :src="config.logo" alt="">
      <span v-else></span>
      <span>{{ config.name }}</span>
      <img class="lang" @click="router.push({ name: 'lang' })" src="@/assets/lang/lang.png" alt="">
    </div>

    <div class="content">
      <!-- banner -->
      <van-swipe style="margin-bottom:2vw" class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item class="swiper-item" v-for="(item, i) in carousel" :key="i">
          <img @click="clickBanner(item)" :src="item.image" style="width:100%;height:100%" alt="img">
        </van-swipe-item>
      </van-swipe>


      <div class="tabs1">
        <div class="tab1" @click="jump('recharge')">
          <img src="@/assets/home/tab1.png" alt="img">
          <div>{{ _t('t14') }}</div>
        </div>
        <div class="tab1" @click="jump('withdraw')">
          <img src="@/assets/home/tab2.png" alt="img">
          <div>{{ _t('t15') }}</div>
        </div>
      </div>
      <!-- tabs -->
      <div class="tabs">


        <div class="tab" @click="openLink(whats_app)">
          <img src="@/assets/home/tab3.png" alt="img">
          <div>{{ _t('t16') }}</div>
        </div>
        <div class="tab" @click="openLink(telegram)">
          <img src="@/assets/home/tab4.png" alt="img">
          <div>{{ _t('t17') }}</div>
        </div>
        <div class="tab" @click="jump('team')" style="width: 100%;margin: 2rem 0;">
          <img src="@/assets/home/tab5.png" alt="img">
          <div>{{ _t('t18') }}</div>
        </div>
      </div>

      <!-- notice -->
      <!-- <div style="position: relative">
        <van-notice-bar class="notice-bar shadow" color="#9FA6B5" background="#232323" left-icon="volume-o"
          :text="notice.title" />

        <van-icon @click="jump('notice')" style="position: absolute;right: 4rem;top: 2.4rem;font-size: 5.4rem;"
          name="wap-nav" />
      </div> -->

      <!-- tabs2 -->
      <!-- <div class="tabs2">
        <div class="tab shadow" v-for="(item, i) in recommends" :key="i">
          <div>{{ item.name }}</div>
          <div :class="[getPercent(item) > 0 ? 'up' : 'down']">{{ getPercent(item) ? getPercent(item) + '%' : '--' }}
          </div>
          <div class="amount" :class="[getPercent(item) > 0 ? 'up' : 'down']">{{ item.close || '--' }}</div>
        </div>
      </div> -->

      <!-- list -->
      <div class="list">
        <div class="item" v-for="(item, i) in goods" :key="i" @click="goInfo(item)">
          <div class="left">
            <div class="name">{{ item.name }}</div>
            <div>24H {{ item.amount || '--' }}</div>
          </div>
          <div class="amount" :class="[getPercent(item) > 0 ? 'up' : 'down']">{{ item.close || '--' }}</div>
          <div>
            <div :class="[getPercent(item) > 0 ? 'up' : 'down']">{{ getPercent(item) ? getPercent(item) + '%' : '--' }}
            </div>
            <div class="chart" style="width:20rem;height:8rem;position: relative" v-if="item.list">
              <Area :up="getPercent(item) > 0" :id="i" :list="item.list || []" />
            </div>
          </div>
        </div>
      </div>
    </div>


    <van-dialog v-model:show="showMessage" :title="''" :show-cancel-button="false" @confirm="confirmMessage">
      <div v-html="popup.content" style="padding:1rem 4rem;max-height: 60vh;overflow-y: auto;"></div>
    </van-dialog>
  </div>
</template>


<script setup>
import router from "@/router"
import { ref, computed, onMounted } from "vue"
import List from "@/components/List.vue"
import http from "@/api/index"
import store from "@/store"
import { _trans } from "@/tools/utils"
import { _t } from "@/lang/index";
import { showConfirmDialog } from "vant"
import Area from "@/components/Area.vue"

const token = computed(() => store.state.token || '')
const goods = computed(() => store.state.goods || [])
const recommends = computed(() => (store.state.goods || []).slice(0, 3))
const config = computed(() => store.state.config || {})
const telegram = computed(() => store.state.config.telegram || '')
const whats_app = computed(() => store.state.config.whats_app || '')
const carousel = computed(() => store.state.config.carousel || []) // 轮播
const notice = computed(() => {
  if (store.state.config.news && store.state.config.news?.length) return store.state.config.news[0]
  return {
    content: ''
  }
}) // 公告
const popup = computed(() => store.state.config.popup || {}) // 公告

const getPercent = item => {
  if (item.open && item.close) {
    return Number((item.close - item.open) * 100 / item.open).toFixed(2)
  }
  return 0
}

const goInfo = item => {
  store.commit('setCurrGood', item)
  router.push({
    name: 'trade'
  })
}

const openLink = link => {
  window.open(link)
}

const showMessage = ref(false)
const confirmMessage = () => {
  showMessage.value = false
  // http.messageRead({
  //   id: messageId.value
  // })
}

onMounted(() => {
  if (popup.value && popup.value.content) {
    showMessage.value = true
  }
})


const clickBanner = item => {
  if (item.url) {
    window.open(item.url)
  }
}

const jump = name => {
  if (!token.value) return router.push({ name: 'login' })
  router.push({ name })
}
</script>

<style lang="less" scoped>
.page-home {
  padding-bottom: 16rem;
  display: flex;
  flex-direction: column;
  height: 100%;

  .top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 4rem;
    height: 12rem;
    color: #fff;
    font-size: 4rem;

    .lang {
      width: 6rem;
      height: 6rem;
    }

    .logo {
      height: 10rem;
    }
  }

  .content {
    flex: 1;
    overflow-y: auto;
    padding: 0 4rem;
  }

  .my-swipe {
    border-radius: 4rem;
    overflow: hidden;

    .swiper-item {
      height: 50rem;
      background-color: #000;
    }
  }

  .tabs {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: 2rem;


    .tab {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      font-size: 3.2rem;
      background-color: #232323;
      padding: 2rem;
      border-radius: 2rem;
      width: 48%;

      >img {
        width: 8rem;
        height: 8rem;
        margin-right: 2rem;
      }
    }
  }

  .tabs1 {
    display: flex;
    align-items: center;
    justify-content: space-around;
    background-color: #232323;
    padding: 4rem 2rem;
    border-radius: 4rem;

    .tab1 {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      img {
        width: 10rem;
        height: 10rem;
        margin-bottom: 2rem;
      }
    }
  }

  .tabs2 {
    display: flex;
    align-items: stretch;
    justify-content: space-between;
    margin: 4rem 0 4rem 0;

    .tab {
      width: 31.5%;
      padding: 3rem;
      border-radius: 4rem;
      line-height: 6rem;
      font-size: 4rem;

      .amount {
        font-size: 5rem;
      }
    }
  }



  .notice-bar {
    border-radius: 5rem;
    overflow: hidden;
  }

  .navs {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 8rem 0 6rem 0;

    .nav {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 48%;
      height: 18rem;
      border-radius: 1rem;
      border: 1px solid #f5f5f5;

      img {
        height: 6.5rem;
        margin-bottom: 1rem
      }
    }

    .curr_nav {
      background-color: #ECECFC;
      color: #4936DF;
    }
  }

  .hots {
    display: flex;
    align-items: stretch;
    box-shadow: 0 0.5rem 2rem rgba(0, 0, 0, .1);
    padding: 6rem;
    border-radius: 2rem;
    margin-bottom: 6rem;
    overflow-x: auto;

    .hot {
      flex: 1;
      text-align: center;
      line-height: 6rem;
      font-weight: 600;
      margin-right: 4rem;

      &:last-child {
        margin-right: 0;
      }

      .num {
        font-size: 4.2rem;
      }
    }
  }

  .list {
    .item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 3.4rem;
      border-radius: 2rem;
      font-size: 3.4rem;
      margin-bottom: 2rem;
      background-color: #232323;

      .left {
        .name {
          font-size: 4rem;
          font-weight: bold;
          margin-bottom: 1rem;
          color: #fff;
        }
      }

      .amount {
        font-size: 5rem;
        font-weight: bold;
      }
    }
  }
}
</style>