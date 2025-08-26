<template>
  <div class="route-map-container">
    <!-- 顶部图片区域 -->
    <div class="map-image-wrapper">
      <img :src="mapImagePath" alt="路线地图" class="map-image" />

      <!-- 标注点和连接线 -->
      <div class="annotation-layer">
        <!-- 安置点标注 -->
        <div class="marker" :style="getMarkerStyle('安置点')">
          <div class="marker-label">安置点</div>
        </div>

        <!-- 重点目标标注 -->
        <div class="marker" :style="getMarkerStyle('重点目标')">
          <div class="marker-label">重点目标</div>
        </div>

        <!-- 物资仓库标注 -->
        <div class="marker" :style="getMarkerStyle('物资仓库')">
          <div class="marker-label">物资仓库</div>
        </div>

        <!-- 连接线 -->
        <svg
          class="connection-lines"
          width="100%"
          height="100%"
          style="position: absolute; top: 0; left: 0"
        >
          <!-- 安置点到重点目标的连接线 -->
          <line
            :x1="connections.安置点重点目标.x1"
            :y1="connections.安置点重点目标.y1"
            :x2="connections.安置点重点目标.x2"
            :y2="connections.安置点重点目标.y2"
            stroke="#ff0000"
            stroke-width="2"
            stroke-dasharray="5,5"
          />

          <!-- 重点目标到物资仓库的连接线 -->
          <line
            :x1="connections.重点目标物资仓库.x1"
            :y1="connections.重点目标物资仓库.y1"
            :x2="connections.重点目标物资仓库.x2"
            :y2="connections.重点目标物资仓库.y2"
            stroke="#ff0000"
            stroke-width="2"
            stroke-dasharray="5,5"
          />
        </svg>
      </div>
    </div>

    <!-- 底部按钮区域 -->
    <div class="button-container">
      <button class="simulation-button" @click="handleSimulationClick">
        三维动态模拟
      </button>
    </div>
  </div>
</template>

<script>
import routeImg from "@/assets/bigScreen/DispatchManagement/route.png";
export default {
  name: "RouteMapComponent",
  props: {
    // 允许从父组件传入地图图片路径
    mapImagePath: {
      type: String,
      default: routeImg
    },
    // 允许从父组件传入标注点位置配置
    markerPositions: {
      type: Object,
      default: () => ({})
    },
    // 允许从父组件传入连接线配置
    connectionPaths: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      // 默认标注点位置（基于截图估算的百分比位置）
      defaultMarkerPositions: {
        安置点: { top: "20%", left: "15%" },
        重点目标: { top: "35%", left: "70%" },
        物资仓库: { top: "25%", left: "80%" }
      },
      // 默认连接线位置（基于截图估算的百分比位置）
      defaultConnections: {
        安置点重点目标: {
          x1: "15%",
          y1: "20%",
          x2: "70%",
          y2: "35%"
        },
        重点目标物资仓库: {
          x1: "70%",
          y1: "35%",
          x2: "80%",
          y2: "25%"
        }
      }
    };
  },
  computed: {
    // 合并默认连接线和传入的连接线配置
    connections() {
      return {
        ...this.defaultConnections,
        ...this.connectionPaths
      };
    }
  },
  methods: {
    // 处理三维动态模拟按钮点击事件
    handleSimulationClick() {
      // 触发自定义事件，通知父组件
      this.$emit("simulation-click");
      // 在实际应用中，这里可以添加调用API的逻辑
      console.log("启动三维动态模拟");
    },
    // 获取标注点样式
    getMarkerStyle(markerName) {
      // 如果传入了自定义位置，则使用传入的位置
      if (this.markerPositions && this.markerPositions[markerName]) {
        return this.markerPositions[markerName];
      }
      // 否则返回默认位置
      return (
        this.defaultMarkerPositions[markerName] || { top: "50%", left: "50%" }
      );
    }
  }
};
</script>

<style scoped>
/* 主容器样式 */
.route-map-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(135deg, #0a1929, #112d4e);
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  width: fit-content;
  margin: 0 auto;
}

/* 图片容器样式 */
.map-image-wrapper {
  position: relative;
  border: 2px solid rgba(100, 149, 237, 0.5);
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 0 20px rgba(100, 149, 237, 0.3);
}

/* 地图图片样式 */
.map-image {
  width: 613px;
  height: 336px;
  display: block;
  object-fit: cover;
}

/* 标注层样式 */
.annotation-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

/* 标注点样式 */
.marker {
  position: absolute;
  transform: translate(-50%, -50%);
  pointer-events: all;
}

/* 标注标签样式 */
.marker-label {
  background: rgba(68, 138, 255, 0.9);
  color: white;
  padding: 6px 12px;
  border-radius: 15px;
  font-size: 12px;
  font-weight: bold;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 0 10px rgba(68, 138, 255, 0.5);
  backdrop-filter: blur(5px);
  transition: all 0.3s ease;
}

.marker-label:hover {
  background: rgba(68, 138, 255, 1);
  transform: scale(1.05);
  box-shadow: 0 0 15px rgba(68, 138, 255, 0.8);
}

/* 按钮容器样式 */
.button-container {
  margin-top: 20px;
}

/* 模拟按钮样式 */
.simulation-button {
  background: linear-gradient(45deg, #4a90e2, #6495ed);
  color: white;
  border: none;
  padding: 12px 30px;
  border-radius: 25px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(74, 144, 226, 0.4);
  letter-spacing: 1px;
  min-width: 200px;
}

.simulation-button:hover {
  background: linear-gradient(45deg, #357abd, #4a90e2);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(74, 144, 226, 0.6);
}

.simulation-button:active {
  transform: translateY(0);
  box-shadow: 0 2px 10px rgba(74, 144, 226, 0.4);
}

/* 响应式调整 */
@media (max-width: 768px) {
  .map-image {
    width: 100%;
    height: auto;
    max-width: 613px;
    max-height: 336px;
  }

  .route-map-container {
    padding: 15px;
    width: 100%;
    box-sizing: border-box;
  }

  .simulation-button {
    width: 100%;
    max-width: 300px;
  }
}
</style>