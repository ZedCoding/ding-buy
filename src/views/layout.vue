<template>
  <div class="layout">
    <keep-alive>
      <router-view style="padding-bottom:50px;" v-if="$route.meta.keepAlive" />
    </keep-alive>
    <router-view style="padding-bottom:50px;" v-if="!$route.meta.keepAlive" />
    <van-tabbar
      v-model="active"
      active-color="#3bba63"
      inactive-color="#7d7e80"
      route
      safe-area-inset-bottom
    >
      <template v-for="bar in barList">
        <van-tabbar-item
          :key="bar.name"
          :name="bar.name"
          :icon="bar.icon"
          :to="`/dashboard${bar.route}`"
          :info="bar.name === '购物车' ? infoNumber:null"
          :id="bar.name === '购物车'?'buycar':null"
          replace
        >{{bar.name}}</van-tabbar-item>
      </template>
    </van-tabbar>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "layout",
  data() {
    return {
      active: "首页",
      barList: [
        {
          name: "首页",
          icon: "wap-home-o",
          route: "/home"
        },
        {
          name: "分类",
          icon: "search",
          route: "/category"
        },
        {
          name: "吃什么",
          icon: "smile-o",
          route: "/eat"
        },
        {
          name: "购物车",
          icon: "shopping-cart-o",
          route: "/cart"
        },
        {
          name: "我的",
          icon: "user-o",
          route: "/mine"
        }
      ]
    };
  },
  computed: {
    ...mapState(["shopCartInfo"]),
    infoNumber() {
      return Object.keys(this.shopCartInfo).length || null;
    }
  }
};
</script>