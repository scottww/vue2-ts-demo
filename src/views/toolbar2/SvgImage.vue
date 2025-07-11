<template>
  <div class="svg-image" :style="wrapperStyle" v-html="content"></div>
</template>

<script>
export default {
  name: "SvgImage",
  props: {
    src: {
      type: String,
      required: true
    },
    size: {
      type: [Number, String],
      default: 16
    },
    direction: {
      type: String,
      default: null, // 不传默认保持 SVG 原始方向
      validator: (v) =>
        [null, "", "left", "right", "up", "down"].includes(v)
    }
  },
  data() {
    return {
      content: "",
      currentSrc: "" // 防止异步响应冲突
    };
  },
  computed: {
    pixelSize() {
      return typeof this.size === "number" ? `${this.size}px` : this.size;
    },
    transformStyle() {
      if (!this.direction) return "none"; // 不设置时不旋转

      switch (this.direction) {
        case "left":
          return "rotate(180deg)";
        case "up":
          return "rotate(-90deg)";
        case "down":
          return "rotate(90deg)";
        case "right":
        default:
          return "none";
      }
    },
    wrapperStyle() {
      return {
        width: this.pixelSize,
        height: this.pixelSize,
        display: "inline-block",
        verticalAlign: "middle",
        color: "inherit",
        transform: this.transformStyle
      };
    }
  },
  watch: {
    src: {
      immediate: true,
      handler(val) {
        if (!val) return;

        this.currentSrc = val;

        fetch(val)
          .then((res) => res.text())
          .then((svgText) => {
            if (this.currentSrc !== val) return; // 异步安全

            const cleaned = svgText
              .replace(/<\?xml.*?\?>/g, "")
              .replace(/<!DOCTYPE.*?>/g, "")
              .replace(/fill=".*?"/g, "")
              .replace(/stroke=".*?"/g, "")
              .replace(/(width|height)=".*?"/g, "");

            this.content = cleaned;
          })
          .catch((err) => {
            console.error(`❌ Failed to load SVG: ${val}`, err);
            this.content = ""; // 加载失败时清空内容
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

  ::v-deep(svg) {
    width: 100%;
    height: 100%;
    fill: currentColor;
    display: block;
    transition: fill 0.3s ease, transform 0.3s ease;
  }
}
</style>
