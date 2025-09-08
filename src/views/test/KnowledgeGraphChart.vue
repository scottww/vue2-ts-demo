<template>
  <div
    ref="chartContainer"
    class="graph-chart"
    :style="{ width: width, height: height }"
  ></div>
</template>

<script>
import * as echarts from "echarts";
import { LIST } from "./KnowledgeGraphChartData";
export default {
  name: "KnowledgeGraph",
  props: {
    listData: {
      type: Array,
      required: true,
      default: () => LIST
    },
    colors: {
      type: Array,
      default: () => [
        { c1: "#00c7ef", c2: "#0AF3FF" },
        { c1: "#FF8E14", c2: "#FFA12F" },
        { c1: "#AF5AFF", c2: "#B62AFF" },
        { c1: "#25dd59", c2: "#29f463" },
        { c1: "#6E35FF", c2: "#6E67FF" },
        { c1: "#002AFF", c2: "#0048FF" },
        { c1: "#8CD282", c2: "#95F300" },
        { c1: "#3B0EFF", c2: "#604BFF" },
        { c1: "#00BE74", c2: "#04FDB8" },
        { c1: "#4a3ac6", c2: "#604BFF" }
      ]
    },
    width: {
      type: String,
      default: "100%"
    },
    height: {
      type: String,
      default: "600px"
    }
  },
  data() {
    return {
      chart: null,
      list: [],
      links: [],
      legend: [],
      categories: [],
      legendColor: []
    };
  },
  mounted() {
    this.initGraph();
    window.addEventListener("resize", this.resizeChart);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.resizeChart);
    if (this.chart) this.chart.dispose();
  },
  methods: {
    resizeChart() {
      if (this.chart) this.chart.resize();
    },
    initGraph() {
      // 初始化数据
      this.list = [];
      this.links = [];
      this.legend = [];

      const dataCopy = JSON.parse(JSON.stringify(this.listData));
      this.categories = dataCopy[0].list.map((item) => ({ name: item.name }));
      this.legendColor = this.colors.map((item) => item.c2);

      this.handleNodes(dataCopy);
      this.handleLinks(dataCopy);

      const option = {
        backgroundColor: "#000",
        toolbox: {
          show: true,
          left: "right",
          right: 20,
          top: "bottom",
          bottom: 20
        },
        color: this.legendColor,
        legend: {
          show: true,
          data: this.legend,
          textStyle: { color: "#fff", fontSize: 10 },
          icon: "circle",
          type: "scroll",
          orient: "vertical",
          left: "right",
          right: 20,
          top: 20,
          bottom: 80,
          pageIconColor: "#00f6ff",
          pageIconInactiveColor: "#fff",
          pageIconSize: 12,
          pageTextStyle: { color: "#fff", fontSize: 12 }
        },
        selectedMode: "false",
        bottom: 20,
        left: 0,
        right: 0,
        top: 0,
        animationDuration: 1500,
        animationEasingUpdate: "quinticInOut",
        series: [
          {
            name: "知识图谱",
            type: "graph",
            hoverAnimation: true,
            layout: "force",
            force: { repulsion: 300, edgeLength: 100 },
            nodeScaleRatio: 0.6,
            draggable: true,
            roam: true,
            symbol: "circle",
            data: this.list,
            links: this.links,
            categories: this.categories,
            focusNodeAdjacency: true,
            scaleLimit: { min: 0.5, max: 9 },
            edgeSymbol: ["circle", "arrow"],
            edgeSymbolSize: [4, 8],
            label: {
              normal: {
                show: true,
                position: "right",
                color: "#fff",
                distance: 5,
                fontSize: 10
              }
            },
            lineStyle: { normal: { width: 1.5, curveness: 0, type: "solid" } }
          }
        ]
      };

      this.chart = echarts.init(this.$refs.chartContainer);
      this.chart.setOption(option);
    },
    handleNodes(arr, level = 0, parentColor = null, parentCategory = null) {
      arr.forEach((item, index) => {
        if (!item.name) return;

        // 节点大小
        let symbolSize = level === 0 ? 70 : level === 1 ? 50 : 10;
        // label
        let label = level <= 1 ? { position: "inside", rotate: 0 } : null;
        // 颜色
        let color =
          level === 0
            ? this.colors[0]
            : level === 1
            ? this.colors[index % 10]
            : parentColor;
        // 边颜色
        let lineStyle = { color: color.c2 };
        // 节点渐变背景
        let bgcolor = {
          type: "radial",
          x: 0.5,
          y: 0.5,
          r: 0.5,
          colorStops:
            level === 0
              ? [
                  { offset: 0, color: color.c1 },
                  { offset: 0.8, color: color.c1 },
                  { offset: 1, color: "rgba(0, 0, 0, 0.3)" }
                ]
              : [
                  { offset: 0, color: color.c1 },
                  { offset: 0.4, color: color.c1 },
                  { offset: 1, color: color.c2 }
                ],
          global: false
        };
        let itemStyle =
          item.list && item.list.length
            ? { borderColor: color.c2, color: bgcolor }
            : { color: "transparent", borderColor: color.c2 };
        Object.assign(itemStyle, {
          shadowColor: "rgba(255, 255, 255, 0.5)",
          shadowBlur: 10
        });

        // 分类名
        let category = level === 1 ? item.name : parentCategory;
        if (level === 1) this.legend.push(item.name);

        let obj = Object.assign(item, {
          name: item.name,
          symbolSize,
          category,
          label,
          color: bgcolor,
          itemStyle,
          lineStyle,
          root: level === 0,
          isEnd: !item.list || !item.list.length
        });

        this.list.push(obj);

        if (item.list && item.list.length)
          this.handleNodes(item.list, level + 1, color, category);
      });
    },
    handleLinks(arr, parentName = null) {
      arr.forEach((item) => {
        if (parentName) {
          this.links.push({
            source: parentName,
            target: item.name
          });
        }
        if (item.list && item.list.length) {
          this.handleLinks(item.list, item.name); // 递归时把自己当父节点传下去
        }
      });
    }
  }
};
</script>

<style scoped>
.graph-chart {
  width: 100%;
  height: 100%;
}
</style>
