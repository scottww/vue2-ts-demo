<template>
  <div class="svg-wrapper" :style="wrapperStyle">
    <div
      class="svg-content"
      v-html="content"
      :style="{ color: 'inherit' }"
    ></div>
  </div>
</template>

<script>
export default {
  name: "SvgImage",
  props: {
    src: {
      type: String,
      required: true,
    },
    size: {
      type: [Number, String],
      default: 16,
    },
    direction: {
      type: String,
      default: null,
      validator: (v) => [null, "", "left", "right", "up", "down"].includes(v),
    },
  },
  data() {
    return {
      content: "",
      currentSrc: "",
    };
  },
  computed: {
    pixelSize() {
      return typeof this.size === "number" ? `${this.size}px` : this.size;
    },
    transformStyle() {
      if (!this.direction) return "none";
      switch (this.direction) {
        case "left":
          return "rotate(180deg)";
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
        transform: this.transformStyle,
        color: "inherit",
      };
    },
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
            if (this.currentSrc !== val) return;
            const cleaned = svgText
              .replace(/<\?xml.*?\?>/g, "")
              .replace(/<!DOCTYPE.*?>/g, "")
              .replace(/fill=".*?"/gi, "")
              .replace(/stroke=".*?"/gi, "")
              .replace(/(width|height)=".*?"/gi, "")
              .replace(/style=".*?(fill|stroke):.*?;?.*?"/gi, "")
              .replace(/<style>.*?<\/style>/gis, "") // 内联 <style>，关键！
              .replace(/class=".*?"/gi, "") // 清除 class="cls-1"
              .replace(
                /<svg([^>]+)>/,
                `<svg$1 style="fill:currentColor;width:100%;height:100%;">`
              );
            this.content = cleaned;
          })
          .catch((err) => {
            console.error("SVG 加载失败", err);
            this.content = "";
          });
      },
    },
  },
};
</script>

<style scoped>
.svg-wrapper {
  display: inline-block;
}

.svg-content {
  width: 100%;
  height: 100%;
  display: block;
}
</style>
