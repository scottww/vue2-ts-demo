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
  /* border-bottom: 1px solid #dcdfe6; */
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
  padding: 4px 14px;
  margin-right: 6px;
  /* background-color: #f0f2f5; /* 未选中背景 */
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.2s ease;
  color: #fff;
}

.tab-item:hover {
  background-color: #e6f0ff; /* hover 蓝灰背景 */
  color: #409eff;
}

.tab-item.active {
  background-color: #409eff;
  color: #fff;
  font-weight: 500;

  /* background: linear-gradient(to bottom, #0187F2 0%, rgba(16, 203, 179, 0.6) 100%); */
  background: linear-gradient(
    to bottom,
    rgba(16, 203, 179, 0.6) 0%,
    #0187f2 100%
  );
  border-radius: 11px 11px 11px 11px;
  /* border: 1px solid; */
  border-image: radial-gradient(circle, rgba(0, 240.016, 255, 1)) 1 1;
}

.tab-label {
  margin-right: 8px;
  font-size: 14px;
}

.close-btn {
  font-size: 16px;
  cursor: pointer;
  color: inherit;
  /* margin-left: 6px; */
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.2s ease, visibility 0.2s ease;
}

/* hover 或 active 时显示 */
.tab-item:hover .close-btn,
.tab-item.active .close-btn {
  opacity: 1;
  visibility: visible;
}

.close-btn:hover {
  color: #f56c6c;
}
</style>
