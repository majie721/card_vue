import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import api from './request/api'
import  './validate/index'
import VueClipboard from 'vue-clipboard2'




import ATabbar from "./components/Tabbar";

import {Icon, Tabbar, TabbarItem, Row, Col,Swipe, SwipeItem,Toast,NavBar ,Button,Tag,Field,Checkbox, CheckboxGroup,
    Image,Divider,Cell, CellGroup,Popup,RadioGroup, Radio,Switch,Collapse, CollapseItem,Search,Dialog,List } from 'vant';

Vue.use(Icon).use(Tabbar).use(TabbarItem).use(Row).use(Col).use(Swipe).use(SwipeItem)
    .use(Toast).use(NavBar).use(Button).use(Tag).use(Field).use(Checkbox).use(CheckboxGroup).use(Image).use(Divider)
    .use(Cell).use(CellGroup).use(Popup).use(RadioGroup).use(Radio).use(Switch).use(Collapse).use(CollapseItem).use(Search)
    .use(Dialog).use(List).use(VueClipboard);


Vue.component('ATabbar', ATabbar);

Vue.config.productionTip = false;

Vue.prototype.$api = api; // 将api挂载到vue的原型上复制代码

Vue.prototype.$rtoast = function(res,func){
    if(res.ret===0){
        this.$toast.success(res.msg)
        func()
    }else{
        this.$toast.fail(res.msg)
        func()
    }
}


Vue.filter('cdn', function (value) {
    return `https://hm-1258945893.cos.ap-chengdu.myqcloud.com/${value}`
})






new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");
