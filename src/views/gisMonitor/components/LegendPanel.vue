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
            :class="[
              section.layout === 'horizontal' ? 'horizontal' : 'vertical'
            ]"
            :style="{ width: section.layout === 'horizontal' ? 100 / (section.perRow || 2) + '%' : '100%' }"
          >
            <div
              class="legend-content"
              :class="[
                section.direction === 'column'
                  ? 'legend-direction-column'
                  : 'legend-direction-row'
              ]"
            >
              <template v-if="usePng">
                <img :src="item.icon" class="legend-icon" />
              </template>
              <template v-else>
                <span :class="[item.shape, item.color]" />
              </template>
              <span class="legend-label-text">{{ item.label }}</span>
            </div>
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
          layout: "horizontal", // 水平布局 horizontal | 竖直布局 vertical
          direction: "column", // 图标和文字左右排布 row | 图标在上文字在下 column
          perRow: 3, // 每行显示多少个, 仅水平布局时生效，
          items: [
            {
              label: "正常",
              shape: "dot",
              color: "blue",
              icon: require("@/assets/images/oneMap/legend/WL_normal.png")
            },
            {
              label: "超警",
              shape: "dot",
              color: "orange",
              icon: require("@/assets/images/oneMap/legend/WL_yellow.png")
            },
            {
              label: "超汛/超保",
              shape: "dot",
              color: "red",
              icon: require("@/assets/images/oneMap/legend/WL_red.png")
            }
          ]
        },
        {
          title: "雨量",
          layout: "vertical",
          direction: "row", // 图标在上，文字在下
          items: [ 
            {
              label: "无降雨",
              shape: "circle",
              color: "gray",
              icon: require("@/assets/images/oneMap/legend/rain_none.png")
            },
            {
              label: "0-10",
              shape: "circle",
              color: "green",
              icon: require("@/assets/images/oneMap/legend/rain_0_10.png")
            },
            {
              label: "10-25",
              shape: "circle",
              color: "lightgreen",
              icon: require("@/assets/images/oneMap/legend/rain_10_25.png")
            },
            {
              label: "25-50",
              shape: "circle",
              color: "blue",
              icon: require("@/assets/images/oneMap/legend/rain_25_50.png")
            },
            {
              label: "50-100",
              shape: "circle",
              color: "purple",
              icon: require("@/assets/images/oneMap/legend/rain_50_100.png")
            },
            {
              label: "100-250",
              shape: "circle",
              color: "pink",
              icon: require("@/assets/images/oneMap/legend/rain_100_250.png")
            },
            {
              label: "＞250",
              shape: "circle",
              color: "red",
              icon: require("@/assets/images/oneMap/legend/rain_250_plus.png")
            }
          ]
        },
        {
          title: "工情",
          layout: "vertical",
          direction: "row",
          items: [ 
            {
              label: "闸门开启",
              icon: require("@/assets/images/oneMap/legend/gate_open.png")
            },
            {
              label: "闸门关闭",
              icon: require("@/assets/images/oneMap/legend/gate_close.png")
            },
            {
              label: "泵组开启",
              icon: require("@/assets/images/oneMap/legend/pump_on.png")
            },
            {
              label: "泵组关闭",
              icon: require("@/assets/images/oneMap/legend/pump_off.png")
            },
          ]
        },
        {
          title: "土壤墒情",
          layout: "vertical",
          direction: "row",
          items: [ 
            {
              label: "60%~100% 无干旱",
              icon: require("@/assets/images/oneMap/legend/soil_none.png")
            },
            {
              label: "50%~60% 轻度",
              icon: require("@/assets/images/oneMap/legend/soil_50_60.png")
            },
            {
              label: "40%~50% 中度",
              icon: require("@/assets/images/oneMap/legend/soil_40_50.png")
            },
            {
              label: "30%~40% 严重",
              icon: require("@/assets/images/oneMap/legend/soil_30_40.png")
            },
            {
              label: "≤30% 特大干旱",
              icon: require("@/assets/images/oneMap/legend/soil_lte_30.png")
            },
          ]
        },
        {
          title: "其他",
          layout: "horizontal",
          direction: "column",
          perRow: 3,
          items: [ 
            {
              label: "正常",
              icon: require("@/assets/images/oneMap/legend/other_1.png")
            },
            {
              label: "报警",
              icon: require("@/assets/images/oneMap/legend/other_2.png")
            },
            {
              label: "离线",
              icon: require("@/assets/images/oneMap/legend/other_3.png")
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
  // height: 200px;
  max-height: 295px;
  overflow-y: auto;
  padding: 10px;
}

// 滚动条
.legend-scroll-container::-webkit-scrollbar {
  width: 8px;
}
.legend-scroll-container::-webkit-scrollbar-thumb {
  background-color: #42d4fe;
  border-radius: 5px;
  border: 2px solid transparent;
  background-clip: content-box;
}
.legend-scroll-container::-webkit-scrollbar-track {
  background-color: rgba(255, 255, 255, 0.1);
}

// 样式区域
.legend-section {
  margin-top: 10px;
}
.legend-label {
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 10px;
  background: rgba(255, 255, 255, 0.2);;
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
  justify-content: flex-start;
  margin-bottom: 8px;
}
.legend-item.horizontal {
  width: 50%;
}
.legend-item.vertical {
  width: 100%;
}
.legend-content {
  display: flex;
  align-items: center;
}
.legend-direction-row {
  flex-direction: row;
}
.legend-direction-column {
  flex-direction: column;
  text-align: center;
}
.legend-label-text {
  font-size: 12px;
  white-space: nowrap;
}
.legend-icon {
  display: inline-block;
  width: auto;
  height: auto;
  object-fit: contain;
  margin-right: 6px;
}
.legend-direction-column .legend-icon {
  margin-right: 0;
  margin-bottom: 4px;
}

// 颜色圆点样式（非PNG时）
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

::v-deep .panel-body {
  padding: 0;
}
</style>
