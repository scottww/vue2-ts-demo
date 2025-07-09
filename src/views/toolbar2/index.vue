<template>
  <div class="MapTopControlDemo">
    <MapTopControl
      :value="currentLayer"
      @tool="handleTool"
      @change-layer="switchMap"
      @select="handleAreaSelect"
      @close="handleClose"
    />
    <div class="LayerControl-box">
      <LayerControl @update-layers="handleLayerChange" />
    </div>
    <div class="legendPanel-box">
      <LegendPanel />
    </div>
    <div class="right-panel">
      <RightPanel />
    </div>
  </div>
</template>

<script>
import MapTopControl from "./MapTopControl.vue";
import RightPanel from "./RightPanel.vue";
import LayerControl from "./components/LayerControl.vue";
import LegendPanel from "./components/LegendPanel.vue";

export default {
  components: { MapTopControl, RightPanel, LayerControl, LegendPanel },
  data() {
    return {
      currentLayer: "vector"
    };
  },
  methods: {
    handleTool(type) {
      if (type === "measure") {
        // 开启测距
      } else if (type === "draw") {
        // 开启标绘
      } else if (type === "clear") {
        // 清除图层
      }
    },
    switchMap(mapType) {
      // eg. 调用百度地图 API 切换图层
      console.log("切换地图为:", mapType);
      this.currentLayer = mapType;
      if (mapType === "vector") {
        // 切换到矢量图
      } else if (mapType === "satellite") {
        // 切换到卫星图
      } else if (mapType === "terrain") {
        // 切换到地形图
      }
    },
    handleAreaSelect(area) {
      console.log("选中的区域：", area);
      // TODO: 可根据选中区域定位地图
    },
    // 关闭dropdown逻辑
    handleClose() {},
    handleLayerChange(val) {
      console.log("选中的图层：", val);
      // TODO: 控制图层显示隐藏
    }
  }
};
</script>

<style lang="scss" scoped>
.MapTopControlDemo {
  position: relative;
  width: 100%;
  height: 100%;
}

// 定制dropdown样式
::v-deep .dropdown-content.dropdown-BaseDropdown {
  width: auto;
}

// right-panel样式
.right-panel {
  // position: absolute;
  // top: 0;
  // right: 0;
  // width: 300px;
  // height: 100%;
  // background-color: #fff;
  // box-shadow: -2px 0 6px rgba(0, 0, 0, 0.1);
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  z-index: 10;
  /* 注意这里不要写死宽度！让子组件控制宽度 */
  /* ❌ 不要写 width 和 background，交给子组件控制 */
}

.LayerControl-box {
  position: absolute;
  bottom: 70px;
}
.legendPanel-box {
  position: absolute;
  bottom: 70px;
  left: 210px;
}
</style>
