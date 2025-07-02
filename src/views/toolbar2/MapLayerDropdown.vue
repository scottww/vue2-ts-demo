<template>
  <div class="layer-dropdown">
    <div
      v-for="(item, index) in layers"
      :key="index"
      class="layer-item"
      :class="{ active: item.value === selected }"
      @click="selectLayer(item.value)"
    >
      {{ item.label }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'MapLayerDropdown',
  props: {
    default: {
      type: String,
      default: 'vector' // 默认矢量图
    }
  },
  data() {
    return {
      selected: this.default,
      layers: [
        { label: '矢量图', value: 'vector' },
        { label: '卫星图', value: 'satellite' },
        { label: '地形图', value: 'terrain' }
      ]
    };
  },
  methods: {
    selectLayer(type) {
      this.selected = type;
      this.$emit('change', type); // 通知外部切换地图图层
    }
  }
};
</script>

<style scoped>
.layer-dropdown {
  display: flex;
  flex-direction: column;
  min-width: 100px;
}
.layer-item {
  padding: 6px 12px;
  cursor: pointer;
  border-radius: 4px;
  transition: background 0.2s;
}
.layer-item:hover {
  background-color: #f5f5f5;
}
.layer-item.active {
  background-color: #e6f7ff;
  color: #1890ff;
  font-weight: bold;
}
</style>
