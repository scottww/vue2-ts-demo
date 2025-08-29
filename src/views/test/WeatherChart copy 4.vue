<template>
  <div class="weather-chart-container">
    <div ref="chartRef" class="chart-wrapper"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import sunnyImg from "@/assets/bigScreen/oneMap/sunny.png";
import cloudyImg from "@/assets/bigScreen/oneMap/cloudy.png";
import partlyCloudyImg from "@/assets/bigScreen/oneMap/partlyCloudy.png";
import rain3Img from "@/assets/bigScreen/oneMap/rain3.png";

export default {
  name: "WeatherChart",
  props: {
    weatherData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      chartInstance: null,
      sunnyImg,
      cloudyImg,
      partlyCloudyImg,
      rain3Img,
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
      return this.weatherData.length
        ? this.weatherData
        : this.defaultWeatherData;
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
      const option = this.getChartOption();
      this.chartInstance.setOption(option);
    },
    getChartOption() {
      const data = this.displayData;
      const days = data.map((d) => d.day);
      const highTemps = data.map((d) => d.highTemp);
      const lowTemps = data.map((d) => d.lowTemp);

      const iconMap = {
        sunny: this.sunnyImg,
        cloudy: this.cloudyImg,
        "partly-cloudy": this.partlyCloudyImg,
        rainy3: this.rain3Img
      };

      return {
        backgroundColor: "transparent",
        grid: { top: 60, right: 10, bottom: 10, left: 10, containLabel: true },
        tooltip: {
          trigger: "axis",
          backgroundColor: "rgba(10,36,99,0.8)",
          textStyle: { color: "#fff" },
          formatter: (params) => {
            let str = params[0].name + "<br/>";
            params.forEach((p) => (str += `${p.seriesName}: ${p.value}°<br/>`));
            return str;
          }
        },
        xAxis: {
          type: "category",
          data: days,
          axisLine: { lineStyle: { color: "rgba(147,197,253,0.3)" } },
          axisLabel: { color: "#93c5fd" },
          axisTick: { show: false }
        },
        yAxis: {
          type: "value",
          show: false,
          min: Math.min(...lowTemps) - 2,
          max: Math.max(...highTemps) + 2
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
            itemStyle: {
              color: "#fff",
              borderColor: "#3b82f6",
              borderWidth: 2
            },
            label: {
              show: true,
              position: "top",
              color: "#fff",
              formatter: "{c}°"
            }
          },
          {
            name: "最低温度",
            type: "line",
            data: lowTemps,
            smooth: true,
            symbol: "circle",
            symbolSize: 8,
            lineStyle: { color: "#3b82f6", width: 2, type: "dashed" },
            itemStyle: {
              color: "#fff",
              borderColor: "#3b82f6",
              borderWidth: 2
            },
            label: {
              show: true,
              position: "bottom",
              color: "#fff",
              formatter: "{c}°"
            }
          },
          {
            name: "天气",
            type: "scatter",
            // data: data.map(() => 0),
            // 这里需要使用实际的Y轴值，而不是0，否则可能超出可视区域
            data: data.map((item) => (item.highTemp + item.lowTemp) / 2),
            // symbol: (params) => {
            //   const idx = params.dataIndex;
            //   if (!data[idx]) return "circle";
            //   return "image://" + iconMap[data[idx].icon];
            // },
            symbol: function (params) {
              const idx = params.dataIndex;
              const iconType = data[idx]?.icon;
              const imgSrc = iconMap[iconType];
              // 确保图片路径正确
              return imgSrc ? `image://${imgSrc}` : "circle";
            },
            symbolSize: 30,
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
      handler() {
        this.updateChart();
      },
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
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: radial-gradient(rgba(30, 64, 175, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px);
  background-size: 30px 30px, 30px 30px;
  z-index: 1;
  pointer-events: none;
}
.chart-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 2;
  min-height: 240px;
}
</style>
