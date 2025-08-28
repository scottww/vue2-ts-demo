<template>
  <div class="route-map-container">
    <!-- 顶部图片区域 -->
    <div class="map-image-wrapper">
      <img :src="mapImagePath" alt="示例图" class="map-image" />
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
  margin: 0 auto;
  height: 100%;
}

.map-image-wrapper {
  position: relative;
  /* border: 2px solid rgba(100, 149, 237, 0.5); */
  /* border-radius: 6px; */
  overflow: hidden;
  /* box-shadow: 0 0 20px rgba(100, 149, 237, 0.3); */
  width: 100%;
  /* height: 260px; */
  height: calc(100% - 50px);
}

.map-image {
  width: 100%;
  height: auto;
  display: block;
  object-fit: contain;
}

/* 按钮容器样式 */
.button-container {
  margin-top: 10px;
}

/* 模拟按钮样式 */
.simulation-button {
  /* background: linear-gradient(45deg, #4a90e2, #6495ed); */
  background: linear-gradient(to bottom, #44C2FF 0%, #215EFC 100%);
  color: white;
  border: none;
  /* padding: 12px 30px; */
  border-radius: 25px;
  cursor: pointer;
  font-size: 16px;
  /* font-weight: bold; */
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(74, 144, 226, 0.4);
  letter-spacing: 1px;
  /* min-width: 200px; */
  width: 169px;
  height: 40px;
}

.simulation-button:hover {
  /* background: linear-gradient(45deg, #357abd, #4a90e2); */
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