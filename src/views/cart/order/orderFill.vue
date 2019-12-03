<template>
  <div class="order-fill">
    <van-nav-bar title="填写订单" left-arrow @click-left="onClickLeft" fixed />
    <van-contact-card
      :type="cardType"
      :name="currentContact.name"
      :tel="currentContact.tel"
      @click="onContactClick"
    />
    <van-cell-group>
      <van-cell
        title="送达时间"
        label
        :value="deliveryTime"
        is-link
        @click="showPopup"
        :class="{'van-cell-valid':computeValid}"
      >
        <template slot="label">
          <span>超时10分钟可获赔300积分</span>
          <van-icon name="question-o" />
        </template>
      </van-cell>
      <van-cell is-link :value="computedCount" class="van-cell-img" @click="onDetailClick">
        <template slot="title">
          <div v-for="item in shopCartInfo" :key="item.id" class="item-img">
            <img :src="item.small_image" alt />
          </div>
        </template>
      </van-cell>
    </van-cell-group>
    <time-list :show.sync="showPop" @change="handleChange" />
    <van-radio-group v-model="radio">
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
    <van-cell-group>
      <van-coupon-cell :coupons="coupons" :chosen-coupon="chosenCoupon" @click="showList = true" />
      <van-popup v-model="showList" position="bottom">
        <van-coupon-list
          :coupons="coupons"
          :chosen-coupon="chosenCoupon"
          :disabled-coupons="disabledCoupons"
          @change="onChange"
          @exchange="onExchange"
        />
      </van-popup>
      <van-cell>
        <template slot="title">
          <div @click="showInfo = true">
            <span>使用800积分抵扣￥8.00</span>
            <van-icon name="question-o" />
          </div>
        </template>
        <template slot="right-icon">
          <van-switch v-model="pointsChecked" active-color="#07c160" size="20" />
        </template>
      </van-cell>
    </van-cell-group>
    <van-popup
      v-model="showInfo"
      position="bottom"
      closeable
      round
      safe-area-inset-bottom
      class="info-popup"
    >
      <div class="title">积分说明</div>
      <div class="wrap">
        <h2 class="subtitle">使用条件</h2>
        <ul class="ul">
          <li>1.积分数量大于100；</li>
          <li>2.商品金额≥5元。</li>
        </ul>
      </div>
      <div class="wrap">
        <h2 class="subtitle">使用规则</h2>
        <ul class="ul">
          <li>1.每100积分可抵用现金1元。</li>
        </ul>
      </div>
      <van-button type="primary" round size="small" @click="showInfo=false">确定</van-button>
    </van-popup>
    <van-cell-group>
      <van-cell title="备注" value="选填，可以告诉我们您的特殊需求" is-link class="van-cell-remarks" />
    </van-cell-group>
    <van-cell-group>
      <van-cell title="商品金额" :value="productPrice" />
      <van-cell title="配送费" value="￥6.00" />
      <van-cell title="优惠券" value="-￥1.50" v-if="chosenCoupon>-1" class="van-cell-discount" />
      <van-cell title="积分" value="-￥8.00" v-if="pointsChecked" class="van-cell-discount" />
    </van-cell-group>
    <van-submit-bar :price="actualPrice" label="实付：" button-text="提交订单" @submit="onSubmit" />
  </div>
