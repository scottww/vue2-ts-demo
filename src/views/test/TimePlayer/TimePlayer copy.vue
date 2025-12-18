<template>
  <div class="time-player-container">
    <!-- 控制按钮 -->
    <div class="time-controls">
      <button class="control-btn prev-btn" @click="previous">
        <span class="icon-prev">⏮️</span>
      </button>

      <button class="control-btn play-pause-btn" @click="togglePlayPause">
        <span class="icon-play-pause">
          {{ isPlaying ? "⏸️" : "▶️" }}
        </span>
      </button>

      <button class="control-btn next-btn" @click="next">
        <span class="icon-next">⏭️</span>
      </button>
    </div>

    <!-- 时间滑块 -->
    <div class="time-slider-container">
      <input
        type="range"
        class="time-slider"
        :min="minTimestamp"
        :max="maxTimestamp"
        :step="timeStep"
        v-model="currentTimestamp"
        @change="handleSliderChange"
      />

      <div class="time-display">
        <span class="current-time">
          {{ formatTime(currentTimestamp) }}
        </span>
        <span class="end-time">
          {{ formatTime(maxTimestamp) }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TimePlayer",

  data() {
    return {
      isPlaying: false,

      // 时间戳（毫秒）
      currentTimestamp: 0,
      minTimestamp: 0,
      maxTimestamp: 0,

      // 播放控制
      playbackTimer: null,

      // 每次播放推进的时间（1小时）
      playbackStep: 3600000,

      // 播放速度（500ms 推进一次）
      playbackIntervalMs: 500,

      // 点击前进 / 后退步长
      timeStep: 3600000
    };
  },

  mounted() {
    // ✅ 使用标准时间格式（关键）
    this.initializeTimeRange("2025-12-20T03:00:00", "2025-12-22T03:00:00");
  },

  beforeDestroy() {
    this.clearTimer();
  },

  methods: {
    /* ================= 初始化 ================= */
    initializeTimeRange(start, end) {
      this.minTimestamp = new Date(start).getTime();
      this.maxTimestamp = new Date(end).getTime();
      this.currentTimestamp = this.minTimestamp;
    },

    /* ================= 播放控制 ================= */
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
      this.clearTimer();
    },

    startTimer() {
      this.clearTimer();

      this.playbackTimer = setInterval(() => {
        this.currentTimestamp += this.playbackStep;

        if (this.currentTimestamp >= this.maxTimestamp) {
          this.currentTimestamp = this.maxTimestamp;
          this.pause();
        }
      }, this.playbackIntervalMs);
    },

    clearTimer() {
      if (this.playbackTimer) {
        clearInterval(this.playbackTimer);
        this.playbackTimer = null;
      }
    },

    /* ================= 手动控制 ================= */
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

    handleSliderChange() {
      // 拖动后如果正在播放，重新计时
      if (this.isPlaying) {
        this.startTimer();
      }
    },

    /* ================= 工具 ================= */
    formatTime(timestamp) {
      if (!timestamp) return "--";

      const d = new Date(timestamp);
      const Y = d.getFullYear();
      const M = String(d.getMonth() + 1).padStart(2, "0");
      const D = String(d.getDate()).padStart(2, "0");
      const h = String(d.getHours()).padStart(2, "0");
      const m = String(d.getMinutes()).padStart(2, "0");

      return `${Y}/${M}/${D} ${h}:${m}`;
    }
  }
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
  transition: 0.3s;
  font-size: 16px;
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

.time-slider-container {
  width: 100%;
}

.time-slider {
  width: 100%;
  margin-bottom: 10px;
}

.time-display {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  font-weight: bold;
}
</style>
