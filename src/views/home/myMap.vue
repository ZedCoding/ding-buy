<template>
  <div class="my-map">
    <van-nav-bar
      title="选择收货地址"
      left-arrow
      right-text="新增地址"
      @click-left="onClickLeft"
      @click-right="onClickRight"
      fixed
      :z-index="99999"
    />
    <div class="map-container">
      <el-amap-search-box
        class="search-box"
        :search-option="searchOption"
        :on-search-result="onSearchResult"
      />
      <el-amap
        ref="map"
        vid="amap-demo"
        :plugin="plugin"
        :zoom="zoom"
        :center="center"
        :events="events"
      >
        <el-amap-marker
          vid="component-marker"
          :position="makerConf.position"
          :content="makerConf.content"
        />
      </el-amap>
      <van-cell-group title="我的收货地址" v-if="addressInfo.length">
        <van-cell @click="onItemClick(addressInfo[0].addressDetail)">
          <template slot="title">
            <span>{{addressInfo[0].addressDetail}}</span>
            <van-tag round type="success" style="margin-left:0.2rem;">默认</van-tag>
          </template>
          <template slot="label">
            <span>{{addressInfo[0].name}} {{addressInfo[0].tel}}</span>
          </template>
        </van-cell>
      </van-cell-group>
      <template v-if="locationList.length">
        <van-cell-group title="当前地址">
          <van-cell
            :title="locationList[0].name"
            :label="locationList[0].address"
            @click="onItemClick(locationList[0].name)"
          />
        </van-cell-group>
        <van-cell-group title="附近地址">
          <template v-for="item in locationList">
            <van-cell
              :key="item.id"
              :title="item.name"
              :label="item.address"
              @click="onItemClick(item.name)"
            />
          </template>
        </van-cell-group>
      </template>
    </div>
    <loading :show="showLoading" />
  </div>
</template>
<script>
import Vue from "vue";
import VueAMap from "vue-amap";
import { mapState } from "vuex";
Vue.use(VueAMap);
VueAMap.initAMapApiLoader({
  // 申请的高德key
  key: "cde7aa4cab0681d34ddb6916431125b2",
  // 插件集合所有的
  plugin: [
    "AMap.Autocomplete",
    "AMap.PlaceSearch",
    "AMap.Scale",
    "AMap.OverView",
    "AMap.ToolBar",
    "AMap.MapType",
    "AMap.PolyEditor",
    "AMap.CircleEditor",
    "AMap.Geolocation"
  ],
  uiVersion: "1.0",
  v: "1.4.4"
});
export default {
  name: "myMap",
  data() {
    this.city = this.city || "杭州";
    return {
      showLoading: true,
      locationList: [], // 位置列表
      zoom: 16,
      center: ["120.153576", "30.287459"],
      events: {
        init: o => {
          o.setCity(this.city, res => {
            if (res && res.length > 0) {
              this.center = res;
              this.makerConf.position = res;
              this.getLocationList(res);
            }
          });
          setTimeout(() => {
            //去掉logo
            document.getElementsByClassName("amap-logo")[0].style.display =
              "none";
            // 去掉版权信息
            document.getElementsByClassName(
              "amap-copyright"
            )[0].style.visibility = "hidden";
            // 隐藏比例尺
            document.getElementsByClassName(
              "amap-scalecontrol"
            )[0].style.visibility = "hidden";
            // 修改定位当前位置
            document.getElementsByClassName(
              "amap-geolocation-con"
            )[0].style.left = "85%";
          }, 50);
        }
      },
      // 标记
      makerConf: {
        position: ["120.153576", "30.287459"],
        content: "杭州"
      },
      searchOption: {
        city: this.city,
        citylimit: true
      },
      plugin: [
        "Scale",
        {
          pName: "Geolocation",
          events: {
            init: o => {
              // 获取当前位置
              o.getCurrentPosition((status, result) => {
                if (result && result.position) {
                  self.lng = result.position.lng;
                  self.lat = result.position.lat;
                  self.center = [self.lng, self.lat];
                  self.loaded = true;
                  //me.$nextTick();
                }
              });
            },
            // 定位成功
            complete: result => {
              let address = result.formattedAddress;
              let point = result.position;
              var obj = {
                address,
                name: "",
                location: point
              };
              this.makerConf.position = [point.lng, point.lat];
              //this.getLocationList([point.lng, point.lat]);
            },
            // 错误回调
            error: err => {
              console.log(err);
            }
          }
        }
      ]
    };
  },
  computed: {
    ...mapState(["addressInfo"])
  },
  methods: {
    // 获取位置列表
    getLocationList(options) {
      if (!AMap) return;
      AMap.plugin(["AMap.Geocoder"], () => {
        const geocoder = new AMap.Geocoder({
          radius: 1000,
          extensions: "all"
        });
        const lnglatXY = options || ["120.153576", "30.287459"]; //已知点坐标
        geocoder.getAddress(lnglatXY, (status, res) => {
          this.showLoading = false;
          if (status === "complete" && res.info === "OK") {
            if (res.regeocode && res.regeocode.pois) {
              this.locationList = res.regeocode.pois;
            }
          }
        });
      });
    },
    // 搜索结果
    onSearchResult(result) {
      if (result && result.length > 0) {
        let { lng, lat, name } = result[0];
        this.center = [lng, lat];
        this.makerConf.position = [lng, lat];
        this.makerConf.content = name;
        this.locationList = result;
      }
    },
    onItemClick(name) {
      this.$router.push({ name: "Home", params: { name } });
    },
    onClickRight() {
      this.$router.push({ path: "/mine/addaddress" });
    }
  }
};
</script>
<style lang='scss' scoped>
.my-map {
  padding-top: 90px;
  background-color: #f5f5f5;
  .van-nav-bar {
    .van-nav-bar__text {
      color: #45c763;
    }
  }
  .search-box {
    position: fixed;
    top: 46px;
    margin: 0 10px;
    height: 30px;
    font-size: 0.8rem;
  }
}
</style>