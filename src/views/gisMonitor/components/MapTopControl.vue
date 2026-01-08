<template>
  <div class="map-top-control" ref="root">
    <div
      v-for="(item, index) in controls"
      :key="index"
      class="control-button-wrapper"
    >
      <!-- 按钮主体 -->
      <div class="control-button" @click="toggleDropdown(index)">
        <SvgImage
          :src="item.displayIcon || item.icon"
          :size="16"
          class="tool-icon"
        />
        <span class="label">{{ item.displayLabel || item.label }}</span>
        <span class="arrow" :class="{ open: activeIndex === index }">▾</span>
      </div>

      <!-- 下拉弹层，注意位置独立 -->
      <div
        v-if="activeIndex === index"
        class="dropdown-content"
        :class="`dropdown-${item.dropdown}`"
        @click.stop
      >
        <component
          :is="item.dropdown"
          v-bind="item.props || {}"
          @change="handleChange"
          @select="handleSelect"
          @tool="handleTool"
          @close="toggleDropdown"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ToolDropdown from "./ToolDropdown.vue"; // 工具箱弹出面板
import BaseDropdown from "./BaseDropdown.vue"; // 地址选择
import MapLayerDropdown from "./MapLayerDropdown.vue"; // 地图切换
// import SvgImage from "../toolbar/SvgImage.vue";
//这个要实现 svg跟文字一起hover颜色变化
import SvgImage from "./SvgImage.vue";
import PngHoverIcon from "./PngHoverIcon.vue";
import SmartIcon from "./SmartIcon.vue";

export default {
  name: "MapTopControl",
  components: {
    ToolDropdown,
    BaseDropdown,
    MapLayerDropdown,
    SvgImage,
    PngHoverIcon,
    SmartIcon,
  },
  props: {
    value: {
      type: String,
      default: "satellite", // 绑定地图当前图层
    },
  },
  data() {
    return {
      activeIndex: null,
      controls: [
        {
          label: "地址选择",
          name: "address",
          displayLabel: "浙江省", // 新增，用于显示在按钮上
          icon: require("@/assets/images/oneMap/location.svg"),
          dropdown: "BaseDropdown",
          props: {
            defaultProvince: "浙江省",
          },
        },
        {
          label: "地图切换",
          name: "mapLayer", // 地图切换
          displayLabel: "", // 初始空，后面会根据 value 计算
          displayIcon: "", // 初始空
          
          icon: require("@/assets/images/oneMap/vector.svg"),
          dropdown: "MapLayerDropdown",
          props: {
            items: [
              {
                label: "矢量图",
                value: "vector",
                component: SmartIcon,
                componentProps: {
                  src: require("@/assets/images/oneMap/vector.svg"),
                  size: 16,
                },
              },
              {
                label: "卫星图",
                value: "satellite",
                component: SmartIcon,
                componentProps: {
                  src: require("@/assets/images/oneMap/satellite.svg"),
                  size: 16,
                },
              },
              {
                label: "地形图",
                value: "terrain",
                component: SmartIcon,
                componentProps: {
                  src: require("@/assets/images/oneMap/terrain.svg"),
                  size: 16,
                },
              },
            ],
            value: this.value,
          },
        },
      ],
    };
  },
  mounted() {
    // 初始化地图切换按钮显示文字和图标
    this.initMapLayerDisplay();
    document.addEventListener("click", this.handleOutsideClick);
  },
  methods: {
    initMapLayerDisplay() {
      const layerControl = this.controls.find(c => c.name === 'mapLayer');
      if (!layerControl) return;
      const selected = layerControl.props.items.find(i => i.value === this.value);
      if (selected) {
        layerControl.displayLabel = selected.label;
        layerControl.displayIcon = selected.componentProps.src;
      }
    },
    toggleDropdown(index) {
      console.log("toggleDropdown ...", index);
      this.activeIndex = this.activeIndex === index ? null : index;
    },
    closeDropdown() {
      this.activeIndex = null;
    },
    handleChange0(type) {
      console.log("handleChange layer...", type);
      this.$emit("change-layer", type); // 地图图层切换
      this.closeDropdown();
    },
    handleInput(val) {
      this.$emit("input", val); // v-model 支持
      this.closeDropdown();
    },
    handleSelect0(area) {
      console.log("handleSelect ...", area);
      this.$emit("select", area); // 省市区选择
      // this.closeDropdown();
    },
    handleSelect(area) {
      this.$emit("select", area);
      const control = this.controls.find((c) => c.name === "address");
      if (control) {
        // 如果 district 有值，显示 district
        // 否则 city -> province
        control.displayLabel =
          area.district || area.city || area.province || "地址选择";
        this.closeDropdown();
      }
    },
    handleChange(type) {
      this.$emit("change-layer", type);
      const control = this.controls.find(c => c.name === "mapLayer");
      if (control) {
        const item = control.props.items.find(i => i.value === type);
        if (item) {
          control.displayLabel = item.label;
          control.displayIcon = item.componentProps.src;
        }
      }
      this.closeDropdown();
    },
    handleTool(type) {
      console.log("handleTool ...", type);
      this.$emit("tool", type); // 工具箱操作
      this.closeDropdown();
    },
    handleOutsideClick(e) {
      const root = this.$refs.root;
      if (root && !root.contains(e.target)) {
        this.closeDropdown();
      }
    },
  },
  watch: {
    value(val) {
      const layerControl = this.controls.find(c => c.name === "mapLayer");
      if (layerControl) {
        const selected = layerControl.props.items.find(i => i.value === val);
        if (selected) {
          layerControl.displayLabel = selected.label;
          layerControl.displayIcon = selected.componentProps.src;
        }
        layerControl.props.value = val;
      }
    },
  },
  beforeDestroy() {
    document.removeEventListener("click", this.handleOutsideClick);
  },
};
</script>

<style scoped>
.map-top-control {
  position: absolute;
  top: 10px;
  left: 10px;
  background: #fff;
  border-radius: 6px;
  display: flex;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  z-index: 1000;
}

.control-button-wrapper {
  position: relative;
  border-right: 1px solid #e8e8e8;
}

.control-button-wrapper:last-child {
  border-right: none;
}

.control-button {
  padding: 0 12px;
  height: 36px;
  display: flex;
  align-items: center;
  cursor: pointer;
  /* border-right: 1px solid #e8e8e8; */
  color: #666;
  transition: color 0.3s ease;
}

.control-button:hover {
  color: #1890ff;
}

.control-button:hover .tool-icon,
.control-button:hover .label {
  color: #1890ff;
}

.control-button .label {
  font-size: 14px;
  margin-right: 4px;
  transition: color 0.3s ease;
}

.control-button:last-child {
  border-right: none;
}

.tool-icon {
  margin-right: 6px;
  width: 16px;
  height: 16px;
  transition: color 0.3s ease;
}

.arrow {
  margin-left: 4px;
  transition: transform 0.2s;
}
.arrow.open {
  transform: rotate(180deg);
}

.dropdown-content {
  position: absolute;
  top: 100%;
  left: 0;
  background: #fff;
  border-radius: 4px;
  padding: 8px;
  margin-top: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  white-space: nowrap;
  color: #333; /* 防止继承变色 */
  width: 100%;
}
</style>
