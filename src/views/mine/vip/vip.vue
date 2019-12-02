<template>
  <div class="vip">
    <template v-if="!showLoading">
      <van-nav-bar title="绿卡" left-arrow :border="false" @click-left="onClickLeft" fixed />
      <div class="vip-header">
        <img :src="banner" alt />
      </div>
      <div class="vip-privilege">
        <span class="title">绿卡特权</span>
        <van-grid :border="false">
          <van-grid-item icon="vip-card-o" text="专项券" />
          <van-grid-item icon="discount" text="专项特权" />
          <van-grid-item icon="gem-o" text="2倍积分" />
          <van-grid-item icon="more-o" text="更多特权" />
        </van-grid>
      </div>
      <van-button class="open-button" round @click="getPay">5折开通绿卡</van-button>
      <div class="coupon-floor">
        <div class="floor-title">
          <span class="number">1</span>
          <span class="desc">绿卡专享券 天天领取优惠</span>
        </div>
        <div class="ticket-wrap">
          <span class="ticket-title">
            今日专享券
            <span style="padding-left:0.4rem;color:grey;">{{todayTicket.notice}}</span>
          </span>
          <div class="ticket-list">
            <div v-for="item in todayTicket.tickets" :key="item.id" class="ticket-item">
              <div class="item-left">
                <span class="money">
                  ￥
                  <span style="font-size:1.8rem;">{{item.money}}</span>
                </span>
                <span class="tip">满{{item.pay_min}}元使用</span>
                <span class="desc">{{item.description}}</span>
              </div>
              <div class="item-right">立即领取</div>
            </div>
          </div>
        </div>
        <div class="ticket-wrap">
          <span class="ticket-title">
            本周专享券
            <span style="padding-left:0.4rem;color:grey;">{{weekTicket.notice}}</span>
          </span>
          <div class="ticket-list">
            <div v-for="item in weekTicket.tickets" :key="item.id" class="ticket-item">
              <div class="item-left">
                <span class="money">
                  ￥
                  <span style="font-size:1.6rem;">{{item.money}}</span>
                </span>
                <span class="tip">满{{item.pay_min}}元使用</span>
                <span class="desc">{{item.description}}</span>
              </div>
              <div class="item-right">立即领取</div>
            </div>
          </div>
        </div>
      </div>
      <div class="coupon-floor" ref="scrollFloor">
        <div class="floor-title">
          <span class="number">2</span>
          <span class="desc">绿卡专享券 天天领取优惠</span>
        </div>
        <van-button class="open-button" round style="margin-top:1rem;" @click="getPay">立即开启积分加速</van-button>
      </div>
      <div class="coupon-floor">
        <div class="floor-title">
          <span class="number">3</span>
          <span class="desc">绿卡专享特价</span>
        </div>
        <div v-for="cate in cateList" :key="cate.id" class="cate-item">
          <img :src="cate.small_image" class="cate-img" alt />
          <div class="cate-content">
            <span class="name">{{cate.name}}</span>
            <span class="spec">{{cate.spec}}</span>
            <div class="price-wrap">
              <div class="price">
                <p class="origin-price">￥{{cate.origin_price}}</p>
                <p class="now-price">
                  ￥{{cate.price}}
                  <span class="label">绿卡价格</span>
                </p>
              </div>
              <div class="cart">
                <svg data-v-dd2b8fe2 viewBox="0 0 52 52" class="icon iconCart">
                  <defs data-v-dd2b8fe2>
                    <radialGradient
                      data-v-dd2b8fe2
                      cx="27.0288363%"
                      cy="10.3693483%"
                      fx="27.0288363%"
                      fy="10.3693483%"
                      r="93.8427229%"
                      id="radialGradient-1"
                    >
                      <stop data-v-dd2b8fe2 stop-color="#d7d7d7" offset="0%" />
                      <stop data-v-dd2b8fe2 stop-color="#d7d7d7" offset="100%" />
                    </radialGradient>
                  </defs>
                  <g
                    data-v-dd2b8fe2
                    stroke="none"
                    stroke-width="1"
                    fill="none"
                    fill-rule="evenodd"
                  >
                    <g data-v-dd2b8fe2 transform="translate(-678.000000, -2742.000000)">
                      <g data-v-dd2b8fe2 transform="translate(678.000000, 2742.000000)">
                        <rect
                          data-v-dd2b8fe2
                          fill="url(#radialGradient-1)"
                          x="0"
                          y="0"
                          width="51.8699976"
                          height="51.8699976"
                          rx="25.9349988"
                        />
                        <path
                          data-v-dd2b8fe2
                          fill="#FFFFFF"
                          d="M20.3666667,39 C19.1700497,39 18.2,38.0299503 18.2,36.8333333 C18.2,35.6367164 19.1700497,34.6666667 20.3666667,34.6666667 C21.5632836,34.6666667 22.5333333,35.6367164 22.5333333,36.8333333 C22.5333333,38.0299503 21.5632836,39 20.3666667,39 Z M33.3666667,38.1333333 C32.1700497,38.1333333 31.2,37.1632836 31.2,35.9666667 C31.2,34.7700497 32.1700497,33.8 33.3666667,33.8 C34.5632836,33.8 35.5333333,34.7700497 35.5333333,35.9666667 C35.5333333,37.1632836 34.5632836,38.1333333 33.3666667,38.1333333 Z"
                        />
                        <path
                          data-v-dd2b8fe2
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
        <p class="bottom-tip">更多特权敬请期待...</p>
      </div>
      <div style="height:4rem;"></div>
      <div class="button-fixed" v-show="showButton">
        <div class="fixed-left">
          <span>年卡</span>
          <span class="now-price">88元</span>
          <span class="origin-price">180元</span>
        </div>
        <div class="fixed-right" @click="getPay">开通绿卡</div>
      </div>
    </template>
    <loading :show="showLoading" />
  </div>
