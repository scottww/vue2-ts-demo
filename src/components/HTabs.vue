<template>
  <div class="h-tabs">
    <div class="h-tabs__nav">
      <div
        :class="{ tab: true, active: activeTab === tab }"
        v-for="(tab, index) in tabs"
        @click="activeTab = tab"
        :key="index"
      >
        {{ tab }}
      </div>
    </div>
    <div class="h-tabs__content">
      <slot :name="activeTab"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "HTabs",
  props: {
    tabs: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      activeTab: this.tabs[0]
    };
  }
};
</script>

<style scoped>
.h-tabs {
  /* display: flex;
  flex-direction: row; */
}
.h-tabs__nav {
  display: flex;
  flex-direction: columns;
}
.tab {
  cursor: pointer;
  padding: 10px;
  margin-right: 5px;
  border: 1px solid gray;
}
.tab.active {
  background-color: gray;
  color: white;
}
.h-tabs__content {
  margin-top: 10px;
  min-height: 200px;
}
</style>
