<template>
  <div class="WaveBackground-demo">
    <wave-background>
      <!-- 这里放置需要显示在波浪背景上的内容 -->
      <div class="content">
        <h3>示例内容</h3>
        <p>这是一个带有波浪纹理的蓝色背景组件</p>
      </div>
    </wave-background>

    <!-- 小尺寸 -->
    <wave-background>
      <div class="wave-background small">小尺寸</div>
    </wave-background>

    <!-- 大尺寸 -->
    <wave-background>
      <div class="wave-background large">大尺寸</div>
    </wave-background>
  </div>
</template>

<script>
import WaveBackground from "./WaveBackground.vue";
export default {
  components: {
    WaveBackground
  }
};
</script>

<style scoped>
.WaveBackground-demo {
  display: flex;
  gap: 8px;
}
.content {
  display: flex;
  flex-direction: column;
}
</style>