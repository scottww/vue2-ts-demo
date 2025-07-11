<template>
  <div class="svg-image" :style="wrapperStyle" v-html="content"></div>
</template>

<script>
export default {
  name: "SvgImage",
  props: {
    src: { type: String, required: true },
    size: {
      type: [Number, String],
      default: 16
    }
  },
  data() {
    return {
      content: ""
    };
  },
  computed: {
    wrapperStyle() {
      const s = typeof this.size === "number" ? `${this.size}px` : this.size;
      return {
        width: s,
        height: s,
        display: "inline-block",
        verticalAlign: "middle",
        color: "inherit"
      };
    }
  },
  watch: {
    src: {
      immediate: true,
      handler(val) {
        fetch(val)
          .then((res) => res.text())
          .then((svg) => {
            // 清除 width、height、fill 和 stroke 等干扰属性
            const cleaned = svg
              .replace(/<\?xml.*?\?>/g, "")
              .replace(/<!DOCTYPE.*?>/g, "")
              .replace(/fill=".*?"/g, "")
              .replace(/stroke=".*?"/g, "")
              .replace(/(width|height)=".*?"/g, "");
            this.content = cleaned;
          });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.svg-image {
  display: inline-block;
  vertical-align: middle;

  /* 用 v-deep 正确穿透到 SVG 内部 */
  ::v-deep(svg) {
    width: 100%;
    height: 100%;
    fill: currentColor;
    display: block;
    transition: fill 0.3s ease;
  }
}
</style>
