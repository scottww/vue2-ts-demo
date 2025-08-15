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
export default {
  name: "LayerControl",
  props: {
    title: {
      type: String,
      default: "图层"
    },
    layers: {
      type: Array,
      default: () => []
    },
    expanded: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      isExpanded: this.expanded,
      internalLayers: this.layers.map(layer => ({ ...layer })) // 深拷贝防止外部直接修改
    };
  },
  watch: {
    layers(newLayers) {
      // 外部layers更新时，内部状态同步
      this.internalLayers = newLayers.map(layer => ({ ...layer }));
    }
  },
  methods: {
    toggleExpand() {
      this.isExpanded = !this.isExpanded;
      this.$emit("update:expanded", this.isExpanded); // 可双向绑定展开状态
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
