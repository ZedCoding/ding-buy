<template>
  <div class="scroll-top" v-show="show" @click="backTop">
    <img :src="require('@/assets/img/top.png')" alt />
  </div>
</template>
<script>
export default {
  name: "scrollTop",
  data() {
    return {
      show: false,
      scrollTop: 0
    };
  },
  methods: {
    backTop() {
      let timer = setInterval(() => {
        let speed = Math.floor(-this.scrollTop / 5);
        document.documentElement.scrollTop = document.body.scrollTop =
          this.scrollTop + speed;
        if (this.scrollTop === 0) {
          clearInterval(timer);
        }
      }, 15);
    },
    scrollToTop() {
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      this.scrollTop = scrollTop;
      this.show = scrollTop > 0 ? true : false;
    }
  },
  mounted() {
    window.addEventListener("scroll", this.scrollToTop);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.scrollToTop);
  }
};
</script>
<style lang='scss' scoped>
.scroll-top {
  position: fixed;
  right: 0.5rem;
  bottom: 8rem;
}
</style>