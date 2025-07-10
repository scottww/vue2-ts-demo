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
          <!-- <div
            v-for="tab in tabs"
            :key="tab"
            :class="['tab', { active: activeTab === tab }]"
            @click="activeTab = tab"
          >
            {{ tab }}
          </div> -->
          <CustomTabs
            :value="activeTab2"
            :tabs="tabList"
            @input="tabsChange"
            @remove="handleRemove"
          />
        </div>

        <div class="table-content">
          <div v-if="activeTab2 === 'tab4'">
            <TreeWithStatus
              :treeData="treeData"
              :onlineIcon="require('@/assets/mapToolBar/online.png')"
              :offlineIcon="require('@/assets/mapToolBar/offline.png')"
              @point-click="handlePointClick"
            />
            <!-- 自定义图标使用方式 TreeWithStatus.vue -->
            <!-- <TreeWithStatus
              :treeData="treeData"
              :iconPngMap="{
                province: require('@/assets/tree/file.png'),
                point: require('@/assets/tree/file.png')
              }"
              :onlineIcon="require('@/assets/tree/on.png')"
              :offlineIcon="require('@/assets/tree/off.png')"
              @point-click="handlePointClick"
            /> -->
          </div>
          <div v-else>
            <!-- <StatusTable
              :columns="columns"
              :tableData="tableData"
            ></StatusTable> -->
            <!-- <VirtualStatusTable :columns="columns" :tableData="tableData" /> -->
            <!-- <StatusTable1
              :columns="columns"
              :tableData="tableData"
            ></StatusTable1> -->
            <!-- 最终方案 -->
            <!-- <StatusTableVirtual
              :columns="columns"
              :tableData="tableData"
            ></StatusTableVirtual> -->
            <StatusTableVirtual
              :columns="currentColumns"
              :tableData="tableData"
              :remain="50"
              :bench="10"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import CustomTabs from "./CustomTabs.vue";
import TreeWithStatus from "./TreeWithStatus_base.vue";
import { cleanTreeData } from "@/utils/treeHelper";
import StatusTable from "./StatusTable_noVirtualList.vue";
import VirtualStatusTable from "./VirtualStatusTable.vue";
import StatusTable1 from "./StatusTable_v-scroll.vue";
import StatusTableVirtual from "./StatusTableVirtual.vue";
import { generateMockTableData } from "@/utils/generateDataHelper";
import { columnMap } from "./constants.js";

