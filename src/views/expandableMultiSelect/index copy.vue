<template>
  <div class="ExpandableMultiSelect__demo">
    <div class="item">
      <ExpandableMultiSelect
        :options="selectOptions"
        v-model="selected"
        :visibleCount="11"
        :single="true"
        :disabled="false"
        @update:modelValue="onChangeSelect"
      />
    </div>
    <div class="item">
      <ExpandableMultiSelect />
    </div>
  </div>
</template>

<script>
import ExpandableMultiSelect from "@/components/ExpandableMultiSelect"; // 引入封装的组件

export default {
  components: { ExpandableMultiSelect },
  data() {
    return {
      selected: ["all"], // 选中的类型
      selectOptions: [
        { label: "正常", value: "normal" },
        { label: "预警", value: "warning" },
        { label: "告警", value: "alarm" },
        { label: "离线", value: "offline" },
        { label: "维护中", value: "maintenance" }
      ]
    };
  },
  methods: {
    onChangeSelect(v) {
      console.log("change ...", v);
      this.selected = [...v];
    }
  }
};
</script>
<style lang="scss" scoped>
// 组件位置定位参考
.ExpandableMultiSelect__demo .item {
  position: relative;
  padding: 0 20px;
}
</style>
