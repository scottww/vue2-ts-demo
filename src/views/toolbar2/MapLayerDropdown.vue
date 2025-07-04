<template>
  <div class="layer-dropdown">
    <div
      v-for="(item, index) in items"
      :key="index"
      class="layer-item"
      :class="{ active: item.value === selected }"
      @mouseenter="hoverIndex = index"
      @mouseleave="hoverIndex = null"
      @click="selectLayer(item.value)"
    >
      <component
        v-if="item.component"
        :is="item.component"
        v-bind="item.componentProps"
        :isHover="hoverIndex === index || item.value === selected"
      />
      <span class="label">{{ item.label }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MapLayerDropdown',
  props: {
    value: {
      type: String,
      default: 'vector'
    },
    // default: {
    //   type: String,
    //   default: 'vector'
    // },
    items: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      // selected: this.default,
      hoverIndex: null
    };
  },
  computed: {
    selected() {
      return this.value; // 绑定外部值
    }
  },
  methods: {
    selectLayer(value) {
      this.$emit('change', value);
    }
  },
};
</script>

<style scoped>
.layer-dropdown {
  display: flex;
  flex-direction: column;
  /* min-width: 120px; */
}
.layer-item {
  padding: 6px 12px;
  cursor: pointer;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: background 0.2s;
  color: #333;
}
.layer-item:hover {
  background-color: #f5f5f5;
  color: #1890ff;
}
.layer-item.active {
  background-color: #e6f7ff;
  color: #1890ff;
  font-weight: bold;
}
.label {
  font-size: 14px;
}
</style>
