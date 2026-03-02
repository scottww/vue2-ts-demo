<template>
  <div class="expandable-multi-select-demo">
    <div class="demo-block">
      <h3>1. 基础多选</h3>
      <ExpandableMultiSelectDone0
        :options="statusOptions"
        :value="multiSelected"
        :visibleCount="4"
        @update:modelValue="onMultiChange"
      />
      <div class="result">当前选中：{{ displayValue(multiSelected) }}</div>
    </div>

    <div class="demo-block">
      <h3>2. 单选模式</h3>
      <ExpandableMultiSelectDone0
        :options="statusOptions"
        v-model="singleSelected"
        :single="true"
        :visibleCount="4"
        @update:modelValue="onSingleChange"
      />
      <div class="result">当前选中：{{ displayValue(singleSelected) }}</div>
    </div>

    <div class="demo-block">
      <h3>3. 默认全选（空数组表示全部）</h3>
      <ExpandableMultiSelectDone0
        :options="statusOptions"
        :value="defaultAllSelected"
        :visibleCount="4"
        @update:modelValue="onDefaultAllChange"
      />
      <div class="result">当前选中：{{ displayValue(defaultAllSelected) }}</div>
    </div>

    <div class="demo-block">
      <h3>4. 禁用状态</h3>
      <ExpandableMultiSelectDone0
        :options="statusOptions"
        :value="disabledSelected"
        :disabled="true"
      />
      <div class="result">当前选中：{{ displayValue(disabledSelected) }}</div>
    </div>

    <div class="demo-block">
      <h3>5. 展开 / 收起</h3>
      <ExpandableMultiSelectDone0
        :options="manyOptions"
        :value="manySelected"
        :visibleCount="5"
        @update:modelValue="onManyChange"
        @toggle-expand-collapse="onExpandToggle"
      />
      <div class="result">当前选中：{{ displayValue(manySelected) }}</div>
    </div>

    <div class="demo-block filter-row">
      <h3>6. 筛选栏示例</h3>
      <ExpandableMultiSelectDone0
        :options="statusOptions"
        :value="filterSelected"
        :visibleCount="4"
        @update:modelValue="onFilterChange"
      />
      <el-button type="primary" size="mini" @click="handleSearch"
        >查询</el-button
      >
      <el-button size="mini" @click="handleReset">重置</el-button>
    </div>
  </div>
</template>

<script>
// import ExpandableMultiSelectDone0 from "@/components/ExpandableMultiSelect/index_done0.vue";
// import ExpandableMultiSelectDone0 from "@/components/ExpandableMultiSelect/index_done1.vue";
import ExpandableMultiSelectDone0 from "@/components/ExpandableMultiSelect/index.vue";

export default {
  name: "ExpandableMultiSelectDemo",
  components: { ExpandableMultiSelectDone0 },
  data() {
    return {
      multiSelected: [],
      singleSelected: ["all"],
      defaultAllSelected: [],
      disabledSelected: ["offline"],
      manySelected: [],
      filterSelected: [],
      statusOptions: [
        { label: "正常", value: "normal" },
        { label: "预警", value: "warning" },
        { label: "告警", value: "alarm" },
        { label: "离线", value: "offline" },
        { label: "维护中", value: "maintenance" },
        { label: "不稳定", value: "unstable" }
      ],
      manyOptions: Array.from({ length: 20 }, function (_, i) {
        return {
          label: "选项 " + (i + 1),
          value: "option_" + (i + 1)
        };
      })
    };
  },
  methods: {
    onMultiChange(val) {
      this.multiSelected = val;
    },
    onSingleChange(val) {
      console.log(`onSingleChange ...`, val);
      this.singleSelected = [...val];
    },
    onDefaultAllChange(val) {
      this.defaultAllSelected = val;
    },
    onManyChange(val) {
      this.manySelected = val;
    },
    onFilterChange(val) {
      this.filterSelected = val;
    },
    onExpandToggle() {
      // Keep this hook for demo visibility in console.
      console.log("触发展开/收起");
    },
    handleSearch() {
      console.log("筛选条件：", this.filterSelected);
    },
    handleReset() {
      this.filterSelected = [];
    },
    displayValue(val) {
      if (!Array.isArray(val) || val.length === 0) {
        return "全部";
      }
      return val.join(", ");
    }
  }
};
</script>

<style scoped>
.expandable-multi-select-demo {
  padding: 20px;
}

.demo-block {
  width: 650px;
  margin-bottom: 28px;
  border: 1px solid #ebeef5;
  border-radius: 6px;
  padding: 14px 16px;
  background: #fff;
}

.demo-block h3 {
  margin: 0 0 12px;
  font-size: 14px;
  color: #303133;
}

.result {
  margin-top: 10px;
  color: #606266;
  font-size: 13px;
}

.filter-row {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.filter-row h3 {
  width: 100%;
}
</style>
