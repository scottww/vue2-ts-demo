<template>
  <div class="weather-chart-container">
    <!-- 图表容器 -->
    <div ref="chartRef" class="chart-wrapper"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import sunnyImg from "@/assets/bigScreen/oneMap/sunny.png";
// import cloudyImg from "@/assets/bigScreen/oneMap/cloudy.png";
// import partlyCloudyImg from "@/assets/bigScreen/oneMap/partly-cloudy.png";
import rain3Img from "@/assets/bigScreen/oneMap/rain3.png";
export default {
  name: "WeatherChart",
  props: {
    // 允许传入自定义天气数据
    weatherData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      sunnyImg,
      rain3Img,
      chartInstance: null,
      // 默认天气数据
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
    // 优先使用自定义数据，没有则使用默认数据
    displayData() {
      return this.weatherData.length > 0
        ? this.weatherData
        : this.defaultWeatherData;
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
    getChartOption0() {
      const days = this.displayData.map((item) => item.day);
      const highTemps = this.displayData.map((item) => item.highTemp);
      const lowTemps = this.displayData.map((item) => item.lowTemp);

      // 天气图标配置
      const iconSymbols = this.displayData.map((item) => {
        let iconCode = "image://data:image/svg+xml;base64,";
        let svgContent = "";

        switch (item.icon) {
          case "sunny":
            svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23FFD700" width="24" height="24"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="%23FFD700" stroke-width="2"/></svg>`;
            break;
          case "cloudy":
            svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="%23B0C4DE" stroke-width="2" width="24" height="24"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/></svg>`;
            break;
          case "partly-cloudy":
            svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="%23FFD700" stroke-width="2" width="24" height="24"><circle cx="12" cy="5" r="3"/><path d="M19 12h-7a6 6 0 0 0-6 6 4 4 0 0 0 4 4h10a4 4 0 0 0 4-4 6 6 0 0 0-6-6Z" stroke="%23B0C4DE"/></svg>`;
            break;
          default:
            svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="%23B0C4DE" stroke-width="2" width="24" height="24"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/></svg>`;
        }

        return iconCode + btoa(unescape(encodeURIComponent(svgContent)));
      });

      return {
        backgroundColor: "transparent",
        grid: {
          top: "60",
          right: "10",
          bottom: "10",
          left: "10",
          containLabel: true
        },
        tooltip: {
          trigger: "axis",
          backgroundColor: "rgba(10, 36, 99, 0.8)",
          borderColor: "#3b82f6",
          textStyle: {
            color: "#ffffff"
          },
          formatter: function (params) {
            let result = params[0].name + "<br/>";
            params.forEach((param) => {
              result += `${param.seriesName}: ${param.value}°<br/>`;
            });
            return result;
          }
        },
        xAxis: {
          type: "category",
          data: days.map(() => 0),
          axisLine: {
            lineStyle: {
              color: "rgba(147, 197, 253, 0.3)"
            }
          },
          axisLabel: {
            color: "#93c5fd",
            fontSize: 12
          },
          axisTick: {
            show: false
          }
        },
        yAxis: {
          type: "value",
          show: false,
          min: Math.min(...lowTemps) - 2,
          max: Math.max(...highTemps) + 2
        },
        series: [
          // 最高温度线
          {
            name: "最高温度",
            type: "line",
            data: highTemps,
            smooth: true,
            symbol: "circle",
            symbolSize: 8,
            lineStyle: {
              color: "#3b82f6",
              width: 2
            },
            itemStyle: {
              color: "#ffffff",
              borderColor: "#3b82f6",
              borderWidth: 2
            },
            label: {
              show: true,
              position: "top",
              color: "#ffffff",
              fontSize: 10,
              formatter: "{c}°"
            }
          },
          // 最低温度线
          {
            name: "最低温度",
            type: "line",
            data: lowTemps,
            smooth: true,
            symbol: "circle",
            symbolSize: 8,
            lineStyle: {
              color: "#3b82f6",
              width: 2,
              type: "dashed"
            },
            itemStyle: {
              color: "#ffffff",
              borderColor: "#3b82f6",
              borderWidth: 2
            },
            label: {
              show: true,
              position: "bottom",
              color: "#ffffff",
              fontSize: 10,
              formatter: "{c}°"
            }
          },
          // 天气图标
          {
            name: "天气",
            type: "scatter",
            data: days.map(() => 0), // 不要用 null，用占位 0
            symbol: (params) => iconSymbols[params.dataIndex] || "circle",
            symbolSize: 30,
            tooltip: {
              show: false
            },
            z: 3
          }
        ]
      };
    },

    getChartOption() {
      const days = this.displayData.map((item) => item.day);
      const highTemps = this.displayData.map((item) => item.highTemp);
      const lowTemps = this.displayData.map((item) => item.lowTemp);

      // 天气图标配置（本地图片）
      const iconSymbols = this.displayData.map((item) => {
        switch (item.icon) {
          case "sunny":
            return "image://" + sunnyImg;
          case "cloudy":
            return "image://" + sunnyImg;
          case "partly-cloudy":
            return "image://" + rain3Img;
          case "rainy3":
            return "image://" + rain3Img;
          default:
            return "image://" + sunnyImg;
        }
      });

      console.log(iconSymbols);

      return {
        backgroundColor: "transparent",
        grid: {
          top: "60",
          right: "10",
          bottom: "10",
          left: "10",
          containLabel: true
        },
        tooltip: {
          trigger: "axis",
          backgroundColor: "rgba(10, 36, 99, 0.8)",
          borderColor: "#3b82f6",
          textStyle: {
            color: "#ffffff"
          },
          formatter: function (params) {
            let result = params[0].name + "<br/>";
            params.forEach((param) => {
              result += `${param.seriesName}: ${param.value}°<br/>`;
            });
            return result;
          }
        },
        xAxis: {
          type: "category",
          data: days,
          axisLine: {
            lineStyle: {
              color: "rgba(147, 197, 253, 0.3)"
            }
          },
          axisLabel: {
            color: "#93c5fd",
            fontSize: 12
          },
          axisTick: { show: false }
        },
        yAxis: {
          type: "value",
          show: false,
          min: Math.min(...lowTemps) - 2,
          max: Math.max(...highTemps) + 2
        },
        series: [
          // 最高温度线
          {
            name: "最高温度",
            type: "line",
            data: highTemps,
            smooth: true,
            symbol: "circle",
            symbolSize: 8,
            lineStyle: {
              color: "#3b82f6",
              width: 2
            },
            itemStyle: {
              color: "#ffffff",
              borderColor: "#3b82f6",
              borderWidth: 2
            },
            label: {
              show: true,
              position: "top",
              color: "#ffffff",
              fontSize: 10,
              formatter: "{c}°"
            }
          },
          // 最低温度线
          {
            name: "最低温度",
            type: "line",
            data: lowTemps,
            smooth: true,
            symbol: "circle",
            symbolSize: 8,
            lineStyle: {
              color: "#3b82f6",
              width: 2,
              type: "dashed"
            },
            itemStyle: {
              color: "#ffffff",
              borderColor: "#3b82f6",
              borderWidth: 2
            },
            label: {
              show: true,
              position: "bottom",
              color: "#ffffff",
              fontSize: 10,
              formatter: "{c}°"
            }
          },
          // 天气图标
          {
            name: "天气",
            type: "scatter",
            data: days.map(() => 0), // 占位
            // symbol: iconSymbols, // 直接传数组
            // symbol: function (params) {
            //   return iconSymbols[params.dataIndex] || "circle";
            // },
            symbol: () => "image://" + sunnyImg,
            symbolSize: 30,
            tooltip: { show: false },
            z: 3
          }
        ]
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
/* 容器样式 */
.weather-chart-container {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #0a2463 0%, #0f3460 50%, #16213e 100%);
  position: relative;
  overflow: hidden;
  padding: 10px;
  box-sizing: border-box;
}

/* 背景装饰 */
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

/* 图表包装器 */
.chart-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 2;
  min-height: 200px;
}
</style>