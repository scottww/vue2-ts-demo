<template>
  <div class="print-container">
    <el-button type="primary" @click="printPage" class="print-btn"
      >打印打卡表</el-button
    >
    <el-button @click="saveData" class="print-btn">保存数据</el-button>
    <el-button @click="exportExcel" class="print-btn">导出为 Excel</el-button>
    <el-button @click="exportPDF" class="print-btn">导出为 PDF</el-button>
    <el-button @click="exportJson">导出数据 (JSON)</el-button>
    <el-upload :show-file-list="false" :before-upload="importJson">
      <el-button>导入数据</el-button>
    </el-upload>
    <el-button @click="toWeekPlan">go计划页面</el-button>

    <div id="print-area">
      <h2 class="title">书法每日练字打卡表</h2>
      <el-table
        :data="records"
        border
        style="width: 100%"
        max-height="600px"
        id="print-area"
      >
        <el-table-column prop="date" label="日期" width="120" />
        <el-table-column label="临帖内容">
          <template slot-scope="scope">
            <el-input v-model="scope.row.content" />
          </template>
        </el-table-column>
        <el-table-column label="使用笔墨纸">
          <template slot-scope="scope">
            <el-input v-model="scope.row.tools" />
          </template>
        </el-table-column>
        <el-table-column label="自我评分">
          <template slot-scope="scope">
            <el-rate v-model="scope.row.score" show-score />
          </template>
        </el-table-column>
        <el-table-column label="心得或问题">
          <template slot-scope="scope">
            <el-input type="textarea" v-model="scope.row.notes" />
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
import { exportToExcel } from "@/utils/exportExcel";
import { exportToPDF } from "@/utils/exportPDF";
import { exportJson, importJson } from "@/utils/storage";

export default {
  name: "CalligraphyDailyRecord",
  data() {
    return {
      records: this.loadData()
    };
  },
  methods: {
    printPage() {
      // window.print(); 这个是打印整页 不适用
      const printContent = document.getElementById("print-area").innerHTML;
      const originalContent = document.body.innerHTML;

      // 替换整个 body 内容为打印内容
      document.body.innerHTML = printContent;

      window.print();

      // 打印后恢复原样
      document.body.innerHTML = originalContent;

      // 防止内容不刷新，强制刷新一下
      window.location.reload();
    },
    loadData() {
      const local = localStorage.getItem("daily-calligraphy");
      if (local) return JSON.parse(local);

      // 初始化28天记录
      const today = dayjs();
      return Array.from({ length: 28 }, (_, i) => ({
        date: today.add(i, "day").format("YYYY-MM-DD"),
        content: "",
        tools: "",
        score: 0,
        notes: ""
      }));
    },
    saveData() {
      localStorage.setItem("daily-calligraphy", JSON.stringify(this.records));
      this.$message.success("保存成功");
    },
    exportExcel() {
      exportToExcel(this.records, "书法练字打卡表");
    },
    exportPDF() {
      exportToPDF("print-area", "书法打卡记录");
    },
    exportJson() {
      exportJson(this.records);
    },
    importJson(file) {
      importJson(file, (data) => {
        this.records = data;
        this.saveData();
      });
      return false;
    },
    toWeekPlan() {
      this.$router.push({ name: "weekPlan" });
    }
  }
};
</script>

<style scoped>
.print-container {
  padding: 20px;
  background: white;
}
.title {
  text-align: center;
  margin-bottom: 20px;
}
.print-btn {
  margin-bottom: 15px;
  margin-right: 10px;
}
@media print {
  .print-btn {
    display: none;
  }
}
</style>
