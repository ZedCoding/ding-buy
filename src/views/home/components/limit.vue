<template>
  <div class="limit">
    <div class="header">
      <div class="title-wrapper">
        <span class="title">限时抢购</span>
        <van-count-down :time="time">
          <template v-slot="timeData">
            <span class="item">{{ timeData.hours }}</span>
            <span class="item">{{ timeData.minutes }}</span>
            <span class="item">{{ timeData.seconds }}</span>
          </template>
        </van-count-down>
      </div>
      <span class="more">更多</span>
    </div>
    <b-scroll class="limit-wrapper" :data="flashFoods" :probeType="2" :scrollX="true">
      <ul class="limit-content" ref="urlWrap">
        <li v-for="item in flashFoods" :key="item.id" class="content-item">
          <img :src="item.small_image" alt />
          <span class="title">{{item.name}}</span>
          <div class="price">
            <div>
              <p class="now-price">￥{{item.price}}</p>
              <p class="origin-price">￥{{item.origin_price}}</p>
            </div>
            <div class="buy-cart">
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
                <g data-v-da2028b6 stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
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
        </li>
      </ul>
    </b-scroll>
  </div>
</template>
<script>
import BScroll from "@/components/bscroll";
export default {
  name: "limit",
  props: {
    flashFoods: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      time: 24 * 60 * 60 * 1000 * 7,
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.urlWrap.style.width = 1300 + 'px';
    })
  },
  components: {
    BScroll
  }
};
</script>
<style lang='scss' scoped>
.limit {
  margin-top: 0.625rem;
  padding: 1.25rem 0 0.9375rem 0;
  .header {
    position: relative;
    margin: 0 0.625rem 0.625rem 0.625rem;
    line-height: 1.5625rem;
    display: flex;
    justify-content: space-between;
    .title-wrapper {
      display: flex;
      align-items: center;
      padding-left: 0.3125rem;
      border-left: 4px solid #3cb963;
      .title {
        font-size: 1.1875rem;
      }
      .van-count-down {
        margin-left: 0.5rem;
        .item {
          display: inline-block;
          width: 22px;
          margin-right: 5px;
          color: #fff;
          font-size: 12px;
          text-align: center;
          background-color: #000;
        }
      }
    }

    .more {
      font-size: 0.8rem;
      color: #3cb963;
    }
  }
  .limit-wrapper {
    width: 100%;
    overflow: hidden;
    .limit-content {
      display: flex;
      align-items: center;
      flex-wrap: nowrap;
      .content-item {
        flex: 0 0 6rem;
        .title {
          font-size: 0.625rem;
          padding: 0.2rem;
          line-height: 1.15rem;
          word-break: break-all;
          display: -webkit-box;
          overflow: hidden;
          text-overflow: ellipsis;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        .price {
          padding: 0 0.15rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .now-price {
            font-size: 0.928rem;
            color: #f37078;
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
}
</style>