<template>
  <div class="SplitPanelDemo" style="padding: 10px">
    <ControlButtonsPanel0 @action="buttonAction" />
    <ControlButtonPanel1 @button-click="buttonClick" />
  </div>
</template>

<script>
import ControlButtonsPanel0 from "./ControlButtonsPanel0.vue";
import ControlButtonPanel1 from "./ControlButtonPanel.vue";

export default {
  components: { ControlButtonsPanel0, ControlButtonPanel1 },
  data() {
    return {};
  },
  methods: {
    buttonAction(btn) {
      console.log("---- 触发 buttonAction ---- ", btn);
    },
    buttonClick(btn) {
      console.log("---- 触发 buttonClick ---- ", btn);
    }
  }
};
</script>

<style>
.SplitPanelDemo {
  display: flex;
  gap: 20px;
}
</style>
