<template>
  <div class="tabs">
    <div class="tabs-bar tabs-nav">
      <div
        class="tabs-tab"
        v-for="(tab, index) in tabsData"
        :key="index"
        :class="{ 'tabs-tab-active': activeTab === tab }"
        @click="handleTabClick(tab)"
      >
        {{ tab.title }}
      </div>
    </div>
    <template v-if="$slots.content && $slots.content.length">
      <div class="tabs-content" :style="{ height: isNaN(h) ? h : `${h}px` }">
        <slot name="content"></slot>
      </div>
    </template>
    <template v-else>
      <div class="tabs-content">
        {{ activeTab.content }}
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: "Tab",
  props: {
    tabsData: {
      type: Array,
      required: true
    },
    activeKey: {
      type: String
    },
    h: {
      type: [Number, String],
      default: ""
    }
  },
  data() {
    return {
      activeTab: this.tabsData[0]
    };
  },
  computed: {},
  mounted() {
    console.log(this.$slots.content, this.activeTab);
  },
  methods: {
    handleTabClick(item) {
      this.$emit("tabClick", item);
    }
  },
  watch: {
    activeKey(v) {
      console.log("v change", v);
      this.activeTab = this.tabsData.find((i) => i.key === v);
    }
  }
};
</script>
<style lang="scss" scoped>
.tabs-bar {
  margin: 0 0 16px 0;
  border-bottom: 1px solid #e8e8e8;
  outline: none;
  transition: padding 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
}
.tabs-nav .tabs-tab {
  position: relative;
  display: inline-block;
  box-sizing: border-box;
  height: 100%;
  margin: 0 32px 0 0;
  padding: 12px 16px;
  text-decoration: none;
  cursor: pointer;
  transition: color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
}
.tabs-nav .tabs-tab-active {
  color: #1890ff;
  font-weight: 500;
  border-bottom: 2px solid #1890ff;
}
.tabs-nav .tabs-tab::before {
  position: absolute;
  top: -1px;
  left: 0;
  width: 100%;
  border-top: 2px solid transparent;
  border-radius: 4px 4px 0 0;
  transition: all 0.3s;
  content: "";
  pointer-events: none;
}
.tabs-content {
  color: rgba(0, 0, 0, 0.65);
}
// .tabs-tab-active.tabs-ink-bar {
//   position: absolute;
//   bottom: 1px;
//   left: 0;
//   z-index: 1;
//   box-sizing: border-box;
//   width: 0;
//   height: 2px;
//   background-color: #1890ff;
//   transform-origin: 0 0;
// }
</style>
