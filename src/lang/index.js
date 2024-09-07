import { createI18n } from "vue-i18n";
import zh from "./zh"; // 中文简体
import en from "./en"; // 英文
import hi from "./hi-Deva"; // 英文

import { Locale } from "vant";

import zhCN from "vant/es/locale/lang/zh-CN";
import enUS from "vant/es/locale/lang/en-US";
import hiIN from "vant/es/locale/lang/hi-IN";

// import msMS from "./vant/ms-MS"

const messages = {
  'zh-cn': zh,
  en,
  'hi-Deva': hi
};

const lang = localStorage.getItem("lang") || "zh-cn";
const i18n = createI18n({
  messages,
  locale: lang,
});

setCookie("think_var", lang, 30);
setCookie("lang", lang, 30);
useVant(lang);

export const _getLocal = () => i18n.global.locale;
export const _changeLang = (val) => {
  i18n.global.locale = val;
  localStorage.setItem("lang", val);
  useVant(val);
  location.reload();
};
export const _t = i18n.global.t;

function useVant(l) {
  switch (l) {
    case "zh-cn":
      Locale.use("zh-CN", zhCN);
      break;
    case "en":
      Locale.use("en-US", enUS);
      break;
    case 'hi-IN':
      Locale.use("hi-IN", hiIN);
      break
  }
}

function setCookie(name, value, days) {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + value + expires + "; path=/";
}
