<template>
  <div class="test-demo">
    <el-radio-group
      v-model="tab"
      @tab-click="tabClick"
      style="margin-bottom: 30px"
    >
      <el-radio-button label="RiskHazardComponentVue">测试1</el-radio-button>
      <el-radio-button label="Risk2">测试2</el-radio-button>
      <el-radio-button label="Risk3">测试3</el-radio-button>
      <el-radio-button label="GateRealTime">测试4</el-radio-button>
      <el-radio-button label="GateRealTime2">测试5</el-radio-button>
      <el-radio-button label="EquipmentDetail">测试6</el-radio-button>
    </el-radio-group>
    <div class="main-content">
      <component :is="tab"></component>
    </div>
  </div>
</template>

<script>
import RiskHazardComponentVue from "./RiskHazardComponent.vue";
import Risk2 from "./Risk2.vue";
import Risk3 from "./Risk3.vue";
import GateRealTime from "./GateRealTime.vue";
import GateRealTime2 from "./GateRealTime2.vue";
import EquipmentDetail from './EquipmentDetail.vue'
export default {
  components: {
    RiskHazardComponentVue,
    Risk2,
    Risk3,
    GateRealTime,
    GateRealTime2,
    EquipmentDetail
  },
  data() {
    return {
      tab: "RiskHazardComponentVue"
    };
  },
  methods: {
    tabClick(tab) {
      console.log(tab);
    }
  }
};
</script>

<style scoped>
.main-content {
  position: absolute;
  width: 670px;
  /* height: 940px; */
  background-color: #0a1e3c;
  background-image: radial-gradient(circle at center, #143a7c, #0a1e3c);
}
</style>