<template>
  <div class="page-layout">
    <!-- Left Panel -->
    <div
      class="panel-container"
      :class="['left-panel', layoutModes.left]"
      :style="getContainerStyle(leftPanelList, layoutModes.left)"
    >
      <component
        v-for="(mod, idx) in leftPanelList"
        :key="'left-' + mod.type + idx"
        :is="getComponent(mod.type)"
        :title="mod.title"
        class="panel"
        :style="getPanelStyle(mod, layoutModes.left)"
      />
    </div>

    <!-- Right Panel -->
    <div
      class="panel-container"
      :class="['right-panel', layoutModes.right]"
      :style="getContainerStyle(rightPanelList, layoutModes.right)"
    >
      <component
        v-for="(mod, idx) in rightPanelList"
        :key="'right-' + mod.type + idx"
        :is="getComponent(mod.type)"
        :title="mod.title"
        class="panel"
        :style="getPanelStyle(mod, layoutModes.right)"
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
        left: "flex", // or 'grid'
        right: "flex"
      },
      panels: [
        // 👇 左边上下2块
        { col: "left", type: "a", title: "天气情况1", height: 431.1 },
        { col: "left", type: "b", title: "摄像监控1", height: 483 },
        { col: "left", type: "c", title: "统计分析1", height: 940 },
        // { col: 'left', type: 'a', title: '设备状态1', height: 483 },

        // 👇 右边一整块
        { col: "right", type: "c", title: "统计分析1", height: 940 }
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
      const map = { a: "PanelA", b: "PanelB", c: "PanelC" };
      return map[type] || "PanelA";
    },
    getPanelStyle(mod, layout) {
      if (layout === "grid") return {};
      return {
        height: mod.height + "px",
        width: "100%"
      };
    },
    getContainerStyle(panelList, layout) {
      if (layout === "grid") {
        const count = panelList.length;
        if (count === 4) {
          return {
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gridTemplateRows: "1fr 1fr",
            gap: "16px",
            padding: "8px"
          };
        } else if (count === 2) {
          return {
            display: "grid",
            gridTemplateColumns: "1fr",
            gridTemplateRows: "1fr 1fr",
            gap: "16px",
            padding: "8px"
          };
        } else if (count === 3) {
          return {
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gridTemplateRows: "1fr 1fr",
            gap: "16px",
            padding: "8px"
          };
        }
      }
      // fallback to flex column
      return {
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        padding: "8px"
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
  box-sizing: border-box;
}

.panel-container {
  width: 651px;
  height: 100%;
  box-sizing: border-box;
}

/* 面板通用样式 */
.panel {
  background: rgba(50, 50, 50, 0.8);
  border-radius: 8px;
  padding: 16px;
  color: #fff;
  box-sizing: border-box;
  overflow: hidden;
}
</style>
