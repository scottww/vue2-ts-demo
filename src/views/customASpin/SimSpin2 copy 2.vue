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
        animationDelay: `${(n - 1) * 0.15}s`
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

/* 容器：旋转区域 */
.sim-spin-dot {
  position: relative;
  width: 32px;
  height: 32px;
  font-size: 0;
  animation: sim-rotate 1.2s infinite linear;
}

/* 四个点动画容器 */
.sim-spin-dot-spin {
  display: inline-block;
}

/* 四个点样式 */
.sim-spin-dot-item {
  position: absolute;
  width: 8px;
  height: 8px;
  background-color: #1890ff;
  border-radius: 100%;
  opacity: 0.3;
  animation: sim-dot-fade 1.2s infinite ease-in-out;
  transform: scale(1);
}

/* 点位置，呈 45 度角对称分布 */
.sim-spin-dot-item:nth-child(1) {
  top: 0;
  left: 50%;
  transform: translate(-50%, 0);
}
.sim-spin-dot-item:nth-child(2) {
  top: 50%;
  right: 0;
  transform: translate(0, -50%);
}
.sim-spin-dot-item:nth-child(3) {
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 0);
}
.sim-spin-dot-item:nth-child(4) {
  top: 50%;
  left: 0;
  transform: translate(0, -50%);
}

/* 容器旋转动画 */
@keyframes sim-rotate {
  100% {
    transform: rotate(360deg);
  }
}

/* 点透明度淡入淡出动画 */
@keyframes sim-dot-fade {
  0%, 100% {
    opacity: 0.3;
  }
  50% {
    opacity: 1;
  }
}

/* 提示文字 */
.sim-spin-tip {
  margin-top: 8px;
  font-size: 14px;
  color: #1890ff;
  text-align: center;
}
</style>
