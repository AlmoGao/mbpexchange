<!-- 首页 -->
<template>
  <div class="page-home">

    <!-- 顶部 -->
    <div class="top">
      <img class="logo" src="@/assets/logo.png" alt="">
      <span>主页</span>
      <img class="lang" @click="router.push({ name: 'lang' })" src="@/assets/lang/lang.png" alt="">
    </div>

    <div class="content">
      <!-- banner -->
      <van-swipe style="margin-bottom:2vw" v-show="activeTab == 0" class="my-swipe" :autoplay="3000"
        indicator-color="white">
        <van-swipe-item class="swiper-item" v-for="(item, i) in carousel" :key="i">
          <img @click="clickBanner(item)" :src="item.image" style="width:100%;height:100%" alt="img">
        </van-swipe-item>
      </van-swipe>

      <!-- tabs -->
      <div class="tabs">
        <div class="tab">
          <img src="@/assets/home/tab1.png" alt="img">
          <div>充值</div>
        </div>
        <div class="tab">
          <img src="@/assets/home/tab2.png" alt="img">
          <div>提现</div>
        </div>
        <div class="tab">
          <img src="@/assets/home/tab3.png" alt="img">
          <div>合作</div>
        </div>
        <div class="tab">
          <img src="@/assets/home/tab4.png" alt="img">
          <div>客服</div>
        </div>
        <div class="tab">
          <img src="@/assets/home/tab5.png" alt="img">
          <div>邀请</div>
        </div>
      </div>

      <!-- notice -->
      <van-notice-bar class="notice-bar shadow" color="#9FA6B5" background="#232323" left-icon="volume-o"
        :text="notice" />

      <!-- tabs2 -->
      <div class="tabs2">
        <div class="tab shadow">
          <div>BTC</div>
          <div class="up">13%</div>
          <div class="amount up">$21311</div>
        </div>
        <div class="tab shadow">
          <div>BTC</div>
          <div class="up">13%</div>
          <div class="amount up">$21311</div>
        </div>
        <div class="tab shadow">
          <div>BTC</div>
          <div class="up">13%</div>
          <div class="amount up">$21311</div>
        </div>
      </div>

      <!-- list -->
      <div class="list">
        <div class="item" v-for="i in 20" :key="i">
          <div class="left">
            <div class="name">BTC</div>
            <div>24Hamount 2342342</div>
          </div>
          <div class="amount up">$2342.23</div>
          <div class="up">23%</div>
        </div>
      </div>
    </div>


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
    align-items: stretch;

    .tab {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-size: 3.6rem;
      margin: 2rem 0 3rem 0;

      >img {
        width: 8rem;
        height: 8rem;
        margin-bottom: 1rem;
      }
    }
  }

  .tabs2 {
    display: flex;
    align-items: stretch;
    justify-content: space-between;
    margin: 2rem 0 4rem 0;

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