export default {
  name: "RightPanel",
  components: {
    CustomTabs,
    TreeWithStatus,
    StatusTable,
    VirtualStatusTable,
    StatusTable1,
    StatusTableVirtual
  },
  data() {
    return {
      isCollapsed: false,
      tabs: ["类型一", "类型二", "类型三", "特定类型"],
      activeTab: "类型一",
      pieChartInstance: null, // ✅ 图表实例缓存
      activeTab2: "tab1",
      tabList: [
        { name: "tab1", label: "类型一" },
        { name: "tab2", label: "类型二" },
        { name: "tab3", label: "类型三" },
        { name: "tab4", label: "特定类型" }
      ],
      treeData: [
        {
          id: 1,
          label: "浙江省",
          count: 20,
          type: "province",
          children: [
            {
              id: 2,
              label: "杭州市",
              count: 15,
              type: "city",
              children: [
                {
                  id: 3,
                  label: "西湖区",
                  count: 10,
                  type: "district",
                  children: [
                    {
                      id: 4,
                      label: "西溪灌区",
                      count: 5,
                      type: "irrigation",
                      children: [
                        {
                          id: 5,
                          label: "点位1",
                          type: "point",
                          status: "online"
                        },
                        {
                          id: 6,
                          label: "点位2",
                          type: "point",
                          status: "offline"
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ],
      columns: [
        // { prop: "index", label: "序号", width: 50 },
        // { prop: "time", label: "监测时间",width: 110 },
        // { prop: "name", label: "站点名称",width: 110 },
        // { prop: "type", label: "类型" },
        // { prop: "count", label: "测点" },
        // { prop: "status", label: "状态", width: 60 }
        { prop: "index", label: "序号", minWidth: 50 },
        { prop: "time", label: "监测时间", minWidth: 110 },
        { prop: "name", label: "站点名称", minWidth: 110 },
        { prop: "type", label: "类型", width: 60 },
        { prop: "count", label: "测点", minWidth: 50 },
        { prop: "status", label: "状态" }
      ],
      tableData: [
        {
          id: "10001",
          index: 1,
          time: "06-24 16:55",
          name: "名称名称",
          count: 1,
          type: "位移位移位移",
          status: "online"
        },
        {
          id: "10002",
          index: 1,
          time: "06-24 16:55",
          name: "名称名称位移名称",
          count: 1,
          type: "位移",
          status: "online"
        },
        {
          id: "10003",
          index: 1,
          time: "06-24 16:55",
          name: "名称名称",
          count: 1,
          type: "位移",
          status: "online"
        }
      ]
    };
  },
  created() {
    // this.cleanedTreeData = cleanTreeData(this.treeData);
  },
  computed: {
    currentColumns() {
      console.log("currentColumns ...", columnMap, this.activeTab2);
      return columnMap[this.activeTab2] || [];
    }
    // currentTableData() {
    //   return tableDataMap[this.activeTab2] || [];
    // }
  },
  mounted() {
    // 生成 10000 条假数据
    this.tableData = generateMockTableData(10000);
    // this.tableData = Array.from({ length: 5000 }, (_, i) => ({
    //   id: i,
    //   name: "name-" + i
    // }));
    console.log(this.tableData);
    this.$nextTick(() => {
      this.initPie2();
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
              this.initPie2();
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
            this.initPie2();
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
    },
    initPie2() {
      const el = this.$refs.pieChart;
      if (!el) return;

      this.pieChartInstance = echarts.init(el);

      let data = [],
        data2 = [];
      const trafficWay = [
        {
          name: "I-II类",
          value: 14
        },
        {
          name: "III类",
          value: 18
        },
        {
          name: "IV类",
          value: 15
        },
        {
          name: "V类",
          value: 14
        },
        {
          name: "劣V类",
          value: 10
        }
      ];
      const color = [
        "#2A8BFD",
        "#00FAC1",
        "#FDE056",
        "#FD9D56",
        "#FD3A3A",
        "#FF8A26",
        "#FF5252",
        "#9689FF",
        "#CB00FF"
      ];
      for (let i = 0; i < trafficWay.length; i++) {
        data.push(
          {
            value: trafficWay[i].value,
            name: trafficWay[i].name,
            itemStyle: {
              borderWidth: 8,
              shadowBlur: 20,
              borderRadius: 20,
              borderColor: color[i],
              shadowColor: color[i]
            }
          },
          {
            value: 1,
            name: "",
            itemStyle: {
              label: {
                show: false
              },
              labelLine: {
                show: false
              },
              color: "rgba(0, 0, 0, 0)",
              borderColor: "rgba(0, 0, 0, 0)",
              borderWidth: 0
            }
          }
        );
        data2.push(
          {
            value: trafficWay[i].value,
            name: trafficWay[i].name
          },
          {
            value: 1,
            name: "",
            itemStyle: {
              label: {
                show: false
              },
              labelLine: {
                show: false
              },
              color: "rgba(0, 0, 0, 0)",
              borderColor: "rgba(0, 0, 0, 0)",
              borderWidth: 0,
              opacity: 0.2
            }
          }
        );
      }
      const option = {
        backgroundColor: "#000000",
        color: color,
        grid: {
          top: "3%",
          left: "6%",
          right: "6%",
          bottom: "3%",
          containLabel: true
        },
        legend: {
          right: "10%",
          top: "center",
          icon: "rect",
          type: "scroll",
          orient: "vertical",
          itemWidth: 15,
          itemHeight: 15,
          pageIconColor: "rgba(250, 252, 253, 1)", //翻页按钮的颜色
          pageIconInactiveColor: "rgba(216, 213, 213, 1)", //翻页按钮不激活时（即翻页到头时）的颜色
          pageIconSize: [16, 16], //翻页按钮的大小
          pageTextStyle: {
            //图例页信息的文字样式
            color: "rgba(248, 247, 247, 1)"
          },
          textStyle: {
            fontSize: 13,
            color: "#ffffff"
          },
          data: ["I-II类", "III类", "IV类", "V类", "劣V类"],
          formatter(name) {
            if (name != "") {
              const newData = trafficWay;
              let tarValue = 0;
              let total = 0;
              for (let i = 0; i < newData.length; i++) {
                total += newData[i].value;
                if (newData[i].name === name) {
                  tarValue = newData[i].value;
                }
              }
              var percert =
                total == 0 ? 0 : ((tarValue / total) * 100).toFixed(2);
              return name + " (" + tarValue + "/" + percert + "%)";
            } else {
              return;
            }
          }
        },
        series: [
          {
            name: "",
            type: "pie",
            clockWise: false,
            radius: ["70%", "67%"],
            //  hoverAnimation: false,
            center: ["33.33%", "50%"],
            top: "12%",
            bottom: "12%",
            itemStyle: {
              normal: {
                label: {
                  show: false
                }
              }
            },
            data: data
          },
          {
            type: "pie",
            //top: "center",
            top: "12%",
            bottom: "12%",
            startAngle: 90,
            clockwise: false,
            center: ["33.33%", "50%"],
            legendHoverLink: false,
            hoverAnimation: false,
            radius: ["66%", "35%"],
            itemStyle: {
              opacity: 0.15
            },
            label: {
              show: false,
              position: "center"
            },
            labelLine: {
              show: false
            },
            data: data2
          },
          {
            name: "",
            type: "pie",
            clockWise: false,
            center: ["33.33%", "50%"],
            radius: ["34%", "33%"],
            hoverAnimation: false,
            //top: "center",
            top: "12%",
            bottom: "12%",
            itemStyle: {
              normal: {
                label: {
                  show: false
                }
              }
            },
            data: data
          }
        ]
      };

      this.pieChartInstance.setOption(option);
    },
    tabsChange(name) {
      console.log("tabsChange ...", name);
      this.activeTab2 = name;
    },
    handleRemove(name) {
      this.tabList = this.tabList.filter((tab) => tab.name !== name);
      console.log("Removed tab:", name);
    },
    handlePointClick(point) {
      console.log("选中的点位信息:", point);
      // TODO：定位地图
      // const { lng, lat } = point;
      // if (lng && lat) {
      //   this.map.setView([lng, lat], 14);
      // }
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
  /* width: 1280px; */
  /* width: 440px; */
  /* width: 466px; */
  width: 600px;
  height: 100%;
  background: #fff;
  transition: width 0.3s ease;
  z-index: 10;
  box-shadow: -2px 0 6px rgba(0, 0, 0, 0.1);
  background-color: rgba(9, 60, 111, 0.7);
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
  /* padding: 10px; */
}
</style>
