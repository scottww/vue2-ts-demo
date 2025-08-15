<template>
  <div class="layer-control-container" :class="{ collapsed: !isExpanded }">
    <!-- 标题栏 -->
    <div class="title-bar" @click="toggleExpand">
      <span class="title-text">{{ title }}</span>
      <span class="expand-icon" :class="isExpanded ? 'expanded' : ''">▼</span>
    </div>

    <!-- 图层列表 -->
    <div class="layer-list" v-if="isExpanded">
      <div v-for="layer in internalLayers" :key="layer.id" class="layer-item">
        <input
          type="checkbox"
          :id="'layer-' + layer.id"
          :checked="layer.checked"
          @change="handleLayerToggle(layer.id, $event.target.checked)"
        />
        <label :for="'layer-' + layer.id">
          <img class="layer-icon" :src="layer.icon" alt="imageIcon" />
          {{ layer.name }}
        </label>
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
  props: {
    title: {
      type: String,
      default: "图层"
    },
    layers: {
      type: Array,
      default: () => [] // 如果不传，就用默认图层
    },
    expanded: {
      type: Boolean,
      default: true
    }
  },
  data() {
    const defaultLayers = [
      { id: 1, name: "水位站", checked: true, icon: waterLevelImg },
      { id: 2, name: "雨量站", checked: true, icon: rainfallImg },
      { id: 3, name: "流量站", checked: true, icon: flowImg },
      { id: 4, name: "安全监测", checked: true, icon: safetyImg },
      { id: 5, name: "视频监控", checked: true, icon: videoImg }
    ];

    return {
      isExpanded: this.expanded,
      internalLayers: this.layers.length ? this.layers.map(l => ({ ...l })) : defaultLayers
    };
  },
  watch: {
    layers(newLayers) {
      if (newLayers && newLayers.length) {
        this.internalLayers = newLayers.map(l => ({ ...l }));
      }
    }
  },
  methods: {
    toggleExpand() {
      this.isExpanded = !this.isExpanded;
      this.$emit("update:expanded", this.isExpanded);
    },
    handleLayerToggle(layerId, isChecked) {
      const layer = this.internalLayers.find(l => l.id === layerId);
      if (layer) {
        layer.checked = isChecked;
        this.$emit("layerChange", { ...layer });
      }
    }
  }
};
</script>

<style scoped>
.layer-control-container {
  position: relative;
  width: 167px;
  min-height: 56px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
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

.title-bar {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 2px;
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

.expand-icon {
  font-size: 10px;
  transition: transform 0.3s ease;
}

.expanded {
  transform: rotate(180deg);
}

.layer-list {
  position: relative;
  margin-top: 18px;
  padding: 0 6px;
  z-index: 1;
  height: calc(100% - 56px);
  overflow-y: auto;
}

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
  font-size: 14px;
  color: #ffffff;
  line-height: 18px;
}

.layer-icon {
  width: 23px;
  height: 23px;
  margin-right: 4px;
  vertical-align: middle;
}
</style>
