<template>
  <div class="home">
    <template v-if="!showLoading">
      <Header
        :swiperList="swiperList"
        :tipImg="tipImg"
        :adImg="adImg"
        v-if="flag"
        :userInfo="userInfo"
        :addressInfo="addressInfo"
      />
      <div class="category">
        <template v-for="item in categoryList">
          <div class="category-item" :key="item.name">
            <img :src="item.icon_url" class="item-icon" alt />
            <span class="item-text">{{item.name}}</span>
          </div>
        </template>
      </div>
      <div class="vip-panel" @click="onVipClick">
        <svg
          data-v-389090ce
          t="1573098700994"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="2324"
          width="32"
          height="32"
          class="icon"
        >
          <path
            data-v-389090ce
            d="M194.38562 786.988463L120.219765 404.58321l179.981649 39.013924L511.997 189.23963l211.799586 254.357504 179.981649-39.013924-74.165855 382.405253z"
            fill="#CFEB70"
            p-id="2325"
          />
          <path
            data-v-389090ce
            d="M108.973787 384.285249m-83.293837 0a83.293837 83.293837 0 1 0 166.587674 0 83.293837 83.293837 0 1 0-166.587674 0Z"
            fill="#FECC85"
            p-id="2326"
          />
          <path
            data-v-389090ce
            d="M915.032213 384.285249m-83.293837 0a83.293837 83.293837 0 1 0 166.587674 0 83.293837 83.293837 0 1 0-166.587674 0Z"
            fill="#FECC85"
            p-id="2327"
          />
          <path
            data-v-389090ce
            d="M512.003 155.907695m-83.293837 0a83.293837 83.293837 0 1 0 166.587674 0 83.293837 83.293837 0 1 0-166.587674 0Z"
            fill="#FECC85"
            p-id="2328"
          />
          <path
            data-v-389090ce
            d="M194.885619 786.980463h634.226762v164.411679H194.885619z"
            fill="#FECC85"
            p-id="2329"
          />
          <path
            data-v-389090ce
            d="M587.264853 460.5671c-42.171918 0-75.259853 47.021908-75.259853 47.021909s-31.209939-47.021908-75.277853-47.021909c-42.863916 0-77.865848 35.351931-80.155843 78.155848-1.287997 24.181953 6.505987 42.585917 17.487965 59.251884 21.947957 33.299935 117.90177 113.471778 138.087731 113.471778 20.60396 0 115.701774-79.879844 137.793731-113.471778 11.005979-16.743967 18.779963-35.071932 17.483965-59.251884-2.289996-42.799916-37.293927-78.155847-80.159843-78.155848"
            fill="#FF5E8A"
            p-id="2330"
          />
          <path
            data-v-389090ce
            d="M512.147 737.12856c-7.225986 0-24.149953 0-84.749835-50.141902-27.031947-22.363956-60.871881-53.781895-74.773854-74.877854-10.19998-15.47597-23.537954-40.061922-21.689957-74.751854 3.075994-57.457888 49.545903-102.4638 105.797793-102.463799 32.355937 0 58.537886 17.963965 75.461853 33.993933 17.097967-16.017969 43.355915-33.993934 75.075853-33.993933 56.25389 0 102.723799 45.007912 105.799793 102.461799 1.855996 34.611932-11.477978 59.223884-21.665957 74.731855-14.019973 21.317958-47.681907 52.709897-74.511855 74.985853-60.301882 50.055902-77.431849 50.055902-84.743834 50.055902z m-3.247994-50.9979z m-72.171859-199.88561c-28.469944 0-52.925897 24.157953-54.515894 53.851895-0.815998 15.29397 3.157994 28.381945 13.287975 43.753915 17.741965 26.917947 92.847819 89.787825 116.705772 100.975802 23.653954-11.041978 98.459808-73.855856 116.283772-100.957802 10.26998-15.627969 14.125972-28.309945 13.295975-43.769915-1.589997-29.695942-26.045949-53.855895-54.517894-53.855895-23.543954 0-47.667907 26.749948-54.261894 36.11993-4.88199 6.931986-12.797975 11.087978-21.347958 10.897978a25.66795 25.66795 0 0 1-21.041959-11.475977c-6.645987-9.815981-29.405943-35.539931-53.887895-35.539931zM612.340804 894.634253H335.039346c-14.181972 0-25.67795-11.497978-25.67795-25.67795s11.495978-25.67795 25.67795-25.67795h277.303458c14.181972 0 25.67795 11.497978 25.67795 25.67795s-11.497978 25.67795-25.67995 25.67795zM688.964654 894.640253a25.81195 25.81195 0 0 1-18.153964-7.523986 25.341951 25.341951 0 0 1-5.571989-8.345983 25.259951 25.259951 0 0 1-1.951996-9.809981c0-1.665997 0.154-3.363993 0.487999-5.03199 0.333999-1.617997 0.821998-3.235994 1.463997-4.801991a26.079949 26.079949 0 0 1 5.545989-8.317984 26.089949 26.089949 0 0 1 8.343984-5.573989 26.993947 26.993947 0 0 1 4.80199-1.459997c8.345984-1.669997 17.229966 1.051998 23.185955 7.035986 1.181998 1.181998 2.259996 2.489995 3.183994 3.901993 0.923998 1.385997 1.719997 2.875994 2.361995 4.415991 0.641999 1.565997 1.129998 3.157994 1.463997 4.801991 0.333999 1.669997 0.513999 3.365993 0.513999 5.03199a26.007949 26.007949 0 0 1-4.339991 14.249972 24.489952 24.489952 0 0 1-3.183994 3.905992 25.85195 25.85195 0 0 1-18.151965 7.521986z"
            fill
            p-id="2331"
          />
          <path
            data-v-389090ce
            d="M915.026213 275.325462c-60.087883 0-108.971787 48.883905-108.971787 108.971787 0 5.08199 0.377999 10.06998 1.051998 14.967971l-73.541857 15.939969-148.58771-178.445651c22.087957-19.955961 35.99193-48.803905 35.99193-80.847843 0-60.087883-48.883905-108.971787-108.971787-108.971787s-108.971787 48.883905-108.971787 108.971787c0 32.041937 13.903973 60.889881 35.99193 80.847843l-148.58771 178.449651-73.541857-15.939969c0.675999-4.89599 1.051998-9.887981 1.051998-14.967971 0-60.087883-48.883905-108.971787-108.971787-108.971787S0 324.209367 0 384.295249c0 60.083883 48.883905 108.969787 108.971787 108.969788 0.765999 0 1.519997-0.044 2.281996-0.056L169.17967 791.874453c0.008 0.044 0.02 0.082 0.03 0.126v159.383689c0 14.177972 11.495978 25.67795 25.677949 25.67795h634.226762c14.181972 0 25.67795-11.497978 25.677949-25.67795v-159.383689c0.008-0.044 0.02-0.082 0.03-0.126l57.925887-298.667416c0.761999 0.016 1.517997 0.056 2.281996 0.056 60.087883 0 108.971787-48.883905 108.971787-108.969788-0.004-60.083883-48.887905-108.967787-108.975787-108.967787zM511.997 98.291808c31.769938 0 57.617887 25.84595 57.617887 57.617887s-25.84595 57.613887-57.617887 57.613888S454.379113 187.679633 454.379113 155.909695s25.84795-57.617887 57.617887-57.617887zM51.3539 384.295249c0-31.769938 25.84595-57.617887 57.617887-57.617887s57.617887 25.84595 57.617888 57.617887-25.84595 57.613887-57.617888 57.613888-57.617887-25.84195-57.617887-57.613888z m752.080531 541.414943H220.561569v-113.043779h582.872862v113.043779z m5.00199-164.401679H215.561579L161.005686 480.015062a109.777786 109.777786 0 0 0 36.561928-32.391936l97.19781 21.067959a25.70595 25.70595 0 0 0 25.171951-8.665983l165.275677-198.487613a108.871787 108.871787 0 0 0 26.789948 3.339994c9.241982 0 18.211964-1.165998 26.789948-3.339994l165.275677 198.487613a25.69595 25.69595 0 0 0 25.171951 8.665983l97.19781-21.067959a109.733786 109.733786 0 0 0 36.561928 32.391936l-54.563893 281.293451z m106.589792-319.395376c-31.769938 0-57.617887-25.84395-57.617888-57.613888s25.84595-57.617887 57.617888-57.617887c31.769938 0 57.617887 25.84595 57.617887 57.617887s-25.84795 57.613887-57.617887 57.613888z"
            fill
            p-id="2332"
          />
        </svg>
        <span class="title">加入会员·每年预计节省806元</span>
        <span class="sub-title">5折开卡></span>
      </div>
      <Limit :flashFoods="flashFoods" v-if="flag" />
      <Special :specialZone="specialZone" v-if="flag" />
      <van-tabs
        v-model="activeName"
        color="#3bba63"
        title-active-color="#3bba63"
        title-inactive-color="#7d7e80"
        @click="onClick"
        @change="onChange"
        swipeable
        animated
        sticky
      >
        <van-tab v-for="tab in tabs" :key="tab.title" :title="tab.title" :name="tab.name">
          <div class="product-list">
            <div v-for="item in productList" :key="item.id" class="product-item">
              <img :src="item.small_image" v-lazy="item.small_image" alt />
              <p class="title text-overflow">{{item.name}}</p>
              <p class="spec text-overflow">{{item.spec}}</p>
              <div class="price">
                <div>
                  <span class="now-price">￥{{item.price}}</span>
                  <span class="origin-price">￥{{item.origin_price}}</span>
                </div>
                <div class="buy-cart" @click="addCart(item)">
                  <svg data-v-da2028b6 viewBox="0 0 52 52" class="icon icon-60">
                    <defs data-v-da2028b6>
                      <radialGradient
                        data-v-da2028b6
                        cx="27.0288363%"
                        cy="10.3693483%"
                        fx="27.0288363%"
                        fy="10.3693483%"
                        r="93.8427229%"
                        id="radialGradient-1"
                      >
                        <stop data-v-da2028b6 stop-color="#4ECA75" offset="0%" />
                        <stop data-v-da2028b6 stop-color="#39B460" offset="100%" />
                      </radialGradient>
                    </defs>
                    <g
                      data-v-da2028b6
                      stroke="none"
                      stroke-width="1"
                      fill="none"
                      fill-rule="evenodd"
                    >
                      <g data-v-da2028b6 transform="translate(-678.000000, -2742.000000)">
                        <g data-v-da2028b6 transform="translate(678.000000, 2742.000000)">
                          <rect
                            data-v-da2028b6
                            fill="url(#radialGradient-1)"
                            x="0"
                            y="0"
                            width="51.8699976"
                            height="51.8699976"
                            rx="25.9349988"
                          />
                          <path
                            data-v-da2028b6
                            fill="#FFFFFF"
                            d="M20.3666667,39 C19.1700497,39 18.2,38.0299503 18.2,36.8333333 C18.2,35.6367164 19.1700497,34.6666667 20.3666667,34.6666667 C21.5632836,34.6666667 22.5333333,35.6367164 22.5333333,36.8333333 C22.5333333,38.0299503 21.5632836,39 20.3666667,39 Z M33.3666667,38.1333333 C32.1700497,38.1333333 31.2,37.1632836 31.2,35.9666667 C31.2,34.7700497 32.1700497,33.8 33.3666667,33.8 C34.5632836,33.8 35.5333333,34.7700497 35.5333333,35.9666667 C35.5333333,37.1632836 34.5632836,38.1333333 33.3666667,38.1333333 Z"
                          />
                          <path
                            data-v-da2028b6
                            stroke="#FFFFFF"
                            stroke-width="2.6"
                            stroke-linecap="round"
                            d="M12.1333333,13.8666667 L13.6768756,13.8666667 C15.4621209,13.8666667 16.9554584,15.222463 17.1274221,16.9994069 L18.2224287,28.314386 C18.4068512,30.2200702 20.1012175,31.6154285 22.0069016,31.431006 C22.0111286,31.4305969 22.0153548,31.4301801 22.0195802,31.4297555 L33.2997819,30.296256 C34.7947282,30.1460352 36.0227397,29.0499108 36.3411182,27.581556 L37.8958814,20.4110205 C38.0987345,19.4754663 37.5047629,18.5526049 36.5692087,18.3497518 C36.3853963,18.3098964 36.1963225,18.3002236 36.0094025,18.3211126 L22.8968424,19.7864909"
                          />
                        </g>
                      </g>
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </van-tab>
      </van-tabs>
      <scroll-top />
      <van-divider>我是有底线的</van-divider>
    </template>
    <loading :show="showLoading" />
  </div>
