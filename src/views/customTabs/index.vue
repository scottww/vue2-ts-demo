<template>
  <div>
    <CustomTabs v-model="activeTab" :tabs="tabList" @tab-click="change">
      <div v-if="activeTab === 'Tab 1'">Tab 1 Content</div>
      <div v-if="activeTab === 'Tab 2'">Tab 2 Content</div>
    </CustomTabs>

    <CustomTabs v-model="activeTab" :tabs="tabList" @tab-click="change" noBorder>
      <div v-if="activeTab === 'Tab 1'"></div>
      <div v-if="activeTab === 'Tab 2'"></div>
    </CustomTabs>
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
