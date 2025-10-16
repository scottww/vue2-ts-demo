<template>
  <div class="player-container">
    <!-- 播放器内容区域 -->
    <div class="player-content">
      <!-- 这里可以放置视频或其他内容 -->
    </div>

    <!-- 播放器控制组件 -->
    <PlayerControl
      @play="handlePlay"
      @pause="handlePause"
      @speedChange="handleSpeedChange"
      @endTour="handleEndTour"
    />
  </div>
</template>

<script>
import PlayerControl from './PlayerControl.vue'

export default {
  name: 'PlayerContainer',

  components: {
    PlayerControl,
  },

  methods: {
    handlePlay() {
      console.log('播放')
      // 执行播放相关逻辑
    },
    handlePause() {
      console.log('暂停')
      // 执行暂停相关逻辑
    },
    handleSpeedChange(speed) {
      console.log('倍速切换为:', speed)
      // 执行倍速变化相关逻辑
    },
    handleEndTour() {
      console.log('结束漫游')
      // 执行结束漫游相关逻辑
    },
  },
}
</script>

<style scoped>
.player-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px;
}

.player-content {
  width: 100%;
  max-width: 800px;
  height: 450px;
  background-color: #000;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}
</style>
