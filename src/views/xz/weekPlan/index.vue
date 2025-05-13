<template>
  <div>
    <div class="custom-page-header__wrapper">
      <el-page-header @back="goBack" content="详情页面"></el-page-header>
      <div class="right-btn__wrapper">
        <el-button type="primary" @click="handleSave">保 存</el-button>
        <el-button @click="goBack">关 闭</el-button>
      </div>
    </div>

    <el-tabs v-model="activeTab">
      <el-tab-pane label="建议计划" name="suggestion">
        <!-- 建议计划 -->
        <SuggestionVue />
      </el-tab-pane>
      <el-tab-pane label="每日打卡" name="daily">
        <!-- 原打卡表 -->
      </el-tab-pane>
      <el-tab-pane label="周计划" name="weekly">
        <el-table :data="weekPlans" style="width: 100%">
          <el-table-column label="周起始日" prop="weekStart" width="120" />
          <el-table-column label="练习内容" prop="content" />
          <el-table-column label="目标要点" prop="goal" />
          <el-table-column label="使用工具" prop="tools" />
          <el-table-column label="备注" prop="remark" />
          <el-table-column label="操作" width="100">
            <template v-slot="scope">
              <el-button size="mini" @click="editPlan(scope.$index)"
                >编辑</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <el-button type="primary" @click="addPlan">新增计划</el-button>
      </el-tab-pane>
    </el-tabs>
    <!-- 编辑计划弹窗 -->
    <Form
      ref="formDialogRef"
      v-if="formDialogVisible"
      @close="formDialogVisible = false"
    />
  </div>
</template>

<script>
import SuggestionVue from "./suggestion.vue";
import Form from "./Form.vue";
export default {
  components: {
    SuggestionVue,
    Form
  },
  data() {
    return {
      activeTab: "suggestion",
      weekPlans: [
        {
          weekStart: "2025-05-13", // 周一
          content: "集王圣教序 第1段",
          goal: "结构放松，注意转折",
          tools: "羊毫+熟宣",
          remark: "控制节奏，不求快"
        }
      ],
      formDialogVisible: false
    };
  },
  methods: {
    editPlan(index) {
      // 编辑计划
      this.formDialogVisible = true;
      this.$nextTick(() => {
        this.$refs.formDialogRef.init();
        // this.$refs.formDialog.form = this.weekPlans[index];
      });
    },
    addPlan() {
      // 新增计划
    },
    handleSave() {},
    goBack() {
      this.$router.push("/xz");
    }
  }
};
</script>

<style lang="scss" scoped>
.custom-page-header__wrapper {
  padding: 14px 10px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-bottom: 1px solid #dcdfe6;
  .right-btn__wrapper {
    flex-shrink: 0;
    margin-left: auto;
  }
}
</style>