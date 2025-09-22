<template>
  <div class="water-rain-chart-container">
    <div ref="chart" class="chart-box"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";

export default {
  name: "RainWaterChart",
  data() {
    return {
      chartInstance: null
    };
  },
  mounted() {
    this.initChart();
    window.addEventListener("resize", this.resizeChart);
  },
  beforeDestroy() {
    if (this.chartInstance) {
      this.chartInstance.dispose();
      this.chartInstance = null;
    }
    window.removeEventListener("resize", this.resizeChart);
  },
  methods: {
    initChart() {
      this.chartInstance = echarts.init(this.$refs.chart);

      const option = {
        color: ["#3BC8D4", "#2196f3", "#3DFF86"],
        tooltip: {
          trigger: "axis",
          backgroundColor: "rgba(0,0,0,0.7)", // 整个tooltip背景
          borderColor: "#3BC8D4",
          borderWidth: 1,
          textStyle: {
            color: "#fff" // 文字颜色
          },
          axisPointer: {
            type: "cross",
            label: { backgroundColor: "#6a7985" }
          }
        },
        legend: {
          data: ["雨量", "累计雨量", "水位"],
          top: 10,
          textStyle: { color: "#fff" }
        },
        grid: {
          left: "5%",
          right: "5%",
          top: "15%",
          bottom: "5%",
          containLabel: true
        },
        xAxis: {
          type: "category",
          data: [
            "2025-09-16 08:00",
            "2025-09-16 21:00",
            "2025-09-17 00:00",
            "2025-09-17 03:00",
            "2025-09-17 06:00",
            "2025-09-17 09:00",
            "2025-09-17 12:00",
            "2025-09-17 15:00"
          ],
          axisLine: { lineStyle: { color: "#2fbaca" } },
          axisLabel: {
            color: "#fff",
            interval: 0,
            formatter: function (value) {
              const d = new Date(value);
              const day = String(d.getDate()).padStart(2, "0") + "日";
              const hour = String(d.getHours()).padStart(2, "0") + "时";
              return `${day}\n${hour}`;
            }
          },
          axisTick: { alignWithLabel: true }
        },
        yAxis: [
          {
            type: "value",
            name: "雨量(mm)",
            min: 0,
            max: 10,
            position: "left",
            axisLine: { lineStyle: { color: "#3BC8D4" } },
            axisLabel: { color: "#3BC8D4" },
            splitLine: { lineStyle: { color: "rgba(255,255,255,0.1)" } }
          },
          {
            type: "value",
            // name: '累计雨量(mm) / 水位(m)',
            min: 0,
            max: 40,
            nameGap: 35, // 适当增大间距
            nameLocation: "end", // 将名称放在y轴的起始位置
            position: "right",
            axisLine: { lineStyle: { color: "#2196f3" } },
            axisLabel: { color: "#2196f3" },
            splitLine: { show: false }
          }
        ],
        series: [
          {
            name: "雨量",
            type: "bar",
            data: [0.1, 3.7, 6.3, 7.8, 8.4, 3.2, 3.2, 3.2],
            barWidth: "20%",
            yAxisIndex: 0,
            itemStyle: { color: "#3BC8D4" },
            label: {
              show: true,
              position: "top",
              color: "#3BC8D4",
              fontWeight: "bold"
            }
          },
          {
            name: "累计雨量",
            type: "line",
            data: [0, 3.7, 10, 17.8, 26.2, 29.4, 32.6, 35.8],
            smooth: true,
            yAxisIndex: 1,
            lineStyle: { color: "#2196f3", width: 2 },
            itemStyle: {
              color: "#2196f3",
              borderColor: "#fff",
              borderWidth: 1
            },
            symbol: "circle",
            symbolSize: 6
          },
          {
            name: "水位",
            type: "line",
            data: [1.3, 1.3, 1.5, 2.3, 2.8, 3.0, 3.2, 3.3],
            smooth: true,
            yAxisIndex: 1,
            lineStyle: { color: "#3DFF86", width: 2 },
            itemStyle: {
              color: "#3DFF86",
              borderColor: "#fff",
              borderWidth: 1
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "rgba(25,255,244,0.3)" },
                { offset: 0.5, color: "rgba(61,255,134,0.3)" },
                { offset: 1, color: "rgba(7,25,59,0.3)" }
              ])
            },
            symbol: "circle",
            symbolSize: 6
          }
        ],
        graphic: [
          {
            type: "text",
            right: 10,
            top: "8%",
            style: {
              text: "累计雨量(mm) / 水位(m)",
              fill: "#2196f3",
              fontSize: 12,
              textAlign: "right"
            }
          }
        ]
      };

      this.chartInstance.setOption(option, true);
    },
    resizeChart() {
      if (this.chartInstance) this.chartInstance.resize();
    }
  }
};
</script>

<style scoped>
.water-rain-chart-container {
  width: 100%;
  height: 400px;
  min-height: 400px;
  position: relative;
  overflow: hidden;
}
.chart-box {
  width: 100%;
  height: 100%;
}

/* 波浪背景效果 */
.water-rain-chart-container::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: radial-gradient(
    rgba(54, 207, 201, 0.1) 1px,
    transparent 1px
  );
  background-size: 20px 20px;
  z-index: -1;
  opacity: 0.5;
}
</style>
