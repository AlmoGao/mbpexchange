import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate"
import api from '@/api'
import ws from "@/tools/ws"
import router from '@/router'

export default createStore({
  state: {
    token: '',
    userInfo: {},
    config: {},
    goods: [],
    currGood: {},
  },
  mutations: {
    setToken(state, val) {
      state.token = val
    },
    setUserInfo(state, val) {
      state.userInfo = val
    },
    setConfig(state, val) {
      state.config = val
    },
    setGoods(state, val) {
      state.goods = val
    },
    setCurrGood(state, val) {
      state.currGood = val
    },
  },
  actions: {
    goCustomer({ state }) {
      if (state.config?.service_link) {
        window.open(state.config?.service_link)
      }
    },
    updateUser({ commit }) {
      return new Promise(resolve => {
        api.userConfig().then(res => {
          // setCookie('token', res.userinfo.token, 30)
          // setCookie('uid', res.userinfo.id, 30)
          commit('setUserInfo', res)
        }).finally(() => {
          resolve(true)
        })
      })
    },
  },
  plugins: [createPersistedState()]
})

function setCookie(name, value, days) {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + value + expires + "; path=/";
}