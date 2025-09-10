<template>
  <!-- 3D 饼图容器 -->
  <div
    class="pie3d-container"
    ref="chart"
    style="width: 100%; height: 400px"
  ></div>
</template>

<script>
import * as echarts from "echarts";

export default {
  name: "Pie3DChart",
  props: {
    // 接收外部传入的数据，如果没有传，则默认为空数组
    data: {
      type: Array,
      default: () => []
    },
    // 内径占比，控制甜甜圈的洞大小
    internalDiameterRatio: {
      type: Number,
      default: 0.5
    },
    // 饼图颜色列表
    colors: {
      type: Array,
      default: () => ["#ffcc00", "#ffae3a", "#0cc2c2", "#02abf9"]
    }
  },
  data() {
    return {
      chart: null, // echarts 实例
      option: null, // echarts 配置
      genData: [] // 内部生成的饼图数据
    };
  },
  methods: {
    // 初始化数据，如果没有 props.data，就使用默认数据
    initData() {
      let colors = this.colors;

      // 默认名称和数据
      let xData = ["打车费", "住宿费", "办公费", "差旅费"];
      let yData = [50, 100, 150, 50];

      // 将数据转换成带颜色和透明度的对象
      let optionsData = [];
      for (let i = 0; i < xData.length; i++) {
        optionsData.push({
          name: xData[i],
          value: yData[i],
          itemStyle: {
            color: colors[i],
            opacity: 0.92
          }
        });
      }

      this.genData = optionsData;

      // 在下一次 DOM 更新后渲染图表
      this.$nextTick(() => {
        this.renderChart();
      });
    },

    /**
     * 根据 startRatio 和 endRatio 生成 3D 参数方程
     * 用于 surface 系列绘制每个扇形
     */
    getParametricEquation(
      startRatio,
      endRatio,
      isSelected,
      isHovered,
      k,
      height
    ) {
      let midRatio = (startRatio + endRatio) / 2;
      let startRadian = startRatio * Math.PI * 2;
      let endRadian = endRatio * Math.PI * 2;
      let midRadian = midRatio * Math.PI * 2;

      if (startRatio === 0 && endRatio === 1) isSelected = false;
      k = typeof k !== "undefined" ? k : 1 / 3;

      // 如果选中，整体偏移
      let offsetX = isSelected ? Math.cos(midRadian) * 0.1 : 0;
      let offsetY = isSelected ? Math.sin(midRadian) * 0.1 : 0;

      // 鼠标悬停放大比例
      let hoverRate = isHovered ? 1.05 : 1;

      return {
        u: { min: -Math.PI, max: Math.PI * 3, step: Math.PI / 32 },
        v: { min: 0, max: Math.PI * 2, step: Math.PI / 20 },
        x: function (u, v) {
          if (u < startRadian)
            return (
              offsetX +
              Math.cos(startRadian) * (1 + Math.cos(v) * k) * hoverRate
            );
          if (u > endRadian)
            return (
              offsetX + Math.cos(endRadian) * (1 + Math.cos(v) * k) * hoverRate
            );
          return offsetX + Math.cos(u) * (1 + Math.cos(v) * k) * hoverRate;
        },
        y: function (u, v) {
          if (u < startRadian)
            return (
              offsetY +
              Math.sin(startRadian) * (1 + Math.cos(v) * k) * hoverRate
            );
          if (u > endRadian)
            return (
              offsetY + Math.sin(endRadian) * (1 + Math.cos(v) * k) * hoverRate
            );
          return offsetY + Math.sin(u) * (1 + Math.cos(v) * k) * hoverRate;
        },
        z: function (u, v) {
          if (u < -Math.PI * 0.5) return Math.sin(u);
          if (u > Math.PI * 2.5) return Math.sin(u);
          return Math.sin(v) > 0 ? 1 * height : -1;
        }
      };
    },

    /**
     * 将普通数据转换为 echarts 3D surface 系列数据
     */
    getPie3D(pieData, internalDiameterRatio) {
      let series = [];
      let sumValue = 0;
      let startValue = 0;
      let endValue = 0;

      // k 控制厚度
      let k =
        typeof internalDiameterRatio !== "undefined"
          ? (1 - internalDiameterRatio) / (1 + internalDiameterRatio)
          : 1 / 3;

      // 计算总值
      pieData.forEach((item) => (sumValue += item.value));

      // 生成每个扇形 series
      pieData.forEach((item, i) => {
        endValue = startValue + item.value;

        let seriesItem = {
          name: item.name || `series${i}`,
          type: "surface",
          parametric: true,
          wireframe: { show: false },
          pieData: item, // 保存原始数据
          pieStatus: { selected: false, hovered: false, k: k },
          itemStyle: {
            color: item.itemStyle?.color || this.colors[i % this.colors.length],
            opacity: item.itemStyle?.opacity || 0.9
          }
        };

        // 计算扇形起止比例
        seriesItem.pieData.startRatio = startValue / sumValue;
        seriesItem.pieData.endRatio = endValue / sumValue;

        // 设置参数方程
        seriesItem.parametricEquation = this.getParametricEquation(
          seriesItem.pieData.startRatio,
          seriesItem.pieData.endRatio,
          false,
          false,
          k,
          item.value
        );

        startValue = endValue;
        series.push(seriesItem);
      });

      // 添加透明背景面，防止鼠标穿透
      series.push({
        name: "mouseoutSeries",
        type: "surface",
        parametric: true,
        wireframe: { show: false },
        itemStyle: { opacity: 0.1, color: "#008fff" },
        parametricEquation: {
          u: { min: 0, max: Math.PI * 2, step: Math.PI / 20 },
          v: { min: 0, max: Math.PI, step: Math.PI / 20 },
          x: function (u, v) {
            return ((Math.sin(v) * Math.sin(u) + Math.sin(u)) / Math.PI) * 2.5;
          },
          y: function (u, v) {
            return ((Math.sin(v) * Math.cos(u) + Math.cos(u)) / Math.PI) * 2.5;
          },
          z: function (u, v) {
            return -8; //// 可以调小，比如 -8，使底座更低
          }
        }
      });

      return series;
    },

    /**
     * 渲染图表
     */
    renderChart() {
      if (!this.chart) this.chart = echarts.init(this.$refs.chart);

      // 获取 3D surface 系列
      const series = this.getPie3D(this.genData, this.internalDiameterRatio);

      // echarts 配置
      this.option = {
        legend: {
          data: this.genData.map((d) => d.name),
          right: "2%",
          top: "center",
          orient: "vertical",
          itemGap: 20,
          textStyle: { color: "#fff", fontSize: 12 }
        },
        // tooltip，安全读取 value，防止 undefined
        tooltip: {
          formatter: (params) => {
            if (params.seriesName !== "mouseoutSeries") {
              const val =
                this.option.series[params.seriesIndex]?.pieData?.value || 0;
              return `${params.seriesName}<br/>
        <span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${params.color};"></span>
        ${val}`;
            }
          },
          textStyle: { fontSize: 12 }
        },
        backgroundColor: "#333",
        grid3D: { show: false, boxHeight: 0.5, bottom: "20%" },
        xAxis3D: { min: -1, max: 1 },
        yAxis3D: { min: -1, max: 1 },
        zAxis3D: { min: -1, max: 1 },
        series: series
      };

      // 设置配置
      this.chart.setOption(this.option);

      // 监听窗口变化，自适应大小
      window.addEventListener("resize", this.resizeChart);
    },

    // 窗口大小改变时，调整图表
    resizeChart() {
      this.chart?.resize();
    }
  },
  mounted() {
    // 初始化数据并渲染
    this.initData();
  },
  beforeDestroy() {
    // 移除 resize 监听
    window.removeEventListener("resize", this.resizeChart);
    this.chart?.dispose();
  }
};
</script>

<style scoped>
.pie3d-container {
  width: 100%;
  height: 400px;
}
</style>
