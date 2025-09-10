<template>
  <div class="custom-table-container">
    <div class="table-wrapper">
      <table class="custom-table">
        <thead>
          <tr>
            <th rowspan="2">序号</th>
            <th rowspan="2">水库名称</th>
            <th rowspan="2">所在地</th>
            <th rowspan="2">水库规模</th>
            <th colspan="4" class="merged-header">降雨量(mm)</th>
            <th colspan="4" class="merged-header">水位信息(m)</th>
            <th colspan="4" class="merged-header">特征水位(m)</th>
          </tr>
          <tr>
            <th>昨日</th>
            <th>今日</th>
            <th>近1小时</th>
            <th>近3小时</th>
            <th>8时水位</th>
            <th>最新水位</th>
            <th>涨幅情况</th>
            <th>上报时间</th>
            <th>汛限水位</th>
            <th>汛限库容(万m³)</th>
            <th>正常水位</th>
            <th>正常库容(万m³)</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in tableData"
            :key="index"
            :class="{ 'highlight-row': item.highlight }"
          >
            <td>{{ item.index }}</td>
            <td>{{ item.reservoirName }}</td>
            <td>{{ item.location }}</td>
            <td>{{ item.scale }}</td>
            <td>{{ formatValue(item.rainfallYesterday) }}</td>
            <td>{{ formatValue(item.rainfallToday) }}</td>
            <td>{{ formatValue(item.rainfallLast1h) }}</td>
            <td>{{ formatValue(item.rainfallLast3h) }}</td>
            <td>{{ formatValue(item.waterLevel8h) }}</td>
            <td>{{ formatValue(item.waterLevelLatest) }}</td>
            <td :class="getChangeClass(item.change)">
              {{ formatValue(item.change) }}
            </td>
            <td>{{ item.reportTime }}</td>
            <td>{{ formatValue(item.floodLimitLevel) }}</td>
            <td>{{ formatValue(item.floodLimitCapacity) }}</td>
            <td>{{ formatValue(item.normalLevel) }}</td>
            <td>{{ formatValue(item.normalCapacity) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "CustomTable",
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      tableData: []
    };
  },
  watch: {
    data: {
      handler(newData) {
        this.tableData = newData.length > 0 ? newData : this.getDefaultData();
      },
      immediate: true
    }
  },
  methods: {
    getDefaultData() {
      // 完全虚构的示例数据，不涉及任何真实地点和设施
      return [
        {
          index: 1,
          reservoirName: "云顶水库",
          location: "青山湖区",
          scale: "小型",
          rainfallYesterday: 0.0,
          rainfallToday: 0.0,
          rainfallLast1h: 0.0,
          rainfallLast3h: 0.0,
          waterLevel8h: 148.5,
          waterLevelLatest: 148.48,
          change: -0.02,
          reportTime: "07-29 14:25",
          floodLimitLevel: 150.0,
          floodLimitCapacity: 8.0,
          normalLevel: 150.0,
          normalCapacity: 8.0
        },
        {
          index: 2,
          reservoirName: "月湖水库",
          location: "绿园区",
          scale: "小型",
          rainfallYesterday: "-",
          rainfallToday: "-",
          rainfallLast1h: "-",
          rainfallLast3h: "-",
          waterLevel8h: 105.75,
          waterLevelLatest: 105.74,
          change: 0.0,
          reportTime: "07-29 14:20",
          floodLimitLevel: 107.0,
          floodLimitCapacity: 7.8,
          normalLevel: 107.0,
          normalCapacity: 7.8
        },
        {
          index: 3,
          reservoirName: "星辰水库",
          location: "蓝山街道",
          scale: "小型",
          rainfallYesterday: "-",
          rainfallToday: "-",
          rainfallLast1h: "-",
          rainfallLast3h: "-",
          waterLevel8h: 480.5,
          waterLevelLatest: 480.5,
          change: 0.0,
          reportTime: "07-29 14:15",
          floodLimitLevel: 482.0,
          floodLimitCapacity: 7.7,
          normalLevel: 482.0,
          normalCapacity: 7.7
        },
        {
          index: 4,
          reservoirName: "云海水库",
          location: "白帆镇",
          scale: "小型",
          rainfallYesterday: 0.0,
          rainfallToday: 0.0,
          rainfallLast1h: 0.0,
          rainfallLast3h: 0.0,
          waterLevel8h: 90.0,
          waterLevelLatest: 90.0,
          change: 0.0,
          reportTime: "07-29 14:25",
          floodLimitLevel: 91.0,
          floodLimitCapacity: 7.6,
          normalLevel: 91.0,
          normalCapacity: 7.6
        },
        {
          index: 5,
          reservoirName: "风鸣水库",
          location: "金谷乡",
          scale: "小型",
          rainfallYesterday: 0.0,
          rainfallToday: 0.0,
          rainfallLast1h: 0.0,
          rainfallLast3h: 0.0,
          waterLevel8h: 82.5,
          waterLevelLatest: 82.5,
          change: 0.0,
          reportTime: "07-29 14:20",
          floodLimitLevel: 84.0,
          floodLimitCapacity: 7.5,
          normalLevel: 84.0,
          normalCapacity: 7.5
        },
        {
          index: 6,
          reservoirName: "石泉水库",
          location: "银滩区",
          scale: "小型",
          rainfallYesterday: 0.0,
          rainfallToday: 0.0,
          rainfallLast1h: 0.0,
          rainfallLast3h: 0.0,
          waterLevel8h: 128.0,
          waterLevelLatest: 128.0,
          change: 0.0,
          reportTime: "07-29 14:25",
          floodLimitLevel: 130.0,
          floodLimitCapacity: 7.4,
          normalLevel: 130.0,
          normalCapacity: 7.4
        },
        {
          index: 7,
          reservoirName: "翠湖水库",
          location: "彩虹镇",
          scale: "小型",
          rainfallYesterday: 0.0,
          rainfallToday: 0.0,
          rainfallLast1h: 0.0,
          rainfallLast3h: 0.0,
          waterLevel8h: 74.0,
          waterLevelLatest: 74.0,
          change: 0.0,
          reportTime: "07-29 14:20",
          floodLimitLevel: 75.0,
          floodLimitCapacity: 7.3,
          normalLevel: 75.0,
          normalCapacity: 7.3
        },
        {
          index: 8,
          reservoirName: "清泉水库",
          location: "阳光乡",
          scale: "小型",
          rainfallYesterday: "-",
          rainfallToday: "-",
          rainfallLast1h: "-",
          rainfallLast3h: "-",
          waterLevel8h: "-",
          waterLevelLatest: "-",
          change: "-",
          reportTime: "-",
          floodLimitLevel: 205.0,
          floodLimitCapacity: 4.5,
          normalLevel: 206.0,
          normalCapacity: 7.2,
          highlight: true
        },
        {
          index: 9,
          reservoirName: "枫叶水库",
          location: "明月镇",
          scale: "小型",
          rainfallYesterday: 0.0,
          rainfallToday: 0.0,
          rainfallLast1h: 0.0,
          rainfallLast3h: 0.0,
          waterLevel8h: 84.0,
          waterLevelLatest: 84.0,
          change: 0.0,
          reportTime: "07-29 14:25",
          floodLimitLevel: 86.0,
          floodLimitCapacity: 7.0,
          normalLevel: 86.0,
          normalCapacity: 7.0
        },
        {
          index: 10,
          reservoirName: "松涛水库",
          location: "花香区",
          scale: "小型",
          rainfallYesterday: 0.0,
          rainfallToday: 0.0,
          rainfallLast1h: 0.0,
          rainfallLast3h: 0.0,
          waterLevel8h: 93.5,
          waterLevelLatest: 93.5,
          change: 0.0,
          reportTime: "07-29 14:20",
          floodLimitLevel: 94.0,
          floodLimitCapacity: 6.5,
          normalLevel: 94.0,
          normalCapacity: 6.5
        },
        {
          index: 11,
          reservoirName: "竹影水库",
          location: "竹海镇",
          scale: "小型",
          rainfallYesterday: 0.0,
          rainfallToday: 0.0,
          rainfallLast1h: 0.0,
          rainfallLast3h: 0.0,
          waterLevel8h: 262.5,
          waterLevelLatest: 262.5,
          change: 0.0,
          reportTime: "07-29 14:10",
          floodLimitLevel: 263.0,
          floodLimitCapacity: 6.4,
          normalLevel: 263.0,
          normalCapacity: 6.4
        },
        {
          index: 12,
          reservoirName: "梅园水库",
          location: "杏林区",
          scale: "小型",
          rainfallYesterday: 0.0,
          rainfallToday: 0.0,
          rainfallLast1h: 0.0,
          rainfallLast3h: 0.0,
          waterLevel8h: 69.0,
          waterLevelLatest: 69.0,
          change: 0.0,
          reportTime: "07-29 14:25",
          floodLimitLevel: 70.0,
          floodLimitCapacity: 6.3,
          normalLevel: 70.0,
          normalCapacity: 6.3
        },
        {
          index: 13,
          reservoirName: "荷香水库",
          location: "莲湖区",
          scale: "小型",
          rainfallYesterday: "-",
          rainfallToday: "-",
          rainfallLast1h: "-",
          rainfallLast3h: "-",
          waterLevel8h: 48.5,
          waterLevelLatest: 48.5,
          change: 0.0,
          reportTime: "07-29 14:10",
          floodLimitLevel: 50.0,
          floodLimitCapacity: 6.0,
          normalLevel: 50.0,
          normalCapacity: 6.0
        },
        {
          index: 14,
          reservoirName: "菊园水库",
          location: "桃园镇",
          scale: "小型",
          rainfallYesterday: 0.0,
          rainfallToday: 0.0,
          rainfallLast1h: 0.0,
          rainfallLast3h: 0.0,
          waterLevel8h: 89.5,
          waterLevelLatest: 89.5,
          change: 0.0,
          reportTime: "07-29 14:20",
          floodLimitLevel: 90.5,
          floodLimitCapacity: 5.5,
          normalLevel: 90.5,
          normalCapacity: 5.5
        },
        {
          index: 15,
          reservoirName: "兰谷水库",
          location: "花山区",
          scale: "小型",
          rainfallYesterday: 0.0,
          rainfallToday: 0.0,
          rainfallLast1h: 0.0,
          rainfallLast3h: 0.0,
          waterLevel8h: 35.0,
          waterLevelLatest: 35.0,
          change: 0.0,
          reportTime: "07-29 14:25",
          floodLimitLevel: 36.0,
          floodLimitCapacity: 4.0,
          normalLevel: 36.0,
          normalCapacity: 4.0
        }
      ];
    },
    formatValue(value) {
      // 格式化数值显示
      if (value === null || value === undefined) return "-";
      if (typeof value === "string") return value;
      // 保留两位小数
      return value.toFixed(2);
    },
    getChangeClass(change) {
      // 根据涨幅情况添加不同的样式
      if (typeof change === "string" || change === 0) return "";
      return change < 0 ? "decrease" : "increase";
    }
  }
};
</script>

