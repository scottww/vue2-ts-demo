<template>
  <div class="topline-bar-chart-container">
    <!-- 左箭头 -->
    <div
      class="arrow left-arrow"
      :class="{ disabled: !showLeftArrow }"
      @click="scrollChart('left')"
    >
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

    <div :style="{ height: height }" ref="chart" class="chart-container"></div>

    <!-- 右箭头 -->
    <div
      class="arrow right-arrow"
      :class="{ disabled: !showRightArrow }"
      @click="scrollChart('right')"
    >
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

export default {
  name: "TopLineBarChart",
  props: {
    data: {
      type: Array,
      required: true,
      default: () => [
        { label: "现在", value: "0.0" },
        { label: "15:00", value: "0.8" },
        { label: "16:00", value: "1.0" },
        { label: "17:00", value: "0.5" },
        { label: "18:00", value: "0.2" },
        { label: "19:00", value: "0.8" },
        { label: "20:00", value: "2.5" },
        { label: "21:00", value: "1.6" },
        { label: "22:00", value: "0.0" },
        { label: "23:00", value: "0.0" },
        { label: "00:00", value: "0.0" }
      ]
    },
    height: { type: String, default: "200px" },
    visibleCount: { type: Number, default: 7 } // 一次显示多少条
  },
  data() {
    return {
      chart: null,
      startIndex: 0
    };
  },
  computed: {
    showLeftArrow() {
      return this.startIndex > 0;
    },
    showRightArrow() {
      return this.startIndex < this.data.length - this.visibleCount;
    },
    displayData() {
      return this.data.slice(
        this.startIndex,
        this.startIndex + this.visibleCount
      );
    }
  },
  watch: {
    data: {
      handler() {
        this.setOption();
      },
      deep: true
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.chart = echarts.init(this.$refs.chart);
      this.setOption();
      window.addEventListener("resize", this.resizeChart);
    });
  },
  beforeDestroy() {
    if (this.chart) this.chart.dispose();
    window.removeEventListener("resize", this.resizeChart);
  },
  methods: {
    resizeChart() {
      if (this.chart) this.chart.resize();
    },
    setOption() {
      if (!this.chart) return;

      const maxVal = Math.max(...this.data.map((item) => item.value));
      const points = this.displayData.map((item) => ({
        name: "top-line",
        xAxis: item.label,
        yAxis: item.value,
        symbol: "rect",
        symbolSize: [28, 3],
        itemStyle: {
          color: "rgba(255, 255, 255, 1)",
          shadowColor: "rgba(255, 255, 255, 1)",
          shadowBlur: 10,
          shadowOffsetY: -3
        }
      }));

      const option = {
        tooltip: {
          show: true,
          trigger: "item",
          backgroundColor: "rgba(21, 154, 255, 0.32)",
          textStyle: { color: "#fff" },
          formatter: (params) => `${params.name}<br/>雨量: ${params.value}mm`
        },
        // backgroundColor: "rgba(8, 30, 80, 1)",
        grid: {
          top: "15%",
          left: "5%",
          right: "5%",
          bottom: "5%",
          containLabel: true
        },
        xAxis: {
          type: "category",
          data: this.displayData.map((item) => item.label),
          axisLine: { show: false },
          axisTick: { show: false },
          axisLabel: { color: "#a2d9ff", fontSize: 12, margin: 20 },
          boundaryGap: false,
          position: "top"
        },
        yAxis: {
          type: "value",
          show: false,
          axisLine: { lineStyle: { color: "#3C6579" } },
          axisTick: { show: false },
          splitLine: { show: false },
          axisLabel: { color: "#a2d9ff", fontSize: 12 }
        },
        series: [
          {
            type: "bar",
            barWidth: 27,
            name: "雨量",
            data: this.displayData.map((item) => item.value),
            itemStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  { offset: 0, color: "#0092FF" },
                  { offset: 1, color: "#007BF3" }
                ],
                global: false
              }
            },
            markPoint: { symbol: "none", silent: true, data: points },
            label: {
              show: true,
              position: "top",
              color: "#fff",
              fontSize: 12,
              formatter: "{c}mm"
            }
          }
        ]
      };

      this.chart.setOption(option);
    },
    scrollChart(direction) {
      if (direction === "left") {
        this.startIndex = Math.max(0, this.startIndex - 1);
      } else {
        this.startIndex = Math.min(
          this.data.length - this.visibleCount,
          this.startIndex + 1
        );
      }
      this.setOption();
    }
  }
};
</script>

<style scoped>
.topline-bar-chart-container {
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  padding: 0 10px;
  box-sizing: border-box;
}

.chart-container {
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
  transition: opacity 0.3s, transform 0.3s;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
}

.arrow:hover {
  transform: scale(1.2) translateY(-2px);
}

.arrow.disabled {
  opacity: 0.2;
  pointer-events: none;
}

.left-arrow {
  /* margin-right: 8px; */
}

.right-arrow {
  /* margin-left: 8px; */
}
</style>
