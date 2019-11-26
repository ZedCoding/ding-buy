<template>
  <div class="coupon">
    <van-nav-bar title="我的优惠券" left-arrow @click-left="onClickLeft" />
    <van-coupon-list
      :coupons="coupons"
      :chosen-coupon="chosenCoupon"
      :disabled-coupons="disabledCoupons"
      :show-close-button="false"
      input-placeholder="请输入666兑换码"
      @change="onChange"
      @exchange="onExchange"
    />
  </div>
</template>
<script>
const startAt = new Date().getTime() / 1000;
const endAt = new Date().getTime() / 1000 + 7 * 24 * 60 * 60;
const coupon = {
  available: 1,
  condition: "无使用门槛\n最多优惠1.5元",
  reason: "",
  value: 150,
  name: "优惠券1",
  startAt,
  endAt,
  valueDesc: "1.5",
  unitDesc: "元"
};
const coupon2 = {
  available: 1,
  condition: "无使用门槛\n最多优惠2.0元",
  reason: "",
  value: 150,
  name: "优惠券2",
  startAt,
  endAt,
  valueDesc: "2.0",
  unitDesc: "元"
};
export default {
  name: "coupon",
  data() {
    return {
      chosenCoupon: -1,
      coupons: [coupon, coupon2],
      disabledCoupons: []
    };
  },
  methods: {
    onChange(index) {
      this.chosenCoupon = index;
      this.$toast(`当前选中第${index + 1}张优惠券`);
    },
    onExchange(code) {
      if (code !== "666") {
        this.$toast("兑换码不对哦");
        return;
      }
      this.$toast("兑换成功");
      this.coupons.push(coupon);
    }
  }
};
</script>
<style lang='scss' scoped>
</style>