<template>
  <div class="demo__container">
    <div class="pie-chart" :class="{ collapsed: collapsed }" v-if="visible">
      <PieChart3 width="600px" height="400px" />
    </div>
    <button @click="toggleWidth">隐藏/显示图表</button>
  </div>
</template>

<script>
import PieChart3 from "./PieChart3.vue";

export default {
  name: "PieChart3Demo",
  components: { PieChart3 },
  data() {
    return {
      visible: true,
      collapsed: false
    };
  },
  methods: {
    toggleButton() {
      this.visible = !this.visible;
    },
    toggleWidth() {
      this.collapsed = !this.collapsed;
      if (this.collapsed) {
        this.visible = false;
      } else {
        this.visible = true;
      }
    }
  }
};
</script>

<style scoped>
.demo__container {
  padding: 20px;
  background: #061326;
  /* min-height: 100vh; */
}

/* 正常状态 */
.pie-chart {
  width: 600px;
  height: 400px;
  transition: width 0.3s;
}

/* 模拟 width = 0 的极端场景 */
.pie-chart.collapsed {
  width: 0;
  overflow: hidden;
}
</style>
