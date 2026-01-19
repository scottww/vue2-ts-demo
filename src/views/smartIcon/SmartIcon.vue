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
    width: { type: [Number, String], default: null },
    height: { type: [Number, String], default: null },
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
      const width = this.width !== null ? this.width : size;
      const height = this.height !== null ? this.height : size;
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
            width,
            height,
            isHover: this.isHover
          };
    },
    wrapperStyle() {
      const width = this.width !== null 
        ? typeof this.width === 'number' ? `${this.width}px` : this.width 
        : typeof this.size === 'number' ? `${this.size}px` : this.size;
      const height = this.height !== null 
        ? typeof this.height === 'number' ? `${this.height}px` : this.height 
        : typeof this.size === 'number' ? `${this.size}px` : this.size;
      return {
        width: width,
        height: height,
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
