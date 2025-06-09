<template>
  <div class="calendar">
    <div class="calendar-header">
      <button @click="prevMonth">＜</button>
      <span>{{ year }}年{{ month + 1 }}月</span>
      <button @click="nextMonth">＞</button>
    </div>
    <div class="calendar-grid">
      <div class="calendar-cell header" v-for="d in weekDays" :key="d">
        {{ d }}
      </div>
      <div
        v-for="(day, index) in days"
        :key="index"
        class="calendar-cell"
        :class="{ today: day.isToday, holiday: day.isHoliday }"
        @click="day.day ? showDetail(day) : null"
      >
        <div class="solar">{{ day.day }}</div>
        <div class="lunar">{{ day.lunar }}</div>
        <div class="term" v-if="day.term">{{ day.term }}</div>
        <div class="festival" v-if="day.festival">{{ day.festival }}</div>
      </div>
    </div>

    <div class="popup" v-if="popupVisible">
      <div class="popup-content">
        <h3>{{ selectedDetail.date }}</h3>
        <p><strong>阳历：</strong>{{ selectedDetail.solar }}</p>
        <p><strong>阴历：</strong>{{ selectedDetail.lunar }}</p>
        <p v-if="selectedDetail.term">
          <strong>节气：</strong>{{ selectedDetail.term }}
        </p>
        <p v-if="selectedDetail.festival">
          <strong>节日：</strong>{{ selectedDetail.festival }}
        </p>
        <button @click="popupVisible = false">关闭</button>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
import solarlunar from "solarlunar";

import { MONTH_MAP, DAY_MAP } from "./constants";

export default {
  name: "CalendarComponent",
  data() {
    const today = dayjs();
    return {
      year: today.year(),
      month: today.month(),
      weekDays: ["日", "一", "二", "三", "四", "五", "六"],
      popupVisible: false,
      selectedDetail: {}
    };
  },
  computed: {
    days() {
      const firstDay = dayjs(`${this.year}-${this.month + 1}-01`);
      const startDay = firstDay.day();
      const totalDays = firstDay.daysInMonth();

      const result = [];

      for (let i = 0; i < startDay; i++) {
        result.push({});
      }

      for (let d = 1; d <= totalDays; d++) {
        const date = dayjs(`${this.year}-${this.month + 1}-${d}`);
        const year = Number(date.year());
        const month = Number(date.month()) + 1;
        const day = Number(date.date());
        const solar = solarlunar.solar2lunar(year, month, day);
        if (d === 4) {
          console.log("0609 ...", date, solar);
        }
        //fixed: display NaN.
        // const solar = solarlunar.solar2lunar(
        //   date.year(),
        //   date.month() + 1,
        //   date.date()
        // );

        // const lunarMonthName = MONTH_MAP[solar.lunarMonth - 1] + "月";
        // const lunarDayName = DAY_MAP[solar.lunarDay - 1];
        result.push({
          day: d,
          dateStr: date.format("YYYY-MM-DD"),
          solar: date.format("YYYY-MM-DD"),
          lunar: solar.monthCn + solar.dayCn,
          // lunar: lunarMonthName + lunarDayName,
          term: solar.term,
          festival: solar.lunarFestival || solar.solarFestival || "",
          isToday: date.format("YYYY-MM-DD") === dayjs().format("YYYY-MM-DD"),
          isHoliday: !!(solar.lunarFestival || solar.solarFestival)
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
    },
    showDetail(day) {
      this.selectedDetail = {
        date: `${this.year}年${this.month + 1}月${day.day}日`,
        solar: day.solar,
        lunar: day.lunar,
        term: day.term,
        festival: day.festival
      };
      this.popupVisible = true;
    }
  }
};
</script>

<style scoped>
.calendar {
  width: 320px;
  margin: 20px auto;
  font-family: Arial, sans-serif;
  position: relative;
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
  /* min-height: 70px; */
  font-size: 12px;
  cursor: pointer;
  background: #fff;
}
.header {
  background-color: #eee;
  font-weight: bold;
}
.today {
  background-color: #fdf3d2;
  border: 1px solid orange;
}
.holiday {
  background-color: #ffeaea;
  border-color: red;
}
.solar {
  font-weight: bold;
  font-size: 14px;
}
.lunar {
  color: #888;
  font-size: 11px;
}
.term {
  color: green;
  font-size: 10px;
}
.festival {
  color: red;
  font-size: 10px;
  margin-top: 2px;
}
.popup {
  position: fixed;
  top: 30%;
  left: 50%;
  transform: translateX(-50%);
  background: #fff;
  border: 1px solid #ccc;
  padding: 20px;
  z-index: 999;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}
.popup-content h3 {
  margin-top: 0;
}
.popup-content button {
  margin-top: 10px;
}
</style>
