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
      required: true
    },
    tabs: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      currentValue: this.value,
      localTabs: [...this.tabs]
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
      deep: true
    }
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
    }
  }
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
  padding: 6px 14px;
  margin-right: 6px;
  /* background: #f0f2f5; */
  /* border: 1px solid transparent;
  border-radius: 16px; */
  cursor: pointer;
  transition: all 0.2s ease;
  color: #333;
}

.tab-item:hover {
  background-color: #409eff22;
  color: #409eff;
}

.tab-item.active {
  background-color: #409eff;
  color: #fff;
  font-weight: 500;
}

.tab-label {
  margin-right: 8px;
}

.close-btn {
  font-size: 12px;
  color: #fff;
  opacity: 0.8;
  transition: color 0.2s;
}

.tab-item:not(.active) .close-btn {
  color: #999;
}

.tab-item:not(.active) .close-btn:hover {
  color: #f56c6c;
}

.tab-item.active .close-btn:hover {
  color: #ffebeb;
}
</style>
