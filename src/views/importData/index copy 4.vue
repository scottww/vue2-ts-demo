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
      >
        <el-table-column type="index" label="序号" align="center" width="50" />
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
// 注意：这里用的是 xlsx-js-style
import XLSX from "xlsx-js-style";
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
      if (!this.errorList?.length) {
        this.$message.warning("没有可导出的错误数据");
        return;
      }

      // 1) 准备导出数据（中文表头作为 key，方便直接生成表头行）
      const exportData = this.errorList.map((i) => ({
        头实体: i.startKnowName,
        尾实体: i.endKnowName,
        关系: i.relationName,
        属性一: i.attributeOne,
        属性二: i.attributeTwo,
        失败原因: i.failureReason
      }));

      // 指定列顺序
      const headers = [
        "头部实体名称",
        "尾部实体名称",
        "关系名称",
        "其他属性1",
        "其他属性2",
        "失败原因"
      ];

      // 2) 生成 sheet
      const ws = XLSX.utils.json_to_sheet(exportData, {
        header: headers,
        skipHeader: false
      });

      // 3) 列宽（wch: 按字符数）
      ws["!cols"] = [
        { wch: 16 }, // 头实体
        { wch: 16 }, // 尾实体
        { wch: 10 }, // 关系
        { wch: 16 }, // 属性一
        { wch: 16 }, // 属性二
        { wch: 28 } // 失败原因
      ];

      // 4) 行高（第一行表头）
      ws["!rows"] = [{ hpt: 28 }];

      // 5) 设置自动筛选
      const range = XLSX.utils.decode_range(ws["!ref"]);
      ws["!autofilter"] = { ref: XLSX.utils.encode_range(range) };

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

      // 正文样式
      const bodyStyle = {
        alignment: { horizontal: "center", vertical: "center" },
        border: borderAll
      };

      // 失败原因样式（红色 + 自动换行，左对齐利于阅读）
      const reasonStyle = {
        font: { color: { rgb: "D00000" } },
        alignment: { horizontal: "left", vertical: "center", wrapText: true },
        border: borderAll
      };

      // 6) 给表头上样式
      for (let c = range.s.c; c <= range.e.c; c++) {
        const addr = XLSX.utils.encode_cell({ r: 0, c });
        if (ws[addr]) ws[addr].s = headerStyle;
      }

      // 找到“失败原因”列索引
      const reasonColIndex = headers.indexOf("失败原因");

      // 7) 给正文上样式（含“失败原因”定制）
      for (let r = 1; r <= range.e.r; r++) {
        for (let c = range.s.c; c <= range.e.c; c++) {
          const addr = XLSX.utils.encode_cell({ r, c });
          if (!ws[addr]) continue; // 可能有空单元格
          ws[addr].s = c === reasonColIndex ? reasonStyle : bodyStyle;
        }
      }

      // 8) 导出
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "错误数据");
      // 方式一（更简单）：直接写文件
      // XLSX.writeFile(wb, "错误数据.xlsx");

      // 方式二（保留你之前的 saveAs 流程）
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
