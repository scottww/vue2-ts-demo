<template>
  <div class="page-layout">
    <div class="left-panel">
      <component
        v-for="(mod, idx) in leftPanelList"
        :key="'left-' + mod.type + idx"
        :is="getComponent(mod.type)"
        :title="mod.title"
        class="panel"
        :style="{ height: mod.height + 'px' }"
      />
    </div>
    <div class="right-panel">
      <component
        v-for="(mod, idx) in rightPanelList"
        :key="'right-' + mod.type + idx"
        :is="getComponent(mod.type)"
        :title="mod.title"
        class="panel"
        :style="{ height: mod.height + 'px' }"
      />
    </div>
  </div>
</template>

<script>
import PanelA from "../../components/PanelA.vue";
import PanelB from "../../components/PanelB.vue";
import PanelC from "../../components/PanelC.vue";

export default {
  data() {
    return {
      panels: [
        // { col: 'left', type: 'a', title: '天气情况', height: 431.1 },
        // { col: 'left', type: 'b', title: '摄像监控', height: 483 },
        // { col: 'right', type: 'c', title: '告警信息', height: 434 },
        // { col: 'right', type: 'a', title: '任务信息', height: 483 }
        // { col: "left", type: "a", title: "设备运行", height: 940 },
        // { col: "right", type: "b", title: "任务信息", height: 431 },
        // { col: "right", type: "c", title: "告警信息", height: 483 }

        { col: "left", type: "a", title: "天气情况1", height: 431.1 },
        { col: "left", type: "b", title: "摄像监控1", height: 483 },
        { col: "right", type: "c", title: "告警信息1", height: 434 },
        { col: "right", type: "a", title: "任务信息1", height: 483 }
      ]
    };
  },
  computed: {
    leftPanelList() {
      return this.panels.filter((p) => p.col === "left");
    },
    rightPanelList() {
      return this.panels.filter((p) => p.col === "right");
    }
  },
  methods: {
    getComponent(type) {
      const map = {
        a: "PanelA",
        b: "PanelB",
        c: "PanelC"
      };
      return map[type] || "PanelA";
    }
  },
  components: {
    PanelA,
    PanelB,
    PanelC
  }
};
</script>

<style scoped>
.page-layout {
  position: absolute;
  top: 120px;
  left: 0;
  width: 100%;
  height: calc(100% - 120px);
  display: flex;
  justify-content: space-between;
  padding: 0 40px;
  z-index: 2;
}

.left-panel,
.right-panel {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 651px; /* 精确控制左右宽度 */
}

.panel {
  background: rgba(50, 50, 50, 0.8);
  border-radius: 8px;
  padding: 16px;
  color: #fff;
  flex-shrink: 0;
  box-sizing: border-box;
  overflow: hidden;
}
</style>
