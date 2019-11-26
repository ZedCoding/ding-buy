<template>
  <div class="order">
    <van-nav-bar title="我的订单" left-arrow @click-left="onClickLeft" />
    <van-tabs
      v-model="active"
      animated
      swipeable
      sticky
      color="#3bba63"
      title-active-color="#3bba63"
      title-inactive-color="#7d7e80"
    >
      <van-tab v-for="item in orderTabs" :key="item.id" :title="item.title">
        <template v-if="orderList.length">111</template>
        <template v-else>
          <div class="empty-wrap">
            <img :src="require('@/assets/img/empty_order.jpg')" class="empty-img" alt />
            <span class="empty-text">{{item.emptyText}}</span>
          </div>
        </template>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
export default {
  name: "order",
  data() {
    const activeIndex = +this.$route.params.activeIndex || 0;
    return {
      active: activeIndex,
      orderTabs: [
        {
          id: 0,
          title: "全部",
          emptyText: "暂时还没有相关订单"
        },
        {
          id: 1,
          title: "待支付",
          emptyText: "暂时还没有待支付订单"
        },
        {
          id: 2,
          title: "待收货",
          emptyText: "暂时还没有待收货订单"
        },
        {
          id: 3,
          title: "待评价",
          emptyText: "暂时还没有待评价订单"
        }
      ],
      orderList: []
    };
  },
  created() {},
  methods: {}
};
</script>
<style lang='scss' scoped>
.order {
  .empty-wrap {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 20rem;
    .empty-img {
      width: 60%;
      height: 60%;
    }
    .empty-text {
      font-size: 0.75rem;
      color: grey;
    }
  }
}
</style>