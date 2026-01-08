<template>
  <div
    class="right-panel-wrapper PanelGdmj"
    :class="{ collapsed: isCollapsed }"
    @transitionend="onTransitionEnd"
  >
    <!-- 左侧收缩栏 -->
    <div class="side-search">
      <button
        class="toggle-btn"
        @click="togglePanel"
        :title="isCollapsed ? '展开' : '收起'"
      >
        <!-- 组件内置了配置 -->
        <SvgImage
          class="toggle-icon"
          :direction="isCollapsed ? 'right' : 'left'"
          :src="require('@/assets/images/oneMap/double_arrow_left.svg')"
          :size="12"
        />
      </button>
    </div>

    <!-- 主面板内容 -->
    <div v-if="!isCollapsed" class="main-panel">
      <!-- 灌区总览 -->
      <div class="section stats-section">
        <div class="section-title">
          <span class="title">基本信息</span>
        </div>

        <div class="sub-section base-info">
          <InfoList :items="infoItems" />
        </div>
      </div>

      <div class="section chart-section">
        <div class="section-title">
          <span class="title">详细信息</span>
        </div>

        <div class="sub-section" v-if="showTable">
          <BarChart
            ref="barChart"
            :width="'100%'"
            :height="'220px'"
            :data="[7, 8, 12, 12, 12, 6, 6, 14, 14, 6]"
            :xAxisLabels="[
              '名称',
              '名称',
              '名称',
              '名称',
              '名称',
              '名称',
              '名称',
              '名称',
              '名称',
              '名称',
            ]"
            yAxisUnit="(千亩)"
            :yAxisMax="25"
            barColor="#33ccff"
            barGradientColor="rgba(51,204,255,0.1)"
            @barClick="handleBarClick"
          />
        </div>
      </div>
      <!-- 图层数据 -->
      <div class="section table-section">
        <div class="table-content">
          <div class="table-wrapper">
            <StatusTableVirtual
              v-if="showTable"
              ref="statusTableVirtual"
              :columns="columns"
              :tableData="tableData"
              :remain="10"
              :bench="10"
              :style="`height: 100%`"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import InfoList from "./components/InfoList.vue";
import StatusTableVirtual from "./components/StatusTableVirtual.vue";
import SvgImage from "./components/SvgImage.vue";
import BarChart from "./components/BarChart.vue";
import { generateMockTableData } from "./generateDataHelper.js";
import { columnMap } from "./constants.js";

