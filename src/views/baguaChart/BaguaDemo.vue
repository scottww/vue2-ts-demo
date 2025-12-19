<template>
  <div class="bagua-demo">
    <div class="section">
      <BaguaDiagram0 />
    </div>
    <div class="section">
      <BaguaDiagram />
    </div>
  </div>
</template>

<script>
import BaguaDiagram0 from "./BaguaDiagram0.vue";
import BaguaDiagram from "./BaguaDiagram.vue";

export default {
  components: { BaguaDiagram0, BaguaDiagram },
  methods: {}
};
</script>

<style lang="scss" scoped>
.bagua-demo {
  margin: 20px;
  background-color: #ccc;
  display: flex;
}

.section {
  flex: 1
}
</style>
