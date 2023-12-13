<template>
  <div class="a-tabs-demo">
    <an-tabs
      :tabsData="tabs"
      :activeKey="activeKey"
      @change="onChange"
      @tabClick="onTabClick"
    >
    </an-tabs>
    <br />
    <div></div>
    <a-tabs v-model="activeKey">
      <a-tab-pane v-for="tab in tabs" :key="tab.key" :tab="tab.title">
        {{ tab.content }}
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import AnTabs from "@/components/re-antdv/ATabs.vue";

export default {
  name: "ATabsDemo",
  components: {
    AnTabs
  },
  data() {
    const tabs = [
      {
        key: "1",
        title: "Tab 1",
        content: "Content of Tab 1"
      },
      {
        key: "2",
        title: "Tab 2",
        content: "Content of Tab 2"
      },
      {
        key: "3",
        title: "Tab 3",
        content: "Content of Tab 3",
        closable: false
      }
    ];
    return {
      tabs,
      activeKey: tabs[0].key,
      tabActive: tabs[0]
    };
  },
  mounted() {},
  methods: {
    onChange(e) {
      console.log("eee", e, e.target.value);
    },
    onTabClick(item) {
      console.log("onTabClick", item);
      this.activeKey = item.key;
      this.tabActive = item;
    }
  }
};
</script>
