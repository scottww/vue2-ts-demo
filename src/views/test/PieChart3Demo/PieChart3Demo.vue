<template>
  <div class="demo__container">
    <div class="pie-chart">
      <PieChart3 width="600px" height="400px" />
    </div>
  </div>
</template>

<script>
import PieChart3 from "./PieChart3.vue";

export default {
  name: "PieChart3Demo",
  components: { PieChart3 },
  data() {
    return {};
  },
  methods: {}
};
</script>

<style scoped>
.demo__container {
  padding: 20px;
  background: #061326;
  min-height: 100vh;
}

.pie-chart {
  width: 600px;
  height: 400px;
}
</style>
