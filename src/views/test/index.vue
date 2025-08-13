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
      <el-radio-button label="test4">测试4</el-radio-button>
    </el-radio-group>
    <div class="main">
      <component :is="tab"></component>
    </div>
  </div>
</template>

<script>
import RiskHazardComponentVue from "./RiskHazardComponent.vue";
import Risk2 from "./Risk2.vue";
import Risk3 from "./Risk3.vue";
export default {
  components: { RiskHazardComponentVue, Risk2, Risk3 },
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

<style>
</style>