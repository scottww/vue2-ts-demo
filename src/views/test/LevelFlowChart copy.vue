<template>
  <div class="level-flow-chart">
    <div id="levelFlowChart" ref="chartContainer"></div>
  </div>
</template>

<script>
// 导入ECharts
import * as echarts from "echarts";

export default {
  name: "LevelFlowChart",
  props: {
    chartData: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      chart: null,
      // 默认的水位流量数据
      defaultData: {
        // X轴时间数据
        timeData: [
          "12-20 03:00",
          "12-20 11:00",
          "12-20 19:00",
          "12-21 03:00",
          "12-21 11:00",
          "12-21 19:00",
          "12-22 03:00",
          "12-22 11:00",
          "12-22 19:00",
          "12-22 03:00"
        ],
        // 水位数据（m）
        actualLevel: [1.2, 1.3, 1.5, 1.7, 1.9, 1.8, 1.6, 1.4, 1.3, 1.2],
        forecastLevel: [1.2, 1.4, 1.6, 1.8, 2.0, 1.9, 1.7, 1.5, 1.4, 1.3],
        // 流量数据（m³/s）
        actualFlow: [1.2, 1.3, 1.4, 1.5, 1.6, 1.5, 1.4, 1.3, 1.2, 1.1],
        forecastFlow: [1.2, 1.3, 1.5, 1.6, 1.7, 1.6, 1.5, 1.4, 1.3, 1.2],
        // 警戒水位
        warningLevel: 2.0,
        // 当前时间线位置（索引值）
        currentTimeIndex: 3
      }
    };
  },
  mounted() {
    this.initChart();
    // 监听窗口大小变化，重新调整图表大小
    window.addEventListener("resize", this.handleResize);
  },
  beforeDestroy() {
    // 销毁图表实例
    if (this.chart) {
      this.chart.dispose();
    }
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    // 初始化图表
    initChart() {
      // 获取容器并初始化图表
      this.chart = echarts.init(this.$refs.chartContainer);

      // 合并数据（如果有传入数据则使用，否则使用默认数据）
      const data = { ...this.defaultData, ...this.chartData };

      // 准备图表配置项
      const option = {
        // 蓝色背景带波浪纹理
        backgroundColor: {
          type: 'pattern',
          image: this.createWavePattern(),
          repeat: 'repeat'
        },
        // 图例
        legend: {
          data: [
            { name: '实时水位', itemStyle: { color: '#FFC300' } },
            { name: '预报水位', itemStyle: { color: '#4A90E2' } },
            { name: '报讯流量', itemStyle: { color: '#67C23A' } },
            { name: '预报流量', itemStyle: { color: '#1989FA' } },
            { name: '警戒水位', itemStyle: { color: '#F56C6C' } }
          ],
          top: 10,
          itemGap: 10,
          textStyle: {
            color: '#fff'
          }
        },
        // 提示框
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              color: "#fff"
            }
          },
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          borderColor: "#4A90E2",
          textStyle: {
            color: "#fff"
          },
          formatter: function (params) {
            let result = params[0].name + "<br/>";
            params.forEach((item) => {
              if (item.value !== null && item.value !== undefined) {
                const unit = item.seriesName.includes("水位") ? " m" : " m³/s";
                result += item.marker + item.seriesName + ": " + item.value.toFixed(2) + unit + "<br/>";
              }
            });
            return result;
          }
        },
        // 网格配置
        grid: {
          left: "5%",
          right: "5%",
          top: "15%",
          bottom: "15%",
          containLabel: true
        },
        // X轴配置
        xAxis: {
          type: "category",
          data: data.timeData,
          axisLine: {
            show: true,
            lineStyle: { color: "rgba(255, 255, 255, 0.6)" }
          },
          axisLabel: {
            color: "rgba(255, 255, 255, 0.8)",
            fontSize: 12
          },
          axisTick: {
            show: false
          }
        },
        // Y轴配置：左侧水位轴
        yAxis: [
          {
            type: "value",
            name: "水位(m)",
            nameTextStyle: {
              color: "rgba(255, 255, 255, 0.8)",
              padding: [0, 0, 0, 20]
            },
            min: 1.0,
            max: 3.0,
            interval: 0.5,
            position: "left",
            axisLine: {
              show: true,
              lineStyle: { color: "rgba(255, 255, 255, 0.6)" }
            },
            axisLabel: {
              color: "rgba(255, 255, 255, 0.8)",
              fontSize: 12,
              formatter: '{value}'
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: "rgba(255, 255, 255, 0.2)",
                type: "dashed"
              }
            }
          },
          // 右侧流量轴
          {
            type: "value",
            name: "流量(m³/s)",
            nameTextStyle: {
              color: "rgba(255, 255, 255, 0.8)",
              padding: [0, 20, 0, 0]
            },
            min: 1.0,
            max: 3.0,
            interval: 0.5,
            position: "right",
            axisLine: {
              show: true,
              lineStyle: { color: "rgba(255, 255, 255, 0.6)" }
            },
            axisLabel: {
              color: "rgba(255, 255, 255, 0.8)",
              fontSize: 12,
              formatter: '{value}'
            },
            splitLine: {
              show: false
            }
          }
        ],
        // 系列配置
        series: [
          // 实时水位折线图
          {
            name: "实时水位",
            type: "line",
            data: data.actualLevel,
            itemStyle: {
              color: "#FFC300"
            },
            lineStyle: {
              width: 2
            },
            symbol: "circle",
            symbolSize: 4
          },
          // 预报水位折线图
          {
            name: "预报水位",
            type: "line",
            data: data.forecastLevel,
            itemStyle: {
              color: "#4A90E2"
            },
            lineStyle: {
              width: 2
            },
            symbol: "circle",
            symbolSize: 4
          },
          // 报讯流量折线图
          {
            name: "报讯流量",
            type: "line",
            data: data.actualFlow,
            yAxisIndex: 1, // 使用右侧Y轴
            itemStyle: {
              color: "#67C23A"
            },
            lineStyle: {
              width: 2
            },
            symbol: "circle",
            symbolSize: 4
          },
          // 预报流量折线图
          {
            name: "预报流量",
            type: "line",
            data: data.forecastFlow,
            yAxisIndex: 1, // 使用右侧Y轴
            itemStyle: {
              color: "#1989FA"
            },
            lineStyle: {
              width: 2
            },
            symbol: "circle",
            symbolSize: 4
          },
          // 警戒水位线
          {
            name: "警戒水位",
            type: "line",
            data: data.timeData.map(() => data.warningLevel),
            itemStyle: {
              color: "#F56C6C"
            },
            lineStyle: {
              width: 2,
              type: "solid"
            },
            symbol: "none"
          },
          // 当前时间线 - 使用markLine方式实现
          {
            name: "当前时间",
            type: "line",
            data: [],
            symbol: "none",
            silent: true,
            markLine: {
              data: [
                {
                  xAxis: data.timeData[data.currentTimeIndex],
                  name: '当前时间',
                  label: {
                    formatter: '当前时间',
                    color: '#FF0000',
                    position: 'end'
                  },
                  lineStyle: {
                    color: '#FF0000',
                    width: 1,
                    type: 'dashed'
                  }
                }
              ],
              silent: true
            }
          }
        ]
      };

      // 应用配置项
      this.chart.setOption(option);
    },
    
    // 生成波浪纹理背景
    createWavePattern() {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = 100;
      canvas.height = 100;
      
      // 创建蓝色背景
      ctx.fillStyle = '#003366';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // 绘制波浪纹理
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.lineWidth = 1;
      
      for (let i = 0; i < 10; i++) {
        const y = i * 10 + 5;
        ctx.beginPath();
        for (let x = 0; x < canvas.width; x++) {
          const waveY = y + Math.sin((x + i * 5) / 10) * 2;
          if (x === 0) {
            ctx.moveTo(x, waveY);
          } else {
            ctx.lineTo(x, waveY);
          }
        }
        ctx.stroke();
      }
      
      return canvas;
    },

    // 生成时间线数据 - 由于使用graphic实现时间线，此方法暂时保留以备将来使用
    generateTimeLineData(length, maxValue, index) {
      const data = [];
      for (let i = 0; i < length; i++) {
        if (i === index) {
          data.push([i, 0], [i, maxValue]);
        } else {
          data.push(null);
        }
      }
      return data;
    },

    // 处理窗口大小变化
    handleResize() {
      if (this.chart) {
        this.chart.resize();
      }
    },

    // 更新图表数据
    updateChart(newData) {
      if (this.chart) {
        // 合并新旧数据
        const data = { ...this.defaultData, ...newData };

        // 更新图表数据
        this.chart.setOption({
          xAxis: { data: data.timeData },
          series: [
            { data: data.actualLevel },
            { data: data.forecastLevel },
            { data: data.actualFlow },
            { data: data.forecastFlow },
            { data: data.timeData.map(() => data.warningLevel) },
            {
              data: [],
              markLine: {
                data: [
                  {
                    xAxis: data.timeData[data.currentTimeIndex],
                    name: '当前时间',
                    label: {
                      formatter: '当前时间',
                      color: '#FF0000',
                      position: 'end'
                    },
                    lineStyle: {
                      color: '#FF0000',
                      width: 1,
                      type: 'dashed'
                    }
                  }
                ]
              }
            }
          ]
        });
      }
    }
  }
};
</script>

<style scoped>
.level-flow-chart {
  width: 100%;
  height: 100%;
  min-height: 300px;
}

#levelFlowChart {
  width: 100%;
  height: 100%;
}
</style>