<template>
  <div class="time-player-container">
    <!-- 控制按钮 -->
    <div class="time-controls">
      <button class="control-btn prev-btn" @click="previous">⏮️</button>
      <button class="control-btn play-pause-btn" @click="togglePlayPause">
        {{ isPlaying ? "⏸️" : "▶️" }}
      </button>
      <button class="control-btn next-btn" @click="next">⏭️</button>
    </div>

    <!-- 时间滑块 -->
    <div class="time-slider-wrapper">
      <span class="time-text">{{ formatTime(minTimestamp) }}</span>

      <input
        type="range"
        min="0"
        max="100"
        step="0.1"
        v-model.number="progress"
        class="time-slider"
      />

      <span class="time-text">{{ formatTime(maxTimestamp) }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TimePlayer",
  data() {
    return {
      isPlaying: false,
      minTimestamp: 0,
      maxTimestamp: 0,
      currentTimestamp: 0,
      progress: 0, // 0~100滑块比例
      playbackTimer: null,
      playbackStep: 3600000, // 每帧推进1小时
      playbackIntervalMs: 500,
      timeStep: 3600000, // 点击前进/后退
    };
  },
  mounted() {
    this.initializeTimeRange("2025-12-20T03:00:00", "2025-12-22T03:00:00");
  },
  beforeDestroy() {
    clearInterval(this.playbackTimer);
  },
  methods: {
    initializeTimeRange(start, end) {
      this.minTimestamp = new Date(start).getTime();
      this.maxTimestamp = new Date(end).getTime();
      this.currentTimestamp = this.minTimestamp;
    },
    togglePlayPause() {
      this.isPlaying ? this.pause() : this.play();
    },
    play() {
      if (this.isPlaying) return;
      this.isPlaying = true;
      this.startTimer();
    },
    pause() {
      this.isPlaying = false;
      clearInterval(this.playbackTimer);
      this.playbackTimer = null;
    },
    startTimer() {
      clearInterval(this.playbackTimer);
      this.playbackTimer = setInterval(() => {
        const next = this.currentTimestamp + this.playbackStep;
        if (next >= this.maxTimestamp) {
          this.currentTimestamp = this.maxTimestamp;
          this.pause();
        } else {
          this.currentTimestamp = next;
        }
      }, this.playbackIntervalMs);
    },
    previous() {
      this.currentTimestamp = Math.max(
        this.currentTimestamp - this.timeStep,
        this.minTimestamp
      );
    },
    next() {
      this.currentTimestamp = Math.min(
        this.currentTimestamp + this.timeStep,
        this.maxTimestamp
      );
    },
    formatTime(ts) {
      const d = new Date(ts);
      const p = (n) => String(n).padStart(2, "0");
      return `${d.getFullYear()}/${p(d.getMonth() + 1)}/${p(d.getDate())} ${p(
        d.getHours()
      )}:${p(d.getMinutes())}`;
    },
  },
  watch: {
    progress(val) {
      const range = this.maxTimestamp - this.minTimestamp;
      this.currentTimestamp = this.minTimestamp + (range * val) / 100;
    },
    currentTimestamp(val) {
      const range = this.maxTimestamp - this.minTimestamp;
      this.progress = ((val - this.minTimestamp) / range) * 100;
    },
  },
};
</script>

<style scoped>
.time-player-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
  border-radius: 12px;
  padding: 15px 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  color: white;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
}

.time-controls {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.control-btn {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  margin: 0 6px;
  cursor: pointer;
  font-size: 16px;
  transition: 0.3s;
}
.control-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: scale(1.1);
}

.play-pause-btn {
  width: 52px;
  height: 52px;
  font-size: 20px;
}

.time-slider-wrapper {
  display: flex;
  align-items: center;
  width: 100%;
}

.time-text {
  width: 100px; /* 可以调整时间文本宽度 */
  text-align: center;
  font-weight: bold;
}

.time-slider {
  flex: 1; /* 拉伸填满剩余空间 */
  margin: 0 10px;
}
</style>
