<template>
  <div class="big-screen">
    <div class="bg-layer"></div>

    <!-- 顶部栏 -->
    <HeaderBar />

    <!-- 主内容布局 -->
    <div class="main-layout">
      <LeftPanel />
      <CenterMap />
      <RightPanel />
    </div>
  </div>
</template>

<script>
import HeaderBar from "./components/HeaderBar.vue";
import LeftPanel from "./components/LeftPanel.vue";
import CenterMap from "./components/CenterMap.vue";
import RightPanel from "./components/RightPanel.vue";

export default {
  name: "BigScreen",
  components: {
    HeaderBar,
    LeftPanel,
    CenterMap,
    RightPanel
  }
};
</script>

<style scoped>
.big-screen {
  position: relative;
  width: 5940px;
  height: 1080px;
  overflow: hidden;
  background-color: #000d1a;
}

.bg-layer {
  position: absolute;
  width: 100%;
  height: 100%;
  /* background: url('@/assets/bg.jpg') no-repeat center center; */
  background-size: cover;
  z-index: 0;
  opacity: 0.2;
}

.main-layout {
  display: flex;
  width: 100%;
  height: calc(100% - 100px); /* header 预设高度 */
  position: relative;
  z-index: 1;
}
</style>
