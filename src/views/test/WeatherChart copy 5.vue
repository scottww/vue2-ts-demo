<template>
  <div class="weather-chart-container">
    <div ref="chartRef" class="chart-wrapper"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import sunnyImg from "@/assets/bigScreen/oneMap/sunny.png";
import cloudyImg from "@/assets/bigScreen/oneMap/cloudy.png";            // 确保真实存在
import partlyCloudyImg from "@/assets/bigScreen/oneMap/partlyCloudy.png"; // 确保真实存在
import rain3Img from "@/assets/bigScreen/oneMap/rain3.png";

export default {
  name: "WeatherChart",
  props: {
    weatherData: { type: Array, default: () => [] }
  },
  data() {
    return {
      chartInstance: null,
      defaultWeatherData: [
        { day: "昨天", highTemp: 32, lowTemp: 20, icon: "sunny" },
        { day: "今天", highTemp: 34, lowTemp: 22, icon: "cloudy" },
        { day: "明天", highTemp: 36, lowTemp: 24, icon: "partly-cloudy" },
        { day: "周三", highTemp: 35, lowTemp: 25, icon: "rainy3" },
        { day: "周四", highTemp: 34, lowTemp: 24, icon: "rainy3" },
        { day: "周五", highTemp: 34, lowTemp: 24, icon: "rainy3" },
        { day: "周六", highTemp: 33, lowTemp: 23, icon: "rainy3" },
        { day: "周日", highTemp: 31, lowTemp: 21, icon: "sunny" }
      ]
    };
  },
  computed: {
    displayData() {
      return this.weatherData.length ? this.weatherData : this.defaultWeatherData;
    }
  },
  mounted() {
    this.initChart();
    window.addEventListener("resize", this.resizeChart);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.resizeChart);
    if (this.chartInstance) this.chartInstance.dispose();
  },
  methods: {
    initChart() {
      this.chartInstance = echarts.init(this.$refs.chartRef);
      this.updateChart();
    },
    updateChart() {
      this.chartInstance.setOption(this.getChartOption(), true);
    },
    getChartOption() {
      // 用局部变量避免 symbol 回调里 this 丢失
      const data = this.displayData;
      const days = data.map(d => d.day);
      const highTemps = data.map(d => d.highTemp);
      const lowTemps  = data.map(d => d.lowTemp);

      // 轴范围
      const yMin = Math.min(...lowTemps) - 2;
      const yMax = Math.max(...highTemps) + 2;

      // 把图标放在“最高温+1℃”的位置（保证在 y 轴范围内且不遮挡标签）
      const iconY = highTemps.map(h => Math.min(h + 1, yMax - 0.5));

      const iconMap = {
        sunny: sunnyImg,
        cloudy: cloudyImg,
        "partly-cloudy": partlyCloudyImg,
        rainy3: rain3Img
      };

      return {
        backgroundColor: "transparent",
        grid: { top: 60, right: 10, bottom: 10, left: 10, containLabel: true },
        tooltip: {
          trigger: "axis",
          backgroundColor: "rgba(10,36,99,0.8)",
          borderColor: "#3b82f6",
          textStyle: { color: "#fff" },
          formatter: params => {
            let str = params[0].name + "<br/>";
            params.forEach(p => { if (typeof p.value === 'number') str += `${p.seriesName}: ${p.value}°<br/>`; });
            return str;
          }
        },
        xAxis: {
          type: "category",
          data: days,
          axisLine: { lineStyle: { color: "rgba(147,197,253,0.3)" } },
          axisLabel: { color: "#93c5fd", fontSize: 12 },
          axisTick: { show: false }
        },
        yAxis: {
          type: "value",
          show: false,
          min: yMin,
          max: yMax
        },
        series: [
          {
            name: "最高温度",
            type: "line",
            data: highTemps,
            smooth: true,
            symbol: "circle",
            symbolSize: 8,
            lineStyle: { color: "#3b82f6", width: 2 },
            itemStyle: { color: "#fff", borderColor: "#3b82f6", borderWidth: 2 },
            label: { show: true, position: "top", color: "#fff", fontSize: 10, formatter: "{c}°" }
          },
          {
            name: "最低温度",
            type: "line",
            data: lowTemps,
            smooth: true,
            symbol: "circle",
            symbolSize: 8,
            lineStyle: { color: "#3b82f6", width: 2, type: "dashed" },
            itemStyle: { color: "#fff", borderColor: "#3b82f6", borderWidth: 2 },
            label: { show: true, position: "bottom", color: "#fff", fontSize: 10, formatter: "{c}°" }
          },
          {
            name: "天气",
            type: "scatter",
            // 关键：这里不能用 0！要用在 y 轴范围内的值
            data: iconY,
            symbol: (params) => {
              const item = data[params.dataIndex];
              const img = iconMap[item && item.icon] || sunnyImg;
              return "image://" + img;
            },
            symbolSize: 50,
            tooltip: { show: false },
            z: 3
          }
        ]
      };
    },
    resizeChart() {
      if (this.chartInstance) this.chartInstance.resize();
    }
  },
  watch: {
    weatherData: {
      handler() { this.updateChart(); },
      deep: true
    }
  }
};
</script>

<style scoped>
.weather-chart-container {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #0a2463 0%, #0f3460 50%, #16213e 100%);
  position: relative;
  overflow: hidden;
  padding: 10px;
  box-sizing: border-box;
}
.weather-chart-container::before {
  content: "";
  position: absolute;
  inset: 0;
  background-image: radial-gradient(rgba(30, 64, 175, 0.1) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px);
  background-size: 30px 30px, 30px 30px;
  z-index: 1;
  pointer-events: none;
}
.chart-wrapper {
  width: 100%;
  height: 100%;
  min-height: 220px; /* 确保容器有高度 */
  position: relative;
  z-index: 2;
}
</style>
