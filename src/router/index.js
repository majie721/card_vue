import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Sell from "../views/Sell.vue";
import Account from "../views/Account.vue";
import BankList from "../views/BankList.vue";
import Login from "../views/Login.vue";
import Withdraw from "../views/Withdraw.vue";
import Orders from "../views/Orders.vue";
import WorkOrders from "../views/WorkOrders.vue";
import Messages from "../views/Messages.vue";
import OrdersDetails from "../views/OrdersDetails.vue";



Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path:'/login',
    name:'login',
    component:Login
  },
  {
    path: "/home",
    redirect:'/'
  },
  {
    path: "/sell",
    name: "sell",
    component: Sell
  },
  {
    path: "/detail/:id",
    name: "detail",
    component: ()=>import( "../views/Detail.vue")
  },
  {
    path: "/account",
    name: "account",
    component:Account
  },
  {
    path: "/bankList",
    name: "bankList",
    component: BankList
  },
  {
    path: "/questions",
    name: "questions",
    component: ()=>import( "../views/Questions.vue")
  },
  {
    path: "/withdraw",
    name: "withdraw",
    component:Withdraw
  },
  {
    path: "/orders",
    name: "orders",
    component:Orders
  },
  {
    path: "/ordersDetails/:id/:type",
    name: "ordersDetails",
    component:OrdersDetails
  },
  {
    path: "/workOrders",
    name: "workOrders",
    component:WorkOrders
  },
  {
    path: "/messages",
    name: "messages",
    component:Messages
  },
  {
    path: "/feedback",
    name: "feedback",
    component: ()=>import( "../views/Feedback.vue")
  }
  // {
  //   path: "/about",
  //   name: "about",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue")
  // }
];

const router = new VueRouter({
  routes
});

export default router;
