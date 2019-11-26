<template>
  <div class="add-address">
    <van-nav-bar title="添加地址" left-arrow @click-left="onClickLeft" />
    <van-address-edit
      :area-list="areaList"
      show-postal
      save-button-text="保存并使用"
      show-set-default
      show-search-result
      :search-result="searchResult"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
    />
  </div>
</template>
<script>
import areaList from '@/assets/js/area'
import { mapMutations } from 'vuex';
export default {
  name: "addAddress",
  data() {
    return {
      areaList,
      searchResult: []
    };
  },
  methods: {
    ...mapMutations(['ADD_ADDRESS']),
    onSave(address) {
      this.ADD_ADDRESS(address)
      this.$toast('保存成功');
      this.$router.back();
    },
    // onChangeDetail(val) {
    //   if (val) {
    //     this.searchResult = [{
    //       name: '黄龙万科中心',
    //       address: '杭州市西湖区'
    //     }];
    //   } else {
    //     this.searchResult = [];
    //   }
    // }
  }
};
</script>
<style lang='scss' scoped>
</style>