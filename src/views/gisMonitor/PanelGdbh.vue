<template>
  <div
    class="right-panel-wrapper PanelGdbh"
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
      <!-- 图层数据 -->
      <div class="section table-section">
        <div class="section-title">
          <span class="title">详细信息</span>
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
              :style="`height: 100%`"
            />
          </div>
        </div>
      </div>
      <!-- 灌区总览 -->
      <div class="section chart-section">
        <div class="section-title">
          <div class="title">耕地面积对比</div>
        </div>

        <div class="sub-section" v-if="showTable">
          <MultiBarChart
            ref="multiBarChart"
            :width="'100%'"
            :height="'280px'"
            :series-data="chartData"
            :x-axis-labels="[
              '名称名称',
              '名称名称',
              '名称名称',
              '名称名称',
              '名称名称',
              '名称名称',
            ]"
            :y-axis-unit="'千亩'"
            :y-axis-max="25"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import StatusTableVirtual from "./components/StatusTableVirtual.vue";
import SvgImage from "./components/SvgImage.vue";
import { generateMockTableData } from "./generateDataHelper.js";
import { columnMap } from "./constants.js";
import MultiBarChart from "./components/MultiBarChart.vue";
export default {
  name: "PanelGdbh",
  components: {
    StatusTableVirtual,
    SvgImage,
    MultiBarChart,
  },
  data() {
    return {
      isCollapsed: false,
      columns: [
        { label: "序号", prop: "index", width: 45, minWidth: 45 },
        // { label: "行政区划", prop: "adcdLabel"},
        { label: "行政区划", prop: "time" },
        { label: "旱地", prop: "hd", unit: "(亩)" },
        { label: "水田", prop: "st", unit: "(亩)" },
        { label: "总计", prop: "total", unit: "(亩)" },
      ],
      tableData: [],
      showTable: true,
      chartData: [
        { name: "2020", data: [10, 11, 12, 7, 12, 13] },
        { name: "2021", data: [12, 13, 14, 13, 14, 15] },
        { name: "2022", data: [14, 15, 16, 25, 18, 17] },
      ],
    };
  },
  computed: {},
  mounted() {
    // this.tableData = generateMockTableData(1000);
    this.tableData = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      index: i + 1,
      time: "行政区划",
      hd: 1326,
      st: 1326,
      total: 1326,
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
        setTimeout(() => {
          this.showTable = true;
          this.$nextTick(() => {
            // 重新计算列宽
            this.$refs.statusTableVirtual &&
              this.$refs.statusTableVirtual.calcColumnWidths();
            this.$refs.multiBarChart && this.$refs.multiBarChart.resize();
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
  },
};
</script>

<style lang="scss" scoped>
// @import "~@/styles/custom.scss";
// .right-panel-wrapper {
//   position: absolute;
//   top: 0;
//   bottom: 0;
//   right: 0;
//   display: flex;
//   width: 440px;
//   height: 100%;
//   /* background: #fff; */
//   transition: width 0.3s ease;
//   z-index: 10;
//   box-shadow: -2px 0 6px rgba(0, 0, 0, 0.1);
//   background-color: rgba(9, 60, 111, 0.7);
// }

// .right-panel-wrapper.collapsed {
//   width: 15px;
//   background: transparent !important;
// }

// .side-search {
//   width: 15px;
//   background: rgba(10, 60, 111, 0.4);
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   padding: 0;
// }

// .toggle-btn {
//   all: unset;
//   width: 100%;
//   height: 100%;
//   cursor: pointer;
//   display: flex;
//   align-items: center;
//   justify-content: center;

//   .toggle-icon {
//     color: #fff !important;
//     transition: color 0.3s ease;
//   }

//   &:hover .toggle-icon {
//     color: #ffcc00;
//   }
// }

// .main-panel {
//   flex: 1;
//   background-color: rgba(2, 35, 76, 0.9);
//   display: flex;
//   flex-direction: column;
//   overflow: hidden; // 关键
// }

// .section {
//   display: flex;
//   flex-direction: column;
//   margin-bottom: 20px;
//   &:last-child {
//     margin-bottom: 0;
//   }
// }

// .chart-section {
//   flex: 1;
//   min-height: 0; // 解决 flex 溢出
//   display: flex;
//   flex-direction: column;
// }

// .table-section {
//   max-height: 470px; // 不是 height
//   flex-shrink: 0; // 不被压缩
//   display: flex;
//   flex-direction: column;
//   margin-top: 20px;
// }

// .section-title {
//   flex-shrink: 0; // 不允许被压缩
//   /* width: 436px; */
//   width: 100%;
//   height: 45px;
//   background: url("../../assets/images/oneMap/big_title.png");
//   background-repeat: no-repeat;
//   background-size: contain;
//   background-position: center;
//   position: relative;
//   margin: 0 auto;
//   margin-bottom: 10px;

//   .title {
//     // font-family: SourceHanSansCN, sans-serif;
//     // font-weight: bold;
//     // font-size: 18px;
//     // color: #ffffff;
//     // text-align: left;
//     // font-style: italic;
//     // text-transform: none;
//     // background: radial-gradient(0deg, #85d6ff 0%, #ffffff 0%);

//     // position: relative;
//     // margin-left: 65px;
//     // margin-top: 10px;
//     // display: inline-block;

//     position: absolute;
//     top: 45%;
//     transform: translateY(-45%);
//     margin-left: 65px;
//     padding: 0 4px;
//     white-space: nowrap; // 防止换行
//     @include custom-panel-title($size: 18px, $style: italic, $start: #7ae3ff);
//   }
// }

// .sub-section {
//   // margin-top: -35px;
// }
// .sub-section.base-info {
//   // margin-top: -35px;
// }

// .sub-title {
//   /* width: 302px; */
//   width: 100%;
//   height: 25px;
//   background: url("../../assets/images/oneMap/small_title.png");
//   background-repeat: no-repeat;
//   background-size: contain;
//   /* background-position: center; */
//   position: relative;
//   margin: 0 auto;
//   span {
//     // font-family: SourceHanSansCN, sans-serif;
//     // font-weight: bold;
//     // font-size: 16px;
//     // color: #ffffff;
//     // text-align: left;
//     // font-style: normal;
//     // text-transform: none;
//     // /* background: radial-gradient(0deg, #85d6ff 0%, #ffffff 0%); */
//     // margin-left: 30px;
//     margin-left: 35px;
//     line-height: 1; // 让文字不撑高度, 文字居中
//     @include custom-panel-title($style: normal);
//   }
// }

// .table-content {
//   flex: 1;
//   overflow-y: auto; // 滚动条
//   background: rgba(2, 35, 76, 0.9);
// }

// .table-content,
// .sub-section {
//   flex: 1;
//   min-height: 0;
// }

// // 表格样式定制化
// ::v-deep .table-wrapper {
//   .header-inline .header-label {
//     font-size: 16px;
//     font-weight: normal;
//   }
//   .header-inline .header-unit {
//     font-size: 16px;
//     font-weight: normal;
//   }
//   .col-time {
//     font-size: 16px;
//     width: 100% !important;
//     min-width: none !important;
//     max-width: none !important;
//   }
//   .col-others {
//     font-size: 20px;
//     font-weight: bold;
//     width: 100% !important;
//     min-width: none !important;
//     max-width: none !important;
//   }
// }

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
  overflow: hidden; // ⭐ 防止子元素撑破面板
}

/* ========================
 * 通用 Section
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
  flex: 1;
  min-height: 0; // ⭐ flex 子元素滚动的前提
  display: flex;
  flex-direction: column;
}

/* ========================
 * 表格区域
 * ======================== */
.table-section {
  flex-shrink: 0; // 不被压缩
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  max-height: 470px; // 保留表格高度限制
}

/* ========================
 * Section 标题
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
 * 子 Section（chart / info 等）
 * ======================== */
.sub-section {
  flex: 1;
  min-height: 0; // ⭐ flex 子元素滚动的前提
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
  background: rgba(2, 35, 76, 0.9);
}

/* ========================
 * 表格定制化样式
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
