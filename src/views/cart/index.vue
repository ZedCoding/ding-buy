<template>
  <div class="cart">
    <template v-if="!showLoading">
      <van-nav-bar
        title="购物车"
        :right-text="rightText"
        @click-right="onClickRight"
        fixed
        :class="{'nav-bar-disabled':rightTextDisabled}"
      />
      <div class="cart-empty" v-if="!totalCount">
        <img :src="require('@/assets/img/empty_cart.png')" alt />
        <p class="text">购物车还是空的</p>
        <van-button type="primary" to="home" round style="width:50%;">去逛逛</van-button>
      </div>
      <div class="cart-list" v-else>
        <div v-for="item in shopCartInfo" :key="item.id" class="cart-item">
          <div class="left">
            <van-checkbox v-model="item.checked" checked-color="#45C763" icon-size="16" />
          </div>
          <div class="center">
            <img :src="item.small_image" class="image" alt />
          </div>
          <div class="right">
            <span class="name">{{item.name}}</span>
            <div class="price">
              <span>￥{{item.price}}</span>
              <van-stepper v-model="item.number" :min="0" input-width="24" button-size="24" @change="onStepChange(item.id, $event)" />
            </div>
          </div>
        </div>
      </div>
      <van-divider :style="{color: '#999', borderColor: '#999',padding:'0 16px'}">猜你喜欢</van-divider>
      <div class="product-list">
        <div v-for="item in productList" :key="item.id" class="product-item">
          <img :src="item.small_image" v-lazy="item.small_image" alt />
          <p class="title text-overflow">{{item.product_name}}</p>
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
        </div>
      </div>
      <van-divider :style="{color: '#45C763', borderColor: '#45C763',padding:'0 64px'}">叮咚买菜</van-divider>
      <van-submit-bar
        :price="totalAmount"
        button-text="结算"
        @submit="onSubmit"
        :disabled="!checkedAll"
        v-if="totalCount"
      >
        <van-checkbox v-model="checkedAll" checked-color="#45C763" icon-size="16">全选</van-checkbox>
      </van-submit-bar>
      <van-dialog v-model="dialogShow" message="确定删除勾选商品吗？" showCancelButton @confirm="onConfirm"></van-dialog>
      <scroll-top />
    </template>
    <loading :show="showLoading" />
  </div>
</template>
<script>
import { mapMutations, mapState } from "vuex";
export default {
  name: "cart",
  data() {
    return {
      showLoading: true,
      productList: [],
      dialogShow: false,
    };
  },
  created() {
    this.getList();
  },
  computed: {
    ...mapState(["shopCartInfo"]),
    totalCount() {
      return Object.keys(this.shopCartInfo).length;
    },
    rightText() {
      return this.totalCount > 0 ? "删除" : "";
    },
    totalAmount() {
      let amount = 0;
      Object.values(this.shopCartInfo).forEach(item => {
        if (item.checked) {
          amount += item.number * item.price;
        }
      });
      return amount * 100;
    },
    checkedAll: {
      get() {
        return Object.values(this.shopCartInfo).every(
          item => item.checked === true
        );
      },
      set(value) {
        this.SELECT_ALL_GOODS(value);
      }
    },
    // 右上角删除文字状态
    rightTextDisabled() {
      return Object.values(this.shopCartInfo).every(
        item => item.checked !== true
      );
    }
  },
  methods: {
    ...mapMutations(["ADD_GOODS", "CLEAR_CART", "SELECT_ALL_GOODS","REMOVE_GOODS"]),
    async getList() {
      let res = await this.$http("/api/cart/youlike");
      this.showLoading = false;
      if (res.data.code !== 0) return;
      this.productList = res.data.data.product_list;
    },
    addCart({ id, name, small_image, price }) {
      this.ADD_GOODS({ id, name, small_image, price });
      this.$toast("添加成功");
    },
    onClickRight() {
      if (this.rightTextDisabled) return;
      this.dialogShow = true;
    },
    onConfirm() {
      this.CLEAR_CART();
    },
    onStepChange(id, value) {
      value === 0 && this.REMOVE_GOODS(id);
    },
    onSubmit() {
      this.$toast("结算成功啦");
      this.CLEAR_CART();
    }
  }
};
</script>
<style lang='scss' scoped>
.cart {
  padding-top: 46px;
  padding-bottom: 100px !important;
  .van-nav-bar {
    .van-nav-bar__text {
      color: #45c763;
    }
  }
  .nav-bar-disabled {
    .van-nav-bar__text {
      color: grey;
    }
  }
  .cart-empty {
    width: 100%;
    margin: 2rem 0;
    text-align: center;
    img {
      width: 50%;
    }
    .text {
      margin: 2rem 0;
      color: grey;
    }
  }
  .cart-list {
    .cart-item {
      display: flex;
      justify-content: center;
      align-items: center;
      .left {
        flex: 1;
        .van-checkbox {
          justify-content: center;
        }
      }
      .center {
        flex: 3;
      }
      .right {
        flex: 6;
        padding-left: 0.5rem;
        .name {
          display: block;
          height: 2.4rem;
          line-height: 1.2rem;
          font-size: 0.9375rem;
          margin-bottom: 0.5rem;
          overflow: hidden;
        }
        .price {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-right: 0.8rem;
        }
      }
    }
  }
  .product-list {
    width: 100%;
    overflow: hidden;
    .product-item {
      width: 48%;
      margin-right: 2%;
      display: inline-block;
      padding: 0 0.5rem;
      box-sizing: border-box;
      .title {
        font-size: 0.625rem;
        padding-left: 0.5rem;
      }
      .spec {
        font-size: 0.45rem;
        color: grey;
        padding: 0.5rem 0 0.5rem 0.5rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .text-overflow {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
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
  .van-submit-bar {
    bottom: 50px;
    .van-checkbox {
      margin-left: 0.8rem;
    }
  }
}
</style>