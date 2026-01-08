<template>
  <PanelTemplate
    panelType="custom"
    :showInfoSection="true"
    infoSectionTitle="基础信息"
    :infoItems="infoItems"
    :showChartSection="true"
    chartSectionTitle="数据图表"
    tableSectionTitle="详细信息"
    tableUnit="单位：亩"
    :columns="columns"
    :tableData="tableData"
    @chart-resize="handleChartResize"
    @row-click="handleRowClick"
    @panel-toggle="handlePanelToggle"
  >
    <template #chart>
      <!-- 自定义图表组件 -->
      <BarChart
        ref="barChart"
        :width="'100%'"
        :height="'220px'"
        :data="[7, 8, 12, 12, 12, 6, 6, 14, 14, 6]"
        :xAxisLabels="[
          '名称',
          '名称',
          '名称',
          '名称',
          '名称',
          '名称',
          '名称',
          '名称',
          '名称',
          '名称',
        ]"
        yAxisUnit="(千亩)"
        :yAxisMax="25"
        barColor="#33ccff"
        barGradientColor="rgba(51,204,255,0.1)"
        @barClick="handleBarClick"
      />
    </template>
  </PanelTemplate>
</template>

<script>
import PanelTemplate from "./PanelTemplate.vue";
import BarChart from "./components/BarChart.vue";

export default {
  components: {
    PanelTemplate,
    BarChart,
  },
  data() {
    return {
      infoItems: [
        { value: "21.5", unit: "万亩", type: "设计灌区面积" },
        { value: "30.2", unit: "万亩", type: "有效灌溉面积" },
        { value: "15.8", unit: "万亩", type: "耕地面积" },
      ],
      columns: [
        { label: "序号", prop: "index", width: 60, minWidth: 60 },
        { label: "行政区划", prop: "time" },
        { label: "灌溉面积", prop: "ggmj", unit: "(亩)" },
      ],
      tableData: Array.from({ length: 50 }, (_, i) => ({
        id: i,
        index: i + 1,
        time: "行政区划名称",
        ggmj: Math.floor(Math.random() * 1500) + 1,
      })),
    };
  },
  methods: {
    handlePanelToggle(isCollapsed) {
      this.$emit("toggle", isCollapsed);
    },
    handleChartResize() {
      console.log("handleChartResize: 开始");
      console.log("BarChart ref:", this.$refs.barChart);
      console.log(
        "BarChart resize 方法:",
        this.$refs.barChart ? typeof this.$refs.barChart.resize : "undefined"
      );
      // 处理图表 resize
      if (
        this.$refs.barChart &&
        typeof this.$refs.barChart.resize === "function"
      ) {
        console.log("调用 BarChart resize 方法");
        this.$refs.barChart.resize();
        console.log("BarChart resize 方法调用完成");
      } else {
        console.log("BarChart ref 不存在或 resize 方法不是函数");
      }
      console.log("handleChartResize: 结束");
    },
    handleRowClick(row) {
      // 处理表格行点击
      console.log("点击表格行:", row);
    },
    handleBarClick(data, index) {
      // 处理图表点击
      console.log("点击图表:", data, "索引:", index);
    },
  },
};
</script>