<template>
  <img
    :src="src"
    :style="imgStyle"
    class="svg-img"
    @mouseenter="isHover = true"
    @mouseleave="isHover = false"
    alt="svg icon"
  />
</template>

<script>
export default {
  name: 'SvgImage',
  props: {
    src: {
      type: String,
      required: true
    },
    size: {
      type: [Number, String],
      default: 24
    },
    color: {
      type: String,
      default: '#333' // 默认颜色（黑）
    },
    hoverColor: {
      type: String,
      default: '' // 悬浮变色
    }
  },
  data() {
    return {
      isHover: false
    };
  },
  computed: {
    imgStyle() {
      const size = typeof this.size === 'number' ? `${this.size}px` : this.size;
      return {
        width: size,
        height: size,
        transition: 'filter 0.3s ease',
        filter: this.generateFilter(this.isHover ? this.hoverColor || this.color : this.color)
      };
    }
  },
  methods: {
    /**
     * 将颜色转为 filter 表现（适用于黑色 SVG 图标）
     */
    generateFilter(hexColor) {
      if (!hexColor || hexColor === '#000' || hexColor === '#000000') {
        return 'invert(0)';
      }

      // 简单版本，仅支持几种色调。可拓展为更精准算法
      const colorMap = {
        '#1890ff': 'invert(40%) sepia(100%) saturate(500%) hue-rotate(180deg) brightness(95%)',
        '#f5222d': 'invert(20%) sepia(90%) saturate(750%) hue-rotate(-10deg) brightness(100%)',
        '#52c41a': 'invert(55%) sepia(80%) saturate(800%) hue-rotate(60deg) brightness(90%)'
      };
      return colorMap[hexColor.toLowerCase()] || 'invert(40%)';
    }
  }
};
</script>

<style scoped>
.svg-img {
  display: inline-block;
  vertical-align: middle;
  cursor: pointer;
}
</style>