<style scoped>
.custom-table-container {
  width: 100%;
  overflow: hidden;
  background: rgba(0, 26, 64, 0.6);
  border-radius: 8px;
  border: 1px solid #1976d2;
  padding: 8px;
}

.table-wrapper {
  max-height: 600px;
  overflow-y: auto;
  overflow-x: auto;
}

.custom-table {
  width: 100%;
  border-collapse: collapse;
  color: #fff;
  font-size: 12px;
}

.custom-table th {
  background: linear-gradient(135deg, #003366, #00509e);
  padding: 8px 4px;
  text-align: center;
  border: 1px solid rgba(25, 118, 210, 0.5);
  font-weight: bold;
  position: sticky;
  top: 0;
  z-index: 10;
}

.custom-table td {
  padding: 6px 4px;
  text-align: center;
  border: 1px solid rgba(25, 118, 210, 0.3);
  background: rgba(0, 33, 82, 0.3);
}

.custom-table tbody tr:hover td {
  background: rgba(25, 118, 210, 0.4);
}

.highlight-row td {
  background: rgba(255, 152, 0, 0.2) !important;
  border: 1px solid rgba(255, 152, 0, 0.5);
}

.merged-header {
  background: linear-gradient(135deg, #002147, #004080) !important;
  font-size: 13px;
}

.decrease {
  color: #4dd0e1;
}

.increase {
  color: #ff8a65;
}

/* 滚动条样式 */
.table-wrapper::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

.table-wrapper::-webkit-scrollbar-track {
  background: rgba(0, 26, 64, 0.3);
}

.table-wrapper::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, #1976d2, #0d47a1);
  border-radius: 4px;
}

.table-wrapper::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(135deg, #1565c0, #0d47a1);
}

/* 响应式设计 */
@media (max-width: 1200px) {
  .custom-table {
    font-size: 11px;
  }

  .custom-table th,
  .custom-table td {
    padding: 4px 2px;
  }
}
</style>
