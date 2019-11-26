import Vue from 'vue'
import App from './App';
import router from './router';
import store from './store'
import "reset-css";
import './plugins/rem';
import {
  Tabbar,
  TabbarItem,
  Icon,
  Button,
  Toast,
  Swipe,
  SwipeItem,
  Search,
  Divider,
  CountDown,
  Tab,
  Tabs,
  Loading,
  Lazyload,
  Cell,
  CellGroup,
  Grid,
  GridItem,
  Tag,
  NavBar,
  ActionSheet,
  DatetimePicker,
  Field,
  AddressList,
  AddressEdit,
  Dialog,
  CouponCell,
  CouponList,
  RadioGroup,
  Radio,
  Checkbox,
  Stepper,
  SubmitBar 
} from 'vant';

Vue.use(Tabbar)
  .use(TabbarItem)
  .use(Icon)
  .use(Button)
  .use(Swipe)
  .use(SwipeItem)
  .use(Search)
  .use(Divider)
  .use(CountDown)
  .use(Tab)
  .use(Tabs)
  .use(Loading)
  .use(Lazyload)
  .use(Cell)
  .use(CellGroup)
  .use(Grid)
  .use(GridItem)
  .use(Tag)
  .use(NavBar)
  .use(ActionSheet)
  .use(DatetimePicker)
  .use(Field)
  .use(AddressList)
  .use(AddressEdit)
  .use(Dialog)
  .use(CouponCell)
  .use(CouponList)
  .use(RadioGroup)
  .use(Radio)
  .use(Checkbox)
  .use(Stepper)
  .use(SubmitBar)

import http from './http'
Vue.prototype.$http = http;
import loading from '@/components/loading';
import scrollTop from '@/components/scrollTop';
Vue.component('loading', loading);
Vue.component('scrollTop', scrollTop);
Vue.prototype.$toast = Toast;
import FastClick from 'fastclick';
// 解决移动端点击延迟200ms的问题
if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function () {
    FastClick.attach(document.body);
  }, false);
}
Vue.prototype.onClickLeft = () => {
  router.back();
}
Date.prototype.format = function (format) {
  var args = {
    "M+": this.getMonth() + 1,
    "d+": this.getDate(),
    "h+": this.getHours(),
    "m+": this.getMinutes(),
    "s+": this.getSeconds(),
    "q+": Math.floor((this.getMonth() + 3) / 3), //quarter

    S: this.getMilliseconds()
  };
  if (/(y+)/.test(format))
    format = format.replace(
      RegExp.$1,
      (this.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  for (var i in args) {
    var n = args[i];

    if (new RegExp("(" + i + ")").test(format))
      format = format.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? n : ("00" + n).substr(("" + n).length)
      );
  }
  return format;
}
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
