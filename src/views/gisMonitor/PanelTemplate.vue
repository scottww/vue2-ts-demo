<template>
  <div
    class="panel"
    :class="{
      [`panel--${panelType}`]: panelType,
      'panel--collapsed': isCollapsed
    }"
    @transitionend="onTransitionEnd"
  >
    <!-- 左侧收缩栏 -->
    <div class="panel__toggle">
      <button
        class="toggle-btn"
        @click="togglePanel"
        :title="isCollapsed ? '展开' : '收起'"
      >
        <SvgImage
          class="toggle-icon"
          :direction="isCollapsed ? 'right' : 'left'"
          :src="require('@/assets/images/oneMap/double_arrow_left.svg')"
          :size="12"
        />
      </button>
    </div>

    <!-- 主内容区 -->
    <div v-if="!isCollapsed" class="panel__content">
      <!-- 基础信息区（可选） -->
      <div v-if="showInfoSection" class="panel-section panel-section--info">
        <div class="panel-section__title">
          <span class="title">{{ infoSectionTitle }}</span>
        </div>
        <div class="panel-info__body">
          <InfoList :items="infoItems" />
        </div>
      </div>

      <!-- 图表区（可选） -->
      <div v-if="showChartSection && showChart" class="panel-section panel-section--chart">
        <div class="panel-section__title">
          <span class="title">{{ chartSectionTitle }}</span>
        </div>
        <div class="panel-chart__body">
          <!-- 图表组件插槽 -->
          <slot name="chart">
            <!-- 默认图表占位符 -->
            <div class="chart-placeholder">
              图表区域
            </div>
          </slot>
        </div>
      </div>

      <!-- 表格区 -->
      <div class="panel-section panel-section--table">
        <div class="panel-section__title">
          <span class="title">{{ tableSectionTitle }}</span>
          <span v-if="tableUnit" class="unit">{{ tableUnit }}</span>
        </div>
        <div class="panel-table__body">
          <div class="panel-table__wrapper">
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
import StatusTableVirtual from "./components/StatusTableVirtual.vue";
import SvgImage from "./components/SvgImage.vue";
import InfoList from "./components/InfoList.vue";

export default {
  name: "PanelTemplate",
  components: {
    StatusTableVirtual,
    SvgImage,
    InfoList,
  },
  props: {
    // 面板类型（用于自定义样式）
    panelType: {
      type: String,
      default: "default",
    },
    // 基础信息区配置
    showInfoSection: {
      type: Boolean,
      default: false,
    },
    infoSectionTitle: {
      type: String,
      default: "基础信息",
    },
    infoItems: {
      type: Array,
      default: () => [],
    },
    // 图表区配置
    showChartSection: {
      type: Boolean,
      default: false,
    },
    chartSectionTitle: {
      type: String,
      default: "图表信息",
    },
    // 表格区配置
    tableSectionTitle: {
      type: String,
      default: "详细信息",
    },
    tableUnit: {
      type: String,
      default: "",
    },
    columns: {
      type: Array,
      default: () => [],
    },
    tableData: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      isCollapsed: false,
      showTable: true,
      showChart: true,
    };
  },
  mounted() {
    this.$emit("panel-toggle", !this.isCollapsed);
    // 组件挂载后触发一次图表 resize，确保初始尺寸正确
    setTimeout(() => {
      this.$emit("chart-resize");
    }, 500);
  },
  methods: {
    togglePanel() {
      if (!this.isCollapsed) {
        // 收起时立即隐藏table和chart
        this.showTable = false;
        this.showChart = false;
      }
      this.isCollapsed = !this.isCollapsed;
      this.$emit("panel-toggle", !this.isCollapsed);
    },
    onTransitionEnd(e) {
      if (e.propertyName === "width" && !this.isCollapsed) {
        setTimeout(() => {
          this.showChart = true;
          this.showTable = true;
          this.$nextTick(() => {
            // 重新计算表格列宽
            this.$refs.statusTableVirtual &&
              this.$refs.statusTableVirtual.calcColumnWidths();
            // 触发图表 resize 事件，确保容器宽高已计算完成
            setTimeout(() => {
              this.$emit("chart-resize");
            }, 500);
          });
        }, 200);
      }
    },
    // 处理表格行点击
    handleRowClick(row) {
      this.$emit("row-click", row);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/custom.scss";

/* =========================
   Panel 容器
========================= */
.panel {
  display: flex;
  width: 440px;
  height: 100%;

  background-color: rgba(9, 60, 111, 0.7);
  box-shadow: -2px 0 6px rgba(0, 0, 0, 0.1);
  transition: width 0.3s ease;
  z-index: 10;

  &.panel--collapsed {
    width: 15px;
    background: transparent !important;
  }
}

/* =========================
   左侧收缩栏
========================= */
.panel__toggle {
  width: 15px;
  background: rgba(10, 60, 111, 0.4);

  display: flex;
  align-items: center;
  justify-content: center;

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
}

/* =========================
   面板内容区
========================= */
.panel__content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background-color: rgba(2, 35, 76, 0.9);
}

/* =========================
   通用 Section
========================= */
.panel-section {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
}

/* 标题 */
.panel-section__title {
  flex-shrink: 0;
  height: 45px;
  width: 100%;

  background: url("../../assets/images/oneMap/big_title.png") no-repeat center;
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

  .unit {
    font-family: SourceHanSansCN, sans-serif;
    font-weight: normal;
    font-size: 14px;
    color: #ffffff;
    position: absolute;
    right: 30px;
    top: 50%;
    transform: translateY(-50%);
  }
}

/* =========================
   信息区
========================= */
.panel-section--info {
  margin-top: 20px;
  flex-shrink: 0;
}

.panel-info__body {
  padding: 0 10px;
}

/* =========================
   图表区
========================= */
.panel-section--chart {
  flex-shrink: 0;

  .panel-chart__body {
    flex: 1;
    min-height: 0;
  }

  .chart-placeholder {
    height: 220px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #999;
    background-color: rgba(2, 35, 76, 0.5);
  }
}

/* =========================
   表格区
========================= */
.panel-section--table {
  flex: 1;
  min-height: 0;
}

.panel-table__body {
  flex: 1;
  overflow-y: auto;
  background: rgba(2, 35, 76, 0.9);
}

.panel-table__wrapper {
  height: 100%; // ⭐ 防止表格内容溢出
}

/* =========================
   表格内部定制
========================= */
::v-deep .panel-table__wrapper {
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
    font-size: 16px;
    font-weight: bold;
    width: 100% !important;
  }
}
</style>