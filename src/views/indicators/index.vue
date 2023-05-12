<template>
  <div class="indicators-demo">
    <h-indicators />
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
