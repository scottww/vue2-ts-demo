<template>
  <div class="rain-chart-container">
    <!-- 图表容器 -->
    <div ref="chartRef" class="chart-wrapper"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";

export default {
  name: "RainChart",
  props: {
    // 允许传入自定义雨量数据
    rainData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      chartInstance: null,
      // 默认雨量数据
      defaultRainData: [
        { day: "昨天", rainfall: 0 },
        { day: "今天", rainfall: 0 },
        { day: "明天", rainfall: 0 },
        { day: "周三", rainfall: 0 },
        { day: "周四", rainfall: 10.5 },
        { day: "周五", rainfall: 13.5 },
        { day: "周六", rainfall: 10.5 },
        { day: "周日", rainfall: 0 }
      ]
    };
  },
  computed: {
    // 优先使用自定义数据，没有则使用默认数据
    displayData() {
      return this.rainData.length > 0 ? this.rainData : this.defaultRainData;
    }
  },
  mounted() {
    this.initChart();
    this.resizeChart();
    window.addEventListener("resize", this.resizeChart);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.resizeChart);
    if (this.chartInstance) {
      this.chartInstance.dispose();
    }
  },
  methods: {
    // 初始化图表
    initChart() {
      this.chartInstance = echarts.init(this.$refs.chartRef);
      this.updateChart();
    },

    // 更新图表数据
    updateChart() {
      const option = this.getChartOption();
      this.chartInstance.setOption(option);
    },

    // 获取图表配置
    getChartOption() {
      const days = this.displayData.map((item) => item.day);
      const rainfalls = this.displayData.map((item) => item.rainfall);
      const maxRainfall = Math.max(...rainfalls) + 5;

      return {
        backgroundColor: "transparent",
        grid: {
          top: "20%", // 给上方标签留出空间
          right: "5%",
          bottom: "15%", // 原先的底部空间
          left: "5%",
          containLabel: true
        },
        tooltip: {
          trigger: "axis",
          backgroundColor: "rgba(10, 36, 99, 0.8)",
          borderColor: "#3b82f6",
          textStyle: { color: "#ffffff" },
          formatter: function (params) {
            return `${params[0].name}<br/>降水量: ${params[0].value}mm`;
          }
        },
        xAxis: {
          type: "category",
          data: days,
          axisLine: { lineStyle: { color: "rgba(147, 197, 253, 0.3)" } },
          axisLabel: {
            color: "#93c5fd",
            fontSize: 12,
            margin: 20, // 离柱子距离
            inside: true, // 标签放到柱子内部
            verticalAlign: "top"
          },
          axisTick: { show: false }
        },
        yAxis: {
          type: "value",
          min: 0,
          max: maxRainfall,
          splitLine: { show: false },
          axisLine: { show: false },
          axisTick: { show: false },
          axisLabel: { show: false }
        },
        series: [
          {
            name: "降水量",
            type: "bar",
            data: rainfalls,
            barWidth: "40%",
            label: {
              show: true,
              position: "top",
              color: "#ffffff",
              fontSize: 10,
              formatter: function (params) {
                return params.value > 0 ? `${params.value}mm` : "";
              }
            },
            itemStyle: {
              color: function (params) {
                return new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                  { offset: 0, color: "rgba(59, 130, 246, 0.4)" },
                  { offset: 1, color: "rgba(59, 130, 246, 0.9)" }
                ]);
              },
              borderRadius: [4, 4, 0, 0],
              borderColor: "#fff", // 白线颜色
              borderWidth: 1, // 白线宽度
              borderType: "solid"
            },
            emphasis: {
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                  { offset: 0, color: "rgba(96, 165, 250, 0.5)" },
                  { offset: 1, color: "rgba(59, 130, 246, 1)" }
                ])
              }
            },
            animationDelay: function (idx) {
              return idx * 100;
            },
            animationEasing: "elasticOut"
          }
        ],
        animationEasing: "elasticOut",
        animationDelayUpdate: function (idx) {
          return idx * 5;
        }
      };
    },

    // 响应式调整图表大小
    resizeChart() {
      if (this.chartInstance) {
        this.chartInstance.resize();
      }
    }
  },
  // 监听数据变化
  watch: {
    rainData: {
      handler() {
        this.updateChart();
      },
      deep: true
    }
  }
};
</script>

<style scoped>
/* 容器样式 */
.rain-chart-container {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #0a2463 0%, #0f3460 50%, #16213e 100%);
  position: relative;
  overflow: hidden;
  padding: 10px;
  box-sizing: border-box;
}