</template>
<script>
import { mapState } from "vuex";
import TimeList from "./components/timelist";
export default {
  name: "orderFill",
  data() {
    const startAt = new Date().getTime() / 1000;
    const endAt = new Date().getTime() / 1000 + 7 * 24 * 60 * 60;
    const coupon = {
      available: 1,
      condition: "无使用门槛\n最多优惠1.5元",
      reason: "",
      value: 150,
      name: "优惠券1号",
      startAt,
      endAt,
      valueDesc: "1.5",
      unitDesc: "元"
    };
    return {
      deliveryTime: "请选择送达时间",
      showPop: false,
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
      radio: "wechat",
      showList: false,
      chosenCoupon: -1,
      coupons: [coupon],
      disabledCoupons: [coupon],
      pointsChecked: false, // 是否使用积分
      productPrice: null,
      showInfo: false
    };
  },
  computed: {
    ...mapState(["addressInfo", "shopCartInfo"]),
    cardType() {
      return this.addressInfo.length ? "edit" : "add";
    },
    currentContact() {
      if (!this.addressInfo.length) {
        return {};
      } else {
        let defaultArr = this.addressInfo.filter(
          item => (item.isDefault = true)
        );
        if (defaultArr.length) {
          return defaultArr[0];
        } else {
          return this.addressInfo[0];
        }
      }
    },
    computeValid() {
      return this.deliveryTime === "请选择送达时间" ? false : true;
    },
    computedCount() {
      let len = Object.keys(this.shopCartInfo).length;
      return `共${len}件`;
    },
    actualPrice() {
      let price = 0;
      Object.values(this.shopCartInfo).forEach(item => {
        if (item.checked) {
          price += item.number * item.price;
        }
      });
      this.productPrice = `￥${price.toFixed(2)}`;
      // 优惠券
      if (this.chosenCoupon > -1) {
        price -= this.coupons[this.chosenCoupon].value / 100;
      }
      // 积分
      if (this.pointsChecked) {
        price -= 8;
      }
      // 归零
      if(price < 0) {
        price = 0;
      }
      return price * 100;
    }
  },
  methods: {
    onContactClick() {
      this.$router.push({ path: "/mine/myaddress" });
    },
    showPopup() {
      this.showPop = true;
    },
    onDetailClick() {
      this.$router.push({ path: "/goodslist" });
    },
    handleChange(flag, data) {
      this.showPop = flag;
      if (!data) return;
      this.deliveryTime = data;
    },
    onChange(index) {
      this.showList = false;
      this.chosenCoupon = index;
    },
    onExchange(code) {
      this.coupons.push(coupon);
    },
    onSubmit() {
      if (this.cardType === "add") {
        this.$toast("请选择收货地址");
        return;
      }
      if (this.deliveryTime === "请选择送达时间") {
        this.$toast("请选择送达时间");
        return;
      }
      this.$toast("提交订单");
    }
  },
  components: {
    TimeList
  }
};
</script>
<style lang='scss' scoped>
.order-fill {
  padding-top: 46px;
  padding-bottom: 50px;
  background-color: #f2f2f2;
  .van-radio-group {
    margin-top: 10px;
    background-color: #fff;
  }
  .van-cell-group {
    margin-top: 10px;
    .van-cell__title {
      .icon {
        width: 1.5rem;
        margin-right: 0.5rem;
      }
    }
    .van-cell-img {
      align-items: center;
      .van-cell__title {
        flex: 4;
        overflow-x: auto;
        white-space: nowrap;
        -webkit-overflow-scrolling: touch;
        .item-img {
          display: inline-block;
          width: 3rem;
          height: 3rem;
        }
      }
    }
    .van-cell-remarks {
      .van-cell__value {
        flex: 2;
      }
    }
    .van-cell-discount {
      .van-cell__value {
        color: #ee0a24;
      }
    }
    .van-cell-valid {
      .van-cell__value {
        color: #3bba63;
      }
    }
  }
  .van-submit-bar__price {
    font-size: 1rem;
  }
  .info-popup {
    .title {
      height: 3rem;
      line-height: 3rem;
      text-align: center;
      margin-bottom: 1rem;
      border-bottom: 1px solid #f2f2f2;
    }
    .wrap {
      margin: 0 0 1rem 1rem;
      .subtitle {
        font-weight: 700;
      }
      .ul {
        line-height: 1.2rem;
      }
    }
    .van-button {
      width: 90%;
      margin: 0 5% 0.5rem;
    }
  }
}
</style>