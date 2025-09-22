<template>
  <div :class="['schedule-table-wrapper', currentTheme]">
    <div class="theme-switcher">
      <span>选择主题：</span>
      <button @click="setTheme('default')" :class="{ active: currentTheme === 'default' }">默认</button>
      <button @click="setTheme('dark')" :class="{ active: currentTheme === 'dark' }">暗色</button>
      <button @click="setTheme('blue')" :class="{ active: currentTheme === 'blue' }">科技蓝</button>
      <button @click="setTheme('green')" :class="{ active: currentTheme === 'green' }">清新绿</button>
    </div>

    <table class="schedule-table">
      <thead>
        <tr>
          <th>日期</th>
          <th>课程</th>
          <th>时间</th>
          <th>课时</th>
          <th>授课老师/负责人</th>
          <th>授课方式</th>
          <th>授课群体</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="(day, dayIndex) in processedSchedule" >
          <tr v-for="(item, itemIndex) in day.items" :key="`${day.date}-${itemIndex}-${item.name}`" :class="getRowClass(item)">
            <td v-if="itemIndex === 0 && day.dateRowspan > 0" :rowspan="day.dateRowspan" class="col-date">
              {{ day.date }}
            </td>

            <td :class="{'merged-cell': item.isMerged && item.type === 'lunch'}" v-if="!item.isMerged || item.type !== 'lunch'" >
              {{ item.name }}
            </td>
            <td :class="{'merged-cell': item.isMerged && item.type === 'lunch'}" v-if="!item.isMerged || item.type !== 'lunch'">
              {{ item.time }}
            </td>
            <td :class="{'merged-cell': item.isMerged && item.type === 'lunch'}" v-if="!item.isMerged || item.type !== 'lunch'">
              {{ item.duration }}
            </td>
            <td :class="{'merged-cell': item.isMerged && item.type === 'lunch'}" v-if="!item.isMerged || item.type !== 'lunch'">
              {{ item.instructor }}
            </td>
            <td :class="{'merged-cell': item.isMerged && item.type === 'lunch'}" v-if="!item.isMerged || item.type !== 'lunch'">
              {{ item.method }}
            </td>
            <td :class="{'merged-cell': item.isMerged && item.type === 'lunch'}" v-if="!item.isMerged || item.type !== 'lunch'">
              {{ item.target }}
            </td>

            <td v-if="item.isMerged && (item.type === 'lunch' || item.type === 'break')" :colspan="6" class="merged-content">
              {{ item.name }} {{ item.time }}
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script>
import { scheduleTableData } from './scheduleTableData.js';

export default {
  name: 'ScheduleTable',
  data() {
    return {
      schedule: scheduleTableData,
      currentTheme: 'default', // 当前主题
    };
  },
  computed: {
    // 处理原始数据，计算 rowspan
    processedSchedule() {
      return this.schedule.map(day => {
        let dateRowspan = 0; // 日期列需要合并的行数
        let items = []; // 存储处理后的课程项

        day.courses.forEach(course => {
          // 如果是中场休息或午餐，并且标记了 isMerged，则它会占据一整行，并且是 colspan=6
          if ((course.type === 'break' || course.type === 'lunch') && course.isMerged) {
            items.push({ ...course, isMerged: true });
            dateRowspan++; // 合并单元格的行也算作日期列的 rowspan
          } else {
            // 普通课程或考试
            items.push(course);
            dateRowspan++;
          }
        });

        return {
          date: day.date,
          dateRowspan: dateRowspan, // 实际占据的行数
          items: items,
        };
      });
    }
  },
  methods: {
    getRowClass(item) {
      return {
        'row-break': item.type === 'break',
        'row-lunch': item.type === 'lunch',
        'row-exam': item.type === 'exam',
        'row-course': item.type === 'course',
        'row-merged-custom': item.isMerged && (item.type === 'lunch' || item.type === 'break'), // 用于午餐和休息的合并行
      };
    },
    setTheme(themeName) {
      this.currentTheme = themeName;
      localStorage.setItem('scheduleTableTheme', themeName); // 保存主题设置
    },
  },
  mounted() {
    // 页面加载时从 localStorage 读取主题设置
    const savedTheme = localStorage.getItem('scheduleTableTheme');
    if (savedTheme) {
      this.currentTheme = savedTheme;
    }
  }
};
</script>

<style>
/* 全局 CSS 变量定义，用于主题切换 */
:root {
  /* Default Theme */
  --bg-color: #f7f7f7;
  --text-color: #333;
  --header-bg: #e6f7ff;
  --header-text: #1890ff;
  --border-color: #d9d9d9;
  --row-hover-bg: #f0f8ff;
  --break-row-bg: #f0f0f0;
  --lunch-row-bg: #e9e9e9;
  --exam-row-bg: #fffbe6;
  --exam-text: #faad14;
  --merged-content-bg: #e6f7ff;
  --merged-content-text: #1890ff;
  --active-btn-bg: #1890ff;
  --active-btn-text: white;
  --btn-bg: #f0f0f0;
  --btn-text: #333;
}

