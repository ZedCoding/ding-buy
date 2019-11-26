<template>
  <div class="change-name">
    <van-nav-bar
      title="修改昵称"
      right-text="保存"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
      :class="{'nav-active':userInfo.user_name}"
    />
    <p class="tip">请输入新昵称，30天内限修改1次</p>
    <van-field v-model="userInfo.user_name" placeholder="请输入新昵称" clearable />
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "changeName",
  computed: {
    ...mapState(["userInfo"])
  },
  methods: {
    ...mapMutations(['CHANGE_USER_NAME']),
    onClickRight() {
      if (!this.userInfo.user_name) return;
      this.CHANGE_USER_NAME(this.userInfo.user_name);
      this.$router.back();
    }
  }
};
</script>
<style lang='scss' scoped>
.change-name {
  background-color: #f2f2f2;
  .van-nav-bar__text {
    color: grey;
  }
  .tip {
    margin: 10px 16px;
    font-size: 0.8rem;
    color: rgba(0, 0, 0, 0.5);
  }
  .van-field {
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }
  .nav-active {
    .van-nav-bar__text {
      color: #3bba63;
    }
  }
}
</style>