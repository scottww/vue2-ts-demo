<template>
  <img
    :src="finalSrc"
    class="png-image"
    :style="style"
  />
</template>

<script>
export default {
  name: "PngImageHover",
  props: {
    src: { type: String, required: true },
    hoverSrc: { type: String, required: true },
    width: { type: [String, Number], default: 16 },
    height: { type: [String, Number], default: 16 },
    isHover: { type: Boolean, default: false } // 外部传入的 hover 状态
  },
  computed: {
    finalSrc() {
      return this.isHover ? this.hoverSrc : this.src;
    },
    style() {
      return {
        width: typeof this.width === "number" ? `${this.width}px` : this.width,
        height: typeof this.height === "number" ? `${this.height}px` : this.height,
        verticalAlign: "middle",
        display: "inline-block"
      };
    }
  }
};
</script>