/* 背景波浪纹理 */
.rain-chart-container::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogIDxkZWZzPgogICAgPHBhdHRlcm4gaWQ9IndhbGwiIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPgogICAgICA8cGF0aCBkPSJNMCwwIEM1MCwxMCAxMDAsMCAxNTAsMTAgQzIwMCwwIDI1MCwxMCAzMDAsMCAgQzM1MCwxMCA0MDAsMCA0NTAsMTAgQzUwMCwwIDU1MCwxMCA2MDAsMCAgQzY1MCwxMCA3MDAsMCA3NTAsMTAgQzgwMCwwIDg1MCwxMCA5MDAsMCAgQzk1MCwxMCAxMDAwLDAgMTA1MCwxMCBDMTEwMCwwIDExNTAsMTAgMTIwMCwwIEMxMjUwLDEwIDEzMDAsMCAxMzUwLDEwIEMxNDAwLDAgMTQ1MCwxMCAxNTAwLDAgIEMxNTUwLDEwIDE2MDAsMCAxNjUwLDEwIEMxNzAwLDAgMTc1MCwxMCAxODAwLDAgIEMxODUwLDEwIDE5MDAsMCAxOTUwLDEwIEMyMDAwLDAgMjA1MCwxMCAyMTAwLDAgIEMyMTUwLDEwIDIyMDAsMCAyMjUwLDEwIEMyMzAwLDAgMjM1MCwxMCAyNDAwLDAgIEMyNDUwLDEwIDI1MDAsMCAyNTUwLDEwIEMyNjAwLDAgMjY1MCwxMCAyNzAwLDAgIEMyNzUwLDEwIDI4MDAsMCAyODUwLDEwIEMyOTAwLDAgMjk1MCwxMCAzMDAwLDAgIEMzMDUwLDEwIDMxMDAsMCAzMTUwLDEwIEMzMjAwLDAgMzI1MCwxMCAzMzAwLDAgIEMzMzUwLDEwIDMzNDAsMzAgMzM0MCw1MCBDMzM0MCw3MCAzMzUwLDkwIDMzMDAsMTAwIEMzMjUwLDExMCAzMjAwLDkwIDMxNTAxMTAgIEMzMTUwLDEyMCAzMDAwLDkwIDM0MCwxMDAgQzI5NTAsMTEwIDI5MDAsOTAgMjg1MCwxMDAgIEMyODAwLDExMCAyNzUwLDkwIDI3MDAsMTAwIEMyNjUwLDExMCAyNjAwLDkwIDI1NTAsMTAwIEMyNTAwLDExMCAyNDUwLDkwIDI0MDAsMTAwIEMyMzUwLDExMCAyMzAwLDkwIDIyNTAsMTAwIEMyMjAwLDExMCAyMTUwLDkwIDIxMDAsMTAwIEMyMDUwLDExMCAyMDAwLDkwIDE5NTAsMTAwIEMxOTA1LDExMCAxODUwLDkwIDE4MDAsMTAwIEMxNzUwLDExMCAxNzAwLDkwIDE2NTAsMTAwIEMxNjAwLDExMCAxNTUwLDkwIDE1MDAsMTAwIEMxNDUwLDExMCAxNDAwLDkwIDEzNTAsMTAwIEMxMzAwLDExMCAxMjUwLDkwIDEyMDAsMTAwIEMxMTUwLDExMCAxMTAwLDkwIDEwNTAsMTAwIEMxMDA1LDExMCA5NTAsOTAgOTA1LDEwMCBDODUwLDExMCA4MDAsOTAgNzUwLDEwMCBDNzAwLDExMCA2NTAsOTAgNjAwLDEwMCBDNTUwLDExMCA1MDAsOTAgNDUwLDEwMCBDNDAwLDExMCAzNTAsOTAgMzAwLDEwMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDU5LCAxMzAsIDI0NiwgMC4xKSIgc3Ryb2tlLXdpZHRoPSIxIi8+CiAgICAgIDxwYXRoIGQ9Ik0wLDE1MCBDNTAsMTYwIDEwMCwxNTAgMTUwLDE2MCBDMjAwLDE1MCAyNTAsMTYwIDMwMCwxNTAgIEMzNTAsMTYwIDQwMCwxNTAgNDUwLDE2MCBDNTAwLDE1MCA1NTAsMTYwIDYwMCwxNTAgIEM2NTAsMTYwIDcwMCwxNTAgNzUwLDE2MCBDODAwLDE1MCA4NTAsMTYwIDkwMCwxNTAgIEM5NTAsMTYwIDEwMDAsMTUwIDEwNTAsMTYwIEMxMTAwLDE1MCAxMTUwLDE2MCAxMjAwLDE1MCBDMTI1MCwxNjAgMTMwMCwxNTAgMTM1MCwxNjAgIEMxNDAwLDE1MCAxNDUwLDE2MCAxNTAwLDE1MCBDMTU1MCwxNjAgMTYwMCwxNTAgMTY1MCwxNjAgIEMxNzAwLDE1MCAxNzUwLDE2MCAxODAwLDE1MCBDMTg1MCwxNjAgMTkwMCwxNTAgMTk1MCwxNjAgIEMyMDAwLDE1MCAyMDUwLDE2MCAyMTAwLDE1MCBDMjE1MCwxNjAgMjIwMCwxNTAgMjI1MCwxNjAgIEMyMzAwLDE1MCAyMzUwLDE2MCAyNDAwLDE1MCBDMjQ1MCwxNjAgMjUwMCwxNTAgMjU1MCwxNjAgIEMyNjAwLDE1MCAyNjUwLDE2MCAyNzAwLDE1MCBDMjc1MCwxNjAgMjgwMCwxNTAgMjg1MCwxNjAgIEMyOTA1LDE1MCAyOTUwLDE2MCAzMDAwLDE1MCBDMzA1MCwxNjAgMzEwMCwxNTAgMzE1MCwxNjAgIEMzMjAwLDE1MCAzMjUwLDE2MCAzMzAwLDE1MCBDMzM1MCwxNjAgMzM0MCwxODAgMzM0MCwyMDAgIEMzMzQwLDIyMCAzMzUwLDI0MCAzMzAwLDI1MCBDMzI1MCwyNjAgMzIwMCwyNDAgMzE1MDI2MCAgQzMxNTAsMjgwIDMwMDAsMjQwIDM0MCwyNTAgQzI5NTAsMjYwIDI5MDAsMjQwIDI4NTAsMjUwIEMyODAwLDI2MCAyNzUwLDI0MCAyNzAwLDI1MCBDMjY1MCwyNjAgMjYwMCwyNDAgMjU1MCwyNTAgIEMyNTAwLDI2MCAyNDUwLDI0MCAyNDAwLDI1MCBDMjM1MCwyNjAgMjMwMCwyNDAgMjI1MCwyNTAgIEMyMjAwLDI2MCAyMTUwLDI0MCAyMTAwLDI1MCBDMjA1MCwyNjAgMjAwMCwyNDAgMTk1MCwyNTAgIEMxOTA1LDI2MCAxODUwLDI0MCAxODAwLDI1MCBDMTc1MCwyNjAgMTcwMCwyNDAgMTY1MCwyNTAgIEMxNjAwLDI2MCAxNTUwLDI0MCAxNTAwLDI1MCBDMTQ1MCwyNjAgMTQwMCwyNDAgMTM1MCwyNTAgIEMxMzAwLDI2MCAxMjUwLDI0MCAxMjAwLDI1MCBDMTE1MCwyNjAgMTEwMCwyNDAgMTA1MCwyNTAgIEMxMDA1LDI2MCA5NTAsMjQwIDkwNSwyNTAgQzg1MCwyNjAgODAwLDI0MCA3NTAsMjUwIEM3MDAsMjYwIDY1MCwyNDAgNjAwLDI1MCBDNTUwLDI2MCA1MDAsMjQwIDQ1MCwyNTAgQzQwMCwyNjAgMzUwLDI0MCAzMDAsMjUwIiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoNTksIDEzMCwgMjQ2LCAwLjEpIiBzdHJva2Utd2lkdGg9IjEiLz4KICAgIDwvcGF0dGVybj4KICA8L2RlZnM+CiAgPHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCN3YWxsKSIvPgo8L3N2Zz4=");
  background-size: 100% 100%;
  opacity: 0.3;
  z-index: 1;
  pointer-events: none;
}

/* 额外的装饰元素 */
.rain-chart-container::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: radial-gradient(
    rgba(30, 64, 175, 0.1) 1px,
    transparent 1px
  );
  background-size: 30px 30px;
  z-index: 2;
  pointer-events: none;
}

/* 图表包装器 */
.chart-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 3;
  min-height: 150px;
}
</style>