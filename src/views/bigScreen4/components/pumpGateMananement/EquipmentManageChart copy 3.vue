<template>
  <div class="equipment-manage-container">
    <div class="main-content">
      <!-- 左侧2.5D环形图 -->
      <div class="left-section">
        <div class="chart-container">
          <div ref="chartRef" class="echarts-chart"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import "echarts-gl"; // 引入3D扩展

export default {
  name: "Chart2",
  data() {
    return {
      chartInstance: null,
      deviceData: [
        { name: "感知监测", value: 45, itemStyle: { color: "#36CFC9" } },
        { name: "视频监控", value: 30, itemStyle: { color: "#FF7D00" } },
        { name: "计算机监控", value: 55, itemStyle: { color: "#4096FF" } },
        { name: "其他类", value: 10, itemStyle: { color: "#722ED1" } }
      ]
    };
  },
  mounted() {
    this.initChart();
    window.addEventListener("resize", this.handleResize);
  },
  beforeDestroy() {
    if (this.chartInstance) {
      this.chartInstance.dispose();
      this.chartInstance = null;
    }
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    initChart() {
      this.chartInstance = echarts.init(this.$refs.chartRef);

      const option = {
        backgroundColor: "transparent",
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)",
          textStyle: { color: "#fff" }
        },
        legend: {
          orient: "vertical",
          right: 10,
          top: "center",
          textStyle: { color: "#fff" },
          data: this.deviceData.map((item) => item.name)
        },
        series: [
          {
            name: "设备类型",
            type: "pie",
            radius: ["40%", "70%"],
            avoidLabelOverlap: false,
            itemStyle: {
              borderColor: "#0f2c59",
              borderWidth: 2
            },
            label: { show: false },
            labelLine: { show: false },
            data: this.deviceData,
            // 2.5D效果配置
            depth: 40,
            itemStyle: {
              shadowBlur: 15,
              shadowOffsetX: 5,
              shadowColor: "rgba(0, 0, 0, 0.6)"
            },
            // 设置视角，实现侧面效果
            viewControl: {
              projection: "perspective",
              autoRotate: false,
              rotateSensitivity: 0,
              zoomSensitivity: 0,
              panSensitivity: 0,
              // 调整旋转角度，实现侧面视角
              alpha: 45,
              beta: 30
            }
          }
        ]
      };

      this.chartInstance.setOption(option);
    },
    handleResize() {
      if (this.chartInstance) {
        this.chartInstance.resize();
      }
    }
  }
};
</script>

<style scoped>
.equipment-manage-container {
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, #0f2c59, #1c4587);
  padding: 20px;
  box-sizing: border-box;
  color: #fff;
  position: relative;
  overflow: hidden;
}

/* 波浪背景效果 */
.equipment-manage-container::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("data:image/svg+xml,%3Csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='wave' width='100' height='20' patternUnits='userSpaceOnUse'%3E%3Cpath d='M0,10 Q25,20 50,10 T100,10' fill='none' stroke='rgba(54, 207, 201, 0.1)' stroke-width='1'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23wave)'/%3E%3C/svg%3E");
  opacity: 0.5;
  z-index: 0;
}

.main-content {
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: space-between;
  position: relative;
  z-index: 1;
}

.left-section {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.chart-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.echarts-chart {
  width: 400px;
  height: 400px;
}

.right-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-left: 50px;
}

.stat-card {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  padding: 20px;
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.stat-title {
  font-size: 16px;
  opacity: 0.8;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
}

.stat-title::before {
  content: "";
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-right: 10px;
}

.stat-card.online .stat-title::before {
  background-color: #36cfc9;
}

.stat-card.offline .stat-title::before {
  background-color: #ff7d00;
}

.stat-card.fault .stat-title::before {
  background-color: #f53f3f;
}

.stat-value {
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 5px;
}

.stat-card.online .stat-value {
  color: #36cfc9;
}

.stat-card.offline .stat-value {
  color: #ff7d00;
}

.stat-card.fault .stat-value {
  color: #f53f3f;
}

.stat-percentage {
  font-size: 14px;
  opacity: 0.7;
}
</style>