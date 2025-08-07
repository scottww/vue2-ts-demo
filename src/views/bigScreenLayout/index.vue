<template>
  <div class="scroll-wrapper">
    <div class="scale-wrapper" ref="scaleWrapper">
      <div class="layout">
        <!-- 左侧面板 -->
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

        <!-- 中间区域 https://unity.com -->
        <main class="center">
          <iframe
            src="https://baidu.com"
            frameborder="0"
            class="ue-frame"
          ></iframe>
        </main>

        <!-- 右侧面板 -->
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
    </div>

    <!-- 缩放控制器（仅开发模式显示） -->
    <div class="zoom-controller" v-if="isDev">
      <label>缩放比例: {{ zoom.toFixed(2) }}</label>
      <input
        type="range"
        min="0.1"
        max="1"
        step="0.01"
        v-model.number="zoom"
        @input="manualScale"
      />
    </div>
  </div>
</template>
<script>
import WeatherPanel from "./components/WeatherPanel.vue";
import CameraPanel from "./components/CameraPanel.vue";
import WarningPanel from "./components/WarningPanel.vue";
import TaskPanel from "./components/TaskPanel.vue";
import DefaultPanel from "./components/DefaultPanel.vue";
import LeftMonitorPanel from "./components/LeftMonitorPanel.vue";

export default {
  name: "BigScreenLayout",
  components: {
    WeatherPanel,
    CameraPanel,
    WarningPanel,
    TaskPanel,
    DefaultPanel,
    LeftMonitorPanel
  },
  data() {
    return {
      designWidth: 5940,
      designHeight: 1080,
      zoom: 0.3,
      isDev: process.env.NODE_ENV === "development",
      config: {
        leftPanel: {
          visible: true,
          width: 320,
          modules: [
            { type: "weather", title: "天气信息" },
            { type: "camera", title: "实时监控" },
            { type: 'leftMonitor', title: '监控面板' }
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
  mounted() {
    this.calcScale();
    window.addEventListener("resize", this.calcScale);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.calcScale);
  },
  methods: {
    getComponent(type) {
      const map = {
        weather: "WeatherPanel",
        camera: "CameraPanel",
        warning: "WarningPanel",
        task: "TaskPanel",
        leftMonitor: 'LeftMonitorPanel'
      };
      return map[type] || "DefaultPanel";
    },
    calcScale() {
      const wrapper = this.$refs.scaleWrapper;
      if (this.isDev) {
        // 开发环境不自动缩放，默认使用 zoom 值
        wrapper.style.transform = `scale(${this.zoom})`;
        wrapper.style.transformOrigin = "top left";
        return;
      }

      const scaleX = window.innerWidth / this.designWidth;
      const scaleY = window.innerHeight / this.designHeight;
      const scale = Math.min(scaleX, scaleY);
      wrapper.style.transform = `scale(${scale})`;
      wrapper.style.transformOrigin = "top left";
    },
    manualScale() {
      const wrapper = this.$refs.scaleWrapper;
      wrapper.style.transform = `scale(${this.zoom})`;
      wrapper.style.transformOrigin = "top left";
    }
  }
};
</script>
<style scoped>
.scroll-wrapper {
  width: 100vw;
  height: 100vh;
  overflow: auto;
  background: #000;
}

.scale-wrapper {
  width: 5940px;
  height: 1080px;
  transform-origin: top left;
  position: relative;
}

.layout {
  position: relative;
  width: 5940px;
  height: 1080px;
  background: #222;
  display: flex;
}

.center {
  flex: 1;
  height: 100%;
  position: relative;
  background: #000;
}

.ue-frame {
  width: 100%;
  height: 100%;
  border: none;
  background: #000;
}

.panel {
  height: 100%;
  box-sizing: border-box;
  padding: 16px;
  background: rgba(51, 51, 51, 0.9);
  overflow-y: auto;
  z-index: 10;
}

.panel.left {
  border-right: 2px solid #444;
}

.panel.right {
  border-left: 2px solid #444;
}

.module-panel {
  margin-bottom: 20px;
  padding: 12px;
  background: #444;
  border-radius: 8px;
  color: #eee;
}

.module-panel h3 {
  margin: 0 0 8px;
}

.module-panel.warning {
  background: #660000;
}

/* 缩放调节器 */
.zoom-controller {
  position: fixed;
  top: 10px;
  left: 10px;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.7);
  padding: 10px;
  color: #fff;
  border-radius: 6px;
}
</style>