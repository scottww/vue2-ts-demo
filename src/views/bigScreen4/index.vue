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
      >
        <!-- 测试背景遮挡 -->
        <!-- <div class="btn-box">
          <el-button @click="handleBtnClick">click me</el-button>
        </div> -->
      </div>

      <!-- 顶部导航栏 -->
      <div class="header-bar">
        <div class="header-title">xxx驾驶舱</div>
        <div class="header-nav">
          <div class="nav-content">
            <button
              type="text"
              v-for="(page, idx) in pages"
              :key="page.name"
              :class="{ active: currentPage === idx }"
              @click="currentPage = idx"
            >
              {{ page.name }}
            </button>
          </div>
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
  },
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
    },
    handleBtnClick() {
      console.log("handleBtnClick ...");
    }
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
  background: url("~@/assets/bigScreen/bg2.png") no-repeat center center;
  background-size: cover;
  z-index: 1;
  pointer-events: none;
}

.ue-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  opacity: 0;
}
.ue-container.loaded {
  opacity: 1;
}

.header-bar {
  /* position: absolute;
  width: 100%;
  height: 209px;
  background: url("~@/assets/bigScreen/header_bg2.png") no-repeat center center;
  background-size: cover;
  z-index: 10;
  pointer-events: none; */

  position: absolute;
  width: 100%;
  /* height: 209px; */
  height: 154px;
  z-index: 10;
}

.header-bar::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url("~@/assets/bigScreen/header_bg3.png") no-repeat center center;
  background-size: cover;
  z-index: -1;
  pointer-events: none;  /* 背景不挡事件 */
}

.header-title {
  position: absolute;
  top: 32px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 36px;
  color: #fff;
}

.header-nav {
  position: absolute;
  top: 80px;
  left: 50%;
  transform: translateX(-50%);
  width: 970px;
  height: 126px;
  background: url("~@/assets/bigScreen/nav_bg2.png") no-repeat center center;
  background-size: cover;
  z-index: 11;
}

.nav-content {
  position: relative;
  top: 50px;

  display: flex;
  justify-content: center;
  gap: 0;
}

.header-nav button {
  width: 170px;
  height: 62px;
  background: none; /* 默认无背景 */
  border: none; /* 无边框 */
  color: #d4e4fd; /* 默认文字颜色 */
  font-size: 18px;
  cursor: pointer;
  transition: color 0.3s;
}

.nav-content button.active {
  background: url("~@/assets/bigScreen/btn_active.png") no-repeat center center;
  background-size: cover;
  color: #fff;
}

.btn-box {
  position: relative;
  justify-content: center;
  align-items: center;
  display: flex;
  top: 50%;
}
</style>
