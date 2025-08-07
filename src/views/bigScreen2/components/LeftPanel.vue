<template>
  <div class="left-panel">
    <PlaceholderBlock title="工程概况" />
    <PlaceholderBlock title="水情信息" />
    <PlaceholderBlock title="天气情况" />
  </div>
</template>

<script>
import PlaceholderBlock from './common/PlaceholderBlock.vue'

export default {
  name: 'LeftPanel',
  components: { PlaceholderBlock }
}
</script>

<style scoped>
.left-panel {
  width: 870px;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  background: rgba(0, 0, 50, 0.5);
  overflow-y: auto;
}
</style>
