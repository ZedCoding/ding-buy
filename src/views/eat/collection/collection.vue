<template>
  <div class="collection">
    <van-nav-bar title="我的菜" left-arrow @click-left="onClickLeft"  @click-right="onClickRight" fixed>
      <van-icon name="shopping-cart-o" size="20" slot="right" />
    </van-nav-bar>
    <div class="wrap" v-if="list.length">
      <div v-for="item in list" :key="item.id"></div>
    </div>
    <div class="empty" v-else>
      <img :src="require('@/assets/img/empty_order.jpg')" class="img" alt />
      <span class="text">可以把菜谱收藏到这里哦~</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "collection",
  data() {
    return {
      list: []
    };
  },
  created() {},
  methods: {
    onClickRight() {
      this.$router.push({ path: "/dashboard/cart" });
    }
  }
};
</script>
<style lang='scss' scoped>
.collection {
  padding-top: 46px;
  background-color: #f2f2f2;
  .empty {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: calc(100vh - 46px);
    .img {
      width: 10rem;
      height: 10rem;
    } 
    .text {
      margin-top: 0.5rem;
      font-size: 0.8rem;
      color:grey;
    }
  }
}
</style>