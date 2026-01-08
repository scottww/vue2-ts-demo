<template>
  <div
    class="right-panel-wrapper PanelZzjg"
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
      <!-- 灌区种植结构 -->
      <div class="section chart-section">
        <div class="section-title">
          <span class="title">灌区种植结构</span>
        </div>
        <div class="sub-section">
          <PieChart ref="pieChart" class="chart-placeholder" />
        </div>
      </div>

      <!-- 表格信息 -->
      <div class="section table-section">
        <div class="section-title">
          <div class="title">详细信息</div>
          <div class="unit">单位：亩</div>
        </div>
        <div class="table-content">
          <div class="table-wrapper">
            <StatusTableVirtual
              v-if="showTable"
              ref="statusTableVirtual"
              :columns="columns"
              :tableData="tableData"
              :remain="10"
              :bench="10"
              :style="'height: 100%'"
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
import PieChart from "./components/PieChart.vue";

export default {
  name: "PanelZzjg",
  components: {
    StatusTableVirtual,
    SvgImage,
    PieChart,
  },
  data() {
    return {
      isCollapsed: false,
      columns: [
        { label: "序号", prop: "index", width: 55, minWidth: 55 },
        { label: "行政区划", prop: "time", minWidth: 100 },
        { label: "水稻", prop: "sd" },
        { label: "茶园", prop: "cy" },
        { label: "果园", prop: "gy" },
        { label: "苗木", prop: "mm" },
        { label: "其他", prop: "others" },
      ],
      tableData: [],
      showTable: true,
    };
  },
  mounted() {
    this.tableData = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      index: i + 1,
      time: "名称名称",
      sd: 10740,
      cy: 1467,
      gy: 3331,
      mm: 307,
      others: 1201,
    }));
    this.$emit("toggle", !this.isCollapsed);
  },
  methods: {
    togglePanel() {
      if (this.isCollapsed) {
        this.showTable = false;
      }
      this.isCollapsed = !this.isCollapsed;
      this.$emit("toggle", !this.isCollapsed);
    },
    onTransitionEnd(e) {
      if (e.propertyName === "width" && !this.isCollapsed) {
        this.showTable = true;
        this.$nextTick(() => {
          this.$refs.statusTableVirtual &&
            this.$refs.statusTableVirtual.calcColumnWidths();
          this.$refs.pieChart && this.$refs.pieChart.resize();
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/styles/custom.scss";

/* ========================
 * 右侧面板容器
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
 * 主面板
 * ======================== */
.main-panel {
  flex: 1;
  display: flex;
  flex-direction: column;

  background-color: rgba(2, 35, 76, 0.9);
  overflow: hidden;
}

/* ========================
 * Section
 * ======================== */
.section {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
}

/* ========================
 * 图表区域
 * ======================== */
.chart-section {
  flex: 0 0 275px; // 固定高度
  margin-top: 20px;
}

.chart-placeholder {
  height: 220px;
  // margin-top: 6px;
}

/* ========================
 * 表格区域
 * ======================== */
.table-section {
  flex: 1;
  min-height: 0; // flex 滚动前提
}

/* ========================
 * Section 标题
 * ======================== */
.section-title {
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

/* ========================
 * 子 Section
 * ======================== */
.sub-section {
  flex: 1;
  min-height: 0;
}

/* ========================
 * 可选小标题
 * ======================== */
.sub-title {
  width: 100%;
  height: 25px;
  background: url("../../assets/images/oneMap/small_title.png") no-repeat;
  background-size: contain;
  position: relative;
  margin: 0 auto;

  span {
    margin-left: 35px;
    line-height: 1;
    @include custom-panel-title($style: normal);
  }
}

/* ========================
 * 表格内容
 * ======================== */
.table-content {
  flex: 1;
  overflow-y: auto;
  background-color: rgba(2, 35, 76, 0.9);
  height: calc(100% - 55px); // section-title 45px + margin 10px
}

/* ========================
 * 表格定制样式
 * ======================== */
::v-deep .table-wrapper {
  height: 100%; // ⭐ 防止表格内容溢出

  .header-inline .header-label,
  .header-inline .header-unit {
    font-size: 16px;
    font-weight: normal;
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
