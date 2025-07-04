<template>
  <div
    class="right-panel-wrapper"
    :class="{ collapsed: isCollapsed }"
    @transitionend="onTransitionEnd"
  >
    <!-- 左侧搜索栏 -->
    <div class="side-search">
      <!-- <button class="search-btn">🔍</button> -->
      <button class="toggle-btn" @click="togglePanel">
        {{ isCollapsed ? "<<" : ">>" }}
      </button>
    </div>

    <!-- 主面板内容 -->
    <div v-if="!isCollapsed" class="main-panel">
      <!-- 总览 -->
      <div class="section">
        <div class="section-title">1. 总览</div>

        <div class="sub-section">
          <div class="sub-title">基本信息</div>
          <div class="info-list">
            <div class="info-item">类型 A 信息</div>
            <div class="info-item">类型 B 信息</div>
            <div class="info-item">类型 C 信息</div>
          </div>
        </div>

        <div class="sub-section">
          <div class="sub-title">种植结构</div>
          <div ref="pieChart" class="chart-placeholder" />
        </div>
      </div>

      <!-- 图层数据 -->
      <div class="section">
        <div class="section-title">2. 图层数据</div>
        <div class="tab-switcher">
          <div
            v-for="tab in tabs"
            :key="tab"
            :class="['tab', { active: activeTab === tab }]"
            @click="activeTab = tab"
          >
            {{ tab }}
          </div>
        </div>

        <div class="table-content">
          <div v-if="activeTab === '特定类型'">[ 树结构展示区域 ]</div>
          <div v-else>[ 表格展示区域 ]</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";

export default {
  name: "RightPanel",
  data() {
    return {
      isCollapsed: false,
      tabs: ["类型一", "类型二", "类型三", "特定类型"],
      activeTab: "类型一",
      pieChartInstance: null // ✅ 图表实例缓存
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.initPie();
    });
  },
  watch: {
    isCollapsed(newVal) {
      if (!newVal) {
        // ✅ 展开后延迟触发 resize
        this.$nextTick(() => {
          setTimeout(() => {
            if (this.pieChartInstance) {
              this.pieChartInstance.resize();
            } else {
              this.initPie();
            }
          }, 100); // 等待 DOM 恢复尺寸
        });
      }
    }
  },
  methods: {
    togglePanel() {
      this.isCollapsed = !this.isCollapsed;
    },
    onTransitionEnd(e) {
      if (e.propertyName === "width" && !this.isCollapsed) {
        this.$nextTick(() => {
          // 无论有没有，先销毁旧图表
          if (this.pieChartInstance) {
            this.pieChartInstance.dispose();
            this.pieChartInstance = null;
          }

          // 延迟一点点初始化，确保 DOM 真有尺寸
          setTimeout(() => {
            this.initPie();
          }, 50); // 加一点延迟，保险起见
        });
      }
    },
    initPie() {
      const el = this.$refs.pieChart;
      if (!el) return;

      this.pieChartInstance = echarts.init(el);
      this.pieChartInstance.setOption({
        title: {
          text: "种植结构",
          left: "center"
        },
        tooltip: {
          trigger: "item"
        },
        legend: {
          bottom: "0%",
          left: "center"
        },
        series: [
          {
            name: "作物类型",
            type: "pie",
            radius: "65%",
            data: [
              { value: 40, name: "小麦" },
              { value: 30, name: "玉米" },
              { value: 20, name: "水稻" },
              { value: 10, name: "其它" }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      });
    }
  }
};
</script>

<style scoped>
.right-panel-wrapper {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  display: flex;
  width: 370px;
  height: 100%;
  background: #fff;
  transition: width 0.3s ease;
  z-index: 10;
  box-shadow: -2px 0 6px rgba(0, 0, 0, 0.1);
}

.right-panel-wrapper.collapsed {
  width: 40px;
  background: transparent !important;
}

.side-search {
  width: 40px;
  background: #f3f3f3;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 8px 0;
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
}

.search-btn,
.toggle-btn {
  background: #fff;
  border: 1px solid #ccc;
  width: 30px;
  height: 30px;
  cursor: pointer;
  font-size: 14px;
  margin: 4px 0;
}

.main-panel {
  flex: 1;
  background: #fff;
  padding: 12px;
  overflow-y: auto;
}

.section {
  margin-bottom: 20px;
}

.section-title {
  font-weight: bold;
  font-size: 16px;
  border-bottom: 1px solid #ccc;
  padding-bottom: 4px;
  margin-bottom: 10px;
}

.sub-section {
  margin-top: 10px;
}

.sub-title {
  font-size: 14px;
  margin-bottom: 6px;
}

.info-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.info-item {
  padding: 6px;
  background: #f9f9f9;
  border: 1px solid #ddd;
}

/* 饼图区域 */
.chart-placeholder {
  height: 220px;
  border: 1px dashed #aaa;
  background: #f5f5f5;
  margin-top: 6px;
}

/* Tabs */
.tab-switcher {
  display: flex;
  gap: 8px;
  margin-bottom: 10px;
  flex-wrap: wrap;
}

.tab {
  padding: 6px 12px;
  background: #ddd;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  user-select: none;
}

.tab.active {
  background: #007aff;
  color: white;
}

.table-content {
  min-height: 150px;
  background: #fff;
  border: 1px solid #ddd;
  padding: 10px;
}
</style>
