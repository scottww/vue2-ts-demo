<template>
  <CollapsePanel title="图层">
    <div class="layer-scroll-container">
      <el-checkbox-group v-model="checkedLayers">
        <el-checkbox
          v-for="layer in layerList"
          :key="layer.value"
          :label="layer.value"
        >
          <!-- 仅当有 icon 时才渲染 -->
          <img v-if="layer.icon" :src="layer.icon" class="icon-img" />
          {{ layer.label }}
        </el-checkbox>
      </el-checkbox-group>
    </div>
  </CollapsePanel>
</template>

<script>
import CollapsePanel from "./CollapsePanel.vue";

export default {
  name: "LayerControl",
  components: { CollapsePanel },
  data() {
    return {
      checkedLayers: ["water", "rain"],
      layerList: [
        {
          label: "水情监测",
          value: "water",
          icon: require("@/assets/legend/WL_normal.png")
        },
        {
          label: "雨情监测",
          value: "rain",
          icon: require("@/assets/legend/WL_normal.png")
        },
        {
          label: "工情监测",
          value: "work",
          icon: require("@/assets/legend/WL_normal.png")
        },
        {
          label: "流量监测",
          value: "flow",
          icon: require("@/assets/legend/WL_normal.png")
        },
        {
          label: "水质监测",
          value: "quality",
          icon: require("@/assets/legend/WL_normal.png")
        },
        {
          label: "安全监测",
          value: "safety",
          icon: require("@/assets/legend/WL_normal.png")
        },
        {
          label: "土地塌陷",
          value: "land",
          icon: require("@/assets/legend/WL_normal.png")
        },
        {
          label: "视频监控",
          value: "video",
          icon: require("@/assets/legend/WL_normal.png")
        },
        {
          label: "干渠",
          value: "dry"
        },
        {
          label: "支渠",
          value: "branch"
        },
        {
          label: "灌片",
          value: "zone"
        }
      ]
    };
  },
  watch: {
    checkedLayers(val) {
      this.$emit("update-layers", val);
    }
  }
};
</script>

<style lang="scss" scoped>
.icon-img {
  width: auto;
  height: auto;
  object-fit: contain;
  margin-right: 6px;
  vertical-align: middle;
}

/* 滚动容器样式 */
.layer-scroll-container {
  max-height: 200px;
  overflow-y: auto;
  padding: 10px;
}

/* 滚动条美化（和图例一致） */
.layer-scroll-container::-webkit-scrollbar {
  width: 8px;
}
.layer-scroll-container::-webkit-scrollbar-thumb {
  background-color: #888;
  border-radius: 5px;
  border: 2px solid transparent;
  background-clip: content-box;
}
.layer-scroll-container::-webkit-scrollbar-track {
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 6px;
}

/* 去除 CollapsePanel 默认 padding */
::v-deep .panel-body {
  padding: 0;
}
/* 每个 checkbox 占一行 */
::v-deep .el-checkbox {
  display: block;
  margin-bottom: 8px;
}
</style>
