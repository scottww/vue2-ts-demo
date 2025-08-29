<template>
  <div class="hourly-weather-container">
    <div class="arrow left-arrow" @click="scrollChart('left')">
      <svg
        width="12"
        height="20"
        viewBox="0 0 12 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10 2L2 10L10 18"
          stroke="#fff"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
    <div ref="chartRef" class="chart-wrapper"></div>
    <div class="arrow right-arrow" @click="scrollChart('right')">
      <svg
        width="12"
        height="20"
        viewBox="0 0 12 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2 2L10 10L2 18"
          stroke="#fff"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
// 替换为实际图片路径
import sunnyImg from "@/assets/bigScreen/oneMap/sunny.png";
import cloudyImg from "@/assets/bigScreen/oneMap/cloudy.png";
import partlyCloudyImg from "@/assets/bigScreen/oneMap/partlyCloudy.png";
import rain3Img from "@/assets/bigScreen/oneMap/rain3.png";

export default {
  name: "HourlyWeatherChart",
  data() {
    return {
      chartInstance: null,
      icons: {
        sunny: sunnyImg,
        cloudy: cloudyImg,
        "partly-cloudy": partlyCloudyImg,
        rain: rain3Img
      },
      hourlyData: [
        { time: "现在", temp: 30, icon: "sunny" },
        { time: "15:00", temp: 32, icon: "cloudy" },
        { time: "16:00", temp: 33, icon: "partly-cloudy" },
        { time: "17:00", temp: 34, icon: "rain" },
        { time: "18:00", temp: 32, icon: "rain" },
        { time: "19:00", temp: 32, icon: "rain" },
        { time: "20:00", temp: 31, icon: "rain" },
        { time: "21:00", temp: 30, icon: "cloudy" },
        { time: "22:00", temp: 28, icon: "cloudy" },
        { time: "23:00", temp: 27, icon: "cloudy" },
        { time: "00:00", temp: 26, icon: "cloudy" }
      ],
      visibleCount: 6,
      startIndex: 0
    };
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
      const displayData = this.hourlyData.slice(
        this.startIndex,
        this.startIndex + this.visibleCount
      );
      const times = displayData.map((item) => item.time);
      const temps = displayData.map((item) => item.temp);
      // 计算顶部固定位置（让图标在最上方）
      const topY = Math.max(...temps) + 3;

      const option = {
        backgroundColor: "rgba(4, 26, 73, 0.8)",
        // 调整网格，给顶部图标留空间
        grid: {
          top: "25%",
          bottom: "15%",
          left: "5%",
          right: "5%",
          containLabel: true
        },
        tooltip: {
          trigger: "axis",
          formatter: "{b}<br/>温度: {c}°",
          backgroundColor: "rgba(10, 36, 99, 0.8)",
          textStyle: { color: "#fff" }
        },
        xAxis: {
          type: "category",
          data: times,
          axisLine: { show: false },
          axisTick: { show: false },
          axisLabel: {
            color: "#fff",
            fontSize: 14,
            // 让X轴标签在图标下方，水平对齐
            position: "top"
          },
          boundaryGap: false
        },
        yAxis: {
          type: "value",
          show: false,
          min: Math.min(...temps) - 2,
          max: topY + 1
        },
        series: [
          {
            name: "天气",
            type: "scatter",
            data: displayData.map((item, index) => [
              index,
              topY,
              { icon: item.icon }
            ]),
            symbol: (params) => {
              const customData = params[2] || {};
              const icon = this.icons[customData.icon] || "";
              return icon ? `image://${icon}` : "circle";
            },
            symbolSize: [58, 64],
            z: 3
          },
          {
            name: "温度",
            type: "line",
            data: temps,
            smooth: true,
            symbol: "circle",
            symbolSize: 8,
            lineStyle: {
              color: "#66bcfd",
              width: 6
            },
            itemStyle: {
              color: "#fff",
              borderColor: "#66bcfd",
              borderWidth: 2
            },
            label: {
              show: true,
              position: "top",
              color: "#fff",
              formatter: "{c}°",
              fontSize: 12
            }
          }
        ]
      };
      this.chartInstance.setOption(option);
    },
    scrollChart(direction) {
      if (direction === "left") {
        this.startIndex = Math.max(0, this.startIndex - 1);
      } else {
        this.startIndex = Math.min(
          this.hourlyData.length - this.visibleCount,
          this.startIndex + 1
        );
      }
      this.updateChart();
    },
    resizeChart() {
      if (this.chartInstance) this.chartInstance.resize();
    }
  }
};
</script>

<style scoped>
.hourly-weather-container {
  width: 100%;
  height: 200px;
  position: relative;
  display: flex;
  align-items: center;
  /* background: linear-gradient(135deg, #041a49 0%, #0a2463 100%); */
  padding: 0 10px;
  box-sizing: border-box;
}

.chart-wrapper {
  flex: 1;
  height: 100%;
}

.arrow {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  opacity: 0.8;
  transition: opacity 0.3s;
  background-color: rgba(83, 139, 184, 0.2);
  border-radius: 50%;
}

.arrow:hover {
  opacity: 1;
  transform: translateY(-2px);
}

.left-arrow {
  margin-right: 8px;
}

.right-arrow {
  margin-left: 8px;
}
</style>