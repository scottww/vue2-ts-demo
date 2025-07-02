<template>
  <svg
    :style="style"
    class="svg-image"
    xmlns="http://www.w3.org/2000/svg"
    v-html="content"
  />
</template>

<script>
export default {
  name: 'SvgImage',
  props: {
    src: { type: String, required: true },
    size: { type: [Number, String], default: 16 },
    color: { type: String, default: '#666' },
    hoverColor: { type: String, default: '#1890ff' }
  },
  data() {
    return {
      content: ''
    };
  },
  computed: {
    style() {
      return {
        width: typeof this.size === 'number' ? `${this.size}px` : this.size,
        height: typeof this.size === 'number' ? `${this.size}px` : this.size,
        fill: 'currentColor' // ✅ 关键
      };
    }
  },
  watch: {
    src: {
      immediate: true,
      handler(val) {
        fetch(val)
          .then(res => res.text())
          .then(svg => {
            // ✅ 移除原始 fill 让外部控制
            this.content = svg.replace(/fill=".*?"/g, '');
          });
      }
    }
  }
};
</script>

<style scoped>
.svg-image {
  display: inline-block;
  vertical-align: middle;
  transition: color 0.3s ease;
  color: inherit; /* 继承父级颜色 */
}
</style>
