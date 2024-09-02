import http from "./request";

class HttpService {
  config() {
    // 网站配置
    return http("/api/index/index", {
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
  changepwd(data) {
    // 修改登录密码
    return http("/api/user/changepwd", {
      method: "post",
      data,
    });
  }
  changefundpwd(data) {
    // 修改交易密码
    return http("/api/user/changefundpwd", {
      method: "post",
      data,
    });
  }
  bindaddress(data) {
    // 绑定钱包地址
    return http("/api/user/bindaddress", {
      method: "post",
      data,
    });
  }
  bindbank(data) {
    // 绑定银行卡
    return http("/api/user/bindbank", {
      method: "post",
      data,
    });
  }
  product(data) {
    // 产品列表
    return http("/api/product/list", {
      method: "post",
      data,
    });
  }
  buy(data) {
    // 购买
    return http("/api/order/buy", {
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
