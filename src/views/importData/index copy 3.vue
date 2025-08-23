<template>
  <div>
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
      >
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
// 安装依赖：npm install xlsx file-saver --save
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export default {
  data() {
    return {
      errorDialogVisible: false,
      errorList: []
    };
  },
  methods: {
    // 模拟导入后的请求
    handleImport() {
      const res = {
        msg: "错误数据如下",
        code: 200,
        data: [
          {
            startKnowName: "头实体",
            endKnowName: "尾实体",
            relationName: "汇入",
            attributeOne: "测试属性1",
            attributeTwo: "测试属性2",
            failureReason: "关系已存在"
          },
          {
            startKnowName: "头实体2",
            endKnowName: "尾实体2",
            relationName: "包含",
            attributeOne: "属性A",
            attributeTwo: "属性B",
            failureReason: "属性缺失"
          }
        ]
      };

      if (res.data && res.data.length) {
        this.errorList = res.data;
        this.errorDialogVisible = true;
      } else {
        this.$message.success("导入成功，没有错误！");
      }
    },

    // 导出错误数据
    exportErrors() {
      if (!this.errorList.length) {
        this.$message.warning("没有可导出的错误数据");
        return;
      }

      const exportData = this.errorList.map(item => ({
        头实体: item.startKnowName,
        尾实体: item.endKnowName,
        关系: item.relationName,
        属性一: item.attributeOne,
        属性二: item.attributeTwo,
        失败原因: item.failureReason
      }));

      const ws = XLSX.utils.json_to_sheet(exportData);

      // 取第一行（表头）范围
      const range = XLSX.utils.decode_range(ws["!ref"]);
      for (let C = range.s.c; C <= range.e.c; ++C) {
        const cell = ws[XLSX.utils.encode_cell({ r: 0, c: C })];
        if (cell && cell.s === undefined) cell.s = {};

        // 设置表头样式
        cell.s = {
          font: { bold: true, color: { rgb: "FFFFFF" }, sz: 12 }, // 白色加粗
          alignment: { horizontal: "center", vertical: "center" }, // 居中
          fill: { fgColor: { rgb: "4F81BD" } } // 背景蓝色
        };
      }

      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "错误数据");

      // 导出
      const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array", cellStyles: true });
      saveAs(new Blob([wbout], { type: "application/octet-stream" }), "错误数据.xlsx");
    }
  }
};
</script>
