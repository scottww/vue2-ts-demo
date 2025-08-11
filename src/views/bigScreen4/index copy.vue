<template>
  <div class="dev-wrapper" :style="devWrapperStyle">
    <div class="screen-container" :style="screenStyle">
      <!-- UE背景 iframe -->
      <!-- <iframe class="ue-frame" src="https://your-ue-url.com" frameborder="0"></iframe> -->
      <div
        class="ue-container"
        ref="ueContainerRef"
        :class="{
          loaded: !loading
        }"
      ></div>

      <!-- 顶部导航栏 -->
      <div class="header-bar">
        <div class="header-title">xxx驾驶舱</div>
        <div class="header-nav">
          <button
            v-for="(page, idx) in pages"
            :key="page.name"
            :class="{ active: currentPage === idx }"
            @click="currentPage = idx"
          >
            {{ page.name }}
          </button>
        </div>
      </div>

      <!-- 动态页面加载 -->
      <component :is="pages[currentPage].component" />
    </div>
  </div>
</template>
<script>
import WidePage1 from "./pages/wideScreen/Page1.vue";
import WidePage2 from "./pages/wideScreen/Page2.vue";
import WidePage3 from "./pages/wideScreen/Page3.vue";
import WidePage4 from "./pages/wideScreen/Page4.vue";
import WidePage5 from "./pages/wideScreen/Page5.vue";

import NormalPage1 from "./pages/normalScreen/Page1.vue";
import NormalPage2 from "./pages/normalScreen/Page2.vue";
import NormalPage3 from "./pages/normalScreen/Page3.vue";
import NormalPage4 from "./pages/normalScreen/Page4.vue";
import NormalPage5 from "./pages/normalScreen/Page5.vue";

export default {
  data() {
    return {
      loading: false,
      currentPage: 0,
      isWideScreen: false,
      pages: []
    };
  },
  computed: {
    screenStyle() {
      return this.isWideScreen
        ? {
            width: "5940px",
            height: "1080px",
            position: "relative"
          }
        : {
            width: "100%",
            height: "100%",
            position: "relative",
            display: "flex",
            flexDirection: "column"
          };
    },
    devWrapperStyle() {
      return {
        width: "100vw",
        height: "100vh",
        overflow: "auto",
        background: "#000"
      };
    }
  },
  mounted() {
    this.detectScreenMode();
    window.addEventListener("resize", this.detectScreenMode);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.detectScreenMode);
  },
  methods: {
    detectScreenMode() {
      const width = window.innerWidth;
      console.log("width ...", width);
      //TODO 调试
      this.isWideScreen = true || width >= 4000;
      this.pages = this.isWideScreen
        ? [
            { name: "首页", component: "WidePage1" },
            { name: "工程管理", component: "WidePage2" },
            { name: "监测管理", component: "WidePage3" },
            { name: "防汛预案", component: "WidePage4" },
            { name: "数据分析", component: "WidePage5" }
          ]
        : [
            { name: "首页", component: "NormalPage1" },
            { name: "工程管理", component: "NormalPage2" },
            { name: "监测管理", component: "NormalPage3" },
            { name: "防汛预案", component: "NormalPage4" },
            { name: "数据分析", component: "NormalPage5" }
          ];
    }
  },
  components: {
    WidePage1,
    WidePage2,
    WidePage3,
    WidePage4,
    WidePage5,

    NormalPage1,
    NormalPage2,
    NormalPage3,
    NormalPage4,
    NormalPage5
  }
};
</script>
<style scoped>
.screen-container0 {
  width: 5940px;
  height: 1080px;
  background: url("~@/assets/bigScreen/bg.png") no-repeat center center;
  background-size: cover;
}
.screen-container {
  position: relative; /* 确保伪元素绝对定位相对这个容器 */
  overflow: hidden;
}
.screen-container::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url("~@/assets/bigScreen/bg.png") no-repeat center center;
  background-size: cover;
  z-index: 1;
}

.ue-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
  opacity: 0;
}
.ue-container.loaded {
  opacity: 1;
}

.header-bar {
  position: absolute;
  /* top: 20px; */
  width: 100%;
  z-index: 10;
  display: flex;
  flex-direction: column;
  /* align-items: center; */
}
.header-title0 {
  font-size: 36px;
  color: #fff;
  margin-bottom: 10px;
}

.header-title {
  height: 330px;
  background: url("~@/assets/bigScreen/header_bg.png") no-repeat center
    center;
  background-size: cover;

  /* 文字居中 */
  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 36px;
  color: #fff;
}

.header-nav {
  height: 135px;
  flex: 1; /* 剩余高度填充 */
  background: url("~@/assets/bigScreen/nav_bg.png") no-repeat center center;
  background-size: cover;

  display: flex;
  align-items: center; /* 竖直居中 */
  justify-content: center; /* 水平居中 */

  gap: 20px;
}

.header-nav0 {
  display: flex;
  gap: 20px;
}
.header-nav button {
  padding: 6px 20px;
  font-size: 18px;
  cursor: pointer;
}
.header-nav .active {
  background: #0af;
  color: #fff;
  border-radius: 4px;
}
</style>
