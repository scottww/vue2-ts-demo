<template>
  <div id="map-wrapper">
    <!-- 你的地图组件 -->
    <!-- <baidu-map ... /> -->

    <!-- 工具栏 -->
    <MapToolbar
      @zoom-in="zoomIn"
      @zoom-out="zoomOut"
      @locate="goToMyLocation"
      @measure="startMeasure"
      @fullscreen="toggleFullscreen"
    />
  </div>
</template>

<script>
import MapToolbar from "./MapToolBar.vue";

export default {
  components: { MapToolbar },
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
    },
  },
};
</script>

<style>
#map-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
