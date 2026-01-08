<template>
  <div class="tool-dropdown">
    <div
      class="tool-item"
      v-for="(item, index) in items"
      :key="index"
      @click="$emit('tool', item.value)"
      @mouseenter="hoverIndex = index"
      @mouseleave="hoverIndex = null"
    >
      <!-- 图标支持 SvgImage 或普通 HTML 字符 -->
      <span class="icon">
        <component
          v-if="item.component"
          :is="item.component"
          v-bind="{
            ...(item.componentProps || {}),
            isHover: hoverIndex === index
          }"
          class="tool-icon"
        />
        <span v-else v-html="item.icon"></span>
      </span>
      <span class="label">{{ item.label }}</span>
    </div>
  </div>
</template>

<script>
import SvgImage from "./SvgImage.vue";
import PngHoverIcon from "./PngHoverIcon.vue";
export default {
  name: "ToolDropdown",
  comments: {
    SvgImage,
    PngHoverIcon
  },
  props: {
    items: {
      type: Array,
      default: () => [
        {
          label: "测距",
          value: "measure",
          icon: "📏"
        },
        {
          label: "标绘",
          value: "draw",
          icon: "✏️"
        },
        {
          label: "清除",
          value: "clear",
          icon: "🧹"
        }
      ]
    }
  },
  data() {
    return {
      hoverIndex: null
    };
  }
};
</script>

<style scoped>
.tool-dropdown {
  display: flex;
  flex-direction: column;
}
.tool-item {
  display: flex;
  align-items: center;
  padding: 6px;
  cursor: pointer;
  border-radius: 4px;
  color: #333;
  transition: color 0.3s;
}
.tool-item:hover {
  background-color: #f5f5f5;
  color: #1890ff;
}


/* .tool-item:hover .tool-icon,
.tool-item:hover .label {
  color: #1890ff;
} */

.icon {
  margin-right: 6px;
  font-size: 14px;
  display: inline-block;
  width: 16px;
  height: 16px;
  line-height: 1;
}
.tool-icon {
  width: 100%;
  height: 100%;
  fill: currentColor;
  color: inherit;
}
.label {
  font-size: 14px;
}
</style>
