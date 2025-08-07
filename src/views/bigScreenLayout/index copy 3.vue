<template>
  <div class="scale-wrapper" ref="scaleWrapper">
    <div class="layout">
      <!-- 左侧浮动面板 -->
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

      <!-- 右侧浮动面板 -->
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

      <!-- 中心区域 -->
      <main class="center">
        <iframe
          src="https://unity.com"
          frameborder="0"
          class="ue-frame"
        ></iframe>
      </main>
    </div>
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
  data() {
    return {
      designWidth: 5940,
      designHeight: 1080,
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
  components: {
    WeatherPanel,
    CameraPanel,
    WarningPanel,
    TaskPanel,
    DefaultPanel
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
        task: "TaskPanel"
      };
      return map[type] || "DefaultPanel";
    },
    calcScale() {
      const wrapper = this.$refs.scaleWrapper;
      const scaleX = window.innerWidth / this.designWidth;
      const scaleY = window.innerHeight / this.designHeight;
      const scale = Math.min(scaleX, scaleY);

      wrapper.style.transform = `scale(${scale})`;
      wrapper.style.transformOrigin = "top left";
    }
  }
};
</script>
<style scoped>
/* 缩放包裹容器 */
.scale-wrapper {
  width: 5940px;
  height: 1080px;
  transform-origin: top left;
  position: relative;
}

/* 原始布局 */
.layout {
  position: relative;
  width: 5940px;
  height: 1080px;
  overflow: hidden;
  background: #000;
}

/* Unity iframe 内容区域 */
.center {
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 0;
}

.ue-frame {
  position: absolute;
  top: 0;
  left: 0;
  width: 5940px;
  height: 1080px;
  border: none;
  background: #000;
}

/* 浮动面板 */
.panel {
  position: absolute;
  top: 0;
  height: 100%;
  box-sizing: border-box;
  padding: 16px;
  background: rgba(0, 0, 0, 0.6);
  color: #eee;
  overflow-y: auto;
  z-index: 10;
}

.panel.left {
  left: 0;
  border-right: 2px solid #444;
}

.panel.right {
  right: 0;
  border-left: 2px solid #444;
}

/* 模块样式 */
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
</style>