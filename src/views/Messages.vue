<template>
  <div>
    <van-nav-bar
      title="我的消息"
      @click-left="$router.go(-1)"
      left-arrow
      class="header-bar"
    />

    <div>
      <van-collapse v-model="activeNames" @change="readMessg">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <van-collapse-item
            v-for="item in list"
            :key="item.id"
            :name="item.id"
          >
            <div slot="title">
              <span class="tab-title"
                >{{ item.title
                }}<van-icon v-if="item.status != 3" name="chat-o" dot/></span
              ><span class="tab-time">{{ item.created_at }}</span>
            </div>
            <div>
              {{ item.content }}
            </div>
          </van-collapse-item>
        </van-list>
      </van-collapse>
    </div>
  </div>
</template>

<script>
export default {
  name: "Messages",
  data() {
    return {
      activeNames: [],
      loading: false,
      finished: false,
      page: 1,
      list: [],
      unread: [] //未读的消息id
    };
  },
  methods: {
    onLoad() {
      this.$api.message(this.page).then(res => {
        this.list = res.data.data.data;
        this.loading = false;
        if (res.data.data.next_page_url == null) {
          this.finished = true;
        }
      });
    },
    readMessg(val) {
      console.log(val);
      let id = val[val.length - 1];

      console.log(id);
      let param = {
        id: id
      };
      for (let key in this.list) {
        if (this.list[key]["id"] == id) {
          if (this.list[key]["status"] != 3) {
            this.list[key]["status"] = 3;
            this.$api.read_message(param).then(res => {
              console.log(res);
            });
          }
        } else {
          continue;
        }
      }
    }
  }
};
</script>

<style scoped>
.tab-time >>> {
  color: #969799 !important;
  font-size: 10px;
  display: inline-block;
  float: right;
}

.tab-title >>> {
  display: inline-block;
  float: left;
}
</style>
