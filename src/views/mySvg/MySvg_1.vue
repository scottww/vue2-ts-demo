<template>
  <i
    class="mySvg"
    :class="name"
    :style="iconStyle"
  ></i>
</template>

<script>
export default {
  name: 'MySvg',
  props: {
    name: {
      type: String,
      required: true
    },
    size: {
      type: [String, Number],
      default: 16 // 默认 16px
    },
    color: {
      type: String,
      default: '#333'
    }
  },
  computed: {
    iconStyle() {
      return {
        fontSize: typeof this.size === 'number' ? `${this.size}px` : this.size,
        color: this.color
      }
    }
  }
}
</script>

<style scoped>
.mySvg {
  display: inline-block;
  line-height: 1;
}
</style>
