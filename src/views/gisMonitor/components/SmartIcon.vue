<template>
  <span class="smart-icon" :style="wrapperStyle">
    <component
      :is="isSvg ? 'SvgImage' : 'PngHoverIcon'"
      v-bind="finalProps"
    />
  </span>
</template>

<script>
import SvgImage from './SvgImage.vue';
import PngHoverIcon from './PngHoverIcon.vue';

export default {
  name: 'SmartIcon',
  components: { SvgImage, PngHoverIcon },
  props: {
    src: { type: String, required: true },
    hoverSrc: { type: String, default: '' },
    size: { type: [Number, String], default: 16 },
    color: { type: String, default: '#666' },
    hoverColor: { type: String, default: '#1890ff' },
    isHover: { type: Boolean, default: false }
  },
  computed: {
    isSvg() {
      return /\.svg(\?.*)?$/.test(this.src);
    },
    finalProps() {
      const size = this.size;
      return this.isSvg
        ? {
            src: this.src,
            size,
            color: this.color,
            hoverColor: this.hoverColor,
            isHover: this.isHover
          }
        : {
            src: this.src,
            hoverSrc: this.hoverSrc,
            width: size,
            height: size,
            isHover: this.isHover
          };
    },
    wrapperStyle() {
      const s = typeof this.size === 'number' ? `${this.size}px` : this.size;
      return {
        width: s,
        height: s,
        display: 'inline-block',
        verticalAlign: 'middle',
        lineHeight: 1,
        color: this.isHover && this.hoverColor ? this.hoverColor : this.color
      };
    }
  }
};
</script>

<style scoped>
.smart-icon {
  display: inline-block;
  vertical-align: middle;
  transition: all 0.3s ease;
}
</style>
