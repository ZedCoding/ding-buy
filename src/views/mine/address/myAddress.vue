<template>
  <div class="my-address">
    <van-nav-bar title="我的地址" left-arrow @click-left="onClickLeft" fixed />
    <template v-if="addressInfo.length">
      <van-address-list v-model="chosenAddressId" :list="computedList" @add="onAdd" @edit="onEdit" />
    </template>
    <template v-else>
      <img :src="require('@/assets/img/empty_address.png')" class="empty-img" alt />
      <p class="empty-text">还没有添加过地址呢，添加一个吧😄</p>
      <van-button type="primary" class="add-button" round @click="onAdd">+ 新增地址</van-button>
    </template>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "myAddress",
  data() {
    return {
      chosenAddressId: 1
    };
  },
  computed: {
    ...mapState(["addressInfo"]),
    computedList() {
      return this.addressInfo.map((item, index) => {
        let obj = {
          id: index + 1,
          name: item.name,
          tel: item.tel,
          address: `${item.province} ${item.city} ${item.county}`
        };
        return obj;
      });
    }
  },
  methods: {
    onAdd() {
      this.$router.push({ path: "/mine/addaddress" });
    },
    onEdit(item, index) {
      console.log(item, index);
    }
  }
};
</script>
<style lang='scss' scoped>
.my-address {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  position: relative;
  .van-address-list {
    margin-top: 46px;
    width: 100%;
  }
  .empty-img {
    width: 40%;
    height: 20%;
  }
  .empty-text {
    font-size: 0.75rem;
    color: grey;
  }
  .add-button {
    position: fixed;
    bottom: 2rem;
    width: 60%;
  }
}
</style>