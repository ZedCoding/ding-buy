<template>
  <div class="add-address">
    <van-nav-bar title="添加地址" left-arrow @click-left="onClickLeft" />
    <van-address-edit
      :area-list="areaList"
      show-postal
      save-button-text="保存"
      show-set-default
      show-search-result
      @save="onSave"
    />
  </div>
</template>
<script>
import areaList from "@/assets/js/area";
import { mapMutations } from "vuex";
export default {
  name: "addAddress",
  data() {
    return {
      areaList
    };
  },
  methods: {
    ...mapMutations(["ADD_ADDRESS"]),
    onSave(address) {
      let id = new Date().getTime().toString();
      address.id = id;
      this.ADD_ADDRESS(address);
      this.$toast("保存成功");
      this.$router.back();
    }
  }
};
</script>
<style lang='scss' scoped>
</style>