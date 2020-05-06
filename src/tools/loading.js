import Vue from "vue";
import { Toast } from "vant";
Vue.use(Toast);

let loading;
let loadingCount = 0; //loading发起时加的计数锁
let numberCount = 0; //定时器增加的数值
let timer = null; //定时器
const loadingTime = 15; //超时时间值(秒)

const defaultState = {
  text: "正在加载……",
  time: ""
};
const startLoading = state => {
  loading = Toast.loading({
    duration: 0, // 持续展示 toast
    forbidClick: true, // 禁用背景点击
    mask: true, //是否显示背景遮罩层
    loadingType: "spinner",
    message: state.text
  });
  Toast.allowMultiple(); //允许同时存在多个 Toast

  if (state.time) {
    setTimeout(() => {
      endLoading();
      loadingCount = 0;
    }, state.time);
  }

  // 超时关闭loading
  timer = setInterval(() => {
    numberCount++;
    if (numberCount > loadingTime) {
      endLoading();
      loadingCount = 0;
    }
  }, 1000);
};

const endLoading = () => {
  loading.clear();
  // 接除timer
  clearInterval(timer);
  numberCount = 0;
};

export const showLoading = (state = defaultState) => {
  if (loadingCount === 0) {
    startLoading(state);
  }
  loadingCount += 1;
};

export const hideLoading = () => {
  if (loadingCount <= 0) {
    return;
  }
  loadingCount -= 1;
  if (loadingCount === 0) {
    endLoading();
  }
};
