import http from "./request";

class HttpService {
  message() {
    // 未读公告
    return http("/api/user/message", {
      method: "get",
    });
  }
  hot() {
    // 热门产品
    return http("/api/product/hot", {
      method: "get",
    });
  }
  config() {
    // 网站配置
    return http("/api/index/config", {
      method: "get",
    });
  }
  category() {
    // 产品分类
    return http("/api/product/category", {
      method: "get",
    });
  }
  userConfig() {
    // 获取个人信息
    return http("/api/user/index", {
      method: "get",
    });
  }
  register(data) {
    // 注册
    return http("/api/user/register", {
      method: "post",
      data,
    });
  }
  login(data) {
    // 登录
    return http("/api/user/login", {
      method: "post",
      data,
    });
  }
  logout(data) {
    // 退出登录
    return http("/api/user/logout", {
      method: "post",
      data,
    });
  }
  productList(data) {
    // 分类产品
    return http("/api/product/list", {
      method: "post",
      data,
    });
  }
  changepwd(data) {
    // 修改密码
    return http("/api/user/changepwd", {
      method: "post",
      data,
    });
  }
  kline(data) {
    // k线
    return http("/api/product/kline", {
      method: "post",
      data,
    });
  }
  buy(data) {
    // 下单
    return http("/api/order/buy", {
      method: "post",
      data,
    });
  }
  setfFundpwd(data) {
    // 设置资金密码
    return http("/api/user/setf_fundpwd", {
      method: "post",
      data,
    });
  }
  changeFundpwd(data) {
    // 修改资金密码
    return http("/api/user/change_fundpwd", {
      method: "post",
      data,
    });
  }
  verif(data) {
    // 实名认证
    return http("/api/user/verif", {
      method: "post",
      data,
    });
  }
  recharge(data) {
    // 充值
    return http("/api/order/recharge", {
      method: "post",
      data,
    });
  }
  bindBank(data) {
    // 绑卡
    return http("/api/user/bind_bank", {
      method: "post",
      data,
    });
  }
  rechargeList(data) {
    // 充值记录
    return http("/api/order/recharge_list", {
      method: "post",
      data,
    });
  }
  withdrawalList(data) {
    // 提现记录
    return http("/api/order/withdrawal_list", {
      method: "post",
      data,
    });
  }
  orderList(data) {
    // 订单列表
    return http("/api/order/order_list", {
      method: "post",
      data,
    });
  }
  withdrawal(data) {
    // 提现
    return http("/api/order/withdrawal", {
      method: "post",
      data,
    });
  }
  messageRead(data) {
    // 提现
    return http("/api/user/message", {
      method: "post",
      data,
    });
  }
  upload(data) {
    // 上传
    return http("/api/common/upload", {
      method: "post",
      data,
      'Content-Type': 'multipart/form-data'
    });
  }
}

const https = new HttpService();
export default https;
