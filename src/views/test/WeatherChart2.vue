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
      icons: {
        sunny: sunnyImg,
        cloudy: cloudyImg,
        "partly-cloudy": partlyCloudyImg,
        rainy3: rain3Img
      },
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
      if (!this.weatherData.length) {
        return this.defaultWeatherData;
      }

      return this.weatherData.map((item) => ({
        day: item.day || "未知",
        highTemp: item.highTemp || 0,
        lowTemp: item.lowTemp || 0,
        icon: item.icon || "sunny"
      }));
    },
    // 图标基准 Y 坐标（最高温度 + 一定间距）
    iconBaseY() {
      const highTemps = this.displayData.map((d) => d.highTemp);
      return Math.max(...highTemps) + 8;
    },
    weatherIconData() {
      return this.displayData.map((item, index) => [
        index,
        this.iconBaseY, // ✅ 固定在一条水平线上
        { index, iconType: item.icon }
      ]);
    },
    weatherLabelData() {
      return this.displayData.map((item, index) => [
        index,
        this.iconBaseY + 6, // ✅ 图标再往上 6 个单位
        { day: item.day }
      ]);
    }
  },
  mounted() {
    this.checkImageLoad();
    this.initChart();
    window.addEventListener("resize", this.resizeChart);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.resizeChart);
    if (this.chartInstance) this.chartInstance.dispose();
  },
  methods: {
    checkImageLoad() {
      Object.values(this.icons).forEach((imgSrc) => {
        const img = new Image();
        img.src = imgSrc;
        img.onerror = () => {
          console.error(`图片加载失败: ${imgSrc}，请检查路径是否正确`);
        };
      });
    },

    initChart() {
      this.chartInstance = echarts.init(this.$refs.chartRef);
      this.updateChart();
    },

    updateChart() {
      console.log("当前显示数据:", this.displayData);
      console.log("天气图标数据:", this.weatherIconData);
      const option = this.getChartOption();
      this.chartInstance.setOption(option);
    },

    getChartOption() {
      const data = this.displayData;
      const days = data.map((d) => d.day);
      const highTemps = data.map((d) => d.highTemp);
      const lowTemps = data.map((d) => d.lowTemp);
      const maxTemp = Math.max(...highTemps);
      const minTemp = Math.min(...lowTemps);

      return {
        backgroundColor: "transparent",
        grid: {
          top: "15%",
          right: "5%",
          bottom: "15%",
          left: "5%",
          containLabel: true
        },
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
          axisLine: {
            show: false,
            lineStyle: { color: "rgba(147,197,253,0.3)" }
          },
          axisLabel: { show: false, color: "#93c5fd" },
          axisTick: { show: false },
          boundaryGap: false
        },
        yAxis: {
          type: "value",
          show: false,
          min: minTemp - 2,
          max: this.iconYPosition + 1,
          interval: 5
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
            data: this.weatherIconData,
            symbol: function (params) {
              const { iconType } = params[2] || {};
              const imgPath = this.icons[iconType];
              return imgPath ? `image://${imgPath}` : "circle";
            }.bind(this),
            symbolSize: [58, 64],
            tooltip: { show: false },
            z: 3
          },
          {
            name: "日期标签",
            type: "scatter",
            data: this.weatherLabelData,
            symbolSize: 0, // 不显示点
            label: {
              show: true,
              position: "top",
              distance: 0,
              color: "#fff",
              fontSize: 14,
              formatter: (params) => params.data[2].day
            },
            tooltip: { show: false },
            z: 4
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
  min-height: 300px;
}
</style>
