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
        class="time-slider"
        min="0"
        max="100"
        step="0.1"
        v-model.number="progress"
      />

      <span class="time-text">{{ formatTime(maxTimestamp) }}</span>
    </div>

    <!-- 当前时间显示 -->
    <div class="time-display">
      <span class="current-time">{{ formatTime(currentTimestamp) }}</span>
      <span class="end-time">{{ formatTime(maxTimestamp) }}</span>
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
      progress: 0, // 滑块百分比 0~100
      playbackTimer: null,
      playbackStep: 3600000, // 每次播放推进1小时
      playbackIntervalMs: 500,
      timeStep: 3600000, // 前进/后退步长
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
      this.updateProgressFromTimestamp();
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
          this.updateProgressFromTimestamp();
          this.pause();
        } else {
          this.currentTimestamp = next;
          this.updateProgressFromTimestamp();
        }
      }, this.playbackIntervalMs);
    },
    previous() {
      this.currentTimestamp = Math.max(
        this.currentTimestamp - this.timeStep,
        this.minTimestamp
      );
      this.updateProgressFromTimestamp();
    },
    next() {
      this.currentTimestamp = Math.min(
        this.currentTimestamp + this.timeStep,
        this.maxTimestamp
      );
      this.updateProgressFromTimestamp();
    },
    handleSliderChange() {
      if (this.isPlaying) this.startTimer();
    },
    updateProgressFromTimestamp() {
      const range = this.maxTimestamp - this.minTimestamp;
      this.progress = ((this.currentTimestamp - this.minTimestamp) / range) * 100;
    },
    updateTimestampFromProgress() {
      const range = this.maxTimestamp - this.minTimestamp;
      this.currentTimestamp = this.minTimestamp + (range * this.progress) / 100;
    },
    formatTime(ts) {
      if (!ts) return "--";
      const d = new Date(ts);
      const pad = (n) => String(n).padStart(2, "0");
      return `${d.getFullYear()}/${pad(d.getMonth() + 1)}/${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
    },
  },
  watch: {
    progress() {
      this.updateTimestampFromProgress();
    },
    currentTimestamp() {
      this.updateProgressFromTimestamp();
    },
  },
};
</script>

<style scoped>
.time-player-container {
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 16px 20px;
  border-radius: 12px;
  background: rgba(20, 28, 45, 0.65);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25), inset 0 0 0 1px rgba(255, 255, 255, 0.06);
  color: #e6ebf5;
  width: 100%;
  max-width: 820px;
  margin: 0 auto;
}

/* 控制按钮 */
.time-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
}
.control-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  background: rgba(255, 255, 255, 0.08);
  color: #fff;
  transition: all 0.2s ease;
}
.control-btn:hover {
  background: rgba(255, 255, 255, 0.18);
  transform: translateY(-1px);
}
.control-btn:active {
  transform: translateY(0);
  background: rgba(255, 255, 255, 0.25);
}
.play-pause-btn {
  width: 54px;
  height: 54px;
  font-size: 22px;
  background: linear-gradient(135deg, #4f8cff, #3a6fd8);
  box-shadow: 0 6px 16px rgba(79, 140, 255, 0.45);
}
.play-pause-btn:hover {
  filter: brightness(1.08);
}

/* 滑块 */
.time-slider-wrapper {
  display: flex;
  align-items: center;
  width: 100%;
}
.time-text {
  width: 80px;
  text-align: center;
  font-weight: 600;
}
.time-slider {
  flex: 1;
  height: 6px;
  appearance: none;
  border-radius: 3px;
  outline: none;
  margin: 0 10px;
  background: linear-gradient(to right, #4f8cff, rgba(255, 255, 255, 0.15));
}
.time-slider::-webkit-slider-thumb {
  appearance: none;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #4f8cff;
  border: 2px solid rgba(255, 255, 255, 0.9);
  cursor: pointer;
  box-shadow: 0 0 10px rgba(79, 140, 255, 0.7);
  transition: transform 0.2s ease;
}
.time-slider::-webkit-slider-thumb:hover {
  transform: scale(1.15);
}
.time-slider::-moz-range-thumb {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #4f8cff;
  border: 2px solid rgba(255, 255, 255, 0.9);
  cursor: pointer;
}

/* 当前时间文本 */
.time-display {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  letter-spacing: 0.3px;
  color: rgba(230, 235, 245, 0.85);
}
.current-time {
  font-weight: 600;
}
.end-time {
  opacity: 0.7;
}
</style>
