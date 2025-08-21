<template>
  <div ref="chart" style="width: 600px; height: 400px;"></div>
</template>

<script>
import * as echarts from 'echarts';
import 'echarts-gl';

export default {
  name: 'Pie3DChart',
  data() {
    return {
      chart: null,
      dataList: [
        {
          name: '运行维护费',
          val: 1230,
          itemStyle: { color: 'rgba(0, 81, 180, 0.5)' }
        },
        {
          name: '办公费',
          val: 800,
          itemStyle: { color: 'rgba(255, 196, 0, 0.5)' }
        },
        {
          name: '差旅费',
          val: 500,
          itemStyle: { color: 'rgba(95, 144, 110, 0.5)' }
        }
      ],
      heightProportion: 0.2,
      option: {}
    };
  },
  mounted() {
    this.chart = echarts.init(this.$refs.chart);
    this.initOption();
    this.chart.setOption(this.option);
  },
  methods: {
    getParametricEquation(startRatio, endRatio, isSelected, isHovered, k, height) {
      var midRatio = (startRatio + endRatio) / 3;
      var startRadian = startRatio * Math.PI * 2;
      var endRadian = endRatio * Math.PI * 2;
      var midRadian = midRatio * Math.PI * 2;

      if (startRatio === 0 && endRatio === 1) isSelected = false;
      k = typeof k !== 'undefined' ? k : 1 / 3;
      var offsetX = isSelected ? Math.cos(midRadian) * 0.1 : 0;
      var offsetY = isSelected ? Math.sin(midRadian) * 0.1 : 0;
      var hoverRate = isHovered ? 1.1 : 1;

      return {
        u: { min: -Math.PI, max: Math.PI * 3, step: Math.PI / 32 },
        v: { min: 0, max: Math.PI * 2, step: Math.PI / 20 },
        x: function(u, v) {
          if (u < startRadian) return offsetX + Math.cos(startRadian) * (1 + Math.cos(v) * k) * hoverRate;
          if (u > endRadian) return offsetX + Math.cos(endRadian) * (1 + Math.cos(v) * k) * hoverRate;
          return offsetX + Math.cos(u) * (1 + Math.cos(v) * k) * hoverRate;
        },
        y: function(u, v) {
          if (u < startRadian) return offsetY + Math.sin(startRadian) * (1 + Math.cos(v) * k) * hoverRate;
          if (u > endRadian) return offsetY + Math.sin(endRadian) * (1 + Math.cos(v) * k) * hoverRate;
          return offsetY + Math.sin(u) * (1 + Math.cos(v) * k) * hoverRate;
        },
        z: function(u, v) {
          if (u < -Math.PI * 0.5) return Math.sin(u);
          if (u > Math.PI * 2.5) return Math.sin(u);
          return Math.sin(v) > 0 ? this.heightProportion * height : -1;
        }.bind(this)
      };
    },
    getPie3D(pieData, internalDiameterRatio) {
      var series = [];
      var sumValue = 0;
      var startValue = 0;
      var endValue = 0;
      var linesSeries = [];
      var k = typeof internalDiameterRatio !== 'undefined' ? (1 - internalDiameterRatio) / (1 + internalDiameterRatio) : 1 / 3;

      for (var i = 0; i < pieData.length; i++) {
        sumValue += pieData[i].value;
        var seriesItem = {
          name: pieData[i].name || 'series' + i,
          type: 'surface',
          parametric: true,
          wireframe: { show: false },
          pieData: pieData[i],
          pieStatus: { selected: false, hovered: false, k: k }
        };
        if (pieData[i].itemStyle) {
          var itemStyle = {};
          if (pieData[i].itemStyle.color) itemStyle.color = pieData[i].itemStyle.color;
          if (pieData[i].itemStyle.opacity) itemStyle.opacity = pieData[i].itemStyle.opacity;
          seriesItem.itemStyle = itemStyle;
        }
        series.push(seriesItem);
      }

      for (var i = 0; i < series.length; i++) {
        endValue = startValue + series[i].pieData.value;
        series[i].pieData.startRatio = startValue / sumValue;
        series[i].pieData.endRatio = endValue / sumValue;
        series[i].parametricEquation = this.getParametricEquation(
          series[i].pieData.startRatio,
          series[i].pieData.endRatio,
          false,
          false,
          k,
          series[i].pieData.value
        );
        startValue = endValue;

        var midRadian = (series[i].pieData.endRatio + series[i].pieData.startRatio) * Math.PI;
        var posX = Math.cos(midRadian) * (1 + Math.cos(Math.PI / 2));
        var posY = Math.sin(midRadian) * (1 + Math.cos(Math.PI / 2));
        var posZ = Math.log(Math.abs(series[i].pieData.value + 1)) * 0.1;
        var flag = ((midRadian >= 0 && midRadian <= Math.PI / 2) || (midRadian >= 3 * Math.PI / 2 && midRadian <= Math.PI * 2)) ? 1 : -1;
        var color = pieData[i].itemStyle.color;
        var turningPosArr = [posX * 1.8 + i * 0.1 * flag + (flag < 0 ? -0.5 : 0), posY * 1.8 + i * 0.1 * flag + (flag < 0 ? -0.5 : 0), posZ * 2];
        var endPosArr = [posX * 1.9 + i * 0.1 * flag + (flag < 0 ? -0.5 : 0), posY * 1.9 + i * 0.1 * flag + (flag < 0 ? -0.5 : 0), posZ * 6];

        linesSeries.push(
          {
            type: 'line3D',
            lineStyle: { color: color },
            data: [[posX, posY, posZ], turningPosArr, endPosArr]
          },
          {
            type: 'scatter3D',
            label: {
              show: true,
              distance: 0,
              position: 'center',
              textStyle: { color: '#fff', backgroundColor: color, borderWidth: 2, fontSize: 14, padding: 10, borderRadius: 4 },
              formatter: '{b}'
            },
            symbolSize: 0,
            data: [{ name: series[i].name + '\n' + series[i].pieData.val, value: endPosArr }]
          }
        );
      }

      series = series.concat(linesSeries);

      // 最底下圆盘
      series.push({
        name: 'mouseoutSeries',
        type: 'surface',
        parametric: true,
        wireframe: { show: false },
        itemStyle: { opacity: 1, color: 'rgba(25, 93, 176, 1)' },
        parametricEquation: {
          u: { min: 0, max: Math.PI * 2, step: Math.PI / 20 },
          v: { min: 0, max: Math.PI, step: Math.PI / 20 },
          x: function(u, v) { return ((Math.sin(v) * Math.sin(u) + Math.sin(u)) / Math.PI) * 2; },
          y: function(u, v) { return ((Math.sin(v) * Math.cos(u) + Math.cos(u)) / Math.PI) * 2; },
          z: function(u, v) { return Math.cos(v) > 0 ? -0 : -1.5; }
        }
      });

      return series;
    },
    initOption() {
      var total = 0;
      for (var i = 0; i < this.dataList.length; i++) total += this.dataList[i].val;
      var series = this.getPie3D(
        this.dataList.map(item => {
          item.value = Number((item.val / total * 100).toFixed(2));
          return item;
        }),
        0.8
      );

      this.option = {
        legend: {
          tooltip: { show: true },
          data: this.dataList.map(item => item.name),
          top: '5%',
          left: '5%',
          icon: 'circle',
          textStyle: { color: '#fff', fontSize: 14 }
        },
        animation: true,
        title: [
          { x: 'center', top: '40%', text: total, textStyle: { color: '#fff', fontSize: 42, fontWeight: 'bold' } },
          { x: 'center', top: '48%', text: '还款总额', textStyle: { color: '#fff', fontSize: 22, fontWeight: 400 } }
        ],
        backgroundColor: '#333',
        labelLine: { show: true, lineStyle: { color: '#7BC0CB' } },
        label: { show: false },
        xAxis3D: { min: -1.5, max: 1.5 },
        yAxis3D: { min: -1.5, max: 1.5 },
        zAxis3D: { min: -1, max: 1 },
        grid3D: { show: false, boxHeight: 4, bottom: '50%', viewControl: { distance: 180, alpha: 25, beta: 60, autoRotate: true } },
        series: series
      };
    }
  }
};
</script>

<style scoped>
</style>
