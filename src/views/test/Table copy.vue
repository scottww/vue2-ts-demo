<template>
  <div class="alarm-table-container">
    <table class="alarm-table">
      <thead>
        <tr class="table-header">
          <th v-for="(header, hIndex) in headers" :key="hIndex" :title="header">
            {{ header }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(alarm, index) in alarmData"
          :key="index"
          :class="index % 2 === 0 ? 'even-row' : 'odd-row'"
        >
          <td :title="alarm.type">
            <div class="alarm-type">
              <i
                :class="
                  alarm.level === 'warning' ? 'warning-icon' : 'info-icon'
                "
              ></i>
              <span>{{ alarm.type }}</span>
            </div>
          </td>
          <td :title="alarm.time">{{ alarm.time }}</td>
          <td :title="alarm.device">{{ alarm.device }}</td>
          <td :title="alarm.content">{{ alarm.content }}</td>
          <td>
            <button class="detail-btn" @click="viewDetail(alarm)">详情</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Vue from "vue";

export default {
  name: "AlarmTable",
  data() {
    return {
      headers: ["报警类型", "报警时间", "报警设备", "报警内容", "操作"],
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
          level: "info",
          time: "07-04 14:30",
          device: "上游水位",
          content: "水位监测值为6.5m，正常范围"
        }
      ]
    };
  },
  methods: {
    viewDetail(alarm) {
      console.log("查看报警详情:", alarm);
      Vue.prototype.$message &&
        Vue.prototype.$message.info("查看报警ID: " + alarm.id + " 的详情");
    }
  }
};
</script>

<style scoped>
.alarm-table-container {
  width: 100%;
  overflow-x: auto;
  /* background-color: #f0f2f5; */
  background: linear-gradient(to bottom, #0f2c59, #1c4587);
  /* border-radius: 4px; */
  padding: 10px;
}

.alarm-table0 {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
  text-align: left;
  table-layout: fixed; /* 关键：固定布局，让 ellipsis 生效 */
}

.alarm-table {
  width: 100%;
  border-collapse: separate; /* 默认是 collapse，要改成 separate */
  border-spacing: 0 10px; /* 左右间隔 0，上下间隔 10px */
  table-layout: fixed; /* 让省略号生效 */
}

.alarm-table th,
.alarm-table td {
  height: 45px; /* 每一行高度固定 45px */
  /* line-height: 45px; */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0 15px;
  /* background: #fff; */
  color: #fff;
}

.alarm-table0 td {
  padding: 12px 15px;
  border-bottom: 1px solid #e8e8e8;
  white-space: nowrap; /* 不换行 */
  overflow: hidden; /* 溢出隐藏 */
  text-overflow: ellipsis; /* 显示省略号 */
}

.alarm-table th {
  /* background-color: #1890ff; */
  color: #fff;
  font-weight: bold;
}

.table-header {
  /* background-color: #1890ff; */
  color: #fff;
  font-size: 18px;
}

.table-header th {
  padding: 12px 15px;
  font-weight: bold;
  border: none;
  white-space: nowrap; /* 不换行 */
  overflow: hidden; /* 溢出隐藏 */
  text-overflow: ellipsis; /* 显示省略号 */
}

.even-row {
  /* background-color: #ffffff; */
  background: #02305b;
  box-shadow: inset 3px 0px 7px 0px #009cff;
  border-radius: 2px 2px 2px 2px;
  opacity: 0.57;
  height: 45px;
}

.odd-row {
  /* background-color: #f7fafc; */
  background: #02305b;
  box-shadow: inset 3px 0px 7px 0px #009cff;
  border-radius: 2px 2px 2px 2px;
  opacity: 0.57;
  height: 45px;
}

.alarm-type {
  display: flex;
  align-items: center;
}

.warning-icon {
  width: 16px;
  height: 16px;
  background-color: #f5222d;
  border-radius: 50%;
  margin-right: 8px;
  position: relative;
}

.warning-icon::after {
  content: "!";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 10px;
  font-weight: bold;
}

.info-icon {
  width: 16px;
  height: 16px;
  background-color: #1890ff;
  border-radius: 50%;
  margin-right: 8px;
  position: relative;
}

.info-icon::after {
  content: "i";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 10px;
  font-weight: bold;
}

.detail-btn {
  background: none; /* 去掉背景 */
  color: #1890ff; /* 蓝色文字 */
  border: none; /* 去掉边框 */
  border-radius: 0; /* 不要圆角 */
  padding: 0; /* 去掉内边距 */
  cursor: pointer;
  font-size: 14px;
  text-decoration: underline; /* 下划线 */
  transition: color 0.3s;
}

.detail-btn:hover {
  color: #40a9ff; /* 悬停时颜色更亮 */
}

/* 响应式调整 */
@media screen and (max-width: 768px) {
  .alarm-table-container {
    padding: 5px;
  }

  .alarm-table td,
  .alarm-table th {
    padding: 8px 10px;
    font-size: 12px;
  }
}
</style>
