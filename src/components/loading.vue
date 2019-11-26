<template>
  <div class="loading" v-if="show">
    <van-loading color="#28be57" vertical>加载中...</van-loading>
  </div>
</template>
<script>
export default {
  name: "loading",
  props: {
    show: {
      type: Boolean,
      default: true
    }
  }
};
</script>
<style lang='scss' scoped>
.loading {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 50px;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>