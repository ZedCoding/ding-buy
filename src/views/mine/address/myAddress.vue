<template>
  <div class="my-address">
    <van-nav-bar title="我的地址" left-arrow @click-left="onClickLeft" fixed />
    <template v-if="addressInfo.length">
      <van-address-list
        v-model="chosenAddressId"
        :list="computedList"
        add-button-text="+ 添加新地址"
        @add="onAdd"
        @edit="onEdit"
      />
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
import Vue from "vue";
export default {
  name: "myAddress",
  data() {
    return {
      chosenAddressId: null
    }
  },
  computed: {
    ...mapState(["addressInfo"]),
    computedList() {
      return this.addressInfo.map(item => {
        let obj = {
          id: item.id,
          name: item.name,
          tel: item.tel,
          address: `${item.province} ${item.city} ${item.county}`
        };
        return obj;
      });
    },
  },
  methods: {
    onAdd() {
      this.$router.push({ path: "/mine/addaddress" });
    },
    onEdit(item, index) {
      this.$router.push({
        name: "EditAddress",
        params: { index }
      });
    }
  },
  watch: {
    chosenAddressId: {
      handler(val) {
        console.log(val, );
        this.$router.back()
      }
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
    .van-address-list__add {
      background-color: #3bba63;
      border: 0;
    }
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