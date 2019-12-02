<template>
  <div class="goods-list">
    <van-nav-bar title="商品清单" left-arrow @click-left="onClickLeft" fixed />
    <div class="column">
      <span>商品</span>
      <span>{{computedCount}}</span>
    </div>
    <div class="wrap">
      <div v-for="item in shopCartInfo" :key="item.id" class="item">
        <div class="left">
          <img :src="item.small_image" class="image" alt />
          <div class="text">
            <span class="name">{{item.name}}</span>
            <div class="text-grey">
              <span>单价:￥{{item.price}}</span>
              <span>数量:{{item.number}}</span>
            </div>
          </div>
        </div>
        <div class="right">
          <span>￥{{item.price*item.number}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "goodsList",
  data() {
    return {};
  },
  computed: {
    ...mapState(["shopCartInfo"]),
    computedCount() {
      let len = Object.keys(this.shopCartInfo).length;
      return `共${len}件`;
    }
  }
};
</script>
<style lang='scss' scoped>
.goods-list {
  padding-top: 46px;
  margin-top: 0.5rem;
  background-color: #f2f2f2;
  .column {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 2.5rem;
    line-height: 2.5rem;
    padding: 0 0.6rem;
    background-color: #fff;
    border-bottom: 1px solid #f2f2f2;
  }
  .wrap {
    .item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.5rem 0.6rem 0.8rem;
      border-bottom: 1px solid #f2f2f2;
      background-color: #fff;
      .left {
        display: flex;
        align-items: center;
        .image {
          width: 3rem;
          margin-right: 0.5rem;
        }
        .text {
          font-size: 1rem;
          .text-grey {
            margin-top: 0.5rem;
            font-size: 0.8rem;
            color: grey;
          }
        }
      }
    }
  }
}
</style>