<template>
  <div class="import-data">
    <el-button type="primary" @click="handleImport">导入完成</el-button>

    <el-dialog
      :title="`导入错误列表（共 ${errorList.length} 条）`"
      :visible.sync="errorDialogVisible"
      width="900px"
      @closed="handleDialogClosed"
    >
      <div
        ref="tableWrapper"
        style="max-height: 400px; overflow-y: auto"
        @scroll="handleScroll"
      >
        <el-table
          :data="displayList"
          border
          style="width: 100%"
          :loading="tableLoading"
        >
          <el-table-column
            type="index"
            label="序号"
            width="60"
            align="center"
          />
          <el-table-column prop="startKnowName" label="头实体" align="center" />
          <el-table-column prop="endKnowName" label="尾实体" align="center" />
          <el-table-column prop="relationName" label="关系" align="center" />
          <el-table-column prop="attributeOne" label="属性1" align="center" />
          <el-table-column prop="attributeTwo" label="属性2" align="center" />
          <el-table-column
            label="失败原因"
            align="center"
            min-width="180"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span style="color: red; font-weight: bold">
                {{ scope.row.failureReason }}
              </span>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">关闭</el-button>
        <el-button type="danger" @click="exportErrors">导出错误数据</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import XLSX from "xlsx-js-style";
import { saveAs } from "file-saver";
import ErrorDataGenerator from "./ErrorDataGenerator.js";

export default {
  data() {
    return {
      errorDialogVisible: false,
      errorList: [],
      displayList: [],
      tableLoading: false,
      batchSize: 100,
      loadedCount: 0
    };
  },
  methods: {
    handleImport() {
      // 先打开弹窗
      this.errorDialogVisible = true;

      this.$nextTick(() => {
        // 先显示 loading
        this.tableLoading = true;
        this.displayList = [];
        this.loadedCount = 0;
        this.errorList = [];

        // 异步生成数据，确保 loading 显示
        setTimeout(() => {
          const generator = new ErrorDataGenerator();
          // 这里可以分批生成，避免阻塞 UI
          // this.errorList = generator.generate(100000);
          this.errorList = generator.generate(10000);

          // 首次渲染 batchSize 条
          this.displayList = this.errorList.slice(0, this.batchSize);
          this.loadedCount = this.batchSize;

          this.tableLoading = false;
        }, 50); // 50ms 延迟足够让 Vue 渲染出 loading
      });
    },
    async handleImport1() {
      this.errorDialogVisible = true;
      this.tableLoading = true;
      this.displayList = [];
      this.loadedCount = 0;
      this.errorList = [];

      // 分批生成数据，每批 1000 条，避免阻塞主线程
      const generator = new ErrorDataGenerator();
      const total = 100000;
      const batch = 1000;
      for (let i = 0; i < total; i += batch) {
        await new Promise((resolve) => setTimeout(resolve, 0)); // 让浏览器渲染 loading
        const data = generator.generate(batch);
        this.errorList = this.errorList.concat(data);

        // 渲染前几条，让表格显示数据
        if (i === 0) {
          this.displayList = this.errorList.slice(0, this.batchSize);
          this.loadedCount = this.batchSize;
        }
      }

      this.tableLoading = false;
    },

    handleScroll() {
      const wrapper = this.$refs.tableWrapper;
      if (!wrapper) return;

      const scrollBottom = wrapper.scrollTop + wrapper.clientHeight;
      if (scrollBottom >= wrapper.scrollHeight - 10) {
        this.loadMore();
      }
    },

    loadMore() {
      if (this.loadedCount >= this.errorList.length) return;

      const nextCount = Math.min(
        this.loadedCount + this.batchSize,
        this.errorList.length
      );

      // 保留 scrollTop，避免滚动条跳动
      const wrapper = this.$refs.tableWrapper;
      const scrollTop = wrapper ? wrapper.scrollTop : 0;

      this.displayList = this.displayList.concat(
        this.errorList.slice(this.loadedCount, nextCount)
      );
      this.loadedCount = nextCount;

      this.$nextTick(() => {
        if (wrapper) wrapper.scrollTop = scrollTop;
      });
    },

    exportErrors() {
      if (!this.errorList.length) {
        this.$message.warning("没有可导出的错误数据");
        return;
      }

      const exportData = this.errorList.map((item) => ({
        头实体: item.startKnowName,
        尾实体: item.endKnowName,
        关系: item.relationName,
        属性1: item.attributeOne,
        属性2: item.attributeTwo,
        失败原因: item.failureReason
      }));

      const headers = [
        "头实体",
        "尾实体",
        "关系",
        "属性1",
        "属性2",
        "失败原因"
      ];
      const ws = XLSX.utils.json_to_sheet(exportData, {
        header: headers,
        skipHeader: false
      });

      ws["!cols"] = [
        { wch: 15 },
        { wch: 15 },
        { wch: 10 },
        { wch: 15 },
        { wch: 15 },
        { wch: 30 }
      ];

      const range = XLSX.utils.decode_range(ws["!ref"]);
      const borderAll = {
        top: { style: "thin", color: { rgb: "D9D9D9" } },
        bottom: { style: "thin", color: { rgb: "D9D9D9" } },
        left: { style: "thin", color: { rgb: "D9D9D9" } },
        right: { style: "thin", color: { rgb: "D9D9D9" } }
      };
      const headerStyle = {
        font: { bold: true, color: { rgb: "FFFFFF" }, sz: 12 },
        alignment: { horizontal: "center", vertical: "center" },
        fill: { patternType: "solid", fgColor: { rgb: "4F81BD" } },
        border: borderAll
      };
      const bodyStyle = {
        alignment: { horizontal: "center", vertical: "center" },
        border: borderAll
      };
      const reasonStyle = {
        font: { color: { rgb: "D00000" } },
        alignment: { horizontal: "left", vertical: "center", wrapText: true },
        border: borderAll
      };

      for (let c = range.s.c; c <= range.e.c; c++) {
        const cell = ws[XLSX.utils.encode_cell({ r: 0, c })];
        if (cell) cell.s = headerStyle;
      }

      const reasonColIndex = headers.indexOf("失败原因");
      for (let r = 1; r <= range.e.r; r++) {
        for (let c = range.s.c; c <= range.e.c; c++) {
          const addr = XLSX.utils.encode_cell({ r, c });
          if (!ws[addr]) continue;
          ws[addr].s = c === reasonColIndex ? reasonStyle : bodyStyle;
        }
      }

      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "错误数据");
      const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
      saveAs(
        new Blob([wbout], { type: "application/octet-stream" }),
        "错误数据.xlsx"
      );
    },

    handleDialogClosed() {
      this.displayList = [];
      this.loadedCount = 0;
      this.errorList = [];
    },

    closeDialog() {
      this.errorDialogVisible = false;
    }
  },
  watch: {
    // 弹窗打开时，重置滚动条
    errorDialogVisible(val) {
      if (val) {
        this.$nextTick(() => {
          const wrapper = this.$refs.tableWrapper;
          if (wrapper) wrapper.scrollTop = 0;
        });
      }
    }
  }
};
</script>

<style scoped>
.import-data ::v-deep .el-table__header tr th {
  font-weight: 600;
  color: rgb(23, 43, 77) !important;
  background: rgb(244, 245, 246) !important;
}
</style>
