<template>
  <el-dialog
    :visible.sync="visible"
    title="水位流量大图"
    width="800px"
    append-to-body
  >
    <div ref="chartRef" class="big-chart-container"></div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">关闭</el-button>
    </span>
  </el-dialog>
</template>

<script>
import * as echarts from "echarts";

export default {
  name: "BigChartDialog",
  props: {
    chartOption: { type: Object, required: true },
    value: { type: Boolean, default: false } // 父组件控制显示
  },
  data() {
    return {
      chart: null,
      visible: this.value
    };
  },
  watch: {
    value(val) {
      this.visible = val;
      if (val) {
        this.$nextTick(() => this.initChart());
      }
    },
    visible(val) {
      this.$emit("input", val); // 双向绑定
    }
  },
  methods: {
    initChart() {
      if (!this.$refs.chartRef) return;
      if (!this.chart) this.chart = echarts.init(this.$refs.chartRef);
      this.chart.setOption(this.chartOption);
      this.chart.resize();
    },
    handleResize() {
      if (this.chart) this.chart.resize();
    }
  },
  mounted() {
    window.addEventListener("resize", this.handleResize);
  },
  beforeDestroy() {
    if (this.chart) this.chart.dispose();
    window.removeEventListener("resize", this.handleResize);
  }
};
</script>

<style scoped>
.big-chart-container {
  width: 100%;
  height: 500px;
}
</style>
