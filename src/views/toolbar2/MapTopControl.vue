<template>
  <div class="map-top-control">
    <div
      v-for="(item, index) in controls"
      :key="index"
      class="control-button"
      @click="toggleDropdown(index)"
    >
      <!-- <img :src="item.icon" class="icon" /> -->
      <!-- <SvgImage :src="item.icon" :color="'#666'" :size="16" :hoverColor="'#1890ff'" class="tool-icon" /> -->
      <SvgImage :src="item.icon" :size="16" class="tool-icon" />
      <span class="label">{{ item.label }}</span>
      <span class="arrow" :class="{ open: activeIndex === index }">▾</span>

      <!-- 下拉内容 -->
      <div v-if="activeIndex === index" class="dropdown-content" @click.stop>
        <component
          :is="item.dropdown"
          v-bind="item.props || {}"
          @change="handleChange"
          @select="handleSelect"
          @tool="handleTool"
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
  data() {
    return {
      activeIndex: null,
      controls: [
        {
          label: "地址选择",
          icon: require("@/assets/mapToolBar/location.svg"),
          dropdown: "BaseDropdown"
        },
        {
          label: "地图切换",
          icon: require("@/assets/mapToolBar/satellite.svg"),
          dropdown: "MapLayerDropdown"
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
                  height: 16
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
    },
    handleSelect(area) {
      console.log("handleSelect ...", area);
      this.$emit("select", area); // 省市区选择
    },
    handleTool(type) {
      console.log("handleTool ...", type);
      this.$emit("tool", type); // 工具箱操作
    }
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
.control-button {
  position: relative;
  padding: 0 12px;
  height: 36px;
  display: flex;
  align-items: center;
  cursor: pointer;
  border-right: 1px solid #e8e8e8;
  user-select: none;

  color: #666; /* 默认灰色 */
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
.icon {
  width: 16px;
  height: 16px;
  margin-right: 6px;
}
.tool-icon {
  /* width: 100%;
  height: 100%;
  margin-right: 6px;
  max-width: 16px;
  max-height: 16px; */
  margin-right: 6px;
  width: 100%;
  height: 100%;
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
  /* width: 100%;  */
}
</style>
