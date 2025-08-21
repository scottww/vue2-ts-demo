<template>
  <div class="panel">
    <!-- 标题带背景图 -->
    <div class="panel-header flex-h-v">
      <span>{{ title }}</span>
      <div class="header-extra" v-if="headerExtra">
        <CustomSelect
          v-if="headerExtra.type === 'customSelect'"
          v-model="headerExtra.modelValue"
          :options="headerExtra.options"
          :placeholder="headerExtra.placeholder"
          @input="handleSelectChange"
        />
        <!-- 其它headerExtra类型... -->
      </div>
    </div>

    <div class="panel-body">
      <div class="section">
        <div class="top top-bg">
          <AlarmTotal />
        </div>
        <div class="table">
          <alarm-table :columns="columns" :data="tableList" :bodyHeight="200">
            <!-- 自定义 type 列 -->
            <template slot="type" slot-scope="{ row }">
              <span class="cell-icon">
                <img
                  class="custom-icon"
                  :src="row.level === 'warning' ? warningImg : resolvedImg"
                />
                {{ formatterValue(row.type) }}
              </span>
            </template>

            <!-- 自定义操作列 -->
            <template slot="action" slot-scope="{ row }">
              <div class="action-buttons">
                <button class="table-btn" @click="viewDetail(row)">详情</button>
              </div>
            </template>
          </alarm-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import subTitleImg from "@/assets/bigScreen/pumpOperation/subTitle_bg.png";
import warningImg from "@/assets/bigScreen/pumpOperation/warning.png";
import resolvedImg from "@/assets/bigScreen/pumpOperation/resolved.png";
import ImageLabelValue from "../ImageLabelValue.vue";
import CustomSelect from "../CustomSelect.vue";
import AlarmTotal from "./AlarmManagementTotal.vue";
import AlarmTable from "./AlarmManagementTable.vue";
export default {
  name: "AlarmManagement",
  components: {
    ImageLabelValue,
    CustomSelect,
    AlarmTotal,
    AlarmTable
  },
  props: {
    title: { type: String, default: "报警管理" },
    headerExtra: { type: Object, default: null }
  },
  data() {
    return {
      subTitleImg,
      warningImg,
      resolvedImg,
      dataList: [
        {
          period: "前天",
          value: "10.0",
          unit: "mm",
          icon: warningImg,
          width: 54,
          height: 54
        },
        {
          period: "昨天",
          value: "25.5",
          unit: "mm",
          icon: warningImg,
          width: 54,
          height: 54
        },
        {
          period: "今天",
          value: "40.5",
          unit: "mm",
          icon: warningImg,
          width: 54,
          height: 54
        }
      ],
      columns: [
        {
          prop: "type",
          label: "报警类型",
          width: "20%",
          formatter: (val) => this.formatterValue(val)
        },
        { prop: "time", label: "报警时间", width: "20%" },
        { prop: "device", label: "报警设备", width: "20%" },
        { prop: "content", label: "报警内容", width: "30%" },
        { prop: "action", label: "操作", width: 70 }
      ],
      tableList: [
        {
          id: 1,
          type: "水位报警",
          level: "warning",
          time: "07-04 14:30",
          device: "上游水位",
          content: "水位监测值为9.2m，超过警戒水位7.0m"
        },
        {
          id: 2,
          type: "水位报警",
          level: "info",
          time: "07-04 14:30",
          device: "上游水位",
          content: "水位监测值为6.8m，接近警戒水位7.0m"
        },
        {
          id: 3,
          type: "水位报警",
          level: "warning",
          time: "07-04 14:30",
          device: "",
          content: "水位监测值为6.8m，接近警戒水位7.0m"
        },
        {
          id: 4,
          type: "",
          level: "warning",
          time: "07-04 14:30",
          device: "上游水位",
          content: ""
        },
        {
          id: 5,
          type: "",
          level: "info",
          time: "",
          device: "",
          content: ""
        },
        {
          id: 6,
          type: "水位报警",
          level: "warning",
          time: "07-04 14:30",
          device: "",
          content: "水位监测值为6.8m，接近警戒水位7.0m"
        },
        {
          id: 7,
          type: "",
          level: "warning",
          time: "07-04 14:30",
          device: "上游水位",
          content: ""
        },
        {
          id: 8,
          type: "",
          level: "info",
          time: "",
          device: "",
          content: ""
        }
      ]
    };
  },
  methods: {
    handleSelectChange(val) {
      // 先调用配置里的 onChange 函数（如果有）
      if (this.headerExtra && typeof this.headerExtra.onChange === "function") {
        this.headerExtra.onChange(val);
      }
      // 再发事件给上层，方便事件冒泡传递
      this.$emit("site-change", val);
    },
    viewDetail(row) {
      console.log("详情:", row);
    },
    deleteAlarm(row) {
      console.log("删除:", row);
    },
    getImage() {
      return this.warningImg;
    },
    formatterValue(val, placeholder = "--") {
      return val === null || val === undefined || val === ""
        ? placeholder
        : val;
    }
  }
};
</script>

<style scoped>
.panel {
  background: rgba(0, 76, 153, 0.2);
  border: 1px solid rgba(0, 153, 255, 0.3);
  border-radius: 6px;
  padding: 12px;
  color: #fff;
}

.panel-header {
  font-weight: bold;
  font-size: 16px;
  height: 62px;
  background-image: url("~@/assets/bigScreen/title_bg2.png");
  background-size: cover;
  background-repeat: no-repeat;
  color: #fff;
}

.panel-header span {
  position: relative;
  left: 0px;
}

.header-extra {
  /* 右侧容器 */
  display: flex;
  align-items: center;
  position: relative;
  left: 0px;
}

.panel-body {
  height: calc(100% - 62px);
  display: flex;
  flex-direction: column;
  margin-top: 0;
  padding: 0 10px;
}

.flex-h-v {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0 0 50px;
}

.section {
  flex: 1; /* 平均分配高度 */
  display: flex;
  flex-direction: column;
}

.top {
  height: 105px;
  padding: 0;
  margin-top: 10px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.chart {
  flex: 1; /* 占据剩余高度 */
  margin-top: 10px;
  height: calc(100% - 105px);
}

.table {
  flex: 1; /* 占据剩余高度 */
  margin-top: 10px;
  height: calc(100% - 105px);
}

.top-bg1 {
  background-image: url("~@/assets/bigScreen/pumpOperation/subItem_bg.png");
  background-size: 619px 105px;
  background-repeat: no-repeat;
  background-position: center;
  padding: 0;
}
</style>
