<template>
  <el-dialog title="编辑周计划" :visible.sync="planDialogVisible">
    <el-form :model="editPlanData" label-width="80px">
      <el-form-item label="周起始">
        <el-date-picker
          v-model="editPlanData.weekStart"
          type="date"
          placeholder="选择周一日期"
        />
      </el-form-item>
      <el-form-item label="内容"
        ><el-input v-model="editPlanData.content"
      /></el-form-item>
      <el-form-item label="目标"
        ><el-input v-model="editPlanData.goal"
      /></el-form-item>
      <el-form-item label="工具"
        ><el-input v-model="editPlanData.tools"
      /></el-form-item>
      <el-form-item label="备注"
        ><el-input v-model="editPlanData.remark"
      /></el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="planDialogVisible = false">取消</el-button>
      <el-button type="primary" @click="savePlan">保存</el-button>
    </div>
  </el-dialog>
</template>

<script>
import dayjs from "dayjs";
export default {
  data() {
    return {
      activeTab: "daily",
      weekPlans: this.loadPlans(),
      planDialogVisible: false,
      editPlanIndex: -1,
      editPlanData: {}
    };
  },
  methods: {
    init() {
      this.planDialogVisible = true;
    },
    loadPlans() {
      return JSON.parse(localStorage.getItem("weekPlans") || "[]");
    },
    savePlans() {
      localStorage.setItem("weekPlans", JSON.stringify(this.weekPlans));
    },
    addPlan() {
      this.editPlanData = {
        weekStart: this.getMonday(dayjs()).format("YYYY-MM-DD"),
        content: "",
        goal: "",
        tools: "",
        remark: ""
      };
      this.editPlanIndex = -1;
      this.planDialogVisible = true;
    },
    editPlan(index) {
      this.editPlanIndex = index;
      this.editPlanData = { ...this.weekPlans[index] };
      this.planDialogVisible = true;
    },
    savePlan() {
      if (this.editPlanIndex >= 0) {
        this.$set(this.weekPlans, this.editPlanIndex, { ...this.editPlanData });
      } else {
        this.weekPlans.push({ ...this.editPlanData });
      }
      this.savePlans();
      this.planDialogVisible = false;
    },
    getMonday(date) {
      const d = dayjs(date);
      return d.subtract((d.day() + 6) % 7, "day"); // 周一
    }
  }
};
</script>

<style>
</style>