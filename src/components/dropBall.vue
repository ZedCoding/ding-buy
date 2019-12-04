<template>
  <div class="drop-ball">
    <transition
      appear
      @after-appear="afterEnter"
      @before-appear="beforeEnter"
      v-for="(item,index) in dots"
      :key="index"
    >
      <div class="move-dot" v-if="item">
        <img :src="dropImg" class="img" alt />
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  name: "dropBall",
  props: ["dropImg", "elLeft", "elTop", "dots"],

  methods: {
    beforeEnter(el) {
      // 设置transform值
      el.style.transform = `translate3d(${this.elLeft - 30}px,${this.elTop -
        100}px , 0)`;
      // 设置透明度
      el.style.opacity = 0;
    },
    afterEnter(el) {
      // 获取底部购物车徽标的位置
      const badgePosition = document
        .getElementById("buycar")
        .getBoundingClientRect();
      // 设置位移
      el.style.transform = `translate3d(${badgePosition.left +
        30}px,${badgePosition.top - 30}px,0)`;
      // 增加贝塞尔曲线
      el.style.transition =
        "transform .88s cubic-bezier(0.3, -0.25, 0.7, -0.15)";
      el.style.transition = "transform .88s linear";
      this.$emit("change", false);
      // 设置透明度
      el.style.opacity = 1;
      // 监听小球动画结束方法
      el.addEventListener("transitionend", () => {
        el.style.display = "none";
      });
      el.addEventListener("webkitAnimationEnd", () => {
        el.style.display = "none";
      });
    },
  }
};
</script>
<style lang='scss' scoped>
.drop-ball {
  position: relative;
  .move-dot {
    position: fixed;
    top: 1rem;
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    z-index: 100;
    .img {
      animation: 0.88s mymove ease-in-out;
      border-radius: 50%;
    }
  }
  @keyframes mymove {
    0% {
      transform: scale(1);
    }
    25% {
      transform: scale(0.8);
    }
    50% {
      transform: scale(0.6);
    }
    75% {
      transform: scale(0.4);
    }
    100% {
      transform: scale(0.2);
    }
  }
}
</style>