<template>
  <div class="layout" :style="{ width: screenWidth + 'px' }">
    <aside
      v-if="config.leftPanel.visible"
      class="panel left"
      :style="{ width: config.leftPanel.width + 'px' }"
    >
      <component
        v-for="(mod, idx) in config.leftPanel.modules"
        :key="mod.type + idx"
        :is="getComponent(mod.type)"
        :title="mod.title"
      />
    </aside>

    <main class="center">
      <iframe src="https://unity.com" class="ue-frame" frameborder="0"></iframe>
    </main>

    <aside
      v-if="config.rightPanel.visible"
      class="panel right"
      :style="{ width: config.rightPanel.width + 'px' }"
    >
      <component
        v-for="(mod, idx) in config.rightPanel.modules"
        :key="mod.type + idx"
        :is="getComponent(mod.type)"
        :title="mod.title"
      />
    </aside>
  </div>
</template>

<script>
import WeatherPanel from "./components/WeatherPanel.vue";
import CameraPanel from "./components/CameraPanel.vue";
import WarningPanel from "./components/WarningPanel.vue";
import TaskPanel from "./components/TaskPanel.vue";
import DefaultPanel from "./components/DefaultPanel.vue";

export default {
  name: "BigScreenLayout",
  components: {
    WeatherPanel,
    CameraPanel,
    WarningPanel,
    TaskPanel,
    DefaultPanel
  },
  data() {
    return {
      screenWidth: 5000,
      config: {
        leftPanel: {
          visible: true,
          width: 320,
          modules: [
            { type: "weather", title: "天气信息" },
            { type: "camera", title: "实时监控" }
          ]
        },
        rightPanel: {
          visible: true,
          width: 400,
          modules: [
            { type: "warning", title: "告警信息" },
            { type: "task", title: "任务面板" }
          ]
        }
      }
    };
  },

  methods: {
    getComponent(type) {
      const map = {
        weather: "WeatherPanel",
        camera: "CameraPanel",
        warning: "WarningPanel",
        task: "TaskPanel"
      };
      return map[type] || "DefaultPanel";
    }
  }
};
</script>

<style scoped>
.layout {
  display: flex;
  height: 100vh;
  background: #222;
  margin: 0 auto;
  overflow: hidden;
}
.panel {
  background: #333;
  height: 100vh;
  overflow-y: auto;
  box-sizing: border-box;
  padding: 16px;
}
.panel.left {
  border-right: 2px solid #444;
}
.panel.right {
  border-left: 2px solid #444;
}
.center {
  flex: 1;
  background: #000;
  position: relative;
}
.ue-frame {
  width: 100%;
  height: 100%;
  border: none;
  background: #000;
}
</style>
