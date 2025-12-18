<template>
  <div class="time-player-container">
    <div class="control-btn" @click="previous">⏮️</div>

    <div class="control-btn" @click="togglePlay">
      {{ isPlaying ? '⏸️' : '▶️' }}
    </div>

    <div class="control-btn" @click="next">⏭️</div>

    <div class="time-slider-wrapper">
      <span class="time-text">{{ formatTime(minTimestamp) }}</span>

      <div class="slider-container">
        <input
          type="range"
          class="time-slider"
          min="0"
          max="100"
          step="0.1"
          v-model.number="progress"
        />

        <div class="current-time-tooltip" :style="{ left: progress + '%' }">
          {{ formatTime(currentTimestamp) }}
        </div>
      </div>

      <span class="time-text">{{ formatTime(maxTimestamp) }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TimePlayer',

  data() {
    return {
      isPlaying: false,

      minTimestamp: 0,
      maxTimestamp: 0,
      currentTimestamp: 0,

      progress: 0, // 0 ~ 100（滑块专用）

      timer: null,
      frameInterval: 100,
      timePerFrame: 60 * 1000, // 每帧推进 1 分钟（你一看就会动）
      step: 60 * 60 * 1000, // 前进后退 1 小时
    };
  },

  watch: {
    // 拖动滑块 → 反算时间
    progress(val) {
      const range = this.maxTimestamp - this.minTimestamp;
      this.currentTimestamp = this.minTimestamp + (range * val) / 100;
    },

    // 时间变化 → 同步滑块
    currentTimestamp(val) {
      const range = this.maxTimestamp - this.minTimestamp;
      this.progress = ((val - this.minTimestamp) / range) * 100;
    },
  },

  mounted() {
    this.init(
      '2025-12-20 03:00',
      '2025-12-22 03:00'
    );
  },

  beforeDestroy() {
    this.stop();
  },

  methods: {
    init(start, end) {
      this.minTimestamp = new Date(start).getTime();
      this.maxTimestamp = new Date(end).getTime();
      this.currentTimestamp = this.minTimestamp;
    },

    togglePlay() {
      this.isPlaying ? this.stop() : this.play();
    },

    play() {
      this.isPlaying = true;
      this.stop();

      this.timer = setInterval(() => {
        const next = this.currentTimestamp + this.timePerFrame;

        if (next >= this.maxTimestamp) {
          this.currentTimestamp = this.maxTimestamp;
          this.stop();
        } else {
          this.currentTimestamp = next;
        }
      }, this.frameInterval);
    },

    stop() {
      this.isPlaying = false;
      clearInterval(this.timer);
      this.timer = null;
    },

    previous() {
      this.currentTimestamp = Math.max(
        this.currentTimestamp - this.step,
        this.minTimestamp
      );
    },

    next() {
      this.currentTimestamp = Math.min(
        this.currentTimestamp + this.step,
        this.maxTimestamp
      );
    },

    formatTime(ts) {
      const d = new Date(ts);
      const p = (n) => String(n).padStart(2, '0');
      return `${d.getFullYear()}/${p(d.getMonth() + 1)}/${p(d.getDate())}
        ${p(d.getHours())}:${p(d.getMinutes())}`;
    },
  },
};
</script>


<style scoped>
.time-player-container {
  display: flex;
  align-items: center;
  background: linear-gradient(135deg, #1e3c72, #2a5298);
  padding: 10px 16px;
  border-radius: 8px;
  color: #fff;
}

.control-btn {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #fff;
  color: #2a5298;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-right: 8px;
}

.time-slider-wrapper {
  display: flex;
  align-items: center;
  flex: 1;
}

.time-text {
  font-size: 12px;
  min-width: 100px;
  text-align: center;
}

.slider-container {
  flex: 1;
  position: relative;
  margin: 0 10px;
}

.time-slider {
  width: 100%;
  -webkit-appearance: none;
  height: 8px;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.4);
}

.time-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #4caf50;
  cursor: pointer;
}

.current-time-tooltip {
  position: absolute;
  top: -26px;
  background: rgba(0, 0, 0, 0.7);
  padding: 2px 6px;
  font-size: 11px;
  border-radius: 4px;
  white-space: nowrap;
}
</style>
