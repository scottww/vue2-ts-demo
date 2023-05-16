<template>
  <div class="indicators-demo">
    <h-indicators :data="[1, 2, 3]" delay="1000" height="3" />
  </div>
</template>

<script>
import { HIndicators } from "@/components/h-ui";

export default {
  name: "IndicatorsDemo",
  components: {
    HIndicators
  },
  data() {
    return {};
  }
};
</script>

<style scoped>
.indicators-demo {
  width: 100%;
  height: 100%;
}
.indicators-demo:after {
  content: "";
  display: table;
}

</style>
