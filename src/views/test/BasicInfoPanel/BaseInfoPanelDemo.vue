<template>
  <div class="BasicInfoPanelDemo" style="padding: 10px">
    <BasicInfoPanel0 :selectedItems="selectedItems" @selectionChange="handleSelectionChange" />
    <BasicInfoPanel :selectedItems="selectedItems" @selectionChange="handleSelectionChange" />
  </div>
</template>

<script>
import BasicInfoPanel0 from "./BasicInfoPanel0.vue";
import BasicInfoPanel from "./BasicInfoPanel.vue";

export default {
  components: { BasicInfoPanel0, BasicInfoPanel },
  data() {
    return {
      selectedItems: ['rainfall', 'waterLevel', 'soil', 'flow', 'waterQuality']
    };
  },
  methods: {
    // 处理选中项目变化
    handleSelectionChange(selectedItems) {
      console.log("handleSelectionChange:", selectedItems);
      // 更新选中项目
      this.selectedItems = selectedItems;
    },
  }
};
</script>

<style>
.BasicInfoPanelDemo {
  display: flex;
  gap: 20px;
}
</style>
