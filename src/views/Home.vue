<template>
    <div>
        <div>
            <van-nav-bar title="销卡大师" >
                <span slot="right" class="kefu" @click="sendMsg()">
                <i class="iconfont iconkefu"></i>
                    客服
                </span>
            </van-nav-bar>
        </div>

    <div class="home-swipe">
      <van-swipe :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="(item, index) in bannerList" :key="index">
          <van-image height="160" radius="12px" :src="item.image | cdn" />
        </van-swipe-item>
      </van-swipe>
    </div>


    <div class="home-box notice-box">
      <van-notice-bar :text="notice" left-icon="volume-o" />
    </div>

    <div class="home-box bg-withe">
      <van-grid :column-num="3">
        <van-grid-item
          v-for="(value, index) in recommend"
          :key="index"
          @click="clickHandle(value)"
        >
          <van-image :src="value.image | cdn" />
          <p class="h-title">{{ value.name }}</p>
          <p class="h-discount">{{ discount_text(value.max_discount) }}</p>
        </van-grid-item>
      </van-grid>
    </div>

    <van-action-sheet
      :title="title"
      :description="description"
      cancel-text="取消"
      safe-area-inset-bottom
      v-model="sheetShow"
      :actions="actions"
      @select="onSelect"
    />
    <ATabbar></ATabbar>
  </div>
</template>

<script>

  import { Image, NoticeBar, Grid, GridItem, ActionSheet } from "vant";
import { hideLoading, showLoading } from "../tools/loading";
export default {
  name: "Home",
  components: {
    [Image.name]: Image,
    [NoticeBar.name]: NoticeBar,
    [Grid.name]: Grid,
    [GridItem.name]: GridItem,
    [ActionSheet.name]: ActionSheet,
  },
  data: function() {
    return {
      count: 0,
      bannerList: [],
      notice: "",
      recommend: [],
      sheetShow: false,
      actions: [],
      title: "卡种",
      description: "选择你要提交的卡类型"
    };
  },

  methods: {
    homeData: function() {
      showLoading();
      this.$api.homeData().then(res => {
        hideLoading();
        this.bannerList = res.data.data.banner;
        this.notice = res.data.data.notice;
        this.recommend = res.data.data.recommend;
      });
    },
    clickHandle: function(item) {
      if (item.products.length < 1) {
        this.$toast("业务维护中,请耐心等待");
      } else if (item.products.length === 1) {
        this.$router.push(`/detail/${item.products[0]["id"]}`);
      } else {
        this.actions = [];
        for (let product of item.products) {
          let option = {
            name: product.name,
            subname: product.max_discount
              ? `${product.max_discount}折`
              : "高价回收",
            className: "action-item",
            data: product
          };
          this.actions.push(option);
        }
        this.sheetShow = true;
        this.title = item.name;
      }
    },
    onSelect: function(item, index) {
      this.$router.push(`/detail/${item.data["id"]}`);
    },
    sendMsg:function () {
        //alert(111)
        window.location.href="http://wpa.qq.com/msgrd?v=3&uin=1440413448&site=qq&menu=yes"
        //this.$api.customerMessage().then(res=>{

        //})
    }

  },

  computed: {
    discount_text() {
      return function(discount) {
        if (discount == undefined || discount < 10) {
          return "高价回收";
        } else {
          return discount + "折";
        }
      };
    }
  },

  created() {
    //this.getUserInfo();

    this.homeData();
  }
};
</script>

<style>
.kefu {
  color: #0081ff;
}
</style>

<style scoped>
.home-box {
  width: 98%;
  background-color: #fffbe8;
  overflow: hidden;
  border-radius: 8px;
  margin: 10px auto;
}

.bg-withe {
  background-color: white;
}

.notice-box {
  min-height: 40px;
}

.home-swipe {
  text-align: center;
}

.h-title {
  color: #333333;
  font-weight: 500;
  margin-top: 8px;
  margin-bottom: 0px;
}

.h-discount {
  color: red;
  font-size: 12px;
  margin-top: 1px;
}

.van-action-sheet__subname {
  color: #e54d42;
}
</style>
