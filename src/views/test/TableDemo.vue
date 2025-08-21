<template>
  <div class="table-demo">
    <alarm-table :columns="columns" :data="alarmData" :bodyHeight="200">
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
          <button class="table-btn" @click="deleteAlarm(row)">删除</button>
        </div>
      </template>
    </alarm-table>
  </div>
</template>

<script>
import AlarmTable from "./AlarmTable.vue";
import warningImg from "@/assets/bigScreen/pumpOperation/warning.png";
import resolvedImg from "@/assets/bigScreen/pumpOperation/resolved.png";

export default {
  components: { AlarmTable },
  data() {
    return {
      warningImg,
      resolvedImg,
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
        { prop: "action", label: "操作", width: 100 }
      ],
      alarmData: [
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
</style>
