<template>
  <div class="equipment-manage-container">
    <!-- 顶部状态栏 -->
    <div class="status-bar">
      <div class="status-item">
        <span class="label">设备总数</span>
        <span class="value">140</span>
      </div>
      <div class="status-item online">
        <span class="label">在线数</span>
        <span class="value">138</span>
      </div>
      <div class="status-item offline">
        <span class="label">离线数</span>
        <span class="value">2</span>
      </div>
      <div class="status-item fault">
        <span class="label">故障数</span>
        <span class="value">0</span>
      </div>
    </div>

    <!-- 图表区域 -->
    <div class="chart-container">
      <div class="chart-title">设备类型分布</div>
      <div id="deviceTypeChart" class="chart"></div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  name: 'EquipmentManageChart',
  data() {
    return {
      chartInstance: null
    };
  },
  mounted() {
    this.initChart();
    window.addEventListener('resize', this.handleResize);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
    if (this.chartInstance) {
      this.chartInstance.dispose();
      this.chartInstance = null;
    }
  },
  methods: {
    initChart() {
      const chartDom = document.getElementById('deviceTypeChart');
      if (chartDom) {
        this.chartInstance = echarts.init(chartDom);

        const option = {
          backgroundColor: 'transparent',
          tooltip: {
            trigger: 'item',
            formatter: '{b}: {c} ({d}%)',
            textStyle: {
              color: '#fff'
            }
          },
          legend: {
            orient: 'vertical',
            right: 20,
            top: 'center',
            textStyle: {
              color: '#fff'
            },
            formatter: function(name) {
              // 为图例项添加图标
              return `{icon|●} ${name}`;
            },
            rich: {
              icon: {
                fontSize: 12,
                verticalAlign: 'middle'
              }
            }
          },
          series: [
            {
              name: '设备类型',
              type: 'pie',
              radius: ['40%', '70%'],
              avoidLabelOverlap: false,
              itemStyle: {
                borderRadius: 10,
                borderColor: '#0f2c59',
                borderWidth: 2
              },
              label: {
                show: false,
                position: 'center'
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: '18',
                  fontWeight: 'bold',
                  color: '#fff'
                }
              },
              labelLine: {
                show: false
              },
              data: [
                {
                  value: 45,
                  name: '感知监测',
                  itemStyle: { color: '#36CFC9' }
                },
                {
                  value: 30,
                  name: '视频监控',
                  itemStyle: { color: '#4E6EF2' }
                },
                {
                  value: 55,
                  name: '计算机监控',
                  itemStyle: { color: '#722ED1' }
                },
                {
                  value: 10,
                  name: '其他类',
                  itemStyle: { color: '#FF7D00' }
                }
              ]
            }
          ]
        };

        this.chartInstance.setOption(option);
      }
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
}

.status-bar {
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
  padding-bottom: 15px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.status-item {
  text-align: center;
  padding: 10px 20px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
}

.status-item .label {
  font-size: 14px;
  opacity: 0.8;
  display: block;
  margin-bottom: 5px;
}

.status-item .value {
  font-size: 20px;
  font-weight: bold;
}

.status-item.online .value {
  color: #36CFC9;
}

.status-item.offline .value {
  color: #FF7D00;
}

.status-item.fault .value {
  color: #F53F3F;
}

.chart-container {
  height: calc(100% - 100px);
  position: relative;
}

.chart-title {
  font-size: 18px;
  margin-bottom: 20px;
  text-align: center;
  font-weight: bold;
}

.chart {
  width: 100%;
  height: calc(100% - 40px);
}

/* 波浪背景效果 */
.equipment-manage-container::before {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100px;
  background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="rgba(54, 207, 201, 0.1)" fill-opacity="1" d="M0,160L48,165.3C96,171,192,181,288,160C384,139,480,85,576,85.3C672,85,768,139,864,149.3C960,160,1056,128,1152,112C1248,96,1344,96,1392,96L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>');
  background-size: cover;
  background-position: center;
  z-index: 0;
  opacity: 0.5;
}
</style>