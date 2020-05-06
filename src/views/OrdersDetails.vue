<template>
  <div>
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh" class="od-box">
      <van-nav-bar
        title="订单详情"
        @click-left="$router.go(-1)"
        left-arrow
        class="header-bar"
      />
      <van-tabs v-model="active" @click="tabChange">
        <van-tab title="全部" name="all"></van-tab>
        <van-tab title="处理中" name="doing"></van-tab>
        <van-tab title="成功" name="success"></van-tab>
        <van-tab title="失败" name="fail"></van-tab>
        <van-tab title="其他" name="others"></van-tab>
      </van-tabs>
      <div>
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <!--                <van-cell v-for="item in tabList" :key="item.id" :title="item.id" />-->

          <div
            class="d-list d-item"
            v-for="(item, index) in tabList"
            :key="index"
          >
            <van-row class="dr-row">
              <van-col span="10"
                ><span class="title">卡密ID</span>:&nbsp;&nbsp;&nbsp;{{
                  item.oid
                }}</van-col
              >
              <van-col span="14" class="dr-right">
                状态:<span class="ostatus" :style="StatusColor(item.status)">{{
                  item.status_name
                }}</span></van-col
              >
            </van-row>
            <van-row class="dr-row" v-if="item.card_num">
              <van-col span="24"
                ><span class="title">卡号</span>:&nbsp;&nbsp;&nbsp;{{
                  item.card_num
                }}</van-col
              >
            </van-row>
            <van-row class="dr-row">
              <van-col span="24"
                ><span class="title">卡密</span>:&nbsp;&nbsp;&nbsp;{{
                  item.card_pwd
                }}</van-col
              >
            </van-row>
            <van-row class="dr-row">
              <van-col span="24"
                ><span class="title">提交时间</span>:&nbsp;&nbsp;&nbsp;{{
                  item.created_at
                }}</van-col
              >
            </van-row>
            <van-row class="dr-row">
              <van-col span="24"
                ><span class="title">备注</span>:&nbsp;&nbsp;&nbsp;{{
                  item.u_remark
                }}</van-col
              >
            </van-row>
            <van-row class="dr-row">
              <van-col span="6"
                >面额:&nbsp;&nbsp;&nbsp;<span style="color: #db3131"
                  >{{ item.faceval }}元</span
                ></van-col
              >
              <van-col span="6"
                >折扣:&nbsp;&nbsp;&nbsp;<span style="color: #db3131"
                  >{{ item.discount }}折</span
                ></van-col
              >
              <van-col span="12"
                >结算金额:&nbsp;&nbsp;&nbsp;<span style="color: #db3131"
                  >{{ item.pay_amount }}元</span
                ></van-col
              >
            </van-row>
          </div>
        </van-list>
      </div>
    </van-pull-refresh>
  </div>
</template>

<script>
import { Tab, Tabs, Card } from "vant";

export default {
  name: "OrdersDetails",

  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Card.name]: Card
  },

  data() {
    return {
      active: "all",
      list: {},
      loading: false,
      finished: false,
      tabList: [],
      refreshing: false
    };
  },

  methods: {
    tabChange(name, title) {
      console.log();
      if (this.list[this.active] != undefined) {
        //切换避免重复拉取数据
        this.tabList = this.list[this.active];
        return;
      }
      this.loading = true;
      this.finished = false;
      this.onLoad();
    },
    onLoad() {
      let param = {
        oid: this.$route.params.id,
        otype: this.$route.params.type,
        c_status: this.active
      };
      this.$api.orderDetails(param).then(res => {
        this.list[this.active] = res.data.data;
        this.tabList = res.data.data;
        this.loading = false;
        this.finished = true;
        this.refreshing = false;
      });
    },
    onRefresh() {
      // 清空列表数据
      this.list = {};
      this.finished = false;

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.onLoad();
    }
  },
  computed: {
    StatusColor() {
      return function(status) {
        if (status <= 5) {
          return { color: "#3d8bf2" };
        } else if (status == 10) {
          //成功
          return { color: "#58bd6b" };
        } else if (status == 9) {
          //失败
          return { color: "#db3131" };
        } else {
          return { color: "#969799" };
        }
      };
    }
  }
};
</script>

<style scoped>
.od-box >>> .van-pull-refresh__track {
  width: 100vw;
  height: 100vh;
}

.d-list {
  background-color: #ffffff;
  width: 94%;
  margin: 10px auto;
  border-radius: 12px;
  box-shadow: 4px 4px 10px #8799a3;
  border: 1px solid white;
  overflow: hidden;
  padding: 10px 0 10px 0;
}

.d-item {
  margin-top: 10px;
}
.dr-row {
  padding: 3px 0 0 15px;
  font-size: 14px;
  color: #8799a3;
}

.dr-first {
  margin-top: 2px;
}

.dr-right {
  text-align: end;
  padding-right: 20px;
}

.title {
  width: 60px;
  text-align-last: justify;
  display: inline-block;
}
</style>
