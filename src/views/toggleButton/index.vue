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
      @speed-change="handleSpeedChange"
      @end-tour="handleEndTour"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import PlayerControl from './PlayerControl.vue';

// 处理播放事件
const handlePlay = () => {
  console.log('播放');
  // 执行播放相关逻辑
};

// 处理暂停事件
const handlePause = () => {
  console.log('暂停');
  // 执行暂停相关逻辑
};

// 处理倍速变化事件
const handleSpeedChange = (speed) => {
  console.log('倍速切换为:', speed);
  // 执行倍速变化相关逻辑
};

// 处理结束漫游事件
const handleEndTour = () => {
  console.log('结束漫游');
  // 执行结束漫游相关逻辑
};
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