<template>
  <div class="baguaChart-demo">
    <BaguaChart @clickBagua="handleClick" />
  </div>
</template>

<script>
import BaguaChart from './BaguaChart.vue';

export default {
  components: { BaguaChart },
  methods: {
    handleClick(name) {
      this.$message?.info?.(`你点击了：${name} 卦`) || alert(`你点击了：${name} 卦`);
    }
  }
};
</script>

<style lang="scss" scoped>
.baguaChart-demo {
  margin: 10px;
  background-color: #ccc;
}
</style>
