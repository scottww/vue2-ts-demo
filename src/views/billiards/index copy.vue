<template>
  <div class="score-page">
    <!-- Date Switcher -->
    <div class="date-bar">
      <button
        v-for="date in dateList"
        :key="date"
        :class="{ active: date === activeDate }"
        @click="activeDate = date"
      >
        {{ date }}
      </button>
    </div>

    <h2>{{ activeDate }} Record</h2>

    <!-- Remaining Cards -->
    <section class="block">
      <h3>Remaining Cards (pts)</h3>
      <ul>
        <li v-for="(v, k) in current.cards" :key="k">{{ k }}: {{ v }}</li>
      </ul>
    </section>

    <!-- Drinks -->
    <section class="block">
      <h3>Drinks (pts)</h3>
      <ul>
        <li v-for="(v, k) in current.drinks" :key="k">{{ k }}: {{ v }}</li>
      </ul>
    </section>

    <!-- Table Fee -->
    <section class="block">
      <h3>Table Fee (pts)</h3>
      <div class="fee">Table Fee: {{ current.tableFee }} pts</div>
    </section>

    <!-- Final Result -->
    <section class="block">
      <h3>Final Result (pts)</h3>
      <ul>
        <li v-for="item in current.result" :key="item.name">
          {{ item.name }}: {{ item.detail }} =
          <span :class="{ win: item.total > 0, lose: item.total < 0 }">
            {{ item.total }}
          </span>
        </li>
      </ul>
    </section>

    <!-- Summary -->
    <section class="block summary">
      <h3>{{ activeDate }} Summary (pts)</h3>
      <!-- <div>
        Fa {{ format(resultMap.Fa) }}, Han {{ format(resultMap.Han) }}, Tang
        {{ format(resultMap.Tang) }}, Luan {{ format(resultMap.Luan) }}
      </div> -->
      <div>
        <span v-for="(item, index) in current.result" :key="item.name">
          {{ item.name }} {{ format(item.total)
          }}<span v-if="index < current.result.length - 1">, </span>
        </span>
      </div>
    </section>
  </div>
</template>

<script>
import { RECORDS } from "./records";

export default {
  name: "FireScore",
  data() {
    return {
      activeDate: "2025-04-03",
      records: RECORDS
    };
  },

  computed: {
    dateList() {
      return Object.keys(this.records).sort((a, b) => b.localeCompare(a));
    },
    current() {
      return this.records[this.activeDate];
    },
    resultMap() {
      return this.current.result.reduce((map, item) => {
        map[item.name] = item.total;
        return map;
      }, {});
    }
  },

  methods: {
    format(val) {
      return val > 0 ? `+${val}` : val;
    }
  }
};
</script>

<style scoped>
.score-page {
  padding: 16px;
  font-size: 14px;
}

/* Horizontal Date Buttons */
.date-bar {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  overflow-x: auto; /* Horizontal scroll if too many */
  white-space: nowrap;
  padding-bottom: 6px;
  margin-bottom: 12px;
}

/* Hide scrollbar (optional) */
.date-bar::-webkit-scrollbar {
  display: none;
}

.date-bar button {
  flex-shrink: 0; /* Do not shrink */
  padding: 4px 12px;
  border: 1px solid #ddd;
  background: #fff;
  cursor: pointer;
  border-radius: 14px; /* Capsule shape */
  font-size: 12px;
}

.date-bar button.active {
  background: #1890ff;
  color: #fff;
  border-color: #1890ff;
}

.block {
  margin-bottom: 16px;
  padding: 12px;
  border: 1px solid #eee;
  border-radius: 6px;
}

.block h3 {
  margin-bottom: 8px;
  font-size: 15px;
}

ul {
  padding-left: 16px;
}

.fee {
  font-weight: bold;
}

.win {
  color: #d4380d;
  font-weight: bold;
}

.lose {
  color: #389e0d;
  font-weight: bold;
}

.summary {
  background: #fafafa;
  font-weight: bold;
}
</style>
