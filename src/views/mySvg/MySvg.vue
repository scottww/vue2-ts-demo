<template>
  <i
    class="my-svg"
    :class="[name, { spin }]"
    :style="iconStyle"
    @mouseover="onHover"
    @mouseleave="onLeave"
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
      default: 16
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
        transition: 'color 0.3s ease'
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
.my-svg {
  display: inline-block;
  line-height: 1;
  transition: transform 0.3s ease;
}

.spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
