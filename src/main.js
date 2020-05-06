import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import api from "./request/api";
import "./validate/index";
import "./tools/loading";
import VueClipboard from "vue-clipboard2";

import ATabbar from "./components/Tabbar";

import {
  Icon,
  Tabbar,
  TabbarItem,
  Row,
  Col,
  Swipe,
  SwipeItem,
  Toast,
  NavBar,
  Button,
  Tag,
  Field,
  Checkbox,
  CheckboxGroup,
  Image,
  Divider,
  Cell,
  CellGroup,
  Popup,
  RadioGroup,
  Radio,
  Switch,
  Collapse,
  CollapseItem,
  Search,
  Dialog,
  List,
  PullRefresh,
  Step,
  Steps,
  CountDown,
  Loading,
  ActionSheet
} from "vant";

Vue.use(Icon)
  .use(Tabbar)
  .use(TabbarItem)
  .use(Row)
  .use(Col)
  .use(Swipe)
  .use(SwipeItem)
  .use(Toast)
  .use(NavBar)
  .use(Button)
  .use(Tag)
  .use(Field)
  .use(Checkbox)
  .use(CheckboxGroup)
  .use(Image)
  .use(Divider)
  .use(Cell)
  .use(CellGroup)
  .use(Popup)
  .use(RadioGroup)
  .use(Radio)
  .use(Switch)
  .use(Collapse)
  .use(CollapseItem)
  .use(Search)
  .use(Dialog)
  .use(List)
  .use(VueClipboard)
  .use(PullRefresh)
  .use(Step)
  .use(Steps)
  .use(CountDown)
  .use(Loading)
  .use(ActionSheet);

Vue.component("ATabbar", ATabbar);

Vue.config.productionTip = false;

Vue.prototype.$api = api; // 将api挂载到vue的原型上复制代码
//Vue.prototype.$loading = loading; // 将api挂载到vue的原型上复制代码

Vue.prototype.$rtoast = function(res, func) {
  if (res.ret === 0) {
    this.$toast.success(res.msg);
    func();
  } else {
    this.$toast.fail(res.msg);
    func();
  }
};

setTokenFromUrl();
function setTokenFromUrl() {
  let url = window.location.href;
  //console.log(url);

  if(url.search(/\?token=/i)>0){
    let dz_url = url.split("#")[0];
    //console.log(dz_url);
    let cs = dz_url.split("?")[1];

    let cs_arr = cs.split("&");
    console.log(222);
    let params = {};
    let i = 0;
    for (i = 0; i < cs_arr.length; i++) {
      params[cs_arr[i].split("=")[0]] = cs_arr[i].split("=")[1];
    }

    let token = params["token"];
    console.log(params);
    if (token != undefined || !token) {
      localStorage.setItem("token", token);
      let redirct_url =
          window.location.protocol +
          "//" +
          window.location.host +
          "#" +
          url.split("#")[1];
      console.log(redirct_url);
      //  window.location.href = redirct_url;
    }
  }

}

Vue.filter("cdn", function(value) {
  return `https://hm-1258945893.cos.ap-chengdu.myqcloud.com/${value}`;
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
