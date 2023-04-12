<template>
  <div class="tabs-example">
    <h-tabs :data="tabs" :curType="tab" @tab-click="tabChange">
      <template #content>
        <p>{{ tabActive.label }}</p>
      </template>
    </h-tabs>
  </div>
</template>

<script>
import HTabs from "@/components/HTabs0.vue";
export default {
  name: "Tabs0",
  components: {
    HTabs
  },
  data() {
    return {
      tabs: [
        {
          label: "Tab 1",
          value: "1"
        },
        {
          label: "Tab 2",
          value: "2"
        },
        {
          label: "Tab 3",
          value: "3"
        }
      ],
      tab: "1"
    };
  },
  computed: {
    tabActive({ tabs, tab }) {
      if (!tabs) return;
      debugger;
      const item = tabs.find((i) => i.value === tab);
      return item ? item : tabs[0];
    }
  },
  methods: {
    tabChange(item) {
      console.log("tabChange", item);
      this.tab = item.value;
    }
  }
};
</script>
<style scoped>
.tabs-example {
  width: 500px;
  padding: 20px;
}
</style>
