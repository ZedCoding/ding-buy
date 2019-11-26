<template>
  <div class="profile">
    <van-nav-bar title="个人资料" left-arrow @click-left="onClickLeft" />
    <van-cell-group>
      <van-cell title="头像" style="align-items:center;" is-link>
        <template slot="right-icon">
          <img
            :src="require('@/assets/img/avatar.jpg')"
            style="width:2.5rem;border-radius:50%;"
            alt
          />
        </template>
      </van-cell>
      <van-cell title="昵称" :value="userInfo.user_name" is-link to="/profile/changeName" />
      <van-cell title="性别" :value="userInfo.sex||'未填写'" is-link @click="onSexClick" />
      <van-cell title="生日" :value="userInfo.birth_day||'未填写'" is-link @click="onDateClick" />
      <van-cell title="手机号" :value="phoneNumber" is-link />
    </van-cell-group>
    <div class="button-wrap" @click="onQuit">
      <van-button type="primary" round>退出登录</van-button>
    </div>
    <van-action-sheet v-model="show" :actions="actions" @select="onSelect" />
    <van-action-sheet v-model="dateShow">
      <van-datetime-picker
        type="date"
        :min-date="minDate"
        :formatter="formatter"
        title="我的生日"
        @confirm="handleConfirm"
        @cancel="handleCancel"
      />
    </van-action-sheet>
    <van-dialog v-model="dialogShow" message="确定退出登录吗？" showCancelButton @confirm="dialogConfirm" />
  </div>
</template>
<script>
import { mapMutations, mapState } from "vuex";
export default {
  name: "profile",
  data() {
    return {
      show: false,
      actions: [
        {
          name: "女"
        },
        {
          name: "男"
        }
      ],
      dateShow: false,
      minDate: new Date("1989,01,01"),
      dialogShow: false
    };
  },
  computed: {
    ...mapState(["userInfo"]),
    phoneNumber() {
      // 设置隐藏手机号中间四位
      let mobile = String(this.userInfo.phone);
      let reg = /^(\d{3})\d{4}(\d{4})$/;
      return mobile.replace(reg, "$1****$2");
    }
  },
  methods: {
    ...mapMutations(["CHANGE_SEX","CHANGE_BIRTHDAY","LOG_OUT"]),
    onSexClick() {
      this.show = true;
    },
    onDateClick() {
      this.dateShow = true;
    },
    onSelect({ name }) {
      this.show = false;
      this.CHANGE_SEX(name);
    },
    formatter(type, value) {
      if (type === "year") {
        return `${value}年`;
      } else if (type === "month") {
        return `${value}月`;
      } else if (type === "day") {
        return `${value}日`;
      }
    },
    handleConfirm(value) {
      this.dateShow = false;
      let birthDay = value.format("yyyy-MM-dd");
      this.CHANGE_BIRTHDAY(birthDay);
    },
    handleCancel() {
      this.dateShow = false;
    },
    onQuit() {
      this.dialogShow = true;
    },
    dialogConfirm() {
      this.dialogShow = false;
      this.LOG_OUT();
      this.$toast('退出成功');
      this.$router.back();
    }
  }
};
</script>
<style lang='scss' scoped>
.profile {
  .button-wrap {
    width: 100%;
    margin-top: 4rem;
    text-align: center;
    .van-button {
      width: 60%;
    }
  }
}
</style>