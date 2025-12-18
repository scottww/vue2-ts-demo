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
  gap: 14px;

  padding: 16px 20px;
  border-radius: 12px;

  /* 玻璃拟态 */
  background: rgba(20, 28, 45, 0.65);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);

  box-shadow:
    0 8px 24px rgba(0, 0, 0, 0.25),
    inset 0 0 0 1px rgba(255, 255, 255, 0.06);

  color: #e6ebf5;
  width: 100%;
  max-width: 820px;
  margin: 0 auto;
}

/* ================= 控制按钮 ================= */
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

  background: linear-gradient(
    135deg,
    #4f8cff,
    #3a6fd8
  );
  box-shadow:
    0 6px 16px rgba(79, 140, 255, 0.45);
}

.play-pause-btn:hover {
  filter: brightness(1.08);
}

/* icon 统一处理 */
.icon-prev,
.icon-next,
.icon-play-pause {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  font-style: normal;
}

/* ================= 时间滑块 ================= */
.time-slider-container {
  width: 100%;
}

.time-slider {
  width: 100%;
  height: 6px;
  appearance: none;
  border-radius: 3px;
  outline: none;

  background: linear-gradient(
    to right,
    #4f8cff,
    rgba(255, 255, 255, 0.15)
  );
}

/* Chrome / Edge */
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

/* Firefox */
.time-slider::-moz-range-thumb {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #4f8cff;
  border: 2px solid rgba(255, 255, 255, 0.9);
  cursor: pointer;
}

/* ================= 时间文本 ================= */
.time-display {
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-top: 6px;
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
