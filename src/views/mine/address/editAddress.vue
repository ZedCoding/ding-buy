<template>
  <div class="edit-address">
    <van-nav-bar
      title="编辑地址"
      left-arrow
      right-text="删除"
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <van-address-edit
      :area-list="areaList"
      show-postal
      show-set-default
      save-button-text="保存"
      show-search-result
      :address-info="defaultInfo"
      @save="onSave"
    />
  </div>
</template>
<script>
import areaList from "@/assets/js/area";
import { mapMutations, mapState } from "vuex";
export default {
  name: "edit-address",
  data() {
    return {
      areaList
    };
  },
  created() {
    let len = Object.keys(this.$route.params).length;
    if (!len) {
      this.$router.back();
    }
  },
  computed: {
    ...mapState(["addressInfo"]),
    defaultInfo() {
      let index = this.$route.params.index;
      return this.addressInfo[index];
    }
  },
  methods: {
    ...mapMutations(["EDIT_ADDRESS", "REMOVE_ADDRESS"]),
    onClickRight() {
      this.$dialog
        .confirm({
          message: "确定要删除该地址吗？"
        })
        .then(() => {
          this.REMOVE_ADDRESS(this.defaultInfo.id);
          this.$toast("删除成功");
          this.$router.back();
        })
        .catch(() => {});
    },
    onSave(address) {
      this.EDIT_ADDRESS(address);
      this.$toast("修改成功");
      this.$router.back();
    }
  }
};
</script>
<style lang='scss' scoped>
</style>