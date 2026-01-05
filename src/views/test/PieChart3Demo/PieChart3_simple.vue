<template>
  <div ref="pieChart" class="pie-chart-container" />
</template>

<script>
import * as echarts from "echarts";

export default {
  name: "PieChart",
  data() {
    return {
      pieChartInstance: null,
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.initPie();
    });
  },
  beforeDestroy() {
    if (this.pieChartInstance) {
      this.pieChartInstance.dispose();
      this.pieChartInstance = null;
    }
  },
  methods: {
    getTrafficWay() {
      return [
        { name: "水稻", value: 852310 },
        { name: "茶园", value: 852310 },
        { name: "果园", value: 852310 },
        { name: "苗木", value: 852310 },
        { name: "其他", value: 852310 },
      ];
    },

    getColor() {
      return [
        "#2A8BFD",
        "#00FAC1",
        "#FDE056",
        "#FD9D56",
        "#FD3A3A",
        "#FF8A26",
        "#FF5252",
        "#9689FF",
        "#CB00FF",
      ];
    },

    generatePieData(trafficWay, color) {
      let data = [];
      for (let i = 0; i < trafficWay.length; i++) {
        data.push(
          {
            value: trafficWay[i].value,
            name: trafficWay[i].name,
            itemStyle: {
              borderWidth: 8,
              shadowBlur: 20,
              borderRadius: 20,
              borderColor: color[i],
              shadowColor: color[i],
            },
          },
          {
            value: 1,
            name: "",
            itemStyle: {
              label: { show: false },
              labelLine: { show: false },
              color: "rgba(0, 0, 0, 0)",
              borderColor: "rgba(0, 0, 0, 0)",
              borderWidth: 0,
            },
          }
        );
      }
      return data;
    },

    generatePieData2(trafficWay) {
      let data2 = [];
      for (let i = 0; i < trafficWay.length; i++) {
        data2.push(
          {
            value: trafficWay[i].value,
            name: trafficWay[i].name,
          },
          {
            value: 1,
            name: "",
            itemStyle: {
              label: { show: false },
              labelLine: { show: false },
              color: "rgba(0, 0, 0, 0)",
              borderColor: "rgba(0, 0, 0, 0)",
              borderWidth: 0,
              opacity: 0.2,
            },
          }
        );
      }
      return data2;
    },

    initPie() {
      const el = this.$refs.pieChart;
      if (!el) return;

      this.pieChartInstance = echarts.init(el);

      const trafficWay = this.getTrafficWay();
      const color = this.getColor();
      const data = this.generatePieData(trafficWay, color);
      const data2 = this.generatePieData2(trafficWay);

      const option = {
        color: color,
        animation: true,
        animationDuration: 1000,
        animationEasing: "cubicOut",
        animationDurationUpdate: 200,
        animationEasingUpdate: "linear",
        grid: {
          top: "3%",
          left: "6%",
          right: "6%",
          bottom: "3%",
          containLabel: true,
        },
        legend: {
          right: "10%",
          top: "center",
          icon: "rect",
          type: "scroll",
          orient: "vertical",
          itemWidth: 15,
          itemHeight: 15,
          pageIconColor: "rgba(250, 252, 253, 1)",
          pageIconInactiveColor: "rgba(216, 213, 213, 1)",
          pageIconSize: [16, 16],
          pageTextStyle: {
            color: "rgba(248, 247, 247, 1)",
          },
          textStyle: {
            fontSize: 13,
            color: "#ffffff",
          },
          data: ["水稻", "茶园", "果园", "苗木", "其他"],
          formatter(name) {
            if (name != "") {
              const newData = trafficWay;
              let tarValue = 0;
              let total = 0;
              for (let i = 0; i < newData.length; i++) {
                total += newData[i].value;
                if (newData[i].name === name) {
                  tarValue = newData[i].value;
                }
              }
              var percert =
                total == 0 ? 0 : ((tarValue / total) * 100).toFixed(2);
              return "\u00A0" + name + `\u00A0${tarValue} (亩)`;
            } else {
              return;
            }
          },
        },
        series: [
          {
            name: "",
            type: "pie",
            clockWise: false,
            radius: ["98%", "95%"],
            hoverAnimation: false,
            center: ["33.33%", "50%"],
            top: "center",
            itemStyle: {
              normal: {
                label: {
                  show: false,
                },
              },
            },
            data: data,
          },
          {
            type: "pie",
            top: "center",
            startAngle: 90,
            clockwise: false,
            center: ["33.33%", "50%"],
            legendHoverLink: false,
            hoverAnimation: false,
            radius: ["94%", "55%"],
            itemStyle: {
              opacity: 0.15,
            },
            label: {
              show: false,
              position: "center",
            },
            labelLine: {
              show: false,
            },
            data: data2,
          },
          {
            name: "",
            type: "pie",
            clockWise: false,
            center: ["33.33%", "50%"],
            radius: ["39%", "38%"],
            hoverAnimation: false,
            top: "center",
            itemStyle: {
              normal: {
                label: {
                  show: false,
                },
              },
            },
            data: data,
          },
        ],
      };

      this.pieChartInstance.setOption(option);
    },
  },
};
</script>

<style lang="scss" scoped>
.pie-chart-container {
  width: 100%;
  height: 100%;
}
</style>
