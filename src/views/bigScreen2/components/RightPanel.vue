<template>
  <div class="right-panel">
    <PlaceholderBlock title="泵站统计" />
    <PlaceholderBlock title="雨量分析" />
    <PlaceholderBlock title="防汛预警" />
    <PlaceholderBlock title="水位监测" />
  </div>
</template>

<script>
import PlaceholderBlock from './common/PlaceholderBlock.vue'

export default {
  name: 'RightPanel',
  components: { PlaceholderBlock }
}
</script>

<style scoped>
.right-panel {
  width: 870px;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  background: rgba(0, 0, 50, 0.5);
  overflow-y: auto;
}
</style>
