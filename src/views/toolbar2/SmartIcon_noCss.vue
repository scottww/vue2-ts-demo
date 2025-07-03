<!-- 
//SmartIcon兼容svg和png，使用说明：
import SmartIcon from "@/components/toolbar/SmartIcon.vue";
{
  label: "测距",
  value: "measure",
  component: SmartIcon,
  componentProps: {
    src: require("@/assets/mapToolBar/ruler.svg"), // SVG
    size: 16
  }
},
{
  label: "清除",
  value: "clear",
  component: SmartIcon,
  componentProps: {
    src: require("@/assets/mapToolBar/clear.png"),       // PNG
    hoverSrc: require("@/assets/mapToolBar/clear-hover.png"),
    size: 16
  }
}

-->

<template>
  <component :is="isSvg ? 'SvgImage' : 'PngHoverIcon'" v-bind="finalProps" />
</template>

<script>
import SvgImage from "./SvgImage.vue";
import PngHoverIcon from "./PngHoverIcon.vue";

export default {
  name: "SmartIcon",
  components: { SvgImage, PngHoverIcon },
  props: {
    src: { type: String, required: true }, // 默认图路径
    hoverSrc: { type: String, default: "" }, // hover图（仅png需要）
    size: { type: [Number, String], default: 16 }, // 宽高，SVG/PNG通用
    color: { type: String, default: "#666" }, // SVG专用
    hoverColor: { type: String, default: "#1890ff" }, // SVG专用
    isHover: { type: Boolean, default: false } // 外部传入 hover 状态
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
            isHover: this.isHover // 可选，SvgImage 无感知也没事
          }
        : {
            src: this.src,
            hoverSrc: this.hoverSrc,
            width: size,
            height: size,
            isHover: this.isHover
          };
    }
  }
};
</script>
