<template>
  <div class="time-list">
    <van-popup
      v-model="show"
      round
      position="bottom"
      closeable
      safe-area-inset-bottom
      @close="onClose"
      @click-overlay="onClose"
    >
      <div class="title">选择送达时间</div>
      <div class="wrapper">
        <div class="left-content">
          <div
            v-for="(item,index) in leftData"
            :key="item.id"
            @click="onLeftClick(index)"
            class="item"
            :class="{'item-active':dateIndex === index}"
          >
            <span>{{item.time}}</span>
          </div>
        </div>
        <div class="right-content">
          <div
            v-for="(item,index) in timeList"
            :key="index"
            @click="onRightClick(index)"
            class="item"
            :class="{'item-active':timeIndex === index}"
          >
            <span>{{item}}</span>
            <van-icon name="success" v-if="timeIndex === index" />
          </div>
        </div>
      </div>
      <van-button type="primary" round @click="onClose">确定</van-button>
    </van-popup>
  </div>
</template>
<script>
export default {
  name: "timeList",
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      //show: this.showPop,
      dateIndex: 0,
      timeIndex: 0,
      deliveryTime: ""
    };
  },
  computed: {
    leftData() {
      let today = this.format(new Date(), "MM月dd日");
      let tomorrow = this.format(
        new Date().getTime() + 24 * 60 * 60 * 1000,
        "MM月dd日"
      );
      let arr = [
        {
          id: 1,
          time: `今天${today}`
        },
        {
          id: 2,
          time: `明天${tomorrow}`
        }
      ];
      return arr;
    },
    timeList() {
      let arr = this.timeGroup();
      let nowHour = Number(this.format(new Date(), "hh:mm").split(":")[0]),
        nowMinute = Number(this.format(new Date(), "hh:mm").split(":")[1]);
      if (this.dateIndex === 0 && nowHour < 22) {
        let index = (nowHour - 7) * 2;
        if (nowMinute >= 30) {
          index += 1;
        }
        return arr.splice(index);
      } else {
        return arr;
      }
    }
  },
  methods: {
    timeGroup() {
      let arr = [];
      for (let i = 7; i < 22; i++) {
        let temp = i < 10 ? `0${i}:00-0${i}:30` : `${i}:00-${i}:30`;
        let temp2 = i < 9 ? `0${i}:30-0${i + 1}:00` : `${i}:30-${i + 1}:00`;
        arr.push(temp);
        arr.push(temp2);
      }
      return arr;
    },
    onLeftClick(index) {
      this.dateIndex = index;
    },
    onRightClick(index) {
      this.timeIndex = index;
      let time = this.timeList[index];
      this.deliveryTime = this.dateIndex === 0 ? `今天${time}` : `明天${time}`;
    },
    onClose() {
      this.$emit("change", false, this.deliveryTime);
    }
  }
};
</script>
<style lang='scss' scoped>
.time-list {
  .title {
    height: 3rem;
    line-height: 3rem;
    text-align: center;
  }
  .wrapper {
    display: flex;
    align-items: center;
    .left-content {
      width: 7rem;
      display: flex;
      flex-direction: column;
      text-align: center;
      height: 50vh;
      background-color: LightGray;
      .item {
        width: 100%;
        height: 3rem;
        line-height: 3rem;
        color: grey;
        border-top: 1px solid #e8e9e8;
      }
      .item-active {
        color: #000;
        background-color: #fff;
      }
    }
    .right-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      height: 50vh;
      overflow-x: hidden;
      overflow-y: auto;
      .item {
        width: 100%;
        height: 3rem;
        line-height: 3rem;
        margin-left: 0.5rem;
        padding-left: 0.5rem;
        border-top: 1px solid #e8e9e8;
        position: relative;
        .van-icon {
          position: absolute;
          top: 50%;
          right: 2.5rem;
          transform: translateY(-50%);
        }
      }
      .item-active {
        color: #3bba63;
      }
    }
  }
  .van-button {
    width: 90%;
    margin: 0.3rem 5%;
  }
}
</style>