<template>
  <div class="head">
    <div class="search">
      <div class="search-top">
        <div class="address" @click="onAddressClick">
          <van-icon name="location-o" color="#fff" size="1.2rem" />
          <span class="text">{{myAddress}}</span>
          <van-icon name="arrow-down" color="#fff" size="0.8rem" />
        </div>
      </div>
      <van-search
        v-model="value"
        placeholder="搜索一下"
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
    myAddress() {
      if (Object.keys(this.$route.params).length) {
        return this.$route.params.name;
      }
      if (!this.addressInfo.length) {
        return "请选择位置";
      }
      let temp = this.addressInfo.filter(address => address.isDefault === true);
      if (temp.length) {
        return temp[0].addressDetail || temp[0].county;
      } else {
        let _temp = this.addressInfo[0];
        return _temp[0].addressDetail || _temp[0].county;
      }
    }
  },
  methods: {
    onAddressClick() {
      this.$router.push({ path: "/dashboard/home/map" });
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
      padding: 0.6rem;
      .address {
        display: flex;
        align-items: center;
        padding: 0.3rem 0.5rem;
        border-radius: 0.6rem;
        background-color: rgba(0, 0, 0, 0.4);
        max-width: 8rem;
        box-sizing: border-box;
        .text {
          margin: 0 2px;
          font-size: 0.9375rem;
          color: #fff;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
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