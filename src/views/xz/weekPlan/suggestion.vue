<template>
  <div class="print-container" id="print-area">
    <el-button type="primary" @click="printPage" class="print-btn"
      >打印练字计划</el-button
    >
    <h2 class="title">书法练字四周计划</h2>
    <el-table :data="plan" border style="width: 100%">
      <el-table-column label="周次" prop="week" width="80" />
      <el-table-column label="日期范围" prop="range" width="160" />
      <el-table-column label="主要任务" prop="task" />
      <el-table-column label="临帖内容" prop="copy" />
      <el-table-column label="创作练习" prop="create" />
      <el-table-column label="完成情况" width="100">
        <template slot-scope="scope">
          <el-checkbox v-model="scope.row.done" />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "CalligraphyPlan",
  data() {
    return {
      plan: [
        {
          week: "第1周",
          range: "05.13 - 05.19",
          task: "结构稳固、控笔提按",
          copy: "赵孟頫《赤壁赋》行楷两行/天",
          create: "默写《赤壁赋》首段",
          done: false
        },
        {
          week: "第2周",
          range: "05.20 - 05.26",
          task: "章法布局提升 + 补练欧体",
          copy: "《圣教序》穿插《九成宫》一段",
          create: "七言对联排版",
          done: false
        },
        {
          week: "第3周",
          range: "05.27 - 06.02",
          task: "行书节奏训练",
          copy: "《兰亭序》行气练习",
          create: "抄词、短诗创作",
          done: false
        },
        {
          week: "第4周",
          range: "06.03 - 06.09",
          task: "风格融合 + 自由创作",
          copy: "《胆巴碑》or《洛神赋》",
          create: "整首古诗通篇书写",
          done: false
        }
      ]
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
    }
  }
};
</script>

<style lang="scss" scoped>
.print-container {
  padding: 20px;
  background: white;
  font-family: "微软雅黑", sans-serif;
}
.title {
  text-align: center;
  margin-bottom: 20px;
}
.print-btn {
  margin-bottom: 20px;
}

@media print {
  .print-btn {
    display: none;
  }
  @page {
    size: A4 landscape;
    margin: 10mm;
  }

  body {
    font-family: "Microsoft YaHei", sans-serif;
  }

  #weekly-print-area {
    width: 100%;
    transform: scale(0.5);
    transform-origin: top left;
  }

  table {
    width: 100% !important;
    table-layout: auto !important;
  }

  th,
  td {
    font-size: 12px;
    padding: 6px 8px;
    white-space: nowrap;
  }
}
</style>