</template>
<script>
import Header from "./components/header";
import Limit from "./components/limit";
import Special from "./components/special";
import { mapState, mapMutations } from "vuex";
export default {
  name: "home",
  data() {
    return {
      showLoading: true,
      flag: false,
      swiperList: [], // 轮播
      tipImg: "",
      adImg: "",
      categoryList: [], // 类目
      flashFoods: [], // 限时购
      specialZone: {}, // 特殊专区
      activeName: "all",
      tabs: [
        {
          id: 0,
          name: "all",
          title: "全部"
        },
        {
          id: 1,
          name: "dinner",
          title: "晚餐"
        },
        {
          id: 2,
          name: "popular",
          title: "人气"
        },
        {
          id: 3,
          name: "heart",
          title: "心选"
        }
      ],
      productList: []
    };
  },
  created() {
    this.getHomeData();
  },
  computed: {
    ...mapState(["userInfo","addressInfo"])
  },
  methods: {
    ...mapMutations(['ADD_GOODS']),
    async getHomeData() {
      let res = await this.$http("/api/homeApi");
      this.showLoading = false;
      if (res.data.code !== 0) return;
      const { home_ad, list, special_zone } = res.data.data;
      this.adImg = home_ad.image_url;
      this.swiperList = list[0].icon_list;
      this.tipImg = list[1].image_url;
      this.categoryList = list[2].icon_list;
      this.flashFoods = list[3].product_list;
      this.specialZone = special_zone;
      this.productList = list[12].product_list;
      this.flag = true;
    },
    onVipClick() {
      if (!this.userInfo.token) {
        this.$router.push({ path: "/login" });
      } else {
        this.$router.push({ path: "/mine/myVip" });
      }
    },
    onClick() {
      this.shuffle(this.productList);
    },
    onChange() {
      this.shuffle(this.productList);
    },
    // 数组洗牌
    shuffle(array) {
      let m = array.length,
        t,
        i;
      while (m) {
        i = Math.floor(Math.random() * m--);
        t = array[m];
        array[m] = array[i];
        array[i] = t;
      }
      return array;
    },
    addCart({ id, name, small_image, price }) {
      this.ADD_GOODS({ id, name, small_image, price });
      this.$toast("成功加入购物车");
    },
  },
  components: {
    Header,
    Limit,
    Special
  }
};
</script>
<style lang='scss' scoped>
.home {
  .category {
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
    .category-item {
      width: 20%;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 16px 8px;
      box-sizing: border-box;
      .item-icon {
        width: 28px;
        height: 28px;
      }
      .item-text {
        margin-top: 8px;
        font-size: 12px;
        color: #7d7e80;
      }
    }
  }
  .vip-panel {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 95%;
    margin: 0.5rem auto;
    border-radius: 0.2rem;
    font-size: 12px;
    color: #fff;
    background-color: #3bba63;
  }
  .product-list {
    width: 100%;
    overflow: hidden;
    .product-item {
      width: 48%;
      margin-right: 2%;
      margin-top: 1rem;
      display: inline-block;
      padding: 0 0.5rem;
      box-sizing: border-box;
      .title {
        font-size: 0.625rem;
        padding-left: 0.5rem;
      }
      .spec {
        font-size: 0.45rem;
        padding: 0.5rem 0 0.5rem 0.5rem;
        color: grey;
      }
      .text-overflow {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .price {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .now-price {
          font-size: 0.928rem;
          color: #f37078;
          margin-right: 0.5rem;
        }
        .origin-price {
          font-size: 0.6875rem;
          color: #999;
          text-decoration: line-through;
        }
        .buy-cart {
          width: 1.5rem;
          height: 1.5rem;
        }
      }
    }
  }
}
</style>