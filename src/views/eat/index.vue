<template>
  <div class="eat">
    <div class="search-wrap">
      <van-search placeholder="搜索菜谱、食材" v-model="value" background="#f0f0f0" @search="onSearch" />
      <div class="collection" @click="onCollection">
        <svg
          data-v-fe6f31e2
          t="1569828707785"
          viewBox="0 0 1165 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="8465"
          width="18"
          height="18"
        >
          <path
            data-v-fe6f31e2
            d="M945.230769 1024H220.553846A220.553846 220.553846 0 0 1 0 803.446154V220.553846A220.553846 220.553846 0 0 1 220.553846 0h192.512a78.769231 78.769231 0 0 1 69.159385 41.117538l67.584 123.98277a15.753846 15.753846 0 0 0 13.863384 8.192H945.230769a220.553846 220.553846 0 0 1 220.553846 220.553846v409.6a220.553846 220.553846 0 0 1-220.553846 220.553846zM220.553846 63.015385A157.538462 157.538462 0 0 0 63.015385 220.553846v582.892308a157.538462 157.538462 0 0 0 157.538461 157.538461h724.676923a157.538462 157.538462 0 0 0 157.538462-157.538461V393.846154a157.538462 157.538462 0 0 0-157.538462-157.538462H563.672615a78.769231 78.769231 0 0 1-69.159384-41.117538L426.929231 71.207385a15.753846 15.753846 0 0 0-13.863385-8.192z"
            fill="#45c763"
            p-id="8466"
          />
          <path
            data-v-fe6f31e2
            d="M707.505231 842.043077a53.563077 53.563077 0 0 1-25.678769-7.089231L582.892308 782.651077 481.910154 834.953846a54.665846 54.665846 0 0 1-78.769231-57.816615l19.692308-111.379693-80.502154-78.76923a54.508308 54.508308 0 0 1 30.562461-92.790154l111.852308-15.753846L535.630769 376.832A53.878154 53.878154 0 0 1 583.837538 346.584615a54.350769 54.350769 0 0 1 48.679385 30.562462l49.624615 101.612308 111.69477 16.856615a54.350769 54.350769 0 0 1 29.774769 92.947692l-81.289846 78.769231 18.589538 111.379692a54.350769 54.350769 0 0 1-21.897846 53.248 54.980923 54.980923 0 0 1-31.507692 10.082462z m3.938461-62.070154zM582.892308 718.532923a54.823385 54.823385 0 0 1 25.678769 6.301539l88.379077 47.261538-15.753846-98.934154a54.193231 54.193231 0 0 1 15.753846-47.261538l71.995077-69.632-99.091693-15.753846a54.665846 54.665846 0 0 1-40.96-29.932308l-43.795692-90.112-44.898461 89.639384a53.720615 53.720615 0 0 1-41.117539 29.617231l-99.249231 14.020923 71.522462 70.262154a54.508308 54.508308 0 0 1 15.753846 48.364308l-17.486769 98.619077L557.056 724.676923a54.508308 54.508308 0 0 1 25.836308-6.144z"
            fill="#45c763"
            p-id="8467"
          />
        </svg>
        <span class="text">收藏</span>
      </div>
      <div class="today-menu">今日菜单</div>
    </div>
    <div class="nav-wrap">
      <div class="wrapper" ref="wrapper">
        <ul ref="content">
          <li
            v-for="(item,index) in navList"
            :key="item.id"
            class="menu-item"
            :class="{'menu-item-active':item.active}"
            ref="item"
            @click="onItemClick(item,index)"
          >
            <span>{{item.name}}</span>
          </li>
        </ul>
      </div>
      <div class="menu-all" @click="onAllClick">
        <span>{{menuName}}</span>
        <van-icon :name="arrowName" />
      </div>
    </div>
    <div class="nav-all-wrap" v-show="showAll">
      <template v-if="historyList.length">
        <span class="title">最近找过</span>
        <div class="history-list">
          <div v-for="item in historyList" :key="item.id" class="item">
            <span>{{item.name}}</span>
          </div>
        </div>
      </template>
      <span class="title">菜单分类</span>
      <div class="nav-list">
        <div
          v-for="(item,index) in navList"
          :key="item.id"
          class="item"
          @click="onItemClick(item,index)"
        >
          <span>{{item.name}}</span>
        </div>
      </div>
    </div>
    <div class="menu-list" v-show="!showAll">
      <waterfall :col="col" :data="menuList" @loadmore="loadmore">
        <div class="cell-item" v-for="item in menuList" :key="item.id" ref="item">
          <img v-lazy="item.image" />
          <p class="desc">{{item.name}}</p>
          <div class="footer">
            <img class="avatar" v-lazy="item.author_avatar" alt />
            <span class="name">{{item.author_name}}</span>
          </div>
        </div>
      </waterfall>
    </div>
    <scroll-top />
    <loading :show="showLoading" />
  </div>
