<template>
  <div class="map-top-control" ref="root">
    <div
      v-for="(item, index) in controls"
      :key="index"
      class="control-button-wrapper"
    >
      <!-- 按钮主体 -->
      <div class="control-button" @click="toggleDropdown(index)">
        <SvgImage :src="item.icon" :size="16" class="tool-icon" />
        <span class="label">{{ item.label }}</span>
        <span class="arrow" :class="{ open: activeIndex === index }">▾</span>
      </div>

      <!-- 下拉弹层，注意位置独立 -->
      <div v-if="activeIndex === index" class="dropdown-content" :class="`dropdown-${item.dropdown}`" @click.stop>
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
    SmartIcon
  },
  props: {
    value: {
      type: String,
      default: "vector" // 绑定地图当前图层
    }
  },
  data() {
    return {
      activeIndex: null,
      controls: [
        {
          label: "地址选择",
          icon: require("@/assets/mapToolBar/location.svg"),
          dropdown: "BaseDropdown",
          props: {
            defaultProvince: "浙江省"
          }
        },
        {
          label: "地图切换",
          icon: require("@/assets/mapToolBar/satellite.svg"),
          dropdown: "MapLayerDropdown",
          props: {
            items: [
              {
                label: "矢量图",
                value: "vector",
                component: SmartIcon,
                componentProps: {
                  src: require("@/assets/mapToolBar/location.svg"),
                  size: 16
                }
              },
              {
                label: "卫星图",
                value: "satellite",
                component: PngHoverIcon,
                componentProps: {
                  src: require("@/assets/mapToolBar/satellite.png"),
                  hoverSrc: require("@/assets/mapToolBar/satellite_hover.png"),
                  width: 16,
                  height: 16
                }
              },
              {
                label: "地形图",
                value: "terrain",
                component: SmartIcon,
                componentProps: {
                  src: require("@/assets/mapToolBar/location.svg"),
                  size: 16
                }
              }
            ],
            value: this.value // 初始化选中图层
          }
        },
        {
          label: "工具箱",
          icon: require("@/assets/mapToolBar/toolbox.svg"),
          dropdown: "ToolDropdown",
          props: {
            items: [
              //使用SvgImage组件
              // {
              //   label: "测距",
              //   value: "measure",
              //   component: SvgImage,
              //   componentProps: {
              //     src: require("@/assets/mapToolBar/ruler.svg"),
              //     size: 16
              //   }
              // },
              //使用 PngHoverIcon 组件
              // {
              //   label: "测距",
              //   value: "measure",
              //   component: PngHoverIcon,
              //   componentProps: {
              //     src: require("@/assets/mapToolBar/measure.png"),
              //     hoverSrc: require("@/assets/mapToolBar/measure_hover.png"),
              //     width: 16,
              //     height: 16
              //   }
              // },
              //使用 SmartIcon 组件
              {
                label: "测距",
                value: "measure-length",
                component: PngHoverIcon,
                componentProps: {
                  src: require("@/assets/mapToolBar/measure.png"),
                  hoverSrc: require("@/assets/mapToolBar/measure_hover.png"),
                  width: 16,
                  height: 16,
                }
              },
              {
                label: "测面",
                value: "measure-area",
                component: PngHoverIcon,
                componentProps: {
                  src: require("@/assets/mapToolBar/measure-area.png"),
                  hoverSrc: require("@/assets/mapToolBar/measure-area_hover.png"),
                  width: 16,
                  height: 16
                }
              },
              {
                label: "标绘",
                value: "draw",
                component: SmartIcon,
                componentProps: {
                  src: require("@/assets/mapToolBar/pencil-solid.svg"),
                  width: 16,
                  height: 16
                }
              },
              {
                label: "清除",
                value: "clear",
                component: SmartIcon,
                componentProps: {
                  src: require("@/assets/mapToolBar/clear.svg"),
                  size: 16
                }
              }
            ]
          }
        }
      ]
    };
  },
  mounted() {
    document.addEventListener("click", this.handleOutsideClick);
  },
  methods: {
    toggleDropdown(index) {
      console.log("toggleDropdown ...", index);
      this.activeIndex = this.activeIndex === index ? null : index;
    },
    closeDropdown() {
      this.activeIndex = null;
    },
    handleChange(type) {
      console.log("handleChange layer...", type);
      this.$emit("change-layer", type); // 地图图层切换
      this.closeDropdown();
    },
    handleInput(val) {
      this.$emit("input", val); // v-model 支持
      this.closeDropdown();
    },
    handleSelect(area) {
      console.log("handleSelect ...", area);
      this.$emit("select", area); // 省市区选择
      // this.closeDropdown();
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
    }
  },
  watch: {
    value(val) {
      // 同步给 props.value 的子组件
      const layerItem = this.controls.find(
        (c) => c.dropdown === "MapLayerDropdown"
      );
      if (layerItem) {
        layerItem.props.value = val;
      }
    }
  },
  beforeDestroy() {
    document.removeEventListener("click", this.handleOutsideClick);
  }
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
