<template>
  <div class="head">
    <div class="search">
      <div class="search-top">
        <div class="address" @click="onAddressClick">
          <van-icon name="location-o" color="#fff" size="1.2rem" />
          <span class="text">{{computedAddress}}</span>
          <van-icon name="arrow-down" color="#fff" size="0.8rem" />
        </div>
      </div>
      <van-search
        v-model="value"
        placeholder="请输入搜索关键词"
        shape="round"
        @search="onSearch"
        background="#3bba63"
      />
    </div>
    <van-swipe :autoplay="3000" indicator-color="#75A342">
      <van-swipe-item v-for="item in swiperList" :key="item.cid">
        <img :src="item.icon_url" :alt="item.public_name" />
      </van-swipe-item>
    </van-swipe>
    <div class="tip-img">
      <img :src="tipImg" alt />
      <img :src="adImg" alt @click="getVip" />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    swiperList: {
      type: Array,
      default: () => []
    },
    tipImg: {
      type: String,
      default: ""
    },
    adImg: {
      type: String,
      default: ""
    },
    userInfo: {
      type: Object,
      default: {}
    },
    addressInfo: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      value: "" // 搜索字段
    };
  },
  computed: {
    computedAddress() {
      if (!this.addressInfo.length) {
        return "请选择地址";
      }
      let result = this.addressInfo.filter(
        address => address.isDefault === true
      )[0];
      return result.county;
    }
  },
  methods: {
    onAddressClick() {
      this.$router.push({ path: "/mine/myaddress" });
    },
    onSearch() {
      this.$toast("暂未实现");
    },
    getVip() {
      console.log(this.userInfo);
      if (!this.userInfo.token) {
        this.$router.push({ path: "/login" });
      } else {
        this.$router.push({ path: "/mine/myVip" });
      }
    }
  }
};
</script>
<style lang='scss' scoped>
$bg: "~@/assets/img/home_bg.png";
.head {
  width: 100%;
  height: 100%;
  background: url($bg) no-repeat;
  background-size: cover;
  .search {
    background-color: #3bba63;
    .search-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 8px;
      .address {
        display: flex;
        align-items: center;
        .text {
          margin: 0 2px;
          font-size: 0.9375rem;
          color: #fff;
        }
      }
    }
    .van-search {
      padding: 0 8px 8px;
    }
  }
  .van-swipe {
    width: 95%;
    height: 10rem;
    margin: 1rem auto;
    border-bottom-left-radius: 1rem;
    border-bottom-right-radius: 1rem;
  }
}
</style>