export default {
  name: "PanelGdmj",
  components: {
    InfoList,
    StatusTableVirtual,
    SvgImage,
    BarChart,
  },
  data() {
    return {
      isCollapsed: false,
      infoItems: [
        { value: "21.5", unit: "万亩", type: "设计灌区面积" },
        { value: "30.2", unit: "万亩", type: "有效灌溉面积" },
        { value: "15.8", unit: "万亩", type: "耕地面积" },
      ],
      columns: [
        { label: "序号", prop: "index", width: 60, minWidth: 60 },
        // { label: "行政区划", prop: "adcdLabel"},
        { label: "行政区划", prop: "time" },
        { label: "灌溉面积", prop: "ggmj", unit: "(亩)" },
      ],
      tableData: [],
      showTable: true,
    };
  },
  computed: {},
  mounted() {
    // this.tableData = generateMockTableData(1000);
    this.tableData = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      index: i + 1,
      // adcdLabel: "行政区划名称",
      time: "行政区划名称",
      ggmj: Math.floor(Math.random() * 1500) + 1,
    }));
    this.$emit("toggle", !this.isCollapsed);
  },
  methods: {
    togglePanel() {
      if (this.isCollapsed) {
        // 等待动画结束再展示table
        this.showTable = false;
      }
      this.isCollapsed = !this.isCollapsed;
      this.$emit("toggle", !this.isCollapsed);
    },
    onTransitionEnd(e) {
      if (e.propertyName === "width" && !this.isCollapsed) {
        // this.showTable = true;
        // this.$nextTick(() => {
        //   // 重新计算列宽
        //   this.$refs.statusTableVirtual &&
        //     this.$refs.statusTableVirtual.calcColumnWidths();
        //   this.$refs.barChart && this.$refs.barChart.initChart();
        // });
        setTimeout(() => {
          this.showTable = true;
          this.$nextTick(() => {
            // 重新计算列宽
            this.$refs.statusTableVirtual &&
              this.$refs.statusTableVirtual.calcColumnWidths();
            this.$refs.barChart && this.$refs.barChart.resize();
          });
        }, 50);
      }
    },
    handlePointClick(point) {
      console.log("选中的点位信息:", point);
      // TODO：定位地图
      // const { lng, lat } = point;
      // if (lng && lat) {
      //   this.map.setView([lng, lat], 14);
      // }
    },
    handleBarClick(data, index) {
      console.log("点击柱子:", data, "索引:", index);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/styles/custom.scss";

/* ========================
 * 右侧面板整体容器
 * ======================== */
.right-panel-wrapper {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;

  display: flex;
  width: 440px;
  height: 100%;

  background-color: rgba(9, 60, 111, 0.7);
  box-shadow: -2px 0 6px rgba(0, 0, 0, 0.1);
  z-index: 10;

  transition: width 0.3s ease;

  &.collapsed {
    width: 15px;
    background: transparent !important;
  }
}

/* ========================
 * 左侧收缩栏
 * ======================== */
.side-search {
  width: 15px;
  background: rgba(10, 60, 111, 0.4);

  display: flex;
  align-items: center;
  justify-content: center;
}

.toggle-btn {
  all: unset;
  width: 100%;
  height: 100%;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  .toggle-icon {
    color: #fff !important;
    transition: color 0.3s ease;
  }

  &:hover .toggle-icon {
    color: #ffcc00;
  }
}

/* ========================
 * 主面板区域（核心）
 * ======================== */
.main-panel {
  flex: 1;
  display: flex;
  flex-direction: column;

  background-color: rgba(2, 35, 76, 0.9);
  overflow: hidden; // ⭐ 防止子元素把面板顶爆
}

/* ========================
 * 通用 section
 * ======================== */
.section {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;

  &:last-child {
    margin-bottom: 0;
  }
}

/* ===== 固定高度区 ===== */
.stats-section {
  margin-top: 20px;
  flex-shrink: 0;
}

.chart-section {
  flex-shrink: 0;

  .section-title {
    margin-bottom: 0;
  }
}

/* ===== 表格自适应区 ===== */
.table-section {
  flex: 1;
  min-height: 0;
  // overflow: hidden;
}

/* ========================
 * 标题样式
 * ======================== */
.section-title {
  flex-shrink: 0;
  width: 100%;
  height: 45px;

  background: url("../../assets/images/oneMap/big_title.png") center no-repeat;
  background-size: contain;

  position: relative;
  margin-bottom: 10px;

  .title {
    position: absolute;
    top: 45%;
    transform: translateY(-45%);
    margin-left: 65px;
    padding: 0 4px;
    white-space: nowrap;

    @include custom-panel-title($size: 20px, $style: italic, $start: #7ae3ff);
  }
}

/* ========================
 * 子标题（预留）
 * ======================== */
.sub-title {
  width: 100%;
  height: 25px;

  background: url("../../assets/images/oneMap/small_title.png") no-repeat;
  background-size: contain;

  position: relative;

  span {
    margin-left: 35px;
    line-height: 1;
    @include custom-panel-title($style: normal);
  }
}

/* ========================
 * 表格内容区
 * ======================== */
.table-content {
  flex: 1;
  overflow-y: auto;
  background-color: rgba(2, 35, 76, 0.9);
}

/* ========================
 * 表格定制样式
 * ======================== */
::v-deep .table-wrapper {
  height: 100%; // ⭐ 防止表格内容溢出
  
  .header-inline {
    .header-label,
    .header-unit {
      font-size: 16px;
      font-weight: normal;
    }
  }

  .col-time {
    font-size: 16px;
    width: 100% !important;
  }

  .col-others {
    font-size: 20px;
    font-weight: bold;
    width: 100% !important;
  }
}
</style>
