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
      <div class="section chart-section">
        <div class="section-title">
          <span class="title">灌区种植结构</span>
        </div>

        <div class="sub-section">
          <PieChart ref="pieChart" class="chart-placeholder" />
        </div>
      </div>

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
              :style="'height: 490px'"
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
import { generateMockTableData } from "./generateDataHelper.js";
import { columnMap } from "./constants.js";
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
        // { label: "行政区划", prop: "adcdLabel", minWidth: 100 },
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
  computed: {},
  mounted() {
    this.tableData = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      index: i + 1,
      // adcdLabel: "名称名称",
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
        // 等待动画结束再展示table
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
    handlePointClick(point) {
      console.log("选中的点位信息:", point);
      // TODO：定位地图
      // const { lng, lat } = point;
      // if (lng && lat) {
      //   this.map.setView([lng, lat], 14);
      // }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/styles/custom.scss";
.right-panel-wrapper {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  display: flex;
  width: 440px;
  height: 100%;
  /* background: #fff; */
  transition: width 0.3s ease;
  z-index: 10;
  box-shadow: -2px 0 6px rgba(0, 0, 0, 0.1);
  background-color: rgba(9, 60, 111, 0.7);
}

.right-panel-wrapper.collapsed {
  width: 15px;
  background: transparent !important;
}

.side-search {
  width: 15px;
  background: rgba(10, 60, 111, 0.4);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0;
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

.main-panel {
  flex: 1;
  background: #fff;
  /* padding: 12px; */
  overflow-y: auto;
  background-color: rgba(2, 35, 76, 0.9);
}

.chart-section {
  height: 285px;
  margin-top: 20px;
}

.table-section {
  height: calc(100% - 285px - 20px);
}

.section-title {
  /* width: 436px; */
  width: 100%;
  height: 45px;
  background: url("../../assets/images/oneMap/big_title.png");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  position: relative;
  margin: 0 auto;
  margin-bottom: 10px;

  .title {
    position: absolute;
    top: 45%;
    transform: translateY(-45%);
    margin-left: 65px;
    padding: 0 4px;
    white-space: nowrap; // 防止换行
    @include custom-panel-title($style: italic, $start: #7ae3ff);
  }
  .unit {
    font-family: SourceHanSansCN, sans-serif;
    font-weight: normal;
    font-size: 14px;
    color: #ffffff;
    position: absolute;
    right: 30px;
    top: 25%;
    transform: translateY(-50%);
  }
}

.sub-section {
  // margin-top: -30px;
}
.sub-section.base-info {
  // margin-top: -35px;
}

.sub-title {
  /* width: 302px; */
  width: 100%;
  height: 25px;
  background: url("../../assets/images/oneMap/small_title.png");
  background-repeat: no-repeat;
  background-size: contain;
  /* background-position: center; */
  position: relative;
  margin: 0 auto;
  span {
    // font-family: SourceHanSansCN, sans-serif;
    // font-weight: bold;
    // font-size: 16px;
    // color: #ffffff;
    // text-align: left;
    // font-style: normal;
    // text-transform: none;
    // /* background: radial-gradient(0deg, #85d6ff 0%, #ffffff 0%); */
    // margin-left: 30px;
    margin-left: 35px;
    line-height: 1; // 让文字不撑高度, 文字居中
    @include custom-panel-title($style: normal);
  }
}

/* 饼图区域 */
.chart-placeholder {
  height: 220px;
  margin-top: 6px;
}

.table-content {
  // height: 160px;
  height: calc(100% - 55px); // section-title 45px + 10px
  // min-height: 150px;
  background: rgba(2, 35, 76, 0.9);
  // margin-top: -30px;
}

// 表格样式定制化
::v-deep .table-wrapper {
  .header-inline .header-label {
    font-size: 16px;
    font-weight: normal;
  }
  .header-inline .header-unit {
    font-size: 16px;
    font-weight: normal;
  }
  .col-time {
    font-size: 16px;
    width: 100% !important;
    min-width: none !important;
    max-width: none !important;
  }
  .col-others {
    font-size: 16px;
    font-weight: bold;
    width: 100% !important;
    min-width: none !important;
    max-width: none !important;
  }
}
</style>
