
import store from "@/store"

// 转换hk
export const _trans = num => {
  const p = store.state.config.exchange_rate || 1
  return (num * p).toFixed(4)
}

// 时间转换
export function parseTime(time, cFormat) {
  if (arguments.length === 0 || !time) {
    return null;
  }
  const format = cFormat || "{y}-{m}-{d} {h}:{i}:{s}";
  const date = formatTimestamp(time)
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay(),
  };
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key];
    // Note: getDay() returns 0 on Sunday
    if (key === "a") {
      return ["日", "一", "二", "三", "四", "五", "六"][value];
    }
    return value.toString().padStart(2, "0");
  });
  return time_str;
}

// 复制
export const copyText = (text) => {
  if (navigator.clipboard) {
    // clipboard api 复制
    navigator.clipboard.writeText(text);
  } else {
    var textarea = document.createElement("textarea");
    document.body.appendChild(textarea);
    // 隐藏此输入框
    textarea.style.position = "fixed";
    textarea.style.clip = "rect(0 0 0 0)";
    textarea.style.top = "10px";
    // 赋值
    textarea.value = text;
    // 选中
    textarea.select();
    // 复制
    document.execCommand("copy", true);
    // 移除输入框
    document.body.removeChild(textarea);
  }
};

function formatTimestamp(timestamp) {

  const timeZoneOffset = store.state.config?.timezone

  const date = new Date(timestamp * 1000); // 将时间戳转换为毫秒
  const systemOffsetMinutes = -date.getTimezoneOffset(); // 当前系统时区的偏移（单位：分钟）

  // 如果传入了时区偏移，例如 "+5:30" 或 "-02:00"
  if (timeZoneOffset) {
    // 解析时区偏移，格式为 "+5:30" 或 "-02:00"
    const matches = timeZoneOffset.match(/([+-])(\d{1,2}):(\d{2})/);
    if (matches) {
      const sign = matches[1] === '+' ? 1 : -1;
      const hoursOffset = parseInt(matches[2], 10);
      const minutesOffset = parseInt(matches[3], 10);

      // 将时区偏移转换为分钟
      const totalOffsetMinutes = sign * (hoursOffset * 60 + minutesOffset);

      // 仅在传入的时区与系统时区不同的情况下进行调整
      if (totalOffsetMinutes !== systemOffsetMinutes) {
        // 调整日期对象的时间：添加传入时区的偏移量并减去系统的时区偏移
        date.setMinutes(date.getMinutes() + totalOffsetMinutes - systemOffsetMinutes);
      }
    }
  }

  return date;
}