<template>
  <div class="chart-wrapper">
    <!-- <div class="chart" ref="list">
      <div
        v-for="(item, index) in dataList"
        :key="index"
        style="width: 100%; height: 300px"
      ></div>
    </div> -->
    <div class="chart" v-for="(item, index) in dataList" :key="index">
      <h-card :title="item.name">
        <template #content>
          <div
            :ref="`chart${index + 1}`"
            style="width: 100%; height: 300px"
          ></div>
        </template>
      </h-card>
    </div>
  </div>
</template>

<script>
import HCard from "@/components/HCard";
import * as echarts from "echarts/dist/echarts.esm";
import { CHART_LIST } from "./data";
export default {
  name: "Chart",
  components: { HCard },
  props: {},
  data() {
    return {
      dataList: CHART_LIST
    };
  },
  mounted() {
    this.init();
    window.addEventListener("resize", this.handleResize);
  },
  methods: {
    init() {
      //refactor
      this.$nextTick(() => {
        this.dataList.forEach((item, index) => {
          const current = `chart${index + 1}`;
          let myChart = echarts.init(this.$refs[current][0]);
          myChart.setOption(item.option);
          // myChart.resize();
        });
      });
    },
    handleResize() {
      // 调用每个图表的 resize 方法
      this.dataList.forEach((item, index) => {
        const current = `chart${index + 1}`;
        let myChart = echarts.getInstanceByDom(this.$refs[current][0]);
        if (!myChart) {
          echarts.init(this.$refs.chart);
        }
        myChart.resize();
      });
    }
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.handleResize);
  }
};
</script>
<style lang="scss" scoped>
.chart-wrapper {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;
  .chart {
    margin-bottom: 10px;
    width: calc(50% - 10px);
  }
  .chart:nth-child(2n + 1) {
    margin-right: 10px;
  }
}
</style>
