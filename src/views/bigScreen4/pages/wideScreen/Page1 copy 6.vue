<template>
  <div class="page-layout">
    <!-- Left -->
    <div class="left-panel">
      <template v-for="(group, groupIdx) in groupedLeftPanels">
        <div
          :key="'left-group-' + groupIdx"
          class="panel-group"
          :class="getGroupClass(group)"
        >
          <component
            v-for="(mod, idx) in group"
            :key="'left-' + mod.type + idx"
            :is="getComponent(mod.type)"
            :title="mod.title"
            class="panel"
            :style="getPanelStyle(mod)"
          />
        </div>
      </template>
    </div>

    <!-- Right -->
    <div class="right-panel">
      <template v-for="(group, groupIdx) in groupedRightPanels">
        <div
          :key="'right-group-' + groupIdx"
          class="panel-group"
          :class="getGroupClass(group)"
        >
          <component
            v-for="(mod, idx) in group"
            :key="'right-' + mod.type + idx"
            :is="getComponent(mod.type)"
            :title="mod.title"
            class="panel"
            :style="getPanelStyle(mod)"
          />
        </div>
      </template>
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
        // 左边配置
        {
          col: "left",
          type: "a",
          title: "天气情况1",
          height: 431.1,
          group: 1,
          layout: "row"
        },
        {
          col: "left",
          type: "b",
          title: "摄像监控1",
          height: 431.1,
          group: 1,
          layout: "row"
        },
        {
          col: "left",
          type: "c",
          title: "统计分析1",
          height: 940,
          group: 2,
          layout: "column"
        },

        // 右边配置
        {
          col: "right",
          type: "c",
          title: "告警信息1",
          height: 434,
          group: 1,
          layout: "column"
        },
        {
          col: "right",
          type: "a",
          title: "任务信息1",
          height: 483,
          group: 2,
          layout: "column"
        }
      ]
    };
  },
  computed: {
    groupedLeftPanels() {
      return this.groupPanels("left");
    },
    groupedRightPanels() {
      return this.groupPanels("right");
    }
  },
  methods: {
    groupPanels(col) {
      const grouped = {};
      this.panels
        .filter((p) => p.col === col)
        .forEach((p) => {
          if (!grouped[p.group]) grouped[p.group] = [];
          grouped[p.group].push(p);
        });
      return Object.values(grouped);
    },
    getGroupClass(group) {
      const layout = group[0]?.layout || "column";
      return {
        row: layout === "row",
        column: layout === "column"
      };
    },
    getComponent(type) {
      const map = {
        a: "PanelA",
        b: "PanelB",
        c: "PanelC"
      };
      return map[type] || "PanelA";
    },
    getPanelStyle(mod) {
      return {
        height: mod.height + "px",
        width: mod.layout === "row" ? "50%" : "100%"
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
  width: 651px;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* 面板通用样式 */
.panel {
  background: rgba(50, 50, 50, 0.8);
  border-radius: 8px;
  padding: 16px;
  box-sizing: border-box;
  color: #fff;
}

/* 行排列的面板组（左右两个面板） */
.panel-group.row {
  display: flex;
  gap: 16px;
}

/* 列排列的面板组（上下排列） */
.panel-group.column {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
