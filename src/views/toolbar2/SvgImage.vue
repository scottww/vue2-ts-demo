<template>
  <div class="svg-image" :style="wrapperStyle" v-html="content"></div>
</template>

<script>
export default {
  name: "SvgImage",
  props: {
    src: { type: String, required: true },
    size: { type: [Number, String], default: 16 },
    direction: {
      type: String,
      default: "left",
      validator: (v) => ["left", "right", "up", "down"].includes(v)
    }
  },
  data() {
    return {
      content: "",
      currentSrc: "" // 用于异步安全判断
    };
  },
  computed: {
    pixelSize() {
      return typeof this.size === "number" ? `${this.size}px` : this.size;
    },
    transformStyle() {
      switch (this.direction) {
        case "right":
          return "scaleX(-1)";
        case "up":
          return "rotate(-90deg)";
        case "down":
          return "rotate(90deg)";
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
            // 防止异步响应覆盖更新
            if (this.currentSrc !== val) return;

            const cleaned = svgText
              .replace(/<\?xml.*?\?>/g, "")
              .replace(/<!DOCTYPE.*?>/g, "")
              .replace(/fill=".*?"/g, "")
              .replace(/stroke=".*?"/g, "")
              .replace(/(width|height)=".*?"/g, "");

            this.content = cleaned;
          })
          .catch((err) => {
            console.error(`Failed to load SVG from: ${val}`, err);
            this.content = ""; // 清空内容，防止加载失败显示乱码
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
