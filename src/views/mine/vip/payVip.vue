<template>
  <div class="pay-vip">
    <van-nav-bar title="开通绿卡" left-arrow :border="false" @click-left="onClickLeft" />
    <div class="avatar">
      <img :src="require('@/assets/img/avatar.jpg')" class="icon" alt="">
      <div class="text">
        <span>{{userInfo.user_name}}</span>
        <span style="font-size:0.8rem;">绿卡暂未开通</span>
      </div>
    </div>
    <p class="top-tip">开通绿卡享三大权益,预计每单省6.66元</p>
    <van-grid>
      <van-grid-item icon="vip-card-o" text="专享券" />
      <van-grid-item icon="discount" text="专享特权" />
      <van-grid-item icon="gem-o" text="2倍积分" />
    </van-grid>
    <van-radio-group v-model="radio" @change="onChange">
      <div class="type-list">
        <div
          v-for="item in typeList"
          :key="item.type"
          class="type-item"
          :class="{'type-item-checked':item.type === radio}"
        >
          <span class="discount">{{item.discount}}</span>
          <div style="position:relative;">
            <span class="title">{{item.title}}</span>
            <van-radio :name="item.type" icon-size="16" checked-color="#07c160" />
          </div>
          <span class="money">相当于约{{item.money}}元/天</span>
          <div>
            <span class="price">￥{{item.price}}</span>
            <span class="origin-price">￥{{item.origin_price}}</span>
          </div>
        </div>
      </div>
    </van-radio-group>
    <van-radio-group v-model="radio2" @change="onChange">
      <van-cell-group title="支付方式">
        <van-cell v-for="item in payList" :key="item.type">
          <template slot="title">
            <img :src="require(`@/assets/img/${item.icon}.png`)" class="icon" alt />
            <span class="text">{{item.text}}</span>
          </template>
          <template slot="right-icon">
            <van-radio :name="item.type" checked-color="#07c160" />
          </template>
        </van-cell>
      </van-cell-group>
    </van-radio-group>
    <van-button type="primary" round class="pay-button" @click="onPay">立即支付</van-button>
  </div>
</template>
<script>
import {mapState} from 'vuex';
export default {
  name: "payVip",
  data() {
    return {
      typeList: [
        {
          type: "year",
          discount: "5折",
          title: "年卡·365天",
          money: 0.24,
          price: 88,
          origin_price: 188
        },
        {
          type: "season",
          discount: "7折",
          title: "季卡·90天",
          money: 0.33,
          price: 30,
          origin_price: 45
        }
      ],
      payList: [
        {
          type: "wechat",
          icon: "wx",
          text: "微信支付",
          checked: true
        },
        {
          type: "alipay",
          icon: "ali",
          text: "支付宝支付",
          checked: false
        },
        {
          type: "huabei",
          icon: "hb",
          text: "花呗支付",
          checked: false
        }
      ],
      radio: "year",
      radio2: "wechat"
    };
  },
  computed: {
    ...mapState(['userInfo'])
  },
  methods: {
    onChange(val) {
      console.log(val);
    },
    onPay() {
      this.$toast("支付成功");
    }
  }
};
</script>
<style lang='scss' scoped>
.pay-vip {
  .van-nav-bar {
    background-color: #303747;
    .van-nav-bar__left {
      .van-icon {
        color: #fff;
      }
    }
    .van-nav-bar__title {
      color: #fff;
    }
  }
  .avatar {
    display: flex;
    align-items: center;
    background-color:#303747;
    padding-left: 1rem;
    padding-bottom: 1rem;
    .icon {
      width: 2.4rem;
      border-radius: 50%;
      margin-right:0.5rem;
    }
    .text {
      display: flex;
      flex-direction: column;
      font-size: 0.9375rem;
      line-height: 1.3;
      color:#fff;
    }
  }
  .top-tip {
    margin: 1rem 0;
    font-size: 0.9375rem;
    font-weight: bolder;
    text-align: center;
  }
  .van-grid {
    justify-content: space-around;
    color: rgb(96, 184, 106);
  }
  .type-list {
    display: flex;
    align-items: center;
    .type-item {
      width: 35%;
      margin-left: 1rem;
      padding-bottom: 1rem;
      border-radius: 0.5rem;
      background-color: #f5f5f5;
      display: flex;
      flex-direction: column;
      .van-radio {
        position: absolute;
        top: 0;
        right: 1rem;
      }
      .discount {
        width: 2rem;
        padding: 0.2rem;
        border-radius: 0.5rem 0.2rem 0.2rem 0;
        background-color: #ed504a;
        color: #fff;
        box-sizing: border-box;
      }
      .title {
        margin-top: 0.2rem;
        padding-left: 0.5rem;
        font-size: 0.9375rem;
        color: #000;
      }
      .money {
        margin-bottom: 1.2rem;
        margin-top: 0.4rem;
        padding-left: 0.5rem;
        font-size: 0.8rem;
        color: grey;
      }
      .price {
        padding: 0 0.5rem;
        font-size: 1.5rem;
        color: #60b86a;
      }
      .origin-price {
        font-size: 0.8rem;
        color: grey;
        text-decoration: line-through;
      }
    }
    .type-item-checked {
      background-color: #ecfef0;
    }
  }
  .van-cell-group {
    .van-cell__title {
      .icon {
        width: 1.5rem;
        margin-right: 0.5rem;
      }
    }
  }
  .pay-button {
    position: fixed;
    bottom: 1rem;
    right: 2%;
    left: 2%;
    width: 96%;
  }
}
</style>