</template>
<script>
export default {
  name: "vip",
  data() {
    return {
      showLoading: true,
      banner: "",
      todayTicket: {},
      weekTicket: {},
      cateList: [],
      showButton: false,
      scrollTop: 0
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      let res = await this.$http("/api/vip");
      this.showLoading = false;
      if (res.data.code === 0) {
        const {
          load_banner,
          today_ticket,
          week_ticket,
          cate_detail
        } = res.data.data;
        this.banner = load_banner;
        this.todayTicket = today_ticket;
        this.weekTicket = week_ticket;
        this.cateList = cate_detail;
      }
    },
    getPay() {
      this.$router.push({ path: "/mine/myVip/pay" });
    },
    scrollToTop() {
      let scrollTop =
        document.documentElement.scrollTop ||
        window.pageYOffset ||
        document.body.scrollTop;
      let validTop = this.$refs.scrollFloor && this.$refs.scrollFloor.getBoundingClientRect().top;
      this.showButton = scrollTop > validTop ? true : false;
    }
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener("scroll", this.scrollToTop);
    });
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.scrollToTop);
  }
};
</script>
<style lang='scss' scoped>
.vip {
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
  .vip-header {
    margin-top: 46px;
  }
  .vip-privilege {
    .title {
      padding-left: 1rem;
      font-size: 1.2rem;
      color: #000;
      font-weight: bolder;
    }
  }
  .open-button {
    width: 60%;
    margin: 0 20%;
    height: 2.8rem;
    line-height: 2.8rem;
    text-align: center;
    background-color: #303747;
    color: #5fa85f;
    font-weight: bolder;
  }
  .coupon-floor {
    margin-top: 2rem;
    padding: 1rem;
    .floor-title {
      display: flex;
      align-items: center;
      .number {
        width: 1.5rem;
        height: 1.5rem;
        line-height: 1.5rem;
        text-align: center;
        border-radius: 0.1rem;
        color: #fff;
        background-color: #60b86a;
      }
      .desc {
        margin-left: 0.5rem;
        font-size: 1.2rem;
        font-weight: bolder;
      }
    }
    .ticket-wrap {
      width: 100%;
      overflow: hidden;
      .ticket-title {
        display: inline-block;
        margin-top: 0.8rem;
        font-size: 0.75rem;
      }
      .ticket-list {
        display: flex;
        flex-wrap: wrap;
        .ticket-item {
          width: 45%;
          border-top: 1px solid #60b86a;
          border-right: 1px solid #60b86a;
          border-bottom: 1px solid #60b86a;
          border-left: 2px dashed #60b86a;
          border-radius: 0 2px 2px 0;
          margin-top: 0.8rem;
          margin-right: 5%;
          position: relative;
          box-sizing: border-box;
          .item-left {
            display: flex;
            flex-direction: column;
            margin: 0.3rem 1.2rem 0.3rem 0.3rem;
            font-size: 0.75rem;
            color: #60b86a;
            .tip {
              margin: 0.3rem 0;
              color: #565656;
            }
            .desc {
              word-break: break-all;
              display: -webkit-box;
              overflow: hidden;
              text-overflow: ellipsis;
              -webkit-line-clamp: 1;
              -webkit-box-orient: vertical;
            }
          }
          .item-right {
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            width: 1.4rem;
            line-height: 1.5rem;
            text-align: center;
            writing-mode: vertical-rl;
            font-size: 0.75rem;
            color: #fff;
            background-color: #60b86a;
            border-radius: 0 2px 2px 0;
          }
        }
      }
    }
    .cate-item {
      display: flex;
      align-items: center;
      padding: 1rem 0;
      border-bottom: 1px solid rgba(7, 17, 27, 0.1);
      .cate-img {
        width: 4.8rem;
        height: 4.8rem;
        margin-right: 0.4rem;
      }
      .cate-content {
        flex: 1;
        display: flex;
        flex-direction: column;
        .name {
          margin-bottom: 0.5rem;
          font-size: 1rem;
          color: #07111b;
        }
        .spec {
          margin-bottom: 0.5rem;
          font-size: 0.8rem;
          color: #93999f;
        }
        .price-wrap {
          display: flex;
          justify-content: space-between;
          align-items: center;
          .price {
            .origin-price {
              margin-bottom: 0.5rem;
              font-size: 0.8rem;
              color: #8f8f8f;
            }
            .now-price {
              font-size: 0.9375rem;
              color: #5fa85f;
              .label {
                display: inline-block;
                padding: 0.2rem 0.4rem;
                font-size: 0.8rem;
                border: 1px solid #5fa85f;
                border-top-right-radius: 0.5rem;
                border-bottom-right-radius: 0.5rem;
              }
            }
          }
          .cart {
            width: 1.8rem;
            margin-top: 1.1rem;
          }
        }
      }
    }
    .bottom-tip {
      padding-top: 1rem;
      font-size: 0.8rem;
      color: grey;
      text-align: center;
    }
  }
  .button-fixed {
    position: fixed;
    bottom: 1rem;
    right: 1rem;
    left: 1rem;
    display: flex;
    align-items: center;
    height: 3rem;
    line-height: 3rem;
    color: #fff;
    font-size: 1rem;
    .fixed-left {
      width: 70%;
      height: 100%;
      padding-left: 1.5rem;
      box-sizing: border-box;
      border-top-left-radius: 2rem;
      border-bottom-left-radius: 2rem;
      background-color: #303747;
      .now-price {
        margin: 0 0.2rem;
        color: #f2525a;
      }
      .origin-price {
        font-size: 0.8rem;
        text-decoration: line-through;
      }
    }
    .fixed-right {
      width: 30%;
      height: 100%;
      text-align: center;
      border-top-right-radius: 2rem;
      border-bottom-right-radius: 2rem;
      background-color: #3cb963;
    }
  }
}
</style>