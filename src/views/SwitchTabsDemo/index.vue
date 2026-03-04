<template>
  <div class="switch-tabs-demo">
    <!-- 尺寸展示 -->
    <div class="demo-section">
      <div class="section-title">尺寸 size</div>
      <SectionDivider />

      <div v-for="size in sizeList" :key="size" class="demo-block">
        <div class="demo-title">
          {{ size }}
        </div>

        <SwitchTabs v-model="activeType" :options="typeOptions" :size="size" />
      </div>
    </div>

    <!-- 主题展示 -->
    <div class="demo-section">
      <div class="section-title">主题 theme</div>
      <SectionDivider />

      <div v-for="theme in themeList" :key="theme" class="demo-block">
        <div class="demo-title">
          {{ theme }}
        </div>

        <SwitchTabs
          v-model="activeType"
          :options="typeOptions"
          size="default"
          :theme="theme"
        />
      </div>
    </div>

    <!-- 当前值 -->
    <div class="demo-value">当前选中值：{{ activeType }}</div>
  </div>
</template>

<script>
import SwitchTabs from "@/components/switchTabs/SwitchTabs.vue";
import SectionDivider from "@/components/switchTabs/SectionDivider.vue";

export default {
  name: "SwitchTabsDemo",

  components: {
    SwitchTabs,
    SectionDivider
  },

  data() {
    return {
      activeType: "day",

      sizeList: ["mini", "small", "default", "large"],

      themeList: ["primary", "success", "warning", "danger"],

      typeOptions: [
        { label: "日消费", value: "day" },
        { label: "月消费", value: "month" },
        { label: "年消费", value: "year" }
      ]
    };
  }
};
</script>

<style scoped>
.switch-tabs-demo {
  /* padding: 10px; */
  background: #fff;
}

.demo-section {
  margin-bottom: 20px;
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 10px;
  color: #222;
}

.demo-block {
  margin-top: 10px;
  margin-bottom: 10px;
}

.demo-title {
  font-size: 13px;
  margin-bottom: 10px;
  color: #666;
  text-transform: capitalize;
}

.demo-value {
  margin-top: 10px;
  font-size: 14px;
  color: #444;
  padding: 12px;
  background: #f5f7fa;
  border-radius: 4px;
}
</style>
