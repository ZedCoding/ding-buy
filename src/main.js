import Vue from 'vue'
import App from './App';
import router from './router';
import store from './store'
import "reset-css";
import waterfall from "vue-waterfall2";
import { rem, format, $toast } from './plugins';
import FastClick from 'fastclick';
import {
  Tabbar,
  TabbarItem,
  Icon,
  Button,
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
  .use(waterfall)
  .use(format)
  .use(rem)
  .use($toast)

import http from './http'
Vue.prototype.$http = http;

import loading from '@/components/loading';
import scrollTop from '@/components/scrollTop';
Vue.component('loading', loading);
Vue.component('scrollTop', scrollTop);

// 解决移动端点击延迟200ms的问题
if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function () {
    FastClick.attach(document.body);
  }, false);
}

Vue.prototype.onClickLeft = () => {
  router.back();
}

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
