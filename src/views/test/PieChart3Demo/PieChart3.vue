<template>
  <!-- 饼图容器 -->
  <div ref="pieChart" class="pie-chart-container" />
</template>

<script>
import * as echarts from "echarts";

export default {
  name: "PieChart",
  data() {
    return {
      pieChartInstance: null, // ECharts实例
      pieTimer: null,         // 旋转动画定时器
      angle: 0,               // 当前旋转角度，用于外圈动画
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.initPie(); // 初始化饼图
    });
  },
  beforeDestroy() {
    this.stopAnimation(); // 销毁前停止动画
    if (this.pieChartInstance) {
      this.pieChartInstance.dispose(); // 销毁实例
      this.pieChartInstance = null;
    }
  },
  methods: {
    // 根据圆心(x0,y0)、半径r和角度angle计算圆上点坐标
    getCirlPoint(x0, y0, r, angle) {
      let x1 = x0 + r * Math.cos((angle * Math.PI) / 180);
      let y1 = y0 + r * Math.sin((angle * Math.PI) / 180);
      return { x: x1, y: y1 };
    },

    // 饼图数据
    getTrafficWay() {
      return [
        { name: "水稻", value: 852310 },
        { name: "茶园", value: 852310 },
        { name: "果园", value: 852310 },
        { name: "苗木", value: 852310 },
        { name: "其他", value: 18523 },
      ];
    },

    // 饼图颜色
    getColor() {
      return ["#41D3FE", "#178FFF", "#04D449", "#C17A03", "#FDC501"];
    },

    // 外圈饼图数据（带间隔透明片段）
    generatePieData(trafficWay, color) {
      let data = [];
      const totalValue = trafficWay.reduce((sum, item) => sum + item.value, 0);
      const separatorValue = Math.max(Math.floor(totalValue * 0.05), 50); // 透明间隔
      for (let i = 0; i < trafficWay.length; i++) {
        data.push(
          {
            value: trafficWay[i].value, // 数据值
            name: trafficWay[i].name,   // 数据名称
            itemStyle: {                // 外圈样式
              borderWidth: 8,
              shadowBlur: 20,
              borderRadius: 20,
              borderColor: color[i],
              shadowColor: color[i],
            },
          },
          {
            value: separatorValue, // 透明间隔
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

    // 内圈饼图数据（半透明装饰）
    generatePieData2(trafficWay) {
      let data2 = [];
      const totalValue = trafficWay.reduce((sum, item) => sum + item.value, 0);
      const separatorValue = Math.max(Math.floor(totalValue * 0.05), 50); // 透明间隔
      for (let i = 0; i < trafficWay.length; i++) {
        data2.push(
          { value: trafficWay[i].value, name: trafficWay[i].name },
          {
            value: separatorValue,
            name: "",
            itemStyle: {
              label: { show: false },
              labelLine: { show: false },
              color: "rgba(0, 0, 0, 0)",
              borderColor: "rgba(0, 0, 0, 0)",
              borderWidth: 0,
              opacity: 0.2, // 半透明
            },
          }
        );
      }
      return data2;
    },

    // 自定义环形/点位系列配置（外圈动画和圆上点）
    getSeriesOption() {
      const angle = this.angle;
      const getCirlPoint = this.getCirlPoint;

      return [
        // 外圈弧线1
        {
          name: "ring5",
          type: "custom",
          coordinateSystem: "none",
          renderItem: function (params, api) {
            return {
              type: "arc",
              shape: {
                cx: api.getWidth() / 3, // 圆心X
                cy: api.getHeight() / 2, // 圆心Y
                r: (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.6, // 半径
                startAngle: ((0 + angle) * Math.PI) / 180,
                endAngle: ((90 + angle) * Math.PI) / 180,
              },
              style: { stroke: "#4EE9E6", fill: "transparent", lineWidth: 1.5 },
              silent: true,
            };
          },
          data: [0],
        },
        // 外圈弧线2
        {
          name: "ring5",
          type: "custom",
          coordinateSystem: "none",
          renderItem: function (params, api) {
            return {
              type: "arc",
              shape: {
                cx: api.getWidth() / 3,
                cy: api.getHeight() / 2,
                r: (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.6,
                startAngle: ((180 + angle) * Math.PI) / 180,
                endAngle: ((270 + angle) * Math.PI) / 180,
              },
              style: { stroke: "#4EE9E6", fill: "transparent", lineWidth: 1.5 },
              silent: true,
            };
          },
          data: [0],
        },
        // 外圈弧线3
        {
          name: "ring5",
          type: "custom",
          coordinateSystem: "none",
          renderItem: function (params, api) {
            return {
              type: "arc",
              shape: {
                cx: api.getWidth() / 3,
                cy: api.getHeight() / 2,
                r: (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.65,
                startAngle: ((270 + -angle) * Math.PI) / 180,
                endAngle: ((40 + -angle) * Math.PI) / 180,
              },
              style: { stroke: "#4EE9E6", fill: "transparent", lineWidth: 1.5 },
              silent: true,
            };
          },
          data: [0],
        },
        // 外圈弧线4
        {
          name: "ring5",
          type: "custom",
          coordinateSystem: "none",
          renderItem: function (params, api) {
            return {
              type: "arc",
              shape: {
                cx: api.getWidth() / 3,
                cy: api.getHeight() / 2,
                r: (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.65,
                startAngle: ((90 + -angle) * Math.PI) / 180,
                endAngle: ((220 + -angle) * Math.PI) / 180,
              },
              style: { stroke: "#4EE9E6", fill: "transparent", lineWidth: 1.5 },
              silent: true,
            };
          },
          data: [0],
        },
        // 动态点位1（外圈圆上）
        {
          name: "ring5",
          type: "custom",
          coordinateSystem: "none",
          renderItem: function (params, api) {
            let x0 = api.getWidth() / 3;
            let y0 = api.getHeight() / 2;
            let r = (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.65;
            let point = getCirlPoint(x0, y0, r, 90 + -angle);
            return {
              type: "circle",
              shape: { cx: point.x, cy: point.y, r: 4 },
              style: { stroke: "#66FFFF", fill: "#66FFFF" },
              silent: true,
            };
          },
          data: [0],
        },
        // 动态点位2（外圈圆上）
        {
          name: "ring5",
          type: "custom",
          coordinateSystem: "none",
          renderItem: function (params, api) {
            let x0 = api.getWidth() / 3;
            let y0 = api.getHeight() / 2;
            let r = (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.65;
            let point = getCirlPoint(x0, y0, r, 270 + -angle);
            return {
              type: "circle",
              shape: { cx: point.x, cy: point.y, r: 4 },
              style: { stroke: "#66FFFF", fill: "#66FFFF" },
              silent: true,
            };
          },
          data: [0],
        },
        // 动态点位3（内圈圆上）
        {
          name: "ring5",
          type: "custom",
          coordinateSystem: "none",
          renderItem: function (params, api) {
            let x0 = api.getWidth() / 3;
            let y0 = api.getHeight() / 2;
            let r = (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.6;
            let point = getCirlPoint(x0, y0, r, 90 + angle);
            return {
              type: "circle",
              shape: { cx: point.x, cy: point.y, r: 4 },
              style: { stroke: "#66FFFF", fill: "#66FFFF" },
              silent: true,
            };
          },
          data: [0],
        },
        // 动态点位4（内圈圆上）
        {
          name: "ring5",
          type: "custom",
          coordinateSystem: "none",
          renderItem: function (params, api) {
            let x0 = api.getWidth() / 3;
            let y0 = api.getHeight() / 2;
            let r = (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.6;
            let point = getCirlPoint(x0, y0, r, 270 + angle);
            return {
              type: "circle",
              shape: { cx: point.x, cy: point.y, r: 4 },
              style: { stroke: "#66FFFF", fill: "#66FFFF" },
              silent: true,
            };
          },
          data: [0],
        },
      ];
    },

    // 初始化饼图
    initPie() {
      const el = this.$refs.pieChart;
      if (!el) return;

      if (this.pieChartInstance) {
        this.pieChartInstance.dispose();
      }

      this.pieChartInstance = echarts.init(el);

      const trafficWay = this.getTrafficWay();
      const color = this.getColor();
      const data = this.generatePieData(trafficWay, color); // 外圈饼图数据
      const data2 = this.generatePieData2(trafficWay);      // 内圈装饰数据

      const option = {
        color: color,
        animation: false,
        grid: { top: "3%", left: "6%", right: "6%", bottom: "3%", containLabel: true },
        legend: { 
          right: "10%", top: "center", icon: "rect", type: "scroll", orient: "vertical", 
          itemWidth: 15, itemHeight: 15, pageIconColor: "rgba(250,252,253,1)", 
          pageIconInactiveColor: "rgba(216,213,213,1)", pageIconSize: [16,16],
          pageTextStyle:{color:"rgba(248,247,247,1)"}, textStyle:{fontSize:13,color:"#ffffff"},
          data: ["水稻","茶园","果园","苗木","其他"],
          formatter(name){
            if(name!=""){
              const newData=trafficWay;
              let tarValue=0,total=0;
              for(let i=0;i<newData.length;i++){
                total+=newData[i].value;
                if(newData[i].name===name) tarValue=newData[i].value;
              }
              return "\u00A0"+name+` \u00A0${tarValue} (亩)`;
            }
          }
        },
        series: [
          ...this.getSeriesOption(), // 外圈弧线和点位
          {
            type: "pie", clockWise:false, radius:["98%","95%"], hoverAnimation:false, center:["33.33%","50%"], top:"center",
            itemStyle:{normal:{label:{show:false}}}, data:data // 外圈饼图
          },
          {
            type:"pie", top:"center", startAngle:90, clockwise:false, center:["33.33%","50%"], legendHoverLink:false,
            hoverAnimation:false, radius:["94%","55%"], itemStyle:{opacity:0.15}, label:{show:false}, labelLine:{show:false}, data:data2 // 内圈半透明装饰
          },
          {
            type:"pie", clockWise:false, center:["33.33%","50%"], radius:["39%","38%"], hoverAnimation:false,
            top:"center", itemStyle:{normal:{label:{show:false}}}, data:data // 内圈小饼图
          },
        ],
      };

      this.pieChartInstance.setOption(option);
      this.startAnimation(); // 开启外圈旋转动画
    },

    // 外圈旋转动画
    draw() {
      this.angle = (this.angle + 1) % 360;
      if (this.pieChartInstance) {
        this.pieChartInstance.setOption({ series: this.getSeriesOption() }, { notMerge:false, lazyUpdate:true });
      }
    },

    // 启动动画
    startAnimation() {
      this.stopAnimation();
      this.pieTimer = setInterval(this.draw, 100);
    },

    // 停止动画
    stopAnimation() {
      if (this.pieTimer) {
        clearInterval(this.pieTimer);
        this.pieTimer = null;
      }
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
