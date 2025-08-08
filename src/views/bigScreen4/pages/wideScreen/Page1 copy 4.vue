<template>
  <div class="page-layout">
    <!-- Left -->
    <div class="left-panel" :class="{ grid: layoutModes.left === 'grid' }">
      <component
        v-for="(mod, idx) in leftPanelList"
        :key="'left-' + mod.type + idx"
        :is="getComponent(mod.type)"
        :title="mod.title"
        class="panel"
        :style="getPanelStyle(mod)"
      />
    </div>

    <!-- Right -->
    <div class="right-panel" :class="{ grid: layoutModes.right === 'grid' }">
      <component
        v-for="(mod, idx) in rightPanelList"
        :key="'right-' + mod.type + idx"
        :is="getComponent(mod.type)"
        :title="mod.title"
        class="panel"
        :style="getPanelStyle(mod)"
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
      layoutModes: {
        left: "grid", // or 'grid'
        right: "column" // or 'grid'
      },
      panels: [
        // 👇 左边是 grid 布局（4块）
        { col: "left", type: "a", title: "天气情况1", height: 431.1 },
        { col: "left", type: "b", title: "摄像监控1", height: 483 },
        { col: "left", type: "c", title: "统计分析1", height: 940 },
        // { col: 'left', type: 'a', title: '设备状态1', height: 483 },

        // 👇 右边是 column 布局（2块）
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
    },
    getPanelStyle0(mod) {
      // 如果当前布局是 grid，则按 50% 高宽分布
      const isGrid = this.layoutModes[mod.col] === "grid";
      if (isGrid) {
        return {
          height: "50%",
          width: "50%"
        };
      }
      // 默认 column
      return {
        height: mod.height + "px",
        width: "100%"
      };
    },
    getPanelStyle(mod) {
      const isGrid = this.layoutModes[mod.col] === "grid";
      if (isGrid) return {}; // ✅ grid 用 CSS 控制，不用内联
      return {
        height: mod.height + "px",
        width: "100%"
      };
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
  width: 651px;
  height: 100%;
  position: relative;
}

/* 通用面板样式 */
.panel {
  background: rgba(50, 50, 50, 0.8);
  border-radius: 8px;
  padding: 16px;
  color: #fff;
  box-sizing: border-box;
  overflow: hidden;
}

/* grid 模式支持 2×2 网格 */
.left-panel.grid,
.right-panel.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 16px; /* ✅✅ 加上间距 */
  padding: 8px; /* ✅✅ 四周留白 */
}

.left-panel.grid .panel,
.right-panel.grid .panel {
  width: 100%;
  height: 100%;
  padding: 16px;
}
</style>
