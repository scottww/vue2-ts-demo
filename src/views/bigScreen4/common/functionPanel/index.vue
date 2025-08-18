<template>
  <div class="function-container">
    <!-- 左侧气象面板 - 默认隐藏 -->
    <div class="weather-panel" :class="{ show: isWeatherPanelVisible }">
      <WeatherPanel
        v-model="activeWeather"
        @weatherChange="handleWeatherChange"
      />
    </div>

    <!-- 视角切换 -->
    <div class="view-panel" :class="{ show: isViewPanelVisible }">
      <ViewPanel v-model="activeView" @viewChange="handleViewChange" />
    </div>

    <!-- 构建信息 -->
    <div class="structure-panel" :class="{ show: isStructurePanelVisible }">
      <StructurePanel @nodeSelect="handleNodeSelect" />
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
import ViewPanel from "./ViewPanel.vue";
import StructurePanel from "./StructurePanel.vue";

export default {
  name: "WeatherAndFunctionPanel",
  components: {
    WeatherPanel,
    ViewPanel,
    StructurePanel
  },
  data() {
    return {
      isWeatherPanelVisible: true,
      activeFunction: "weatherSimulation", // 当前激活的功能
      activeWeather: "sunny", // 当前选中的天气
      isViewPanelVisible: false,
      activeView: "defaultView", // 当前选中的视角
      isStructurePanelVisible: false, // 构建信息面板
      isCollapsed: false
    };
  },
  methods: {
    // 处理功能项点击
    handleFunctionClick(functionName) {
      console.log("handleFunctionClick ...", functionName);
      // 更新激活的功能
      this.activeFunction = functionName;

      // 根据不同功能显示不同面板
      if (functionName === "weatherSimulation") {
        this.isWeatherPanelVisible = true;
        this.isViewPanelVisible = false;
        this.isStructurePanelVisible = false;
      } else if (functionName === "viewSwitch") {
        this.isWeatherPanelVisible = false;
        this.isViewPanelVisible = true;
        this.isStructurePanelVisible = false;
      } else if (functionName === "componentInfo") {
        this.isWeatherPanelVisible = false;
        this.isViewPanelVisible = false;
        this.isStructurePanelVisible = true;
      } else {
        this.isWeatherPanelVisible = false;
        this.isViewPanelVisible = false;
        this.isStructurePanelVisible = false;
      }

      // 触发功能变更事件
      this.$emit("functionChange", functionName);
    },
    toggleCollapse() {
      this.isCollapsed = !this.isCollapsed;
      // this.$emit('collapse-change', this.isCollapsed);
    },
    // 处理气象变更
    handleWeatherChange(weatherType) {
      console.log("handleWeatherChange ...", weatherType);
      this.activeWeather = weatherType;
      this.$emit("weatherChange", weatherType);
    },
    // 处理视角变更
    handleViewChange(viewType) {
      console.log("handleViewChange ...", viewType);
      this.activeView = viewType;
      // 在这里切换场景视角
    },
    // 处理结构节点选择
    handleNodeSelect(nodeName) {
      console.log("Selected node:", nodeName);
      // 这里可以添加节点选择后的逻辑
      this.$emit("nodeSelect", nodeName);
    }
  }
};
</script>

<style scoped>
/* 保持原有样式不变 */
/* 主容器样式 */
.function-container {
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
  /* opacity: 0; */
  display: none;
  transform: translateX(-20px);
  pointer-events: none;
}

/* 显示气象面板 */
.weather-panel.show {
  /* opacity: 1; */
  display: block;
  transform: translateX(0);
  pointer-events: auto;
}

.view-panel {
  width: 137px;
  /* height: 294px; */
  aspect-ratio: 137 / 294; /* 保持原始比例 */
  background-image: url("~@/assets/bigScreen/functionPanel/view_panel_bg.png");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  margin-right: 20px;
  transition: all 0.3s ease;
  /* opacity: 0; */
  display: none;
  transform: translateX(-20px);
  pointer-events: none;
}

.view-panel.show {
  display: block;
  transform: translateX(0);
  pointer-events: auto;
}

/* 构建信息面板 */
.structure-panel {
  width: 200px;
  aspect-ratio: 137 / 294;
  background-image: url("~@/assets/bigScreen/functionPanel/view_panel_bg.png");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  margin-right: 20px;
  transition: all 0.3s ease;
  display: none;
  transform: translateX(-20px);
  pointer-events: none;
}

.structure-panel.show {
  display: block;
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