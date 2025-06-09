<template>
  <div ref="chart" style="width: 600px; height: 600px;"></div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  name: 'BaguaTaiChiChart',
  data() {
    return {
      chartInstance: null,
      rotation: 0,
      timer: null
    };
  },
  mounted() {
    this.initChart();
    this.startRotation();
    window.addEventListener('resize', this.resizeChart);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resizeChart);
    this.chartInstance && this.chartInstance.dispose();
    clearInterval(this.timer);
  },
  methods: {
    initChart() {
      const centerX = 300;
      const centerY = 300;
      const radius = 200;

      // 八卦布局
      const bagua = [
        { name: '乾 ☰', angle: 270 },
        { name: '兑 ☱', angle: 315 },
        { name: '离 ☲', angle: 0 },
        { name: '震 ☳', angle: 45 },
        { name: '巽 ☴', angle: 90 },
        { name: '坎 ☵', angle: 135 },
        { name: '艮 ☶', angle: 180 },
        { name: '坤 ☷', angle: 225 }
      ];

      const elements = bagua.map(item => {
        const rad = (item.angle * Math.PI) / 180;
        const x = centerX + radius * Math.cos(rad);
        const y = centerY + radius * Math.sin(rad);
        return {
          type: 'text',
          left: x,
          top: y,
          style: {
            text: item.name,
            fill: '#000',
            fontSize: 18,
            fontWeight: 'bold',
            textAlign: 'center',
            textVerticalAlign: 'middle',
            cursor: 'pointer'
          },
          onclick: () => alert(`点击了：${item.name}`)
        };
      });

      // 中心太极图（使用一组 graphic 元素组合出太极图）
      const taichiGroup = {
        type: 'group',
        id: 'taichi',
        left: 'center',
        top: 'center',
        rotation: 0,
        children: [
          // 黑色半圆
          {
            type: 'sector',
            shape: {
              cx: 0,
              cy: 0,
              r: 50,
              startAngle: 90,
              endAngle: 270
            },
            style: {
              fill: '#000'
            }
          },
          // 白色半圆
          {
            type: 'sector',
            shape: {
              cx: 0,
              cy: 0,
              r: 50,
              startAngle: -90,
              endAngle: 90
            },
            style: {
              fill: '#fff'
            }
          },
          // 黑色小圆
          {
            type: 'circle',
            shape: {
              cx: 0,
              cy: -25,
              r: 25
            },
            style: {
              fill: '#000'
            }
          },
          // 白色小圆
          {
            type: 'circle',
            shape: {
              cx: 0,
              cy: 25,
              r: 25
            },
            style: {
              fill: '#fff'
            }
          },
          // 黑中一点白
          {
            type: 'circle',
            shape: {
              cx: 0,
              cy: -25,
              r: 6
            },
            style: {
              fill: '#fff'
            }
          },
          // 白中一点黑
          {
            type: 'circle',
            shape: {
              cx: 0,
              cy: 25,
              r: 6
            },
            style: {
              fill: '#000'
            }
          }
        ]
      };

      // 设置 option
      this.chartInstance = echarts.init(this.$refs.chart);
      this.chartInstance.setOption({
        graphic: {
          elements: [
            ...elements,
            taichiGroup
          ]
        }
      });
    },

    startRotation() {
      this.timer = setInterval(() => {
        this.rotation += 2;
        this.chartInstance.setOption({
          graphic: {
            elements: [
              {
                id: 'taichi',
                rotation: (this.rotation * Math.PI) / 180
              }
            ]
          }
        });
      }, 50);
    },

    resizeChart() {
      this.chartInstance && this.chartInstance.resize();
    }
  }
};
</script>
