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

    <!-- Player Stats -->
    <section class="block">
      <h3>Player Stats</h3>
      <ul>
        <li v-for="player in current.players" :key="player.name">
          <strong>{{ player.name }}</strong>: {{ player.total }} pts ({{ player.detail }})<br>
          Big Gold: {{ player.bigGold }}, Small Gold: {{ player.smallGold }},
          Golden 9: {{ player.goldenNine }}, Regular Win: {{ player.regularWin }},
          Foul: {{ player.foul }}
        </li>
      </ul>
    </section>

    <!-- Summary -->
    <section class="block summary">
      <h3>{{ activeDate }} Summary</h3>
      <div v-for="player in current.players" :key="player.name">
        <strong>{{ player.name }}</strong>: {{ format(player.total) }} pts,
        Big Gold {{ player.bigGold }},
        Small Gold {{ player.smallGold }},
        Golden 9 {{ player.goldenNine }},
        Regular Win {{ player.regularWin }},
        Foul {{ player.foul }}
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
      records: RECORDS,
    };
  },

  computed: {
    dateList() {
      return Object.keys(this.records).sort((a, b) => b.localeCompare(a));
    },
    current() {
      return this.records[this.activeDate];
    },
  },

  methods: {
    format(val) {
      return val > 0 ? `+${val}` : val;
    },
  },
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
  overflow-x: auto;
  white-space: nowrap;
  padding-bottom: 6px;
  margin-bottom: 12px;
}

/* Hide scrollbar (optional) */
.date-bar::-webkit-scrollbar {
  display: none;
}

.date-bar button {
  flex-shrink: 0;
  padding: 4px 12px;
  border: 1px solid #ddd;
  background: #fff;
  cursor: pointer;
  border-radius: 14px;
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

.summary {
  background: #fafafa;
  font-weight: bold;
}

strong {
  font-weight: bold;
}
</style>
