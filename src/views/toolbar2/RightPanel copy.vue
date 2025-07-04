<template>
  <div class="right-panel-wrapper" :class="{ collapsed: isCollapsed }">
    <!-- 侧边搜索栏 -->
    <div class="side-search">
      <button class="search-btn">🔍</button>
      <button class="toggle-btn" @click="togglePanel">
        {{ isCollapsed ? "<<" : ">>" }}
      </button>
    </div>

    <!-- 主面板内容（折叠时隐藏） -->
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
          <div class="sub-title">种植类型</div>
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
      tabs: ["类型一", "类型二", "类型三", "特定类型"],
      activeTab: "类型一",
      isCollapsed: false,
    };
  },
  mounted() {
    this.renderPie();
  },
  methods: {
    togglePanel() {
      this.isCollapsed = !this.isCollapsed;
    },
    renderPie() {
      if (!this.$refs.pieChart) return;
      const chart = echarts.init(this.$refs.pieChart);
      chart.setOption({
        title: {
          text: "种植类型",
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

<style lang="scss" scoped>
.right-panel-wrapper {
  display: flex;
  height: 100%;
  transition: width 0.3s ease;
  background: #fff;
  width: 360px;

  &.collapsed {
    width: 40px;
    background: transparent !important; /* ✅ 背景透明 */
  }
}

.side-search {
  width: 40px;
  background: #f0f0f0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-right: 1px solid #ccc;
}

.search-btn,
.toggle-btn {
  width: 30px;
  height: 30px;
  background: #fff;
  border: 1px solid #aaa;
  border-radius: 4px;
  cursor: pointer;
}

/* 不显示 */
.search-btn {
  display: none;
}

/* 主体内容 */
.main-panel {
  flex: 1;
  padding: 12px;
  overflow-y: auto;
  box-sizing: border-box;
  background: #fff;
}

.right-panel-wrapper.collapsed .main-panel {
  display: none;
}

.section {
  margin-bottom: 20px;
}

.section-title {
  font-weight: bold;
  margin-bottom: 10px;
  font-size: 16px;
  border-bottom: 1px solid #ccc;
  padding-bottom: 4px;
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
  background: #fff;
  border: 1px solid #ddd;
}

/* 饼图占位 */
.chart-placeholder {
  // height: 200px;
  // background: #e0e0e0;
  // text-align: center;
  // line-height: 200px;
  // border: 1px dashed #aaa;
  // margin-top: 6px;

  height: 220px;
  background: #f5f5f5;
  border: 1px dashed #aaa;
}

/* Tabs */
.tab-switcher {
  display: flex;
  gap: 8px;
  margin-bottom: 10px;
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
  min-height: 200px;
  background: #fff;
  border: 1px solid #ddd;
  padding: 10px;
}
</style>
