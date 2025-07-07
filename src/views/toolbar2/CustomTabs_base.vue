<template>
  <div class="tabs-wrapper">
    <div class="tabs-scroll" ref="scrollContainer">
      <div class="tabs">
        <div
          v-for="tab in localTabs"
          :key="tab.name"
          class="tab-item"
          :class="{ active: tab.name === currentValue }"
          @click="handleClick(tab.name)"
        >
          <span class="tab-label">{{ tab.label }}</span>
          <span class="close-btn" @click.stop="removeTab(tab.name)">×</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CustomTabs",
  props: {
    value: {
      type: String,
      required: true,
    },
    tabs: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      currentValue: this.value,
      localTabs: [...this.tabs],
    };
  },
  watch: {
    value(val) {
      this.currentValue = val;
    },
    tabs: {
      handler(newTabs) {
        this.localTabs = [...newTabs];
      },
      deep: true,
    },
  },
  methods: {
    handleClick(name) {
      this.currentValue = name;
      this.$emit("input", name); // v-model
    },
    removeTab(name) {
      const index = this.localTabs.findIndex((t) => t.name === name);
      if (index !== -1) {
        this.localTabs.splice(index, 1);
        this.$emit("remove", name);

        if (this.currentValue === name) {
          const next = this.localTabs[index] || this.localTabs[index - 1];
          if (next) {
            this.currentValue = next.name;
            this.$emit("input", next.name);
          }
        }
      }
    },
  },
};
</script>

<style scoped>
.tabs-wrapper {
  overflow-x: auto;
  white-space: nowrap;
  border-bottom: 1px solid #dcdfe6;
}

.tabs-scroll {
  overflow-x: auto;
}

.tabs {
  display: inline-flex;
  min-width: max-content;
}

.tab-item {
  display: inline-flex;
  align-items: center;
  padding: 8px 16px;
  margin-right: 4px;
  background: #f5f7fa;
  border: 1px solid #dcdfe6;
  border-bottom: none;
  border-radius: 4px 4px 0 0;
  cursor: pointer;
  position: relative;
  transition: background 0.3s;
}

.tab-item.active {
  background: white;
  border-bottom: 1px solid white;
  font-weight: bold;
}

.tab-label {
  margin-right: 8px;
}

.close-btn {
  font-size: 12px;
  color: #999;
  cursor: pointer;
}

.close-btn:hover {
  color: #f56c6c;
}
</style>
