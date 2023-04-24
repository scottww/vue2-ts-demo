import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./styles";
// // 引用
// import ECharts from "vue-echarts";
// // 用到的模块要单独引用
// import "echarts/lib/chart/line"; // 线图为例，其他图一样
// import "echarts/lib/component/title.js"; // 标题
// import "echarts/lib/component/legend"; // 图例
// import "echarts/lib/component/tooltip"; // 提示框
// import "echarts/lib/component/toolbox"; // 工具（如下载功能与按钮）

// // 注册
// Vue.component("v-chart", ECharts);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount("#app");
