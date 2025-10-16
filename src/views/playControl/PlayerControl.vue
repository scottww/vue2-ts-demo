<template>
  <div class="player-control-container">
    <!-- 播放 / 暂停按钮 -->
    <button class="control-button" @click="togglePlayPause" title="播放/暂停">
      <img
        :src="isPlaying ? pauseIcon : playIcon"
        alt="播放/暂停"
        class="control-img"
      />
      <!-- <span class="button-text">{{ isPlaying ? '暂停' : '播放' }}</span> -->
    </button>

    <!-- 倍速按钮 -->
    <button class="control-button" @click="handleSpeedClick" title="倍速">
      <img :src="speedIcon" alt="倍速" class="control-img" />
      <!-- <span class="button-text">{{ currentSpeed.toFixed(1) }}x</span> -->
    </button>

    <!-- 结束漫游按钮 -->
    <button class="control-button" @click="handleEndClick" title="结束漫游">
      <img :src="endIcon" alt="结束漫游" class="control-img" />
      <!-- <span class="button-text">结束</span> -->
    </button>
  </div>
</template>

<script>
export default {
  name: 'PlayerControl',

  data() {
    return {
      isPlaying: false,
      currentSpeed: 1.0,
      // 图片路径（可替换为你项目中实际路径）
      playIcon: require('@/assets/playControl/play.png'),
      pauseIcon: require('@/assets/playControl/pause.png'),
      speedIcon: require('@/assets/playControl/speed.png'),
      endIcon: require('@/assets/playControl/end.png'),
    }
  },

  methods: {
    togglePlayPause() {
      this.isPlaying = !this.isPlaying
      this.$emit(this.isPlaying ? 'play' : 'pause')
    },

    handleSpeedClick() {
      if (this.currentSpeed < 5) {
        this.currentSpeed += 1
      } else {
        this.currentSpeed = 1
      }
      this.$emit('speedChange', this.currentSpeed)
    },

    handleEndClick() {
      this.$emit('endTour')
    },
  },
}
</script>

<style scoped>
.player-control-container {
  display: flex;
  gap: 20px;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}

.control-button {
  width: 93px;
  height: 93px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.3);
  /* background: linear-gradient(135deg, #1e88e5 0%, #2196f3 100%); */
  color: white;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  overflow: hidden;
  position: relative;
}

.control-button:hover {
  /* transform: scale(1.05); */
  box-shadow: 0 4px 20px rgba(30, 136, 229, 0.4);
}

.control-button:active {
  transform: scale(0.95);
}

.control-img {
  /* width: 40px;
  height: 40px; */
  object-fit: contain;
  pointer-events: none;
}

.button-text {
  font-size: 14px;
  font-weight: 500;
  margin-top: 6px;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}

/* 响应式适配 */
@media (max-width: 768px) {
  .player-control-container {
    flex-direction: column;
  }
}
</style>
