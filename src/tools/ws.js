import eventBus from './eventBus'
import store from "@/store"
import { _trans } from "@/tools/utils"

let interval = null

class WebSocketManager {
  constructor() {
    this.websocket = null;
    this.isOpen = false;
    this.isReconnecting = false;
    this.messageHandler = null;
    this.destory = false
    this.room_id = ''
  }

  connect(room_id = '123') {
    this.room_id = room_id
    const url = `wss://quote.tradeswitcher.com/quote-b-ws-api?token=${store.state.config.alltick_token}`
    // const url = 'wss://bit000.xyz/wsapi/ws?room_id=' + room_id
    this.websocket = new WebSocket(url);
    this.destory = false
    this.websocket.onopen = () => {
      eventBus.emit('wsopen')
      console.error('WebSocket connection established.');
      this.isOpen = true;
      this.isReconnecting = false;

      setTimeout(() => {
        store.dispatch('updateList')
      }, 500)
      if (interval) clearInterval(interval)
      interval = setInterval(() => {
        this.websocket.send(JSON.stringify({
          "cmd_id": 22000,
          "seq_id": 123,
          "trace": "asdfsdfa",
          "data": {
          }
        }));
      }, 10000)
    };

    this.websocket.onmessage = (event) => {
      const arr = event.data.split("\n")
      arr.forEach(item => {
        let data = {} // 数据
        // let type = '' // 类型 0-停止投注信息 1-闭盘信息 2-开始投注的信息 3-下注信息
        try {
          // const rs = extractStringBeforeAndAfter(item)
          // type = rs.before
          // data = JSON.parse(rs.after)
          data = JSON.parse(item)
        } catch {
          data = {}
        }
        // console.error('ws消息：', data)
        // if (type != 3) {
        //   console.error('ws消息：', item)
        // }
        // if (data.type == 'ping') {
        //   this.websocket.send(`pong`);
        // }
        // eventBus.emit('ws' + type, data);
        if (data.cmd_id == 22998) {
          const arr = store.state.goods.map(item => {
            if (data.data.code == item.code) {
              item.yprice = item.close_price
              if (item.yprice && item.price) {
                item.percent = ((item.price - item.yprice) * 100 / item.yprice).toFixed(2)
              }
              item = {
                ...item,
                ...data.data,
              }
            }
            return item
          })
          store.commit('setGoods', arr)
        }
      })

    };

    this.websocket.onclose = () => {
      console.error('WebSocket connection closed.');
      eventBus.emit('wsclose')
      this.isOpen = false;
      if (!this.isReconnecting && !this.destory) {
        this.reconnect();
      }
    };

    this.websocket.onerror = (error) => {
      eventBus.emit('wserror')
      this.isReconnecting = false;
      console.error('WebSocket error:', error);
    };
  }

  reconnect() {
    this.isReconnecting = true;
    console.error('WebSocket reconnecting...');
    setTimeout(() => {
      this.connect(this.room_id);
    }, 3000);
  }

  send(message) {
    if (this.isOpen) {
      this.websocket.send(message);
    } else {
      console.warn('WebSocket is not open. Message could not be sent.');
    }
  }

  close() {
    this.destory = true
    this.websocket.close();
  }
}

// 全局對象，用于管理 WebSocket 实例
const globalWebSocket = new WebSocketManager();

export default globalWebSocket;

function extractStringBeforeAndAfter(str) {
  const startIndex = str.indexOf('{');
  if (startIndex === -1) {
    return { before: '', after: str };
  }

  const before = str.substring(0, startIndex);
  const after = '{' + str.substring(startIndex + 1);

  return { before, after };
}