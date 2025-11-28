<template>
  <div class="PanelDemo__container">
    <div class="layout-1x1">
      <div class="row">
        <CommonPanel title="面板标题" class="half">
          <LevelFlowChart />
        </CommonPanel>
      </div>
      <div class="row">
        <CommonPanel title="面板标题" class="half">
          <LevelFlowChart2 />
        </CommonPanel>
      </div>
    </div>
  </div>
</template>

<script>
import CommonPanel from "./Panel.vue";
import LevelFlowChart from "./LevelFlowChart.vue";
import LevelFlowChart2 from "./LevelFlowChart2.vue";
export default {
  components: {
    CommonPanel,
    LevelFlowChart,
    LevelFlowChart2
  }
};
</script>

<style scoped>
.PanelDemo__container {
  width: 100%;
  height: 100%;
  display: flex;
}

.layout-1x1 {
  width: 100%;
  height: 100%;
  display: flex;
  gap: 16px;
}

.row {
  display: flex;
  gap: 16px;
  width: 100%;
  height: 100%;
  /* 让每行平分父容器高度（如果父容器是 100% 高的话）*/
  /* height: 50%; */
  box-sizing: border-box;
}

.half {
  flex: 1;
  min-height: 0; /* 避免内容撑开父容器 */
}

.vertical-1x1 {
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>