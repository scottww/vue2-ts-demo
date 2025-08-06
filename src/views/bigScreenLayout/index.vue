<template>
  <div class="layout" :style="{ width: '5940px', height: '100vh' }">
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

    <!-- 中间三维主区域 -->
    <main class="center">
      <iframe src="https://unity.com" frameborder="0" class="ue-frame"></iframe>
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
</template>

<script>
import WeatherPanel from './components/WeatherPanel.vue'
import CameraPanel from './components/CameraPanel.vue'
import WarningPanel from './components/WarningPanel.vue'
import TaskPanel from './components/TaskPanel.vue'
import DefaultPanel from './components/DefaultPanel.vue'

export default {
  name: 'BigScreenLayout',
  data() {
    return {
      config: {
        leftPanel: {
          visible: true,
          width: 320,
          modules: [
            { type: 'weather', title: '天气信息' },
            { type: 'camera', title: '实时监控' }
          ]
        },
        rightPanel: {
          visible: true,
          width: 400,
          modules: [
            { type: 'warning', title: '告警信息' },
            { type: 'task', title: '任务面板' }
          ]
        }
      }
    }
  },
  components: {
    WeatherPanel,
    CameraPanel,
    WarningPanel,
    TaskPanel,
    DefaultPanel
  },
  methods: {
    getComponent(type) {
      const map = {
        weather: 'WeatherPanel',
        camera: 'CameraPanel',
        warning: 'WarningPanel',
        task: 'TaskPanel'
      }
      return map[type] || 'DefaultPanel'
    }
  }
}
</script>

<style scoped>
.layout {
  display: flex;
  background: #222;
  overflow: hidden;
}

.panel {
  height: 100vh;
  box-sizing: border-box;
  padding: 16px;
  background: #333;
  overflow-y: auto;
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
  height: 100vh;
  position: relative;
}

.ue-frame {
  width: 100%;
  height: 100%;
  border: none;
  background: #000;
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
</style>
