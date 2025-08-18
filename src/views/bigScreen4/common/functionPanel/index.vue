<template>
  <div class="weather-function-container">
    <!-- 左侧气象面板 - 默认隐藏 -->
    <div class="weather-panel" :class="{ show: isWeatherPanelVisible }">
      <WeatherPanel @weatherChange="handleWeatherChange" />
    </div>

    <!-- 主内容区域 -->
    <div class="main-content">
      <!-- 右侧功能面板 -->
      <div class="function-panel" :class="{ collapsed: isCollapsed }">
        <div class="panel-header" @click="toggleCollapse">
          <span class="panel-title">功能</span>
          <span class="expand-icon">{{ isCollapsed ? "▲" : "▼" }}</span>
        </div>
        <div class="function-list" v-if="!isCollapsed">
          <div
            class="function-item"
            :class="{ active: activeFunction === 'timeSimulation' }"
            @click="handleFunctionClick('timeSimulation')"
          >
            <div class="function-icon"></div>
            <span class="function-name">时间模拟</span>
          </div>
          <div
            class="function-item"
            :class="{ active: activeFunction === 'weatherSimulation' }"
            @click="handleFunctionClick('weatherSimulation')"
          >
            <div class="function-icon"></div>
            <span class="function-name">气象模拟</span>
          </div>
          <div
            class="function-item"
            :class="{ active: activeFunction === 'viewSwitch' }"
            @click="handleFunctionClick('viewSwitch')"
          >
            <div class="function-icon"></div>
            <span class="function-name">视角切换</span>
          </div>
          <div
            class="function-item"
            :class="{ active: activeFunction === 'componentInfo' }"
            @click="handleFunctionClick('componentInfo')"
          >
            <div class="function-icon"></div>
            <span class="function-name">构件信息</span>
          </div>
          <div
            class="function-item"
            :class="{ active: activeFunction === 'explosion' }"
            @click="handleFunctionClick('explosion')"
          >
            <div class="function-icon"></div>
            <span class="function-name">爆炸拆分</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import WeatherPanel from "./WeatherPanel.vue";

export default {
  name: "WeatherAndFunctionPanel",
  components: {
    WeatherPanel
  },
  data() {
    return {
      isWeatherPanelVisible: true, // 初始状态为显示
      activeFunction: "weatherSimulation", // 当前激活的功能
      activeWeather: "sunny", // 当前选中的天气
      isCollapsed: false
    };
  },
  methods: {
    // 处理功能项点击
    handleFunctionClick(functionName) {
      console.log("handleFunctionClick ...", functionName);
      // 更新激活的功能
      this.activeFunction = functionName;

      // 只有点击气象模拟时显示左侧面板，其他情况隐藏
      if (functionName === "weatherSimulation") {
        this.isWeatherPanelVisible = true;
      } else {
        this.isWeatherPanelVisible = false;
      }

      // 触发功能变更事件
      this.$emit("functionChange", functionName);
    },
    // 处理天气变更
    handleWeatherChange(weatherType) {
      console.log("handleWeatherChange ...", weatherType);
      this.activeWeather = weatherType;
      this.$emit("weatherChange", weatherType);
    },
    toggleCollapse() {
      this.isCollapsed = !this.isCollapsed;
      // this.$emit('collapse-change', this.isCollapsed);
    }
  }
};
</script>

<style scoped>
/* 保持原有样式不变 */
/* 主容器样式 */
.weather-function-container {
  display: flex;
  height: 100%;
  width: 100%;
  align-items: flex-end;
}

/* 左侧气象面板样式 */
.weather-panel {
  width: 137px;
  height: 294px;
  background-image: url("~@/assets/bigScreen/functionPanel/meteorological_legend_bg.png");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  margin-right: 20px;
  transition: all 0.3s ease;
  opacity: 0;
  transform: translateX(-20px);
  pointer-events: none;
}

/* 显示气象面板 */
.weather-panel.show {
  opacity: 1;
  transform: translateX(0);
  pointer-events: auto;
}

/* 主内容区域 */
.main-content {
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
}

/* 右侧功能面板样式 */
.function-panel {
  width: 167px;
  height: 331px;
  background-image: url("~@/assets/bigScreen/functionPanel/function_bg.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 8px;
  overflow: hidden;
  padding: 10px;
  /* transition: height 0.3s ease, padding 0.3s ease; */
}

.function-panel.collapsed {
  background-image: url("~@/assets/bigScreen/functionPanel/collapsed.png");
  height: 58px;
  padding: 0px 10px;
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
  color: #fff;
  height: 58px; /* 保持固定高度 */
  border-bottom: 1px solid rgba(245, 245, 245, 0.6);
  cursor: pointer;
}

.panel-title {
  font-size: 20px;
  /* font-weight: bold; */
}

.expand-icon {
  font-size: 12px;
  transition: transform 0.3s ease;
}

/* 功能列表样式 */
.function-list {
  padding: 15px 10px;
}

/* 功能项样式 */
.function-item {
  display: flex;
  align-items: center;
  padding: 6px 10px;
  margin-bottom: 8px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid transparent;
}

/* 激活的功能项 */
.function-item.active {
  background: rgba(50, 150, 255, 0.3);
  border: 1px solid rgba(100, 200, 255, 0.5);
}

/* 功能图标样式 */
.function-icon {
  width: 24px;
  height: 24px;
  margin-right: 10px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}

/* 为每个功能项设置不同图标 */
.function-item:nth-child(1) .function-icon {
  background-image: url("~@/assets/bigScreen/functionPanel/time.png");
}

.function-item:nth-child(2) .function-icon {
  background-image: url("~@/assets/bigScreen/functionPanel/weather.png");
}

.function-item:nth-child(3) .function-icon {
  background-image: url("~@/assets/bigScreen/functionPanel/view.png");
}

.function-item:nth-child(4) .function-icon {
  background-image: url("~@/assets/bigScreen/functionPanel/info.png");
}

.function-item:nth-child(5) .function-icon {
  background-image: url("~@/assets/bigScreen/functionPanel/explosion.png");
}

/* 功能名称样式 */
.function-name {
  color: #fff;
  font-size: 16px;
}
</style>