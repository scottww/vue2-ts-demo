<template>
  <div class="CustomTabs__demo">
    <div class="item">
      <CustomTabs v-model="activeTab" :tabs="tabList" @tab-click="change" showIndicator>
        <div v-if="activeTab === 'Tab 1'">Tab 1 Content</div>
        <div v-if="activeTab === 'Tab 2'">Tab 2 Content</div>
      </CustomTabs>
    </div>
    <div class="item">
      <CustomTabs
        v-model="activeTab"
        :tabs="tabList"
        @tab-click="change"
        noBorder
      >
        <div v-if="activeTab === 'Tab 1'"></div>
        <div v-if="activeTab === 'Tab 2'"></div>
      </CustomTabs>
    </div>
  </div>
</template>

<script>
import CustomTabs from "@/components/customTabs"; // 引入封装的组件

export default {
  components: { CustomTabs },
  data() {
    return {
      activeTab: "Tab 1", // 默认选中的 tab
      tabList: [
        { label: "Tab 1", value: "Tab 1" },
        { label: "Tab 2", value: "Tab 2" }
      ]
    };
  },
  methods: {
    change(v) {
      console.log("change ...", v);
      this.activeTab = v.value;
    }
  }
};
</script>
<style lang="scss" scoped>
// 组件指示器位置定位参考
.CustomTabs__demo .item {
  position: relative; 
  padding: 0 20px;
}
</style>
