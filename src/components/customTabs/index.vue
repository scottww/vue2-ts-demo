<template>
  <div
    class="custom-tabs"
    :class="{ 'is-no-border': noBorder, 'show-indicator': showIndicator }"
  >
    <div class="tabs-header" :class="{ 'is-no-bg-color': noBgColor }">
      <span
        v-for="(tab, index) in tabs"
        :key="index"
        :class="{
          'tab-item': true,
          active: selectedTab === tab.value
        }"
        @click="selectTab(tab)"
      >
        {{ tab.label }}
      </span>
    </div>
    <div
      v-if="noContent"
      class="tabs-content"
      :style="{ height: isNaN(h) ? h : `${h}px` }"
    >
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      // 绑定的当前选中的 tab.value, 唯一值
      type: String,
      required: true
    },
    tabs: {
      type: Array,
      required: true
    },
    noBgColor: {
      type: Boolean,
      default: false
    },
    noContent: Boolean, //是否显示content
    showIndicator: Boolean, //是否显示左侧指示条
    noBorder: {
      type: Boolean,
      default: false
    },
    h: {
      type: [Number, String],
      default: ""
    }
  },
  computed: {
    selectedTab() {
      return this.value;
    }
  },
  methods: {
    selectTab(item) {
      this.$emit("tab-click", item);
    }
  }
};
</script>

<style scoped>
.custom-tabs {
  display: flex;
  flex-direction: column;
  border-bottom: 2px solid #ddd;
}

.custom-tabs.show-indicator::before {
  content: "";
  position: absolute;
  left: 0;
  top: 24px;
  bottom: 24px;
  width: 3px;
  background-color: #4c84ff;
}

.tabs-header {
  display: flex;
}

.tab-item {
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  border-bottom: 2px solid transparent;
  transition: all 0.3s;
}

.tab-item.active {
  /* font-weight: bold; */
  border-bottom: 2px solid #409eff;
  color: #409eff;
}

.tabs-content {
  padding: 10px;
  min-height: 200px;
}

.is-no-bg-color {
  background-color: transparent !important;
}
.is-no-border {
  border-bottom: 2px solid transparent;
}
</style>
