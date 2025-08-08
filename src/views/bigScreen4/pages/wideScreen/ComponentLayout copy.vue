<template>
  <div class="layout-wrapper">
    <!-- 组合布局逻辑 -->
    <template v-if="layout === '2small-1big'">
      <div class="row">
        <component
          v-for="(mod, idx) in panels.slice(0, 2)"
          :key="mod.type + idx"
          :is="getComponent1(mod.type)"
          class="panel half"
          :title="mod.title"
        />
      </div>
      <div class="row">
        <component
          :is="getComponent1(panels[2].type)"
          class="panel full"
          :title="panels[2].title"
        />
      </div>
    </template>

    <template v-else-if="layout === '1big-2small'">
      <div class="row">
        <component
          :is="getComponent1(panels[0].type)"
          class="panel full"
          :title="panels[0].title"
        />
      </div>
      <div class="row">
        <component
          v-for="(mod, idx) in panels.slice(1)"
          :key="mod.type + idx"
          :is="getComponent1(mod.type)"
          class="panel half"
          :title="mod.title"
        />
      </div>
    </template>

    <template v-else-if="layout === '2x2'">
      <div class="row" v-for="rowIdx in 2" :key="'row' + rowIdx">
        <component
          v-for="(mod, idx) in panels.slice((rowIdx - 1) * 2, rowIdx * 2)"
          :key="mod.type + idx"
          :is="getComponent1(mod.type)"
          class="panel half"
          :title="mod.title"
        />
      </div>
    </template>

    <template v-else>
      <!-- 默认：纵向堆叠 -->
      <div class="row" v-for="(mod, idx) in panels" :key="mod.type + idx">
        <component
          :is="getComponent1(mod.type)"
          class="panel full"
          :title="mod.title"
          :style="{ height: mod.height + 'px' }"
        />
      </div>
    </template>
  </div>
</template>

<script>
import PanelA from "../../components/PanelA.vue";
import PanelB from "../../components/PanelB.vue";
import PanelC from "../../components/PanelC.vue";
export default {
  components: {
    PanelA,
    PanelB,
    PanelC
  },
  props: {
    layout: String,
    panels: Array
    // getComponent: Function
  },
  methods: {
    getComponent0(type) {
      const map = {
        a: "PanelA",
        b: "PanelB",
        c: "PanelC"
      };
      return map[type] || "PanelA";
    },
    getComponent1(type) {
      const map = {
        a: PanelA,
        b: PanelB,
        c: PanelC
      };
      return map[type] || PanelA;
    }
  }
};
</script>

<style scoped>
.layout-wrapper {
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.row {
  display: flex;
  gap: 16px;
  width: 100%;
  flex-grow: 1;
}

.panel {
  background: rgba(50, 50, 50, 0.8);
  border-radius: 8px;
  padding: 16px;
  color: #fff;
  box-sizing: border-box;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.panel.full {
  width: 100%;
}

.panel.half {
  width: 50%;
}
</style>
