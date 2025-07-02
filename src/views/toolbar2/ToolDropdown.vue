<template>
  <div class="tool-dropdown">
    <div class="tool-item" @click="$emit('tool', 'measure')">📏 测距</div>
    <div class="tool-item" @click="$emit('tool', 'draw')">✏️ 标绘</div>
    <div class="tool-item" @click="$emit('tool', 'clear')">🧹 清除</div>
  </div>
</template>

<script>
export default {
  name: 'ToolDropdown'
};
</script>

<style scoped>
.tool-dropdown {
  display: flex;
  flex-direction: column;
}
.tool-item {
  padding: 6px 12px;
  cursor: pointer;
  border-radius: 4px;
}
.tool-item:hover {
  background-color: #f5f5f5;
}
</style>
