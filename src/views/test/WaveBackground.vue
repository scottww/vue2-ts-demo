<template>
  <div class="wave-background-container">
    <!-- 波浪背景内容区域 -->
    <div class="wave-background">
      <!-- 这里可以放置内容 -->
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WaveBackground'
}
</script>

<style scoped>
.wave-background-container {
  position: relative;
  display: inline-block;
  padding: 10px;
  background-color: #f0f8ff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.wave-background {
  width: 300px; /* 默认宽度 */
  height: 400px; /* 默认高度 */
  background: linear-gradient(135deg, #0078d4 0%, #00a4ef 100%);
  border: 3px solid #00a4ef;
  border-radius: 4px;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 18px;
  font-weight: bold;
}

/* 波浪纹理背景 */
.wave-background::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    repeating-linear-gradient(0deg, transparent, transparent 30px, rgba(255, 255, 255, 0.08) 30px, rgba(255, 255, 255, 0.08) 60px),
    repeating-linear-gradient(90deg, transparent, transparent 30px, rgba(255, 255, 255, 0.08) 30px, rgba(255, 255, 255, 0.08) 60px),
    radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
  opacity: 0.8;
  z-index: 1;
}

/* 波浪图案 */
.wave-background::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    linear-gradient(0deg, transparent 24%, rgba(255, 255, 255, 0.05) 25%, rgba(255, 255, 255, 0.05) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, 0.05) 75%, rgba(255, 255, 255, 0.05) 76%, transparent 77%, transparent),
    linear-gradient(90deg, transparent 24%, rgba(255, 255, 255, 0.05) 25%, rgba(255, 255, 255, 0.05) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, 0.05) 75%, rgba(255, 255, 255, 0.05) 76%, transparent 77%, transparent);
  background-size: 50px 50px;
  z-index: 2;
  animation: waveMove 10s linear infinite;
}

/* 波浪动画 */
@keyframes waveMove {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 100px 100px;
  }
}

/* 内容区域 */
.wave-background > * {
  position: relative;
  z-index: 3;
}

/* 可定制尺寸 */
.wave-background.small {
  width: 200px;
  height: 300px;
}

.wave-background.large {
  width: 400px;
  height: 500px;
}
</style>