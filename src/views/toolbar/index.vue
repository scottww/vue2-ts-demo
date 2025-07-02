<template>
  <div id="map-wrapper">
    <!-- 地图组件 -->
    <!-- <map ... /> -->

    <!-- 工具栏 -->
    <MapControl
      @zoom-in="zoomIn"
      @zoom-out="zoomOut"
      @locate="goToMyLocation"
      @measure="startMeasure"
      @fullscreen="toggleFullscreen"
    />

    <div class="ToolButton-box">
      <ToolButton
        v-for="(item, index) in tools"
        :key="index"
        :title="item.title"
        :icon="item.icon"
        @click="item.onClick"
      />
    </div>
  </div>
</template>

<script>
import MapControl from "./MapControl.vue";
import ToolButton from "./ToolButton.vue";

export default {
  components: { MapControl, ToolButton },
  data() {
    return {
      tools: [
        {
          title: "放大",
          icon: require("@/assets/mapToolBar/zoom-in.png"),
          onClick: () => this.$emit("zoom-in")
        },
        {
          title: "缩小",
          icon: require("@/assets/mapToolBar/zoom-out.png"),
          onClick: () => this.$emit("zoom-out")
        },
        {
          title: "定位您的位置",
          icon: require("@/assets/mapToolBar/locate.svg"),
          onClick: () => this.$emit("locate")
        },
        {
          title: "测距",
          icon: require("@/assets/mapToolBar/ruler.svg"),
          onClick: () => this.$emit("measure")
        },
        {
          title: "全屏",
          icon: require("@/assets/mapToolBar/fullscreen.png"),
          onClick: () => this.$emit("fullscreen")
        }
      ]
    };
  },
  methods: {
    zoomIn() {
      console.log("放大地图");
    },
    zoomOut() {
      console.log("缩小地图");
    },
    goToMyLocation() {
      console.log("定位当前位置");
    },
    startMeasure() {
      console.log("开启测距");
    },
    toggleFullscreen() {
      console.log("切换全屏");
    }
  }
};
</script>

<style lang="scss" scoped>
#map-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}

.ToolButton-box {
  position: absolute;
  top: 10px;
  right: 10px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  padding: 6px 4px;
  z-index: 999;
}
</style>
