import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import 'ant-design-vue/dist/antd.css';
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
// babel-plugin-import 帮助加载 JS 和 CSS, 按需加载
// import { DatePicker } from 'ant-design-vue';
// 手动引入
// import DatePicker from 'ant-design-vue/lib/date-picker'; // 加载 JS
// import 'ant-design-vue/lib/date-picker/style/css'; // 加载 CSS
// import 'ant-design-vue/lib/date-picker/style';         // 加载 LESS

import antDesignVue from 'ant-design-vue';
Vue.use(antDesignVue);


Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount("#app");
