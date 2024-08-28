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
  setTimeout(() => {
    globalWebSocket.connect()
  }, 100)
  if (!localStorage.getItem("lang")) {
    _changeLang(res.lang)
  }
})

if (store.state.token) {
  store.dispatch("updateUser");
}

// setTimeout(() => {

//   setTimeout(() => {
//     store.dispatch('updateList')
//   }, 1000)
// }, 1000);


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
  background-color: #fff;
  color: #333;
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

.up {
  color: #09ca70 !important;
}

.down {
  color: #e72f2b !important;
}

.up-bg {
  background-color: #ECFBF6;
  color: #09ca70;
}

.down-bg {
  background-color: #FBD7DC;
  color: #e72f2b;
}

.form {
  padding: 4rem;

  .subtitle {
    margin: 4rem 0;
  }

  .item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 12rem;
    border-radius: 1rem;
    border: 1px solid #e5e5e5;
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
