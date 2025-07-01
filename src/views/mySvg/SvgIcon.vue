<template>
  <i
    class="mySvg"
    :class="name"
    :style="iconStyle"
    @mouseover="onHover"
    @mouseleave="onLeave"
  ></i>
</template>

<script>
export default {
  name: 'SvgIcon',
  props: {
    name: {
      type: String,
      required: true
    },
    size: {
      type: [Number, String],
      default: 24
    },
    color: {
      type: String,
      default: '#333'
    },
    hoverColor: {
      type: String,
      default: ''
    },
    spin: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      currentColor: this.color
    }
  },
  computed: {
    iconStyle() {
      return {
        fontSize: typeof this.size === 'number' ? `${this.size}px` : this.size,
        color: this.currentColor,
        transition: 'color 0.3s ease',
        display: 'inline-block',
        lineHeight: 1,
        animation: this.spin ? 'spin 1s linear infinite' : 'none'
      }
    }
  },
  methods: {
    onHover() {
      if (this.hoverColor) {
        this.currentColor = this.hoverColor
      }
    },
    onLeave() {
      this.currentColor = this.color
    }
  }
}
</script>

<style scoped>
@keyframes spin {
  0% { transform: rotate(0deg);}
  100% { transform: rotate(360deg);}
}
</style>
