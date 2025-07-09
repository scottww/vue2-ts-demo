<template>
  <CollapsePanel title="图例">
    <div class="legend-scroll-container">
      <div
        class="legend-section"
        v-for="(section, index) in legendData"
        :key="index"
      >
        <div class="legend-label">{{ section.title }}</div>
        <div class="legend-items">
          <div
            class="legend-item"
            v-for="(item, idx) in section.items"
            :key="idx"
            :class="
              section.layout === 'horizontal'
                ? 'legend-item-horizontal'
                : 'legend-item-vertical'
            "
          >
            <template v-if="usePng">
              <img :src="item.icon" class="legend-icon" />
            </template>
            <template v-else>
              <span :class="[item.shape, item.color]" />
            </template>
            {{ item.label }}
          </div>
        </div>
      </div>
    </div>
  </CollapsePanel>
</template>

<script>
import CollapsePanel from "./CollapsePanel.vue";

export default {
  name: "LegendPanel",
  components: { CollapsePanel },
  props: {
    usePng: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      legendData: [
        {
          title: "水位",
          layout: "vertical", // 水平布局 horizontal | 竖直布局 vertical
          items: [
            {
              label: "正常",
              shape: "dot",
              color: "blue",
              icon: require("@/assets/legend/WL_normal.png")
            },
            {
              label: "超警",
              shape: "dot",
              color: "orange",
              icon: require("@/assets/legend/WL_yellow.png")
            },
            {
              label: "超汛/超保",
              shape: "dot",
              color: "red",
              icon: require("@/assets/legend/WL_red.png")
            }
          ]
        },
        {
          title: "雨量",
          layout: "horizontal",
          items: [
            {
              label: "无降雨",
              shape: "circle",
              color: "gray",
              icon: require("@/assets/legend/WL_normal.png")
            },
            {
              label: "0-10",
              shape: "circle",
              color: "green",
              icon: require("@/assets/legend/WL_normal.png")
            },
            {
              label: "10-25",
              shape: "circle",
              color: "lightgreen",
              icon: require("@/assets/legend/WL_normal.png")
            },
            {
              label: "25-50",
              shape: "circle",
              color: "blue",
              icon: require("@/assets/legend/WL_normal.png")
            },
            {
              label: "50-100",
              shape: "circle",
              color: "purple",
              icon: require("@/assets/legend/WL_normal.png")
            },
            {
              label: "100-250",
              shape: "circle",
              color: "pink",
              icon: require("@/assets/legend/WL_normal.png")
            },
            {
              label: "＞250",
              shape: "circle",
              color: "red",
              icon: require("@/assets/legend/WL_normal.png")
            }
          ]
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.legend-scroll-container {
  height: 200px;
  max-height: 200px;
  overflow-y: auto;
  padding: 10px;
}

// 滚动条样式
.legend-scroll-container::-webkit-scrollbar {
  width: 8px;
}
.legend-scroll-container::-webkit-scrollbar-thumb {
  background-color: #888;
  border-radius: 5px;
  border: 2px solid transparent;
  background-clip: content-box;
}
.legend-scroll-container::-webkit-scrollbar-track {
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 6px;
}

// 内容样式
.legend-section {
  margin-top: 10px;
}
.legend-label {
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 4px;
  background: #000e1b;
  border-radius: 4px;
  text-align: center;
  height: 30px;
  line-height: 30px;
}
.legend-items {
  display: flex;
  flex-wrap: wrap;
}
.legend-item {
  display: flex;
  align-items: center;
  margin-bottom: 6px;
}
.legend-item-horizontal {
  width: 50%;
}
.legend-item-vertical {
  width: 100%;
}

/* PNG 图标 - 实际尺寸展示 */
.legend-icon {
  display: inline-block;
  margin-right: 6px;
  vertical-align: middle;
  height: auto;
  width: auto;
  object-fit: contain;
  max-width: 100%;
  max-height: 100%;
}

/* 圆点图例样式 */
.dot,
.circle {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-right: 6px;
}
.blue {
  background: #3fa9f5;
}
.orange {
  background: #f59e0b;
}
.red {
  background: #ef4444;
}
.gray {
  background: #a1a1aa;
}
.green {
  background: #10b981;
}
.lightgreen {
  background: #6ee7b7;
}
.purple {
  background: #a78bfa;
}
.pink {
  background: #f472b6;
}

// CollapsePanel 内容去 padding
::v-deep .panel-body {
  padding: 0;
}
</style>
