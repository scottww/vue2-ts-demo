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
      <!-- <LegendPanel /> -->
      <!-- <LegendPanel :usePng="true" layout="horizontal" /> -->
      <LegendPanel :usePng="true" />
    </div>
    <div class="toggleButton-box" :class="{ collapsed: isPanelCollapsed }">
      <ToggleButton
        :active="current === 'search'"
        label="搜索定位"
        @click="current = 'search'"
      >
        <template #icon>
          <SvgImage :src="searchIcon" :size="24" />
        </template>
      </ToggleButton>
      <ToggleButton
        :active="current === 'warning'"
        label="预警信息"
        @click="current = 'warning'"
      >
        <template #icon>
          <SvgImage :src="warningIcon" :size="24" />
        </template>
      </ToggleButton>
    </div>
    <div class="right-panel-box">
      <RightPanel ref="rightPanel" @toggle="handlePanelToggle" />
    </div>
  </div>
</template>

<script>
import MapTopControl from "./MapTopControl.vue";
import RightPanel from "./RightPanel.vue";
import LayerControl from "./components/LayerControl.vue";
import LegendPanel from "./components/LegendPanel.vue";
import LegendScrollTest from "./components/LegendScrollTest.vue";
import ToggleButton from "./components/ToggleButton.vue";

import searchIcon from "@/assets/mapIcon/search.svg";
import warningIcon from "@/assets/mapIcon/waring.svg";
import SvgImage from "./SvgImage.vue";

export default {
  components: {
    MapTopControl,
    RightPanel,
    LayerControl,
    LegendPanel,
    LegendScrollTest,
    ToggleButton,
    SvgImage
  },
  data() {
    return {
      isPanelCollapsed: null, // 初始设置为 null，表示"等待 RightPanel 通知"
      // rightPanelWidth: 440, // 默认展开宽度
      current: "search",
      searchIcon,
      warningIcon,
      currentLayer: "vector"
    };
  },
  mounted() {
    // this.updateRightPanelWidth(); // 初始同步
    console.log("RightPanel 初始宽度:", this.rightPanelWidth);
    console.log("面板是否折叠:", this.isPanelCollapsed);
    // window.addEventListener("resize", this.updateRightPanelWidth);
  },
  beforeDestroy() {
    // window.removeEventListener("resize", this.updateRightPanelWidth);
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
    },
    updateRightPanelWidth() {
      console.log("updateRightPanelWidth ...");
      this.$nextTick(() => {
        const el = this.$refs.rightPanel?.$el;
        console.log("updateRightPanelWidth1 ...", el);
        if (el) {
          console.log("el.offsetWidth ...", el.offsetWidth);
          this.rightPanelWidth = el.offsetWidth || 440;
        }
      });
    },
    handlePanelToggle(isCollapsed) {
      this.isPanelCollapsed = isCollapsed;
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

// right-panel-box样式
.right-panel-box {
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
.toggleButton-box {
  position: absolute;
  top: 10px;
  right: 40px;
  margin-right: 20px;
  display: flex;
  flex-direction: column;
  z-index: 20;
  transition: transform 0.3s ease;
  // 初始状态：RightPanel 是展开的，按钮不平移
  transform: translateX(0);
}
.toggleButton-box.collapsed {
  transform: translateX(-400px); // 注意：= RightPanel宽度(440) - 自己宽度(40)
}
</style>
