<template>
  <div class="map-top-control">
    <div
      v-for="(item, index) in controls"
      :key="index"
      class="control-button"
      @click="toggleDropdown(index)"
    >
      <span>{{ item.label }}</span>
      <span class="arrow" :class="{ open: activeIndex === index }">▾</span>

      <!-- 弹出框 -->
      <div v-if="activeIndex === index" class="dropdown-content" @click.stop>
        <component
          :is="item.dropdown"
          @close="closeDropdown"
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

export default {
  name: "MapTopControl",
  components: {
    ToolDropdown,
    BaseDropdown,
    MapLayerDropdown
  },
  data() {
    return {
      activeIndex: null,
      controls: [
        { label: "地址选择", dropdown: "BaseDropdown" },
        {
          label: "地图切换",
          dropdown: "MapLayerDropdown"
        },
        { label: "工具箱", dropdown: "ToolDropdown" }
      ]
    };
  },
  methods: {
    toggleDropdown(index) {
      this.activeIndex = this.activeIndex === index ? null : index;
    },
    closeDropdown() {
      this.activeIndex = null;
    },
    handleChange(type) {
      this.$emit("change-layer", type); // 地图图层切换
    },
    handleSelect(area) {
      this.$emit("select", area); // 省市区选择
    },
    handleTool(type) {
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
}
.control-button:last-child {
  border-right: none;
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
}
</style>
