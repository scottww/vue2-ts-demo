<template>
  <div class="calendar">
    <div class="calendar-header">
      <button @click="prevMonth">＜</button>
      <span>{{ year }}年{{ month + 1 }}月</span>
      <button @click="nextMonth">＞</button>
    </div>
    <div class="calendar-grid">
      <div class="calendar-cell header" v-for="d in weekDays" :key="d">{{ d }}</div>
      <div
        v-for="(day, index) in days"
        :key="index"
        class="calendar-cell"
        :class="{ today: day.isToday }"
      >
        <div class="solar">{{ day.day }}</div>
        <div class="lunar">{{ day.lunar }}</div>
        <div class="term" v-if="day.term">{{ day.term }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs';
import solarlunar from 'solarlunar';

export default {
  name: 'CalendarComponent',
  data() {
    const today = dayjs();
    return {
      year: today.year(),
      month: today.month(),
      weekDays: ['日', '一', '二', '三', '四', '五', '六']
    };
  },
  computed: {
    days() {
      const firstDay = dayjs(`${this.year}-${this.month + 1}-01`);
      const startDay = firstDay.day();
      const totalDays = firstDay.daysInMonth();

      const result = [];

      for (let i = 0; i < startDay; i++) {
        result.push({}); // 空白占位
      }

      for (let d = 1; d <= totalDays; d++) {
        const date = dayjs(`${this.year}-${this.month + 1}-${d}`);
        const solar = solarlunar.solar2lunar(date.year(), date.month() + 1, date.date());

        result.push({
          day: d,
          lunar: solar.lunarDayName,
          term: solar.term,
          isToday:
            date.format('YYYY-MM-DD') === dayjs().format('YYYY-MM-DD')
        });
      }

      return result;
    }
  },
  methods: {
    prevMonth() {
      if (this.month === 0) {
        this.month = 11;
        this.year--;
      } else {
        this.month--;
      }
    },
    nextMonth() {
      if (this.month === 11) {
        this.month = 0;
        this.year++;
      } else {
        this.month++;
      }
    }
  }
};
</script>

<style scoped>
.calendar {
  width: 300px;
  margin: 20px auto;
  font-family: Arial, sans-serif;
}
.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 18px;
  margin-bottom: 10px;
}
.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
}
.calendar-cell {
  border: 1px solid #ccc;
  padding: 4px;
  text-align: center;
  min-height: 60px;
  font-size: 12px;
}
.header {
  background-color: #eee;
  font-weight: bold;
}
.today {
  background-color: #fdf3d2;
  border: 1px solid orange;
}
.solar {
  font-weight: bold;
  font-size: 14px;
}
.lunar {
  color: #888;
}
.term {
  color: green;
  font-size: 10px;
}
</style>
