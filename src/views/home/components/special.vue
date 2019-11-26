<template>
  <div class="special">
    <div class="header">
      <span class="title">特色专区</span>
    </div>
    <ul class="content-wrap">
      <li v-for="item in arr" :key="item.id" class="content-item">
        <p class="title">{{item.title}}</p>
        <p class="subtitle">{{item.subtitle}}</p>
        <div class="img-wrap">
          <template v-if="item.id === 4">
            <img :src="item.image" alt />
          </template>
          <template v-else>
            <img :src="item.imageOne" alt />
            <img :src="item.imageTwo" alt />
          </template>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "special",
  props: {
    specialZone: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      arr: []
    };
  },
  created() {
    const {
      newItemList,
      hotItemList,
      vipItemList,
      otherItemList,
      lowPriceItemList
    } = this.specialZone;
    this.arr.push(
      newItemList[0],
      hotItemList[0],
      vipItemList[0],
      lowPriceItemList[0]
    );
  }
};
</script>
<style lang='scss' scoped>
.special {
  padding: 0.625rem;
  .header {
    margin-bottom: 0.625rem;
    .title {
      padding-left: 0.3125rem;
      border-left: 4px solid#3cb963;
      font-size: 1.1875rem;
    }
  }
  .content-wrap {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    border-top: 0.01rem solid #dddbc0;
    border-right: 0.01rem solid #dddbc0;
    .content-item {
      width: 50%;
      padding: 0.5rem;
      border-left: 0.01rem solid #dddbc0;
      border-bottom: 0.01rem solid #dddbc0;
      box-sizing: border-box;
      .title {
        font-size: 0.45rem;
        color: #000;
      }
      .subtitle {
        margin: 0.4rem 0;
        font-size: 0.45rem;
        color: grey;
      }
      .img-wrap {
        img {
          display: inline-block;
          width: 3rem;
          height: 2.5rem;
          margin-right: 1rem;
        }
      }
    }
  }
}
</style>