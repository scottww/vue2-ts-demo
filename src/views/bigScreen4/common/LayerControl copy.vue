<template>
  <div class="layer-control-container" :class="{ collapsed: !isExpanded }">
    <!-- 背景图 -->
    <!-- <div class="background-image"></div> -->

    <!-- 标题栏 - 可点击展开/收缩 -->
    <div class="title-bar" @click="toggleExpand">
      <span class="title-text">{{ title }}</span>
      <span class="expand-icon" :class="isExpanded ? 'expanded' : ''">▼</span>
    </div>

    <!-- 图层列表 - 根据展开状态显示/隐藏 -->
    <div class="layer-list" v-if="isExpanded">
      <div v-for="layer in layers" :key="layer.id" class="layer-item">
        <input
          type="checkbox"
          :id="'layer-' + layer.id"
          :checked="layer.checked"
          @change="handleLayerToggle(layer.id, $event.target.checked)"
        />
        <!-- <img class="layer-icon" :src="layer.icon" alt="" /> -->
        <label :for="'layer-' + layer.id">
          <img class="layer-icon" :src="layer.icon" alt="imageIcon" />
          {{ layer.name }}</label
        >
      </div>
    </div>
  </div>
</template>

<script>
import waterLevelImg from "@/assets/bigScreen/layerControl/waterLevel2.png";
import rainfallImg from "@/assets/bigScreen/layerControl/rainfall2.png";
import flowImg from "@/assets/bigScreen/layerControl/flow2.png";
import safetyImg from "@/assets/bigScreen/layerControl/safety2.png";
import videoImg from "@/assets/bigScreen/layerControl/video2.png";
export default {
  name: "LayerControl",
  data() {
    return {
      isExpanded: true, // 初始状态为展开
      title: "图层",
      layers: [
        { id: 1, name: "水位站", checked: true, icon: waterLevelImg },
        { id: 2, name: "雨量站", checked: true, icon: rainfallImg },
        { id: 3, name: "流量站", checked: true, icon: flowImg },
        { id: 4, name: "安全监测", checked: true, icon: safetyImg },
        { id: 5, name: "视频监控", checked: true, icon: videoImg }
      ]
    };
  },
  methods: {
    // 切换展开/收缩状态
    toggleExpand() {
      this.isExpanded = !this.isExpanded;
    },
    // 处理图层勾选状态变化
    handleLayerToggle(layerId, isChecked) {
      const layer = this.layers.find((l) => l.id === layerId);
      if (layer) {
        layer.checked = isChecked;
        // 这里可以添加图层显示/隐藏的逻辑
        this.$emit("layerChange", {
          id: layerId,
          name: layer.name,
          checked: isChecked
        });
      }
    }
  }
};
</script>

<style scoped>
/* 主容器样式 - 适配背景图尺寸 */
.layer-control-container {
  position: relative;
  width: 167px;
  /* height: 287px; */
  min-height: 56px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  /* background: linear-gradient(0deg, #0c90e1 0%, #0b203a 100%); */
  padding: 20px;
}

.layer-control-container::before {
  content: "";
  position: absolute;
  inset: 0;
  background: url("../../../assets/bigScreen/layerControl/layer_bg3.png")
    no-repeat center/100% 100%;
  z-index: 0;
}

.layer-control-container.collapsed::before {
  background: url("../../../assets/bigScreen/layerControl/collapsed.png")
    no-repeat center/100% 100%;
}

/* 标题栏样式 */
.title-bar {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 2px;
  /* background: rgba(10, 50, 100, 0.8); */
  color: white;
  cursor: pointer;
  z-index: 1;
  height: 58px;
  border-bottom: 1px solid #fff;
}

.title-text {
  font-size: 20px;
  color: #fff;
}

/* 展开/收缩图标样式 */
.expand-icon {
  font-size: 10px;
  transition: transform 0.3s ease;
}

.expanded {
  transform: rotate(180deg);
}

/* 图层列表样式 */
.layer-list {
  position: relative;
  margin-top: 18px;
  padding: 0 6px;
  /* background: rgba(5, 30, 70, 0.7); */
  z-index: 1;
  height: calc(100% - 56px); /* 减去标题栏高度 */
  overflow-y: auto; /* 如有更多图层可滚动 */
}

/* 图层项样式 */
.layer-item {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  color: white;
}

.layer-item:last-child {
  margin-bottom: 0;
}

.layer-item input[type="checkbox"] {
  margin-right: 8px;
  width: 14px;
  height: 14px;
  accent-color: #33ccff;
}

.layer-item label {
  cursor: pointer;
  /* font-size: 13px; */
  font-size: 14px;
  color: #ffffff;
  line-height: 18px;
}

.layer-icon {
  width: 23px;
  height: 23px;
  margin-right: 4px;
  vertical-align: middle; /* 图标和文字垂直居中 */
}
</style>