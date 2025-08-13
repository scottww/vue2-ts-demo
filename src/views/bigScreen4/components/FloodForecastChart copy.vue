<template>
  <div class="flood-warning-container">
    <div class="header">
      <div class="title">当前洪水预警状态</div>
      <div class="status">无预警</div>
    </div>
    <div id="floodChart" class="chart-container"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  data() {
    return {
      chartInstance: null,
      // 模拟数据
      timeData: [
        '12-20 03:00', '12-20 11:00', '12-20 19:00',
        '12-21 03:00', '12-21 11:00', '12-21 19:00',
        '12-22 03:00', '12-22 11:00', '12-22 19:00', '12-23 03:00'
      ],
      realTimeWaterLevel: [1.2, 1.5, 1.8, 2.0, 2.2, 2.5, 2.4, 2.2, 1.9, 1.6],
      forecastWaterLevel: [1.3, 1.6, 1.9, 2.1, 2.3, 2.6, 2.5, 2.3, 2.0, 1.7],
      forecastRainfall: [0, 0, 0, 0.5, 2.0, 1.5, 0.8, 0, 0, 0],
      warningWaterLevel: 2.5 // 汛限水位
    };
  },
  mounted() {
    this.initChart();
    // 监听窗口大小变化，重新调整图表大小
    window.addEventListener('resize', this.handleResize);
  },
  beforeDestroy() {
    // 销毁图表实例
    if (this.chartInstance) {
      this.chartInstance.dispose();
      this.chartInstance = null;
    }
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    initChart() {
      // 获取DOM元素并初始化图表
      const chartDom = document.getElementById('floodChart');
      this.chartInstance = echarts.init(chartDom);

      // 设置图表配置
      const option = {
        backgroundColor: 'rgba(10, 30, 60, 0.8)',
        color: ['#FFD700', '#1E90FF', '#9370DB', '#FF4500'],
        tooltip: {
          trigger: 'axis',
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          borderColor: 'rgba(50, 150, 255, 0.5)',
          textStyle: { color: '#fff' },
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: 'rgba(50, 150, 255, 0.5)'
            }
          }
        },
        legend: {
          data: ['实时水位', '预报水位', '预测雨量', '汛限水位'],
          textStyle: { color: '#fff' },
          top: 30
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          top: '15%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: this.timeData,
            axisLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.3)' } },
            axisLabel: { color: 'rgba(255, 255, 255, 0.7)' },
            splitLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.1)' } }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '水位(m)',
            min: 1.00,
            max: 3.00,
            interval: 0.5,
            axisLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.3)' } },
            axisLabel: { color: 'rgba(255, 255, 255, 0.7)' },
            splitLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.1)' } },
            nameTextStyle: { color: 'rgba(255, 255, 255, 0.7)' }
          },
          {
            type: 'value',
            name: '雨量(mm)',
            min: 0,
            max: 4.0,
            interval: 2.0,
            axisLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.3)' } },
            axisLabel: { color: 'rgba(255, 255, 255, 0.7)' },
            splitLine: { show: false },
            nameTextStyle: { color: 'rgba(255, 255, 255, 0.7)' }
          }
        ],
        series: [
          {
            name: '实时水位',
            type: 'line',
            data: this.realTimeWaterLevel,
            smooth: true,
            lineStyle: { width: 3 },
            symbol: 'circle',
            symbolSize: 8
          },
          {
            name: '预报水位',
            type: 'line',
            data: this.forecastWaterLevel,
            smooth: true,
            lineStyle: { width: 3, type: 'dashed' },
            symbol: 'circle',
            symbolSize: 8
          },
          {
            name: '预测雨量',
            type: 'bar',
            yAxisIndex: 1,
            data: this.forecastRainfall,
            barWidth: 20,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: 'rgba(147, 112, 219, 0.8)' },
                { offset: 1, color: 'rgba(147, 112, 219, 0.2)' }
              ])
            }
          },
          {
            name: '汛限水位',
            type: 'line',
            data: Array(this.timeData.length).fill(this.warningWaterLevel),
            lineStyle: { width: 2, type: 'solid', color: '#FF4500' },
            symbol: 'none',
            emphasis: { focus: 'series' },
            tooltip: { show: false }
          }
        ],
        // 添加当前时间线
        graphic: [
          {
            type: 'line',
            shape: {
              x1: 0,
              y1: 0,
              x2: 0,
              y2: '100%'
            },
            style: {
              stroke: 'rgba(255, 0, 0, 0.8)',
              lineWidth: 2,
              lineDash: [5, 5]
            },
            left: '50%',
            top: 0,
            bottom: 0
          },
          {
            type: 'text',
            left: '50%',
            top: '40%',
            style: {
              text: '当前时间',
              fill: '#fff',
              fontSize: 14,
              fontWeight: 'bold'
            },
            z: 100
          }
        ]
      };

      // 设置图表配置并渲染
      this.chartInstance.setOption(option);
    },
    handleResize() {
      if (this.chartInstance) {
        this.chartInstance.resize();
      }
    },
    // 更新图表数据的方法
    updateChartData(newData) {
      if (this.chartInstance && newData) {
        // 更新数据
        this.timeData = newData.timeData || this.timeData;
        this.realTimeWaterLevel = newData.realTimeWaterLevel || this.realTimeWaterLevel;
        this.forecastWaterLevel = newData.forecastWaterLevel || this.forecastWaterLevel;
        this.forecastRainfall = newData.forecastRainfall || this.forecastRainfall;
        this.warningWaterLevel = newData.warningWaterLevel !== undefined ? newData.warningWaterLevel : this.warningWaterLevel;

        // 更新图表
        this.chartInstance.setOption({
          xAxis: [{
            data: this.timeData
          }],
          series: [
            {
              name: '实时水位',
              data: this.realTimeWaterLevel
            },
            {
              name: '预报水位',
              data: this.forecastWaterLevel
            },
            {
              name: '预测雨量',
              data: this.forecastRainfall
            },
            {
              name: '汛限水位',
              data: Array(this.timeData.length).fill(this.warningWaterLevel)
            }
          ]
        });
      }
    }
  }
};
</script>

<style scoped>
.flood-warning-container {
  width: 100%;
  height: 400px;
  background-color: rgba(10, 30, 60, 0.8);
  border-radius: 10px;
  padding: 20px;
  box-sizing: border-box;
  color: white;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.title {
  font-size: 18px;
  font-weight: bold;
  color: #fff;
  text-shadow: 0 0 10px rgba(100, 200, 255, 0.8);
}

.status {
  font-size: 16px;
  font-weight: bold;
  color: #4CAF50;
  padding: 5px 10px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 5px;
  border: 1px solid rgba(76, 175, 80, 0.5);
}

.chart-container {
  width: 100%;
  height: calc(100% - 60px);
}
</style>