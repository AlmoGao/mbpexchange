import { createI18n } from "vue-i18n";
import zh from "./zh"; // 中文简体
import tw from "./tw"; // 中文繁体
import en from "./en"; // 英文
import th from "./th"; // 泰语
import vi from "./vi"; // 越南语
import ms from "./ms"; // 马来语
import jp from "./jp"; // 日语
import kr from "./kr"; // 韩语
import id from "./id"; // 印尼
import ru from "./ru"; // 俄语

import { Locale } from "vant";

import zhCN from "vant/es/locale/lang/zh-CN";
import zhTW from "vant/es/locale/lang/zh-TW";
import enUS from "vant/es/locale/lang/en-US";
import thTH from "vant/es/locale/lang/th-TH";
import koKR from "vant/es/locale/lang/ko-KR";
import jaJP from "vant/es/locale/lang/ja-JP";
import viVN from "vant/es/locale/lang/vi-VN";
import idID from "vant/es/locale/lang/id-ID";
import ruRU from "vant/es/locale/lang/ru-RU";
import msMS from "./vant/ms-MS"
// import esES from "vant/es/locale/lang/es-ES";

const messages = {
  'zh-cn': zh,
  'zh-tw': tw,
  en,
  th,
  kr,
  jp,
  vi,
  id,
  ms,
  'ru-RU': ru,
};

const lang = localStorage.getItem("lang") || "zh-tw";
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
    case "zh-tw":
      Locale.use("zh-TW", zhTW);
      break;
    case "en":
      Locale.use("en-US", enUS);
      break;
    case "th":
      Locale.use("th-TH", thTH);
      break;
    case "kr":
      Locale.use("ko-KR", koKR);
      break;
    case "jp":
      Locale.use("ja-JP", jaJP);
      break;
    case "vi":
      Locale.use("vi-VN", viVN);
      break;
    case "id":
      Locale.use("id-ID", idID);
      break;
    case "ms":
      Locale.use("ms-MS", msMS);
      break;
    case "ru-RU":
      Locale.use("ru-RU", ruRU);
      break;
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
