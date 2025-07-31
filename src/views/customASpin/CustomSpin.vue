<!-- Spin.vue -->
<template>
  <div class="a-spin" :style="{ display: spinning ? 'inline-block' : 'none' }" v-if="!tip && !hasSlot">
    <div class="a-spin-dot"></div>
  </div>

  <div v-else class="a-spin-container" :class="{ 'a-spin-blur': spinning }" style="position: relative; display: inline-block;">
    <slot></slot>
    <div v-if="spinning" class="a-spin-overlay">
      <div class="a-spin-dot"></div>
      <div v-if="tip" class="a-spin-tip">{{ tip }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CustomSpin',
  props: {
    spinning: {
      type: Boolean,
      default: true
    },
    tip: {
      type: String,
      default: ''
    }
  },
  computed: {
    hasSlot() {
      return !!this.$slots.default;
    }
  }
};
</script>

<style scoped>
.a-spin-dot {
  width: 32px;
  height: 32px;
  border: 4px solid #1890ff;
  border-top-color: transparent;
  border-radius: 50%;
  animation: a-spin-rotate 1s linear infinite;
  margin: auto;
}

@keyframes a-spin-rotate {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.a-spin-container.a-spin-blur > *:not(.a-spin-overlay) {
  filter: blur(2px);
  pointer-events: none;
  user-select: none;
  opacity: 0.6;
}

.a-spin-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  z-index: 10;
}

.a-spin-tip {
  margin-top: 8px;
  color: rgba(0,0,0,0.45);
  font-size: 14px;
}
</style>
