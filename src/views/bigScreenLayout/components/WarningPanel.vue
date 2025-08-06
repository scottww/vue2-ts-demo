<!-- src/components/WeatherPanel.vue -->
<template>
  <div class="module-panel">
    <h3>{{ title }}</h3>
    <p>告警信息列表...</p>
  </div>
</template>

<script>
export default {
  name: "WarningPanel",
  props: {
    title: String
  }
}
</script>

<style scoped>
.module-panel {
  background: #444;
  color: #eee;
  margin-bottom: 20px;
  padding: 12px;
  border-radius: 8px;
}
</style>
