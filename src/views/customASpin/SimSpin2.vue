<template>
  <div class="sim-spin" v-if="spinning">
    <span class="sim-spin-dot sim-spin-dot-spin">
      <span
        v-for="n in 4"
        :key="n"
        class="sim-spin-dot-item"
        :style="getDelay(n)"
      />
    </span>
    <div v-if="tip" class="sim-spin-tip">{{ tip }}</div>
  </div>
</template>

<script>
export default {
  name: 'SimSpin',
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
  methods: {
    getDelay(n) {
      return {
        animationDelay: `${(n - 1) * 0.3}s`
      }
    }
  }
}
</script>

<style scoped>
.sim-spin {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

/* === 容器: 旋转的圆 === */
.sim-spin-dot {
  display: inline-block;
  /* font-size: 20px; */
  width: 1em;
  height: 1em;
  position: relative;
  box-sizing: border-box;
}

.sim-spin-dot-spin {
  transform: rotate(45deg);
  animation: sim-rotate 1.2s infinite linear;
}

/* === 四个点 === */
.sim-spin-dot-item {
  position: absolute;
  width: 9px;
  height: 9px;
  background-color: #1890ff;
  border-radius: 100%;
  opacity: 0.3;
  transform: scale(0.75);
  transform-origin: 50% 50%;
  animation: sim-dot-fade 1s infinite linear alternate;
}

/* 绝对定位点 */
.sim-spin-dot-item:nth-child(1) {
  top: 0;
  left: 50%;
  transform: translate(-50%, -52%) scale(0.75);
}
.sim-spin-dot-item:nth-child(2) {
  top: 50%;
  right: 0;
  transform: translate(52%, -50%) scale(0.75);
}
.sim-spin-dot-item:nth-child(3) {
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 52%) scale(0.75);
}
.sim-spin-dot-item:nth-child(4) {
  top: 50%;
  left: 0;
  transform: translate(-52%, -50%) scale(0.75);
}

/* === 动画 === */
@keyframes sim-rotate {
  100% {
    transform: rotate(405deg); /* 360 + 初始 45 */
  }
}

@keyframes sim-dot-fade {
  0% {
    opacity: 0.3;
  }
  100% {
    opacity: 1;
  }
}

/* 文案 */
.sim-spin-tip {
  margin-top: 8px;
  font-size: 14px;
  /* color: rgba(0, 0, 0, 0.45); */
  color: #1890ff;
  text-align: center;
}
</style>
