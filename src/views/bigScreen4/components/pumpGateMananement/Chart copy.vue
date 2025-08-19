<template>
  <div class="chart-container">
    <div id="barChart" class="echart-container"></div>
  </div>
</template>

<script>
// 导入ECharts
import * as echarts from "echarts";

export default {
  name: "BarChartComponent",
  data() {
    return {
      chartInstance: null,
      // 图表数据
      chartData: {
        months: [
          "01月",
          "02月",
          "03月",
          "04月",
          "05月",
          "06月",
          "07月",
          "08月",
          "09月",
          "10月",
          "11月",
          "12月"
        ],
        series: [
          {
            name: "开闸次数",
            data: [7, 4, 5, 2, 3, 1, 3, 2, 4, 4, 4, 2],
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#3b82f6" },
                { offset: 1, color: "#1e40af" }
              ])
            }
          },
          {
            name: "开泵次数",
            data: [3, 3, 2, 7, 4, 4, 1, 3, 2, 2, 2, 2],
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#06b6d4" },
                { offset: 1, color: "#0e7490" }
              ])
            }
          }
        ]
      }
    };
  },
  mounted() {
    // 初始化图表
    this.initChart();
    // 监听窗口大小变化，调整图表大小
    window.addEventListener("resize", this.handleResize);
  },
  beforeDestroy() {
    // 销毁图表实例
    if (this.chartInstance) {
      this.chartInstance.dispose();
      this.chartInstance = null;
    }
    // 移除窗口大小变化监听
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    // 初始化图表
    initChart() {
      // 获取DOM元素
      const chartDom = document.getElementById("barChart");
      // 创建图表实例
      this.chartInstance = echarts.init(chartDom);

      // 图表配置
      const option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          },
          backgroundColor: 'rgba(10, 30, 60, 0.7)',
          borderColor: "rgba(100, 200, 255, 0.3)",
          textStyle: {
            color: "#fff"
          }
        },
        legend: {
          data: ["开闸次数", "开泵次数"],
          textStyle: {
            color: "#a0c4ff"
          },
          top: '4%'
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: this.chartData.months,
            axisTick: {
              alignWithLabel: true
            },
            axisLine: {
              lineStyle: {
                color: "rgba(100, 200, 255, 0.3)"
              }
            },
            axisLabel: {
              color: "#a0c4ff"
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            name: "单位: 次",
            nameGap: 25,
            nameTextStyle: {
              color: "#a0c4ff"
            },
            axisLine: {
              lineStyle: {
                color: "rgba(100, 200, 255, 0.3)"
              }
            },
            axisLabel: {
              color: "#a0c4ff"
            },
            splitLine: {
              show: false,
              lineStyle: {
                color: "rgba(100, 200, 255, 0.1)"
              }
            }
          }
        ],
        series: this.chartData.series.map((item) => ({
          name: item.name,
          type: "bar",
          barWidth: "30%",
          data: item.data,
          itemStyle: item.itemStyle,
          label: {
            show: true, // 显示数值
            position: "top", // 在柱子顶部显示
            color: "#fff", // 文字颜色
            fontSize: 12
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)"
            }
          }
        }))
      };

      // 设置图表配置
      this.chartInstance.setOption(option);
    },
    // 处理窗口大小变化
    handleResize() {
      if (this.chartInstance) {
        this.chartInstance.resize();
      }
    }
  }
};
</script>

<style scoped>
.chart-container {
  width: 100%;
  height: 100%;
  /* background-color: #0a1e3c; */
  /* background-image: radial-gradient(circle at center, #143a7c, #0a1e3c); */
  padding: 20px;
  position: relative;
  overflow: hidden;
}

.echart-container {
  width: 100%;
  height: 100%; /* 可以根据需要调整高度 */
}

/* 背景装饰 */
.chart-container::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  /* background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%231e3a8a' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E"); */
  opacity: 0.3;
  z-index: 0;
}
</style>