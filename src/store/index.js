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
      api.userConfig().then(res => {
        // setCookie('token', res.userinfo.token, 30)
        // setCookie('uid', res.userinfo.id, 30)
        commit('setUserInfo', res.welcome)
      })
    },
    updateList({ commit, state }, id) {
      // commit('setGoods', [])
      api.productList({
        category_id: 'all'
      }).then(res => {
        const arr = (res || []).map(item => {
          item.price = item.close_price
          const target = state.goods.find(a => a.code == item.code)
          if (target) {
            target.name = item.name
            return target
          }
          return item
        })
        commit('setGoods', arr)
        if (arr.length) {
          if (!location.href.includes('trade')) {
            commit('setCurrGood', arr[0])
          }

        }

        // 取消订阅
        ws.send(JSON.stringify({
          "cmd_id": 22006,
          "seq_id": 123,
          "trace": "asdfsdfa",
          "data": {
            "cancel_type": 1,
          }
        }))
        setTimeout(() => {
          // 订阅
          const codeList = res.map(item => {
            return {
              code: item.code
            }
          })
          const params = {
            "cmd_id": 22004,
            "seq_id": 106254124,
            "trace": "3baaa938-f92c-4a74-a228-fd49d5e2",
            "data": {
              "symbol_list": codeList,
            }
          }
          ws.send(JSON.stringify(params))
        }, 2000)
      })
    }
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