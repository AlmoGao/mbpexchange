<!-- 首页 -->
<template>
  <div class="page-home">
    <!-- 顶部 -->
    <div class="top">
      <!-- <span>行情</span> -->
      <img style="width:10rem;height:10rem" :src="logo" alt="">
      <van-icon @click="jump('markets')" name="search" />
    </div>

    <van-tabs style="margin-bottom:2rem" shrink v-model:active="activeTab">
      <van-tab :title="item.name" v-for="(item, i) in category" :key="i"></van-tab>
    </van-tabs>

    <van-swipe style="margin-bottom:2rem" v-show="activeTab == 0" class="my-swipe" :autoplay="3000"
      indicator-color="white">
      <van-swipe-item class="swiper-item" v-for="(item, i) in carousel" :key="i">
        <img @click="clickBanner(item)" :src="item.image" style="width:100%;height:100%" alt="img">
      </van-swipe-item>
    </van-swipe>

    <van-notice-bar class="notice-bar" color="#555" background="#F3F6F8" left-icon="volume-o" :text="notice" />


    <div class="navs">
      <div class="nav curr_nav" @click="jump('recharge')">
        <img src="@/assets/home/recharge.svg" alt="icon">
        <div>{{ _t('t108') }}</div>
      </div>
      <div class="nav" @click="jump('withdraw')">
        <img src="@/assets/home/withdraw.svg" alt="icon">
        <div>{{ _t('t109') }}</div>
      </div>
    </div>

    <div class="hots">
      <div class="hot" v-for="(item, i) in showHots" :key="i">
        <div class="name">{{ item.name || '--' }}</div>
        <div class="" :class="item.percent > 0 ? 'up' : 'down'">{{ item.price ? _trans(item.price) : '--' }}</div>
        <div class="num" :class="item.percent > 0 ? 'up' : 'down'">{{ item.percent ? item.percent + '%' : '--' }}</div>
      </div>
    </div>

    <List :list="list" />


    <van-dialog v-model:show="showMessage" title="" :show-cancel-button="false" @confirm="confirmMessage">
      <div v-html="messageContent" style="padding:1rem 4rem"></div>
    </van-dialog>
  </div>
</template>


<script setup>
import router from "@/router"
import { ref, computed } from "vue"
import List from "@/components/List.vue"
import http from "@/api/index"
import store from "@/store"
import { _trans } from "@/tools/utils"
import { _t } from "@/lang/index";
import { showConfirmDialog } from "vant"

const token = computed(() => store.state.token || '')
const carousel = computed(() => store.state.config.carousel || []) // 轮播
const notice = computed(() => store.state.config.notice || '') // 公告
const logo = computed(() => store.state.config.logo || '') // 公告

// 分类
const activeTab = ref(0)
const list = computed(() => {
  if (category.value[activeTab.value]) {
    const arr = store.state.goods.filter(item => {
      return item.category_id == category.value[activeTab.value].id
    })
    return arr
  } else {
    return store.state.goods
  }
})

// 获取分类
const category = ref([])
const getcategory = () => {
  http.category().then(res => {
    category.value = res || []
  })
}
getcategory()


// 热门产品
const hots = ref([])
const showHots = computed(() => {
  const arr = []
  hots.value.forEach(item => {
    const target = store.state.goods.find(a => a.code == item.code)
    if (target) {
      arr.push(target)
    }
  })
  return arr
})
const getHots = () => {
  http.hot().then(res => {
    hots.value = res || []
  })
}
getHots()


// 获取公告消息
const showMessage = ref(false)
const messageContent = ref('')
const messageId = ref('')
const getMessage = () => {
  http.message().then(res => {
    if (res && res.content) {
      messageId.value = res.id
      messageContent.value = res.content
      showMessage.value = true
    }
  })
}
if (token.value) {
  getMessage()
}
const confirmMessage = () => {
  showMessage.value = false
  http.messageRead({
    id: messageId.value
  })
}


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
  padding: 4rem;
  padding-bottom: 22rem;

  .top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 4rem;
    font-size: 4.5rem;
    font-weight: bold;
    color: #838b9c;
  }

  .my-swipe {
    border-radius: 4rem;
    overflow: hidden;

    .swiper-item {
      height: 50rem;
      background-color: #f5f5f5;
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
}
</style>