<template>
  <div class="player-control-container">
    <!-- 暂停/播放按钮组 -->
    <div class="control-buttons-group">
      <!-- 暂停按钮 -->
      <button
        v-if="isPlaying"
        class="control-button pause-button"
        @click="togglePlayPause"
        title="暂停"
      >
        <div class="button-icon pause-icon"></div>
        <span class="button-text">暂停</span>
      </button>

      <!-- 播放按钮 -->
      <button
        v-else
        class="control-button play-button"
        @click="togglePlayPause"
        title="播放"
      >
        <div class="button-icon play-icon"></div>
        <span class="button-text">播放</span>
      </button>
    </div>

    <!-- 其他控制按钮 -->
    <div class="control-buttons-group">
      <!-- 倍速按钮 -->
      <button class="control-button speed-button" @click="handleSpeedClick" title="倍速">
        <div class="button-icon speed-icon"></div>
        <span class="button-text">倍速</span>
      </button>

      <!-- 结束漫游按钮 -->
      <button class="control-button end-button" @click="handleEndClick" title="结束漫游">
        <div class="button-icon end-icon"></div>
        <span class="button-text">结束漫游</span>
      </button>
    </div>

    <!-- 倍速选择下拉框 -->
    <div v-if="showSpeedMenu" class="speed-menu" @click.stop>
      <div
        v-for="speed in speedOptions"
        :key="speed.value"
        class="speed-option"
        :class="{ active: currentSpeed === speed.value }"
        @click="selectSpeed(speed.value)"
      >
        {{ speed.label }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PlayerControl',

  data() {
    return {
      isPlaying: false, // 播放状态
      showSpeedMenu: false, // 倍速菜单显示
      currentSpeed: 1.0, // 当前倍速
      speedOptions: [
        { label: '0.5x', value: 0.5 },
        { label: '1.0x', value: 1.0 },
        { label: '1.5x', value: 1.5 },
        { label: '2.0x', value: 2.0 },
      ],
    }
  },

  methods: {
    togglePlayPause() {
      this.isPlaying = !this.isPlaying
      this.$emit(this.isPlaying ? 'play' : 'pause')
    },

    handleSpeedClick() {
      this.showSpeedMenu = !this.showSpeedMenu
    },

    selectSpeed(speed) {
      this.currentSpeed = speed
      this.showSpeedMenu = false
      this.$emit('speedChange', speed)
    },

    handleEndClick() {
      this.$emit('endTour')
    },

    handleClickOutside(event) {
      const container = this.$el
      if (container && !container.contains(event.target)) {
        this.showSpeedMenu = false
      }
    },
  },

  mounted() {
    document.addEventListener('click', this.handleClickOutside)
  },

  beforeDestroy() {
    document.removeEventListener('click', this.handleClickOutside)
  },
}
</script>

<style scoped>
.player-control-container {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  position: relative;
}

.control-buttons-group {
  display: flex;
  gap: 16px;
}

.control-button {
  width: 93px;
  height: 93px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.3);
  background: linear-gradient(135deg, #1e88e5 0%, #2196f3 100%);
  color: white;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.control-button::before {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  border-radius: 50%;
  border: 2px solid transparent;
  background: linear-gradient(135deg, #42a5f5, #64b5f6, #90caf9, #42a5f5) border-box;
  mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
  mask-composite: exclude;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.control-button:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 20px rgba(30, 136, 229, 0.4);
}

.control-button:hover::before {
  opacity: 1;
}

.control-button:active {
  transform: scale(0.98);
}

.button-icon {
  width: 32px;
  height: 32px;
  position: relative;
}

/* 播放图标样式 */
.play-icon::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-40%, -50%);
  width: 0;
  height: 0;
  border-top: 12px solid transparent;
  border-bottom: 12px solid transparent;
  border-left: 20px solid white;
}

/* 暂停图标样式 */
.pause-icon::before,
.pause-icon::after {
  content: '';
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 6px;
  height: 20px;
  background-color: white;
  border-radius: 1px;
}

.pause-icon::before {
  left: 8px;
}

.pause-icon::after {
  right: 8px;
}

/* 倍速图标样式 */
.speed-icon::before,
.speed-icon::after {
  content: '';
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 6px;
  height: 16px;
  background-color: white;
  border-radius: 1px;
}

.speed-icon::before {
  left: 6px;
  height: 10px;
  top: 35%;
}

.speed-icon::after {
  right: 6px;
}

/* 结束漫游图标样式 */
.end-icon::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 20px;
  height: 20px;
  border: 2px solid white;
  border-radius: 50%;
}

.end-icon::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 12px;
  height: 2px;
  background-color: white;
}

.button-text {
  font-size: 12px;
  font-weight: 500;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

/* 倍速选择菜单 */
.speed-menu {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 8px;
  background: white;
  border-radius: 6px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  padding: 4px 0;
  min-width: 80px;
  z-index: 1000;
}

.speed-option {
  padding: 8px 16px;
  text-align: center;
  cursor: pointer;
  color: #333;
  font-size: 14px;
  transition: background-color 0.2s ease;
}

.speed-option:hover {
  background-color: #f5f5f5;
}

.speed-option.active {
  background-color: #e3f2fd;
  color: #1976d2;
  font-weight: 500;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .player-control-container {
    flex-direction: column;
    align-items: center;
  }

  .control-buttons-group {
    justify-content: center;
  }
}
</style>