/* Dark Theme */
.dark {
  --bg-color: #2c2c2c;
  --text-color: #f0f0f0;
  --header-bg: #3c3c3c;
  --header-text: #8cc4ff;
  --border-color: #4a4a4a;
  --row-hover-bg: #404040;
  --break-row-bg: #353535;
  --lunch-row-bg: #3a3a3a;
  --exam-row-bg: #4c442e;
  --exam-text: #ffe082;
  --merged-content-bg: #4c4c4c;
  --merged-content-text: #8cc4ff;
  --active-btn-bg: #8cc4ff;
  --active-btn-text: #2c2c2c;
  --btn-bg: #4a4a4a;
  --btn-text: #f0f0f0;
}

/* Blue Theme */
.blue {
  --bg-color: #e3f2fd;
  --text-color: #0d47a1;
  --header-bg: #bbdefb;
  --header-text: #1976d2;
  --border-color: #90caf9;
  --row-hover-bg: #e3f2fd;
  --break-row-bg: #e0f2f7;
  --lunch-row-bg: #e0f7fa;
  --exam-row-bg: #fffde7;
  --exam-text: #ff8f00;
  --merged-content-bg: #bbdefb;
  --merged-content-text: #1976d2;
  --active-btn-bg: #2196f3;
  --active-btn-text: white;
  --btn-bg: #c5e1a5;
  --btn-text: #0d47a1;
}

/* Green Theme */
.green {
  --bg-color: #f1f8e9;
  --text-color: #33691e;
  --header-bg: #dcedc8;
  --header-text: #558b2f;
  --border-color: #c5e1a5;
  --row-hover-bg: #e6f5d6;
  --break-row-bg: #e0f2f1;
  --lunch-row-bg: #f0f4c3;
  --exam-row-bg: #fffde7;
  --exam-text: #827717;
  --merged-content-bg: #dcedc8;
  --merged-content-text: #558b2f;
  --active-btn-bg: #66bb6a;
  --active-btn-text: white;
  --btn-bg: #c8e6c9;
  --btn-text: #2e7d32;
}
</style>

<style scoped>
.schedule-table-wrapper {
  /* margin: 20px auto; */
  max-width: 1000px;
  background-color: var(--bg-color);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  padding: 20px;
  color: var(--text-color);
  overflow-x: auto; /* 🔥 横向滚动，避免表格撑出 */
}

.theme-switcher {
  margin-bottom: 20px;
  display: flex;
  flex-wrap: wrap; /* 按钮超出时自动换行 */
  justify-content: flex-end; /* 右对齐 */
  align-items: center;
  gap: 10px; /* 按钮间距统一，不用margin-left */
}

.theme-switcher span {
  /* margin-right: auto; */
  font-weight: bold;
}

.theme-switcher button {
  padding: 8px 15px;
  /* margin-left: 10px; */
  border: 1px solid var(--border-color);
  border-radius: 5px;
  cursor: pointer;
  background-color: var(--btn-bg);
  color: var(--btn-text);
  transition: all 0.3s ease;
  font-size: 0.9em;
}

.theme-switcher button:hover {
  opacity: 0.8;
}

.theme-switcher button.active {
  background-color: var(--active-btn-bg);
  color: var(--active-btn-text);
  border-color: var(--active-btn-bg);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.schedule-table {
  width: 100%;
  min-width: 800px; /* 🔥 给个最小宽度，超出时用滚动条 */
  border-collapse: collapse;
  font-size: 0.95em;
  table-layout: fixed; /* 固定列宽 */
}

.schedule-table th,
.schedule-table td {
  border: 1px solid var(--border-color);
  padding: 12px 10px;
  text-align: center;
  vertical-align: middle;
  word-wrap: break-word; /* 允许单词内部断行 */
  white-space: normal; /* 🔥 表格内容允许换行 */
}

.schedule-table thead th {
  background-color: var(--header-bg);
  color: var(--header-text);
  font-weight: bold;
  white-space: nowrap; /* 表头不换行 */
}

/* 列宽分配 */
.schedule-table col:nth-child(1) { width: 10%; } /* 日期 */
.schedule-table col:nth-child(2) { width: 25%; } /* 课程 */
.schedule-table col:nth-child(3) { width: 15%; } /* 时间 */
.schedule-table col:nth-child(4) { width: 8%; } /* 课时 */
.schedule-table col:nth-child(5) { width: 15%; } /* 授课老师 */
.schedule-table col:nth-child(6) { width: 12%; } /* 授课方式 */
.schedule-table col:nth-child(7) { width: 15%; } /* 授课群体 */


.schedule-table tbody tr:hover {
  background-color: var(--row-hover-bg);
}

/* 特殊行样式 */
.row-break {
  background-color: var(--break-row-bg);
  font-weight: bold;
}

.row-lunch {
  background-color: var(--lunch-row-bg);
  font-weight: bold;
}

.row-exam {
  background-color: var(--exam-row-bg);
  color: var(--exam-text);
}

/* 合并单元格的样式 */
.merged-content {
  background-color: var(--merged-content-bg);
  color: var(--merged-content-text);
  font-weight: bold;
  text-align: center;
}

.col-date {
  font-weight: bold;
  background-color: var(--bg-color) 
}

/* 确保合并的单元格内容居中显示 */
.schedule-table td.merged-cell {
  background-color: inherit; /* 继承父行的背景色 */
}
</style>