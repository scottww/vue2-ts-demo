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
  created() {},
  computed: {},
  mounted() {
    this.init();
  },
  methods: {
    async init() {
      await this.$nextTick();
      this.dataList.forEach((item, index) => {
        const current = `chart${index + 1}`;
        let myChart = echarts.init(this.$refs[current][0]);
        myChart.setOption(item.option);
      });
    }
  },
  watch: {}
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