</template>
<script>
import Vue from "vue";
import BScroll from "better-scroll";
export default {
  name: "eat",
  data() {
    return {
      showLoading: true,
      value: "",
      navList: [], // 菜单
      col: 2,
      menuList: [], // 菜谱
      showAll: false,
      historyList: [], // 最近找过
      page: 1
    };
  },
  created() {
    this.getMenu();
    this.getList();
  },
  computed: {
    menuName() {
      return this.showAll ? "收起" : "全部";
    },
    arrowName() {
      return this.showAll ? "arrow-up" : "arrow-down";
    }
  },
  methods: {
    onSearch() {
      this.$toast("搜索功能未实现");
      this.value = "";
    },
    onCollection() {
      this.$router.push({ path: "/collection" });
    },
    async getMenu() {
      let res = await this.$http("/api/recipe/allScene");
      if (res.data.code === 0) {
        this.navList = res.data.data.list.map((item, index) => {
          if (index === 0) {
            item.active = true;
          }
          return item;
        });
        this.initScroll();
      }
    },
    initScroll() {
      this.$nextTick(() => {
        if (!this.scroll) {
          let contentWidth = 0;
          let el = this.$refs.item;
          for (let i = 0; i < el.length; i++) {
            contentWidth += el[i].clientWidth * 1.18;
          }
          this.$refs.content.style.width = contentWidth + "px";
          this.scroll = new BScroll(this.$refs.wrapper, {
            probeType: 3,
            startX: 0,
            click: true,
            scrollX: true
          });
        }
      });
    },
    onAllClick() {
      this.showAll = !this.showAll;
    },
    onItemClick({ id, name }, index) {
      this.navList = this.navList.map(item => {
        if (item.id === id) {
          item.active = true;
        } else {
          item.active = false;
        }
        return { ...item };
      });
      let el = this.$refs.item[index];
      this.scroll.scrollToElement(el, 500);
      this.showAll = false;
      let obj = {
        id,
        name
      };
      let flag = true;
      this.historyList.forEach(item => {
        if (item.id === id) {
          flag = false;
        }
      });
      if (!flag) return;
      this.historyList.unshift(obj);
    },
    async getList() {
      let res = await this.$http("/api/recipe/menulist/lk01");
      if (res.data.code === 0) {
        this.menuList = res.data.data.big_recommend.list;
        this.showLoading = false;
      }
    },
    async loadmore() {
      let index = ++this.page;
      if (index > 31) {
        this.$toast("别拉了，到底啦~");
        return;
      }
      let param = index >= 10 ? `/lk${index}` : `/lk0${index}`;
      let res = await this.$http(`/api/recipe/menulist${param}`);
      if (res.data.code === 0) {
        this.menuList = this.menuList.concat(res.data.data.big_recommend.list);
      }
    }
  }
};
</script>
<style lang='scss' scoped>
.eat {
  .search-wrap {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    background-color: #fff;
    z-index: 10;
    .van-search {
      padding-right: 40px;
    }
    .collection {
      position: absolute;
      top: 12px;
      right: 10px;
      display: flex;
      flex-direction: column;
      align-items: center;
      .text {
        font-size: 0.8rem;
        color: #3bba63;
      }
    }
    .today-menu {
      margin: 12px 0 12px 12px;
      padding-left: 0.5rem;
      line-height: 1.5rem;
      border-left: 0.2rem solid #75a342;
      font-size: 1.2rem;
      font-weight: 700;
    }
  }
  .nav-wrap {
    position: fixed;
    top: 6rem;
    right: 0;
    left: 0;
    z-index: 10;
    padding-left: 12px;
    padding-top: 12px;
    height: 2rem;
    white-space: nowrap;
    font-size: 0.8rem;
    overflow: hidden;
    background-color: #fff;
    .wrapper {
      width: 84%;
      overflow: hidden;
      .menu-item {
        display: inline-block;
        padding: 0.4rem 0.6rem;
        border: 1px solid #dedede;
        border-radius: 1rem;
        margin-right: 0.5rem;
      }
      .menu-item-active {
        border-color: #3cb963;
        color: #3cb963;
      }
    }
    .menu-all {
      position: absolute;
      top: 1.25rem;
      right: 0.5rem;
      color: grey;
      .van-icon {
        vertical-align: bottom;
      }
    }
  }
  .nav-all-wrap {
    margin-top: 9rem;
    padding-left: 1.1rem;
    .title {
      display: inline-block;
      margin: 1rem 0;
      font-size: 0.8rem;
      color: grey;
    }
    .item {
      display: inline-block;
      padding: 0.6rem 0.8rem;
      font-size: 0.9375rem;
      border: 1px solid #dedede;
      color: rgba(0, 0, 0, 0.7);
      border-radius: 1.2rem;
      margin: 0 1rem 1rem 0;
    }
  }
  .menu-list {
    width: 100%;
    overflow: hidden;
    margin-top: 9rem;
    .cell-item {
      padding: 0.5rem;
      text-align: center;
      box-sizing: border-box;
      img {
        border-radius: 0.8rem;
      }
      .desc {
        margin: 1rem 0;
        font-size: 1.1rem;
        font-weight: bolder;
      }
      .footer {
        display: flex;
        align-items: center;
        padding-left: 1rem;
        .avatar {
          width: 2rem;
          border-radius: 50%;
        }
        .name {
          margin-left: 0.5rem;
          font-size: 0.9375rem;
          color: grey;
        }
      }
    }
  }
}
</style>