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
        :class="{
          today: day.isToday,
          holiday: day.isHoliday,
          vacation: day.isVacation,
          termDay: day.isTerm
        }"
        @click="day.day ? showDetail(day) : null"
      >
        <div class="solar">{{ day.day }}</div>
        <div class="lunar" :class="{ term: day.term }">{{ day.lunar }}</div>
        <!-- <div class="term" v-if="day.term">{{ day.term }}</div> -->
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
        <p v-if="selectedDetail.vacation">
          <strong>放假：</strong>{{ selectedDetail.vacation }}
        </p>
        <button @click="popupVisible = false">关闭</button>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
import solarlunar from "solarlunar";

// 示例放假安排（可替换为接口返回）
const holidays = {
  "2025-01-01": "元旦",
  "2025-01-02": "元旦",
  "2025-01-03": "元旦",
  "2025-02-01": "春节",
  "2025-02-02": "春节",
  "2025-02-03": "春节",
  "2025-05-01": "劳动节",
  "2025-10-01": "国庆节",
  "2025-10-02": "国庆节",
  "2025-10-03": "国庆节",
  "2025-10-04": "国庆节",
  "2025-10-05": "国庆节",
  "2025-10-06": "国庆节",
  "2025-10-07": "国庆节",
  "2025-10-08": "国庆节"
};

export default {
  name: "CalendarComponent",
  data() {
    const today = dayjs();
    return {
      year: today.year(),
      month: today.month(),
      weekDays: ["日", "一", "二", "三", "四", "五", "六"],
      popupVisible: false,
      selectedDetail: {
        date: "",
        solar: "",
        lunar: "",
        term: "",
        festival: "",
        vacation: ""
      }
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
        const solar = solarlunar.solar2lunar(
          date.year(),
          date.month() + 1,
          date.date()
        );
        const fullDate = date.format("YYYY-MM-DD");
        const vacationText = holidays[fullDate] || "";

        if (d === 1) {
          console.log(`date ... solar ...`, date, solar);
        }

        result.push({
          day: d,
          dateStr: fullDate,
          solar: fullDate,
          // lunar: solar.gzDay + solar.monthCn + solar.dayCn,
          lunar: this.getLunarLabel(solar),
          lunarDetail: solar.gzDay + `年` + solar.monthCn + solar.dayCn,
          term: solar.term || "",
          festival: solar.lunarFestival || solar.solarFestival || "",
          vacation: vacationText,
          isToday: fullDate === dayjs().format("YYYY-MM-DD"),
          isHoliday: !!(solar.lunarFestival || solar.solarFestival),
          isVacation: !!vacationText,
          isTerm: !!solar.term
        });
      }

      return result;
    }
  },
  methods: {
    getLunarLabel(solar) {
      if (!!solar.term === true) {
        return solar.term;
      }
      if (solar.dayCn === "初一") {
        return solar.monthCn;
      }
      return solar.dayCn;
    },
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
      console.log(`showDetail ...`, day);
      this.selectedDetail = {
        date: `${this.year}年${this.month + 1}月${day.day}日`,
        solar: day.solar,
        lunar: day.lunarDetail,
        term: day.term,
        festival: day.festival,
        vacation: day.vacation
      };
      this.popupVisible = true;
    }
  }
};
</script>

<style scoped>
.calendar {
  /* width: 320px; */
  width: 452px;
  min-width: 452px;
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
  width: 60px;
  height: 55px;
  /* min-height: 70px; */
  font-size: 12px;
  cursor: pointer;
  background: #fff;
  position: relative;
}
.header {
  background-color: #eee;
  font-weight: bold;
  font-size: 14px;
  height: 28px;
}
.today {
  background-color: #fdf3d2;
  border: 1px solid orange;
}
.holiday {
  background-color: #ffeaea;
  border-color: red;
}
.vacation {
  background-color: #e6f7ff;
  border-color: #1890ff;
}
.termDay {
  /* box-shadow: inset 0 0 0 2px green; */
}
.solar {
  font-weight: bold;
  font-size: 16px;
}
.lunar {
  color: #888;
  font-size: 12px;
}
.term {
  color: green;
  font-size: 12px;
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
