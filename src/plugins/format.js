export default {
  install(Vue) {
    Vue.prototype.format = function (cur, format) {
      let date = new Date(cur);
      let args = {
        "M+": date.getMonth() + 1,
        "d+": date.getDate(),
        "h+": date.getHours(),
        "m+": date.getMinutes(),
        "s+": date.getSeconds(),
        "q+": Math.floor((date.getMonth() + 3) / 3), //quarter
        "S": date.getMilliseconds()
      };
      if (/(y+)/.test(format))
        format = format.replace(
          RegExp.$1,
          (date.getFullYear() + "").substr(4 - RegExp.$1.length)
        );
      for (let i in args) {
        let n = args[i];
        if (new RegExp("(" + i + ")").test(format))
          format = format.replace(
            RegExp.$1,
            RegExp.$1.length == 1 ? n : ("00" + n).substr(("" + n).length)
          );
      }
      return format;
    }
  }
}