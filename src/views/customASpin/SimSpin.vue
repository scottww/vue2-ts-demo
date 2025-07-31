<!-- SimSpin.vue -->
<template>
  <div class="sim-spin" v-if="spinning">
    <span class="sim-spin-dot" v-for="n in 4" :key="n" :style="getStyle(n)"></span>
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
    getStyle(n) {
      // 4个点依次动画延迟错开
      return {
        animationDelay: `${(n - 1) * 0.2}s`
      };
    }
  }
};
</script>

<style scoped>
.sim-spin {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  /* flex-direction: column; */
  user-select: none;
}

.sim-spin-dot {
  width: 10px;
  height: 10px;
  margin: 0 4px;
  background-color: #1890ff;
  border-radius: 50%;
  display: inline-block;
  animation: sim-spin-bounce 1.2s infinite ease-in-out both;
}

@keyframes sim-spin-bounce {
  0%, 80%, 100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
}

.sim-spin-tip {
  margin-top: 8px;
  font-size: 14px;
  color: rgba(0,0,0,0.45);
}
</style>
