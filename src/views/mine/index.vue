<template>
  <div class="mine">
    <header class="mine-header">
      <span class="text">我的</span>
    </header>
    <van-cell class="mine-info" is-link @click="onMineClick">
      <!-- 使用 title 插槽来自定义标题 -->
      <template slot="title">
        <div class="slot-content">
          <template v-if="!userInfo.token">
            <img :src="require('@/assets/img/default_grey.jpg')" class="slot-img" alt />
            <span>立即登录</span>
          </template>
          <template v-else>
            <img :src="require('@/assets/img/avatar.jpg')" class="slot-img" alt />
            <div class="slot-middle">
              <span>{{userInfo.user_name}}</span>
              <span>手机号：{{phoneNumber}}</span>
            </div>
          </template>
        </div>
      </template>
    </van-cell>
    <van-cell title="我的订单" icon="label" color="red" is-link value="查看全部订单" @click="getOrder(-1)" />
    <van-grid>
      <van-grid-item
        v-for="(item,index) in itemList"
        :key="item.text"
        :icon="item.icon"
        :text="item.text"
        @click="getOrder(index)"
      />
    </van-grid>
    <van-cell-group>
      <van-cell
        title="我的优惠券"
        icon="gold-coin"
        is-link
        value="2张"
        @click="checkClick('/mine/coupons')"
      />
      <van-cell title="我的收货地址" icon="todo-list" is-link @click="checkClick('/mine/myaddress')" />
      <van-cell icon="vip-card" is-link @click="checkClick('/mine/myVip')">
        <template slot="title">
          <span class="custom-title" style="margin-right:5px;">我的绿卡</span>
          <van-tag type="danger" round>new</van-tag>
        </template>
      </van-cell>
      <van-cell title="联系客服" icon="phone" is-link value="客服时间 09:00-21:00" @click="onPhoneClick" />
      <van-cell title="意见反馈" icon="comment" is-link @click="onCommentClick" />
    </van-cell-group>
    <div class="version">当前版本1.0.0</div>
    <van-dialog v-model="dialogShow" message="移动端vue + vant学习项目 哈哈哈哈~"></van-dialog>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "mine",
  data() {
    return {
      itemList: [
        {
          text: "待支付",
          icon: "cart-circle-o"
        },
        {
          text: "待收货",
          icon: "point-gift-o"
        },
        {
          text: "待评价",
          icon: "smile-comment-o"
        },
        {
          text: "售后/退款",
          icon: "cash-back-record"
        }
      ],
      dialogShow: false
    };
  },
  computed: {
    ...mapState(["userInfo"]),
    phoneNumber() {
      // 设置隐藏手机号中间四位
      var mobile = String(this.userInfo.phone);
      var reg = /^(\d{3})\d{4}(\d{4})$/;
      return mobile.replace(reg, "$1****$2");
    }
  },
  methods: {
    onMineClick() {
      if (this.userInfo.token) {
        this.$router.push({ path: "/mine/profile" });
      } else {
        this.$router.push({ path: "/login" });
      }
    },
    getOrder(index) {
      if (!this.userInfo.token) {
        this.$router.push({ path: "/login" });
        return;
      }
      if (index === -1) {
        this.$router.push({ path: "/mine/order" });
      }
      if (index === 3) {
        this.$toast("等待实现~");
        return;
      }
      this.$router.push({
        name: "Order",
        params: { activeIndex: index + 1 }
      });
    },
    checkClick(path) {
      if (!this.userInfo.token) {
        this.$router.push({ path: "/login" });
        return;
      }
      this.$router.push({ path });
    },
    onPhoneClick() {
      this.$toast("客服小姐姐还没上班~");
    },
    onCommentClick() {
      this.dialogShow = true;
    }
  }
};
</script>
<style lang='scss' scoped>
.mine {
  .default-img {
    width: 3.5rem;
    border-radius: 50%;
    margin-right: 0.8rem;
  }
  .mine-header {
    line-height: 2.5rem;
    text-align: center;
    color: #fff;
    background-color: #3bba63;
  }
  .mine-info {
    background-color: #3bba63;
    align-items: center;
    .slot-content {
      display: flex;
      align-items: center;
      color: #fff;
      .slot-img {
        width: 3.5rem;
        border-radius: 50%;
        margin-right: 0.8rem;
      }
      .slot-middle {
        display: flex;
        flex-direction: column;
      }
    }
    .van-cell__right-icon {
      color: #fff !important;
    }
  }
  .van-cell__left-icon {
    font-size: 1.2rem;
    color: #45c763;
  }
  .version {
    font-size: 0.75rem;
    line-height: 2rem;
    text-align: center;
    color: grey;
  }
}
</style>