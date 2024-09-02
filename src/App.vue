<template>
  <router-view />
</template>

<script setup>
import store from "./store";
import globalWebSocket from "@/tools/ws.js"
import http from "@/api"
import { _changeLang } from "@/lang/index";

http.config().then(res => {
  // console.error('配置', res)
  store.commit('setConfig', res || {})
  document.title = res.name || '--'
  // setTimeout(() => {
  //   globalWebSocket.connect()
  // }, 100)
  if (!localStorage.getItem("lang") && res.lang) {
    _changeLang(res.lang)
  }
})

if (store.state.token) {
  store.dispatch("updateUser");
}
//  产品列表
const products = () => {
  http.product().then(res => {
    store.commit('setGoods', res || [])

    setTimeout(() => {
      store.state.goods.forEach((item, i) => {
        setTimeout(() => {
          const url = `https://api.huobi.pro/market/history/kline?symbol=${item.code.toLowerCase()}&period=1day&size=1`
          fetch(url)
            .then(response => response.json())
            .then(data => {
              if (data.data[0]) {
                store.state.goods[i] = {
                  ...item,
                  ...data.data[0]
                }
                store.commit('setGoods', store.state.goods)
              }
            })
        }, i * 300);
      })
    }, 0)
    setInterval(() => {
      store.state.goods.forEach((item, i) => {
        setTimeout(() => {
          const url = `https://api.huobi.pro/market/history/kline?symbol=${item.code.toLowerCase()}&period=1day&size=1`
          fetch(url)
            .then(response => response.json())
            .then(data => {
              if (data.data[0]) {
                store.state.goods[i] = {
                  ...item,
                  ...data.data[0]
                }
                store.commit('setGoods', store.state.goods)
              }
            })
        }, i * 300);
      })
    }, 10000)
  })
}
products()




// 设置根元素的字体大小
const w = document.body.clientWidth
if (w > 600) {
  document.documentElement.style.fontSize = '6px';
} else {
  document.documentElement.style.fontSize = '1vw';
}
// 动态调整字体大小以响应窗口大小
function setRemBasedOnWindow() {
  const w = document.body.clientWidth
  if (w > 600) {
    document.documentElement.style.fontSize = '6px';
  } else {
    document.documentElement.style.fontSize = '1vw';
  }
}

// 初始化设置
setRemBasedOnWindow();
// 当窗口大小变化时调整字体大小
window.addEventListener('resize', setRemBasedOnWindow);
</script>

<style lang="less">
:root,
:host {
  --van-primary-color: #4936DF !important;
}

html,
body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}

.fixd_div {
  width: 100%;
  max-width: 600px;
  left: 50% !important;
  transform: translateX(-50%) !important;
}

.van-popup {
  max-width: 600px !important;
}

.van-popup--bottom {
  left: 50% !important;
  transform: translateX(-50%) !important;
}

#app {
  font-size: 3.2rem;
  background: #0B0B0B;
  color: #9fa6b5;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
}

div {
  box-sizing: border-box;
  transition: all ease .2s, font-size ease 0s;
}

input {
  background-color: rgba(0, 0, 0, 0);
  border: none;
  outline: none;
}

.a_btn {
  background: linear-gradient(90deg, #239aff, #2effb4) !important;
  box-shadow: 0 0 5rem 0 rgba(158, 220, 255, .5019607843137255) !important;
  border-radius: 15rem !important;
  color: #000;
  font-weight: 600;
}

.b_btn {
  background: linear-gradient(90deg, #ef4343, #ffa3a3) !important;
  box-shadow: 0 0 14px 0 rgba(158, 220, 255, .5019607843137255) !important;
  border-radius: 15rem !important;
  font-weight: 600;
}

.c_btn {
  background: linear-gradient(90deg, #f6f6f6, #efefef 98.41%) !important;
  box-shadow: 0 0 14px 0 rgba(158, 220, 255, .5019607843137255) !important;
  border-radius: 15rem !important;
  color: #999 !important;
  font-weight: 600;
}

.d_btn {
  background: linear-gradient(90deg, #2e2e2e, #0c0c0c 98.41%) !important;
  border-radius: 15rem !important;
  color: #eee !important;
  font-weight: 600;
}

.van-button--primary {
  color: #000 !important;
  font-weight: bold !important;
}

.van-dialog {
  background-color: #232323 !important;
  padding: 5rem;

  .van-dialog__footer {
    margin-top: 4rem;

    &::before {
      display: none;
    }

    &::after {
      display: none;
    }
  }

  .van-button {
    background: linear-gradient(90deg, #239aff, #2effb4) !important;
    border-radius: 15rem !important;

    .van-button__text {
      color: #000;
      font-weight: bold;
    }

    &::before {
      display: none;
    }

    &::after {
      display: none;
    }
  }
}

.van-tabs__nav {
  background-color: rgba(0, 0, 0, 0) !important;

  .van-tab {
    color: #888 !important;
  }

  .van-tab--active {
    color: #53d6f0 !important;
  }

  .van-tabs__line {
    background-color: #fff !important;
  }
}

.loading {
  opacity: 0.5;
}

.up {
  color: #09ca70 !important;
}

.down {
  color: #e72f2b !important;
}

.up-bg {
  background: linear-gradient(90deg, #239aff, #2effb4);
  color: #000;
}

.down-bg {
  background: linear-gradient(90deg, #ef4343, #ffa3a3);
  color: #000;
}

.shadow {
  box-shadow: -1px 1px 1px 0 hsla(0, 0%, 100%, .3215686274509804) inset, 1px -1px 1px 0 hsla(0, 0%, 83.9%, .3215686274509804) inset
}

.form {
  background-color: rgba(0, 0, 0, 0.7);
  padding: 3rem 5rem;
  border-radius: 4rem;
  color: #9fa6b5;

  .subtitle {
    margin: 2rem 0 4rem 0;
  }

  .item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 12rem;
    border-radius: 1rem;
    border-bottom: 1px solid #666;
    padding: 0 4rem;

    .icon {
      font-size: 5rem;
    }

    .icon_left {
      margin-right: 4rem;
    }

    .icon_right {
      margin-left: 4rem;
    }

    .left_text {
      width: 16rem;
    }

    .ipt {
      flex: 1;
      height: 100%;
    }

    .ipt_btn {
      padding: 2rem;
      border-radius: 1rem;
      background-color: #4936DF;
      color: #fff;
    }
  }

  .select_item {
    background-color: #EBEBEB;
  }

  .btn {
    margin-top: 12rem;
  }

  .link {
    margin: 4rem 0;
    color: #4936DF;
  }

  .tip {
    color: #999;
    margin-top: 4rem;

    .a {
      color: #4936DF;
      text-decoration: underline;
    }
  }
}
</style>
