<template>
  <div class="import-data">
    <!-- 模拟触发导入完成 -->
    <el-button type="primary" @click="handleImport">导入完成</el-button>

    <!-- 错误列表弹窗 -->
    <el-dialog
      :title="`导入错误列表（共 ${errorList.length} 条）`"
      :visible.sync="errorDialogVisible"
      width="900px"
    >
      <el-table
        v-if="errorList.length"
        :data="errorList"
        border
        style="width: 100%"
        :loading="tableLoading" 
        max-height="400"
      >
        <el-table-column type="index" label="序号" width="60" align="center" />
        <el-table-column prop="startKnowName" label="头实体" align="center" />
        <el-table-column prop="endKnowName" label="尾实体" align="center" />
        <el-table-column prop="relationName" label="关系" align="center" />
        <el-table-column prop="attributeOne" label="属性一" align="center" />
        <el-table-column prop="attributeTwo" label="属性二" align="center" />
        <!-- 失败原因：用 slot 自定义，标红 -->
        <el-table-column label="失败原因" align="center">
          <template slot-scope="scope">
            <span style="color: red; font-weight: bold">
              {{ scope.row.failureReason }}
            </span>
          </template>
        </el-table-column>
      </el-table>

      <span slot="footer" class="dialog-footer">
        <el-button @click="errorDialogVisible = false">关闭</el-button>
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
      tableLoading: false // 控制表格加载状态
    };
  },
  methods: {
    // 模拟导入后的请求
    handleImport() {
      const generator = new ErrorDataGenerator();
      const genData = generator.generate(1000); // 生成 50 条测试数据
      const res = {
        msg: "错误数据如下",
        code: 200,
        data: [...genData]
      };

      if (res.data && res.data.length) {
        this.errorList = res.data;
        this.errorDialogVisible = true;
      } else {
        this.$message.success("导入成功");
      }
    },

    // 导出错误数据
    exportErrors() {
      if (!this.errorList.length) {
        this.$message.warning("没有可导出的错误数据");
        return;
      }

      const exportData = this.errorList.map((item) => ({
        头实体: item.startKnowName,
        尾实体: item.endKnowName,
        关系: item.relationName,
        属性一: item.attributeOne,
        属性二: item.attributeTwo,
        失败原因: item.failureReason
      }));

      const headers = [
        "头实体",
        "尾实体",
        "关系",
        "属性一",
        "属性二",
        "失败原因"
      ];
      const ws = XLSX.utils.json_to_sheet(exportData, {
        header: headers,
        skipHeader: false
      });

      // 设置列宽
      ws["!cols"] = [
        { wch: 15 },
        { wch: 15 },
        { wch: 10 },
        { wch: 15 },
        { wch: 15 },
        { wch: 30 } // 失败原因列宽大一些
      ];

      const range = XLSX.utils.decode_range(ws["!ref"]);

      // 通用边框
      const borderAll = {
        top: { style: "thin", color: { rgb: "D9D9D9" } },
        bottom: { style: "thin", color: { rgb: "D9D9D9" } },
        left: { style: "thin", color: { rgb: "D9D9D9" } },
        right: { style: "thin", color: { rgb: "D9D9D9" } }
      };

      // 表头样式
      const headerStyle = {
        font: { bold: true, color: { rgb: "FFFFFF" }, sz: 12 },
        alignment: { horizontal: "center", vertical: "center" },
        fill: { patternType: "solid", fgColor: { rgb: "4F81BD" } },
        border: borderAll
      };

      // 正文默认样式
      const bodyStyle = {
        alignment: { horizontal: "center", vertical: "center" },
        border: borderAll
      };

      // 失败原因样式（红色 + 自动换行，左对齐）
      const reasonStyle = {
        font: { color: { rgb: "D00000" } },
        alignment: { horizontal: "left", vertical: "center", wrapText: true },
        border: borderAll
      };

      // 设置表头样式
      for (let c = range.s.c; c <= range.e.c; c++) {
        const cell = ws[XLSX.utils.encode_cell({ r: 0, c })];
        if (cell) cell.s = headerStyle;
      }

      // 找到失败原因列索引
      const reasonColIndex = headers.indexOf("失败原因");

      // 设置正文样式
      for (let r = 1; r <= range.e.r; r++) {
        for (let c = range.s.c; c <= range.e.c; c++) {
          const addr = XLSX.utils.encode_cell({ r, c });
          if (!ws[addr]) continue;
          ws[addr].s = c === reasonColIndex ? reasonStyle : bodyStyle;
        }
      }

      // 导出
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "错误数据");
      const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
      saveAs(
        new Blob([wbout], { type: "application/octet-stream" }),
        "错误数据.xlsx"
      );
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
